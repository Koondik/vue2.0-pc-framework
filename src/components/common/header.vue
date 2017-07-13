<template>
    <div class="myHeader">
        <div class="left logo">
            <a href>
                <img src="../../assets/logo.png" onerror="javascript:this.src='src/imgs/logo.png';"/>
                <span>教室预约</span>
            </a>
        </div>
        <div class="right logout">
            <div class="left">
                <el-dropdown>
                    <span class="el-dropdown-link" >
                        <i class="iconfont icon-user" style="font-size:18px;margin-right:5px"></i>
                        admin
                        <i class="el-icon-caret-bottom el-icon--right" style="font-size:14px;"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>退出</el-dropdown-item>
                        <el-dropdown-item>修改密码</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <span style="margin: 0 10px;font-size:18px;">|</span>
            <a style="cursor:pointer" @click="GoCloudAppMain()">我的主页 <i class="iconfont icon-exit"></i></a>

        </div>
    </div>
</template>

<script>
    import commonConfig from '../../config/config';
    export default {
        name : 'myHeader',
        data () {
            return {
            }
        },
        methods:{
            GoCloudAppMain:function(){
//                this.$router.replace(commonConfig.cloudHomepage);
                window.location.href= commonConfig.cloudHomepage;
            }
        }
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
