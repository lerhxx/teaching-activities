<template>
	<div id='index'>
		<img class='in-cover' :src='img' />
		<div class='in-search'>
			<label>系：</label>
			<select class='faculty'>
				<option v-for='faculty in faculties'>
					{{faculty}}
				</option>
			</select>
			<label>类型：</label>
			<select class='type'>
				<option v-for='type in types'>
					{{type}}
				</option>
			</select>
			<label>时效：</label>
			<select class='time'>
				<option v-for='time in timeliness'>
					{{time}}
				</option>
			</select>
		</div>
		<ul class='in-list'>
			<li class='in-list-item' v-for='item in lists'>
				<img :src='item.url' />
				<h3>{{item.title}}</h3>
				<p class='abs'>{{item.abs}}</p>
			</li>
		</ul>
		<page :curPage='page' :maxPage='maxPage' v-on:changePage='changePage'></page>
	</div>
</template>

<script>
	import Page from '../components/page.vue';

	export default {
		data() {
			 return {
			 	img: './src/imgs/cover-b.jpg',
			 	faculties: [],
			 	types: [],
			 	timeliness: [],
			 	lists: [],
			 	page: 1,
			 	maxPage: 1,
			 	listNum: 10
		    }
		},
		created: function() {
			this.fetchTypeData();
			this.fetchListsData();
		},
		methods: {
			fetchTypeData: function() {
				let self = this;
				fetch('../../../json/search.json')
				.then(function(res) {
					return res.json()
				}).then(function(json) {
					self.faculties = json.faculties;
					self.types = json.types;
					self.timeliness = json.timeliness;
					console.log(json)
				})
			},
			fetchListsData: function() {
				let self = this,
					url = `../../../json/list.json?page=${this.page}`;

				fetch(url)
				.then(function(res) {
					return res.json()
				}).then(function(json) {
					self.lists = json.lists;
					self.maxPage = json.maxPage;
					console.log(self.lists)
				})
			},
			changePage: function() {
				console.log('ok');
			}
		},
		components: {
			Page
		}
	}
</script>

<style lang='sass'>
	@import '../css/mixins.scss';

	$search-mar: 10px;
	.in-cover {
		width: 100%;
		height: 300px;
	}
	.in-search {
		padding: 10px;
		text-align: center;
		border-bottom: 1px solid #bbb;
		label {
			margin-right: $search-mar;
		}
		select {
			min-width: 80px;
			margin: 0 $search-mar;
		}
	}
	.in-list {
		padding: 10px;
		text-align: center;
	}
	.in-list-item {
		display: inline-block;
		width: 33.33%;
		max-width: 300px;
		padding: 0 10px;
		margin: 20px 0;
		@include box-sizing(border-box);
		img {
			width: 100%;
			height: 150px;
		}
		.abs {
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}
</style>