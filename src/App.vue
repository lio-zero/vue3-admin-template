<template>
  <el-config-provider :locale="locale"> </el-config-provider>
  <router-view />
</template>

<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
const locale = zhCn
</script>

<style scoped></style>
