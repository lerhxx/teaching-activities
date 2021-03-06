import Vue from 'vue';
import store from './store';
import Navbar from './components/nav.vue';
import VFooter from './components/footer.vue';
import Main from './Main.vue';
import './css/common.styl';
import router from './router'

new Vue({
	router,
	store,
	components: {
		VFooter
	},
	render: h => h(Main)
}).$mount('#app');