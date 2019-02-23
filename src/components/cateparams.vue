<template>
  <el-card class="box">
    <!-- 面包屑 -->
    <cus-bread level1="商品管理" level="分类参数"></cus-bread>
    <!-- 提示信息 -->
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- 级联选择器 -->
    <el-form class="form" label-position="left" :model="form">
      <el-form-item label="请选择商品分类">
        <el-cascader
          :show-all-levels="false"
          clearable
          expand-trigger="hover"
          :options="options"
          :props="defaultProp"
          v-model="selectedOptions"
          @change="handleChange"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <!-- tabs -->
    <el-tabs @tab-click="changeTab()" v-model="active">
      <el-tab-pane label="动态参数" name="1">
        <!-- 按钮 -->
        <el-button>设置动态参数</el-button>
        <!-- 表格 -->
        <el-table height="330px" border stripe :data="arrDy" style="width: 100%">
          <!-- 展开 -->
          <el-table-column type="expand" width="80px">
            <template slot-scope="scope">
              <el-tag
                :key="i"
                v-for="(item, i) in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,item)"
              >{{item}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <!-- 序号 -->
          <el-table-column type="index" label="#" width="80px"></el-table-column>

          <el-table-column prop="attr_name" label="属性名称"></el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="2">
        <!-- 按钮 -->
        <el-button>设置静态参数</el-button>
        <el-table height="330px" border stripe :data="arrStatic" style="width: 100%">
          <!-- 序号 -->
          <el-table-column type="index" label="#" width="80px"></el-table-column>

          <el-table-column prop="attr_name" label="属性名称"></el-table-column>
          <el-table-column prop="attr_vals" label="属性值"></el-table-column>

          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
              <el-button plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      options: [],
      selectedOptions: [], //三级分类层级id组成的数组
      defaultProp: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      active: "",
      arrDy: [], //动态参数
      arrStatic: [], //静态参数
      inputValue: "", //动态添加tag
      inputVisible: false
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    //关闭标签
    async handleClose(obj, item) {
      obj.attr_vals.splice(obj.attr_vals.indexOf(item), 1);
      console.log(obj);
      const res = await this.$http.put(
        `categories/${obj.cat_id}/attributes/${obj.attr_id}`,
        {
          attr_name: obj.attr_name,
          attr_sel: obj.attr_sel,
          attr_vals: obj.attr_vals.join(",")
        }
      );

      console.log(res);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    async handleInputConfirm(obj) {
      let inputValue = this.inputValue;
      if (inputValue) {
        obj.attr_vals.push(inputValue);

        //发送请求
        //404 的提示错误,是发送请求的方式搞错了,所以没有找到数据
        const res = await this.$http.put(
          `categories/${obj.cat_id}/attributes/${obj.attr_id}`,
          {
            attr_name: obj.attr_name,
            attr_sel: obj.attr_sel,
            attr_vals: obj.attr_vals.join(",")
          }
        );
        console.log(res);
      }
      this.inputVisible = false;
      this.inputValue = "";
    },
    //tab切换,获取动态或静态数据
    async changeTab() {
      console.log(123);
      this.getDyOrStatic();
    },
    //获取静态或者动态数据
    async getDyOrStatic() {
      if (this.selectedOptions.length !== 3) {
        this.$message.warning("请选择第三级分类");
        //未按规定选择三级分类时,清空动态和静态数据
        if (this.active === "1") {
          this.arrDy = [];
        }
        if (this.active === "2") {
          this.arrStatic = [];
        }
      }
      //获取动态数据
      if (this.active === "1") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        // console.log(res);
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.arrDy = data;
          console.log(this.arrDy);
          this.arrDy.forEach(item => {
            //把字符串分隔成数组并保存
            // string.trim(),去掉多余的空格
            // string为空时,
            item.attr_vals =
              item.attr_vals.trim() === 0
                ? []
                : item.attr_vals.trim().split(",");
          });
        }
      }
      //获取静态数据
      if (this.active === "2") {
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=only`
        );

        // console.log(res)
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.arrStatic = data;
          console.log("静态数据");
          console.log(this.arrStatic);
        }
      }
    },

    //获取三级分类数据
    async handleChange() {
      this.getDyOrStatic();
    },

    //获取级联数据
    async getGoodsCate() {
      const res = await this.$http.get(`categories?type=3`);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.options = data;
      }
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
