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
                    v-on:add="add"
                    v-on:del="del"
            ></page-header>
            <div class="search-wrap">
                <el-input placeholder="查询">
                    <el-button slot="append" type="primary" >查询</el-button>
                </el-input>
            </div>
            <div class="table-wrap">
                <el-table :data="tableData" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column prop="name" label="排序" width="180"></el-table-column>
                    <el-table-column prop="address" label="节次"></el-table-column>
                </el-table>
            </div>
            <div class="pagination-wrap clearfix">
                <div class="left">*显示第1条到第10条数据</div>
                <div class="right">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="156"></el-pagination>
                </div>
            </div>
        </div>
        <my-dialog :Visible="dialog.Visible" :title="dialog.title" v-on:closeDialog="closeDialog">
            <el-form :model="form">
                <el-form-item label="排序：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="节次：" :label-width="formLabelWidth">
                    <el-input v-model="form.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
        </my-dialog>
    </div>
</template>

<script>
    import commonConfig from '../../../config/config';
    import pageHeader from '../../common/pageHeader.vue';
    import myDialog from '../../common/myDialog.vue'
    export default {
        name : 'period',
        data () {
            return {
                pageHeader:{
                    name:'节次信息',
                    addBtn:true,
                    delBtn:true,
                    importBtn:true,
                    exportBtn:true
                },
                tableData: [{
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                multipleSelection: [],
                currentPage: 1,
                dialog:{
                    Visible: false,
                    title:'新增节次'
                },
                form: {
                    name: '',
                    region: ''
                },
                formLabelWidth: '165px'
            }
        },
        methods:{
            add(){ //新增
               this.dialog.Visible = true
            },
            del(){ //删除
                console.log(222);
            },
            closeDialog(){
                this.dialog.Visible = false
            },

            handleSelectionChange(val) {
                this.multipleSelection = val;
                console.log(val);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
</style>
