import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		footerLinks: [],
		searchLists: [],
		articles: []
	},
	getters: {},
	mutations,
	actions
});

export default store;