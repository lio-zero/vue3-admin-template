<template>
  <div :class="{ 'has-logo': getShowLogo }">
    <logo v-if="getShowLogo" :collapse="!getCollapsed" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!getCollapsed"
        :unique-opened="false"
        :collapse-transition="false"
        :background-color="variables.menuBg"
        :active-text-color="variables.menuActiveText"
        :text-color="variables.menuText"
        mode="vertical"
      >
        <sidebar-item v-for="item in routes" :key="item.path" :item="item" :base-path="item.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import SidebarItem from './SidebarItem.vue'
import Logo from './Logo.vue'
import variables from '@/styles/variables.module.scss'
import { routes } from '@/router/index'
import { useRoute } from 'vue-router'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useRootSetting } from '@/hooks/setting/useRootSetting'

const route = useRoute()
const { getCollapsed } = useMenuSetting()
const { getShowLogo } = useRootSetting()

const activeMenu: any = computed(() => {
  const { meta, path } = route

  // 如果设置路径，侧栏将突出显示您设置的路径
  if (meta.activeMenu) return meta.activeMenu
  return path
})
</script>

<style lang="scss" scoped>
::v-deep(.el-sub-menu),
::v-deep(.el-menu-item) {
  .el-icon {
    vertical-align: -0.25em;
    transition: all 0.3s;
  }
  &:hover > .el-icon,
  .el-sub-menu__title:hover > .el-icon {
    transform: scale(1.2);
  }
}
</style>
