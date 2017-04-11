<template>
	<div class='article padding-top'>
		<div v-if='article.content'>
			<!--<div class='group-con'>封面</div>-->
			<h1>{{article.title}}</h1>
			<div class='group-con sub-title'>
				<span class='time'>{{article.time | timeFormat}}</span>
				<label>发布人:</label>
				<span>{{article.author}}</span>
				<modify class='modify' :item='article' :cb='redirection' v-show='self'></modify>
			</div>
			<!--<div class='group-con'>
			</div>-->
			<!--<img :src='article.url' alt='cover' class='cover'/>-->
			<div class='group-con'>
				<label>开始时间：</label>
				<span>{{article.startTime | timeFormat}}</span>
			</div>
			<div class='group-con'>
				<label>结束时间：</label>
				<span>{{article.endTime | timeFormat}}</span>
			</div>
			<div class='group-con'>
				<label>举办地点：</label>
				<span>{{article.address}}</span>
			</div>
			<div class='group-con'>
				<label>举办单位：</label>
				<span>{{article.unit}}</span>
			</div>
			<!--<div class='group-con'>
				<label>举办目的：</label>
				<p class='content'>{{article.abs}}</p>
			</div>-->
			<div class='group-con'>
				<label>举办内容：</label>
				<div class='content' v-html='article.content'></div>
			</div>
			<div class='group-con'>
				<label>附加说明：</label>
				<p class='content' v-show='article.explain'>{{article.explain}}</p>
			</div>
			<!--<div class='group-con'>
				<a>附件</a>
				{{article.enclosure}}
			</div>-->
		</div>
	</div>
</template>

<script>
	import modify from '../components/modify.vue';

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
				return this.article.author === this.$store.state.userId || (this.$store.state.userRank == 1 && this.article().faculty == this.$store.state.userFaculty) || this.$store.state.userRank > 1;
			}
		},
		methods: {
			redirection() {
				this.$router.push({name: 'index'});
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
		width 80% 
		min-width 800px
		margin auto
		overflow auto
	h1
		text-align center
		margin 30px 0 25px
	.sub-title
		color #aaa
		text-align center
	.modify
		float right
	.cover
		width 100%
	.content
		margin-left 90px
</style>