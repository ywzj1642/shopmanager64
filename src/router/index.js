import Vue from 'vue'
import Router from 'vue-router'
// import Login from '../components/login.vue'
//webpack -> 提供了@符号,锁定文件src
import Login from '@/components/login.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
    },{
      name:'login',
      path:'/login',
      component:Login
    }
  ]
})
