<template>
	<div class='comment-wraper'>
		<div class='header'>
			{{sum}}条评论
		</div>
		<ul>
			<li v-for='item in lists'>
				<div>{{item.id}}</div>
				<div>{{item.time}}</div>
				<p>{{item.comment}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				sum: 0,
				lists: [{
					id: '',
					time: '',
					comment: ''
				}]
			}
		}
	}
</script>

<style scoped lang='stylus'>
	.comment-wraper
		width 60%
		margin 100px auto
		border 1px solid red
	.header
		font-size 20px
</style>