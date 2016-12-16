<template>
	<div id='app'>
		<navbar></navbar>
	</div>
</template>


<script>
	import Navbar from './components/nav.vue'
	export default {
		name: 'app',
		data() {
			return {
				msg: 'hello'
			}
		},
		components: {
			Navbar
		}
	}
</script>