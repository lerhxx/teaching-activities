<template>
	<div>
		<div class='group-con'>封面</div>
		<h1>活动标题</h1>
		<div class='group-con'>
			<label>举办时间：</label>
			<span>2016-01-01</span>
		</div>
		<div class='group-con'>
			<label>举办地点：</label>
			<span>xxx</span>
		</div>
		<div class='group-con'>
			<label>举办单位：</label>
			<span></span>
		</div>
		<div class='group-con'>
			<label>举办目的：</label>
			<span></span>
		</div>
		<div class='group-con'>
			<label>举办内容：</label>
			<p></p>
		</div>
		<div class='group-con'>
			<label>附加说明：</label>
			<p></p>
		</div>
		<div class='group-con'>
			<!--<a v-link:>附件</a>-->
		</div>
	</div>
</template>

<script>
	export default {
		created() {
			console.log(location.pathname);
			
		}
	}
</script>