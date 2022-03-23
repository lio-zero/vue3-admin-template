// vuex common.js
const common = {
  state: {
    isCollapse: false
  },
  mutations: {
    // 折叠侧边栏
    TOGGLE_SIDEBAR(state: { isCollapse: boolean }) {
      state.isCollapse = !state.isCollapse
    }
  },
  actions: {
    toggleSidebar({ commit }: any) {
      commit('TOGGLE_SIDEBAR')
    }
  }
}

export default common //eslint disable next line
