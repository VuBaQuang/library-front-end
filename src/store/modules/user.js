import {
  getInfo,
  login,
  changePassword,
  confirmUserEmail,
  sendEmailAgain,
  logout,
  register,
  checkExist,
  getAll,
  saveOrUpdate
} from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
// import axios from 'axios'
const getDefaultState = () => {
  return {
    user: {},
    token: getToken() || '',
    username: '',
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }
}
const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER: (state, user) => {
    state.user = user
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  }
}

const actions = {
  login({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      login(userInfo)
        .then(function(response) {
          const { data } = response.data
          commit('SET_TOKEN', data.token)
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        if (!response) {
          reject('Verification failed, please Login again.')
        }
        const { data } = response.data
        if (data.groups == null || data.groups.length === 0) {
          reject('Verification failed, please Login again.')
        }
        var roles = []
        for (var i = 0; i < data.groups.length; i++) {
          roles.push(data.groups[i].code)
          if (data.groups[i].roles !== null) { roles.push.apply(data.groups[i].roles.split(',')) }
        }
        data.roles = roles
        commit('SET_USER', data)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        commit('SET_ROLES', data.roles)
        commit('SET_NAME', data.name)
        commit('SET_USERNAME', data.username)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  sendEmailAgain({ commit }, form) {
    return new Promise((resolve, reject) => {
      sendEmailAgain(form)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  saveOrUpdate({ commit }, form) {
    return new Promise((resolve, reject) => {
      saveOrUpdate(form)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },

  confirmUserEmail({ commit, state, dispatch }, form) {
    return new Promise((resolve, reject) => {
      confirmUserEmail(form)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  checkExist({ commit, state, dispatch }, form) {
    return new Promise((resolve, reject) => {
      checkExist(form)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  getAll({ commit, state, dispatch }, user) {
    return new Promise((resolve, reject) => {
      getAll(user)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  },
  logout({ commit, state, dispatch }, user) {
    return new Promise((resolve, reject) => {
      logout(user).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()
        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })
        // next(`/login?redirect=${to.path}`)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  changePassword({ commit, state, dispatch }, user) {
    return new Promise((resolve, reject) => {
      changePassword(user).then(data => {
        if (data.message === 'Password invalid') {
          resolve(data)
        } else {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resetRouter()
          dispatch('tagsView/delAllViews', null, { root: true })
          resolve()
        }
      }).catch(error => {
        reject(error)
      })
    })
  },
  register({ commit, state, dispatch }, user) {
    return new Promise((resolve, reject) => {
      register(user).then(data => {
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'
    commit('SET_TOKEN', token)
    setToken(token)
    const { roles } = await dispatch('getInfo')
    resetRouter()
    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
