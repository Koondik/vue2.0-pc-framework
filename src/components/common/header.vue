<template>
    <div class="myHeader">
        <div class="left logo">
            <a href>
                <img :src="GLOBAL_Config.imgApi+'logo/logo.png'" onerror="javascript:this.src='./logo.png';"/>
                <span>教室预约</span>
            </a>
        </div>
        <div class="right logout">
            <div class="left">
                <el-dropdown trigger="click"  @command="handleCommand">
                    <span class="el-dropdown-link" >
                        <i class="iconfont icon-user" style="font-size:18px;margin-right:5px"></i>
                        {{username}}
                        <i class="el-icon-caret-bottom el-icon--right" style="font-size:14px;"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item command="a">退出</el-dropdown-item>
                        <el-dropdown-item command="b">修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <span style="margin: 0 10px;font-size:18px;">|</span>
            <a style="cursor:pointer" @click="GoCloudAppMain()">我的主页 <i class="iconfont icon-exit"></i></a>

        </div>
        <my-dialog :Visible="dialog.Visible" :title="dialog.title" :size="dialog.size" v-on:closeDialog="closeDialog" v-on:OK="exit">
           <p>确定要退出么？</p>
        </my-dialog>
    </div>
</template>

<script>
    import $localStorage from '../../config/localStorage';
    import myDialog from '../common/myDialog.vue';
    export default {
        name : 'myHeader',
        data () {
            return {
                username:null,
                dialog:{
                    Visible: false,
                    title:'提示',
                    size:'tiny'
                },
            }
        },
        mounted(){
           this.username = this.GLOBAL_User.username;
//            console.log(this.username);
        },
        methods:{
            GoCloudAppMain:function(){
                window.location.href= this.GLOBAL_Config.cloudHomepage+'CloudUser/AppMain';
            },
            handleCommand(command){
                switch(command){
                    case 'a': this.openDialog();break
                }
            },
            closeDialog(){
                this.dialog.Visible = false
            },
            openDialog(){
                this.dialog.Visible = true
            },
            exit(){
                $localStorage.remove('cloud');
                this.dialog.Visible = false;
                window.location.href = this.GLOBAL_Config.tokenApi+'logout';
            }
        },
        components:{ myDialog }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    $baseColor: #4e97d9;
    a{color:#fff}
    .myHeader{
        width:100%;
        height:70px;
        background-color:$baseColor;
        color:#fff;
        .logo{
            padding-top: 15px;
            padding-left: 30px;
            span{
                color:#fff;
                font-size:20px;
                text-indent:19px;
                border-left:2px solid #fff;
                display:inline-block;
                margin-left:16px;
            }
        }
        .logout{
            line-height: 70px;
            padding-right: 30px;
            .el-dropdown{
                font-size:16px;
                color:#fff;
                ul{
                    background-color:$baseColor;
                }
            }
        }
    }
    .el-dropdown-menu{
        background-color:$baseColor;
        color: #fff;
        top:60px;
    }
    .el-dropdown-menu__item:hover{
        color: #fff;
        background-color: #337ab7;
    }
</style>
