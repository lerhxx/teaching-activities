<template>
	<form class='sign-form'>
		<h1>登陆</h1>
		<div class='group-con'>
			<label>账号：</label><input type='text' value='请输入账号'/>
		</div>
		<div class='group-con'>
			<label>密码：</label><input type='password' value='请输入密码'/>
		</div>
	</form>
</template>

<script>
	export default {
		components: {
		}
	}
</script>

<style scope lang='stylus'>
	@import '../css/funs'
	@import '../css/form'

	.group-con {
		position: relative;
	}
	.group-con:after {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		content: '';
		border: 1px solid #ddd;
	}
	label {
		display: inline-block;
		width: 30px;
		height: 30px;
		font-size: 0;
		vertical-align: middle;
		background-color: #eee;
	}
	@media screen and (-webkt-min-device-pixel-ratio: 1.5) {
		.group-con:after {
			width: 150%;
			height: 150%;
			transform(scale3d(.3, .3, .3));
		}
	}
</style>