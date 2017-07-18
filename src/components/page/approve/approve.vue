<template>
    <div class="approve">
        <div class="sub-header">
            <i class="iconfont icon-location"></i>
            <span>
                所在位置:预约审批
            </span>
        </div>
        <div class="content-wrap">
            <div class="count-wrap">
                <p>共：<span>{{total}}</span> 条</p>
            </div>
            <page-header
                    :title="pageHeader.name"
                    :showAdd="pageHeader.addBtn"
                    :showDel="pageHeader.delBtn"
                    :showImport="pageHeader.importBtn"
                    :showExport="pageHeader.exportBtn"
            ></page-header>
            <div class="nav-wrap">
                <my-card v-for="item in cardList"  :key="item" :hasBtn="myCard.hasBtn" v-on:unapprove="unapprove(item)" v-on:approve="approve(item,true)" :label="item.id">
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
            </div>
        </div>
        <my-dialog :Visible="dialog.Visible" :title="dialog.title" :size="dialog.size" v-on:closeDialog="closeDialog" v-on:OK="approve(unApproveData,false)">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="申请人：" :label-width="formLabelWidth">{{msg.applyUserName}}</el-form-item>
                <el-form-item label="申请时间：" :label-width="formLabelWidth">{{msg.inputDate}}</el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="申请教室：" :label-width="formLabelWidth">{{msg.roomName}}</el-form-item>
                <el-form-item label="预约时间：" :label-width="formLabelWidth">{{msg.scheduleDate}} {{msg.periodNames}}</el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="预约事由：" :label-width="formLabelWidth">{{msg.applyRemark}}</el-form-item>
            </el-form>
            <el-form :model="form">
                <el-form-item label="意见：" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.desc"></el-input>
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
        name : 'approve',
        data () {
            return {
                pageHeader:{
                    name:'预约审批',
                    addBtn:false,
                    delBtn:false,
                    importBtn:false,
                    exportBtn:false
                },
                myCard:{
                    hasBtn:true,
                },
                dialog:{
                    Visible: false,
                    title:'不同意意见',
                    size:'tiny'
                },
                msg:{
                    applyUserName:'',
                    inputDate:'',
                    roomName:'',
                    scheduleDate:'',
                    periodNames:'',
                    applyRemark:''
                },
                unApproveData:{},
                form: {
                    desc:''
                },
                formLabelWidth: '165px',
                cardList:[], //预约信息列表
                total:''
            }
        },
        mounted(){
            //获取列表
            this.getList();
        },
        methods:{
            getList(){ //获取列表
                const url = this.GLOBAL_Config.roomApi+'room/roomapply?tenantId='+this.GLOBAL_User.detail.tenantId+'&pageNum=1&pageSize=1000000&isApproval=0&orderBy=id%20asc';
                Request('GET',url).then(function(res){
                    //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                    console.log(res);
                    this.cardList = res.list;
                    this.total = res.total;
                }.bind(this)).catch(function(err){
                    console.log(err)
                });
            },
            approve(obj,key){ //同意
                console.log(obj,key);
                const url = this.GLOBAL_Config.roomApi+'room/roomapply/ApplyRoomApply?isSuccess='+key;
                var data = {
                    applyId: obj.id,
                    approvalDate:formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss'),
                    approvalUserId: this.GLOBAL_User.detail.id,
                    id: 0,
                    remark: key?'':this.form.desc,
                    tenantId: this.GLOBAL_User.detail.tenantId
                };
                Request('POST',url,data).then(function(res){
                    //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                    console.log(res);
                    if(res.code === 0){
                        this.$message({
                            message: '审批成功',
                            type: 'success'
                        });
                        if(!key){this.dialog.Visible = false}
                        this.getList();
                    }else{
                        this.$message({
                            message: '审批失败',
                            type: 'error'
                        });
                    }
                }.bind(this)).catch(function(err){
                    console.log(err)
                });
            },
            unapprove(obj){//打开不同意编辑页面
                this.msg = {
                    applyUserName:obj.applyUserName,
                    inputDate:obj.inputDate,
                    roomName:obj.roomName,
                    scheduleDate:obj.scheduleDate,
                    periodNames:obj.periodNames,
                    applyRemark:obj.applyRemark
                };
                this.unApproveData = obj;
                this.dialog.Visible = true
            },
            closeDialog(){
                this.dialog.Visible = false
            }
        },
        components:{ pageHeader , myDialog , myCard}
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
    .count-wrap{
        position:absolute;
        right: 18px;
        top: 4px;
        p{
            font-size:14px;
            color:#4e97d9;
            span{
                font-size:30px;
                color:#f78b8b
            }
        }
    }
    .el-textarea{
        width:280px;

    }
</style>
