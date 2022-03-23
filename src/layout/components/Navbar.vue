<template>
  <div class="navbar flex items-center">
    <hamburger
      id="hamburger-container"
      :is-active="opened"
      class="hamburger-container cursor-pointer"
      @toggle-click="toggleSideBar"
    />
    <breadcrumb class="breadcrumb-container flex-1"></breadcrumb>

    <div class="right-menu">
      <el-tooltip effect="dark" content="消息" placement="bottom">
        <el-badge class="right-menu-item cursor-pointer" is-dot>
          <el-icon size="20"><bell /></el-icon>
        </el-badge>
      </el-tooltip>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper cursor-pointer">
          <el-avatar shape="square" :src="store.state.avatar"></el-avatar>
          <i class="el-icon-caret-bottom" />
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
    </div>
  </div>
</template>
<script setup lang="ts">
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from '@/components/Hamburger/index.vue'
import { useStore } from 'vuex'

const store = useStore()
const opened = computed(() => store.state.sidebar.opened)

const toggleSideBar = () => store.dispatch('toggleSideBar')

const layout = async () => {
  await store.dispatch('logout')
  history.back()
}
</script>
<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0;

  .hamburger-container {
    height: 100%;
    line-height: 46px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      padding: 0 16px;
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
      margin-right: 30px;
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
</style>
