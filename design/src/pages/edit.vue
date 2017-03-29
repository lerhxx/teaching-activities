<template>
	<div class='form-contain'>
		<form class='edit-form'>
			<!--<div class='group-left'>-->
				<div class='group-con'>
					<span class='must'>*</span><input type='text' v-model='form.title' placeholder='标题'/>
				</div>
				<div class='group-con'>
					<input type='text' v-model='form.abs' placeholder='举办目的' />
				</div>
				<div class='group-con'>
					<span class='must'>*</span><calendar type='time' inputwidth='100%' v-on:getValue='getTime' v-on:getEndTime='getEndTime'></calendar>
					<!--<input type='text' v-model='form.time' placeholder='举办时间' />-->
				</div>
				<div class='group-con'>
					<span class='must'>*</span><input type='text' v-model='form.address' placeholder='举办地点' />
				</div>
				<div class='group-con'>
					<span class='must'>*</span><div class='select'>
						<span @click='onToggleOption'>{{form.unit}}</span>
						<span class='arrow' @click='onToggleOption'></span>
						<div class='option-box' v-show='optionShow'>
							<div class='option'>
								<p @click='onChangeOption'>信息管理教研室</p>
								<p @click='onChangeOption'>工业工程教研室</p>
							</div>
						</div>
					</div>
				</div>
				<div class='group-con'>
					<input type='text' v-model='form.explain' placeholder='附加说明' />
				</div>
				<!--<div class='group-con group-cover'>
					<span class='must'>*</span><img :src='form.url'/>
					<input type='file' @change='onChangeCover'/>
				</div>-->
				<div class='group-con'>
					<input type='text' v-model='party' placeholder='参与者名单' >
					<span class='tip' v-show='isEdit && $route.params.artId'>参与者请以","分隔</span>
				</div>
			<!--</div><div class='group-right'>-->
				<!--<div class='group-con group-content'>
					<span class='must'>*</span>
					<div class='textarea-box'>
						<textarea id='editor' placeholder='请输入举办内容' v-model='form.content'></textarea>
					</div>
				</div>-->
				<div class='group-con group-content'>
					<span class='must'>*</span>
					<editor></editor>
				</div>
				<div class='group-con group-edit'>
					<input type='file' multiple @change='onChangeFile'/>
					<span class='btn btn-edit' :value='enclosure' id='file' style='margin-left: 25px;'>附件</span>
					<div class='file-list'>
						<p class='file-content' v-for='file in form.enclosure'>{{file.name}}</p>
					</div>
				</div>
				<div class='group-con group-btn'>
					<input class='btn btn-l btn-edit btn-post' type='button' @click='onPost' value='发布' />
				</div>
			<!--</div>-->
		</form>
	</div>
</template>

<script>
	import axios from 'axios';
	import calendar from 'auto-calendar';
	import editor from '../components/editor';
	import {mapState} from 'vuex';
	import {get} from '../assets/cookieUtil';

	let simditor;
	export default {
		data() {
			return {
				form: {
					url: '/dist/imgs/default.png',
					title: '',
					abs: '',
					time: '',
					address: '',
					unit: '请选择举办单位',
					explain: '',
					content: '',
					enclosure: '',
					faculty: '' ,
					party: '',    
				},
				optionShow: false,
				calendar: {
					show: false,
				}
			}
		},
		components: {
			calendar,
			editor
		},
		created() {
			if(this.isEdit && this.$route.params.artId) {
				this.$store.dispatch('GET_EDIT_ARTICLE', {id: this.$route.params.artId})
					.then(data => {
						this.form.url = data.url;
						this.form.title = data.title;
						this.form.abs = data.abs;
						this.form.time = data.time;
						this.form.address = data.address;
						this.form.unit = data.unit;
						this.form.explain = data.explain;
						this.form.enclosure = data.enclosure;
						editor.setValue(data.content)
					})
			}
		},
		mounted() {
			// 富文本编辑器
			// simditor = new Simditor({
			// 	textarea: $('#editor'),
			// 	toolbar: [
			// 		'title',
			// 		'bold',
			// 		'italic',
			// 		'underline',
			// 		'strikethrough',
			// 		'fontScale',
			// 		'color',
			// 		'ol',
			// 		'ul',
			// 		'blockquote',
			// 		'code',
			// 		'table',
			// 		'link',
			// 		'image',
			// 		'hr',
			// 		'indent',
			// 		'outdent',
			// 		'alignment'
			// 	],
			// 	upload: {
			// 		url: `/user/edit/${this.userId}`,
			// 		params: null,
			// 		fileKey: 'fileDataFileName',
			// 		connectionCount: 3,
			// 		leaveConfirm: '正在上传文件'
			// 	},
			// 	imageButton: [
			// 		'upload',
			// 		'external'
			// 	]
			// })
			
		},
		methods: {
			onToggleOption() {
				this.optionShow = !this.optionShow;
			},
			onChangeFile(e) {
				this.form.enclosure = this.getFile(e);
				if(!this.form.enclosure.length) {
					return;
				}
			},
			onChangeOption(e) {
				this.form.unit = e.target.innerHTML;
				this.optionShow = !this.optionShow;
			},
			onChangeCover(e) {
				let file = this.getFile(e),
					self = this,
					reader;
				if(file.length != 1 || !/\/(?:jpeg|jpg|png)/i.test(file[0].type)) {
					return;
				}

				reader = new FileReader();
				reader.onload = function() {
					self.form.url = this.result;
				}
				reader.readAsDataURL(file[0]);
			},
			getFile(e) {
				return e.target.files || e.dataTransfer.files;
			},
			getTime(value) {
				this.form.heldTime = value;
			},
			getEndTime(value) {
				console.log(value)
				this.form.endTime = value;
			},
			onPost() {
				//TODO
				//编辑
				let form = this.form;
				form.content = editor.sync();
				form.author = this.userId;
				form.time = new Date();
				form.faculty = this.userFaculty;
				if(!form.title || !form.time || !form.address || !form.unit || !form.content || !form.url) {
					return alert('请填写所有必须项！');
				}
				if(!this.$route.params.artId) {
					this.$store.dispatch('POST_ARTICLE', {form: form})
						.then(data => {
							alert('发布成功');
							this.$router.push({name: 'article', params: {id: data.id}});
						}).catch(err => alert(err));
				}else {
					this.party = this.party.replace(/，/g, ',');
					form.participator = this.party.split(',');
					this.$store.dispatch('UPDATE_ARTICLE', {form: form, id: this.$route.params.artId})
						.then(data => {
							alert('修改成功');
							this.$router.push({name: 'article', params: {id: data.id}});
						}).catch(err => alert(err));
				}
			}
		},
		computed: mapState(['userId', 'isEdit', 'userFaculty'])
	}
