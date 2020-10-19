import { getAll, saveOrUpdate, deletes } from '@/api/book'
// import {} from '@/utils/auth'
// import router, { } from '@/router'
// import axios from 'axios'
const state = {

}

const mutations = {

}

const actions = {
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
  },
  deletes({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      deletes(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveOrUpdate({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      saveOrUpdate(data).then(response => {
        resolve(response)
      }).catch(error => {
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
