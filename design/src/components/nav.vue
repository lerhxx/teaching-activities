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
			<li v-show='userRank > 0'>
				<router-link :to="{name: 'personal', params: {id: userId}}">
					个人中心
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import {unset, get} from '../assets/cookieUtil';

	export default {
		data() {
			return {
			}
		},
		created() {
			let user;
			
			user = get('user');
			if(user && !this.userId) {
				this.$store.dispatch('GET_USER_INFO', {id: user});
			}else {
				// this.$router.push({name: 'signin'})
			}
		},
		mounted() {
			console.log('mount')
		},
		computed: mapState(['userId', 'userRank']),
		methods: {
			signout() {
				unset('user', '/', window.location.hostname);
				this.$store.commit('SET_USER', {id: ''});
				this.$router.push('/');
				alert('登出成功！');
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