</script>

<style scoped lang='stylus'>
	@import '../css/funs';
	@import '../css/form';
	@import '../css/variable';
	@import '../../dist/css/simditor.css';
	
	.form-contain
		min-height 100vh
		padding-top nav-height + 50px
		padding-bottom 20px
		box-sizing border-box
		text-align center
	.edit-form
		display inline-block
		width 100%
		padding 0
		margin auto
		//border 1px solid blue
		text-align left
		label
			display inline-block
			width 90px
			text-align left
			vertical-align top
		.btn-post
			width 55%
		.btn-edit
			margin-left 25px
		.simditor
			border-radius 10px
			overflow-y auto
			.simditor-body
				height 300px
				overflow-y auto
		.group-btn
			text-align left
			input
				line-height 14px
	.edit-form input,
	.select,
	.calendar .input-wrapper .input
		width left-form-width
		height 36px
		padding 10px 10px
		border 2px solid #ddd
		outline none
		//background #fff
		//box-shadow inset 1px 1px 5px 2px rgba(0, 0, 0, .5)
		font-size 14px
		border-radius 5px
		box-sizing border-box
		&::-webkit-input-placeholder
			color rgba(0, 0, 0, .6)
	.calendar
		display inline-block
		width left-form-width
		span.input-clear
			top 9px
			right 8px
		div.input
			border-width 2px
	.select
		relative()
		display inline-block
		color rgba(0, 0, 0, .6)
		text-align left
		cursor pointer
		.arrow
			absolute(top 15px right 8px)
			border 8px solid transparent
			border-top-color rgba(0, 0, 0, .6)
		span
			display block
	.option-box
		absolute(top 36px left 0)
		width 100%
		padding 8px 0px
		padding-right 6px
		box-shadow inset 1px 1px 5px 2px rgba(0, 0, 0, .5)
		border-radius 12px
		background #fff
		box-sizing border-box
		z-index 2
	.option
		max-height 110px
		overflow-y auto
		&::-webkit-scrollbar
			width 8px
			margin 10px
			border-radius 8px
		&::-webkit-scrollbar-thumb
			border-radius 8px
			background #bd1010
		p
			padding 3px 15px
			cursor pointer
			&:hover
				color #7ab5d8
	.group-con
		width 80%
		margin 10px auto
	.must
		float left
		margin-left -15px
		color red
	.group-cover
		relative()
		input[type='file']
			absolute(top 0 right 0)
			width left-form-width
			height 120px
			opacity 0
			cursor pointer
		img
			width left-form-width
			height 120px
			vertical-align top
	.group-content
		textarea
			width 100%
			height 100%
			padding 10px
			border none
			outline none
			font-size 14px
			box-sizing border-box
			background transparent
			resize none
			&::-webkit-scrollbar
				width 8px
				margin 10px
				border-radius 8px
			&::-webkit-scrollbar-thumb
				border-radius 8px
				background #bd1010
			&::-webkit-input-placeholder
				color rgba(0, 0, 0, .6)
		.textarea-box
			display inline-block
			width 95%
			height 445px
			padding 0
			text-align left
			vertical-align top
	.group-edit
		relative()
		input[type='file']
			absolute(top 0 left 25px)
			width 74px
			height 36px
			opacity 0
			cursor pointer
		.btn-edit
			display inline-block
			margin 0
	.file-list
		display inline-block
		width 400px
		margin 0 15px 5px
		font-size 20px
		line-height 36px
		vertical-align top
	.group-left,
	.group-right
		display inline-block
		width 300px
		padding 0 30px
		//border 1px solid red
		vertical-align top
		text-align right
		box-sizing border-box
	.group-right
		width 700px
		padding 0 15px
		text-align left
	.tip
		display block
		width left-form-width
		padding 0 20px
		margin auto
		text-align left
		font-size 12px
		color red
		box-sizing border-box
	@media screen and (max-width 1016px)
		.group-left
			width 80%
</style>