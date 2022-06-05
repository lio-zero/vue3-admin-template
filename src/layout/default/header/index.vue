<template>
  <div :class="['vzr-layout-multiple-header', { 'vzr-header-container--fixed': isFixed }]">
    <header class="vzr-header-container">
      <hamburger
        id="hamburger-container"
        :is-active="opened"
        class="hamburger-container cursor-pointer"
        @toggle-click="toggleSideBar"
      />
      <breadcrumb class="breadcrumb-container flex-1" />

      <div class="right-menu">
        <Fullscreen v-if="showFullScreen" />

        <Dark />

        <MessageBox />

        <el-dropdown class="avatar-container">
          <div class="avatar-wrapper cursor-pointer">
            <el-avatar shape="square" :src="getUserInfo.avatar" />
            <i class="el-icon-caret-bottom"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
              <router-link to="/">
                <el-dropdown-item>首页</el-dropdown-item>
              </router-link>
              <a target="_blank" href="https://github.com/lio-zero/vite-wj">
                <el-dropdown-item>我的 Github</el-dropdown-item>
              </a>
              <el-dropdown-item @click="layout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <Setting />
      </div>
    </header>
  </div>
  <multiple-tabs />
</template>
<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue'
import Hamburger from './components/Hamburger.vue'
import Fullscreen from './components/Fullscreen.vue'
import MessageBox from './components/MessageBox.vue'
import MultipleTabs from '../tabs/index.vue'
import Setting from './components/Setting.vue'
import { Dark } from '@/components/Dark'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import headerImg from '@/assets/logo.png'

const appStore = useAppStore()
const userStore = useUserStore()
const getUserInfo = computed(() => {
  const { avatar } = userStore.getUserInfo || {}
  return { avatar: avatar || headerImg }
})

const opened = computed(() => appStore.getProjectConfig.sidebar.opened)
const isFixed = computed(() => appStore.getHeaderSetting.fixed)

const toggleSideBar = () =>
  appStore.setProjectConfig({
    sidebar: {
      opened: !unref(opened),
      withoutAnimation: false
    }
  })

const showFullScreen = computed(() => appStore.getProjectConfig.showFullScreen)

const layout = async () => {
  await userStore.logout()
  history.back()
}
</script>

<style lang="scss" scoped></style>
