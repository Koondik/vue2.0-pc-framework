<template>
    <div class="pageHeader">
        <div class="page-header clearfix">
            <h4 class="left">{{title}}</h4>
            <div class="right">
                <el-button type="primary" icon="plus" v-if="showAdd" @click="add">新增</el-button>
                <el-button type="danger" icon="delete" v-if="showDel" @click="del">删除</el-button>
                <el-upload
                        style="display:inline-block;"
                        v-if="showImport"
                        :action="importUrl"
                        :show-file-list="false"
                        :on-success="uploadSuccess"
                        :on-error="uploadError">
                    <el-button type="primary" ><i class="iconfont icon-in" ></i> 导入</el-button>
                </el-upload>
                <el-button type="primary" v-if="showExport" @click="exportFile"><i class="iconfont icon-out"></i> 导出</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name : 'pageHeader',
        data () {
            return {
            }
        },
        props:['title','showAdd','showDel','showImport','showExport','importUrl','exportUrl'],

        methods:{
            add:function(){
                this.$emit('add')
            },
            del:function(){
                this.$emit('del')
            },
            exportFile(){ //导出文件
                window.open(this.exportUrl)
            },
            uploadSuccess(response, file, fileList){
                console.log(response, file, fileList);
                if(response.code !==0){
                    for(var i=0;i<response.data.length;i++){
                        this.$notify.error({
                            title: response.data[i].key,
                            message:response.data[i].value,
                            duration: 0,
                            offset:i*90
                        });
                    }
                }else {
                    this.$message({
                        message: '导入成功',
                        type: 'success'
                    });
                    this.$emit('uploadSuccess')
                }
            },
            uploadError(err, file, fileList){
                console.log(err, file, fileList);

            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    $baseColor: #4e97d9;
    .page-header{
        height:64px;
        line-height:64px;
        border-bottom:1px solid #eee;
        position:relative;
        /*z-index:1000;*/
        h4{
            font-weight:bold;
            color:$baseColor;
            font-size: 16px;
        }
    }
</style>
