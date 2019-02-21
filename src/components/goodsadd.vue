<template>
  <el-card class="box">
    <!-- 面包屑组件 -->
    <cus-bread level1="商品管理" level2="商品列表"></cus-bread>
    <!-- 消息提示文案 -->
    <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
    <!-- 步骤条 -->
    <el-steps :active="active*1" align-center>
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>

    <!-- tab切换 -->
    <el-form class="form" label-position="top" :model="form">
      <el-tabs @tab-click="changeTab()" v-model="active" tab-position="left" class>
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_cat"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              :props="defaultProp"
              v-model="selectedOptions"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <el-form-item v-for="(item1) in arrDy" :key="item1.attr_id" :label="item1.attr_name">
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border v-for="(item2, i) in item1.attr_vals" :key="i" :label="item2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item v-for="(item) in arrStatic" :key="item.cat_id" :label="item.cat_name">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 图片上传 -->
        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <!-- 因为不是axios请求,所以必须设置请求头,保存token -->
            <el-upload
              action="http://localhost:8888/api/private/v1/upload"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <!-- 富文本编辑器 -->
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <el-button @click="addGoods()">添加商品</el-button>
            <quill-editor
              class="quill" v-model="form.goods_introduce"
            ></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>
</el-steps>

  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  components:{
    quillEditor
  },
  data() {
    return {
      active: "1",
      //添加商品的表单数据
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
      },
      //级联使用的数据
      options: [],
      selectedOptions: [1, 3, 6], //三级分类层级id组成的数组
      defaultProp: {
        value: "cat_id",
        label: "cat_name",
        children: "children"
      },
      //动态参数
      arrDy: [],
      arrStatic: [],
      //点击上传
      //设置请求头,值类型是一个对象,属性名为Authorization
      headers:{
        Authorization:localStorage.getItem("token")
      }
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    //添加商品
    addGoods(){

    },
    //点击上传
    handleRemove(file, fileList) {
      // console.log('remove----')
      // console.log(file);
      // file.response.data.tmp_path --->删除临时路径
    },
    handleSuccess(response, file, fileList){
      // console.log(response);
      // response.data.tem_path ->临时路径
    },
    //点击tab键,发送请求
    async changeTab() {
      if (this.active === "2" || this.active === "3") {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning("请选择三级分类");
          return;
        }
        if (this.active === "3") {
          const res = await this.$http.get(
            `categories/${this.selectedOptions[2]}/attributes?sel=only`
          );
          // console.log(123);
          const {
            data,
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            this.arrStatic = data;
            console.log(this.arrStatic);
          }
        }
        if (this.active === 2) {
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
            // console.log('this.arrDy')
            // console.log(this.arrDy);
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
      }
    },
    //获取三级商品分类数据
    async getGoodsCate() {
      const res = await this.$http.get("categories?type=3");
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        this.options = data;
        // console.log(123,data)
      }
    },
    handleChange() {}
  }
};
</script>

<style>
.box {
  height: 100%;
}
.form {
  height: 340px;
  overflow: auto;
}
.ql-editor, .ql-blank {
  min-height: 200px;
}
</style>
