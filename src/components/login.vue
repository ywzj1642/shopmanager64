<template>
    <div class="login-wrap">
        <el-form class="login-form" :label-position="labelPosition" label-width="80px" :model="formdata">
            <h2>用户登录</h2>
            <el-form-item label="名称">
            <el-input v-model="formdata.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
            <el-input v-model="formdata.region"></el-input>
            </el-form-item>
            <el-form-item label="活动形式">
            <el-input v-model="formdata.type"></el-input>
            </el-form-item>
            <el-button type="primary">主要按钮</el-button>
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
        }
    };
</script>

<style>
</style>

