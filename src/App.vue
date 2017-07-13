<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
html,body,ul,h1,h2,h3,h4,h5{
    margin:0;
    padding:0;
}
body {
    font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
}
table{border-collapse:collapse;border-spacing:0;}
li{list-style:none;}
fieldset,img{border:0;}
article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}
q:before,q:after{content:'';}
a:focus,input,textarea{outline-style:none;}
input[type="text"],input[type="password"],textarea{outline-style:none;-webkit-appearance:none;}
textarea{resize:none}
address,caption,cite,code,dfn,em,i,th,var{font-style:normal;font-weight:normal;}
legend{color:#000;}
abbr,acronym{border:0;font-variant:normal;}
a{color:#0a8cd2;text-decoration:none;}
a:hover{text-decoration:none;}
.clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden;}
.clearfix{display:inline-block;}
.clearfix{display:block;}
.clear{clear:both;height:0;font:0/0 Arial;visibility:hidden;}
.none{display:none}
.left{float:left}
.right{float:right}
.el-button--primary {
    color: #fff!important;
    background-color: #4e97d9!important;
    border-color: #4e97d9!important;
}
.el-button--success {
    color: #fff!important;
    background-color: #3aa99f!important;
    border-color: #3aa99f!important;
}
.el-button--danger {
    color: #fff!important;
    background-color: #f68a8a!important;
    border-color: #f68a8a!important;
}
.el-button--danger-outline {
    color: #f68a8a!important;
    background-color: #fff!important;
    border-color: #f68a8a!important;
}
.table-wrap{
    .el-table {
        border: none;
    }
    .el-table::after{
        width:0;
    }
    .el-table th.is-leaf{
        border-bottom:none;
    }
    thead tr{
        border-bottom:1px solid #b3cceb;
    }
    thead tr th{
        background-color:#f7f9fb;
        height:55px;
        .cell{
            background-color:#f7f9fb;
            font-size:14px;
            font-weight:bold;
            color:#4e97d9;
        }
    }
    tbody tr td{
        height:59px;
    }
}
.pagination-wrap{
    padding:21px 0;
    .left{
        font-size:12px;
        line-height:3;
    }
}
.myDialogClass{
    .el-dialog__header{
        border-bottom:1px solid #eee;
        padding-bottom:20px;
        .el-dialog__title{
            color:#4e97d9;
        }
    }
    .el-dialog__footer{
        text-align:center;
        .el-button{
            padding: 10px 74px;
        }
    }
}
/*tabs导航样式*/
.tabs-wrap{
    width: 100%;
    padding-top: 15px;
    box-sizing: border-box;
    .el-tabs__header{
        position: absolute;
        z-index:1000;
        top: 0;
        left:0;
        border-bottom:none;
        .el-tabs__nav-wrap{
            line-height:64px;
            margin-left:125px;
            .el-tabs__item.is-active {
                color: #666;
                font-weight:bold;
            }
        }
    }
}
/*选项卡样式*/
.el-checkbox.card{
    position:relative;
    height:208px;
    margin-bottom:13px;
    padding: 27px;
    box-sizing: border-box;
    display:flex;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0,0,0,.12),inset -2px 0 2px rgba(0, 0, 0, 0.12),inset 2px 0 2px rgba(0, 0, 0, 0.12);
    .el-checkbox__input{
        width:43px;
    }
    .el-checkbox__label{
        flex:1;
        >div{
             line-height:30px;
            h4{
                font-size:16px;
                font-weight:bold;
                span{
                    color:#666;
                }
            }
            b{
                i{color:#999}
            }
            p{
                margin:0;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                white-space: normal;
                line-height:20px;
                text-indent:2em;
            }
         }
    }
}
.el-checkbox+.el-checkbox{
    margin-left:0;
}
/*自定义标签*/
.badge-pass:after{
    content:'已通过';
    display: block;
    position: absolute;
    right: -31px;
    top: -23px;
    width: 132px;
    line-height: 99px;
    height: 67px;
    color: #fff;
    text-indent: 60px;
    background-color: #369d93;
    -webkit-transform: rotate(45deg);
    transform: rotate(35deg);
}
.badge-unpass:after{
    content:'不通过';
    display: block;
    position: absolute;
    right: -31px;
    top: -23px;
    width: 132px;
    line-height: 99px;
    height: 67px;
    color: #fff;
    text-indent: 60px;
    background-color: #f68a8a;
    -webkit-transform: rotate(45deg);
    transform: rotate(35deg);
}
</style>
