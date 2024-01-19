<template>
  <v-app>
      <Navbar/>
    <div>

      <v-content>

        <v-container>
          <v-layout row wrap>
            <v-flex lg6>
            <v-card>
              <v-card-title><h4>Stock Report</h4></v-card-title>
              <v-divider></v-divider>
              <v-list dense class="pukulist">

                <v-list-tile>
                  <v-list-tile-content>Total Category:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{total_stock_category}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Total Items Quantity:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{total_item_quantity}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Items Out Of Stock:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{total_item_out_of_stock}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Total Value Of Stock:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end"><b>{{total_stock_amount}} {{currency}}</b></v-list-tile-content>
                </v-list-tile>

              </v-list>
            </v-card>
          </v-flex>


          <v-flex lg6 >
          <v-card>
            <v-card-title><h4></h4></v-card-title>
            <v-list dense class="pukulist">
              <v-flex lg12>
                <v-card color="orange" class="white--text">
                  <v-card-title primary-title>
                    <h1>Stock Report</h1>
                    <div>
                      <h4>Total Amount of Current Stock : {{total_stock_amount}} {{currency}}</h4>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark :to="{name: 'Items'}">Check All Items</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>

              <v-flex lg12 style="margin-top:10px">
                <v-card color="primary" class="white--text">
                  <v-card-title primary-title>
                    <h1>Monthly Stock Record of {{current_year}}</h1>
                    <div>
                      <h5> Note: Updated stock will save at current month </h5><br>
                      <h4>January : <span class="monthy_total">{{stock_total_january}} {{currency}}</span></h4>
                      <h4>February : <span class="monthy_total">{{stock_total_february}} {{currency}}</span></h4>
                      <h4>March : <span class="monthy_total">{{stock_total_march}} {{currency}}</span></h4>
                      <h4>April : <span class="monthy_total">{{stock_total_april}} {{currency}}</span></h4>
                      <h4>May : <span class="monthy_total">{{stock_total_may}} {{currency}}</span></h4>
                      <h4>June : <span class="monthy_total">{{stock_total_june}} {{currency}}</span></h4>
                      <h4>July : <span class="monthy_total">{{stock_total_july}} {{currency}}</span></h4>
                      <h4>August : <span class="monthy_total">{{stock_total_august}} {{currency}}</span></h4>
                      <h4>September : <span class="monthy_total">{{stock_total_september}} {{currency}}</span></h4>
                      <h4>October : <span class="monthy_total">{{stock_total_october}} {{currency}}</span></h4>
                      <h4>November : <span class="monthy_total">{{stock_total_november}} {{currency}}</span></h4>
                      <h4>December : <span class="monthy_total">{{stock_total_december}} {{currency}}</span></h4>
                      <h3>Current Stock: <span class="monthy_total">{{stock_total_year}} {{currency}}</span></h3>
                    </div>
                  </v-card-title>
                </v-card>
              </v-flex>

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
  name:'StockReport',
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
          current_month_name:moment().format('MMMM'),
          current_year:moment().format('YYYY'),
          stock_total_year:'',
          stock_total_january:'',
          stock_total_february:'',
          stock_total_march:'',
          stock_total_april:'',
          stock_total_may:'',
          stock_total_june:'',
          stock_total_july:'',
          stock_total_august:'',
          stock_total_september:'',
          stock_total_october:'',
          stock_total_november:'',
          stock_total_december:'',
          total_stock_category:'',
          total_item_quantity:'',
          total_stock_amount:'',
          total_item_out_of_stock:'',
    }
  },
  methods:{


  },
  created(){
    // Current Currency
    db.collection("settings").doc('config').onSnapshot(doc =>{
       this.currency = doc.data().currency
    })

    // Total Item Category
    db.collection('item_categories')
   .get()
   .then(snapshot => {
         this.total_stock_category = snapshot.size;
    })

    // Total Item Quantity
    db.collection('items')
   .get()
   .then(snapshot => {
         var totalItemQuantity = 0;
         snapshot.forEach(doc => {
            totalItemQuantity += Number(doc.data().quantity)
         })
         this.total_item_quantity = totalItemQuantity;
    })

    // Total Amount of Stock
    db.collection('items')
   .get()
   .then(snapshot => {
         var totalStockAmount = 0;
         snapshot.forEach(doc => {
            totalStockAmount += Number(doc.data().total)
         })
         this.total_stock_amount = totalStockAmount;
    })

    // Total Item Out of stock
    db.collection('items').where("quantity", "==", 0)
   .get()
   .then(snapshot => {
         this.total_item_out_of_stock = snapshot.size;
    })


    // Total Stock of This Year
    db.collection('items').where("created_year", "==", moment().format('YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_year = totalStock;
    })

    // Total Stock of This January
    db.collection('items').where("created_month", "==", moment().format('01-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_january = totalStock;
    })

    // Total Stock of This February
    db.collection('items').where("created_month", "==", moment().format('02-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_february = totalStock;
    })

    // Total Stock of This March
    db.collection('items').where("created_month", "==", moment().format('03-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_march = totalStock;
    })

    // Total Stock of This April
    db.collection('items').where("created_month", "==", moment().format('04-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_april = totalStock;
    })

    // Total Stock of This May
    db.collection('items').where("created_month", "==", moment().format('05-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_may = totalStock;
    })

    // Total Stock of This June
    db.collection('items').where("created_month", "==", moment().format('06-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_june = totalStock;
    })

    // Total Stock of This July
    db.collection('items').where("created_month", "==", moment().format('07-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_july = totalStock;
    })

    // Total Stock of This August
    db.collection('items').where("created_month", "==", moment().format('08-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_august = totalStock;
    })

    // Total Stock of This September
    db.collection('items').where("created_month", "==", moment().format('09-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_september = totalStock;
    })

    // Total Stock of This October
    db.collection('items').where("created_month", "==", moment().format('10-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_october = totalStock;
    })

    // Total Stock of This November
    db.collection('items').where("created_month", "==", moment().format('11-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_november = totalStock;
    })

    // Total Stock of This December
    db.collection('items').where("created_month", "==", moment().format('12-YYYY'))
     .get()
     .then(snapshot => {
           var totalStock = 0;
           snapshot.forEach(doc => {
              totalStock += Number(doc.data().total)
           })
           this.stock_total_december = totalStock;
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
.pukulist .list__tile__content{
  border-bottom: 1px solid #dadada;
}
h1{
  width: 100%;
}
h4{
  width: 100%;
}
.updates-heading{
  margin-left: 25px;
}
light.divider, .theme--light .divider {
    background-color: rgba(0,0,0,.12);
}
.monthy_total{
  float: right;
  margin-left: 50px;
}
</style>
