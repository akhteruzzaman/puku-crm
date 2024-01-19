<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="addNewNotice">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="edit"
                    placeholder="Title"
                    required
                    v-model="notice_title"
                  ></v-text-field>
                </v-layout>
              </v-flex>
              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                  prepend-icon="info"
                    v-model="notice_details"
                    placeholder="Details"
                    required
                    multi-line
                  ></v-text-field>
                </v-layout>
              </v-flex>


                    
              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Add Notice</v-btn>
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
  name:'AddNotice',
  components:{
    Navbar
  },
  data(){
    return{
      notice_title:null,
      notice_details:null,
     
      
      timestamp:null,
      
      date:null,
  
   
     
    }
  },
  methods:{
      addNewNotice(){
          if(this.notice_title){

          let ref = db.collection('notices');
            ref.add({
              notice_title:this.notice_title,
              notice_details:this.notice_details,
              
              
              notice_date:moment().format('DD-MM-YYYY'),
              created_month:moment().format('MM-YYYY'),
              created_year:moment().format('YYYY'),
              timestamp:Date.now()
            })
            this.notice_title=null
            this.notice_details=null
            
          }
          this.$router.push({ name: 'Notice'})
      },
   },
   

}
</script>

<style>

</style>
