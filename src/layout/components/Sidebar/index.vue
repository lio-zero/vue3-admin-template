<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :unique-opened="false"
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
  </el-aside>
</template>

<script setup lang="ts">
import { Ref, ref, toRaw, computed } from 'vue'
import { useRoute } from 'vue-router'
import { routes } from '@/router/index.ts'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.module.scss'

const route = useRoute()

const activeMenu = computed(() => {
  const route = useRoute()
  const { meta, path } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

console.log(activeMenu.value)

// const menu: Ref<object[]> = ref([
//   {
//     title: '首页',
//     icon: route.meta.icon,
//     menuItem: [
//       {
//         title: 'Option 1',
//         link: '/home'
//       },
//       {
//         title: 'Option 2',
//         link: '/home'
//       }
//     ]
//   }
// ])
</script>

<style scoped></style>
