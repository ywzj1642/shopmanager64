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
      <el-input
        @clear="getAllUsers()"
        clearable
        placeholder="请输入内容"
        v-model="query"
        class="searchInput"
      >
        <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
      </el-input>
      <el-button @click="showDiaAddUser()" type="primary">添加用户</el-button>
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
    <el-table height="350px" :data="list" style="width: 100%">
      <el-table-column prop="id" label="#" width="80"></el-table-column>
      <el-table-column prop="username" label="姓名" width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
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
        <template slot-scope="list">{{list.row.create_time | fmtdate}}</template>
      </el-table-column>




      <el-table-column label="用户状态" width="140">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" circle plain></el-button>
          <el-button @click="showMsgBoxDele(scope.row)" type="danger" icon="el-icon-delete" size="mini" circle plain></el-button>
          <el-button type="success" icon="el-icon-check" size="mini" circle plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      class="page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>

    <!-- 对话框  添加用户 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form label-position="left" label-width="80px" :model="formdata">
        <el-form-item label="用户名">
          <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formdata.email"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="formdata.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      pagenum: 1,
      pagesize: 2,
      total: -1,//默认值是-1,区分初始值
      //添加用户对话框,默认值为false,表示隐藏
      dialogFormVisibleAdd: false,
      //表单数据,将来作为发送post请求的请求体
      formdata:{
          username: '',
          password: '',
          email: '',
          mobile: ''
      },
      //表格数据,定义一个新数组,接收获取的数据
      list: []
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
      //删除用户
      showMsgBoxDele(user){
        //   console.log(user)
        //弹框组件
          this.$confirm('删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
            //点击确定发送请求
            //id->用户的id
          const res = await this.$http.delete(`users/${user.id}`)
        //   console.log(res)
        //解构赋值获取信息
          const {meta:{ msg, status}} = res.data;
          //判断请求状态
          if(status === 200){
              //显示信息
            this.$message.success(msg);
            //重新加载页面
            this.getTableData();
          }
        }).catch(() => {
            //点击取消按钮
          this.$message.info('已取消删除');          
        });
      },
      //添加用户方法qu
      async addUser(){
        //   异步请求发送
          const res = await this.$http.post('users', this.formdata)
        //   console.log(res);
        //解构赋值获取数据信息
          const {data:{data, meta:{msg, status}}} = res;
          if(status === 201){
          // 关闭对话框
          this.dialogFormVisibleAdd = false;
          //重新加载数据
          this.getTableData();

          }
      },
      //添加按钮--打开对话框
      showDiaAddUser(){
          //打开对话框
          this.dialogFormVisibleAdd = true;
          //清除表单数据
          this.formdata = {};
      },
      //获取所有用户
    getAllUsers() {
      this.getTableData();
    },
    //搜索用户
    searchUser() {
      this.pagenum = 1;
      this.getTableData();
    },
    //分页相关方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //按照新的pagesize发送请求,重置pagenum为1;
      this.pagenum = 1;
      this.pagesize = val;
      this.getTableData();
    },
    //页面发生改变触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getTableData();
    },
    //获取表单数据
    async getTableData() {
        //设置请求头
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      //发送请求(异步)
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
    //   console.log(res);
    //结构赋值获取数据信息
      const {
        data,
        meta: { msg, status }
      } = res.data;
      //判断请求状态
      if (status === 200) {
        this.total = data.total;
        this.list = data.users;
        // console.log(this.list);
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
.page {
  margin-top: 20px;
}
</style>
