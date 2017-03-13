<template>
	<div class='article padding-top'>
		<div v-if='article.content'>
			<!--<div class='group-con'>封面</div>-->
			<h1>{{article.title}}</h1>
			<div class='group-con' v-show='self'>
				<span class='time'>{{article.time | timeFormat}}</span>
				<modify :item='article'></modify>
			</div>
			<div class='group-con'>
				<label>发布人:</label>
				<span>{{article.author}}</span>
			</div>
			<img :src='article.url' alt='cover' class='cover'/>
			<div class='group-con'>
				<label>举办时间：</label>
				<span>{{article.startTime}}</span>
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
				<div class='content' v-html='article.content'></div>
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
	import modify from '../components/modify.vue';
	// import toMarkDown from 'to-markdown';

	export default {
		data() {
			return {
			}
		},
		created() {
			let self = this;
			this.$store.dispatch('GET_ARTICLE', this.$route.params)
				.catch(err => {
					alert(err);
					// console.log(err)
					self.$router.push({name: 'index'});
				});
		},
		computed: {
			article() {
				return this.$store.state.article
			},
			self() {
				return this.article.author === this.$store.state.userId
			}

		},
		filters: {
			timeFormat(value) {
                let date = new Date(value),
					month = date.getMonth(),
					day = date.getDate(),
					hour = date.getHours(),
					min = date.getMinutes();
                return `${date.getFullYear()}年${month > 9 ? month : '0' + month}月${day > 9 ? day : '0' + day}日 
                        ${hour > 9 ? hour : '0' + hour}:
                        ${min > 9 ? min : '0' + min}`;
            }
		},
        components: {
            modify
        }
	}
</script>

<style scoped lang='stylus'>
	@import '../css/common';
	@import '../css/form';

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
		margin-left 90px
</style>