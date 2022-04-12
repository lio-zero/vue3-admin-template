<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <sidebar-component class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarComponent from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const { body } = document
const WIDTH = 992 // 参考 Bootstrap 的响应式设计
const device = computed(() => appStore.getDevice)
const sidebar = computed(() => appStore.getProjectConfig.sidebar)

const classObj = computed(() => {
  return {
    hideSidebar: !sidebar.value.opened,
    openSidebar: sidebar.value.opened,
    withoutAnimation: sidebar.value.withoutAnimation,
    mobile: unref(device) === 'mobile'
  }
})

const handleFullWidthSizing = () => {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth

  document.querySelector('body')!.style.width = `calc(100vw - ${scrollbarWidth}px)`
}

const handleClickOutside = () =>
  appStore.setProjectConfig({
    sidebar: {
      opened: false
    }
  })

const isMobile = () => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}

const resizeHandler = () => {
  if (!document.hidden) {
    appStore.toggleDevice(isMobile() ? 'mobile' : 'desktop')

    if (isMobile()) {
      appStore.setProjectConfig({
        sidebar: {
          opened: true
        }
      })
    }
  }
}

onMounted(() => {
  handleFullWidthSizing()
  if (isMobile()) {
    appStore.toggleDevice('mobile')
    appStore.setProjectConfig({
      sidebar: {
        opened: true
      }
    })
  }
})

onBeforeMount(() => {
  window.removeEventListener('resize', resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})

onBeforeMount(() => {
  window.addEventListener('resize', resizeHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  min-height: 100%;
  margin-left: 210px;
  transition: margin-left 0.28s;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
</style>
