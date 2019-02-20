<template>
  <el-card class="box">
    <cus-bread level1="权限管理" level2="角色列表"></cus-bread>
    <el-button @click="showDiaAddUser()" type="primary" class="addJuese">添加用户</el-button>

    <!-- 角色列表 -->
    <el-table height="350px" :data="roles" style="width: 100%">
      <el-table-column type="expand" width="80">
          <template slot-scope="scope">
              <!-- 行列布局 -->
              <el-row class="level2" v-for="(item1) in scope.row.children" :key="item1.id">
                  <el-col :span="4">
                      <el-tag @close="deleRights(scope.row, item1)" closable type="success">{{ item1.authName}}</el-tag>
                      <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                      <el-row class="level1" v-for="(item2) in item1.children" :key="item2.id">
                          <el-col :span="5">
                              <el-tag @close="deleRights(scope.row, item2)" closable type="warning">{{item2.authName}}</el-tag>
                              <i class="el-icon-arrow-right"></i>
                          </el-col>
                          <el-col :span="19">
                            <el-tag @close="deleRights(scope.row, item3)" closable type="info" v-for="(item3) in item2.children" :key="item3.id">{{item3.authName}}</el-tag>
                          </el-col>
                      </el-row>
                  </el-col>
              </el-row>

              <!-- 没有权限时显示 -->
              <el-row v-if="scope.row.children.length === 0">
                  <span>未分配权限</span>
              </el-row>
          </template>
      </el-table-column>
      <el-table-column type="index" label="#" width="100"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="240"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="200"></el-table-column>

      <el-table-column label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            @click="showDiaEditUser(scope.row)"
            type="primary"
            icon="el-icon-edit"
            size="mini"
            circle
            plain
          ></el-button>
          <el-button
            @click="showMsgBoxDele(scope.row)"
            type="danger"
            icon="el-icon-delete"
            size="mini"
            circle
            plain
          ></el-button>
          <el-button
            @click="showDiaSetRole(scope.row)"
            type="success"
            icon="el-icon-check"
            size="mini"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 对话框  添加用户 -->
    <!-- <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
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
    </el-dialog>-->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      roles: []
    };
  },
  created() {
    this.getRoles();
  },
  methods: {
      //取消权限
      async deleRights(role, rights){
          //发送删除权限请求,
          const res = await this.$http.delete(`roles/${role.id}/rights/${rights.id}`)
          //结构赋值取数据
          const {data,meta: {msg, status}} = res.data;
          if(status === 200){
              //提示消息
              this.$message.success(msg);
              //更新当前的角色权限
              //把当前返回的剩余权限赋值给当前用户的权限
              role.children = data;
          }
      },
      //对号方法
      showDiaSetRole(){

      },
      //获取列表数据
    async getRoles() {
      const res = await this.$http.get("roles");
    //   console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.roles = data;
        // console.log(this.roles);
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.addJuese {
  margin-top: 20px;
}
.level1, .level2 {
    margin-bottom: 10px;
}

</style>
