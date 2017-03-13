<template>
    <div>
        <ul class='select-list'>
            <!--<li class='art-list-item' :class="{active: isPerArt}" @click='toggleArt(1)'>
                <a>个人</a>
            </li><li class='art-list-item' :class="{active: !isPerArt}" @click='toggleArt(2)'>
                <a>单位</a>
            </li>-->
            <li v-show='userRank > 0'>
                <div>
                    <label>范围</label>
                    <a :class="{'active': rangeTab == 0}" @click='changeRangeTab' data-type='0'>
                        个人
                    </a>
                    <a :class="{'active': rangeTab == 1}" @click='changeRangeTab' data-type='1'>
                        单位
                    </a>
               </div>
            </li>
            <li>
                <div>
                    <label>时间</label>
                    <!--<a :class="{'active': timeTab == 0}">
                        全部
                    </a>-->
                    <a @click='selectYears'>
                        {{selectYear}}
                    </a>
                    <a :class="{'active': timeTab == 2}" @click='changeTimeTab' data-type='2'>
                        整学年
                    </a>
                    <a :class="{'active': timeTab == 3}" @click='changeTimeTab' data-type='3'>
                        上半学期
                    </a>
                    <a :class="{'active': timeTab == 4}" @click='changeTimeTab' data-type='4'>
                        下半学期
                    </a>
                </div>
            </li>
            <!--<li>
                <div>
                    <label>类型</label>
                    <a :class="{'active': typeTab === 0}">
                        全部
                    </a>
                    <a :class="{'active': typeTab === 1}">
                        教学讨论会
                    </a>
                    <a :class="{'active': typeTab === 2}">
                        科研研讨会
                    </a>
                    <a :class="{'active': typeTab === 3}">
                        学术沙龙
                    </a>
                </div>
            </li>-->
        </ul>
        <canvas id='individual' width='300' height='300'></canvas>
        <div>
            <div>
                <label>发表: </label>{{opt.postNum}} 次
            </div>
            <div>
                <label>教学讨论会: </label>{{opt.teachNum && opt.teachNum.sum}} 次
            </div>
            <div>
                <label>科研研讨会: </label>{{opt.scientNum && opt.scientNum.sum}} 次
            </div>
            <div>
                <label>学术沙龙: </label>{{opt.salonNum && opt.salonNum.sum}} 次
            </div>
        </div>
        <div class='dialog-wrapper' @click='hideDialog' v-show='showDialog'>
            <ul class='dialog'>
                <li v-for='year in years' :class="{'active': year == selectYear}" @click='changeYear'>
                    {{year}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
	import {mapState} from 'vuex';
    import initChart from '../js/setChart';

	export default {
		data() {
            let year = new Date().getFullYear();
			return {
				isPerArt: false,
                opt: {},
                curYear: year,
                selectYear: year,
                rangeTab: 1,
                timeTab: 1,
                showDialog: false
			}
		},
		mounted() {
            // console.log(this.$route.params)
            this.init();
            console.log(this.$options)
		},
		methods: {
            init() {
                let id = 'individual';
                this.$store.dispatch('INIT_CHART', {id: this.$route.params.id})
                    .then(res => {
                        this.opt = res;
                        initChart(document.body, id, this.opt || {});
                    })
            },
			toggleArt(type) {
                switch(type) {
                    case 1:
                        this.isPerArt = true;
                        break;
                    case 2:
                        this.isPerArt = false;
                        break;
                    default:
                        this.isPerArt = true;
                }
            },
            selectYears() {
                this.showDialog = true;
            },
            hideDialog() {
                this.showDialog = false;
            },
            changeYear(e) {
                this.selectYear = e.target.innerHTML;
            },
            changeRangeTab(e) {
                this.rangeTab = e.target.getAttribute('data-type') || 0;
            },
            changeTimeTab(e) {
                this.timeTab = e.target.getAttribute('data-type') || 0;
            }
		},
		computed: {
            userRank() {
                return this.$store.state.userRank;
            },
            years() {
                let year = this.curYear,
                    arr = [],
                    i = year - 5;
                for(; year > i; --year) {
                    arr.push(year)
                }
                return arr;
            }
        }
	}
</script>

<style scoped lang='stylus'>
    @import '../css/funs';

    .select-list
        margin-bottom 50px
        li
            width 100%
            margin 5px 0
            label,
            a,
            select
                display inline-block
            label
                padding 6px 25px
                margin-right 10px
                border 1px solid #ccc
                color #fff
                background #000
                border-radius 6px
            a
                padding 6px 15px
                border 1px solid transparent
                border-radius 6px
                cursor pointer
                &.active,
                &:hover
                    color #44a5f2
            select
                width 80px
                height 35px
                border 1px solid transparent
                outline none
    .dialog-wrapper
        absolute(left 0 top 0 right 0 bottom 0)
        background-color rgba(0, 0, 0, .6)
        z-index 99
    .dialog
        absolute(left 0 top 0 right 0 bottom 0)
        width 300px
        height 300px
        margin auto
        text-align center
        line-height 60px
        border-radius 6px
        background-color #fff
        li
            width 100%
            cursor pointer
            &.active,
            &:hover
                color #fff
                background-color rgba(97, 171, 241, .6)
</style>