<template>
  <div aria-label="Toggle Theme" class="nav-btn" @click="toggle">
    <el-tooltip effect="dark" :content="getTitle" placement="bottom">
      <div class="right-menu-item cursor-pointer">
        <SvgIcon v-if="!isFullscreen" size="20" name="maximize" />
        <SvgIcon v-else size="20" name="minimize" />
      </div>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
const { toggle, isFullscreen } = useFullscreen()

const getTitle = computed(() => (unref(isFullscreen) ? '退出全屏' : '全屏'))
</script>

<style scoped></style>
