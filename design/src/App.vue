<template>
	<div id='app'>
		
		<router-view></router-view>
		
	</div>
</template>


<script>
	import Navbar from './components/nav.vue';
	import VFooter from './components/footer.vue';

	export default {
		name: 'app',
		data() {
			return {
				msg: 'hello'
			}
		},
		components: {
			Navbar,
			VFooter
		}
	}
</script>