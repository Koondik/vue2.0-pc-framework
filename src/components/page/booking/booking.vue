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
                    v-on:add="add"
                    v-on:del="del"
            ></page-header>
            <div class="tabs-wrap">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="全部" name="first">
                        <el-checkbox-group v-model="checkList">
                            <my-card :hasBtn="myCard.hasBtn"></my-card>
                        </el-checkbox-group>
                    </el-tab-pane>
                    <el-tab-pane label="待审批" name="second">配置管理</el-tab-pane>
                    <el-tab-pane label="已通过" name="third">角色管理</el-tab-pane>
                    <el-tab-pane label="不通过" name="fourth">定时任务补偿</el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <my-dialog :Visible="dialog.Visible" :title="dialog.title" v-on:closeDialog="closeDialog">
            <el-form :model="form">
                <el-form-item label="教室名称：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动时间：" :label-width="formLabelWidth">
                    <el-col :span="8">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                    </el-col>
                    <el-col class="line" style="text-align:center" :span="2">-</el-col>
                    <el-col :span="8">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="使用事由：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
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
        name : 'booking',
        data () {
            return {
                pageHeader:{
                    name:'场地预约',
                    addBtn:true,
                    delBtn:true,
                    importBtn:false,
                    exportBtn:true
                },
                activeName: 'first',  //初始化显示第一个分页
                checkList: [],
                dialog:{
                    Visible: false,
                    title:'新增预约'
                },
                myCard:{
                    hasBtn:false
                },
                form: {
                    name: '',
                    region: '',
                    date1:'',
                    date2:''
                },
                formLabelWidth: '165px'
            }
        },
        methods:{
            add(){ //新增
                console.log(111);
                this.dialog.Visible = true
            },
            del(){ //删除
                console.log(222);
            },
            closeDialog(){
                this.dialog.Visible = false
            },
            handleClick(tab, event) {  //tabs点击方法
                console.log(tab, event);
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
    .content-wrap{
        margin: 17px 15px;
        background-color: #fff;
        min-height: 100%;
        position: absolute;
        right: 0;
        left: 0;
        padding:0 15px;
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
</style>
