import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
  isShow: false,
  showUserIcon: false,
  userData: {},
  messageList: [],
  currentPage: 0,
  currentUser: {},
  currentMessage: {},
  headbgcolor: '',
  tab: '精选'
}

const getters = {
  isShowside (state) {
    return state.isShow
  },
  isShowUserIcon (state) {
    return state.showUserIcon
  },
  getUserData (state) {
    return state.userData
  },
  getMessageList (state) {
    return state.messageList
  },
  getCurrentMessage (state) {
    return state.currentMessage
  },
  getCurrentUser (state) {
    return state.currentUser
  },
  getCurrent (state) {
    return state.currentPage
  },
  getTab (state) {
    return state.tab
  },
  getHeadbgcolor (state) {
    return state.headbgcolor
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
    state.userData = {}
  },
  setUserData (state, user) {
    state.userData = user
  },
  setMessageList (state, messageList) {
    state.messageList = messageList
  },
  addMessageList (state, message) {
    state.messageList.push(message)
  },
  setCurrent (state, currentPage) {
    state.currentPage = currentPage
  },
  setTab (state, tab) {
    state.tab = tab
  },
  setCurrentMessage (state, message) {
    state.currentMessage = message
  },
  setCurrentUser (state, user) {
    state.currentUser = user
  },
  setHeadbgcolor (state, color) {
    state.headbgcolor = color
  },
  addPraiseMessage (state, praiseList) {
    state.userData.praiseList = praiseList
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
