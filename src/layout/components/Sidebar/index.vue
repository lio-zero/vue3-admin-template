<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :collapse-transition="false"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import { Ref, ref, toRaw, computed } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/router/index.ts'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'
import { useStore } from 'vuex'

const route = useRoute()
const store = useStore()

const activeMenu = computed(() => {
  const route = useRoute()
  const { meta, path } = route

  // 如果设置路径，侧栏将突出显示您设置的路径
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const isCollapse = computed(() => store.state.opened)
</script>

<style lang="scss" scoped>
::v-deep .el-submenu,
::v-deep .el-menu-item {
  .svg-icon {
    font-size: 20px;
    margin-right: 10px;
    vertical-align: -0.25em;
    transition: all 0.3s;
  }
  &:hover > .svg-icon,
  .el-submenu__title:hover > .svg-icon {
    transform: scale(1.2);
  }
}
</style>
