<template>
  <svg-icon v-if="icon" :name="icon" class="sub-el-icon" />
  <span v-if="title">{{ title }}</span>
</template>

<script setup lang="ts">
defineProps<{ title: string; icon?: string }>()
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
