<template>   
    <div>
        <v-container grid-list-lg class="mt-4">
          <v-layout row wrap>
            <v-flex xs12 md6 mb-5>
              <h4 class="py-3">Weekly Sales Report</h4>
              <div class="chart_vue">
                
                <template v-slot:default>                   
                    <tbody  class="table graf_background">
                      <tr>
                        <td class="relative"><span class="progress_value">{{highest_sales_between_last_7_days}}</span></td>
                        <td></td>
                      </tr>
                     <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.9)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.8)}}</span></td>
                        <td></td>
                      </tr>
                     <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.7)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.6)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.5)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.4)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.3)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.2)}}</span></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td class="relative"><span class="progress_value">{{parseInt(highest_sales_between_last_7_days*0.1)}}</span></td>
                        <td></td>
                      </tr>
                    </tbody>
                </template>
                               
                <v-flex xs12 class="graf_section">
                  <div class="box">

                    <div class="skill">
                      <div class="graph" :style="{'height':(sales_today_before_6/highest_sales_between_last_7_days)*100+'%'}">
                          <div class="percent">{{sales_today_before_6}}</div>
                      </div>
                      <div class="name">{{today_before_6}}</div>
                    </div>
                     
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_5/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_5}}</div>
                        </div>
                        <div class="name">{{today_before_5}}</div>
                    </div>
                    
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_4/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_4}}</div>
                        </div>
                        <div class="name">{{today_before_4}}</div>
                    </div>
                    
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_3/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_3}}</div>
                        </div>
                        <div class="name">{{today_before_3}}</div>
                    </div>
                    
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_2/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_2}}</div>
                        </div>
                        <div class="name">{{today_before_2}}</div>
                    </div>
                    
                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today_before_1/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today_before_1}}</div>
                        </div>
                        <div class="name">{{today_before_1}}</div>
                    </div>

                    <div class="skill">
                        <div class="graph" :style="{'height':(sales_today/highest_sales_between_last_7_days)*100+'%'}">
                            <div class="percent">{{sales_today}}</div>
                        </div>
                        <div class="name">{{today}}</div>
                    </div>
                  
                  </div>
                </v-flex>
              </div>
            </v-flex>

            <v-flex xs12 md6 class="pie_container mb-5">
              <!---2nd pie chart----->
              <div  class="pie_background">
              </div>
              <div class="pie_box  px-4">
                <h4 class="pt-3">Income Expense Comparison of {{current_month_name}}</h4>
                
                <v-flex class="mt-5">
                  <div class="pie_chart_2 mb-2" :style="{'margin':'auto','background':pieChart}">
                    <div class="pie_chart_2_donut">
                        <div class="pie_chart_2_donut_overlay">
                            <!--<h2>80%</h2>-->
                        </div>
                    </div>
                  </div>
                  <div class="pie_chart_list_2 mt-5">
                      <span>Sales:{{sales_of_this_month}} {{currency}}</span>
                      <span>Expense:{{expenses_of_this_month}} {{currency}}</span>
                  </div>
                </v-flex>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
    </div>
</template>

