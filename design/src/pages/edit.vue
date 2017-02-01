<template>
	<div class='form-contain'>
		<form class='edit-form'>
			<div class='group-left'>
				<div class='group-con'>
					<span class='must'>*</span><input type='text' v-model='title' placeholder='标题' @focus='test'/>
				</div>
				<div class='group-con'>
					<input type='text' v-model='aim' placeholder='举办目的' />
				</div>
				<div class='group-con'>
					<span class='must'>*</span><input type='text' v-model='time' placeholder='举办时间' />
				</div>
				<div class='group-con'>
					<span class='must'>*</span><input type='text' v-model='place' placeholder='举办地点' />
				</div>
				<div class='group-con'>
					<span class='must'>*</span><div class='select'>
						<span @click='onToggleOption'>{{selectOption}}</span>
						<span class='arrow' @click='onToggleOption'></span>
						<div class='option-box' v-show='optionShow'>
							<div class='option'>
								<p @click='onChangeOption'>hello</p>
							</div>
						</div>
					</div>
				</div>
				<div class='group-con'>
					<input type='text' v-model='explain' placeholder='附加说明' />
				</div>
				<div class='group-con group-cover'>
					<span class='must'>*</span><img :src='cover'/>
					<input type='file' @change='onChangeCover'/>
				</div>
			</div><div class='group-right'>
				<div class='group-con group-content'>
					<span class='must'>*</span>
					<div class='textarea-box'>
						<textarea id='editor' placeholder='请输入举办内容' v-model='content'></textarea>
					</div>
				</div>
				<div class='group-con group-edit'>
					<input type='file' multiple @change='onChangeFile'/>
					<span class='btn btn-edit' :value='enclosure' id='file' style='margin-left: 25px;'>附件</span>
					<div class='file-list'>
						<p class='file-content' v-for='file in files'>{{file.name}}</p>
					</div>
				</div>
			</div>
			<div class='group-con group-btn'>
				<button class='btn btn-l btn-edit btn-post' @click='onPost'>发布</button>
			</div>
		</form>
	</div>
</template>

<script>
	let editor;
	export default {
		data() {
			return {
				title: '',
				aim: '',
				time: '',
				place: '',
				selectOption: '请选择举办单位',
				optionShow: false,
				explain: '',
				cover: './src/imgs/cover-b.jpg',
				content: '',
				files: '',
			}
		},
		mounted() {
			console.dir($('#editor'));
			editor = new Simditor({
				textarea: $('#editor'),
				toolbar: [
					'title',
					'bold',
					'italic',
					'underline',
					'strikethrough',
					'fontScale',
					'color',
					'ol',
					'ul',
					'blockquote',
					'code',
					'table',
					'link',
					'image',
					'hr',
					'indent',
					'outdent',
					'alignment'
				],
				imageButton: [
					'upload',
					'external'
				]
			})
			
		},
		methods: {
			onToggleOption() {
				this.optionShow = !this.optionShow;
			},
			onChangeFile(e) {
				this.files = this.getFile(e);
				if(!this.files.length) {
					return;
				}
				console.log(this.files[0])
			},
			onChangeOption(e) {
				this.selectOption = e.target.innerHTML;
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
					self.cover = this.result;
				}
				reader.readAsDataURL(file[0]);
			},
			getFile(e) {
				return e.target.files || e.dataTransfer.files;
			},
			onPost(e) {
				e.stopPropagation();
				if(!this.title || !this.time || !this.place || !this.selectOption || !this.content || !this.cover) {
					console.log('err')
				}
				this.content = editor.sync();
				console.log(this.title);
				console.log(this.aim);
				console.log(this.time);
				console.log(this.place);
				console.log(this.selectOption);
				console.log(this.explain);
				console.log(this.cover);
				console.log(this.content);
				console.log(this.files);
			},
			test() {
				console.log(this.content)
			}
		}
	}
</script>

<style lang='stylus'>
	@import '../css/funs'
	@import '../css/variable'
	@import '../css/simditor.css'
	.form-contain
		padding-top nav-height + 50px
		padding-bottom 50px
		box-sizing border-box
		background url(../imgs/16.jpg) 0 0 no-repeat
		background-size cover
		text-align center
	.edit-form
		display inline-block
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
		.simditor
			border-radius 10px
			overflow hidden
	.group-left input,
	.select,
	.textarea-box
		width left-form-width
		height 36px
		padding 10px 10px
		border none
		outline none
		background #fff
		box-shadow inset 1px 1px 5px 2px rgba(0, 0, 0, .5)
		font-size 14px
		border-radius 15px
		box-sizing border-box
		&::-webkit-input-placeholder
			color rgba(0, 0, 0, .6)
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
		background #f7ae9d
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
				color #fff
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
		margin-bottom 60px
		//border 1px solid red
		vertical-align top
		text-align right
		box-sizing border-box
	.group-right
		width 700px
		padding 0
		text-align left
</style>