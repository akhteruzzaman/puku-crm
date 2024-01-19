<template>
  <v-app>

      <Navbar/>
      <v-content>

      
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                    <h2> {{notice.notice_title}}</h2>
                    
                      
                </v-layout>
              </v-flex>
              
              <v-flex xs10 align-center justify-space-between>
                  <v-layout align-center>
                  
                  <div class="empnotice">
                  <p>{{notice.notice_details}}</p>
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
  name:'AdminViewNotice',
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
.emp{
  padding-bottom: 25px;
  text-decoration: underline;
  margin-bottom: 20px;
}
.empnotice{
  
  padding: 5px;
  
}
p{
  line-height: 28px;
  margin-bottom: 15px;
  font-size: 16px;
}

</style>
