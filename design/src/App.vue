<template>
	<div id='app'>
		<navbar></navbar>
		<div class='wrapper'>
		<router-view></router-view>
		<v-footer></v-footer>
		</div>
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