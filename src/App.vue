<script setup lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
</script>

<template>
  <!-- https://element-plus.org/en-US/guide/i18n.html#configprovider -->
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
