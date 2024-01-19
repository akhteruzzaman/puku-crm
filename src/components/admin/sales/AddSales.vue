<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="addNewSales">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10>
                <v-select
                    prepend-icon="shopping_cart"
                    v-bind:items="products"
                    v-model="product"
                    label="Products"
                    item-text="item_name"
                    item-value="products"
                    single-line
                    bottom
                    required
                    autocomplete
                    v-on:change="selectedItemPrice"
                ></v-select>
              </v-flex>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="local_atm"
                    placeholder="Price"
                    required
                    v-model="this.productPrice.price"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="note_add"
                    placeholder="Quantity"
                    required
                    v-model="quantity"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10>
                <v-select
                    prepend-icon="group"
                    v-bind:items="customers"
                    v-model="customer"
                    label="Customer"
                    item-text="customer_name"
                    item-value="customers"
                    single-line
                    bottom
                    autocomplete
                ></v-select>
              </v-flex>

              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Add Sales</v-btn>
              </v-flex>

            </v-layout>
          </v-container>

        </v-card>
        </form>
      </v-content>
  </v-app>
</template>

<script>
import Vue from 'vue'
import Navbar from '@/components/admin/navbar/Navbar'
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'AddSales',
  components:{
    Navbar
  },
  data(){
    return{
      dialog:null,
      item_name:'',
      product:'',
      productPrice:[],
      quantity:null,
      payment:'',
      customer:'',
      total:null,
      timestamp:null,
      feedback:null,
      selectedItemID:null,
      previousQuantity:[],
      updatedQuantity:null,
      customers:[],
      products:[],
      item:'',
    }
  },
  methods:{
      selectedItemPrice(selectObj){
          var selectedID = selectObj.id
          this.selectedItemID = selectObj.id

          db.collection("items").doc(selectedID).onSnapshot(doc =>{
            this.productPrice = doc.data()
            this.productPrice.id = doc.id
          })

          // Item Quantity
          db.collection("items").doc(selectedID).onSnapshot(doc =>{
            this.previousQuantity = doc.data()
            this.previousQuantity.id = doc.id
          })
      },
      addNewSales(){

          if(this.product){
            if((this.quantity - this.previousQuantity.quantity) > 0){
              alert("Not enough stock")
            }else{
              let ref = db.collection('sales');
                ref.add({
                  item_name:this.product,
                  price:this.productPrice.price,
                  quantity:this.quantity,
                  customer:this.customer,                
                  total:parseFloat(this.productPrice.price * this.quantity),
                  sales_date:moment().format('DD-MM-YYYY'),
                  created_month:moment().format('MM-YYYY'),
                  created_year:moment().format('YYYY'),
                  timestamp:Date.now()
                })
                this.item_name=null
                this.price=null
                this.customer=null

                // Sale Quantity
                let ref2 = db.collection('items').doc(this.selectedItemID);
                  ref2.update({
                  quantity:parseFloat(this.previousQuantity.quantity - this.quantity),
                  total:parseFloat((this.previousQuantity.quantity - this.quantity) * this.productPrice.price),
                })

                this.$router.push({ name: 'Sales'})
            }

          }


      },
   },
   created(){

       // Show All Customers
       let ref = db.collection('customers').orderBy('timestamp', 'desc')

       ref.onSnapshot(snapshot => {
         snapshot.docChanges().forEach(change => {
           if(change.type == 'added'){
             let doc = change.doc
             this.customers.push({
               id:doc.id,
               customer_name:doc.data().customer_name
             })
           }
         })
       })

       // Show All Items
       let ref2 = db.collection('items').orderBy('timestamp', 'desc')

       ref2.onSnapshot(snapshot => {
         snapshot.docChanges().forEach(change => {
           if(change.type == 'added'){
             let doc = change.doc
             this.products.push({
               id:doc.id,
               item_name:doc.data().item_name,
               price:doc.data().price
             })
           }
         })
       })



    }
}
</script>

<style>

</style>
