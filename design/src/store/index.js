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
		footerLinks: [],
		searchLists: [],
		articles: [],
		article: {},
		selfArticles: [],
		idEdit: false
	},
	getters,
	mutations,
	actions
});

export default store;