<template>
	<div id='footer'>
		<ul class='links'>
			<li v-for='link in footerLinks'>
				<a v-bind:href='link.url'>{{link.text}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		data() {
			return {
				links: []
			}
		},
		created() {
			this.$store.dispatch('GET_FOOTER_LINKS')
				.catch(err => alert(err));
		},
		computed: mapState(['footerLinks'])
	}
</script>

<style lang='stylus'>
	@import '../css/funs';
	@import '../css/variable';

	#footer
		absolute(left 0 bottom 0)
		width 100%
		padding 10px 50px
		font-size 12px
		overflow hidden
		background-color #303048
		.links 
			li 
				display inline-block
				width li-width
			a 
				display block
				color #fff
				text-align center
</style>