import Vue from 'vue'
import Router from 'vue-router'
//Dashboard
import Dashboard from '@/components/admin/dashboard/Dashboard'
//Auth
import Setup from '@/components/admin/authentication/Setup'
import SetupSuccess from '@/components/admin/authentication/Success'
//Customers
import Customers from '@/components/admin/customers/Customers'
import AddCustomer from '@/components/admin/customers/AddCustomer'
import EditCustomer from '@/components/admin/customers/EditCustomer'
import ViewCustomer from '@/components/admin/customers/ViewCustomer'

//Sales
import AddSales from '@/components/admin/sales/AddSales'
import Sales from '@/components/admin/sales/Sales'
import EditSales from '@/components/admin/sales/EditSales'
import SalesReport from '@/components/admin/sales/SalesReport'
// Expenses
import AddExpenses from '@/components/admin/expenses/AddExpenses'
import EditExpense from '@/components/admin/expenses/EditExpense'
import Expenses from '@/components/admin/expenses/Expenses'
import ExpenseReport from '@/components/admin/expenses/ExpenseReport'

// Project
import AddProject from '@/components/admin/project/AddProject'
import EditProject from '@/components/admin/project/EditProject'
import Project from '@/components/admin/project/Project'
import ViewProject from '@/components/admin/project/ViewProject'
import ProjectType from '@/components/admin/project/ProjectType'
// Stock
import AddItem from '@/components/admin/stock/AddItem'
import EditItem from '@/components/admin/stock/EditItem'
import Items from '@/components/admin/stock/Items'
import ItemCategories from '@/components/admin/stock/ItemCategories'
import AddItemCategory from '@/components/admin/stock/AddItemCategory'
import StockReport from '@/components/admin/stock/StockReport'
//Report
import Report from '@/components/admin/report/Report'
//Leads
import Leads from '@/components/admin/leads/Leads'
import AddLeads from '@/components/admin/leads/AddLeads'
import EditLeads from '@/components/admin/leads/EditLeads'
import ViewLeads from '@/components/admin/leads/ViewLeads'
import LeadsType from '@/components/admin/leads/LeadsType'
import AddFile from '@/components/admin/leads/AddFile'
//Task
import Task from '@/components/admin/task/Task'
import AddTask from '@/components/admin/task/AddTask'
import EditTask from '@/components/admin/task/EditTask'
//Support Guest
import Welcome from '@/components/admin/support/Welcome'
import Message from '@/components/admin/support/Message'
import Expired from '@/components/admin/support/Expired'
import AdminSupportList from '@/components/admin/support/AdminSupportList'
import AdminSupportMessage from '@/components/admin/support/AdminSupportMessage'
//User Info
import Settings from '@/components/admin/settings/Settings'


import firebase from 'firebase'
Vue.use(Router)

const router = new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Setup',
      component: Setup
    },
    {
      path: '/setup-succss',
      name: 'SetupSuccess',
      component: SetupSuccess
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/customers',
      name: 'Customers',
      component: Customers,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-customer',
      name: 'AddCustomer',
      component: AddCustomer,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-customer/:id',
      name: 'EditCustomer',
      component: EditCustomer,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/view-customer/:id',
      name: 'ViewCustomer',
      component: ViewCustomer,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/add-sales',
      name: 'AddSales',
      component: AddSales,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-sales/:id',
      name: 'EditSales',
      component: EditSales,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/sales-report',
      name: 'SalesReport',
      component: SalesReport,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/sales',
      name: 'Sales',
      component:Sales,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-expenses',
      name: 'AddExpenses',
      component: AddExpenses,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/expenses-report',
      name: 'ExpenseReport',
      component: ExpenseReport,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/edit-expenses/:id',
      name: 'EditExpense',
      component: EditExpense,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-project',
      name: 'AddProject',
      component: AddProject,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-project/:id',
      name: 'EditProject',
      component: EditProject,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/view-project/:id',
      name: 'ViewProject',
      component: ViewProject,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/project-type/:type',
      name: 'ProjectType',
      component: ProjectType,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/project',
      name: 'Project',
      component: Project,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-item',
      name: 'AddItem',
      component: AddItem,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-item-category',
      name: 'AddItemCategory',
      component: AddItemCategory,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-item/:id',
      name: 'EditItem',
      component: EditItem,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/items',
      name: 'Items',
      component: Items,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/stock-report',
      name: 'StockReport',
      component: StockReport,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/item-categories',
      name: 'ItemCategories',
      component: ItemCategories,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/report',
      name: 'Report',
      component: Report,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-task/:id',
      name: 'EditTask',
      component: EditTask,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/add-task',
      name: 'AddTask',
      component: AddTask,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/task',
      name: 'Task',
      component: Task,
      meta:{
        requiresAuth:true
      }
    },    
    {
      path: '/add-leads',
      name: 'AddLeads',
      component: AddLeads,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/leads',
      name: 'Leads',
      component: Leads,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/edit-leads/:id',
      name: 'EditLeads',
      component: EditLeads,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/view-leads/:id',
      name: 'ViewLeads',
      component: ViewLeads,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/leads-type/:type',
      name: 'LeadsType',
      component: LeadsType,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/message/:id',
      name: 'Message',
      component: Message,
      props:true,
      beforeEnter: (to, from, next) => {
        if(to.params.pr_name){
          next()
        }else{
          next({ name:'Expired'})
        }
      }
    },
    {
      path: '/expired',
      name: 'Expired',
      component: Expired
    },
    {
      path: '/support-list',
      name: 'AdminSupportList',
      component: AdminSupportList,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/support-message/:id',
      name: 'AdminSupportMessage',
      component: AdminSupportMessage,
      meta:{
        requiresAuth:true
      },
      beforeEnter: (to, from, next) => {
        if(to.params.id){
          next( )
        }else{
          next({ name:'AdminSupportList'})
        }
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta:{
        requiresAuth:true
      }
    },  
   
   
   
   
  ]
})

router.beforeEach((to,from,next) => {
  let currentUser=firebase.auth().currentUser;
  let requiresAuth=to.matched.some(record=>record.meta.requiresAuth);

  if(requiresAuth && !currentUser) next('/')
  //else if (!requiresAuth && currentUser) next('dashboard')
  else next()
});

export default router
