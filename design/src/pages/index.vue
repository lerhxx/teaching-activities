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
		<ul class='list'>
			<li class='list-item' v-for='item in articles'>
                <img class='item-cover' :src='item.url' />
                <h3>
                    <router-link class='text-ellipsis' :to="{name: 'article', params: {id: item._id}}">
                        {{item.title}}
                    </router-link>
                </h3>
                <p class='time color-g'>{{item.time | timeFormat}}</p>
                <p class='abstract'>{{item.content | filterContent}}</p>
            </li>
		</ul>
	</div>
</template>

<script>
	import {mapState} from 'vuex';

	export default {
		data() {
			 return {
			 	img: '/dist/imgs/cover-b.jpg',
		    }
		},
		created() {
			this.$store.dispatch('GET_SEARCH_LISTS')
				.catch(err => alert(err));
			this.$store.dispatch('GET_ARTICLES')
				.catch(err => alert(err));
		},
		computed: mapState(['searchLists', 'articles']),
		filters: {
            timeFormat(value) {
                let date = new Date(value);
                return `${date.getFullYear()}年${date.getMonth() > 9 ? date.getgetMonthHours() : '0' + date.getMonth()}月${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}日 
                        ${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:
                        ${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
            },
			filterContent(value) {
				return value.length > 51 ? value.substr(0, 51) + '...' : value;
			}
        }
	}
</script>

<style scoped lang='stylus'>
	@import '../css/funs';
	.index
		padding-bottom 60px
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
	.list
		width 50%
		min-width 600px
		margin auto
		.list-item 
			padding 15px 10px
			border-bottom 1px solid #ddd
	h3
		display inline-block
		margin-bottom 10px
		font-size 20px
		a
			display block
			max-width 420px
			&:after
				display block
				width 100%
				margin auto
				border-bottom 1px solid #000
				content ''
				transform scale3d(0, 1, 1)
				transition transform .15s ease-in-out
			&:hover:after
				transform scale3d(1, 1, 1)
	.item-cover
		float right
		width 120px
		height 80px
		margin 15px
		margin-right 0
	.time
		margin-bottom 10px
		font-size 14px
	.abstract
		height 3em
		padding-right 25px
		line-height 1.5em
		overflow hidden
</style>