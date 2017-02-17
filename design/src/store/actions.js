import axios from 'axios'

export default {
  GET_FOOTER_LINKS({commit}) {
    return axios.get('/getFooterLink')
      .then(res => {
        if (res.data.state === 0) {
          commit('SET_FOOTER_LINKS', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  GET_SEARCH_LISTS({commit}) {
    console.log('ok')
    return axios.get('/getSearchLists')
      .then(res => {
        if (res.data.state === 0) {
          commit('SET_SEARCH_LISTS', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  GET_ARTICLES({commit}) {
    return axios.get('/getArticals')
      .then(res => {
        if (res.data.state === 0) {
          commit('SET_ARTICLES', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  GET_ARTICLE({commit}, params) {
    return axios.get(`/article/${params.id}`)
      .then(res => {
        if (res.data.state === 2 || res.data.state === 1) {
          return Promise.reject(res.data.msg)
        }else if (res.data.state === 0) {
          console.log(res.data.data[0].content)
          commit('SET_ARTICLE', res.data.data[0])
        }
      })
  },
  SIGNIN({commit}, userInfo) {
    return axios.put('/signin', userInfo)
      .then(res => {
        if (res.data.state === 0) {
          commit('SET_USER', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  GET_USER_INFO({commit}, userInfo) {

    return axios.get('/user', {params: {id: userInfo.id}})
      .then(res => {
        if(res.data.state === 0) {
          commit('SET_USER', res.data.data)
        }
      })
  },
  GET_SELF_ARTICLES({commit}, userInfo) {
    return axios.get(`/user/${userInfo.id}/articles`)
      .then(res => {

        commit('SET_SELF_ARTICLES', res.data.data);
      })
  },
  POST_ARTICLE({state}, form) {
    return axios.post(`/user/edit/${state.userId}`, form).then(res => {
        if(res.data.state === 0) {
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  }
}
