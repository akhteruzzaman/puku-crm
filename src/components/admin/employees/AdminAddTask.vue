<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="addNewTask">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="edit"
                    placeholder="Task Title"
                    required
                    v-model="task_title"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                  prepend-icon="info"
                    v-model="task_details"
                    placeholder="Details"
                    required
                    multi-line
                  ></v-text-field>
                </v-layout>
              </v-flex>


              
                  

               
              
              <v-flex xs10>
                <v-select
                  prepend-icon="work"
                  v-bind:items="employees"
                  v-model="employee"
                  label="Assign Employee"
                  item-text="employee_name"
                  item-value="employee"
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
                    v-model="start_date"
                    label="Start Date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="start_date" @input="$refs.menu2.save(date)"></v-date-picker>

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
                    v-model="due_date"
                    label="Due Date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="due_date" @input="$refs.menu3.save(date)"></v-date-picker>

                </v-menu>
              </v-flex>


            


              <v-flex xs10>
                <v-select
                  prepend-icon="edit"
                  :items="task_stats"
                  v-model="task_stat"
                  label="Status"
                  item-text="task_stat"
                  item-value="task_stat"
                  single-line
                ></v-select>
              </v-flex>

                            
              


              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Add Task</v-btn>
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
  name:'AdminAddTask',
  components:{
    Navbar
  },
  data(){
    return{
      task_title:null,
      task_details:null,
      start_date:null,
      due_date:null,
      task_stat:'', 
      timestamp:null,
      date:null,
      menu2: false,
      menu3: false,
      employees:[],
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
      addNewTask(){
          if(this.task_title){

          let ref = db.collection('tasks');
            ref.add({
              task_title:this.task_title,
              task_details:this.task_details,
              employee:this.employee,
              start_date:this.start_date,
              due_date:this.due_date,
              task_stat:this.task_stat,
              task_date:moment().format('DD-MM-YYYY'),
              created_month:moment().format('MM-YYYY'),
              created_year:moment().format('YYYY'),
              timestamp:Date.now()
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


   }
   

}
</script>

<style>

</style>
