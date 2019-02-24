import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login.vue'
//webpack -> 提供了@符号,锁定文件src
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
import Rights from '@/components/rights.vue'
import Roles from '@/components/roles.vue'
import Order from '@/components/order.vue'
import Reports from '@/components/reports.vue'
import {Message} from 'element-ui'
Vue.use(Router)

 const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home,
      children:[{
        name: 'users',
        path: '/users',
        component: Users
      },{
        name: 'rights',
        path: '/rights',
        component: Rights
      },{
        name: 'roles',
        path: '/roles',
        component: Roles
      },{
        name: 'orders',
        path: '/orders',
        component: Order
      },{
        name: 'reports',
        path: '/reports',
        component: Reports
      }]
    },{
      name:'login',
      path:'/login',
      component:Login
    }
  ]
})


//路由导航守卫
router.beforeEach((to, from, next) => {
  // to and from are both route objects. must call `next`.

  if(to.name === 'login'){
    next();
  }else {
    const token = localStorage.getItem("token")
    if(!token){
      //提示
      Message.warning('请先登录');
      router.push({
        name:"login"
      })
      return;
    }
    next();
  }

})

export default router



// if(!localStorage.getItem('token')){
//   this.$router.push({
//     name: 'login'
//   });
//   // this.$message.warning('清闲登录')  报错????
//   this.$message({
//     message: '请先登录',
//     type: 'warning'
//   });
// }