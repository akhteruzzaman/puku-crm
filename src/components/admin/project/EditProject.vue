<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="editProject">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="format_size"
                    placeholder="Project Name"
                    required
                    v-model="project.project_name"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10>
                <h4 v-if="project.customer">Current Customer: {{project.customer.customer_name}}</h4>
                <v-select
                    prepend-icon="group"
                    v-bind:items="customers"
                    v-model="project.customer"
                    label="Customer"
                    item-text="customer_name"
                    item-value="customers"
                    single-line
                    bottom
                    autocomplete
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
                    v-model="project.start_date"
                    label="Start Date"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="project.start_date" @input="$refs.menu2.save(date)"></v-date-picker>

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
                    v-model="project.deadline"
                    label="Deadline"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="project.deadline" @input="$refs.menu3.save(date)"></v-date-picker>

                </v-menu>
              </v-flex>

              <v-flex xs10>
                <h4 v-if="project.status">Current Status: {{project.status.text}}</h4>
                <v-select
                    prepend-icon="assignment_turned_in"
                    :items="statuses"
                    v-model="project.status"
                    label="Status"
                    single-line
                ></v-select>
              </v-flex>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="local_atm"
                    placeholder="Budget"
                    v-model="project.budget"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="query_builder"
                    placeholder="Estimated Hours"
                    v-model="project.estimated_hours"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10>
                 <v-text-field
                   v-model="project.details"
                   label="Project Details....."
                   multi-line
                 ></v-text-field>
               </v-flex>


              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Add Project</v-btn>
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
  name:'AddExpenses',
  components:{
    Navbar
  },
  data(){
    return{
      project_name:null,
      start_date:null,
      deadline:null,
      status:null,
      budget:null,
      estimated_hours:null,
      details:null,
      date2: null,
      date3: null,
      modal: true,
      menu2: false,
      menu3: false,
      status: false,
      statuses: [
        { id: 1, text: 'Not Started' },
        { id: 5, text: 'In Progress' },
        { id: 2, text: 'On Hold' },
        { id: 3, text: 'Cancelled' },
        { id: 4, text: 'Finished' },
      ],
      customers:[],
      date:null,
      customer:null,
      project:[],
    }
  },
  methods:{
      editProject(){
          if(this.project.project_name){

          let ref = db.collection('project').doc(this.$route.params.id);
            ref.update({
              project_name:this.project.project_name,
              customer:this.project.customer,
              start_date:this.project.start_date,
              deadline:this.project.deadline,
              status:this.project.status,
              budget:this.project.budget,
              estimated_hours:this.project.estimated_hours,
              details:this.project.details,
            })
            this.project_name=null
            this.customer=null
            this.start_date=null
            this.deadline=null
            this.status=null
            this.budget=null
            this.details=null
          }
          this.$router.push({ name: 'Project'})
      },
   },
   created(){
         // Show data of a specific Project
         db.collection("project").doc(this.$route.params.id).onSnapshot(doc =>{
            this.project = doc.data()
            this.project.id = doc.id
         })

         // Show All Customers
         let ref = db.collection('customers').orderBy('timestamp', 'desc')

         ref.onSnapshot(snapshot => {
           snapshot.docChanges().forEach(change => {
             if(change.type == 'added'){
               let doc = change.doc
               this.customers.push({
                 id:doc.id,
                 customer_name:doc.data().customer_name
               })
             }
           })
         })


    }


}
</script>

<style>

</style>
