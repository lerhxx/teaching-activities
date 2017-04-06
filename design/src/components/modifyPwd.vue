<template>
    <div class='modify-wrapper'>
        <form class='modify-form'>
            <div class='group-con '>
                <label>旧密码：</label>
                <input type='password' />
            </div>
            <div class='group-con '>
                <label>新密码：</label>
                <input type='password' />
            </div>
            <div class='group-con '>
                <button type='button' class='btn btn-l btn-edit' @click='toggleTips'>修改</button>
            </div>
        </form>
        <transition name='tip' v-on:after-enter='afterEnter'>
            <div class='tip' v-show='showTip'>
                {{tips}}
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tips: '修改成功!',
                showTip: false
            }
        },
        methods: {
            toggleTips() {
                this.showTip = true;
            },
            afterEnter() {
                this.showTip = false;
            }
        }
    }
</script>

<style scoped lang='stylus'>
    @import '../css/form';
    @import '../css/funs';

    .modify-wrapper
        relative()
    .modify-form
        width 300px
        margin auto
        text-align center
        input
            width 200px
            padding 5px 10px
            border 1px solid rgba(51, 51, 51, .5)
            font-size 16px
            box-shadow 1px 1px 5px rgba(0, 0, 0, .3)
            border-radius 5px
        button
            margin-top 20px
    .tip
        absolute(top 30% left 50%)
        padding 10px 80px
        color #fff
        transform translate(-50%, -50%)
        background-color rgba(0, 0, 0, .8)
        border-radius(8px)
    .tip-enter,
    .tip-leave-active
        opacity 0
    .tip-enter-active,
    .tip-leave-active
        transition opacity 1s
</style>