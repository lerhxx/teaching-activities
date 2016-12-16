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

<styles scoped lang='sass'>
#nav {
	background-color: pink;
}
#logo {
	background-color: pink;
}
.navbar {
	background-color: pink;
}
</style>