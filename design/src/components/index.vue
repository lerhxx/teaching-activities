<template>
	<div id='index'>
		<img class='in-cover' :src='img' />
		<div class='in-search'>
			<label>分类：</label>
			<select class='faculty'>
				<option v-for='faculty in faculties'>
					{{faculty}}
				</option>
			</select>
			<select class='type'>
				<option v-for='type in types'>
					{{type}}
				</option>
			</select>
			<select class='time'>
				<option v-for='time in timeliness'>
					{{time}}
				</option>
			</select>
		</div>
		<ul class='in-list'>
			<li class='in-list-item' v-for='item in items'>
				<img :src='item.url' />
				<h3>{{item.title}}</h3>
				<p>{{item.abs}}</p>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			 return {
			 	img: './src/imgs/cover-b.jpg',
			 	faculties: ['a','b','c'],
			 	types: ['d','e','f'],
			 	timeliness: ['g','h','i']
		    }
		}
	}
</script>

<style lang='sass'>
	$search-mar: 10px;
	.in-cover {
		width: 100%;
		height: 300px;
	}
	.in-search {
		padding: 10px;
		text-align: center;
		label {
			margin-right: $search-mar;
		}
		select {
			min-width: 80px;
			margin: 0 $search-mar;
		}
	}
</style>