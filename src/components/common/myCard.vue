<template>
    <div class="myCard">
        <!--v-for="(item, index) in 10" :label="index"-->
        <el-checkbox class="card" :label="label">
            <div :class="{'badge-pass':badge==1 && !hasBtn,'badge-unpass':badge==-1 && !hasBtn}">
                <slot name="Msg"></slot>
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

            }
        },
        methods:{
            approve(){
                console.log('同意');
                this.$emit('approve')
            },
            unapprove(){
                console.log('不同意');
                this.$emit('unapprove')
            },
        },
        props:['hasBtn','badge','label']

    }
</script>
<style lang="scss" scoped>
    .hasBtn{
        position:absolute;
        right:30px;
        top:30px;
    }
</style>
