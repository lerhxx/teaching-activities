<template>
    <div>
        <ul class='art-list' v-show='userRank > 0'>
            <li class='art-list-item' :class="{active: isPerArt}" @click='toggleArt(1)'>
                <a>个人</a>
            </li><li class='art-list-item' :class="{active: !isPerArt}" @click='toggleArt(2)'>
                <a>单位</a>
            </li>
        </ul>
        <canvas id='individual' width='300' height='300'></canvas>
        <div>
            <div>
                <label>发表: </label>{{opt.postNum}} 次
            </div>
            <div>
                <label>教学讨论会: </label>{{opt.teachNum}} 次
            </div>
            <div>
                <label>科研研讨会: </label>{{opt.scientNum}} 次
            </div>
            <div>
                <label>学术沙龙: </label>{{opt.salonNum}} 次
            </div>
        </div>
    </div>
</template>

<script>
	import {mapState} from 'vuex';
    import initChart from '../js/setChart';

	export default {
		data() {
			return {
				isPerArt: true,
                opt: {}
			}
		},
		mounted() {
            // console.log(this.$route.params)
            this.init();
		},
		methods: {
            init() {
                this.$store.dispatch('INIT_CHART', {id: this.$route.params.id})
                    .then(res => {
                        this.opt = res;
                    })
                initChart(document.body, this.opt || {});
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
		},
		computed: mapState(['userRank'])
	}
</script>

<style scoped lang='stylus'>
.art-list-item
    a
        display block
        padding 8px 20px
        border 1px solid transparent
        border-bottom-color #ccc
        cursor pointer
    &.active
        a
            border-color #ccc
            border-bottom-color transparent
</style>