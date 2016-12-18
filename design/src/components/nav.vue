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
					url: 'a'
				}, {
					text: '发布',
					url: 'b'
				}, {
					text: '搜索',
					url: 'c'
				}]
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