<template>
  <el-card class="box">
    <!-- 面包屑导航 -->
    <cus-bread level1="权限管理" level2="权限列表"></cus-bread>
    <!-- 权限列表 -->
    <el-table height="470px" :data="list" style="width: 100%">
        <el-table-column type="index" label="#" width="50"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="200"></el-table-column>
        <el-table-column prop="path" label="路径" width="200"></el-table-column>
        <el-table-column label="层级" width="200">
            <template slot-scope="scope">
                <span v-if="scope.row.level==='0'">一级</span>
                <span v-if="scope.row.level==='1'">二级</span>
                <span v-if="scope.row.level==='2'">三级</span>
            </template>
        </el-table-column>
    </el-table>

  </el-card>
</template>

<script>
export default {
    data() {
        return {
            list:[]
        }
    },
    created() {
        this.getTableData();
    },
    methods: {
        async getTableData(){
           
            const res = await this.$http.get(`rights/list`);
            console.log(res);
            const {data, meta: {msg, status}} = res.data;
            if(status === 200){
                this.list = data;
                // console.log(this.list);
            }
        }
    },
};
</script>

<style>
.box {
  height: 100%;
}
</style>
