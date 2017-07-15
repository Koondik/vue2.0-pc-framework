<template>
    <div class="myDialog">
        <el-dialog :visible.sync="dialogFormVisible" custom-class="myDialogClass" top="25%" :size="size" :show-close="false">
            <div slot="title" class="el-dialog__title">
                {{title}}
                <button type="button" class="el-dialog__headerbtn" @click="Close()"><i class="el-dialog__close el-icon el-icon-close"></i></button>
            </div>
            <slot></slot>
            <div slot="footer" class="dialog-footer">
                <el-button @click="Close">取 消</el-button>
                <el-button type="primary" @click="OK">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name : 'myDialog',
        data () {
            return {
            }
        },
        props: {
            title:{
                required:true
            },
            Visible:{
                required:true
            },
            size:{
                default:'tiny'
            }
        },
        methods:{
            Close(){
                this.$emit('closeDialog')
            },
            OK(){
                this.$emit('OK')
            }
        },
        computed: {
            dialogFormVisible: function () {
                return this.Visible;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .el-input{
        width:280px;
    }
</style>
