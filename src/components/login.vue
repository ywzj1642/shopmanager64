<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      :label-position="labelPosition"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handleLogin()" type="primary" class="btn-login">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "top",
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async handleLogin() {
      // console.log(1)
      const res = await this.$http.post(`login`, this.formdata);
      // console.log(res);
      const {
        data: {
          data:{token},
          meta: { msg, status }
        }
      } = res;
      if (status === 200) {

          //把token存起来
          localStorage.setItem("token", token);

          //取值
          localStorage.getItem("token");
        // console.log('登录成功---')
        // 渲染home组件 ->改标识(js改标识)
        this.$router.push({
          name: "home"
        });
      } else {
        this.$message.error(msg);
      }

      // .then((res) => {
      //     // console.log(2)
      //     console.log(res)
      //     const{data:{data,meta:{msg, status}}} = res
      //     if( status === 200){
      //         // console.log('登录成功---')
      //         // 渲染home组件 ->改标识(js改标识)
      //         this.$router.push({
      //             name: 'home'
      //         })
      //     }else {
      //         this.$message.error(msg)
      //     }
      // })
      // .catch(err => {
      //     console.log(err)
      // })
    }
  }
};
</script>

<style>
.login-wrap {
  background: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background: #fff;
  border-radius: 5px;
  width: 400px;
  padding: 30px;
}
h2 {
  margin: 0;
  padding: 0;
}
.btn-login {
  width: 100%;
}
</style>

