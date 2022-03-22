<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <el-menu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      :background-color="variables.menuBg"
      :active-text-color="variables.menuActiveText"
      :text-color="variables.menuText"
      mode="vertical"
    >
      <sidebar-item
        v-for="item in routes"
        :key="item.path"
        :item="item"
        :base-path="item.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { routes } from '@/router/index.ts'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'
import { useStore } from 'vuex'
console.log(routes)

const route = useRoute()
const store = useStore()

// const routes = store.state.routes
const activeMenu: any = computed(() => {
  const { meta, path } = route

  // 如果设置路径，侧栏将突出显示您设置的路径
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse = computed(() => !store.state.sidebar.opened)
</script>

<style lang="scss" scoped>
:v-deep(.el-sub-menu),
:v-deep(.el-menu-item) {
  .el-icon {
    font-size: 20px;
    margin-right: 10px;
    vertical-align: -0.25em;
    transition: all 0.3s;
  }
  &:hover > .el-icon,
  .el-sub-menu__title:hover > .el-icon {
    transform: scale(1.2);
  }
}
</style>
