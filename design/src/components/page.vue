<template>
	<div class='page'>
		<span id='prev'>
			上一页
		</span>
		<div id='goto'>
			<input type='type' pattern='/\d*/' value='curpage' v-on:click='changePage'/>
		</div>
		<span id='next'>
			下一页
		</span>
	</div>
</template>

<script>
	export default {
		props: {
			maxPage: {
				type: Number,
				default: 1
			},
			curPage: {
				type: Number,
				default: 1
			}
		},
		created: function() {
			console.log(this.curPage);
		},
		methods: {
			changePage: function() {
				console.log('child');
				this.$emit('changePage');
			}
		}
	}
</script>

<style>
</style>