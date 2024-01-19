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
            label="Search Employees"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="employees"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1"
        >
       
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.name }}</td>
            
            <td class="text-xs-left">{{ props.item.timestamp }}</td>
            
            <v-btn fab dark small color="pink" @click="removeEmployee(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        

        

      </v-content>
    </div>
    
  </v-app>
</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'Employee',
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
        employees:[],
        headers: [
         { text: 'Employee Name', value: 'name', sortable: !1 },
         { text: 'Created' , value: 'created', sortable: !1 },
         { text: 'Action' , value: 'action', sortable: !1 },
       ]

      }
  },
  methods:{
      removeEmployee(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('employee').doc(id).delete().then(() => {
            this.employees = this.employees.filter(employee => {
              return employee.id != id
            })
          })
        }
      }

  },
  created(){
       

        // Show All Employee
        let ref = db.collection('employee').orderBy('timestamp', 'desc')

        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
              let doc = change.doc
              this.employees.push({
                id:doc.id,
                name:doc.data().name,
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
td{
  text-align: center;
}
</style>
