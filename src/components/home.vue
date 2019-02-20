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
    <el-container>
      <el-aside width="200px" class="aside">
        <el-menu :unique-opened="true" :router="true" default-active="2" class="el-menu-vertical-demo">
          <!-- 第一个导航 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 第二个导航 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="roles">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="rights">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 第三个导航 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <!-- 第四个导航 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 第五个导航 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
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
    //如果用户没登录 -> if(!token) -> 改变标识this.$router.push -> 显示login.Vue
    //如果登录了, -> if(token) -> 继续渲染home.vue
    //代码位置,在组件加载之前

    beforeCreate() {
      if(!localStorage.getItem('token')){
        this.$router.push({
          name: 'login'
        });
        // this.$message.warning('清闲登录')  报错????
        this.$message({
          message: '请先登录',
          type: 'warning'
        });
      }
      
    },

    beforeMount() {
    },
    mounted() {
      // console.log(1111)
    },
    methods: {
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

  .container {
    height: 100%;
  }

  .aside {
    background: pink;
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
