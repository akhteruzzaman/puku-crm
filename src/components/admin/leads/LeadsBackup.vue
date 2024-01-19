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
               <router-link :to="{ name: 'LeadsType', params: {type:'Contacted'}}">
                <v-card color="primary" class="white--text leads_item">
                  <h1>Contacted</h1>
                  <h4>Total Leads : {{total_contacted_leads}}</h4>
                </v-card>
               </router-link>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'LeadsType', params: {type:'Qualified'}}">
                  <v-card color="orange" class="white--text leads_item">
                    <h1>Qualified</h1>
                    <h4>Total Leads : {{total_qualified_leads}}</h4>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'LeadsType', params: {type:'Working'}}">
                  <v-card color="purple" class="white--text leads_item">
                    <h1>Working</h1>
                    <h4>Total Leads : {{total_working_leads}}</h4>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'LeadsType', params: {type:'Proposal Sent'}}">
                  <v-card color="success" class="white--text leads_item">
                    <h1>Proposal Sent</h1>
                    <h4>Total Leads : {{total_proposal_sent_leads}}</h4>
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
            label="Search Leads"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="leads"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left"><router-link :to="{ name: 'ViewLeads', params: {id:props.item.id} }">{{ props.item.name }}</router-link></td>
            <td class="text-xs-left">{{ props.item.email }} {{currency}}</td>
            <td class="text-xs-left">{{ props.item.phone }}</td>
            <td class="text-xs-left">{{ props.item.company }}</td>
            <td class="text-xs-left" v-if="props.item.status">{{ props.item.status.text }}</td>
            <v-btn fab dark small color="cyan" :to="{name: 'EditLeads', params: {id:props.item.id}}">
               <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="pink" @click="removeLeads(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>

        <!-- Add Expense Button  -->
        <v-btn :to="{name: 'AddLeads'}"
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
  name:'Leads',
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
        total_contacted_leads:'',
        total_qualified_leads:'',
        total_working_leads:'',
        total_proposal_sent_leads:'',
        leads:[],
        headers: [
         { text: 'Name', value: 'name', sortable: !1 },
         { text: 'Email', value: 'email', sortable: !1 },
         { text: 'Phone', value: 'phone', sortable: !1 },
         { text: 'Company', value: 'company', sortable: !1 },
         { text: 'Status', value: 'status', sortable: !1 },
         { text: 'Action', value: 'action', sortable: !1 },
       ]

      }
  },
  methods:{
      removeLeads(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('leads').doc(id).delete().then(() => {
            this.leads = this.leads.filter(lead => {
              return lead.id != id
            })
          })
        }
      }

  },
  created(){

      // Show All Leads
      let ref = db.collection('leads').orderBy('timestamp', 'desc')

      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.leads.push({
              id:doc.id,
              name:doc.data().name,
              email:doc.data().email,
              phone:doc.data().phone,
              website:doc.data().website,
              country:doc.data().country,
              city:doc.data().city,
              company:doc.data().company,
              designation:doc.data().designation,
              source:doc.data().source,
              status:doc.data().status,
              timestamp:moment(doc.data().timestamp).fromNow('lll')
            })
          }
        })
      })

      // Total Contacted Leads
      db.collection('leads').where("status.text", "==", "Contacted")
     .get()
     .then(snapshot => {
           this.total_contacted_leads = snapshot.size;
      })

      // Total Qualified Leads
      db.collection('leads').where("status.text", "==", "Qualified")
     .get()
     .then(snapshot => {
           this.total_qualified_leads = snapshot.size;
      })

      // Total Working Leads
      db.collection('leads').where("status.text", "==", "Working")
     .get()
     .then(snapshot => {
           this.total_working_leads = snapshot.size;
      })

      // Total Proposal Sent Leads
      db.collection('leads').where("status.text", "==", "Proposal Sent")
     .get()
     .then(snapshot => {
           this.total_proposal_sent_leads = snapshot.size;
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
  .leads_item{
    padding:20px;
		-webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-ms-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
  }
  .leads_item:hover{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
	}
td{
  text-align: center;
}
</style>
