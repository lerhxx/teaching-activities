<template>
	<div id='footer'>
		<ul class='links'>
			<li v-for='link in links'>
				<a v-bind:href='link.url'>{{link.text}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				links: []
			}
		},
		created: function() {
			this.fetchData();
		},
		methods: {
			fetchData: function(){
				let xhr = new XMLHttpRequest();
				let self = this;
				xhr.open('GET', './json/footer-link.json');
				xhr.onload = () => {
					self.links = JSON.parse(xhr.responseText);
				};
				xhr.send();
			}
		} 
	}
</script>

<style lang='stylus'>
	@import '../css/funs'
	@import '../css/variable'

	#footer
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