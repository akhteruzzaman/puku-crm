<template>
  <v-app>
      <Navbar/>
    <div>

      <v-content>

        <v-container>
          <v-layout row wrap>
            <v-flex lg4>
            <v-card>
              <v-card-title><h4>Lead Details</h4></v-card-title>
              <v-divider></v-divider>
              <v-list dense class="pukulist">

                  <v-list-tile>
                  <v-list-tile-content><b>Name:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.name}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Phone:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.phone}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Email:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.email}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Company:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.company}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Designation:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.designation}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Website:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.website}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Created At:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.created_date}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Edited At:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.edited_date}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Source:</v-list-tile-content>
                  <v-list-tile-content class="align-end" v-if="this.lead.source">
                    {{this.lead.source.text}}
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Status:</v-list-tile-content>
                  <v-list-tile-content class="align-end" v-if="this.lead.status">
                    {{this.lead.status.text}}
                  </v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Details:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.lead.details}}</v-list-tile-content>
                </v-list-tile>

               

                

              </v-list>
            </v-card>
          </v-flex>



          <v-flex lg4>
            <v-card>
              <v-card-title><h4>Lead Updates</h4></v-card-title>
              <v-divider></v-divider>
              
              <div class="message-box" v-chat-scroll>
                <v-list dense class="pukulist">
                  <v-list-tile v-for="leadrecord in leadrecords" :key="leadrecord.id">
                    <v-list-tile-content>
                      <b>{{leadrecord.text}}</b> 
                      {{leadrecord.addBy}} ({{leadrecord.timestamp}}) 
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </div>

              <form @submit.prevent="addUpdates">
                  <v-flex xs11 align-center justify-space-between>
                    <v-layout align-center style="margin-left:20px">
                      <v-text-field
                        required
                        prepend-icon="assignment"
                        placeholder="Enter updates"
                        v-model="leadupdates"
                      ></v-text-field>
                    </v-layout>
                  </v-flex>
              </form>

            </v-card>
          </v-flex>

          <v-flex lg4>
            <v-card>
              <v-card-title><h4>Lead Files</h4></v-card-title>
              <v-divider></v-divider>
              <v-list dense class="pukulist">
                <v-list-tile v-for="leadFile in leadFiles" :key="leadFile.id">
                  <v-list-tile-content><b><a style="color:#1565c0;font-size:17px;text-decoration:underline;" :href='leadFile.image' target="_new">{{leadFile.file_name}}</a></b>{{leadFile.addBy}} ({{leadFile.timestamp}}) </v-list-tile-content>
                </v-list-tile>
              </v-list>

            </v-card>
        </v-flex>

        </v-layout>
      </v-container>

       <v-btn :to="{name: 'AddFile', params:{id:this.$route.params.id}}" 
          fab
          large
          bottom
          right
          color="indigo"
          dark
          fixed
        >
          <v-icon>cloud</v-icon>
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
  name:'ViewCounselorLeads',
  components: {
    Navbar
  },
  data(){
      return{
          rowsPerPageItems: [8, 16, 24],
          pagination: {
          rowsPerPage: 8
          },         
          lead: [],
          name:null,         
          email:null,
          phone:null,
          website:null,
          company:null,
          designation:null,
          source:null,
          rating:null,
          details:null,
          feedback:null,
          status:null,
          leadupdates:null,
          leadrecords:[],
          leadFiles:[],         
    }
  },
  methods:{
          addUpdates(){
            if(this.leadupdates){
              let ref = db.collection('leadrecords');
              ref.add({
                id:this.$route.params.id,
                name:this.lead.name,
                text:this.leadupdates,
                addBy:"Admin",
                timestamp:Date.now()
              })
              let leadRecordsUpdateRef = db.collection('leads').doc(this.$route.params.id);
                  leadRecordsUpdateRef.update({            
                    leadRecordUpdateForEmployee:true          
              })
              this.leadupdates = null
            }else {
              this.feedback = "Please insert some text"
            }
          },
          changeSeen(id){
            var db = firebase.firestore(); 
            let seenRef = db.collection('leadrecords').doc(id);
            seenRef.update({            
                seenCounselor:true             
            })            
          },
          removeLeadRecord(id){
            var result = confirm("Want to delete ?");
            if (result) {
              db.collection('leadrecords').doc(id).delete().then(() => {
                this.leadrecords = this.leadrecords.filter(leadrecord => {
                  return leadrecord.id != id
                })
              })
            }
          }

  },
  created(){
          // Lead Doc
          db.collection("leads").doc(this.$route.params.id).onSnapshot(doc =>{
            this.lead = doc.data()
            this.lead.id = doc.id
          })

          // Show All Lead Files
         let fileRef = db.collection('lead-files').where("id","==",this.$route.params.id).orderBy('timestamp', 'asc');

         fileRef.onSnapshot(snapshot => {
           snapshot.docChanges().forEach(change => {
             if(change.type == 'added'){
               let doc = change.doc
               this.leadFiles.push({
                 id:doc.id,
                 file_name:doc.data().file_name,
                 image:doc.data().image,
                 addBy:doc.data().addBy,
                 adding_date:doc.data().adding_date,
                 timestamp:moment(doc.data().timestamp).format('LL')
               })
             }
           })
         })

         // Show All Lead Records
         let ref = db.collection('leadrecords').where("id","==",this.$route.params.id).orderBy('timestamp', 'asc');

         ref.onSnapshot(snapshot => {
           snapshot.docChanges().forEach(change => {
             if(change.type == 'added'){
               let doc = change.doc
               this.leadrecords.push({
                 id:doc.id,
                 text:doc.data().text,
                 addBy:doc.data().addBy,
                 seenCounselor:doc.data().seenCounselor,
                 timestamp:moment(doc.data().timestamp).format('LLLL')
               })
             }
           })
         })

      
  }


}
</script>

<style>
tbody a{
  font-size: 13px;
  color:black;
  text-decoration: underline;
}
.message-box{
  width: 520px;
  max-height: 530px;
  overflow: auto;
  
}
.message-box::-webkit-scrollbar{
  width: 3px;
}
.message-box::-webkit-scrollbar-track{
  background: #ddd;
}
.message-box::-webkit-scrollbar-thumb{
  background: #aaa;
}
</style>
