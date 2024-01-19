<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="editTask">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                      <v-text-field
                    prepend-icon="edit"
                    placeholder="Task Title"
                    required
                    v-model="task.task_title"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                  prepend-icon="info"
                    v-model="task.task_details"
                    placeholder="Details"
                    required
                    multi-line
                  ></v-text-field>
                </v-layout>
              </v-flex>

               <v-flex xs10>
                <h4 v-if="task.employee">Assigned Employee: {{task.employee.employee_name}}</h4>
                <v-select
                  prepend-icon="work"
                  :items="employees"
                  v-model="task.employee"
                  label="Change Employee"
                  item-text="employee_name"
                  item-value="task.employee"
                  single-line
                ></v-select>
              </v-flex>

               <v-flex xs12 sm6 md4>
                <v-menu
                  ref="menu2"
                  :close-on-content-click="false"
                  v-model="menu2"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="task.start_date"
                    label="Start Date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="task.start_date" @input="$refs.menu2.save(date)"></v-date-picker>

                </v-menu>
              </v-flex>

               <v-flex xs12 sm6 md4>
                <v-menu
                  ref="menu3"
                  :close-on-content-click="false"
                  v-model="menu3"
                  :nudge-right="40"
                  :return-value.sync="date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="task.due_date"
                    label="Due Date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="task.due_date" @input="$refs.menu3.save(date)"></v-date-picker>

                </v-menu>
              </v-flex>

              <v-flex xs10>
                 <h4 v-if="now > task.due_date">Status: Delay</h4>
                 <h4 v-else><span v-if="task.task_stat">Status: {{task.task_stat.task_stat}}</span></h4>
                <v-select
                  prepend-icon="edit"
                  :items="task_stats"
                  v-model="task.task_stat"
                  label="Status"
                  item-text="task_stat"
                  item-value="task_stat"
                  single-line
                ></v-select>
              </v-flex>

              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Update Task</v-btn>
              </v-flex>


            </v-layout>
          </v-container>

        </v-card>
        </form>


      </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'AdminEditTask',
  components:{
    Navbar
  },
  data(){
    return{
      task:[],
      employees:[],
      task_title:null,
      task_details:null,
      start_date:null,
      due_date:null,
      task_stat:'', 
      timestamp:null,
      date:null,
      menu2: false,
      menu3: false,
      
      employee:null,
      
       task_stats:[
        { task_stat: 'In Progress' },
        { task_stat: 'Delay' },
        { task_stat: 'Cancelled' },
        { task_stat: 'Completed' },
        

      ],
      
       
    }
  },
  methods:{
      editTask(){
          if(this.task.task_title){

          let ref = db.collection('tasks').doc(this.$route.params.id);
            ref.update({
              task_title:this.task.task_title,
              task_details:this.task.task_details,
              employee:this.task.employee,
              start_date:this.task.start_date,
              due_date:this.task.due_date,
              task_stat:this.task.task_stat,
            })
            
            this.task_title=null
            this.task_details=null
            this.employee=null
            this.start_date=null
            this.due_date=null
            this.task_stat=null
            
          }
          this.$router.push({ name: 'ViewTask'})
      },
   },
   created(){
       // Show data of a specific Employee
       db.collection("tasks").doc(this.$route.params.id).onSnapshot(doc =>{
          this.task = doc.data()
          this.task.id = doc.id
       })

       let ref = db.collection('employee').orderBy('timestamp', 'desc')

       ref.onSnapshot(snapshot => {
         snapshot.docChanges().forEach(change => {
           if(change.type == 'added'){
             let doc = change.doc
             this.employees.push({
               id:doc.id,
               employee_name:doc.data().name
             })
           }
         })
       })




    },
    computed:{
       now: function () {
    return moment().format('YYYY-MM-DD')
  }
    }

}
</script>

<style>

</style>
