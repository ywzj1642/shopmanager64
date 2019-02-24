<template>
  <el-card class="box">
    <!-- 面包屑导航 -->
    <cus-bread level1="数据统计" level2="数据报表"></cus-bread>
    <!-- eachart折线图 -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </el-card>
</template>

<script>
// var echarts = require('echarts')
import echarts from "echarts";
export default {
  mounted() {
    this.initcharts();
  },
  methods: {
    async initcharts() {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById("main"));
      const res = await this.$http.get(`reports/type/1`);
      const  option2 = res.data.data;
      // 指定图表的配置项和数据
      const option1 = {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
      };
      const option = {...option1, ...option2}
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style>
.box {
  height: 100%;
}
#main {
    margin-top: 30px;
}
</style>
