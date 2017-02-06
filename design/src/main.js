import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './vues/index.vue';
import Navbar from './components/nav.vue';
import VFooter from './components/footer.vue';
import NotFound from './vues/404.vue';
import App from './App.vue';

Vue.use(VueRouter);

const routes = [{
	path: '/', component: Index
}, {
	path: '/404', component: NotFound
}];

const router = new VueRouter({
	routes: routes,
	linkActiveClass: 'active'
})

new Vue({
	router,
	components: {
		Navbar,
		VFooter
	},
	render: h => h(App)
}).$mount('#app');

