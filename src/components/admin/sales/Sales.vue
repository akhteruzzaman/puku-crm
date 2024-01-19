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
            label="Search By Sales Date"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="sales"
          :search="search"
          :rows-per-page-items="rowsPerPageItems"
          :pagination.sync="pagination"
          row
          wrap
          class="elevation-1"
        >
          <template slot="items" slot-scope="props">
            <td class="text-xs-left">{{ props.item.item_name.item_name }}</td>
            <td class="text-xs-left">{{ props.item.price }} {{currency}}</td>
            <td class="text-xs-left">{{ props.item.quantity }}</td>
            <td class="text-xs-left">{{ props.item.customer }}</td>
            <td class="text-xs-left">{{ props.item.timestamp }}</td>
            <td class="text-xs-left">{{ props.item.total }} {{currency}}</td>

            <v-btn fab dark small color="pink" @click="removeSales(props.item.id)">
               <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
        </v-data-table>
        

        <!-- Add Customer Button  -->
        <v-btn :to="{name: 'AddSales'}"
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
  name:'Sales',
  components: {
     Navbar
  },
  data(){
      return{
        currency:'',
        search: '',
        sales:[],
        rowsPerPageItems: [8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },
        headers: [
          { text: 'Item Name', value: 'item_name', sortable: !1  },
          { text: 'Unit Price', value: 'price', sortable: !1  },
          { text: 'Quantity', value: 'quantity', sortable: !1  },
          { text: 'Customer', value: 'customer', sortable: !1  },
          { text: 'Created', value: 'timestamp', sortable: !1  },
          { text: 'Total', value: 'total', sortable: !1  },
          { text: 'Action', value: 'item_name', sortable: !1  }
        ]
      }
  },
  methods:{
      removeSales(id){
        var deleteResult = confirm("Want to delete?");
        if (deleteResult) {
          db.collection('sales').doc(id).delete().then(() => {
            this.sales = this.sales.filter(sale => {
              return sale.id != id
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

      // Show All Sales
      let ref = db.collection('sales').where("created_month", "==", moment().format('MM-YYYY'))
                                      .orderBy('timestamp', 'desc')

      ref.onSnapshot(snapshot => {
        snapshot.docChanges().forEach(change => {
          if(change.type == 'added'){
            let doc = change.doc
            this.sales.push({
              id:doc.id,
              item_name:doc.data().item_name,
              price:doc.data().price,
              quantity:doc.data().quantity,
              customer:doc.data().customer.customer_name,
              total:doc.data().total,
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
tbody a{
  font-size: 13px;
  color:black;
  text-decoration: underline;
}
.text-xs-right{
  text-align: left !important;
}
td{
  text-align: center;
}
</style>
