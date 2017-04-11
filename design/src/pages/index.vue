<template>
	<div class='index'>
		<img class='in-cover' :src='img' />
		<div class='in-search'>
			<label>学院：</label>
			<select class='academy' v-model='academy' @change='onSelectAcademy'>
				<option v-for='academy in academyList' v-bind:value='academy.index'>
					{{academy.name}}
				</option>
			</select>
			<label>教研室：</label>
			<select class='faculty' v-model='faculty' @change='filter'>
				<option v-for='faculty in facultiesList' v-bind:value='faculty.index'>
					{{faculty.type}}
				</option>
			</select>
			<label>类型：</label>
			<select class='type' v-model='type' @change='filter'>
				<option v-for='type in typesLists' v-bind:value='type.index'>
					{{type.name}}
				</option>
			</select>
		</div>
		<div class='list-wrapper'>
			<ul class='list'>
				<li class='list-item' v-for='item in articles' :class="{'willHeld': new Date(item.endTime).getTime() > now}">
					<h3>
						<router-link class='text-ellipsis' :to="{name: 'article', params: {id: item._id}}">
							{{item.title}}
						</router-link>
					</h3>
					<p class='time color-g'>{{item.time | timeFormat}}</p>
					<p>地点：{{item.address}}</p>
					<modify :item='item' cb='GET_ARTICLES' :params='params' v-show='userRank == 2 || (userRank == 1 && userId == item.author)'></modify>
				</li>
			</ul>
		</div>
		<!--分页器-->
		<page :totalPage='totalPage' @prevPage='onSelect' @nextPage='onSelect' @skip='onSelect' ref='page'></page>
	</div>
</template>

<script>
	import {mapState} from 'vuex';
	import modify from '../components/modify.vue';
	import page from '../components/page.vue'

	export default {
		data() {
			 return {
			 	img: '/dist/imgs/cover-1.jpg',
				params: {
					faculty: '0-0',
					type: 0,
					academy: 0,
					page: 1
				},
				pageSize: 10,
				now: new Date().getTime(),
				totalPage: 0
		    }
		},
		created() {
			let self = this;
			this.$store.dispatch('GET_TYPE_LISTS')
				.catch(err => alert(err));
			this.$store.dispatch('GET_ACADEMY_LISTS')
				.catch(err => alert(err));
			this.getFacultyies(this.onSelect);
		},
		methods: {
			onSelect(page) {
				this.params.page = page;
				this.$store.dispatch('GET_ARTICLES', this.params)
					.then(res => {
						this.scroll();
						this.totalPage = Math.ceil(this.articleTotal / this.pageSize);
					})
			},
			onSelectAcademy() {
				let self = this;
				this.getFacultyies(() =>{
					self.params.faculty = self.facultiesList[0].index;
					self.filter();
				});
			},
			getFacultyies(cb) {
				let self = this;
				this.$store.dispatch('GET_FACULTIES', {academy: this.params.academy})
					.then(res => {
						cb && cb();
					})
					.catch(err => alert(err));
			},
			filter() {
				this.$refs.page.initialPage();
				this.onSelect(1);
			},
			scroll() {
				let body = document.body;
				let id = '';
				id = setInterval(() => {
					if(body.scrollTop <= 280) {
						clearInterval(id)
					}
					body.scrollTop -= 60;
				}, 10)
			}
		},
		computed: mapState(['typesLists', 'academyList', 'facultiesList', 'articleTotal', 'articles', 'userId', 'userRank', 'userFaculty']),
		filters: {
            timeFormat(value) {
                let date = new Date(value);
                return `${date.getFullYear()}年${date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)}月${date.getDate() > 9 ? date.getDate() : '0' + date.getDate()}日 
                        ${date.getHours() > 9 ? date.getHours() : '0' + date.getHours()}:
                        ${date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()}`;
            },
        },
        components: {
        	modify,
			page
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
			width 100%
			padding 15px 10px
			border-bottom 1px solid #ddd
			box-sizing border-box
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
	.willHeld
		relative()
		&:after
			absolute(top 50% right 10px)
			padding 3px 8px
			border 1px solid #8fe32e
			content: '未举办'
			color #8bc34a
			border-radius 6px
	@media screen and (max-width: 768px)
		.list-wrapper
			width 90%
</style>