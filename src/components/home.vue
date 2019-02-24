<template>
  <el-container class="container">
    <el-header class="header">
      <el-col :span="4">
        <img src="../assets/logo.png" alt="图片加载错误">
      </el-col>
      <el-col :span="19" class="middle">
        <h2>电商后台管理系统</h2>
      </el-col>
      <el-col :span="1">
        <a href="#" class="logout" @click="handleLoginout()">退出</a>
      </el-col>
    </el-header>
    <el-container class="container2">
      <el-aside width="200px" class="aside">
        <el-menu @select="fn" :unique-opened="true" :router="true" :default-active="$route.name" class="el-menu-vertical-demo">
          <!-- 第一个导航 -->
          <el-submenu :index="item1.order+''" v-for="(item1) in menus" :key="item1.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item :index="item2.path+''" v-for="(item2) in item1.children" :key="item2.id">
              <i class="el-icon-menu"></i>
              <span>{{item2.authName}}</span>
            </el-menu-item>
          </el-submenu>
          


        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    data() {
      return {
        menus:[]
      }
    },

    //如果用户没登录 -> if(!token) -> 改变标识this.$router.push -> 显示login.Vue
    //如果登录了, -> if(token) -> 继续渲染home.vue
    //代码位置,在组件加载之前

    beforeCreate() {
      
    },

    beforeMount() {
    },
    created() {
      this.getMenus();
    },
    mounted() {
      // console.log(1111)
    },
    methods: {
      //刷新回到最近导航激活状态
      fn(index, indexPath){
        // console.log(index)
        // console.log(indexPath);
        //获取当前路由数据
        console.log(this.$route.name)
      },
      //动态导航
      async getMenus(){
        const res = await this.$http.get(`menus`);
        // console.log(res);
        const {data, meta: {msg, status}} = res.data;
        if(status === 200){
          this.menus = data;
        }
      },
      //退出功能
      handleLoginout(){
        //1.清除token
        localStorage.clear();
        //2.来到登录组件
        this.$router.push({
          name: 'login'
        })
        //3.提示
        this.$message({
          message: '退出成功',
          type: 'warning'
        });
      }
    },

  };

</script>
<style>
  .header {
    background: #aaa;
  }

  .container, .container2 {
    height: 100%;
  }
 
  .aside {
    height: 100%;
  }

  .main {
    background: greenyellow;
  }

  .middle {
    line-height: 60px;
    text-align: center;
  }

  .logout {
    line-height: 60px;
    text-decoration: none;
  }

  h2 {
    margin: 0;
    padding: 0;
  }

</style>
