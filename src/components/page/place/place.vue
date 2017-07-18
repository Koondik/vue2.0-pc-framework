<template>
    <div class="place">
        <div class="sub-header">
            <i class="iconfont icon-location"></i>
            <span>
                所在位置:场地设置
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
                    v-on:add="openDialog"
                    v-on:del="del"
                    v-on:uploadSuccess="uploadSuccess"
            ></page-header>
            <div class="search-wrap">
                <el-input placeholder="查询"  v-model="searchKeyword">
                    <el-button slot="append" type="primary" @click="getList">查询</el-button>
                </el-input>
            </div>
            <div class="table-wrap">
                <el-table :data="tableData" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange"  @row-dblclick="openDialog">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="roomNo" label="排序" width="80"></el-table-column>
                    <el-table-column prop="roomName" label="教室名称"></el-table-column>
                    <el-table-column prop="maxSeat" label="座位数"></el-table-column>
                    <el-table-column prop="remark" label="备注" class-name="text-overflow-hidden"  label-class-name="normal-th"></el-table-column>
                </el-table>
            </div>
            <div class="pagination-wrap clearfix">
                <div class="left">*显示第{{pagination.startRow}}条到第{{pagination.endRow}}条数据</div>
                <div class="right">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[5, 10, 15, 20]" layout="total, sizes, prev, pager, next, jumper" :current-page="pagination.currentPage"  :page-size="pagination.pageSize"  :total="pagination.total"></el-pagination>
                </div>
            </div>
        </div>
        <my-dialog :Visible="dialog.Visible" :title="dialog.title" :size="dialog.size" v-on:closeDialog="closeDialog"  v-on:OK="check('Form')">
            <el-form :model="form" :rules="rules" ref="Form" :label-width="formLabelWidth">
                <el-form-item label="排序：" prop="roomNo">
                    <el-input v-model.number="form.roomNo" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="教室名称：" prop="roomName">
                    <el-input v-model="form.roomName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="座位数：" prop="maxSeat">
                    <el-input v-model.number="form.maxSeat" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input type="textarea" v-model="form.remark"></el-input>
                    <!--<el-input v-model="form.remark" auto-complete="off"></el-input>-->
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
        name : 'place',
        data () {
            return {
                pageHeader:{
                    name:'场地设置',
                    addBtn:true,
                    delBtn:true,
                    importBtn:true,
                    exportBtn:true,
                    importUrl:this.GLOBAL_Config.$webroot+this.GLOBAL_Config.roomApi+'room/room/roomUpload?tenantId='+this.GLOBAL_User.detail.tenantId+'&access_token='+this.GLOBAL_User.token,
                    exportUrl:this.GLOBAL_Config.$webroot+this.GLOBAL_Config.roomApi+'room/room/roomDownload?tenantId='+this.GLOBAL_User.detail.tenantId+'&access_token='+this.GLOBAL_User.token
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
                    title:'新增场地',
                    size:'tiny'
                },
                method:'POST',
                form: {
                    id:0,
                    roomNo: 0,
                    roomName: '',
                    maxSeat:'',
                    remark:'',
                    tenantId: this.GLOBAL_User.detail.tenantId
                },
                rules: {  //表单验证
                    roomNo: [
                        { required: true, message: '排序号不能为空'},
                        { type:'number', message: '排序号必须为数字值'},
                    ],
                    roomName: [
                        { required: true, message: '请输入教室名'},
                    ],
                    remark: [
//                        { required: true, message: '请输入备注信息', trigger: 'blur' }
                    ],
                    maxSeat: [
                        { required: true, message: '座位数不能为空'},
                        { type: 'number', message: '教室座位数必须为数字值'}
                    ]
                },
                formLabelWidth: '165px'
            }
        },
        mounted(){
            this.getList();
        },
        methods:{
            getList(){ //获取列表
                const url = this.GLOBAL_Config.roomApi+'room/room?pageNum='+this.pagination.currentPage+'&pageSize='+this.pagination.pageSize+'&searchText='+this.searchKeyword+'&orderBy=id%20asc';
                Request('GET',url).then(function(res){
                    //这两个回调函数都有各自独立的作用域，如果直接在里面访问 this，无法访问到 Vue 实例,只要添加一个 .bind(this) 就能解决这个问题
                    //                    console.log(res);
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
                this.dialog.Visible = false
            },
            check(formName){
                console.log(this.form);
                console.log(formName);
                this.$refs[formName].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        this.add()
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            add(){ //新增
                var url = this.GLOBAL_Config.roomApi+'room/room';
                if(this.method === 'PUT'){ url +='/'+this.form.id }
                Request(this.method,url,this.form).then(function(res){
                    console.log(res);
                    this.dialog.Visible = false;
                    if(res.code === 0){
                        this.getList();
                        this.form.roomName = '';
                        this.form.roomNo = 0;
                        this.form.maxSeat='';
                        this.form.remark=''
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
                    const url = this.GLOBAL_Config.roomApi+'room/room?list='+ arr;
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
            uploadSuccess(){
                //上传成功后刷新数据
                this.getList()
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
    .el-textarea{
        width:280px;

    }
</style>
