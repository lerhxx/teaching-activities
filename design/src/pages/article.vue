<template>
	<div class='article'>
		<div v-if='article.content'>
			<!--<div class='group-con'>封面</div>-->
			<img :src='article.url' />
			<h1>{{article.title}}</h1>
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
				<span>{{article.abs}}</span>
			</div>
			<div class='group-con'>
				<label>举办内容：</label>
				<div>{{article.content}}</div>
			</div>
			<div class='group-con'>
				<label>附加说明：</label>
				<p>{{article.explain}}</p>
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

	export default {
		created() {
			let self = this;
			this.$store.dispatch('GET_ARTICLE', this.$route.params)
				.catch(err => {
					alert(err);
					self.$router.push('/');
				});
		},
		computed: mapState(['article'])
	}
</script>

<style lang='stylus'>
	@import '../css/variable';
	
	.article 
		padding-top nav-height
</style>