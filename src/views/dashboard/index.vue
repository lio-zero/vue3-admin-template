<!--
 * @Author: your name
 * @Date: 2021-12-19 20:34:57
 * @LastEditTime: 2022-03-22 16:29:22
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vite-wj\src\views\dashboard\index.vue
-->
<template>
  <div>
    <h3>Mouse: {{ x }} x {{ y }}</h3>
    <el-icon><add-location /></el-icon>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import { useMouse } from '@vueuse/core'
const { x, y } = useMouse()
</script>

<style scoped></style>
