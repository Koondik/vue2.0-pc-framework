<template>
    <div class="basis">
        <my-header></my-header>
        <div class="clearfix main-wrap">
            <div class="sidebar" >
                <ul>
                    <router-link tag="li" to="/room/place" active-class="active">
                        <a><i class="iconfont icon-stu"></i> 场地设置</a>
                    </router-link>
                    <router-link tag="li" to="/room/period" active-class="active">
                        <a><i class="iconfont icon-stu"></i> 节次设置</a>
                    </router-link>
                    <router-link tag="li" to="/room/booking" active-class="active">
                        <a><i class="iconfont icon-stu"></i> 场地预约</a>
                    </router-link>
                    <router-link tag="li" to="/room/approve" active-class="active">
                        <a><i class="iconfont icon-stu"></i> 预约审批</a>
                    </router-link>
                    <router-link tag="li" to="/room/statistic" active-class="active">
                        <a><i class="iconfont icon-stu"></i> 预约统计</a>
                    </router-link>
                </ul>
            </div>
            <div class="main-content clearfix">
                <transition  name="fade">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    import myHeader from './header.vue'
    export default {
        name : 'basis',
        data () {
            return {
                //      msg: 'Welcome to Your Vue.js App'
            }
        },
        components:{ myHeader }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.basis{
    height:100%;
    .main-wrap{
        width:100%;
        min-height:100%;
        top: 70px;
        position: absolute;
        overflow:hidden;
        background-color:#f4f5f6;
        margin-bottom:-70px;
        .sidebar{
            position:absolute;
            width:200px;
            height:100%;
            background-color:#fff;
            z-index: 100;
            ul {
                li{
                    height:50px;
                    line-height:50px;
                    margin-top:12px;
                    position:relative;
                    right:-3px;
                    a{
                        display:block;
                        box-sizing: border-box;
                        padding-left:40px;
                        width:100%;
                        height:100%;
                        border-right:3px solid transparent;
                        color:#bbb;
                        cursor:pointer;
                        font-size:14px;
                        i{
                            font-size:26px;
                            vertical-align:-4px;
                            margin-right:25px;
                        }
                    }
                }
                .active {
                    a {
                        color: #62a8ea;
                        background-color: #eff6fd;
                        border-right: 4px solid #62a8ea;
                    }
                }
            }
        }
        .main-content {
            /*z-index:1000;*/
            overflow: auto;
            min-height: 100%;
            height: 100%;
            position: absolute;
            right: 0;
            left: 200px;
            > div{
                  position:absolute;
                  top:0;
                  width:100%;
                  min-height:100%;
                  height:100%;
             }
        }
    }


}
</style>
