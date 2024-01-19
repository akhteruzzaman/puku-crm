<template>
  <v-app>
      <Navbar/>
    <div>
      <v-content>

        <v-card>
          <v-container
            fluid
            style="min-height: 0;"
            grid-list-lg
          >
            <v-layout row wrap>

              <v-flex xs12 sm3>
                <router-link :to="{ name: 'Customers'}">
                  <v-card color="primary" class="white--text main_item" style="text-align:center;">
                    <div class="text-xs-center">
                        <v-icon round color="primary" class="item_icon">people</v-icon>
                    </div>
                    <div class="item ">
                      <p class="headline">Customers</p>
                      <p class="body-2">Customers This Month: {{customer_of_this_month}}</p>
                      <p class="body-2">Total Customers: {{customer_total}} </p>
                    </div>
                      
                    
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm3>
                <router-link :to="{ name: 'Sales'}">
                  <v-card color="success" class="white--text  main_item" style="text-align:center;">
                    <div class="text-xs-center">
                      <v-icon round color="success" class="item_icon">money_off</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Sales</p>
                      <p class="body-2">Sales today: {{sales_today}} {{currency}}</p>
                      <p class="body-2">Sales this month: {{sales_of_this_month}} {{currency}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm3>
                <router-link :to="{ name: 'Expenses'}">
                  <v-card color="error" class="white--text main_item" style="text-align:center;">
                    <div class="text-xs-center">
                      <v-icon round color="error" class="item_icon">all_out</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Expenses</p>
                      <p class="body-2">Expenses today: {{expense_today}} {{currency}}</p>
                      <p class="body-2">Expenses this month: {{expenses_of_this_month}} {{currency}}</p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm3>
                <router-link :to="{ name: 'Leads'}">
                  <v-card color="purple" class="white--text main_item" style="text-align:center;">
                    <div class="text-xs-center">
                      <v-icon round color="purple" class="item_icon">forward</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Leads</p>
                      <p class="body-2">Leads today: {{leads_of_this_month}} </p>
                      <p class="body-2">Total Leads: {{leads_total}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex  xs12 sm3>
                <router-link :to="{ name: 'Items'}">
                  <v-card color="orange" class="white--text main_item" style="text-align:center;">
                    <div class="text-xs-center">
                      <v-icon round color="orange" class="item_icon">shop</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Stocks</p>
                      <p class="body-2">Total items Quantity: {{total_item_quantity}} </p>
                      <p class="body-2">Total value of stocks: {{total_stock_amount}} {{currency}}</p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm3>
                <router-link :to="{ name: 'Project'}">
                  <v-card color="brown" class="white--text main_item" style="text-align:center;">
                    <div class="text-xs-center">
                      <v-icon round color="brown" class="item_icon">theaters</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Projects</p>
                      <p class="body-2">Projects in progress: {{total_inprogress_project}}</p>
                      <p class="body-2">Total Projects: {{total_project}} </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm3>
                <router-link :to="{ name: 'Task'}">
                  <v-card color="indigo" class="white--text main_item" style="text-align:center;">
                    <div class="text-xs-center">
                      <v-icon round color="indigo" class="item_icon">perm_data_setting</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Task</p>
                      <p class="body-2">High priority Task: {{high_priority_task}} </p>
                      <p class="body-2">Total Task: {{total_task}}  </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

              <v-flex xs12 sm3>
                <router-link :to="{ name: 'Settings'}">
                  <v-card color="black" class="white--text main_item" style="text-align:center;">
                    <div class="text-xs-center">
                      <v-icon round color="black" class="item_icon">build</v-icon>
                    </div>
                    <div class="item">
                      <p class="headline">Settings</p>
                      <p class="body-2">Currency: {{currency}} </p>
                      <p class="body-2">Tax: {{tax}}%  </p>
                    </div>
                  </v-card>
                </router-link>
              </v-flex>

            </v-layout>
          </v-container>
        </v-card>

        <!----Sales Chart---->        
        <Chart/>

        <v-container>
          <v-layout row wrap>
            <v-flex lg4>
            <v-card>
              <v-card-title><h4>Income Expense Comparison Of {{current_month_name}}  </h4></v-card-title>
              <v-divider></v-divider>
              <v-list dense class="pukulist">

                <v-list-tile>
                  <v-list-tile-content>Total Sales:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{sales_of_this_month}} {{currency}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Total Expenses:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_of_this_month}} {{currency}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content>Total Tax:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{sales_of_this_month}} * {{tax}}% = {{((this.sales_of_this_month * this.tax)/100).toFixed(2)}} {{currency}}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                  <v-list-tile-content><b>Net Earnings After Tax:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end"><b>{{(this.sales_of_this_month - (this.sales_of_this_month * this.tax)/100 - this.expenses_of_this_month).toFixed(2)}} {{currency}}</b></v-list-tile-content>
                </v-list-tile>

              </v-list>
            </v-card>
          </v-flex>

            <v-flex lg4>
                <v-card>
                  <v-card-title><h4> Customer Updates </h4></v-card-title>
                  <v-divider></v-divider>
                  <v-list dense class="pukulist">

                    <v-list-tile v-for="customerrecord in customerrecords" :key="customerrecord.id">
                      <v-list-tile-content><b>{{customerrecord.name}}</b> {{customerrecord.text}}</v-list-tile-content>
                      <v-list-tile-content class="align-end"><b>{{customerrecord.timestamp}}</b></v-list-tile-content>
                    </v-list-tile>

                  </v-list>
                </v-card>
            </v-flex>

            <v-flex lg4>
              <v-card>
                <v-card-title><h4> Lead Updates </h4></v-card-title>
                <v-divider></v-divider>
                <v-list dense class="pukulist">

                  <v-list-tile v-for="leadrecord in leadrecords" :key="leadrecord.id">
                    <v-list-tile-content><b>{{leadrecord.name}}</b> {{leadrecord.text}}</v-list-tile-content>
                    <v-list-tile-content class="align-end"><b>{{leadrecord.timestamp}}</b></v-list-tile-content>
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
import Chart from '@/components/admin/dashboard/Chart'
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'Dashboard',
  components: {
     Navbar,Chart
  },
  data(){
      return{
        current_month_name:moment().format('MMMM'),
        rowsPerPageItems: [8, 16, 24],
        pagination: {
        rowsPerPage: 8
        },
        customerrecords:[],
        leadrecords:[],
        customerHeaders: [
         { text: 'Customer Name'},
         { text: 'Updates'},
         { text: 'Created' },
        ],
        leadHeaders: [
          { text: 'Name'},
          { text: 'Updates'},
          { text: 'Created' },
        ],
        customer_of_this_month:'',
        customer_total:'',
        sales_of_this_month:'',
        sales_total:'',
        expenses_of_this_month:'',
        expenses_total:'',
        leads_of_this_month:'',
        leads_total:'',
        currency:'',
        sales_today:'',
        expense_today:'',
        total_stock_amount:'',
        total_item_quantity:'',
        total_inprogress_project:'',
        total_project:'',
        high_priority_task:'',
        total_task:'',
        currency:'',
        tax:'',

      }
  },
  created(){

        // Current Currency
        db.collection("settings").doc('config').onSnapshot(doc =>{
           this.currency = doc.data().currency
        })

        // Show All Customer Updates
        let cref = db.collection('customerrecords').orderBy('timestamp', 'desc').limit(4)

        cref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
              let doc = change.doc
              this.customerrecords.push({
                name:doc.data().name,
                text:doc.data().text,
                timestamp:moment(doc.data().timestamp).format('ll')
              })
            }
          })
        })

        // Show All Lead Updates
        let lref = db.collection('leadrecords').orderBy('timestamp', 'desc').limit(4)

        lref.onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if(change.type == 'added'){
              let doc = change.doc
              this.leadrecords.push({
                name:doc.data().name,
                text:doc.data().text,
                timestamp:moment(doc.data().timestamp).format('ll')
              })
            }
          })
        })

        // Total Customers of this Month
        db.collection('customers').where("created_month", "==", moment().format('MM-YYYY'))
       .get()
       .then(snapshot => {
             this.customer_of_this_month = snapshot.size;
        })

        // Total Customers
        db.collection('customers')
       .get()
       .then(snapshot => {
             this.customer_total = snapshot.size;
        })

        // Total Sales of Today
        db.collection('sales').where("sales_date", "==", moment().format('DD-MM-YYYY'))
         .get()
         .then(snapshot => {
               var totalSales = 0;
               snapshot.forEach(doc => {
                  totalSales += Number(doc.data().total)
               })
               this.sales_today = totalSales;
        })

        // Total Sales of this Month
        db.collection('sales').where("created_month", "==", moment().format('MM-YYYY'))
        .get()
        .then(snapshot => {
              var totalSalesOfThisMonth = 0;
              snapshot.forEach(doc => {
                 totalSalesOfThisMonth += Number(doc.data().total)
              })
              this.sales_of_this_month = totalSalesOfThisMonth;
         })

         // Total sales
         db.collection('sales')
        .get()
        .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                 totalSales += Number(doc.data().total)
              })
              this.sales_total = totalSales;
         })

         // Total Expense of this Month
         db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
         .get()
         .then(snapshot => {
               var totalExpensesOfThisMonth = 0;
               snapshot.forEach(doc => {
                  totalExpensesOfThisMonth += Number(doc.data().expense_amount)
               })
               this.expenses_of_this_month = totalExpensesOfThisMonth;
          })

          // Total Expense Today
          db.collection('expenses').where("expense_date", "==", moment().format('DD-MM-YYYY'))
           .get()
           .then(snapshot => {
                 var totalExpense = 0;
                 snapshot.forEach(doc => {
                    totalExpense += Number(doc.data().expense_amount)
                 })
                 this.expense_today = totalExpense;
          })

          // Total Expenses
          db.collection('expenses')
         .get()
         .then(snapshot => {
               var totalExpneses = 0;
               snapshot.forEach(doc => {
                  totalExpneses += Number(doc.data().expense_amount)
               })
               this.expenses_total = totalExpneses;
          })

          // Total Leads of this Month
          db.collection('leads').where("created_month", "==", moment().format('MM-YYYY'))
         .get()
         .then(snapshot => {
               this.leads_of_this_month = snapshot.size;
          })

          // Total Leads
          db.collection('leads')
         .get()
         .then(snapshot => {
               this.leads_total = snapshot.size;
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

          // Total In progress Project
          db.collection('project').where("status.text", "==", "In Progress")
         .get()
         .then(snapshot => {
               this.total_inprogress_project = snapshot.size;
          })

          // Total Project
          db.collection('project')
         .get()
         .then(snapshot => {
               this.total_project = snapshot.size;
          })

          // Total High Priority Task
          db.collection('task').where("priority.text", "==", "High")
         .get()
         .then(snapshot => {
               this.high_priority_task = snapshot.size;
          })

          // Total Task
          db.collection('task')
         .get()
         .then(snapshot => {
               this.total_task = snapshot.size;
          })

          // Current Currency
          db.collection("settings").doc('config').onSnapshot(doc =>{
             this.currency = doc.data().currency
          })

          // Current Tax
          db.collection("settings").doc('config').onSnapshot(doc =>{
             this.tax = doc.data().tax
          })
    }

}
</script>

<style>
  .main_item{
		padding:10px 20px;
    -webkit-transition: all 0.5s;
		-moz-transition: all 0.5s;
		-ms-transition: all 0.5s;
		-o-transition: all 0.5s;
		transition: all 0.5s;
	}
	.main_item:hover{
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5), 0 6px 20px 0 rgba(0, 0, 0, 0.39);
	}
  .item_icon{
		margin:5px 0;
		background:#FFF;
		padding:5px;
		font-size:30px;
		border-radius:50%;
	}
  .item p:nth-child(1){
		margin:0 0 5px;
	}
	.item p:last-child{
		margin-bottom:5px;
	}
	.item p{
		margin:0;
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

</style>
