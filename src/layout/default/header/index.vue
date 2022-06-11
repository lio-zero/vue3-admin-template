<template>
  <div :class="['vzr-layout-multiple-header', { 'vzr-header-container--fixed': isFixed }]">
    <header class="vzr-header-container">
      <Hamburger
        id="hamburger-container"
        :is-active="getCollapsed"
        class="hamburger-container cursor-pointer"
        @toggle-click="toggleCollapsed"
      />
      <Breadcrumb class="breadcrumb-container flex-1" />

      <div class="right-menu">
        <Fullscreen v-if="getShowFullScreen" />

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
              <el-dropdown-item @click="layout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <Setting />
      </div>
    </header>
    <multiple-tabs />
  </div>
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
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import headerImg from '@/assets/logo.png'

const appStore = useAppStore()
const userStore = useUserStore()
const getUserInfo = computed(() => {
  const { avatar } = userStore.getUserInfo || {}
  return { avatar: avatar || headerImg }
})

const { getShowFullScreen } = useRootSetting()
const { getCollapsed, toggleCollapsed } = useMenuSetting()
const isFixed = computed(() => appStore.getHeaderSetting.fixed)

const layout = async () => {
  await userStore.logout(true)
  history.back()
}
</script>
