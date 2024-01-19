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
                    required
                    prepend-icon="assignment"
                    placeholder="Title"
                    v-model="task.title"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs12 lg6>
                <v-menu
                  ref="menu1"
                  :close-on-content-click="false"
                  v-model="menu1"
                  :nudge-right="40"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="task.date"
                    label="Date"
                    persistent-hint
                    prepend-icon="event"
                    @blur="date = parseDate(dateFormatted)"
                  ></v-text-field>
                  <v-date-picker v-model="task.date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
              </v-flex>


              <v-flex xs11 sm5>
                 <v-menu
                   ref="menu"
                   :close-on-content-click="false"
                   v-model="menu3"
                   :nudge-right="40"
                   :return-value.sync="time"
                   lazy
                   transition="scale-transition"
                   offset-y
                   full-width
                   max-width="290px"
                   min-width="290px"
                 >
                   <v-text-field
                     slot="activator"
                     v-model="task.time"
                     label="Time"
                     prepend-icon="access_time"
                     readonly
                   ></v-text-field>
                   <v-time-picker
                     v-if="menu3"
                     v-model="task.time"
                     full-width
                     @change="$refs.menu.save(time)"
                   ></v-time-picker>
                 </v-menu>
              </v-flex>


              <v-flex xs10>
                <h4 v-if="task.priority">Current Priority: {{task.priority.text}}</h4>
                <v-select
                  prepend-icon="done_all"
                  :items="priorities"
                  item-value="task.priority"
                  v-model="task.priority"
                  label="Priority"
                  single-line
                ></v-select>
              </v-flex>

              <v-flex xs10>
                <h4 v-if="task.status">Current Status: {{task.status.text}}</h4>
                <v-select
                  prepend-icon="account_box"
                  :items="allstatus"
                  item-value="task.status"
                  v-model="task.status"
                  label="Status"
                  single-line
                ></v-select>
              </v-flex>

              <v-flex xs10>
                 <v-text-field
                   v-model="task.details"
                   label="Some note about this task..."
                   multi-line
                 ></v-text-field>
               </v-flex>

              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Edit Task</v-btn>
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
  name:'EditTask',
  components:{
    Navbar
  },
  data(){
    return{
      task:[],
      title:null,
      priorities: [
        { id: 1, text: 'Low' },
        { id: 2, text: 'Medium' },
        { id: 3, text: 'High' },
      ],
      allstatus: [
        { id: 1, text: "Open" },
        { id: 2, text: "In Progress" },
        { id: 3, text: "Waiting" },
        { id: 4, text: "Complete" },
      ],
      feedback:null,
      priority:null,
      status:null,
      date: null,
      time: null,
      modal: true,
      menu1: false,
      menu2: false,
      menu3: false,
      dateFormatted: null,
    }
  },
  methods:{
      editTask(){
          if(this.task.title){
            this.dialog = false
          let ref = db.collection('task').doc(this.$route.params.id);
          ref.update({
            title:this.task.title,
            date:this.task.date,
            time:this.task.time,
            priority:this.task.priority,
            status:this.task.status,
            details:this.task.details,
            created_date:moment().format('DD-MM-YYYY'),
            created_month:moment().format('MM-YYYY'),
            timestamp:Date.now()
          })
          this.title=null
          this.date=null
          this.time=null
          this.priority=null
          this.status=null
          this.details=null
          }
          this.$router.push({ name: 'Task'})
      }
  },
  created(){
      // Show data of a specific Task
      db.collection("task").doc(this.$route.params.id).onSnapshot(doc =>{
         this.task = doc.data()
         this.task.id = doc.id
      })
   },

}
</script>

<style>

</style>
