// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'

import router from './router'
import '@/assets/css/base.css'

import moment from 'moment'

import cusBread from '@/components/cusBread.vue'


import axios from 'axios'
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI)


//全局过滤器,处理日期格式
Vue.filter('fmtdate', (v)=> {
  return moment(v).format('YYYY-MM-DD');
})

//全局自定义面包屑组件
Vue.component(cusBread.name, cusBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
