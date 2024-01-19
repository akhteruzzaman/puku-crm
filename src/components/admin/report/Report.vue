<template>
  <v-app>
    <Navbar/>

    <v-content>
        <div class="chart-box">
        <div class="progress_bar" v-show="ProgressBar">
          <v-progress-circular
            :size="150"
            :width="15"
            :rotate="180"
            :value="value"
            color="primary"
          >
            {{ value }}
          </v-progress-circular>
        </div>
            <canvas ref="chart" v-show="!ProgressBar"></canvas>
        </div>


      <v-container>
        <v-layout row wrap>
          <v-flex lg4>
          <v-card>
            <v-card-title><h2>Report of Today </h2></v-card-title>
            <v-divider></v-divider>
            <v-list dense class="pukulist">

              <v-list-tile>
                <v-list-tile-content>Total Sales:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{sales_today}} {{currency}}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Total Expenses:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{expense_today}} {{currency}}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content>Total Tax:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{sales_today}} * {{tax}}% = {{((this.sales_today * this.tax)/100).toFixed(2)}} {{currency}}</v-list-tile-content>
              </v-list-tile>

              <v-list-tile>
                <v-list-tile-content><b>Net Earnings After Tax:</b></v-list-tile-content>
                <v-list-tile-content class="align-end"><b>{{(this.net_earnings_today = this.sales_today - (this.sales_today * this.tax)/100 - this.expense_today).toFixed(2)}} {{currency}}</b></v-list-tile-content>
              </v-list-tile>

            </v-list>
          </v-card>
        </v-flex>

        <v-flex lg4>
        <v-card>
          <v-card-title><h2>Report of {{current_month_name}} </h2></v-card-title>
          <v-divider></v-divider>
          <v-list dense class="pukulist">

            <v-list-tile>
              <v-list-tile-content>Total Sales:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{sales_this_month}} {{currency}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Total Expenses:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{expense_this_month}} {{currency}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content>Total Tax:</v-list-tile-content>
              <v-list-tile-content class="align-end">{{sales_this_month}} * {{tax}}% = {{((this.sales_this_month * this.tax)/100).toFixed(2)}} {{currency}}</v-list-tile-content>
            </v-list-tile>

            <v-list-tile>
              <v-list-tile-content><b>Net Earnings After Tax:</b></v-list-tile-content>
              <v-list-tile-content class="align-end"><b>{{(this.sales_this_month - (this.sales_this_month * this.tax)/100 - this.expense_this_month).toFixed(2)}} {{currency}}</b></v-list-tile-content>
            </v-list-tile>

          </v-list>
        </v-card>
      </v-flex>

      <v-flex lg4>
      <v-card>
        <v-card-title><h2>Report of {{current_year}} </h2></v-card-title>
        <v-divider></v-divider>
        <v-list dense class="pukulist">

          <v-list-tile>
            <v-list-tile-content>Total Sales:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{sales_this_year}}</v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>Total Expenses:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{expense_this_year}}</v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content>Total Tax:</v-list-tile-content>
            <v-list-tile-content class="align-end">{{sales_this_year}} * {{tax}}% = {{((this.sales_this_year * this.tax)/100).toFixed(2)}} {{currency}}</v-list-tile-content>
          </v-list-tile>

          <v-list-tile>
            <v-list-tile-content><b>Net Earnings After Tax:</b></v-list-tile-content>
            <v-list-tile-content class="align-end"><b>{{(this.sales_this_year - (this.sales_this_year * this.tax)/100 - this.expense_this_year).toFixed(2)}} {{currency}}</b></v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-card>
    </v-flex>




      </v-layout>
    </v-container>

  </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import Chart from 'chart.js';
