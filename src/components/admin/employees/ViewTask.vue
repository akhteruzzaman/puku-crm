<template>
  <v-app>
      <Navbar/>
    <div>
      <v-content>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search Tasks"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="tasks"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1"
          
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">
            <router-link :to="{name: 'AdminViewTask', params: {id:props.item.id}}" class="link">

              {{ props.item.task_title }}
            </router-link>
              
              </td>
                               

            <td class="text-xs-left"><span v-if='props.item.employee.id'>{{ props.item.employee.employee_name}}</span></td>
            <td class="text-xs-left">{{ props.item.start_date}}</td>
            <td class="text-xs-left">{{ props.item.due_date}}</td>
            <td class="text-xs-left">
            <span v-if="(now > props.item.due_date) && (props.item.task_stat=='In Progress' ) " class="delayTask">Delay</span>
            <span v-else :class="getStatus(props.item.task_stat)">
              
              {{ props.item.task_stat }}
              
              </span>
            </td>
            <td class="text-xs-left">{{ props.item.timestamp }} </td>
            
            <v-btn fab dark small color="cyan" :to="{name: 'AdminEditTask', params: {id:props.item.id}}">
               <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="pink" @click="removeTask(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        

        <!-- Add Employee Button  -->
        <v-btn :to="{name: 'AdminAddTask'}"
          fab
          bottom
          right
          color="indigo"
          dark
          fixed
        >
          <v-icon>add</v-icon>
        </v-btn>

      </v-content>
    </div>
  </v-app>
</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'ViewTask',
  components: {
     Navbar
     
  },

  data(){
      return{
        currency:'',
        search: '',
        rowsPerPageItems: [8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },
        tasks:[],
        headers: [
         { text: 'Title' , value: 'task_title', sortable: !1 },
         { text: 'Employee Name', value: 'employee_id', sortable: !1 },
         { text: 'Start Date' , value: 'start_date', sortable: !1 },
         { text: 'Due Date' , value: 'due_date', sortable: !1 },
         { text: 'Status' , value: 'task_stat', sortable: !1 },       
         
         { text: 'Created' , value: 'created', sortable: !1 },
         { text: 'Action' , value: 'action', sortable: !1 },
       ],
       
       

      }
  },
  methods:{
      removeTask(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('tasks').doc(id).delete().then(() => {
            this.tasks = this.tasks.filter(task => {
              return task.id != id
            })
          })
        }
      },
      getStatus(status){
       
        if(status=='Cancelled'){
          return 'cancel';

        }
        else if(status=='Completed'){
          return 'complete';

        }
        else{
          
          return 'inProgress';
        }
        
      }
 
      

  },
  created(){
       

        // Show All Employee
        let ref = db.collection('tasks').where("created_month", "==", moment().format('MM-YYYY'))
                                           .orderBy('timestamp', 'desc')

        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
              let doc = change.doc
              this.tasks.push({
                id:doc.id,
                task_title:doc.data().task_title,
                employee:doc.data().employee,
                start_date:doc.data().start_date,
                due_date:doc.data().due_date,
                task_stat:doc.data().task_stat,
                timestamp:moment(doc.data().timestamp).format('ll')
              })
            }
          })
        })
       
        

         
    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      },
     
      now: function () {
    return moment().format('YYYY-MM-DD')
  }

      
    }
}
</script>

<style>
td{
  text-align: center;
}
.delayTask{
  color: orangered;
}
.inProgress{
  color:#2962FF;
}
.cancel{
  color:#D50000;
}
.complete{
  color: green;
}
.link{
  text-decoration: underline;
}
</style>
