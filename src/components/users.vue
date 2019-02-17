<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 15px;">
      <el-input placeholder="请输入内容" v-model="query" class="searchInput">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
        <el-button type="primary">添加用户</el-button>
    </div>
    <!-- 列表 -->
    <!-- 分页 -->
  </el-card>
</template>

<script>
    export default {
        data(){
            return {
                query: ''
            }
        }
    };
</script>

<style>
.box {
  height: 100%;
}
.searchInput {
    width: 350px;
}
</style>
