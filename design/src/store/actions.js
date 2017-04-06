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
  GET_TYPE_LISTS({commit}) {
    return axios.get('/getTypeLists')
      .then(res => {
        if (res.data.state === 0) {
          commit('SET_TYPE_LISTS', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  GET_ACADEMY_LISTS({commit}) {
    return axios.get('/getAcademyLists')
      .then(res => {
        if (res.data.state === 0) {
          commit('SET_ACADEMY_LISTS', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  GET_FACULTIES({commit}, info) {
    return axios.get(`/getFacultiesLists/${info.academy}`)
      .then(res => {
        if(res.data.state === 0) {
          commit('SET_FACULTIES', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  GET_ARTICLES({commit}, obj) {
    // console.log(obj)
    return axios.get('/getArticals', {params: obj})
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
          commit('SET_ARTICLE', res.data.data)
        }
      })
  },
  SIGNIN({commit}, userInfo) {
    return axios.post('/signin', userInfo)
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
  GET_EDIT_ARTICLE({}, articleInfo) {
    return axios.get(`/article/${articleInfo.id}/edit`)
      .then(res => {
        if(res.data.state === 0) {
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  POST_ARTICLE({state}, form) {
    return axios.post(`/user/edit/${state.userId}`, form)
      .then(res => {
        if(res.data.state === 0) {
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  UPDATE_ARTICLE({commit}, form) {
    return axios.put('/user/edit/${state.userId}', {form: form.form, id: form.id})
      .then(res => {
        if(res.data.state === 0) {
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  DELETE_ARTICLE({commit}, articleInfo) {
    return axios.delete(`/article/${articleInfo.id}`)
      .then(res => {
        if(res.data.state === 0) {
          commit('UPDATE_SELF_ARTICLES', articleInfo.id);
          return Promise.resolve(res.data.msg);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  GET_USERS({commit}) {
    return axios.get('/user/info')
      .then(res => {
        if(res.data.state === 0) {
          commit('SET_USERS', res.data.data)
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  GET_CHARTS_DATA({commit}, info) {
    return axios.get(`/user/count/${info.id}/${info.tab}/${info.year}/${info.time}`).then(res => {
        if(res.data.state == 0) {
      // console.log(res.data.data)
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  ADD_USER({commit}, form) {
    return axios.post('/user/addUser', form)
      .then(res => {
        if(res.data.state == 0) {
          return Promise.resolve(res.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  MODIFY_PWD({commit}, info) {
    return axios.post(`/modify`, info)
      .then(res => {
        if(res.data.state == 0) {
          return Promise.resolve(res.data.msg);
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  }
}
