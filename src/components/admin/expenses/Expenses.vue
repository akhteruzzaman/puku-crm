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
            label="Search Expenses"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="expenses"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.expense_title }}</td>
            <td class="text-xs-left">{{ props.item.expense_amount }} {{currency}}</td>
            <td class="text-xs-left"><span v-if='props.item.expense_type'>{{ props.item.expense_type }}</span></td>
            <td class="text-xs-left">{{ props.item.timestamp }}</td>
            <v-btn fab dark small color="cyan" :to="{name: 'EditExpense', params: {id:props.item.id}}">
               <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn fab dark small color="pink" @click="removeExpense(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        

        <!-- Add Expense Button  -->
        <v-btn :to="{name: 'AddExpenses'}"
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
  name:'Expenses',
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
        expenses:[],
        headers: [
         { text: 'Expense title', value: 'expense_title', sortable: !1 },
         { text: 'Expense Amount' , value: 'expense_amount', sortable: !1 },
         { text: 'Expense Type' , value: 'expense_type', sortable: !1 },
         { text: 'Created' , value: 'created', sortable: !1 },
         { text: 'Action' , value: 'action', sortable: !1 },
       ]

      }
  },
  methods:{
      removeExpense(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('expenses').doc(id).delete().then(() => {
            this.expenses = this.expenses.filter(expense => {
              return expense.id != id
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

        // Show All Expense
        let ref = db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                           .orderBy('timestamp', 'desc')

        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
              let doc = change.doc
              this.expenses.push({
                id:doc.id,
                expense_title:doc.data().expense_title,
                expense_amount:doc.data().expense_amount,
                expense_type:doc.data().expense_type,
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
