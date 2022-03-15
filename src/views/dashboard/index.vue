<template>
  <div>
    <a href="https://tailwindcss.com/" target="_blank">tailwindcss</a>
    <h3>Mouse: {{ x }} x {{ y }}</h3>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import { useMouse, useCounter, useTitle } from '@vueuse/core'
const { x, y } = useMouse()
</script>

<style scoped></style>
