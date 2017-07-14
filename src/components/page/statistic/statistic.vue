<template>
    <div class="statistic">
        <div class="sub-header">
            <i class="iconfont icon-location"></i>
            <span>
                所在位置:预约统计
            </span>
        </div>
        <div class="content-wrap">
            <page-header
                    :title="pageHeader.name"
                    :showAdd="pageHeader.addBtn"
                    :showDel="pageHeader.delBtn"
                    :showImport="pageHeader.importBtn"
                    :showExport="pageHeader.exportBtn"
            ></page-header>
            <div class="search-wrap">
                <el-date-picker
                        v-model="filter.date"
                        type="daterange"
                        placeholder="选择日期范围"
                        v-if="!isChart">
                </el-date-picker>
                <el-input placeholder="查询" v-if="!isChart">
                    <el-button slot="append" type="primary"   v-model="filter.keyword">查询</el-button>
                </el-input>
                <el-button-group class="right">
                    <el-button :type="isChart?'primary':''" :plain="true" @click="changePage"><i class="iconfont icon-chart"></i></el-button>
                    <el-button :type="!isChart?'primary':''" :plain="true" @click="changePage"><i class="iconfont icon-detail"></i></el-button>
                </el-button-group>
            </div>
            <div class="tabs-wrap" v-show="!isChart">
                <my-card ></my-card>
            </div>
            <div class="tabs-wrap" v-show="isChart">
                <el-row style="margin-top: 30px;">
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div slot="header" class="title">
                                <span>教室使用统计图</span>
                            </div>
                            <div class="charts" style="width:100%;height:400px">
                                <!--:style="{height:height,width:width}"-->
                                <div id="line" :style="{height:height,width:width}" ref="myLine"></div>
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="12">
                        <el-card class="box-card">
                            <div slot="header" class="title">
                                <span>教室类型统计图</span>
                                <el-select v-model="chartSelect.value" placeholder="请选择" class="right">
                                    <el-option
                                            v-for="item in chartSelect.options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="charts" style="width:100%;height:400px">
                                <div id="bar" :style="{height:height,width:width}" ref="myBar"></div>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import commonConfig from '../../../config/config';
    import pageHeader from '../../common/pageHeader.vue';
    import myDialog from '../../common/myDialog.vue';
    import myCard from  '../../common/myCard.vue';

    let echarts = require('echarts/lib/echarts');
    require('echarts/lib/chart/bar');
    require('echarts/lib/chart/line');
    require('echarts/lib/component/tooltip');
//    require('echarts/lib/component/toolbox');
//    require('echarts/lib/component/legend'); 图例组件
    export default {
        name : 'statistic',
        data () {
            return {
                pageHeader:{
                    name:'预约统计',
                    addBtn:false,
                    delBtn:false,
                    importBtn:true,
                    exportBtn:true
                },
                filter:{
                    keyword:'',
                    date:''
                },
                isChart:true,
                chartSelect:{
                    options: [{
                        value: '选项1',
                        label: '6月份'
                    }, {
                        value: '选项2',
                        label: '7月份'
                    }, {
                        value: '选项3',
                        label: '8月份'
                    }, {
                        value: '选项4',
                        label: '8月份'
                    }, {
                        value: '选项5',
                        label: '10月份'
                    }],
                    value: '选项1'
                },

                lineChart: null,
                BarChart: null,
                width:'',
                height:'400px'
            }
        },
        mounted() {
            this.initChart();
            // 设置容器高宽
            this.resizeCharts();
            //窗口监听
            window.onresize = () => {
                console.log(111);
                this.lineChart.dispose();  //销毁图表
                this.BarChart.dispose();  //销毁图表
                this.initChart();
                this.resizeCharts()
            }

        },
        methods:{
            changePage(){
                this.isChart = !this.isChart;
                console.log(this.isChart);
            },
            resizeCharts (){
                let chartBox = document.getElementsByClassName('charts')[0];
//                console.log(chartBox.offsetWidth,chartBox.offsetHeight);
                this.width = chartBox.offsetWidth + 'px';
                this.height = chartBox.offsetHeight + 'px'
            },
            initChart() {
                this.lineChart = echarts.init(this.$refs.myLine);
                // 把配置和数据放这里
                this.lineChart.setOption({
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '10%',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: [{
                        name:'日期',
                        type: 'category',
                        data: ['06.15', '06.16', '06.17', '06.18', '06.19'],
                        axisLine:{
                            lineStyle:{
                                color:'#3398DB'
                            }
                        },
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#000'
                            }
                        }

                    }],
                    yAxis: [{
                        name:'使用次数',
                        type: 'value',
                        splitNumber:10,
                        axisLine:{
                            lineStyle:{
                                color:'#3398DB'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#000'
                            }
                        },
                        splitLine:{
                            lineStyle:{
                                type:'dashed'
                            }
                        }
                    }],
                    series: [{
                        name: '教室使用',
                        type: 'line',
                        symbol:'circle',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        data: [30, 50, 10, 30, 20]
                    }]
                });
                this.BarChart = echarts.init(this.$refs.myBar);
                // 把配置和数据放这里
                this.BarChart.setOption({
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '5%',
                        right: '15%',
                        bottom: '0',
                        containLabel: true
                    },
                    xAxis: [{
                        name:'教室类型',
                        type: 'category',
                        data: ['普通教室', '阶梯教室', '电脑室'],
                        axisLine:{
                            lineStyle:{
                                color:'#3398DB'
                            }
                        },
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#000'
                            }
                        }

                    }],
                    yAxis: [{
                        name:'使用次数',
                        type: 'value',
                        splitNumber:10,
                        axisLine:{
                            lineStyle:{
                                color:'#3398DB'
                            }
                        },
                        axisLabel:{
                            textStyle:{
                                color:'#000'
                            }
                        },
                        splitLine:{
                            lineStyle:{
                                type:'dashed'
                            }
                        }
                    }],
                    series: [{
                        name: '教室使用',
                        type: 'bar',
                        barWidth:'40%',
                        label: {
                            normal: {
                                show: true,
                                position: 'inside'
                            }
                        },
                        data: [50, 80, 70 ]
                    }]
                })
            }
        },
        components:{ pageHeader , myCard }
    }




</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    $baseColor: #4e97d9;
    a{color:#fff}
    .sub-header{
        background-color:#fff;
        width:100%;
        font-size:16px;
        color:#999;
        line-height:61px;
        padding-left:24px;
    }
    .content-wrap{
        margin: 17px 15px;
        background-color: #fff;
        min-height: 100%;
        position: absolute;
        right: 0;
        left: 0;
        padding:0 15px;
    }
    .search-wrap{
        padding:26px 0;

    }
    .el-input{
        width:280px;
        .el-button{
            border-top: inherit;
            border-bottom: inherit;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        }

    }
    .el-button-group{
        .el-button{
            padding:6px 15px;
        }
        i{
            font-size:20px;
        }
    }


</style>
