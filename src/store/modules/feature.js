import { findAll, find, deletes, saveOrUpdate } from '@/api/feature'

const state = {

}

const mutations = {

}

const actions = {

  findAll({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      findAll(data).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  find({ commit, state, dispatch }, data) {
    return new Promise((resolve, reject) => {
      find(data).then(response => {
        resolve(response)
      }).catch(error => {
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
