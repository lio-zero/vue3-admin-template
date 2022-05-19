<template>
  <div class="nav-btn setting">
    <el-tooltip effect="dark" content="设置" placement="bottom">
      <div class="right-menu-item cursor-pointer" @click="toggleSetting">
        <SvgIcon class="vzr-setting-hover" size="20" name="settings" />
      </div>
    </el-tooltip>
  </div>

  <el-drawer v-model="openSetting" title="项目配置" @close="toggleSetting" size="330px">
    <div class="v-drawer-body">
      <el-divider> 界面显示 </el-divider>
      <div class="v-setting-switch-item">
        <span>全屏内容</span>
        <el-switch v-model="showFullScreen" inline-prompt active-text="是" inactive-text="否" />
      </div>
      <div class="v-setting-switch-item">
        <span>Logo</span>
        <el-switch v-model="showLogo" inline-prompt active-text="是" inactive-text="否" />
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
const openSetting = computed(() => appStore.getProjectConfig.openSetting)

const showLogo = computed({
  get() {
    return appStore.getProjectConfig.showLogo
  },
  set(value: boolean) {
    appStore.setProjectConfig({ showLogo: value })
  }
})

const showFullScreen = computed({
  get() {
    return appStore.getProjectConfig.showFullScreen
  },
  set(value: boolean) {
    appStore.setProjectConfig({ showFullScreen: value })
  }
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
