<template>
    <div class='padding-top personal'>
        <div>
            <h2 class='user'>{{this.userInfo.userId}}</h2>
        </div>
        <ul class='per-list'>
            <li class='per-list-item' :class="{active: isActive}" @click='toggleAct(1)'>
                <router-link to='article'>
                    文章
                </router-link>
            </li><li class='per-list-item' :class="{active: !isActive}" @click='toggleAct(2)'>
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
            toggleAct(type) {
                switch(type) {
                    case 1:
                        this.isActive = true;
                        break;
                    case 2:
                        this.isActive = false;
                        break;
                    default:
                        this.isActive = true;
                }
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
    .per-list
        relative()
        margin-bottom 10px
        text-align center
        &:before
            absolute(top 0 bottom 0 left 0 right 0)
            width 50%
            height 0px
            margin auto
            border 1px solid #000
            content ''
            z-index -1
    .per-list-item
        a
            display block
            padding 10px 35px
            border 1px solid #000
            background #fff
    &.active
        a
            color #fff
            background #000
    

</style>