<template>
  <div :class="classObj" class="default-layout">
    <div
      v-if="getDevice === 'mobile' && getCollapsed"
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
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useMenuSetting } from '@/hooks/setting/useMenuSetting'
import { useResize } from './resize'

const { getHeaderFixed } = useHeaderSetting()
const { getDevice, getCollapsed, getWithoutAnimation, handleClickOutside } = useMenuSetting()

const classObj = computed(() => {
  return {
    hideSidebar: !unref(getCollapsed),
    openSidebar: unref(getCollapsed),
    withoutAnimation: unref(getWithoutAnimation),
    mobile: unref(getDevice) === 'mobile'
  }
})

useResize()
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
    background: var(--c-gray-bg);
    transition: margin-left 0.28s, background-color var(--el-transition-duration),
      color var(--el-transition-duration) !important;

    .vzr-footer-container {
      margin-top: auto;
    }
  }
}
</style>
