import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../pages/index.vue';
import NotFound from '../pages/404.vue';
import SignIn from '../pages/signin.vue';
import Edit from '../pages/edit.vue';
import Article from '../pages/article.vue';
import Personal from '../pages/personal.vue';
import User from '../pages/user.vue';
import PerArticle from '../components/per-article.vue';
import Count from '../components/count.vue';
import {get} from '../assets/cookieUtil';

const routes = [{
	path: '/', component: Index, name: 'index'
}, {
	path: '/index', component: Index, name: 'index1'
}, {
	path: '/signin', component: SignIn, name: 'signin'
},  {
	path: '/article/:id', component: Article, name: 'article',
}, {
	path: '/article/:artId/edit', component: Edit, name: 'articleEdit',
}, {
	path: '/main', name: 'main',
	redirect: to => {
		const {hash, params, query} = to;
		let user = get('user');
		if(user) {
			return '/personal/' + user + '/article';
		}else {
			return {name: 'signin'}
		}
	}
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
			return '/personal/' + params.id + '/count';
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
	path: '/manage/user', component: User, name: 'user'
}, {
	path: '/notfound', component: NotFound, name: 'notfound'
}, {
	path: '*', redirect: '/'
}];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
	routes: routes,
	linkActiveClass: 'active'
})