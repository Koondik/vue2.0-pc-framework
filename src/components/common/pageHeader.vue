<template>
    <div class="pageHeader">
        <div class="page-header clearfix">
            <h4 class="left">{{title}}</h4>
            <div class="right">
                <el-button type="primary" icon="plus" v-if="showAdd" @click="add">新增</el-button>
                <el-button type="danger" icon="delete" v-if="showDel" @click="del">删除</el-button>
                <el-button type="primary" v-if="showImport"><i class="iconfont icon-in" ></i> 导入</el-button>
                <el-button type="primary" v-if="showExport"><i class="iconfont icon-out"></i> 导出</el-button>
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
        props:['title','showAdd','showDel','showImport','showExport'],
        methods:{
            add:function(){
                this.$emit('add')
            },
            del:function(){
                this.$emit('del')
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
