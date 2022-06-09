<template>
  <div :class="classObj" class="default-layout">
    <div
      v-if="device === 'mobile' && getCollapsed"
      class="drawer-bg"
      @click="handleClickOutside"
    ></div>
    <LayoutSidebar class="vzr-sidebar-container" />
    <div class="main-container">
      <div v-if="getHeaderFixed" style="height: 84px"></div>
      <LayoutHeader />
      <LayoutMain />
      <LayoutFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutSidebar from './sidebar/index.vue'
import LayoutHeader from './header/index.vue'
import LayoutMain from './content/index.vue'
import LayoutFooter from './footer/index.vue'
import { useAppStore } from '@/store/modules/app'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'

const { getHeaderFixed } = useHeaderSetting()
const { getCollapsed, getWithoutAnimation, setMenuSetting } = useMenuSetting()

const appStore = useAppStore()
const { body } = document
const WIDTH = 992
const device = computed(() => appStore.getDevice)

const classObj = computed(() => {
  return {
    hideSidebar: unref(getCollapsed),
    openSidebar: !unref(getCollapsed),
    withoutAnimation: unref(getWithoutAnimation),
    mobile: unref(device) === 'mobile'
  }
})

const handleFullWidthSizing = () => {
  const scrollbarWidth = window.innerWidth - document.body.clientWidth

  document.querySelector('body')!.style.width = `calc(100vw - ${scrollbarWidth}px)`
}

const handleClickOutside = () =>
  setMenuSetting({
    collapsed: false,
    withoutAnimation: false
  })

const isMobile = () => {
  const rect = body.getBoundingClientRect()
  return rect.width - 1 < WIDTH
}

const resizeHandler = () => {
  if (!document.hidden) {
    appStore.toggleDevice(isMobile() ? 'mobile' : 'desktop')

    if (isMobile()) {
      setMenuSetting({
        collapsed: false,
        withoutAnimation: true
      })
    }
  }
}

onMounted(() => {
  handleFullWidthSizing()
  if (isMobile()) {
    appStore.toggleDevice('mobile')
    setMenuSetting({
      collapsed: false,
      withoutAnimation: true
    })
  }
})

onBeforeMount(() => {
  window.addEventListener('resize', resizeHandler)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style lang="scss" scoped>
.default-layout {
  height: 100%;
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .main-container {
    position: relative;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    margin-left: 210px;
    transition: margin-left 0.28s;
    background: var(--c-gray-bg);

    .vzr-footer-container {
      margin-top: auto;
    }
  }
}
</style>
