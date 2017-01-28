<template>
	<div class='sign-container'>
		<form class='sign-form'>
			<caption><h1>登录</h1></caption>
			<div class='group-con'>
				<input type='text' placeholder='请输入账号'/>
			</div>
			<div class='group-con'>
				<input type='password' placeholder='请输入密码'/>
			</div>
			<div class='group-con group-btn'>
				<button class='btn btn-certain' v-on:click='login'>确定</button>
				<router-link to='/' class='btn btn-cancle'>
					取消
				</router-link>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		methods: {
			login() {
				console.log('ok');
			}
		}
	}
</script>

<style scope lang='stylus'>
	@import '../css/funs'
	@import '../css/variable'
	.sign-container
		width 100vw
		height 100vh
		padding-top nav-height
		background url(../imgs/bg.png);
		overflow hidden
	.sign-form
		width 300px
		margin-top 60px
		border 1px solid rgba(161, 161, 161, .5)
		border-radius(10px)
		background rgba(255, 255, 255, .5)
		input[type='text'],
		input[type='password']
			width 95%
			padding 5px
			margin auto
			border 1px solid rgba(51, 51, 51, .5)
			outline none
			border-radius(8px)
			font-size 16px
			line-height 20px
			text-align center
			background #fff
			&:focus
				border-color rgba(71, 182, 224, 0.5)
	caption
		display block
		margin-top 10px
		margin-bottom 30px
		color #555
		font-size 20px
		
	@media screen and (-webkt-min-device-pixel-ratio: 1.5) 
		.group-conafter 
			width 150%
			height 150%
			transform(scale3d(.3, .3, .3))
</style>