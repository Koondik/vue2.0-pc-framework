<template>
    <div class="booking">
        <div class="sub-header">
            <i class="iconfont icon-location"></i>
            <span>
                所在位置:场地预约
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
                    :action="pageHeader.importUrl"
                    v-on:add="openDialog"
                    v-on:del="del"
            ></page-header>
            <div class="nav-wrap">
                <el-menu :default-active="navIndex" mode="horizontal" @select="handleSelect">
                    <el-menu-item index="1">全部</el-menu-item>
                    <el-menu-item index="2">待审批</el-menu-item>
                    <el-menu-item index="3">已通过</el-menu-item>
                    <el-menu-item index="4">不通过</el-menu-item>
                </el-menu>
                <el-checkbox-group v-model="checkList">
                    <my-card v-for="item in cardList"  :key="item" :badge="item.isApproval" :hasBtn="myCard.hasBtn" :label="item.id">
                        <!--最好在v-for后加一个key绑定确保唯一性-->
                        <template slot="Msg">
                            <h4>{{item.roomName}}　<span>【{{item.scheduleDate}}　{{item.periodNames}}】</span>　　<i @click.prevent="reset(item)" v-if="item.isApproval == 0">修改</i></h4>
                            <b>{{item.applyUserName}}　<i>{{item.inputDate |myDate}}</i></b>
                            <div>
                                <span>申请原因：</span>
                                <p>{{item.applyRemark}}</p>
                            </div>
                        </template>
                    </my-card>
                </el-checkbox-group>
            </div>
            <div class="pagination-wrap clearfix" style="margin-bottom:20px">
                <div class="left">*显示第{{pagination.startRow}}条到第{{pagination.endRow}}条数据</div>
                <div class="right">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :current-page="pagination.currentPage"  :page-size="pagination.pageSize"  :total="pagination.total"></el-pagination>
                </div>
            </div>
        </div>
        <my-dialog :Visible="dialog.Visible" :title="dialog.title" :size="dialog.size" v-on:closeDialog="closeDialog"  v-on:OK="check('Form')">
            <el-form :model="form" :rules="rules" ref="Form" :label-width="formLabelWidth" >
                <el-form-item label="教室名称："  prop="roomId">
                    <el-select v-model="form.roomId" placeholder="请选择教室">
                        <el-option
                                v-for="item in roomList"
                                :key="item.id"
                                :label="item.roomName"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="活动时间：" prop="scheduleDate">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.scheduleDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="节次：" prop="periodIds">
                    <el-select v-model="form.periodIds" multiple  placeholder="请选择节次">
                        <el-option
                                v-for="item in periodList"
                                :key="item.id"
                                :label="item.periodName"
                                :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="使用事由：" prop="remark">
                    <el-input v-model="form.remark" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
        </my-dialog>
    </div>
</template>

