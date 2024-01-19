<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="editLeads">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    required
                    prepend-icon="face"
                    placeholder="Name"
                    v-model="lead.name"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10>
                <v-text-field
                  type="email"
                  prepend-icon="mail"
                  placeholder="Email"
                  v-model="lead.email"
                ></v-text-field>
              </v-flex>

              <v-flex xs10>
                <v-text-field
                  type="number"
                  prepend-icon="phone"
                  placeholder="(000) 000 - 0000"
                  v-model="lead.phone"
                ></v-text-field>
              </v-flex>

              <v-flex xs10>
                <v-text-field
                  prepend-icon="business"
                  placeholder="Company"
                  v-model="lead.company"
                ></v-text-field>
              </v-flex>

              <v-flex xs10>
                <v-text-field
                  prepend-icon="work"
                  placeholder="Designation"
                  v-model="lead.designation"
                ></v-text-field>
              </v-flex>

              <v-flex xs10>
                <v-text-field
                  prepend-icon="tv"
                  placeholder="Website"
                  v-model="lead.website"
                ></v-text-field>
              </v-flex>

              <v-flex xs10>
                <h4 v-if="lead.source"> Source: {{lead.source.text}}</h4>
                <v-select
                  prepend-icon="group"
                  :items="sources"
                  v-model="lead.source"
                  label="Source"
                  single-line
                ></v-select>
              </v-flex>

              <v-flex xs10>
                <h4 v-if="lead.status"> Current Status: {{lead.status.text}}</h4>
                <v-select
                  prepend-icon="account_box"
                  :items="allstatus"
                  v-model="lead.status"
                  label="Status"
                  single-line
                ></v-select>
              </v-flex>

              <v-flex xs10>
                <v-select
                  prepend-icon="collections"
                  :items="employeeSelects"
                  v-model="lead.employeeSelect"
                  label="Employee Selected"
                  item-text="employeeSelect"
                  item-value="employeeSelect"
                  single-line
                ></v-select>
              </v-flex>

              <v-flex xs10>
                 <v-text-field
                   v-model="lead.details"
                   label="Business history with this customer....."
                   multi-line
                 ></v-text-field>
               </v-flex>

               <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Update Leads</v-btn>
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
  name:'EditLeads',
  components:{
    Navbar
  },
  data(){
    return{
      sources: [
        { id: 1, text: 'Facebook' },
        { id: 2, text: 'Website' },
        { id: 3, text: 'Networks' },
        { id: 4, text: 'Direct Marketing' },
        { id: 5, text: 'Others' },
      ],
      allstatus: [      
        { id: 2, text: "Contacted" },
        { id: 3, text: "Qualified" },
        { id: 4, text: "Working" },
        { id: 5, text: "Proposal Sent" },
      ],
      employeeSelects:[
        { employeeSelect : 'Yes' },
        { employeeSelect: 'No' },       
      ],
      lead:[],
      name:null,
      email:null,
      phone:null,
      country:null,
      city:null,
      website:null,
      company:null,
      designation:null,
      source:null,
      rating:null,
      employeeSelect:null,
      details:null,
      feedback:null,
      status:null,
    }
  },
  methods:{
      editLeads(){
          if(this.lead.name){
              let ref = db.collection('leads').doc(this.$route.params.id);
              ref.update({
              name:this.lead.name,
              email:this.lead.email,
              phone:this.lead.phone,
              website:this.lead.website,
              company:this.lead.company,
              designation:this.lead.designation,
              employeeSelect:this.lead.employeeSelect,
              source:this.lead.source,
              status:this.lead.status,
              details:this.lead.details,
              edited_date:moment().format('LLL'),    
              })
          }
          this.$router.push({ name: 'Leads'})
      }
  },
  created(){
      // Show data of a specific Leads
      db.collection("leads").doc(this.$route.params.id).onSnapshot(doc =>{
          this.lead = doc.data()
          this.lead.id = doc.id
      })
  }
}
</script>

<style>

</style>
