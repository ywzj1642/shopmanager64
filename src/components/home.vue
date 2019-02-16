<template>
  <el-container class="container">
    <el-header class="header">Header</el-header>
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
</style>
