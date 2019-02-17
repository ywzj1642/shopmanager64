import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login.vue'
//webpack -> 提供了@符号,锁定文件src
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Users from '@/components/users.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component:Home,
      children:[{
        name: 'users',
        path: '/users',
        component: Users
      }]
    },{
      name:'login',
      path:'/login',
      component:Login
    }
  ]
})
