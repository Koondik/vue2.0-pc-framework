<template>
    <div class="myCard">
        <!--v-for="(item, index) in 10" :label="index"-->
        <el-checkbox class="card" >
            <div :class="{'badge-pass':a && !hasBtn,'badge-unpass':!a && !hasBtn}">
                <h4>教室101　<span>【2017年6月20日　下午第5.6节】</span></h4>
                <b>何大大　<i>2016年06月01日 13时48分26秒</i></b>
                <div>
                    <span>请假原因：</span>
                    <p>假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假
                        字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充假字填充</p>
                </div>

            </div>
            <div class="hasBtn" v-if="hasBtn">
                <el-button type="success" @click="approve">同　意</el-button>
                <el-button type="danger-outline" @click="unapprove">不同意</el-button>
            </div>
        </el-checkbox>
    </div>
</template>

<script>
    export default {
        name : 'myCard',
        data () {
            return {
                a:true
            }
        },
        methods:{
            approve(){
                console.log('同意');
            },
            unapprove(){
                console.log('不同意');
                this.$emit('unapprove')
            },
        },
        props:['hasBtn']

    }
</script>
<style lang="scss" scoped>
    .hasBtn{
        position:absolute;
        right:30px;
        top:30px;
    }
</style>
