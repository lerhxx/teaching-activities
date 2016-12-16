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
				links: [{
					url: 'www.baidu.com',
					text: '百度'
				}, {
					url: 'www.baidu.com',
					text: '百度'
				}, {
					url: 'www.baidu.com',
					text: '百度'
				}, {
					url: 'www.baidu.com',
					text: '百度'
				}, {
					url: 'www.baidu.com',
					text: '百度'
				}, {
					url: 'www.baidu.com',
					text: '百度'
				}]
			}
		}
	}
</script>

<style lang='sass'>
	@import '../css/mixins.scss';

	$li-width: 33%;
	#footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 15px 50px 10px;
		overflow: hidden;
		background-color: #303048;
		@include box-sizing(border-box);
		.links {
			li {
				display: inline-block;
				width: $li-width;
				margin: 5px 0;
			}
			a {
				display: block;
				color: #fff;
				text-align: center;
			}
		}
	}
</style>