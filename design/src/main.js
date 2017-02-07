import Vue from 'vue';
import store from './store';
import Navbar from './components/nav.vue';
import VFooter from './components/footer.vue';
import App from './App.vue';
import './css/common.styl';
import router from './router'

new Vue({
	router,
	store,
	components: {
		Navbar,
		VFooter
	},
	render: h => h(App)
}).$mount('#app');