<script>
import Navbar from '@/components/admin/navbar/Navbar'
import db from '@/firebase/init'
import moment from 'moment'
export default {
  name:'Chart',
  components: {

  },
  data(){
      return{
        current_month_name:moment().format('MMMM'),
        currency:'',         
        today:moment().format("DD-MM"),
        today_before_1:moment().subtract(1, "days").format("DD-MM"),
        today_before_2:moment().subtract(2, "days").format("DD-MM"),
        today_before_3:moment().subtract(3, "days").format("DD-MM"),
        today_before_4:moment().subtract(4, "days").format("DD-MM"),
        today_before_5:moment().subtract(5, "days").format("DD-MM"),
        today_before_6:moment().subtract(6, "days").format("DD-MM"),       
        sales_today:null,
        sales_today_before_1:null,      
        sales_today_before_2:'',      
        sales_today_before_3:'',      
        sales_today_before_4:'',      
        sales_today_before_5:'',      
        sales_today_before_6:'',
        sales_of_this_month:'',
        expenses_of_this_month:'',
      }
  },
  computed:{
        highest_sales_between_last_7_days(){
          return Math.max(this.sales_today,this.sales_today_before_1,this.sales_today_before_2,this.sales_today_before_3,this.sales_today_before_4,this.sales_today_before_5,this.sales_today_before_6)
        },
        pieChart(){
          var totalSalesAndExpense = this.sales_of_this_month + this.expenses_of_this_month
          var salesPercentage = (this.sales_of_this_month/totalSalesAndExpense)*100
          var expensePercentage = (this.expenses_of_this_month/totalSalesAndExpense)*100
          return 'conic-gradient(#1976d2 '+salesPercentage+'%,#e8eaf6 '+expensePercentage+'%)';
        }       
  },
  created(){

        // Current Currency
        db.collection("settings").doc('config').onSnapshot(doc =>{
           this.currency = doc.data().currency
        })      

        // ---------Sales Bar Chart--------- //        

        // Total Sales Today
        db.collection('sales').where("sales_date", "==", moment().format('DD-MM-YYYY'))
            .get()
            .then(snapshot => {
                var totalSales = 0;
                snapshot.forEach(doc => {
                  totalSales += Number(doc.data().total)
                })
                this.sales_today = totalSales;
        })

        // Total Sales Today before 1        
        var yesterday = moment().subtract(1, "days").format("DD-MM-YYYY");
        db.collection('sales').where("sales_date", "==", yesterday)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().total)
              })
              this.sales_today_before_1 = totalSales;
        })

        // Total Sales Today before 2        
        var yesterday = moment().subtract(2, "days").format("DD-MM-YYYY");
        db.collection('sales').where("sales_date", "==", yesterday)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().total)
              })
              this.sales_today_before_2 = totalSales;
        })

        // Total Sales Today before 3        
        var yesterday = moment().subtract(3, "days").format("DD-MM-YYYY");
        db.collection('sales').where("sales_date", "==", yesterday)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().total)
              })
              this.sales_today_before_3 = totalSales;
        })

        // Total Sales Today before 4        
        var yesterday = moment().subtract(4, "days").format("DD-MM-YYYY");
        db.collection('sales').where("sales_date", "==", yesterday)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().total)
              })
              this.sales_today_before_4 = totalSales;
        })

        // Total Sales Today before 5        
        var yesterday = moment().subtract(5, "days").format("DD-MM-YYYY");
        db.collection('sales').where("sales_date", "==", yesterday)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().total)
              })
              this.sales_today_before_5 = totalSales;
        })

        // Total Sales Today before 6        
        var yesterday = moment().subtract(6, "days").format("DD-MM-YYYY");
        db.collection('sales').where("sales_date", "==", yesterday)
            .get()
            .then(snapshot => {
              var totalSales = 0;
              snapshot.forEach(doc => {
                totalSales += Number(doc.data().total)
              })
              this.sales_today_before_6 = totalSales;
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


  }  

}
</script>