import db from '@/firebase/init'
import moment from 'moment'

  export default {
    name:'Report',
    components:{
      Navbar
    },
    data(){
      return{
            month:'',
            current_month_name:moment().format('MMMM'),
            current_year:moment().format('YYYY'),
            sales_today:'',
            sales_this_month:'',
            sales_this_year:'',
            expense_today:'',
            expense_this_month:'',
            expense_this_year:'',
            net_earnings_today:'',
            sales_january:'',
            sales_february:'',
            sales_march:'',
            sales_april:'',
            sales_may:'',
            sales_june:'',
            sales_july:'',
            sales_august:'',
            sales_september:'',
            sales_october:'',
            sales_november:'',
            sales_december:'',
            number:1000,
            currency:'',
            tax:'',
            total_sales_tax_today:'',
            labels: [],
            interval: {}, // progress bar
            value: 0, // progress bar
            ProgressBar:true
        }
    },
    beforeDestroy () {
     clearInterval(this.interval)
    },
    created(){
      // Current Currency
      db.collection("settings").doc('config').onSnapshot(doc =>{
         this.currency = doc.data().currency
      })

      // Current Tax
      db.collection("settings").doc('config').onSnapshot(doc =>{
         this.tax = doc.data().tax
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

      // Total Expense of Today
      db.collection('expenses').where("expense_date", "==", moment().format('DD-MM-YYYY'))
       .get()
       .then(snapshot => {
             var totalExpense = 0;
             snapshot.forEach(doc => {
                totalExpense += Number(doc.data().expense_amount)
             })
             this.expense_today = totalExpense;

      })



      // Total Sales of This Month
      db.collection('sales').where("created_month", "==", moment().format('MM-YYYY'))
       .get()
       .then(snapshot => {
             var totalSales = 0;
             snapshot.forEach(doc => {
                totalSales += Number(doc.data().total)
             })
             this.sales_this_month = totalSales;
      })

      // Total Expense This Month
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
       .get()
       .then(snapshot => {
             var totalExpense = 0;
             snapshot.forEach(doc => {
                totalExpense += Number(doc.data().expense_amount)
             })
             this.expense_this_month = totalExpense;
      })

      // Total Sales of This Year
      db.collection('sales').where("created_year", "==", moment().format('YYYY'))
       .get()
       .then(snapshot => {
             var totalSales = 0;
             snapshot.forEach(doc => {
                totalSales += Number(doc.data().total)
             })
             this.sales_this_year = totalSales;
      })

      // Total Expense This Year
      db.collection('expenses').where("created_year", "==", moment().format('YYYY'))
       .get()
       .then(snapshot => {
             var totalExpense = 0;
             snapshot.forEach(doc => {
                totalExpense += Number(doc.data().expense_amount)
             })
             this.expense_this_year = totalExpense;
      })


      var d = new Date();
      this.month = d.getMonth();
      this.labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"]
    },
    mounted() {

      // Progress Bar
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return this.ProgressBar = false
        }
        this.value += 10
      }, 1000)

      // January
      let month1 = moment().format('01-YYYY');
      db.collection('sales').where("created_month", "==", month1)
     .get()
     .then(snapshot => {
           var total1 = 0;
           snapshot.forEach(doc => {
              total1 += Number(doc.data().total)
           })
           this.sales_january = total1;

       // February
       let month2 = moment().format('02-YYYY');
       db.collection('sales').where("created_month", "==", month2)
      .get()
      .then(snapshot => {
            var total2 = 0;
            snapshot.forEach(doc => {
               total2 += Number(doc.data().total)
            })
            this.sales_february = total2;

        // March
        let month3 = moment().format('03-YYYY');
        db.collection('sales').where("created_month", "==", month3)
       .get()
       .then(snapshot => {
             var total3 = 0;
             snapshot.forEach(doc => {
                total3 += Number(doc.data().total)
             })
             this.sales_march = total3;

         // April
         let month4 = moment().format('04-YYYY');
         db.collection('sales').where("created_month", "==", month4)
        .get()
        .then(snapshot => {
              var total4 = 0;
              snapshot.forEach(doc => {
                 total4 += Number(doc.data().total)
              })
              this.sales_april = total4;

          // May
          let month5 = moment().format('05-YYYY');
          db.collection('sales').where("created_month", "==", month5)
         .get()
         .then(snapshot => {
               var total5 = 0;
               snapshot.forEach(doc => {
                  total5 += Number(doc.data().total)
               })
               this.sales_may = total5;

          // June
          let month6 = moment().format('06-YYYY');
          db.collection('sales').where("created_month", "==", month6)
         .get()
         .then(snapshot => {
               var total6 = 0;
               snapshot.forEach(doc => {
                  total6 += Number(doc.data().total)
               })
               this.sales_june = total6;

           // July
           let month7 = moment().format('07-YYYY');
           db.collection('sales').where("created_month", "==", month7)
          .get()
          .then(snapshot => {
                var total7 = 0;
                snapshot.forEach(doc => {
                   total7 += Number(doc.data().total)
                })
                this.sales_july = total7;

            // August
            let month8 = moment().format('08-YYYY');
            db.collection('sales').where("created_month", "==", month8)
           .get()
           .then(snapshot => {
                 var total8 = 0;
                 snapshot.forEach(doc => {
                    total8 += Number(doc.data().total)
                 })
                 this.sales_august = total8;

           // September
           let month9 = moment().format('09-YYYY');
           db.collection('sales').where("created_month", "==", month9)
          .get()
          .then(snapshot => {
                var total9 = 0;
                snapshot.forEach(doc => {
                   total9 += Number(doc.data().total)
                })
                this.sales_september = total9;

            // October
            let month10 = moment().format('10-YYYY');
            db.collection('sales').where("created_month", "==", month10)
           .get()
           .then(snapshot => {
                 var total10 = 0;
                 snapshot.forEach(doc => {
                    total10 += Number(doc.data().total)
                 })
                 this.sales_october = total10;

           // Nomeber
           let month11 = moment().format('11-YYYY');
           db.collection('sales').where("created_month", "==", month11)
          .get()
          .then(snapshot => {
                var total11 = 0;
                snapshot.forEach(doc => {
                   total11 += Number(doc.data().total)
                })
                this.sales_november = total11;

          // December
          let month12 = moment().format('12-YYYY');
          db.collection('sales').where("created_month", "==", month12)
         .get()
         .then(snapshot => {
               var total12 = 0;
               snapshot.forEach(doc => {
                  total12 += Number(doc.data().total)
               })
               this.sales_december = total12;


      // Chart Code Start
      var monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"];
      var d = new Date();
      var chart = this.$refs.chart;
      var ctx = chart.getContext("2d");
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels:this.labels,
              datasets: [{
                  label: 'Sales of '+ moment().format('YYYY'),
                  data: [this.sales_january,
                         this.sales_february,
                         this.sales_march,
                         this.sales_april,
                         this.sales_may,
                         this.sales_june,
                         this.sales_july,
                         this.sales_august,
                         this.sales_september,
                         this.sales_october,
                         this.sales_november,
                         this.sales_december],
                  backgroundColor: [
                      '#ffffff'
                  ],
                  borderColor: [
                      '#1976d2'
                  ],
                  borderWidth: 3
              }]
          },
          options: {
              scales: {
                  yAxes: [{
                      ticks: {
                          beginAtZero: true
                      },
                      legend: {
                          display: false
                      },
                      tooltips: {
                          callbacks: {
                             label: function(tooltipItem) {
                                    return tooltipItem.label;
                             }
                          }
                      }
                  }]
              }
          },
        });
        // Chart Code End


        }) // 12 End
        }) // 11 End
        }) // 10 End
        }) // 9 End
        }) // 8 End
        }) // 7 End
        }) // 6 End
        }) // 5 End
        }) // 4 End
        }) // 3 End
        }) // 2 End
        }) // 1 End

      },
      methods:{

      }


  }
</script>

<style>
.progress_bar{
  text-align: center
}

.progress-circular{
  margin: 15rem
}

</style>
