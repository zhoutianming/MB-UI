import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  isShow: false,
  showUserIcon: false
}

const getters = {
  isShowside (state) {
    return state.isShow
  },
  isShowUserIcon (state) {
    return state.showUserIcon
  }
}

const mutations = {
  showBar (state) {
    state.isShow = true
  },
  hideBar (state) {
    state.isShow = false
  },
  showIcon (state) {
    state.showUserIcon = true
  },
  hideIcon (state) {
    state.showUserIcon = false
  }
}

const actions = {
  showSideBar ({ commit }) {
    commit('showBar')
  },
  hideSideBar ({ commit }) {
    commit('hideBar')
  },
  login ({ commit }) {
    commit('showIcon')
  },
  logout ({ commit }) {
    commit('hideIcon')
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
