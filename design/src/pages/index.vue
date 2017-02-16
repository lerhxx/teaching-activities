<template>
	<div class='index'>
		<img class='in-cover' :src='img' />
		<div class='in-search'>
			<label>系：</label>
			<select class='faculty'>
				<option v-for='faculty in searchLists.faculties'>
					{{faculty}}
				</option>
			</select>
			<label>类型：</label>
			<select class='type'>
				<option v-for='type in searchLists.types'>
					{{type}}
				</option>
			</select>
			<label>时效：</label>
			<select class='time'>
				<option v-for='time in searchLists.timeliness'>
					{{time}}
				</option>
			</select>
		</div>
		<ul class='in-list'>
			<li class='in-list-item' v-for='item in articles'>
				<router-link :to="{name: 'article', params:{id: item._id}}">
					<img :src='item.url' />
					<h3><router-link :to='{name: "article"}'>{{item.title}}</router-link></h3>
					<p class='abs'>{{item.abs}}</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		data() {
			 return {
			 	img: '../../dist/imgs/cover-b.jpg',
		    }
		},
		created() {
			this.$store.dispatch('GET_SEARCH_LISTS')
				.catch(err => alert(err));
			this.$store.dispatch('GET_ARTICLES')
				.catch(err => alert(err));
		},
		computed: mapState(['searchLists', 'articles'])
	}
</script>

<style lang='stylus'>
	@import '../css/funs';
	@import '../css/form';
	@import '../css/variable';

	#app
		relative()
		overflow hidden
	.index
		margin-bottom 60px
	.in-list
		max-width 1000px
		padding-top 15px
		margin auto
	.in-cover 
		width 100%
		height 300px
	.in-search 
		padding 15px
		text-align center
		border-bottom 1px solid #bbb
		label 
			margin-right search-mar
		select 
			min-width 80px
			margin 0 search-mar
	.in-list-item 
		display inline-block
		width: 33.33%
		padding 0 15px
		margin: 10px 0
		box-sizing border-box
		img 
			width 100%
			height 150px
		.abs 
			text-overflow ellipsis
			white-space nowrap
			overflow hidden
</style>