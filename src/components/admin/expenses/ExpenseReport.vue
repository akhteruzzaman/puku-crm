<template>
  <v-app>
      <Navbar/>
    <div>

      <v-content>

        <v-container>
          <v-layout row wrap>
            <v-flex lg6>
            <v-card>
              <v-card-title><h4>Expenses of {{current_month_name}}</h4></v-card-title>
              <v-divider></v-divider>
              <v-list dense class="pukulist">

                <v-list-tile>
                  <v-list-tile-content>Administration Fees:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_administration_fees}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Computing Rentals:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_computing_rentals}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Cost Of Goods Sold:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_cost_of_goods_sold}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Depreciation Expense:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_depreciation_expense}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Entertainment:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_entertainment}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Fuel:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_fuel}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Interest:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_interest}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Licence Fees:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_licence_fees}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Meals:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_meals}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Network & Communications:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_network_communications}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Professional Fees:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_professional_fees}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Rent:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_rent}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Subscriptions:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_subscriptions}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Utilities:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_utilities}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Advertising:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_advertising}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Conventions:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_conventions}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Delivery & Freight:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_delivery_freight}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Electricity:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_electricity}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Equipment Leases:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_equipment_leases}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Insurance:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_insurance}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Legal Fees:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_legal_fees}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Maintenance:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_maintenance}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Memberships:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_memberships}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Office Supplies:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_office_supplies}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Property Taxes:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_property_taxes}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Salaries & Benefits:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_salaries_benefits}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Travel:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_travel}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content>Vehicle Leases:</v-list-tile-content>
                  <v-list-tile-content class="align-end">{{expenses_total_by_vehicle_leases}} {{currency}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-content><b>Total:</b></v-list-tile-content>
                  <v-list-tile-content class="align-end"><b>{{expenses_total}} {{currency}}</b></v-list-tile-content>
                </v-list-tile>

              </v-list>
            </v-card>
          </v-flex>


          <v-flex lg6 >
          <v-card>
            <v-card-title><h4></h4></v-card-title>          
            <v-list dense class="pukulist">

              <v-flex lg12>
                <v-card color="error" class="white--text">
                  <v-card-title primary-title>
                    <h1>Expense of {{current_month_name}}</h1>
                    <div>
                      <h4>Total Expense Of This Month : {{expenses_total}} {{currency}}</h4>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-btn flat dark :to="{name: 'Expenses'}">Check All Expenses</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>

              <v-flex lg12 style="margin-top:10px">
                <v-card color="primary" class="white--text">
                  <v-card-title primary-title>
                    <h1>Expense of {{current_year}}</h1>
                    <div>
                      <h4>January : <span class="monthy_total">{{expense_total_january}} {{currency}}</span></h4>
                      <h4>February : <span class="monthy_total">{{expense_total_february}} {{currency}}</span></h4>
                      <h4>March : <span class="monthy_total">{{expense_total_march}} {{currency}}</span></h4>
                      <h4>April : <span class="monthy_total">{{expense_total_april}} {{currency}}</span></h4>
                      <h4>May : <span class="monthy_total">{{expense_total_may}} {{currency}}</span></h4>
                      <h4>June : <span class="monthy_total">{{expense_total_june}} {{currency}}</span></h4>
                      <h4>July : <span class="monthy_total">{{expense_total_july}} {{currency}}</span></h4>
                      <h4>August : <span class="monthy_total">{{expense_total_august}} {{currency}}</span></h4>
                      <h4>September : <span class="monthy_total">{{expense_total_september}} {{currency}}</span></h4>
                      <h4>October : <span class="monthy_total">{{expense_total_october}} {{currency}}</span></h4>
                      <h4>November : <span class="monthy_total">{{expense_total_november}} {{currency}}</span></h4>
                      <h4>December : <span class="monthy_total">{{expense_total_december}} {{currency}}</span></h4>
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
  name:'ExpenseReport',
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
          expenses_total:'',
          expense_total_january:'',
          expense_total_february:'',
          expense_total_march:'',
          expense_total_april:'',
          expense_total_may:'',
          expense_total_june:'',
          expense_total_july:'',
          expense_total_august:'',
          expense_total_september:'',
          expense_total_october:'',
          expense_total_november:'',
          expense_total_december:'',
          expenses_total_by_administration_fees:'',
          expenses_total_by_computing_rentals:'',
          expenses_total_by_cost_of_goods_sold:'',
          expenses_total_by_depreciation_expense:'',
          expenses_total_by_entertainment:'',
          expenses_total_by_fuel:'',
          expenses_total_by_interest:'',
          expenses_total_by_licence_fees:'',
          expenses_total_by_meals:'',
          expenses_total_by_network_communications:'',
          expenses_total_by_professional_fees:'',
          expenses_total_by_rent:'',
          expenses_total_by_subscriptions:'',
          expenses_total_by_utilities:'',
          expenses_total_by_advertising:'',
          expenses_total_by_conventions:'',
          expenses_total_by_delivery_freight:'',
          expenses_total_by_electricity:'',
          expenses_total_by_equipment_leases:'',
          expenses_total_by_insurance:'',
          expenses_total_by_legal_fees:'',
          expenses_total_by_maintenance:'',
          expenses_total_by_memberships:'',
          expenses_total_by_office_supplies:'',
          expenses_total_by_property_taxes:'',
          expenses_total_by_salaries_benefits:'',
          expenses_total_by_travel:'',
          expenses_total_by_vehicle_leases:'',
          top_five_expenses:''
    }
  },
  methods:{


  },
  created(){
    // Current Currency
    db.collection("settings").doc('config').onSnapshot(doc =>{
       this.currency = doc.data().currency
    })

    // Total Expenses of This month
    db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
     .get()
     .then(snapshot => {
           var totalExpneses = 0;
           snapshot.forEach(doc => {
              totalExpneses += Number(doc.data().expense_amount)
           })
           this.expenses_total = totalExpneses;
      })

      // Total Expenses of This January
      db.collection('expenses').where("created_month", "==", moment().format('01-YYYY'))
       .get()
       .then(snapshot => {
             var totalExpneses = 0;
             snapshot.forEach(doc => {
                totalExpneses += Number(doc.data().expense_amount)
             })
             this.expense_total_january = totalExpneses;
        })

        // Total Expenses of This February
        db.collection('expenses').where("created_month", "==", moment().format('02-YYYY'))
         .get()
         .then(snapshot => {
               var totalExpneses = 0;
               snapshot.forEach(doc => {
                  totalExpneses += Number(doc.data().expense_amount)
               })
               this.expense_total_february = totalExpneses;
          })

          // Total Expenses of This March
          db.collection('expenses').where("created_month", "==", moment().format('03-YYYY'))
           .get()
           .then(snapshot => {
                 var totalExpneses = 0;
                 snapshot.forEach(doc => {
                    totalExpneses += Number(doc.data().expense_amount)
                 })
                 this.expense_total_march = totalExpneses;
            })

            // Total Expenses of This April
            db.collection('expenses').where("created_month", "==", moment().format('04-YYYY'))
             .get()
             .then(snapshot => {
                   var totalExpneses = 0;
                   snapshot.forEach(doc => {
                      totalExpneses += Number(doc.data().expense_amount)
                   })
                   this.expense_total_april = totalExpneses;
              })

              // Total Expenses of This May
              db.collection('expenses').where("created_month", "==", moment().format('05-YYYY'))
               .get()
               .then(snapshot => {
                     var totalExpneses = 0;
                     snapshot.forEach(doc => {
                        totalExpneses += Number(doc.data().expense_amount)
                     })
                     this.expense_total_may = totalExpneses;
                })

                // Total Expenses of This June
                db.collection('expenses').where("created_month", "==", moment().format('06-YYYY'))
                 .get()
                 .then(snapshot => {
                       var totalExpneses = 0;
                       snapshot.forEach(doc => {
                          totalExpneses += Number(doc.data().expense_amount)
                       })
                       this.expense_total_june = totalExpneses;
                  })
                  // Total Expenses of This July
                  db.collection('expenses').where("created_month", "==", moment().format('07-YYYY'))
                   .get()
                   .then(snapshot => {
                         var totalExpneses = 0;
                         snapshot.forEach(doc => {
                            totalExpneses += Number(doc.data().expense_amount)
                         })
                         this.expense_total_july = totalExpneses;
                    })

                    // Total Expenses of This February
                    db.collection('expenses').where("created_month", "==", moment().format('08-YYYY'))
                     .get()
                     .then(snapshot => {
                           var totalExpneses = 0;
                           snapshot.forEach(doc => {
                              totalExpneses += Number(doc.data().expense_amount)
                           })
                           this.expense_total_august = totalExpneses;
                      })

                      // Total Expenses of This February
                      db.collection('expenses').where("created_month", "==", moment().format('09-YYYY'))
                       .get()
                       .then(snapshot => {
                             var totalExpneses = 0;
                             snapshot.forEach(doc => {
                                totalExpneses += Number(doc.data().expense_amount)
                             })
                             this.expense_total_september = totalExpneses;
                      })

                      // Total Expenses of This October
                      db.collection('expenses').where("created_month", "==", moment().format('10-YYYY'))
                       .get()
                       .then(snapshot => {
                             var totalExpneses = 0;
                             snapshot.forEach(doc => {
                                totalExpneses += Number(doc.data().expense_amount)
                             })
                             this.expense_total_october = totalExpneses;
                      })

                      // Total Expenses of This November
                      db.collection('expenses').where("created_month", "==", moment().format('11-YYYY'))
                       .get()
                       .then(snapshot => {
                             var totalExpneses = 0;
                             snapshot.forEach(doc => {
                                totalExpneses += Number(doc.data().expense_amount)
                             })
                             this.expense_total_november = totalExpneses;
                      })

                      // Total Expenses of This December
                      db.collection('expenses').where("created_month", "==", moment().format('12-YYYY'))
                       .get()
                       .then(snapshot => {
                             var totalExpneses = 0;
                             snapshot.forEach(doc => {
                                totalExpneses += Number(doc.data().expense_amount)
                             })
                             this.expense_total_december = totalExpneses;
                      })

    // Total Expenses of This month by Administration Fees
    db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                             .where("expense_type", "==", "Administration Fees")
     .get()
     .then(snapshot => {
           var totalExpneses = 0;
           snapshot.forEach(doc => {
              totalExpneses += Number(doc.data().expense_amount)
           })
           this.expenses_total_by_administration_fees = totalExpneses;
      })

      // Total Expenses of This month by Computing Rentals
      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                               .where("expense_type", "==", "Computing Rentals")
       .get()
       .then(snapshot => {
             var totalExpneses = 0;
             snapshot.forEach(doc => {
                totalExpneses += Number(doc.data().expense_amount)
             })
             this.expenses_total_by_computing_rentals = totalExpneses;
       })

       // Total Expenses of This month by Computing Rentals
       db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                .where("expense_type", "==", "Cost Of Goods Sold")
        .get()
        .then(snapshot => {
              var totalExpneses = 0;
              snapshot.forEach(doc => {
                 totalExpneses += Number(doc.data().expense_amount)
              })
              this.expenses_total_by_cost_of_goods_sold = totalExpneses;
        })

        // Total Expenses of This month by Depreciation Expense
        db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                 .where("expense_type", "==", "Depreciation Expense")
         .get()
         .then(snapshot => {
               var totalExpneses = 0;
               snapshot.forEach(doc => {
                  totalExpneses += Number(doc.data().expense_amount)
               })
               this.expenses_total_by_depreciation_expense = totalExpneses;
         })

         // Total Expenses of This month by Entertainment
         db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                  .where("expense_type", "==", "Entertainment")
          .get()
          .then(snapshot => {
                var totalExpneses = 0;
                snapshot.forEach(doc => {
                   totalExpneses += Number(doc.data().expense_amount)
                })
                this.expenses_total_by_entertainment = totalExpneses;
          })

          // Total Expenses of This month by Entertainment
          db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                   .where("expense_type", "==", "Fuel")
           .get()
           .then(snapshot => {
                 var totalExpneses = 0;
                 snapshot.forEach(doc => {
                    totalExpneses += Number(doc.data().expense_amount)
                 })
                 this.expenses_total_by_fuel = totalExpneses;
           })

           // Total Expenses of This month by Entertainment
           db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                    .where("expense_type", "==", "Interest")
            .get()
            .then(snapshot => {
                  var totalExpneses = 0;
                  snapshot.forEach(doc => {
                     totalExpneses += Number(doc.data().expense_amount)
                  })
                  this.expenses_total_by_interest = totalExpneses;
            })

            // Total Expenses of This month by Entertainment
            db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                     .where("expense_type", "==", "Licence Fees")
             .get()
             .then(snapshot => {
                   var totalExpneses = 0;
                   snapshot.forEach(doc => {
                      totalExpneses += Number(doc.data().expense_amount)
                   })
                   this.expenses_total_by_licence_fees = totalExpneses;
             })

             // Total Expenses of This month by Entertainment
             db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                      .where("expense_type", "==", "Meals")
              .get()
              .then(snapshot => {
                    var totalExpneses = 0;
                    snapshot.forEach(doc => {
                       totalExpneses += Number(doc.data().expense_amount)
                    })
                    this.expenses_total_by_meals = totalExpneses;
              })

             // Total Expenses of This month by Entertainment
             db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                      .where("expense_type", "==", "Network & Communications")
              .get()
              .then(snapshot => {
                    var totalExpneses = 0;
                    snapshot.forEach(doc => {
                       totalExpneses += Number(doc.data().expense_amount)
                    })
                    this.expenses_total_by_network_communications = totalExpneses;
              })

              // Total Expenses of This month by Professional Fees
              db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                       .where("expense_type", "==", "Professional Fees")
               .get()
               .then(snapshot => {
                     var totalExpneses = 0;
                     snapshot.forEach(doc => {
                        totalExpneses += Number(doc.data().expense_amount)
                     })
                     this.expenses_total_by_professional_fees = totalExpneses;
               })

               // Total Expenses of This month by Rent
               db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                        .where("expense_type", "==", "Rent")
                .get()
                .then(snapshot => {
                      var totalExpneses = 0;
                      snapshot.forEach(doc => {
                         totalExpneses += Number(doc.data().expense_amount)
                      })
                      this.expenses_total_by_rent = totalExpneses;
                })

                // Total Expenses of This month by Subscriptions
                db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                         .where("expense_type", "==", "Subscriptions")
                 .get()
                 .then(snapshot => {
                       var totalExpneses = 0;
                       snapshot.forEach(doc => {
                          totalExpneses += Number(doc.data().expense_amount)
                       })
                       this.expenses_total_by_subscriptions = totalExpneses;
                 })

                 // Total Expenses of This month by Utilities
                 db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                          .where("expense_type", "==", "Utilities")
                  .get()
                  .then(snapshot => {
                        var totalExpneses = 0;
                        snapshot.forEach(doc => {
                           totalExpneses += Number(doc.data().expense_amount)
                        })
                        this.expenses_total_by_utilities = totalExpneses;
                  })

                  // Total Expenses of This month by Advertising
                  db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                           .where("expense_type", "==", "Advertising")
                   .get()
                   .then(snapshot => {
                         var totalExpneses = 0;
                         snapshot.forEach(doc => {
                            totalExpneses += Number(doc.data().expense_amount)
                         })
                         this.expenses_total_by_advertising = totalExpneses;
                   })

                   // Total Expenses of This month by Conventions
                   db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                            .where("expense_type", "==", "Conventions")
                    .get()
                    .then(snapshot => {
                          var totalExpneses = 0;
                          snapshot.forEach(doc => {
                             totalExpneses += Number(doc.data().expense_amount)
                          })
                          this.expenses_total_by_conventions = totalExpneses;
                    })

                    // Total Expenses of This month by Delivery & Freight
                    db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                             .where("expense_type", "==", "Delivery & Freight")
                     .get()
                     .then(snapshot => {
                           var totalExpneses = 0;
                           snapshot.forEach(doc => {
                              totalExpneses += Number(doc.data().expense_amount)
                           })
                           this.expenses_total_by_delivery_freight = totalExpneses;
                     })

                     // Total Expenses of This month by Electricity
                     db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                              .where("expense_type", "==", "Electricity")
                      .get()
                      .then(snapshot => {
                            var totalExpneses = 0;
                            snapshot.forEach(doc => {
                               totalExpneses += Number(doc.data().expense_amount)
                            })
                            this.expenses_total_by_electricity = totalExpneses;
                      })

                      // Total Expenses of This month by Equipment Leases
                      db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                               .where("expense_type", "==", "Equipment Leases")
                       .get()
                       .then(snapshot => {
                             var totalExpneses = 0;
                             snapshot.forEach(doc => {
                                totalExpneses += Number(doc.data().expense_amount)
                             })
                             this.expenses_total_by_equipment_leases = totalExpneses;
                       })

                       // Total Expenses of This month by Insurance
                       db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                .where("expense_type", "==", "Insurance")
                        .get()
                        .then(snapshot => {
                              var totalExpneses = 0;
                              snapshot.forEach(doc => {
                                 totalExpneses += Number(doc.data().expense_amount)
                              })
                              this.expenses_total_by_insurance = totalExpneses;
                        })

                        // Total Expenses of This month by Legal Fees
                        db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                 .where("expense_type", "==", "Legal Fees")
                         .get()
                         .then(snapshot => {
                               var totalExpneses = 0;
                               snapshot.forEach(doc => {
                                  totalExpneses += Number(doc.data().expense_amount)
                               })
                               this.expenses_total_by_legal_fees = totalExpneses;
                         })

                         // Total Expenses of This month by Maintenance
                         db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                  .where("expense_type", "==", "Maintenance")
                          .get()
                          .then(snapshot => {
                                var totalExpneses = 0;
                                snapshot.forEach(doc => {
                                   totalExpneses += Number(doc.data().expense_amount)
                                })
                                this.expenses_total_by_maintenance = totalExpneses;
                          })

                          // Total Expenses of This month by Memberships
                          db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                   .where("expense_type", "==", "Memberships")
                           .get()
                           .then(snapshot => {
                                 var totalExpneses = 0;
                                 snapshot.forEach(doc => {
                                    totalExpneses += Number(doc.data().expense_amount)
                                 })
                                 this.expenses_total_by_memberships = totalExpneses;
                           })

                           // Total Expenses of This month by Office Supplies
                           db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                    .where("expense_type", "==", "Office Supplies")
                            .get()
                            .then(snapshot => {
                                  var totalExpneses = 0;
                                  snapshot.forEach(doc => {
                                     totalExpneses += Number(doc.data().expense_amount)
                                  })
                                  this.expenses_total_by_office_supplies = totalExpneses;
                            })

                            // Total Expenses of This month by Property Taxes
                            db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                     .where("expense_type", "==", "Property Taxes")
                             .get()
                             .then(snapshot => {
                                   var totalExpneses = 0;
                                   snapshot.forEach(doc => {
                                      totalExpneses += Number(doc.data().expense_amount)
                                   })
                                   this.expenses_total_by_property_taxes = totalExpneses;
                             })

                             // Total Expenses of This month by Salaries & Benefits
                             db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                      .where("expense_type", "==", "Salaries & Benefits")
                              .get()
                              .then(snapshot => {
                                    var totalExpneses = 0;
                                    snapshot.forEach(doc => {
                                       totalExpneses += Number(doc.data().expense_amount)
                                    })
                                    this.expenses_total_by_salaries_benefits = totalExpneses;
                              })

                              // Total Expenses of This month by Travel
                              db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                       .where("expense_type", "==", "Travel")
                               .get()
                               .then(snapshot => {
                                     var totalExpneses = 0;
                                     snapshot.forEach(doc => {
                                        totalExpneses += Number(doc.data().expense_amount)
                                     })
                                     this.expenses_total_by_travel = totalExpneses;
                               })

                               // Total Expenses of This month by Vehicle Leases
                               db.collection('expenses').where("created_month", "==", moment().format('MM-YYYY'))
                                                        .where("expense_type", "==", "Vehicle Leases")
                                .get()
                                .then(snapshot => {
                                      var totalExpneses = 0;
                                      snapshot.forEach(doc => {
                                         totalExpneses += Number(doc.data().expense_amount)
                                      })
                                      this.expenses_total_by_vehicle_leases = totalExpneses;
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
