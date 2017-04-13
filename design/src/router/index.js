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
import Statistics from '../pages/statistics.vue';
import Chart from '../components/chart.vue';
import Form from '../components/form.vue';
import Modify from '../components/modifyPwd.vue';
import Comments from '../components/comment.vue';
import {get} from '../assets/cookieUtil';

const routes = [{
	path: '/', component: Index, name: 'index'
}, {
	path: '/index', component: Index, name: 'index1'
}, {
	path: '/signin', component: SignIn, name: 'signin'
},  {
	path: '/article', component: Article, name: 'article',
}, {
	path: '/user/modify/:artId', component: Edit, name: 'articleEdit',
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
			return '/user/edit/';
		}else {
			return {name: 'signin'}
		}
	}
}, {
	path: '/user/edit', component: Edit, name: 'userEdit'
}, 
 {
	path: '/personal/:id', component: Personal, name: 'personal',
	children: [{
		path: 'article',
		component: PerArticle,
		name: 'article'
	}, {
		path: 'modify',
		component: Modify,
		name: 'modify'
	}]
}, {
	path: '/manage/user', component: User, name: 'user'
}, {
	path: '/statistics/:id', component: Statistics, name: 'statistics',
	children: [{
		path: 'charts',
		component: Chart,
		name: 'chart'
	}, {
		path: 'form',
		component: Form,
		name: 'form'
	}]
}, {
	path: '/notfound', component: NotFound, name: 'notfound'
}, {
	path: '/comments', component: Comments, name: 'comment'
}, {
	path: '*', redirect: '/'
}];

Vue.use(VueRouter);

export default new VueRouter({
    mode: 'history',
	routes: routes,
	linkActiveClass: 'active'
})