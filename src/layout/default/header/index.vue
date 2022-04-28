<template>
  <header class="vzr-header-container flex items-center">
    <hamburger
      id="hamburger-container"
      :is-active="opened"
      class="hamburger-container cursor-pointer"
      @toggle-click="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container flex-1" />

    <div class="right-menu">
      <el-tooltip v-if="showFullScreen" effect="dark" :content="getTitle" placement="bottom">
        <div class="right-menu-item cursor-pointer" @click="toggle">
          <SvgIcon v-if="!isFullscreen" size="18" name="maximize" />
          <SvgIcon v-else size="18" name="minimize" />
        </div>
      </el-tooltip>

      <el-tooltip effect="dark" content="消息" placement="bottom">
        <el-badge class="right-menu-item cursor-pointer" is-dot>
          <SvgIcon size="18" name="bell" />
        </el-badge>
      </el-tooltip>

      <el-dropdown class="avatar-container">
        <div class="avatar-wrapper cursor-pointer">
          <el-avatar shape="square" :src="userStore.userInfo.avatar" />
          <i class="el-icon-caret-bottom"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu class="user-dropdown">
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <a target="_blank" href="https://github.com/lio-zero/vite-wj">
              <el-dropdown-item>我的Github</el-dropdown-item>
            </a>
            <el-dropdown-item @click="layout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-tooltip effect="dark" content="设置" placement="bottom">
        <div class="right-menu-item cursor-pointer" @click="toggleSetting">
          <SvgIcon class="vzr-setting-hover" size="18" name="settings" />
        </div>
      </el-tooltip>
    </div>
  </header>
  <Tabs name="O.O" />

  <el-drawer v-model="openSetting" title="项目配置" @close="toggleSetting" size="330px">
    <div class="v-drawer-body">
      <el-divider> 界面显示 </el-divider>
      <div class="v-setting-switch-item">
        <span>全屏内容</span>
        <el-switch v-model="showFullScreen" inline-prompt active-text="是" inactive-text="否" />
      </div>
      <div class="v-setting-switch-item">
        <span>Logo</span>
        <el-switch v-model="showLogo" inline-prompt active-text="是" inactive-text="否" />
      </div>
    </div>
  </el-drawer>
</template>
<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import Tabs from '../tabs/index.vue'

const { toggle, isFullscreen } = useFullscreen()
const appStore = useAppStore()
const userStore = useUserStore()

const opened = computed(() => appStore.getProjectConfig.sidebar.opened)
const toggleSideBar = () =>
  appStore.setProjectConfig({
    sidebar: {
      opened: !unref(opened),
      withoutAnimation: false
    }
  })

const layout = async () => {
  await userStore.logout()
  history.back()
}

const getTitle = computed(() => (unref(isFullscreen) ? '退出全屏' : '全屏'))
const showFullScreen = computed({
  get() {
    return appStore.getProjectConfig.showFullScreen
  },
  set(value: boolean) {
    appStore.setProjectConfig({ showFullScreen: value })
  }
})
const showLogo = computed({
  get() {
    return appStore.getProjectConfig.showLogo
  },
  set(value: boolean) {
    appStore.setProjectConfig({ showLogo: value })
  }
})

const openSetting = computed({
  get() {
    return appStore.getProjectConfig.openSetting
  },
  set() {}
})

const toggleSetting = () =>
  appStore.setProjectConfig({
    openSetting: !unref(openSetting)
  })
</script>
<style lang="scss" scoped>
.vzr-header-container {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 0;

  .hamburger-container {
    height: 100%;
    line-height: 46px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    div:hover {
      background-color: #f6f6f6;
    }
    &:focus {
      outline: none;
    }
    .vzr-setting-hover {
      transition: transform 0.3s ease-out;
      &:hover {
        transform: rotateZ(-90deg);
      }
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 10px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;
        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }
    .avatar-container {
      padding-left: 10px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}

:v-deep(.el-badge__content) {
  top: 16px;
  right: 10px;
}

.v-drawer-body {
  font-size: 14px;
  word-wrap: break-word;

  .v-setting-switch-item {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;
  }
}
</style>
