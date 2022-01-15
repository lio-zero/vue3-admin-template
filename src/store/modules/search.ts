const state = {
  image: false,
  changeSearch: false,
  changeBody: false
}

const mutations = {
  SET_IMAGE(state, newVal) {
    state.image = newVal
  },
  SET_SEARCH(state, newVal) {
    state.changeSearch = newVal
  },
  SET_BODY(state, newVal) {
    state.changeBody = newVal
  }
}

export default {
  state,
  mutations
}