<script>
    import commonConfig from '../../../config/config';
    import pageHeader from '../../common/pageHeader.vue';
    import myDialog from '../../common/myDialog.vue';
    import myCard from  '../../common/myCard.vue';
    import Request from '../../../config/Request';
    import formatDate from '../../../config/date';

    export default {
        name : 'booking',
        data () {
            return {
                pageHeader:{
                    name:'场地预约',
                    addBtn:true,
                    delBtn:true,
                    importBtn:false,
                    exportBtn:true,
                    exportUrl:this.GLOBAL_Config.$webroot+this.GLOBAL_Config.roomApi+'room/roomapply/roomApplyDownload?tenantId='+this.GLOBAL_User.detail.tenantId+'&access_token='+this.GLOBAL_User.token
                },
                navIndex: '1',  //初始化显示第一个分页
                checkList: [],
                dialog:{
                    Visible: false,
                    title:'新增预约',
                    size:'tiny'
                },
                method:'POST',
                myCard:{
                    hasBtn:false
                },
                pagination:{
                    currentPage: 1,
                    pageSize:10,
                    total:null,
                    startRow:null,
                    endRow:null
                },
                form: {},
                rules: {  //表单验证
                    roomId: [
                        { required: true},
                    ],
                    periodIds: [
                        {type: 'array', required: true, message: '请选择使用节次', trigger: 'blur'},
                    ],
                    remark: [
                        { required: true, message: '请输入活动事由', trigger: 'blur' }
                    ],
                    scheduleDate: [
                        { type: 'date', required: true, message: '请选择日期', trigger: 'blur' }
                    ]
                },
                formLabelWidth: '165px',
                roomList:[], //教室列表
                periodList:[], //节次列表
                cardList:[] //预约信息列表
            }
        },
        mounted(){
            var url1 = this.GLOBAL_Config.roomApi+'room/room?pageNum=1&pageSize=10000000&orderBy=id%20asc';
            Request('GET',url1).then(function(res){
                //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                this.roomList = res.list;
                this.form.roomId = this.roomList[0].id; //初始化选中第一个教室
            }.bind(this)).catch(function(err){
                console.log(err)
            });
            var url2 = this.GLOBAL_Config.roomApi+'room/period?tenantId='+this.GLOBAL_User.detail.tenantId+'&pageNum=1&pageSize=10000000&orderBy=id%20asc';
            Request('GET',url2).then(function(res){
                //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                this.periodList = res.list;
            }.bind(this)).catch(function(err){
                console.log(err)
            });
            //获取列表
            this.getList();
        },
        methods:{
            getList(){ //获取列表
                var isApproval = '';
                console.log(this.navIndex);
                switch(this.navIndex){
                    case '1':
                        break;
                    case '2':
                        isApproval = 0;
                        break;
                    case '3':
                        isApproval = 1;
                        break;
                    default:
                        isApproval = -1;
                        break;
                }
                const url = this.GLOBAL_Config.roomApi+'room/roomapply?tenantId='+this.GLOBAL_User.detail.tenantId+'&pageNum='+this.pagination.currentPage+'&pageSize='+this.pagination.pageSize+'&isApproval='+isApproval+'&orderBy=id%20asc';
                Request('GET',url).then(function(res){
                    //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                    console.log(res);
                    this.cardList = res.list;
                    this.pagination = {
                        currentPage: res.pageNum!=0?res.pageNum:1,
                        pageSize:res.pageSize,
                        total:res.total,
                        startRow:res.startRow,
                        endRow:res.endRow
                    }
                }.bind(this)).catch(function(err){
                    console.log(err)
                });
            },
            openDialog(row){
                if(row){
                    this.form = {
                        id: row.id,
                        roomId: row.roomId, //教室ID
                        periodIds: (function(){
                            var periodIds = [];
                            for(var i of row.periodIds.split(',')){
                                console.log(i);
                                periodIds.push(i*1)
                            }
                            return periodIds
                        })(), //节次
                        remark: row.applyRemark,
                        scheduleDate: new Date(row.scheduleDate), //识别时间戳
                        inputDate: row.inputDate,
                        isApproval: row.isApproval,
                        tenantId:this.GLOBAL_User.detail.tenantId,
                        userId: this.GLOBAL_User.detail.id
                    };
                    this.method='PUT'
                }else{
                    this.form = {
                        id: 0,
                        roomId: this.roomList[0].id, //教室ID
                        periodIds: [], //节次
                        remark: "",
                        scheduleDate: "",
                        inputDate: "",
                        isApproval: 0,
                        tenantId:this.GLOBAL_User.detail.tenantId,
                        userId: this.GLOBAL_User.detail.id
                    };
                    this.method='POST'
                }
                this.dialog.Visible = true
            },
            closeDialog(){
                this.dialog.Visible = false
            },
            check(formName){
               // console.log(this.form);
                //console.log(formName);
                this.$refs[formName].validate((valid) => {
                    //console.log(valid);
                    if (valid) {
                       this.add()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            add(){ //新增
                //满足后端要求，时间格式化
                this.form.inputDate = formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss');
                this.form.scheduleDate = formatDate(this.form.scheduleDate, 'yyyy-MM-dd');
                var data = this.form;
                data.periodIds = this.form.periodIds.join(',');

                var url = this.GLOBAL_Config.roomApi + 'room/roomapply';
                if(this.method === 'PUT'){
                    url += '/' + this.form.id
                }
                Request(this.method, url, data).then(function(res){
                    //console.log(res);
                    this.dialog.Visible = false;
                    if(res.code === 0){
                        this.getList();
                        this.form.roomId = this.roomList[0].id; //初始化选中第一个教室
                        this.form.periodIds = "";
                        this.form.remark = "";
                        this.form.scheduleDate = "";
                    } else {
                        this.$message.error({
                            showClose : true,
                            message : '添加失败！',
                            type : 'error'
                        });
                    }

                }.bind(this)).catch(function(err){
                    console.log(err)
                });
            },
            del(){ //删除
                console.log(this.checkList);
                if(this.checkList.length !==0){
                    const url = this.GLOBAL_Config.roomApi+'room/roomapply?list='+ this.checkList;
                    Request('DELETE',url).then(function(res){
                        console.log(res);
                        if(res.code === 0){
                            this.getList();
                            this.checkList = [];
                        }else {
                            this.$message.error({
                                showClose: true,
                                message: '删除失败！',
                                type: 'error'
                            });
                        }

                    }.bind(this)).catch(function(err){
                        console.log(err)
                    });
                }else {
                    this.$message.error({
                        showClose: true,
                        message: '请选择要删除的数据！',
                        type: 'warning'
                    });
                }
            },
            handleSelect(key, keyPath){  //menu点击方法
                console.log(key, keyPath);
                this.navIndex = key;
                this.checkList = []; //清空数据
                this.getList();
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
            reset(data){
                //console.log(data);
                this.openDialog(data)
            }
        },
        components:{ pageHeader , myDialog , myCard }
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
    /*导航样式*/
    .nav-wrap{
        width: 100%;
        padding-top: 15px;
        box-sizing: border-box;
        .el-menu{
            position: absolute;
            z-index: 1000;
            top: 0px;
            left: 110px;
            border-bottom: none;
            background-color: #fff;
            .el-menu-item{
                float: left;
                height: 62px;
                line-height: 62px;
                margin: 0;
                cursor: pointer;
                position: relative;
                box-sizing: content-box;
                border-bottom: 2px solid transparent;
            }
            .is-active{
                border-bottom: 2px solid #20a0ff;
            }
        }
    }

    .el-input,.el-select{
        width:280px;
        .el-button{
            border-top: inherit;
            border-bottom: inherit;
            border-bottom-left-radius: 0;
            border-top-left-radius: 0;
        }
    }
</style>
