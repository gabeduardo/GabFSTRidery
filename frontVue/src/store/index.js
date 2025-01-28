import { createStore } from 'vuex'

export default createStore({
  state: {
    token: localStorage.getItem('jwtToken') || '',
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
    },
    clearToken: (state) => {
      state.token = ''
    },
  },
  actions: {
    login({ commit }, token) {
      localStorage.setItem('jwtToken', token)
      commit('setToken', token)
    },
    logout({ commit }) {
      localStorage.removeItem('jwtToken')
      commit('clearToken')
    },
  },
})
