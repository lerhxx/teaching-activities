<template>
	<div id='nav'>
		<div id='logo'></div>
		<ul class='navbar'>
			<li v-for='item in items'>
				<a href=''>{{item}}</a>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				items: ['登录', '发布', '搜索']
			}
		}
	}
</script>

<style lang='sass'>
	$height: 45px;
	#nav {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: $height;
		overflow: hidden;
		background-color: #303048;
		.navbar {
			float: right;
			li {
				display: inline-block;
			}
			a {
				display: block;
				height: $height;
				margin: 0 25px;
				color: #fff;
				line-height: $height;
			}
		}
	}
</style>