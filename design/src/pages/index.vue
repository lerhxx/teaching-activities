<template>
	<div class='index'>
		<img class='in-cover' :src='img' />
		<div class='in-search'>
			<label>教研室：</label>
			<select class='faculty' v-model='faculty' @change='onSelect'>
				<option v-for='faculty in searchLists.faculties' v-bind:value='faculty.index'>
					{{faculty.type}}
				</option>
			</select>
			<label>类型：</label>
			<select class='type' v-model='type' @change='onSelect'>
				<option v-for='type in searchLists.types' v-bind:value='type.index'>
					{{type.type}}
				</option>
			</select>
			<!--<label>时效：</label>
			<select class='time' v-model='time' @change='onSelect'>
				<option v-for='time in searchLists.timeliness' v-bind:value='time.index'>
					{{time.type}}
				</option>
			</select>-->
		</div>
		<!-- <div class='not-hold-wrapper'>=
			<ul class='list'>
				<li class='list-item' v-for='item in notHoldArticles'>
					<h3>
						<router-link class='text-ellipsis' :to="{name: 'article', params: {id: item._id}}">
							{{item.title}}
						</router-link>
					</h3>
					<p class='time color-g'>{{item.time | timeFormat}}</p>
					<p class='abstract' v-html='filterContent(item.content, 51)'></p>
					<modify :item='item' v-show='userRank == 2 || (userRank == 1 && userFaculty == item.faculty)'></modify>
				</li>
			</ul>
		</div> -->
		<div class='list-wrapper'>
			<ul class='list'>
				<li class='list-item' v-for='item in heldArticles'>
					<!-- <img class='item-cover' :src='item.url' /> -->
					<h3>
						<router-link class='text-ellipsis' :to="{name: 'article', params: {id: item._id}}">
							{{item.title}}
						</router-link>
					</h3>
					<p class='time color-g'>{{item.time | timeFormat}}</p>
					<p>地点：{{item.address}}</p>
					<!-- <p class='abstract' v-html='item.content'></p> -->
					<modify :item='item' v-show='userRank == 2 || (userRank == 1 && userFaculty == item.faculty)'></modify>
				</li>
			</ul>
		</div>
		<!--TODO
		分页-->
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import modify from '../components/modify.vue';

	export default {
		data() {
			 return {
			 	img: '/dist/imgs/cover-1.jpg',
				 faculty: 0,
				 type: 0,
				 time: 0,
		    }
		},
		created() {
			this.$store.dispatch('GET_SEARCH_LISTS')
				.catch(err => alert(err));
			this.onSelect();
		},
		methods: {
			onChangeTime(item) {
				//TODO
				console.log(this.time)
			},
			onSelect() {
				this.$store.dispatch('GET_ARTICLES', {faculty: this.faculty, type: this.type, time: this.time});
			},
			filterContent(value, len) {
				return value.length > len ? value.substr(0, len) + '...' : value;
			}
		},
		computed: mapState(['searchLists', 'heldArticles', 'notHoldArticles', 'userRank', 'userFaculty']),
		filters: {
            timeFormat(value) {
                let date = new Date(value);
                return `${date.getFullYear()}年${date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}月${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}日 
                        ${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:
                        ${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
            },
        },
        components: {
        	modify
        }
	}
</script>

<style scoped lang='stylus'>
	@import '../css/funs';
	@import '../css/variable';
	.index
		padding-bottom 60px
	.in-cover 
		width 100%
		height 300px
	.in-search 
		padding 15px 0
		text-align center
		border-bottom 1px solid #bbb
		select 
			min-width 80px
			height 21px
			margin-right search-mar
			outline none
	.list-wrapper
		width 60%
		margin auto
	.hold-list
		margin 32px 0 12px
	.hold-list-item
		margin 0 10px
		a
			display block
			padding 8px 15px
			border 1px solid #ccc
			font-size 16px
	.list
		margin auto
		.list-item 
			display block
			padding 15px 10px
			border-bottom 1px solid #ddd
	h3
		display inline-block
		max-width 100%
		margin-bottom 10px
		font-size 1.3em
		a
			display block
			max-width 100%
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
	@media screen and (max-width: 768px)
		.list-wrapper
			width 90%
</style>