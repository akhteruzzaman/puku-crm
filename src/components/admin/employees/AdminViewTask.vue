<template>
  <v-app>

      <Navbar/>
      <v-content>

      
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between class="ptitle">
                <v-layout align-center>
                    <h2> {{task.task_title}}</h2>
                    
                      
                </v-layout>
              </v-flex>
              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                    <h4  v-if="task.employee"> Assigned to :- {{task.employee.employee_name}}</h4>
                    
                      
                </v-layout>
              </v-flex>
              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                    <h4> Start Date :- {{task.start_date}}</h4>
                    
                      
                </v-layout>
              </v-flex>
              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                    <h4> Due Date :- {{task.due_date}}</h4>
                    
                      
                </v-layout>
              </v-flex>
              <v-flex xs10 align-center justify-space-between>
              <v-layout align-center>
                  <span v-if="(now > task.due_date) && (task.task_stat=='In Progress' )"><h4>Status :- Delay</h4></span>

                  <span v-else>  <h4> Status :- {{task.task_stat}}</h4> </span>
                    
                      
                </v-layout>
              </v-flex>
              
              <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                  
                  <div>
                  <p>{{task.task_details}}</p>
                  </div>
                  
                
                </v-layout>
              </v-flex>
            

             

            </v-layout>
          </v-container>

        </v-card>
        


      </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'AdminViewTask',
  components:{
    Navbar
  },
  data(){
    return{
      task:[],
      task_title:null,
      task_details:null,
      employee:[],
      employee_name:null,
      
     
      timestamp:null,
      date:null,
    
   
  
    }
  },
  methods:{
      
   },
   created(){
       // Show data of a specific Employee
       db.collection("tasks").doc(this.$route.params.id).onSnapshot(doc =>{
          this.task = doc.data()
          this.task.id = doc.id
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


p{
  line-height: 28px;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 16px;
}
.ptitle{
    margin-bottom: 20px;
}

</style>
