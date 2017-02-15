import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../pages/index.vue';
import NotFound from '../pages/404.vue';
import SignIn from '../pages/signin.vue';
import Edit from '../pages/edit.vue';

const routes = [{
	path: '/', component: Index, name: 'index'
}, {
	path: '/index', component: Index, name: 'index1'
}, {
	path: '/signin', component: SignIn, name: 'signin'
}, {
	path: '/article', component: SignIn, name: 'article'
},{
	path: '/edit/:id', name: 'edit',
	redirect: to => {
		const {hash, params, query} = to;
		if(params.id) {
			return '/user/edit/' + params.id;
		}else {
			return {name: 'signin'}
		}
	}
}, {
	path: '/user/edit/:id', component: Edit
}, {
	path: '*', redirect: '/'
}];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
	routes: routes,
	linkActiveClass: 'active'
})