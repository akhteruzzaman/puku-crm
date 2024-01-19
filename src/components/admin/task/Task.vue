<template>
  <v-app>

      <Navbar/>
    <div>

      <v-content>
        <v-container fluid grid-list-md>
              <v-data-iterator
                :items="tasks"
                :rows-per-page-items="rowsPerPageItems"
                
                content-tag="v-layout"
                row
                wrap
              >
              <v-flex
                slot="item"
                slot-scope="props"
                xs12
                sm6
                md4
                lg3
              >
              <v-card>
                <v-card-title>
                    <h4>{{ props.item.title }}</h4>                
                </v-card-title>
                <v-divider></v-divider>
                <v-list dense>
                  <v-list-tile>
                    <v-list-tile-content>Date:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.date }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Time:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ props.item.time }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Priority:</v-list-tile-content>
                    <v-list-tile-content class="align-end" v-if="props.item.priority">{{ props.item.priority.text }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content>Status:</v-list-tile-content>
                    <v-list-tile-content class="align-end" v-if="props.item.status">{{ props.item.status.text }}</v-list-tile-content>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-content><i>{{props.item.details}}</i></v-list-tile-content>
                  </v-list-tile>

                  <v-list-tile>
                    <v-list-tile-content class="align-end">
                      <router-link style="color:green" :to="{ name: 'EditTask', params: {id:props.item.id} }">
                        <span>Edit</span>
                      </router-link>
                      <span style="color:red" v-on:click="removeTask(props.item.id)">Delete</span>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-card>
            </v-flex>
          </v-data-iterator>
        </v-container>

        <!-- Add Task Button  -->
        <v-btn :to="{name: 'AddTask'}"
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
  name:'Task',
  components: {
    Navbar
  },
  data(){
      return{
          rowsPerPageItems: [8, 16, 24],
          
          tasks: []
    }
  },
  methods:{
      removeTask(id){
        var result = confirm("Want to delete ?");
        if (result) {
          db.collection('task').doc(id).delete().then(() => {
            this.tasks = this.tasks.filter(task => {
              return task.id != id
            })
          })
        }
      }
  },
  created(){

      // Show All Leads
      let ref = db.collection('task').orderBy('timestamp', 'desc')

      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.tasks.push({
              id:doc.id,
              title:doc.data().title,
              date:doc.data().date,
              time:doc.data().time,
              priority:doc.data().priority,
              status:doc.data().status,
              details:doc.data().details,
              note:doc.data().note,
              timestamp:moment(doc.data().timestamp).fromNow('lll')
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

</style>
