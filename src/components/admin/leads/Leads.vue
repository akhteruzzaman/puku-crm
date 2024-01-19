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
                  <v-card color="error" class="white--text leads_item">
                    <h1>Working</h1>
                    <div>
                      <h4>Total Leads : {{total_working_leads}}</h4>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm6 md3>
                <router-link :to="{ name: 'LeadsType', params: {type:'Proposal Sent'}}">
                  <v-card color="success" class="white--text leads_item">
                    <h1>Proposal Sent</h1>
                    <div>
                      <h4>Total Leads : {{total_proposal_sent_leads}}</h4>
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
            label="Search Leads"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="leads"
          :search="search"         
          row
          wrap
          class="elevation-1"
        >
          <template slot="items" slot-scope="props"> 
            <td class="text-xs-left" v-if="props.item.leadRecordUpdateForAdmin == true" @click="updateLeadRecords(props.item.id)">
                <router-link :to="{ name: 'ViewLeads', params: {id:props.item.id} }">
                  <p style="color:green">Check Pending Updates</p>
                </router-link>
            </td>  
            <td class="text-xs-left" v-else>
                <router-link :to="{ name: 'ViewLeads', params: {id:props.item.id} }">
                No Updates
                </router-link>
            </td>  
            <td class="text-xs-left">
              <router-link :to="{ name: 'ViewLeads', params: {id:props.item.id} }">
                #{{ props.item.timestamp }}
              </router-link>
            </td>
            <td class="text-xs-left">{{ props.item.name }}</td>
            <td class="text-xs-left">{{ props.item.email }}</td>            
            <td class="text-xs-left" v-if="props.item.status">
              {{ props.item.status.text }}
            </td>
            <td class="text-xs-left" v-else>
              New 
            </td>           
            
            <td class="text-xs-left">{{ props.item.created_at }}</td>

            <v-btn  fab dark small color="cyan" :to="{name: 'EditLeads', params: {id:props.item.id}}">
               <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="pink" @click="removeLead(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>                 
          </template>
        </v-data-table>

        <!-- Add Leads Button  -->
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
import firebase from 'firebase'
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
        rowsPerPageItems:[8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },
        updatedStatus:null,
        total_contacted_leads:'',
        total_qualified_leads:'',
        total_working_leads:'',
        total_proposal_sent_leads:'',
        total_lead_updates:'',
        allstatus: [      
          { id: 2, text: "New" },
          { id: 3, text: "Interested" },
          { id: 4, text: "Pending" },
          { id: 5, text: "Dead Case" },
          { id: 6, text: "No Answer" },
          { id: 7, text: "Call Later" },
          { id: 8, text: "Deferred" },
          { id: 9, text: "Applied" },
          { id: 10, text: "Enrolled" },
          { id: 11, text: "Other" },
        ],
        leads:[],
        headers: [        
         { text: 'Updates', value: 'leadRecordUpdateForCounselor', sortable: !1 },
         { text: 'ID', value: 'timestamp', sortable: !1 },
         { text: 'Name', value: 'name', sortable: !1 },
         { text: 'Email', value: 'email', sortable: !1 },     
         { text: 'Status', value: 'status', sortable: !1 },         
         { text: 'Created At', value: 'created_at', sortable: !1 },
         { text: 'Action', value: 'action', sortable: !1 },         
       ],      
      }
  }, 
  methods:{
      removeLead(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('leads').doc(id).delete().then(() => {
            this.leads = this.leads.filter(lead => {
              return lead.id != id
            })
          })
        }
      },      
      updateLeadRecords(id){
        var db = firebase.firestore(); 
         let leadRecordsUpdateRef = db.collection('leads').doc(id);
              leadRecordsUpdateRef.update({            
              leadRecordUpdateForAdmin:false          
        })
      }
     
  },   
  created(){

      // Current Employee
      var user = firebase.auth().currentUser;
      if (user) {
          this.employeeId = user.uid
          //this.email = user.email
          this.userLoggedin = true;                
      } else {
          this.userLoggedin = false;            
      }      

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
              employeeName:doc.data().employeeName,
              leadRecordUpdateForAdmin:doc.data().leadRecordUpdateForAdmin,
              created_at:doc.data().created_date,
              edited_at:doc.data().edited_date,
              timestamp:doc.data().timestamp,
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

      

      // If the user is not Counselor then redirect
      /*
      firebase.auth().onAuthStateChanged(user =>{
      if(user){
        user.getIdTokenResult().then(idTokenResult => {
        
          if(idTokenResult.claims.counselor == true){
              //return true;
              console.log("This is counselor");              
          }else{
              console.log("This is not counselor");
              firebase.auth().signOut()
              .then((user)=>{
                this.$router.replace('/counselor-signin')
                this.feedback = "Wrong username or password";
              });
          
          }
          
            console.log(idTokenResult.claims);            
          })
          }
        })
        */

  },
    
   
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
