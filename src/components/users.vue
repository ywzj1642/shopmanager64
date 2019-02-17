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
     <!--
      // username: "admin"
      // id: 500
      // email: "adsfad@qq.com"
      // mobile: "12345678"
      // create_time: 1486720211
      // role_name: "主管"
      // mg_state: true
       -->
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
      <el-table-column prop="mobile" label="电话" width="140"></el-table-column>

        <!-- 日期格式处理 ->过滤器 ->两类加三部
        fmtdate的使用
        1.v-bind:
        2.{{msg | fmtdate}}
         -->
         <!-- 
             前提:下面这个单元格的内容不是prop的值
             1.给单元格内容外层加template
             2.给template 设置slot-scop
             3.slot-scop的值会自动绑定外层数据,这里el-table的data的值是list
             4.在内容位置,写list.row 会自动取出数组list中每个对象,row是固定写法

          -->
        
      <el-table-column label="创建日期" width="140">
          <template slot-scope="list">
            {{list.row.create_time | fmtdate}}
          </template>
      </el-table-column>


      <el-table-column prop="name" label="用户状态" width="140"></el-table-column>
      <el-table-column prop="name" label="操作" width="200"></el-table-column>
    </el-table>
    <!-- 分页 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 8,

      //表格数据
     
      list: []
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    async getTableData() {
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      //   console.log(res)
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.list = data.users;
        console.log(this.list);
      }
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
