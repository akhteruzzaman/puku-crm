<template>
  <v-app>
      <Navbar/>
    <div>

      <v-content>
        <v-card>
          <v-container
            fluid
            style="min-height: 0;"
            grid-list-lg
          >
            <v-layout row wrap>
              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'ProjectType', params: {type:'In Progress'}}">
                  <v-card color="primary" class="white--text project_item">
                    <h1>In Progress</h1>
                    <h4>Total Projects : {{total_inprogress_project}}</h4>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'ProjectType', params: {type:'On Hold'}}">
                  <v-card color="orange" class="white--text project_item">
                    <h1>On Hold</h1>
                    <h4>Total Projects : {{total_onhold_project}}</h4>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'ProjectType', params: {type:'Cancelled'}}">
                  <v-card color="error" class="white--text project_item">
                    <h1>Cancelled</h1>
                    <div>
                      <h4>Total Projects : {{total_cancelled_project}}</h4>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'ProjectType', params: {type:'Finished'}}">
                  <v-card color="success" class="white--text project_item">
                    <h1>Finished</h1>
                    <div>
                      <h4>Total Projects : {{total_finished_project}}</h4>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>

        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search Projects"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="projects"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left"><router-link :to="{ name: 'ViewProject', params: {id:props.item.id} }">{{ props.item.project_name }}</router-link></td>
            <td class="text-xs-left"><span v-if='props.item.customer'>{{ props.item.customer.customer_name }}</span></td>
            <td class="text-xs-left">{{ props.item.start_date }}</td>
            <td class="text-xs-left">{{ props.item.deadline }}</td>
            <td class="text-xs-left"><span v-if='props.item.status'>{{ props.item.status.text }}</span></td>
            <v-btn fab dark small color="cyan" :to="{name: 'EditProject', params: {id:props.item.id}}">
               <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="pink" @click="removeProject(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        
        <!-- Add Expense Button  -->
        <v-btn :to="{name: 'AddProject'}"
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
  name:'Project',
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
        
        projects:[],
        headers: [
         { text: 'Project Name', value: 'project_name', sortable: !1 },
         { text: 'Customer' , value: 'customer', sortable: !1 },
         { text: 'Start Date' , value: 'start_date', sortable: !1 },
         { text: 'Deadline' , value: 'deadline', sortable: !1 },
         { text: 'Status' , value: 'status', sortable: !1 },
         { text: 'Action' , value: 'action', sortable: !1 },
       ],
       total_inprogress_project:null,
       total_onhold_project:null,
       total_cancelled_project:null,
       total_finished_project:null,

      }
  },
  methods:{
      removeProject(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('project').doc(id).delete().then(() => {
            this.projects = this.projects.filter(project => {
              return project.id != id
            })
          })
        }
      }
  },
  created(){
      // Current Currency
      db.collection("settings").doc('config').onSnapshot(doc =>{
         this.currency = doc.data().currency
      })

      // Show All Projects
      let ref = db.collection('project').orderBy('timestamp', 'desc')

      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.projects.push({
              id:doc.id,
              project_name:doc.data().project_name,
              customer:doc.data().customer,
              start_date:doc.data().start_date,
              deadline:doc.data().deadline,
              status:doc.data().status,
              budget:doc.data().budget,
              estimated_hours:doc.data().estimated_hours,
              details:doc.data().details,
            })
          }
        })
      })

      // Total In progress Project
      db.collection('project').where("status.text", "==", "In Progress")
     .get()
     .then(snapshot => {
           this.total_inprogress_project = snapshot.size;
      })

      // Total On Hold Project
      db.collection('project').where("status.text", "==", "On Hold")
     .get()
     .then(snapshot => {
           this.total_onhold_project = snapshot.size;
      })

      // Total Cancelled Project
      db.collection('project').where("status.text", "==", "Cancelled")
     .get()
     .then(snapshot => {
           this.total_cancelled_project = snapshot.size;
      })

      // Total Finished Project
      db.collection('project').where("status.text", "==", "Finished")
     .get()
     .then(snapshot => {
           this.total_finished_project = snapshot.size;
      })

    },
    computed: {
      pages () {
        if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
        ) return 0

        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
     
    }
}
</script>

<style>
  .project_item{
    padding:20px;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-ms-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
  }
  .project_item:hover{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
	}
td{
  text-align: center;
}
a{
  color: black;
}
</style>
