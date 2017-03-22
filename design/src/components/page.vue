<template>
	<div class='page-wrapper'>
		<button type='button' @click='prevPage' :disabled='curPage <= 1'>上一页</button>
		<button type='button' @click='nextPage' :disabled= 'curPage >= totalPage'>下一页</button>
		<input type='text' v-model='skipPage'/>
		<button type='button' @click='skip'>跳转</button>
		<transition name='fade'>
			<div class='tip' v-show='tipShow'>{{tip}}</div>
		</transition>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tipContent: [
					'请输入有效页数',
					'已是最后一页，没有更多了哦~',
					'已是第一页了哦~'
				],
				tip: '',
				tipShow: false,
				curPage: 1,
				skipPage: 1
			}
		},
		props: {
			totalPage: {
				type: Number,
				default: 0
			}
		},
		created: function() {
		},
		methods: {
			prevPage(cb) {
				this.curPage = this.curPage === 1 ? this.curPage : --this.curPage;
				this.skipPage = this.curPage;
				this.$emit('prevPage', this.curPage);
				this.tipShow = false;
			},
			nextPage() {
				this.curPage = this.curPage >= this.totalPage ? this.curPage : ++this.curPage;
				this.skipPage = this.curPage;
				this.$emit('nextPage', this.curPage);
				this.tipShow = false;
			},
			skip() {
				this.tipShow = true;
				if(/^[0-9]+$/.test(this.skipPage) && this.skipPage <= this.totalPage && this.skipPage >= 1) {
					if(this.skipPage == 1 && this.curPage == 1) {
						this.tip = this.tipContent[2];
					}else if(this.skipPage == this.totalPage && this.curPage == this.totalPage) {
						this.tip = this.tipContent[1];
					}else {
						this.curPage = this.skipPage;
						this.$emit('skip', this.curPage);
						this.tipShow = false;
					}
				}else {
					if(this.skipPage > this.totalPage && this.curPage != this.totalPage) {
						this.skipPage = this.curPage = this.totalPage;
						this.$emit('skip', this.curPage);
						this.tipShow = false;
					}
					this.tip = this.tipContent[0];
				}
			}
		}
	}
</script>

<style scoped lang='stylus'>
	@import '../css/funs';

	.page-wrapper
		relative()
		margin 30px 0
		text-align center
		& > button
			display inline-block
			relative()
			width 80px
			height 35px
			margin 0 10px
			border none
			outline none
			color #fff
			line-height 35px
			background #000
			border-radius 6px
			cursor pointer
			&[disabled]
				background #ccc
		input
			width 50px
			height 35px
			margin 0 10px
			outline none
			text-align center
			font-size 20px
			box-sizing border-box
			border-radius 6px
	.tip
		absolute(top -150% left 50%)
		padding 10px
		color #fff
		background rgba(0, 0, 0, .6)
		border-radius 8px
	.fade-enter
		opacity: 0
	.fade-enter-active
		transition: opacity .5s linear
</style>