<template>
	<div class='article padding-top'>
		<div v-if='article.content'>
			<!--<div class='group-con'>封面</div>-->
			<h1>{{article.title}}</h1>
			<img :src='article.url' alt='cover' class='cover'/>
			<div class='group-con'>
				<label>举办时间：</label>
				<span>{{article.time}}</span>
			</div>
			<div class='group-con'>
				<label>举办地点：</label>
				<span>{{article.address}}</span>
			</div>
			<div class='group-con'>
				<label>举办单位：</label>
				<span>{{article.unit}}</span>
			</div>
			<div class='group-con'>
				<label>举办目的：</label>
				<p class='content'>{{article.abs}}</p>
			</div>
			<div class='group-con'>
				<label>举办内容：</label>
				<div class='content'>{{article.content}}</div>
			</div>
			<div class='group-con'>
				<label>附加说明：</label>
				<p class='content'>{{article.explain}}</p>
			</div>
			<div class='group-con'>
				<a>附件</a>
				{{article.enclosure}}
			</div>
		</div>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	// import toMarkDown from 'to-markdown';

	export default {
		data() {
			return {
			}
		},
		created() {
			let self = this;
			console.log(this.$route.params)
			this.$store.dispatch('GET_ARTICLE', this.$route.params)
				.catch(err => {
					alert(err);
					// console.log(err)
					self.$router.push({name: 'index1'});
				});
		},
		computed: {
			article() {
				return this.$store.state.article
			},
		}
	}
</script>

<style scoped lang='stylus'>
	@import '../css/common';

	.article
		width 50% 
		min-width 500px
		margin auto
	h1
		text-align center
		margin 30px 0 25px
	.cover
		width 100%
	.content
		margin-left 80px
</style>