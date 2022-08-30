<template>
  <div class="nav-btn setting">
    <el-tooltip effect="dark" content="设置" placement="bottom">
      <div class="right-menu-item cursor-pointer" @click="toggleSetting">
        <Icon size="20" icon="ci:settings-filled" />
      </div>
    </el-tooltip>
  </div>

  <el-drawer v-model="openSetting" title="项目配置" size="330px" @close="toggleSetting">
    <div class="v-drawer-body">
      <el-divider> 界面功能 </el-divider>
      <switch-item title="固定 header" :event="HandlerEnum.HEADER_FIXED" :def="getHeaderFixed" />

      <el-divider> 界面显示 </el-divider>
      <switch-item title="全屏内容" :event="HandlerEnum.FULL_CONTENT" :def="getShowFullScreen" />
      <switch-item title="Logo" :event="HandlerEnum.SHOW_LOGO" :def="getShowLogo" />
      <switch-item title="灰色模式" :event="HandlerEnum.GRAY_MODE" :def="getGrayMode" />
      <switch-item title="色弱模式" :event="HandlerEnum.COLOR_WEAK" :def="getColorWeak" />

      <el-divider> 动画 </el-divider>
      <switch-item title="顶部进度条" :event="HandlerEnum.OPEN_PROGRESS" :def="getOpenNProgress" />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { HandlerEnum } from '../enum'
import SwitchItem from './SwitchItem.vue'
import { useRootSetting } from '@/hooks/setting/useRootSetting'
import { useHeaderSetting } from '@/hooks/setting/useHeaderSetting'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'

const appStore = useAppStore()
const { getHeaderFixed } = useHeaderSetting()
const { getShowLogo, getShowFullScreen, getColorWeak, getGrayMode } = useRootSetting()
const { getOpenNProgress } = useTransitionSetting()

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
