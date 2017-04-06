<template>
    <div class='padding-top personal'>
        <div>
            <h2 class='user'>{{userId}}</h2>
        </div>
        <ul class='per-list'>
            <li class='per-list-item' :class="{active: isActive}" @click='toggleAct(1)'>
                <router-link to='charts'>
                    图表
                </router-link>
            </li><li class='per-list-item' :class="{active: !isActive}" @click='toggleAct(2)'>
                <router-link to='form'>
                    表格
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

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
        },
        computed: mapState(['userId'])
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

</style>