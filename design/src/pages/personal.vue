<template>
    <div class='padding-top personal'>
        <div>
            <h2 class='user'>{{this.userId}}</h2>
        </div>
        <ul class=''>
            <li class='count-list-item' :class="{active: isActive}" @click='articleActive'>
                <router-link to='article'>
                    文章
                </router-link>
            </li>
            <li class='count-list-item' :class="{active: !isActive}" @click='countActive'>
                <router-link to='count'>
                    统计
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isActive: true
            }
        },
        methods: {
            articleActive() {
                this.isActive = true;
            },
            countActive() {
                this.isActive = false;
            }
        }
    }
</script>

<style scoped lang='stylus'>
    @import '../css/common';
    @import '../css/funs';

    .personal
        width 90%
        min-width 800px
        margin 0 auto
    .user
        margin 20px 0
        text-align center
        font-size 25px
    .count-list-item
        display inline-block
        padding 8px 15px
        border 1px solid #ddd
        border-radius(8px)
        &.active
            background #000
            a
                color #fff
    

</style>