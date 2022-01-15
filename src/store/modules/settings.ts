import variables from '@/styles/element-variables.scss'
import defaultSettings from '@/settings'
import defaultTheme from '@/styles/_variables.scss'

const {
  menuBg,
  menuText,
  menuActiveText,
  menuHover,
  subMenuActiveText,
  subMenuBg,
  subMenuHover
} = defaultTheme
const {
  showSettings,
  tagsView,
  fixedHeader,
  websiteLogo,
  showFullScreen,
  forwardAndBackward,
  search,
  darkMode,
  refresh
} = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  tagsView: tagsView,
  fixedHeader: fixedHeader,
  websiteLogo: websiteLogo,
  showFullScreen: showFullScreen,
  forwardAndBackward: forwardAndBackward,
  search: search,
  darkMode: darkMode,
  refresh: refresh,
  themes: {
    menuBg,
    menuText,
    menuActiveText,
    menuHover,
    subMenuActiveText,
    subMenuBg,
    subMenuHover,
    label: '默认主题'
  }
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  CHANGE_THEME_SETTING: (
    state,
    [
      menuBg,
      menuText,
      menuActiveText,
      menuHover,
      subMenuActiveText,
      subMenuBg,
      subMenuHover
    ]
  ) => {
    state.themes = {
      menuBg,
      menuText,
      menuActiveText,
      menuHover,
      subMenuActiveText,
      subMenuBg,
      subMenuHover
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  changeThemesSetting({ commit }, data) {
    commit('CHANGE_THEME_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
