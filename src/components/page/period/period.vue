<template>
    <div class="period">
        <div class="sub-header">
            <i class="iconfont icon-location"></i>
            <span>
                所在位置:节次设置
            </span>
        </div>
        <div class="content-wrap">
            <page-header
                    :title="pageHeader.name"
                    :showAdd="pageHeader.addBtn"
                    :showDel="pageHeader.delBtn"
                    :showImport="pageHeader.importBtn"
                    :showExport="pageHeader.exportBtn"
                    v-on:add="openDialog"
                    v-on:del="del"
            ></page-header>
            <div class="search-wrap">
                <el-input placeholder="查询" v-model="searchKeyword">
                    <el-button slot="append" type="primary" @click="getList">查询</el-button>
                </el-input>
            </div>
            <div class="table-wrap">
                <el-table :data="tableData" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange" @row-dblclick="openDialog">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="periodNo" label="排序" width="180"></el-table-column>
                    <el-table-column prop="periodName" label="节次"></el-table-column>
                </el-table>
            </div>
            <div class="pagination-wrap clearfix">
                <div class="left">*显示第{{pagination.startRow}}条到第{{pagination.endRow}}条数据</div>
                <div class="right">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :current-page="pagination.currentPage"  :page-size="pagination.pageSize"  :total="pagination.total"></el-pagination>
                </div>
            </div>
        </div>
        <my-dialog :Visible="dialog.Visible" :title="dialog.title" :size="dialog.size" v-on:closeDialog="closeDialog('Form')"  v-on:OK="check('Form')">
            <el-form :model="form" :rules="rules" ref="Form" :label-width="formLabelWidth">
                <el-form-item label="排序：" prop="periodNo">
                    <el-input v-model.number="form.periodNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="节次：" prop="periodName">
                    <el-input v-model="form.periodName" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
        </my-dialog>
    </div>
</template>

<script>
    import pageHeader from '../../common/pageHeader.vue';
    import myDialog from '../../common/myDialog.vue';
    import Request from '../../../config/Request';
    export default {
        name : 'period',
        data () {
            return {
                pageHeader:{
                    name:'节次信息',
                    addBtn:true,
                    delBtn:true,
                    importBtn:false,
                    exportBtn:false
                },
                tableData: null,
                multipleSelection: [],
                searchKeyword:'',
                pagination:{
                    currentPage: 1,
                    pageSize:10,
                    total:null,
                    startRow:null,
                    endRow:null
                },
                dialog:{
                    Visible: false,
                    title:'新增节次',
                    size:'tiny'
                },
                method:'POST',
                form: {
                    id:0,
                    periodName: "",
                    periodNo: 0,
                    tenantId: this.GLOBAL_User.detail.tenantId
                },
                rules: {  //表单验证
                    periodNo: [
                        { required: true, message: '排序号不能为空'},
                        { type:'number', message: '排序号必须为数字值'},
                    ],
                    periodName: [
                        { required: true, message: '请输入节次', trigger: 'blur' },
                    ]
                },
                formLabelWidth: '165px'
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            resetForm(){   //重置表单对象信息
                this.form = {
                    id:0,
                    periodName: "",
                    periodNo: 0,
                    tenantId: this.GLOBAL_User.detail.tenantId
                }
            },
            getList(){ //获取列表
                const url = this.GLOBAL_Config.roomApi+'room/period?tenantId='+this.GLOBAL_User.detail.tenantId+'&pageNum='+this.pagination.currentPage+'&pageSize='+this.pagination.pageSize+'&searchText='+this.searchKeyword+'&orderBy=id%20asc';
                Request('GET',url).then(function(res){
                    //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                    console.log(res);
                    this.tableData = res.list;
                    this.pagination = {
                        currentPage: res.pageNum,
                        pageSize:res.pageSize,
                        total:res.total,
                        startRow:res.startRow,
                        endRow:res.endRow
                    }
//                    console.log(this.pagination);

                }.bind(this)).catch(function(err){
                    console.log(err)
                });
            },
            openDialog(row){
//                console.log(row);
                if(row){this.form = row;this.method='PUT'}else{this.method='POST'}
                this.dialog.Visible = true
            },
            closeDialog(){
                this.dialog.Visible = false ;
                this.resetForm(); //重置提交数据
            },
            check(formName){
                console.log(this.form);
                console.log(formName);
                this.$refs[formName].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        this.add(formName)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            add(formName){ //新增
                var url = this.GLOBAL_Config.roomApi+'room/period';
                if(this.method === 'PUT'){ url +='/'+this.form.id }
                Request(this.method,url,this.form).then(function(res){
                    console.log(res);
                    this.dialog.Visible = false;
                    if(res.code === 0){
                        this.getList();
                        if(formName){
                            this.$refs[formName].resetFields(); //清空重置表单
                        }
                        this.resetForm(); //重置提交数据
                    }else {
                        this.$message.error({
                            showClose: true,
                            message: '添加失败！',
                            type: 'error'
                        });
                    }

                }.bind(this)).catch(function(err){
                    console.log(err)
                });
            },
            del(){ //删除
               if(this.multipleSelection.length !==0){
                   const arr = [];
                   for(var i of this.multipleSelection){
                       console.log(i);
                       arr.push(i.id);
                   }
                   const url = this.GLOBAL_Config.roomApi+'room/period?list='+ arr;
                   Request('DELETE',url).then(function(res){
                       console.log(res);
                       if(res.code === 0){
                           this.getList();
                           this.multipleSelection = [];
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
            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(this.multipleSelection);
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
            }
        },
        watch:{
            searchKeyword:function(key){
                if(key ===''){
                    this.getList();
                }
            }
        },
        components:{ pageHeader , myDialog}
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
</style>
