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
            label="Search Category"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="item_categories"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.category_name }}</td>
            <td class="text-xs-left">{{ props.item.timestamp }}</td>
            <v-btn fab dark small color="pink" @click="removeCategory(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
        </div>

        <!-- Add Expense Button  -->
        <v-btn :to="{name: 'AddItemCategory'}"
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
  name:'Item Categories',
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
        item_categories:[],
        headers: [
         { text: 'Category Name', value: 'category_name', sortable: !1 },
         { text: 'Created At' , value: 'adding_date', sortable: !1 },
         { text: 'Action' , value: 'action', sortable: !1 },
       ]

      }
  },
  methods:{
      removeCategory(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('item_categories').doc(id).delete().then(() => {
            this.item_categories = this.item_categories.filter(item_category => {
              return item_category.id != id
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

        // Show All Category
        let ref = db.collection('item_categories').orderBy('timestamp', 'desc')

        ref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
              let doc = change.doc
              this.item_categories.push({
                id:doc.id,
                category_name:doc.data().category_name,
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
