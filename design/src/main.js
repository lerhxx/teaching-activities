import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

// Vue.use(VueRouter);

// const routes = [{
// 	path: '/', component: App
// }];

// const router = new VueRouter({
// 	routes: routes,
// 	linkActiveClass: 'active'
// })

// new Vue({
// 	router,
// 	render: h => h(App)
// }).$mount('#app');



const routes = {
	'/': App
}

new Vue({
	el: '#app',
	data: {
		currentRoute: window.location.pathname
	},
	computed: {
		ViewComponent() {
			return routes[this.currentRoute] || NotFound
		}
	},
	render(h) {
		return h(this.ViewComponent);
	}
})