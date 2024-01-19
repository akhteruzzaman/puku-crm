<template>
  <v-app>
      <Navbar/>
    <div>

      <v-content>

        <v-container>
          <v-layout row wrap>
            <v-flex lg5>
            <v-card>
              <v-card-title><h4>Project Details</h4></v-card-title>
              <v-divider></v-divider>
              <v-list dense class="pukulist">

                <v-list-tile>
                  <v-list-tile-content><b>Project Name:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{project.project_name}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Customer:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end"><span v-if='project.customer'>{{ project.customer.customer_name }}</span></v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Start Date:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{project.start_date}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Deadline:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{project.deadline}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Status:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end"><span v-if='project.status'>{{ project.status.text }}</span></v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Budget:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{project.budget}} {{currency}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Estimated Hours:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{project.estimated_hours}}</v-list-tile-content>
                </v-list-tile>
                <br>
                <v-list-tile-content class="align-end"><i>{{project.details}}</i></v-list-tile-content>

              </v-list>

            </v-card>
          </v-flex>



          <v-flex lg7>
          <v-card>
            <v-card-title><h4>Project Updates</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense class="pukulist">
              <v-list-tile v-for="update in project_updates" :key="update.id">
                <v-list-tile-content><b>{{update.timestamp}}</b> {{update.text}}</v-list-tile-content>
                <a style="color:red;margin-left:10px" v-on:click="removeProjectUpdates(update.id)">Delete</a>
              </v-list-tile>
            </v-list>

            <form @submit.prevent="addProjectUpdates">
                <v-flex xs11 align-center justify-space-between>
                  <v-layout align-center style="margin-left:20px">
                    <v-text-field
                      required
                      prepend-icon="assignment"
                      placeholder="Enter update"
                      v-model="project_update"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
           </form>

          </v-card>
          </v-flex>

        </v-layout>
      </v-container>

    </v-content>
  </div>
</v-app>

</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'ViewProject',
  components: {
    Navbar
  },
  data(){
      return{
          rowsPerPageItems: [8, 16, 24],
          pagination: {
          rowsPerPage: 8
          },
          customer:[],
          project:[],
          current_month_name:moment().format('MMMM'),
          current_year:moment().format('YYYY'),
          project_update:null,
          project_updates:[],
          currency:null,

    }
  },
  methods:{
    addProjectUpdates(){
      if(this.project_update){
        let ref = db.collection('project_updates');
        ref.add({
          id:this.$route.params.id,
          text:this.project_update,
          date:moment().format('DD-MM-YYYY'),
          timestamp:Date.now()
        })
        this.project_update = null
      }else {
        this.feedback = "Please insert some text"
      }
    },
    removeProjectUpdates(id){
      var result = confirm("Want to delete ?");
      if (result) {
        db.collection('project_updates').doc(id).delete().then(() => {
          this.project_updates = this.project_updates.filter(project_update => {
            return project_update.id != id
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

    // Show data of a specific Project
    db.collection("project").doc(this.$route.params.id).onSnapshot(doc =>{
       this.project = doc.data()
       this.project.id = doc.id
    })

    // Show All Project Updates
    let ref = db.collection('project_updates').where("id","==",this.$route.params.id).orderBy('timestamp', 'asc');

    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if(change.type == 'added'){
          let doc = change.doc
          this.project_updates.push({
            id:doc.id,
            text:doc.data().text,
            date:doc.data().date,
            timestamp:moment(doc.data().timestamp).format('ll')
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
.pukulist .list__tile__content{
  border-bottom: 1px solid #00000;
}
h1{
  width: 100%;
}
h4{
  width: 100%;
}
.updates-heading{
  margin-left: 25px;
}
light.divider, .theme--light .divider {
    background-color: rgba(0,0,0,.12);
}
.monthy_total{
  float: right;
  margin-left: 50px;
}
</style>
