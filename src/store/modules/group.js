import { getAll } from '@/api/group'
// import {} from '@/utils/auth'
// import router, { } from '@/router'
// import axios from 'axios'
const state = {
  valueOfFilterByGroup: []
}

const mutations = {
  SET_VALUE_OF_FILTER_BY_GROUP: (state, valueOfFilterByGroup) => {
    state.valueOfFilterByGroup = JSON.parse(JSON.stringify(valueOfFilterByGroup))
  }
}

const actions = {
  setValueOfFilterByGroup({ commit }, valueOfFilterByGroup) {
    return new Promise(resolve => {
      commit('SET_VALUE_OF_FILTER_BY_GROUP', valueOfFilterByGroup)
      resolve()
    })
  },
  getAll({ commit, state, dispatch }, group) {
    return new Promise((resolve, reject) => {
      getAll(group)
        .then(function(response) {
          resolve(response)
        })
        .catch(function(error) {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
