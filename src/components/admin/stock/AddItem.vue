<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="addNewItem">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="shopping_cart"
                    placeholder="Item Name"
                    required
                    v-model="item_name"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="local_atm"
                    placeholder="Price"
                    required
                    v-model="price"
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
                    prepend-icon="shop_two"
                    v-bind:items="item_categories"
                    v-model="item_category"
                    label="Category"
                    item-text="category_name"
                    item-value="item_categories"
                    single-line
                    bottom
                    autocomplete
                ></v-select>
              </v-flex>

              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Add Item</v-btn>
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
  name:'AddItem',
  components:{
    Navbar
  },
  data(){
    return{
      dialog:null,
      item_name:null,
      price:null,
      quantity:null,
      item_category:'',
      total:null,
      timestamp:null,
      feedback:null,
      item_categories:[],
    }
  },
  methods:{
      addNewItem(){
          if(this.item_name){
          let ref = db.collection('items');
            ref.add({
              item_name:this.item_name,
              price:this.price,
              quantity:this.quantity,
              item_category:this.item_category,
              total:parseFloat(this.price * this.quantity),
              adding_date:moment().format('DD-MM-YYYY'),
              created_month:moment().format('MM-YYYY'),
              created_year:moment().format('YYYY'),
              timestamp:Date.now()
            })
            this.item_name=null
            this.price=null
            this.quantity=null
            this.customer=null
          }
          this.$router.push({ name: 'Items'})
      },
   },
   created(){

       // Show All Categories
       let ref = db.collection('item_categories').orderBy('timestamp', 'desc')

       ref.onSnapshot(snapshot => {
         snapshot.docChanges().forEach(change => {
           if(change.type == 'added'){
             let doc = change.doc
             this.item_categories.push({
               id:doc.id,
               category_name:doc.data().category_name
             })
           }
         })
       })
    }
}
</script>

<style>

</style>
