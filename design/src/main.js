import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';

Vue.use(VueRouter);

const routes = [{
	path: '/', component: App
}];

const router = new VueRouter({
	routes: routes,
	linkActiveClass: 'active'
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');

// const app = new Vue({
// 	router,
// 	template: `
// 		<div id='app'>hello</div>
// 	`
// }).$mount('#app');

// let app = Vue.extend({});

// const router = new VueRouter();

// router.map({
// 	'/': {
// 		component: App
// 	}
// });

// router.start(app, '#app');