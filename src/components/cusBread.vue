<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    name:"cusBread",
    // data中的数据特点:只能来源于本身
    // 数据生命的值如果来源于外部,此时数据生命不能写在data中
    // 应该吧数据生命写在props中
    // props的值可以是字符创数组
    // props中的数据用法和data中数据用法一样,
    // props中的数据是数据声明,没有赋值
    // props中的数据将来就是组件的属性,-> 也就是自定义标签的属性
    // props 中的数据将来使用组件时通过属性进行赋值
 props:["level1", "level2"]
}
</script>

<style>

</style>
