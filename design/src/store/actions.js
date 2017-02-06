import axios from 'axios';

export default {
    GET_FOOTER_LINKS({commit}) {
        return axios.get('/getFooterLink')
            .then(res => { 
                commit('SET_FOOTER_LINKS', res.data);
            })
    },
    GET_SEARCH_LISTS({commit}) {
        return axios.get('/getSearchLists')
            .then(res => {
                commit('SET_SEARCH_LISTS', res.data);
            })
    },
    GET_ARTICALS({commit}) {
        return axios.get('/getArticals')
            .then(res => {
                commit('SET_ARTICAL', res.data);
            })
    }
}