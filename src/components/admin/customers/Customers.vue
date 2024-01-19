<template>
  <v-app>
      <Navbar/>
    <div>
      <ShowCustomers/>
    </div>
  </v-app>
</template>

<script>
import ShowCustomers from '@/components/admin/customers/ShowCustomers'
import AddCustomer from '@/components/admin/customers/AddCustomer'
import Navbar from '@/components/admin/navbar/Navbar'

export default {
  name:'Customers',
  components:{
    Navbar,ShowCustomers,AddCustomer
  },
  data(){
    return{

    }
  },

}
</script>

<style>
tbody tr{
  text-align: center;
}
.input-group__input placeholder{
  color: red;
}
</style>