<style scoped>
h1{
  width: 100%;
}
h4{
  width: 100%;
  color:rgb(0,0,0,0.87);
}
a{
  text-decoration: none;
}
p{
  margin-bottom: 0!important;
}
.chart_vue{
  position:relative;
  height:400px;
  width:100%;
}
.updates-heading{
  margin-left: 25px;
}
.graf_background{
  width:100%!important;
  height:100%; 
  display: table;
} 
.graf_background td:nth-of-type(1){
  text-align: right;
  padding-right:10px;
}
.graf_background td:nth-of-type(2){
  border-top:1px solid #ece8e8;
  border-left:1px solid #ece8e8;
  border-right:1px solid #ece8e8;
  width:100%!important;
}
.graf_background tr:last-child td:nth-of-type(2){
  border-bottom:1px solid #ece8e8;
}
.graf_background .progress_value{
  font-size: 11px;  
}
.graf_section{
  width:100%;
  height:100%;
  position:absolute;
  bottom:0;
}
.box{
  position:absolute;
  width:100%;
  height:100%;
  bottom:0;
  display:flex;
  padding:0 10px;
}
.box .skill{
  position:relative;
  flex:1;
  text-align: center;
  margin-left:20px;
}
.box .skill .graph{
  position:absolute;
  width:50%;
  bottom:0;
  left:50%;
  transform: translateX(-50%);
  background:#1976d2;
  box-shadow: 1px -1px #1976d2, 2px -2px #4a8aca, 3px -3px #4a8aca,   4px -4px #4a8aca, 5px -5px #4a8aca, 6px -6px #4a8aca, 7px -7px   #4a8aca, 8px -8px #4a8aca, 9px -9px #4a8aca, 10px -10px #4a8aca;
  animation: bargrowth 4000ms ease;
}
@-webkit-keyframes bargrowth{
  0%   {max-height: 0%;}
  100%  {max-height: 100%;}
}
@keyframes bargrowth{
  0%   {max-height: 0%;}
  100%  {max-height: 100%;}
}
.box .skill .name{
  position:absolute;
  bottom:-25px;
  left:50%;
  transform: translateX(-50%);
  font-size: 11px;
  width:50px;
}
.box .skill .graph:before{
  content:'';
  position:absolute;
  top:2px;
  left:2px;
  right:2px;
  bottom:0;
  background:#1976d2;
}
.box .skill .graph .percent{
  position:absolute;
  top: -25px;
  margin-left: 10px;
  left:50%;
  transform: translateX(-50%);
  text-align: center;
  color: rgb(0,0,0,0.87);
  font-weight: bold;
  font-size: 11px;
}

  .pie_chart{
    width:140px;
    height:140px;
    border-radius:50%; 
    border:1px solid #ece8e8;
    position:relative;
  }
  .pie_chart_2{
    width:300px;
    height:300px;
    border-radius:50%; 
    border:1px solid #ece8e8;
    position:relative;
  }
  .pie_container{
    position: relative;
    height:100%;
  }
  .pie_background{
    position: absolute;
    left:0;
    top:0;
    height:100%;
    width:100%;
    box-shadow: 2px 2px 15px 0px #ccc;
    background:#FFF;
    z-index:-111111;
  }
  .pie_box{
  width:100%;
  height:100%;
  z-index: 1;
}
  .pie_chart_list{
    text-align:center;
  }
  .pie_chart_list_2{
    text-align:left;
    display: grid;
  }
  .pie_chart_list span{
    position:relative;
  }
  .pie_chart_list_2 span{
    position:relative;
  }
  .pie_chart_list span:before{
    content:'';
    position:absolute;
    top:5px;
    margin-left:-15px;
    height:10px;
    width:10px;
    border-radius: 1px;
  }
  .pie_chart_list_2 span:before{
    content:'';
    position:absolute;
    top:5px;
    margin-left:-15px;
    height:10px;
    width:10px;
    border-radius: 1px;
  }
  .pie_chart_list span:nth-child(1):before{
     background: #1976d2;
  }
  .pie_chart_list span:nth-child(2):before{
    background: #EAF1F5;
    border:1px solid #1976d2;
  }
  .pie_chart_list_2 span:nth-child(1):before{
     background: #1976d2;
  }
  .pie_chart_list_2 span:nth-child(2):before{
    background: #EAF1F5;
    border:1px solid #1976d2;
  }
  .pie_chart_2_donut{
    height:100%;
    width:100%;
    border-radius:50%;
    padding:50px;
  }
  .pie_chart_2_donut_overlay{
    height:100%;
    width:100%;
    background:#FFF;
    border-radius:50%;
    text-align: center;
    line-height: 200px;
  }
  @media(max-width: 350px){
    .pie_chart_2{
      width:150px;
      height:150px;
      border-radius:50%; 
      border:1px solid #ece8e8;
      position:relative;
  }
  .pie_chart_2_donut{
    height:100%;
    width:100%;
    border-radius:50%;
    padding:40px;
  }
  }
</style>
