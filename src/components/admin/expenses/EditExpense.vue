<template>
  <v-app>

      <Navbar/>
      <v-content>

        <form @submit.prevent="editExpense">
        <v-card>

          <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    prepend-icon="format_size"
                    placeholder="Expense title"
                    required
                    v-model="expense.expense_title"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10 align-center justify-space-between>
                <v-layout align-center>
                  <v-text-field
                    type="number"
                    prepend-icon="attach_money"
                    placeholder="Expense Amount"
                    required
                    v-model="expense.expense_amount"
                  ></v-text-field>
                </v-layout>
              </v-flex>

              <v-flex xs10>
                <h4 v-if="expense.expense_type">Expense Type: {{expense.expense_type.expense_type}}</h4>
                <v-select
                  prepend-icon="group"
                  :items="expense_types"
                  v-model="expense.expense_type"
                  item-text="expense_type"
                  item-value="expense_type"
                  label="Expense Type"
                  single-line
                ></v-select>
              </v-flex>

              <v-flex xs10>
                <v-btn type="submit" block color="primary" dark>Update Expense</v-btn>
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
  name:'EditExpenses',
  components:{
    Navbar
  },
  data(){
    return{
      expense:[],
      expense_title:null,
      expense_amount:null,
      expense_type:null,
      expense_types:[
        { expense_type: 'Administration Fees' },
        { expense_type: 'Computing Rentals' },
        { expense_type: 'Cost Of Goods Sold' },
        { expense_type: 'Depreciation Expense' },
        { expense_type: 'Entertainment' },
        { expense_type: 'Fuel' },
        { expense_type: 'Interest' },
        { expense_type: 'Licence Fees' },
        { expense_type: 'Meals' },
        { expense_type: 'Network & Communications' },
        { expense_type: 'Professional Fees' },
        { expense_type: 'Rent' },
        { expense_type: 'Subscriptions' },
        { expense_type: 'Utilities' },
        { expense_type: 'Advertising' },
        { expense_type: 'Conventions' },
        { expense_type: 'Delivery & Freight' },
        { expense_type: 'Electricity' },
        { expense_type: 'Equipment Leases' },
        { expense_type: 'Insurance' },
        { expense_type: 'Legal Fees' },
        { expense_type: 'Maintenance' },
        { expense_type: 'Memberships' },
        { expense_type: 'Office Supplies' },
        { expense_type: 'Property Taxes' },
        { expense_type: 'Salaries & Benefits' },
        { expense_type: 'Travel' },
        { expense_type: 'Vehicle Leases' },
      ],
    }
  },
  methods:{
      editExpense(){
          if(this.expense.expense_title){

          let ref = db.collection('expenses').doc(this.$route.params.id);
            ref.update({
              expense_title:this.expense.expense_title,
              expense_amount:this.expense.expense_amount,
              expense_type:this.expense.expense_type,
            })
            this.expense_title=null
            this.expense_amount=null
            this.expense_type=null
          }
          this.$router.push({ name: 'Expenses'})
      },
   },
   created(){
       // Show data of a specific Expense
       db.collection("expenses").doc(this.$route.params.id).onSnapshot(doc =>{
          this.expense = doc.data()
          this.expense.id = doc.id
       })
    }

}
</script>

<style>

</style>
