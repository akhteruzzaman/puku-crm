<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="editNotice">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                      <v-text-field
                    prepend-icon="edit"
                    placeholder="Title"
                    required
                    v-model="notice.notice_title"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                  prepend-icon="info"
                    v-model="notice.notice_details"
                    placeholder="Details"
                    required
                    multi-line
                  ></v-text-field>
                </v-layout>
              </v-flex>
            

              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Update Notice</v-btn>
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
  name:'EditNotice',
  components:{
    Navbar
  },
  data(){
    return{
      notice:[],
      notice_title:null,
      notice_details:null,
    
     
      timestamp:null,
      date:null,
    
   
  
    }
  },
  methods:{
      editNotice(){
          if(this.notice.notice_title){

          let ref = db.collection('notices').doc(this.$route.params.id);
            ref.update({
              notice_title:this.notice.notice_title,
            notice_details:this.notice.notice_details,
              
            })
            this.notice_title=null
            this.notice_details=null
           
          }
          this.$router.push({ name: 'Notice'})
      },
   },
   created(){
       // Show data of a specific Employee
       db.collection("notices").doc(this.$route.params.id).onSnapshot(doc =>{
          this.notice = doc.data()
          this.notice.id = doc.id
       })
    }

}
</script>

<style>

</style>
