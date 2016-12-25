import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from './pages/index.vue';
import Navbar from './components/nav.vue';
import VFooter from './components/footer.vue';
import NotFound from './pages/404.vue';
import App from './App.vue';
import SignIn from './pages/signin.vue';
import './css/common.styl';

Vue.use(VueRouter);

const routes = [{
	path: '/', component: Index, name: 'index'
}, {
	path: '/404', component: NotFound, name: '404'
},{
	path: '/signin', component: SignIn, name: 'signin'
},{
	path: '/article', component: SignIn, name: 'article'
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

