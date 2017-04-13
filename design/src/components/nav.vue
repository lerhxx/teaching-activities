<template>
	<div id='nav'>
		<div id='logo'></div>
		<ul class='navbar'>
			<li>
				<router-link :to="{name: 'index'}">
					首页
				</router-link>
			</li>
			<li  v-if='userId'>
				<a @click='signout'>
					登出
				</a>
			</li>
			<li  v-else>
				<router-link :to="{name: 'signin'}">
					登录
				</router-link>
			</li>
			<li v-show='userRank > 0'>
				<router-link :to="{name: 'edit', params: {id: userId}}">
					发布
				</router-link>
			</li>
			<li v-show='userId'>
				<router-link :to="{name: 'modify', params: {id: userId}}">
					个人中心
				</router-link>
			</li>
			<li v-show='userId'>
				<router-link :to="{name: 'chart', params: {id: userId}}">
					统计
				</router-link>
			</li>
			<li v-show='userRank > 1'>
				<router-link :to="{name: 'user'}">
					用户管理
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import {unset, get} from '../assets/cookieUtil';

	export default {
		data() {
			return {
			}
		},
		created() {
			if(get('username') && !this.userId) {
				this.$store.dispatch('GET_USER_INFO', {name: this.username})
					.then(res => {
						console.log(this.$store.state.userId)
					});
			}
		},
		computed: {
			username() {
				return get('username');
			},
			userId() {
				return this.$store.state.userId;
			},
			userRank() {
				return this.$store.state.userRank;
			}
		},
		methods: {
			signout() {
				this.username = '';
				unset('username', '/', window.location.hostname);
				this.$store.dispatch('SIGNOUT');
			},
		}
	}
</script>

<style lang='stylus'>
	@import '../css/variable';

	#nav 
		position fixed
		top 0
		left 0
		width 100%
		height: nav-height;
		overflow hidden
		//background-color rgba(48, 48, 72, .8)
		background-color rgba(0, 0, 0, .7)
		z-index 99
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
				cursor pointer
</style>