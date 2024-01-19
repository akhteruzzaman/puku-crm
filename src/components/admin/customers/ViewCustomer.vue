<template>
  <v-app>
      <Navbar/>
    <div>

      <v-content>

        <v-container>
          <v-layout row wrap>
            <v-flex lg4>
            <v-card>
              <v-card-title><h4>Customer Details</h4></v-card-title>
              <v-divider></v-divider>
              <v-list dense class="pukulist">

                <v-list-tile>
                  <v-list-tile-content><b>Customer Name:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.customer.customer_name}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Email:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.customer.email}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Phone:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.customer.phone}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Company:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.customer.company}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Designation:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.customer.designation}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Country:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.customer.country}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>City:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.customer.city}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Website:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end">{{this.customer.website}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Source:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end"><span v-if="this.customer.source">{{this.customer.source.text}}</span></v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Rating:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end"><span v-if="this.customer.rating">{{this.customer.rating.text}}</span></v-list-tile-content>
                </v-list-tile>

                <br>
                <v-list-tile-content class="align-end"><i>{{this.customer.details}}</i></v-list-tile-content>

              </v-list>
            </v-card>
          </v-flex>

          <v-flex lg5>
          <v-card>
            <v-card-title><h4>Customer Updates</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense class="pukulist">
              <v-list-tile v-for="customerrecord in customerrecords" :key="customerrecord.id">
                <v-list-tile-content><b>{{customerrecord.timestamp}}</b> {{customerrecord.text}}</v-list-tile-content>
                <a style="color:red;margin-left:10px" v-on:click="removecustomerRecord(customerrecord.id)">Delete</a>
              </v-list-tile>
            </v-list>

            <form @submit.prevent="addUpdates">
                <v-flex xs11 align-center justify-space-between>
                  <v-layout align-center style="margin-left:20px">
                    <v-text-field
                      required
                      prepend-icon="assignment"
                      placeholder="Enter updates"
                      v-model="customerupdates"
                    ></v-text-field>
                  </v-layout>
                </v-flex>
            </form>

          </v-card>
          </v-flex>

          <v-flex lg3>
          <v-card>
            <v-card-title><h4>Customer Sales Records</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense class="pukulist">
              <v-list-tile v-for="customerSalesRecord in customerSalesRecords" :key="customerSalesRecord.id">
                <v-list-tile-content><b>{{customerSalesRecord.item}}</b> {{customerSalesRecord.timestamp}}</v-list-tile-content>
              </v-list-tile>
            </v-list>



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
  name:'ViewCustomer',
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
          sources: [
            { id: 1, text: 'Facebook' },
            { id: 2, text: 'Website' },
            { id: 3, text: 'Networks' },
            { id: 4, text: 'Direct Marketing' },
            { id: 5, text: 'Others' },
          ],
          customer_name:null,
          email:null,
          phone:null,
          country:null,
          city:null,
          website:null,
          company:null,
          designation:null,
          source:null,
          rating:null,
          details:null,
          feedback:null,
          customerupdates:null,
          customerrecords:[],
          currency:null,
          customerSalesRecords:[],
    }
  },
  methods:{
          addUpdates(){
            if(this.customerupdates){
              let ref = db.collection('customerrecords');
              ref.add({
                id:this.$route.params.id,
                text:this.customerupdates,
                name:this.customer.customer_name,
                date:moment().format('DD-MM-YYYY'),
                timestamp:Date.now()
              })
              this.customerupdates = null
            }else {
              this.feedback = "Please insert some text"
            }
          },
          removecustomerRecord(id){
            var result = confirm("Want to delete ?");
            if (result) {
              db.collection('customerrecords').doc(id).delete().then(() => {
                this.customerrecords = this.customerrecords.filter(customerrecord => {
                  return customerrecord.id != id
                })
              })
            }
          }

  },
  created(){
          // Single Customer
          db.collection("customers").doc(this.$route.params.id).onSnapshot(doc =>{
            this.customer = doc.data()
            this.customer.id = doc.id
          })

         // Show All customer Records
         let ref = db.collection('customerrecords').where("id","==",this.$route.params.id).orderBy('timestamp', 'asc');

         ref.onSnapshot(snapshot => {
           snapshot.docChanges().forEach(change => {
             if(change.type == 'added'){
               let doc = change.doc
               this.customerrecords.push({
                 id:doc.id,
                 text:doc.data().text,
                 date:doc.data().date,
                 timestamp:moment(doc.data().timestamp).format('ll')
               })
             }
           })
         })

         // Customer Sales Records
         let sref = db.collection('sales').where("customer.id","==",this.$route.params.id).orderBy('timestamp', 'desc');

         sref.onSnapshot(snapshot => {
           snapshot.docChanges().forEach(change => {
             if(change.type == 'added'){
               let doc = change.doc
               this.customerSalesRecords.push({
                 id:doc.id,
                 item:doc.data().item_name.item_name,
                 price:doc.data().price,
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
</style>
