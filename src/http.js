import axios from 'axios'

const HttpServer = {};

HttpServer.install = function (Vue) {
  // 4. 添加实例方法
    // 逻辑...
    axios.defaults.baseURL = "http://localhost:8888/api/private/v1/"

    
    //添加请求拦截器
    axios.interceptors.request.use(function(config){
      //在发送请求之前做些什么
      //所有请求发起之后,进行筛选,请求标识是否为login
      //如果标识是login, 不要头部 ->请求继续发起
      //当标识不是login,先设置头部,再发送请求
      if(config.url !== 'login'){
        const AUTH_TOKEN = localStorage.getItem("token");
        config.headers["Authorization"] = AUTH_TOKEN;

      }
      // console.log('请求发起了');
      // console.log(config);
      return config;
    },function(error){
      //对请求错误做些什么
      return Promise.reject(error)
    })

    Vue.prototype.$http = axios
  
}

export default HttpServer;
