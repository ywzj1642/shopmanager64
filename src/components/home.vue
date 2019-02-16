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
        <a href="#" class="logout">退出</a>
      </el-col>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
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
</style>
