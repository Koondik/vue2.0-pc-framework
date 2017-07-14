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
                <p>共：<span>3</span> 条</p>
            </div>
            <page-header
                    :title="pageHeader.name"
                    :showAdd="pageHeader.addBtn"
                    :showDel="pageHeader.delBtn"
                    :showImport="pageHeader.importBtn"
                    :showExport="pageHeader.exportBtn"
            ></page-header>
            <div class="tabs-wrap">
                <my-card :checkList="myCard.checkList" :hasBtn="myCard.hasBtn" v-on:unapprove="unapprove"></my-card>
            </div>
        </div>
        <my-dialog :Visible="dialog.Visible" :title="dialog.title" :size="dialog.size" v-on:closeDialog="closeDialog">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="申请人：" :label-width="formLabelWidth">何大大</el-form-item>
                <el-form-item label="申请时间：" :label-width="formLabelWidth">2016-06-07</el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="申请教室：" :label-width="formLabelWidth">何大大</el-form-item>
                <el-form-item label="预约时间：" :label-width="formLabelWidth">2016-06-20 第5.6节</el-form-item>
            </el-form>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="预约事由：" :label-width="formLabelWidth">教学交流</el-form-item>
            </el-form>
            <el-form :model="form">
                <el-form-item label="活动形式：" :label-width="formLabelWidth">
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
    import myCard from  '../../common/myCard.vue'
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

                    checkList: ['复选框 A']
                },
                dialog:{
                    Visible: false,
                    title:'不同意意见',
                    size:'tiny'
                },
                form: {
                    desc:''
                },
                formLabelWidth: '165px'
            }
        },
        methods:{
            unapprove(){   //打开不同意编辑页面
                this.dialog.Visible = true
            },
            closeDialog(){
                this.dialog.Visible = false
            },
            handleClick(tab, event) {  //tabs点击方法
                console.log(tab, event);
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
    .content-wrap{
        margin: 17px 15px;
        background-color: #fff;
        min-height: 100%;
        position: absolute;
        right: 0;
        left: 0;
        padding:0 15px;
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
