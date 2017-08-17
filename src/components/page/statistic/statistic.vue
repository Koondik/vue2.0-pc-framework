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
                    :exportUrl="pageHeader.exportUrl"
                    :importUrl="pageHeader.importUrl"
            ></page-header>
            <div class="search-wrap">
                <el-date-picker
                        v-model="search.date"
                        type="daterange"
                        placeholder="选择日期范围"
                        :editable="false"
                        v-if="!isChart"
                        @change="getList"
                >
                </el-date-picker>
                <el-input placeholder="查询" v-if="!isChart" v-model="search.keyword">
                    <el-button slot="append" type="primary" @click="getList">查询</el-button>
                </el-input>
                <el-button-group class="right">
                    <el-button :type="isChart?'primary':''" :plain="true" @click="changePage"><i class="iconfont icon-chart"></i></el-button>
                    <el-button :type="!isChart?'primary':''" :plain="true" @click="changePage"><i class="iconfont icon-detail"></i></el-button>
                </el-button-group>
            </div>
            <div class="tabs-wrap" v-show="!isChart">
                <my-card v-for="item in cardList"  :key="item" :badge="item.isApproval" :hasBtn="myCard.hasBtn" :label="item.id">
                    <!--最好在v-for后加一个key绑定确保唯一性-->
                    <template slot="Msg">
                        <h4>{{item.roomName}}　<span>【{{item.scheduleDate}}　{{item.periodNames}}】</span></h4>
                        <b>{{item.applyUserName}}　<i>{{item.inputDate |myDate}}</i></b>
                        <div>
                            <span>申请原因：</span>
                            <p>{{item.applyRemark}}</p>
                        </div>
                    </template>
                </my-card>
                <div class="pagination-wrap clearfix" style="margin-bottom:20px">
                    <div class="left">*显示第{{pagination.startRow}}条到第{{pagination.endRow}}条数据</div>
                    <div class="right">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :current-page="pagination.currentPage"  :page-size="pagination.pageSize"  :total="pagination.total"></el-pagination>
                    </div>
                </div>
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
                                <el-select v-model="chartSelect.value" @change="getChartData" placeholder="请选择" class="right">
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
    import Request from '../../../config/Request';
    import formatDate from '../../../config/date';

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
                    importBtn:false,
                    exportBtn:false
                },
                myCard:{
                    hasBtn:false,
                },
                pagination:{
                    currentPage: 1,
                    pageSize:10,
                    total:null,
                    startRow:null,
                    endRow:null
                },
                search:{
                    keyword:'',
                    date:''
                },
                cardList:[], //预约信息列表
                isChart:true,
                chartSelect:{
                    options :
                        [{
                            value : '1',
                            label : '1月份'
                        },{
                            value : '2',
                            label : '2月份'
                        },{
                            value : '3',
                            label : '3月份'
                        },{
                            value : '4',
                            label : '4月份'
                        },{
                            value : '5',
                            label : '5月份'
                        },{
                            value : '6',
                            label : '6月份'
                        }, {
                            value : '7',
                            label : '7月份'
                        }, {
                            value : '8',
                            label : '8月份'
                        }, {
                            value : '9',
                            label : '8月份'
                        }, {
                            value : '10',
                            label : '10月份'
                        },{
                            value : '11',
                            label : '11月份'
                        },{
                            value : '12',
                            label : '12月份'
                        }
                    ],
                    value: (new Date().getMonth()+1).toString()
                },

                lineData:{title:[],data:[]},
                barData:{title:[],data:[]},
                lineChart: null,
                BarChart: null,
                width:'',
                height:'400px'
            }
        },
        mounted() {
            //获取列表
            this.getList();
            this.getChartData();
            //窗口监听
//            window.onresize = () => {
//                this.lineChart.dispose();  //销毁图表
//                this.BarChart.dispose();  //销毁图表
//                this.initBarChart();
//                this.initLineChart();
//                this.resizeCharts()
//            }
        },
//        destroyed(){
//            this.lineChart.dispose();  //销毁图表
//            this.BarChart.dispose();  //销毁图表
//        },
        methods:{
            getList(){ //获取列表
                console.log('搜索日期:'+this.search.date);
                var fromDate = '';
                var toDate = '';
                if(this.search.date){
                    if(this.search.date[0] !==null && this.search.date[0] !==null){
                        fromDate = formatDate(new Date(this.search.date[0]), 'yyyy-MM-dd');
                        toDate = formatDate(new Date(this.search.date[1]), 'yyyy-MM-dd');
                    }else {
                        fromDate = '';
                        toDate = '';
                    }
                    console.log(fromDate,toDate);
                }else {
                    fromDate = '';
                    toDate = '';
                }
                const url = this.GLOBAL_Config.roomApi+'room/roomapply?tenantId='+this.GLOBAL_User.detail.tenantId
                    +'&sreachText='+this.search.keyword
                    +'&fromDate='+ fromDate
                    +'&toDate='+ toDate
                    +'&pageNum='+this.pagination.currentPage+'&pageSize='+this.pagination.pageSize+'&isApproval=1,-1&orderBy=id%20asc';
                Request('GET',url).then(function(res){
                    //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                    console.log(res);
                    this.cardList = res.list;
                    this.total = res.list?res.total:0;
                    this.pagination = {
                        currentPage: res.list?res.pageNum:1,
                        pageSize:res.list?res.pageSize:10,
                        total:res.list?res.total:0,
                        startRow:res.list?res.startRow:0,
                        endRow:res.list?res.endRow:0
                    }
                }.bind(this)).catch(function(err){
                    console.log(err)
                });
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagination.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagination.currentPage = val;
                this.getList();
            },
            getChartData(){
                if( this.lineChart || this.BarChart){
                    this.lineChart.dispose();  //销毁图表
                    this.BarChart.dispose();  //销毁图表
                }
                var url1 = this.GLOBAL_Config.roomApi+'room/roomapply/getRoomApplyStatyByRoom?tenantId='+this.GLOBAL_User.detail.tenantId+'&year='+new Date().getFullYear()+'&month='+this.chartSelect.value;
                Request('GET',url1).then(function(res){
                    //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                    console.log(res);
                    this.barData={title:[],data:[]};

                    for(var i in res){
                        this.barData.title.push(i);
                        this.barData.data.push(res[i]);
                    }
                    this.initBarChart();
                    // 设置容器高宽
                    this.resizeCharts();
                }.bind(this)).catch(function(err){
                    console.log(err)
                });

                var url2 = this.GLOBAL_Config.roomApi+'room/roomapply/getRoomApplyStatyByDate?tenantId='+this.GLOBAL_User.detail.tenantId+'&year='+new Date().getFullYear()+'&month='+this.chartSelect.value;
                Request('GET',url2).then(function(res){
                    //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                    console.log(res);
                    this.lineData={title:[],data:[]};
                    for(var i of res){
                        this.lineData.title.push(i.key);
                        this.lineData.data.push(i.value);
                    }
                    this.initLineChart();
                    // 设置容器高宽
                    this.resizeCharts();
                }.bind(this)).catch(function(err){
                    console.log(err)
                });
            },
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
            initBarChart() {
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
                        data: this.barData.title,
                           // ['普通教室', '阶梯教室', '电脑室'],
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
                        interval:1,  //间隔大小
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
                        data: this.barData.data
                            //[50, 80, 70 ]
                    }]
                })
            },
            initLineChart(){
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
                        data: this.lineData.title,
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
                        interval:1,  //间隔大小
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
                        data: this.lineData.data
                    }]
                });
            }
        },
        watch:{
            'search.keyword':function(key){
                if(key ===''){
                    this.getList();
                }
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
