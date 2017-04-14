<template>
	<div class='form-contain'>
		<form class='edit-form'>
			<!--<div class='group-left'>-->
				<div class='group-con'>
					<span class='must'>*</span><input type='text' v-model='form.title' placeholder='标题'/>
				</div>
				<!--<div class='group-con'>
					<input type='text' v-model='form.abs' placeholder='举办目的' />
				</div>-->
				<div class='group-con'>
					<span class='must'>*</span><calendar type='time' inputwidth='100%' v-on:getStartTime='getStartTime' v-on:getEndTime='getEndTime'></calendar>
					<!--<input type='text' v-model='form.time' placeholder='举办时间' />-->
				</div>
				<div class='group-con'>
					<span class='must'>*</span><input type='text' v-model='form.address' placeholder='举办地点' />
				</div>
				<div class='group-con' v-show='userRank > 1'>
				<!--<div class='group-con'>-->
					<span class='must'>*</span><div class='select'>
						<span class='label' @click='onToggleOption("acadamy")'>{{acadamy}}</span>
						<span class='arrow' @click='onToggleOption("acadamy")'></span>
						<div class='option-box' v-show='acadamyOptionShow'>
							<div class='option'>
								<p @click='onChangeAcadamyOption' v-for='item in acadamyOptions' :data-index='item.index'>{{item.name}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class='group-con' v-show='userRank > 1'>
					<span class='must'>*</span><div class='select'>
						<span class='label' @click='onToggleOption("unit")'>{{unit}}</span>
						<span class='arrow' @click='onToggleOption("unit")'></span>
						<div class='option-box' v-show='unitOptionShow'>
							<div class='option'>
								<p @click='onChangeUnitOption' v-for='item in unitOptions' :data-index='item.index'>{{item.type}}</p>
							</div>
						</div>
					</div>
				</div>
				<div class='group-con'>
					<span class='must'>*</span><div class='select'>
						<span class='label' @click='onToggleOption("type")'>{{type}}</span>
						<span class='arrow' @click='onToggleOption("type")'></span>
						<div class='option-box' v-show='typeOptionShow'>
							<div class='option'>
								<p @click='onChangeTypeOption' v-for='item in typeOptions' :data-index='item.index'>{{item.name}}</p>
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
				<div class='group-con' v-show='isEdit && $route.params.artId'>
					<input type='text' v-model='party' placeholder='参与者名单' >
					<span class='tip'>参与者请以","分隔</span>
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
					<editor ref='edit'></editor>
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
			/**
             * @param {String} title: 文章标题
             * @param {Date} time: 发表时间
             * @param {String} address: 举办地址
             * @param {String} unit: 举办单位
			 * @param {String} explain: 附加说明
             * @param {String} content: 文章内容
             * @param {String/File} enclosure: 附件
             * @param {String} faculty: 作者所在教研室
			 * @param {String} party: 参与者
            */
			return {
				form: {
					title: '',
					time: '',
					address: '',
					explain: '',
					content: '',
					enclosure: '',
					faculty: '' ,
					party: '',    
				},
				acadamy: '请选择发布学院',
				unit: '请选择举办单位',
				type: '请选择发布类型',
				acadamyOptionShow: false,
				unitOptionShow: false,
				typeOptionShow: false,
				calendar: {
					show: false,
				},
				acadamyOptions: [],
				unitOptions: [],
				typeOptions: []
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
						this.form.title = data.title;
						this.form.abs = data.abs;
						this.form.time = data.time;
						this.form.address = data.address;
						this.form.unit = data.unit;
						this.form.explain = data.explain;
						this.form.enclosure = data.enclosure;
						this.$refs.edit.setContent(data.content)
					})
			}
			if(this.userRank == 1) {
				this.getUnitOptions();
			}else if(this.userRank > 1) {
				this.getAcadamyOptions();
			}
			this.getTypeOptions();
		},
		methods: {
			getAcadamyOptions() {
				let self = this;
				this.$store.dispatch('GET_ACADEMY_LISTS')
					.then(res => {
						res.shift();
						self.acadamyOptions = res;
					})
					.catch(err => console.log(err))
			},
			getUnitOptions() {
				let self = this;
				let acadamyId = this.userFaculty.index.split('-')[0];
				this.$store.dispatch('GET_FACULTIES', {academy: acadamyId})
					.then(res => {
						res.shift();
						self.unitOptions = res;
					})
					.catch(err => console.log(err))
			},
			getTypeOptions() {
				let self = this;
				this.$store.dispatch('GET_TYPE_LISTS')
					.then(res => {
						res.shift();
						self.typeOptions = res;
					})
					.catch(err => console.log(err))
			},
			onToggleOption(str) {
				let name = str + 'OptionShow';
				if(this.userRank > 1 && str === 'unit' && !this.acadamyOptions) {
					alert('请先选择学院');
					return;
				}
				this[name] = !this[name];
			},
			onToggleUnitOption() {
				this.unitOptionShow = !this.unitOptionShow;
			},
			onToggleTypeOption() {
				this.typeOptionShow = !this.typeOptionShow;
			},
			onChangeFile(e) {
				this.form.enclosure = this.getFile(e);
				if(!this.form.enclosure.length) {
					return;
				}
			},
			onChangeAcadamyOption(e) {
				this.acadamy = e.target.innerHTML;
				let index = e.target.getAttribute('data-index');
				for(let i = 0, len = this.acadamyOptions.length; i < len; ++i) {
					if(this.acadamyOptions[i].index == index) {
						this.unitOptions = this.acadamyOptions[i].staff;
						this.unitOptions.shift();
						break;
					}
				}
				this.acadamyOptionShow = !this.acadamyOptionShow;
			},
			onChangeUnitOption(e) {
				this.unit = e.target.innerHTML;
				this.unitOptionShow = !this.unitOptionShow;
			},
			onChangeTypeOption(e) {
				this.type = e.target.innerHTML;
				this.typeOptionShow = !this.typeOptionShow;
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
			getStartTime(value) {
				console.log(value)
				this.form.startTime = value;
			},
			getEndTime(value) {
				console.log(value)
				this.form.endTime = value;
			},
			onPost() {
				//TODO
				//编辑
				let form = this.form;
				// form.content = editor.sync();
				form.content = this.$refs.edit.getContent();
				form.author = this.userId;
				form.time = new Date();
				form.faculty = this.userRank >1 ? this.unit : this.userFaculty;
				// console.log(form)
				for(let i = 0, len = this.typeOptions.length; i < len; ++i) {
					if(this.type = this.typeOptions[i].name) {
						form.type = this.typeOptions[i].index;
						break;
					}
				}
				if(!form.title || !form.time || !form.address || !form.unit || !form.content || !form.type) {
					return alert('请填写所有必须项！');
				}
				if(!this.$route.params.artId) {
					this.$store.dispatch('POST_ARTICLE', {form: form})
						.then(data => {
							alert('发布成功');
							this.$router.push({name: 'article', params: {id: data.id}});
						}).catch(err => alert(err));
				}else {
					if(this.party) {
						this.party = this.party.replace(/，/g, ',');
						form.participator = this.party.split(',');
					}
					this.$store.dispatch('UPDATE_ARTICLE', {form: form, id: this.$route.params.artId})
						.then(data => {
							alert('修改成功');
							this.$router.push({name: 'article', params: {id: data.id}});
						}).catch(err => alert(err));
				}
			}
		},
		computed: mapState(['userId', 'isEdit', 'userFaculty', 'userRank'])
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
		border 1px solid #ddd
		outline none
		font-size 14px
		border-radius 5px
		box-sizing border-box
		box-shadow 1px 1px 5px rgba(0, 0, 0, .3)
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
		.label
			line-height 14px
	.option-box
		absolute(top 33px left -2px)
		width 100%
		padding 8px 0px
		border 1px solid #4ad8e2
		border-radius 5px
		background #fff
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
				color: #fff
				background-color #7ab5d8
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
		margin auto
		text-align left
		font-size 12px
		color red
		box-sizing border-box
	.edit-wrapper
		width left-form-width
	@media screen and (max-width 1016px)
		.group-left
			width 80%
</style>