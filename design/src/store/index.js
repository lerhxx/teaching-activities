import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import actions from './actions';
import mutations from './mutations';
import getters from './getter';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		userId: '',
		userRank: 0,
		userFaculty: '',
		users: [],
		footerLinks: [],
		typesLists: [],
		academyList: [],
		facultiesList: [],
		articles: [],
		article: {},
		articleTotal: 0,
		noMoreArticle: false, 
		selfArticles: [],
		idEdit: false
	},
	getters,
	mutations,
	actions
});

export default store;