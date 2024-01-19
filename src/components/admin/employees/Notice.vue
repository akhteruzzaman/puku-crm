<template>
  <v-app>
      <Navbar/>
    <div>
      <v-content>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search Notices"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="notices"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            
            <td class="text-xs-left">
              <router-link :to="{name: 'AdminViewNotice', params: {id:props.item.id}}" class="link">
              {{ props.item.notice_title }}</router-link>
              </td>
            <td class="text-xs-left">{{ props.item.timestamp }}</td>
            
            <v-btn fab dark small color="cyan" :to="{name: 'EditNotice', params: {id:props.item.id}}">
               <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="pink" @click="removeNotice(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        

        <!-- Add Employee Button  -->
        <v-btn :to="{name: 'AddNotice'}"
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
  name:'Notice',
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
       
        notices:[],
        headers: [
         { text: 'Notice Title', value: 'notice_title', sortable: !1 },
         { text: 'Created' , value: 'created', sortable: !1 },
         { text: 'Action' , value: 'action', sortable: !1 },
       ]

      }
  },
  methods:{
      removeNotice(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('notices').doc(id).delete().then(() => {
            this.notices = this.notices.filter(notice => {
              return notice.id != id
            })
          })
        }
      }

  },
  created(){
       

        // Show All Employee
        let ref = db.collection('notices').where("created_month", "==", moment().format('MM-YYYY'))
                                           .orderBy('timestamp', 'desc')

        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
              let doc = change.doc
              this.notices.push({
                id:doc.id,
                notice_title:doc.data().notice_title,
               
                
                timestamp:moment(doc.data().timestamp).format('ll')
              })
            }
          })
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
.link{
  text-decoration: underline;
}
td{
  text-align: center;
}
</style>
