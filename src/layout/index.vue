<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device === 'mobile' && sidebar.opened"> -->
    <sidebar-component class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import SidebarComponent from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
// const { body } = document
// const WIDTH = 992 // 参考Bootstrap的响应式设计
// const subMenu = ref()

// const fixBugIniOS = () => {
//   const $subMenu = subMenu
//   if ($subMenu) {
//     const handleMouseleave = $subMenu.handleMouseleave
//     $subMenu.handleMouseleave = e => {
//       if (this.device === 'mobile') {
//         return
//       }
//       handleMouseleave(e)
//     }
//   }
// }

const device = computed(() => store.state.device)
const sidebar = computed(() => store.state.sidebar)
const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: device.value === 'mobile'
  }
})

// onMounted(() => {
//   const isMobile = $_isMobile()
//   if (isMobile) {
//     store.dispatch('toggleDevice', 'mobile')
//     store.dispatch('closeSideBar', { withoutAnimation: true })
//   }
// })

// const $_isMobile = () => {
//   const rect = body.getBoundingClientRect()
//   return rect.width - 1 < WIDTH
// }

// onBeforeMount(() => {
//   window.addEventListener('resize', $_resizeHandler)
// })
// onBeforeUnmount(() => {
//   window.removeEventListener('resize', $_resizeHandler)
// })

// const $_resizeHandler = () => {
//   if (!document.hidden) {
//     const isMobile = $_isMobile()
//     store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

//     if (isMobile) {
//       store.dispatch('closeSideBar', { withoutAnimation: true })
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  min-height: 100%;
  margin-left: 210px;
  transition: margin-left 0.28s;
}
</style>
