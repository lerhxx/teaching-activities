import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import actions from './actions';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		footerLinks: [],
		searchLists: [],
		articles: []
	},
	mutations: {
		SET_FOOTER_LINKS(state, links) {
			state.footerLinks = links;
		},
		SET_SEARCH_LISTS(state, lists) {
			state.searchLists = lists;
		},
		SET_ARTICAL(state, lists) {
			state.articles = lists;
		}
	},
	getters: {},
	actions
});

export default store;