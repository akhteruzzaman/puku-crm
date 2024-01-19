<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="editItem">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="shopping_cart"
                    placeholder="Item Name"
                    required
                    v-model="item.item_name"
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
                    v-model="item.price"
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
                    v-model="item.quantity"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10>
                <h4 v-if="item.item_category">Item Category: {{item.item_category.category_name}}</h4>
                <v-select
                    prepend-icon="shop_two"
                    v-bind:items="item_categories"
                    v-model="item.item_category"
                    label="Category"
                    item-text="category_name"
                    item-value="item_categories"
                    single-line
                    bottom
                    autocomplete
                ></v-select>
              </v-flex>

              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Edit Item</v-btn>
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
  name:'EditItem',
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
      item:'',
    }
  },
  methods:{
      editItem(){
          if(this.item.item_name){
            let ref = db.collection('items').doc(this.$route.params.id);
              ref.update({
              item_name:this.item.item_name,
              price:this.item.price,
              quantity:parseFloat(this.item.quantity),
              item_category:this.item.item_category,
              total:parseFloat(this.item.price * this.item.quantity),
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
     // Show data of a specific Items
     db.collection("items").doc(this.$route.params.id).onSnapshot(doc =>{
        this.item = doc.data()
        this.item.id = doc.id
     })

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
