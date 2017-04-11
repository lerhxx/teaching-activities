import axios from 'axios'

export default {
  // 获取页脚信息
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
  // 获取首页文章类型
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
  // 获取首页学院信息
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
  // 获取首页教研室类型
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
  // 登录
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
  // TODO
  // 登出
  SIGNOUT({commit}, userInfo) {
    return axios.get('/signout', userInfo)
      .then(res => {
        if (res.data.state === 0) {
          commit('SET_USER', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  // 创建文章
  POST_ARTICLE({state}, form) {
    return axios.post(`/edit/create`, form)
      .then(res => {
        if(res.data.state === 0) {
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  // 修改文章
  UPDATE_ARTICLE({commit}, form) {
    return axios.put('/edit/modify', {form: form.form, id: form.id})
      .then(res => {
        if(res.data.state === 0) {
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  // 获取修改的文章
  GET_EDIT_ARTICLE({}, articleInfo) {
    return axios.get(`/edit/article/${articleInfo.id}`)
      .then(res => {
        if(res.data.state === 0) {
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  // 删除文章
  DELETE_ARTICLE({commit}, articleInfo) {
    return axios.delete(`/edit/delete/${articleInfo.id}`)
      .then(res => {
        if(res.data.state === 0) {
          // commit('UPDATE_SELF_ARTICLES', articleInfo.id);
          return Promise.resolve(res.data.msg);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  // 获取文章详情
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
  // 获取个人发布文章
  GET_SELF_ARTICLES({commit}, userInfo) {
    return axios.get(`/articles/user/${userInfo.id}`)
      .then(res => {
        commit('SET_SELF_ARTICLES', res.data.data);
      })
  },
  // 获取所有文章
  GET_ARTICLES({commit}, obj) {
    // console.log(obj)
    return axios.get('/articles/all', {params: obj})
      .then(res => {
        if (res.data.state === 0) {
          commit('SET_ARTICLES', res.data.data)
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  // 统计图表
  GET_CHARTS_DATA({commit}, info) {
    return axios.get(`/count/${info.id}/${info.tab}/${info.year}/${info.time}`).then(res => {
        if(res.data.state == 0) {
      // console.log(res.data.data)
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  // 获取当前用户个人信息
  GET_USER_INFO({commit}, userInfo) {
    return axios.get('/userManage/selfInfo', {params: {id: userInfo.id}})
      .then(res => {
        if(res.data.state === 0) {
          commit('SET_USER', res.data.data)
        }
      })
  },
  // 获取用户信息
  GET_USERS({commit}) {
    return axios.get('/userManage/info')
      .then(res => {
        if(res.data.state === 0) {
          commit('SET_USERS', res.data.data)
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  // 添加用户
  ADD_USER({commit}, form) {
    return axios.post('/userManage/add', form)
      .then(res => {
        if(res.data.state == 0) {
          return Promise.resolve(res.data);
        }else {
          return Promise.reject(res.data.msg);
        }
      })
  },
  // TODO
  // 修改用户
  MODIFY_PWD({commit}, info) {
    return axios.post(`/userManage/modify`, info)
      .then(res => {
        if(res.data.state == 0) {
          return Promise.resolve(res.data.msg);
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  // TODO
  // 删除用户
  DELETE_USER({commit}, info) {
    return axios.delete(`/userManage/delete/${info.id}`)
      .then(res => {
        if(res.data.state == 0) {
          return Promise.resolve(res.data.msg);
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  },
  // 获取统计单位可选项
  GET_UNIT_TEXT({commit}, info) {
    return axios.get('/unitText', {params: info})
      .then(res => {
        if(res.data.state == 0) {
          return Promise.resolve(res.data.data);
        }else {
          return Promise.reject(res.data.msg)
        }
      })
  }
}
