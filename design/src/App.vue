<template>
	<div id='app'>
		<navbar></navbar>
		<router-view></router-view>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import Navbar from './components/nav.vue';
	import VFooter from './components/footer.vue';

	export default {
		components: {
			Navbar,
			VFooter
		}
	}
</script>

<style>
</style>