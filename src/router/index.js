import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import PayComponent from'../components/pay/PayComponent'
import AgreementComponent from '../components/ServicesAgreement/AgreementComponent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register,
      children:[
        {
          path:"/userAgreement",
          name:"AgreementComponent",
          component:AgreementComponent
        }
      ]
    },
    {
      path:"/pay",
      name:'SuperGuidePay',
      component:PayComponent
    }
  ]
})
