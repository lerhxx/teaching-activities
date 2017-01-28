<template>
	<div id='nav'>
		<div id='logo'></div>
		<ul class='navbar'>
			<li  v-for='item in items'>
				<router-link :to='item.url'>
					{{item.text}}
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
					text: '登录',
					url: 'signin'
				}, {
					text: '发布',
					url: 'edit'
				}, {
					text: '搜索',
					url: 'search'
				}]
			}
		}
	}
</script>

<style lang='stylus'>
	@import '../css/variable'

	#nav 
		position fixed
		top 0
		left 0
		width 100%
		height: nav-height;
		overflow hidden
		//background-color rgba(48, 48, 72, .8)
		background-color rgba(0, 0, 0, .7)
		.navbar 
			float right
			li 
				display inline-block
			a 
				display block
				height nav-height
				margin 0 25px
				color #fff
				line-height: nav-height
</style>