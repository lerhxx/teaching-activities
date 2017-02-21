import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../pages/index.vue';
import NotFound from '../pages/404.vue';
import SignIn from '../pages/signin.vue';
import Edit from '../pages/edit.vue';
import Article from '../pages/article.vue';
import Personal from '../pages/personal.vue';
import PerArticle from '../components/per-article.vue';
import Count from '../components/count.vue';

const routes = [{
	path: '/', component: Index, name: 'index'
}, {
	path: '/index', component: Index, name: 'index1'
}, {
	path: '/signin', component: SignIn, name: 'signin'
}, {
	path: '/article/:id', component: Article, name: 'article',
}, {
	path: '/article/:artId/edit', component: Edit, name: 'articleEdit',
	
}, {
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
	path: '/user/edit/:id', component: Edit, name: 'userEdit'
}, {
	path: '/pervalidate/:id', name: 'perValidate',
	redirect: to => {
		const {hash, params, query} = to;
		if(params.id) {
			return '/personal/' + params.id + '/article';
		}else {
			return '/signin';
		}
	}
}, {
	path: '/personal/:id', component: Personal, name: 'personal',
	children: [{
		path: 'article',
		component: PerArticle
	}, {
		path: 'count',
		component: Count
	}]
}, {
	path: '*', redirect: '/'
}];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
	routes: routes,
	linkActiveClass: 'active'
})