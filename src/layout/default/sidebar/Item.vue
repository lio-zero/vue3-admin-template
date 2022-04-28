<template>
  <Icon v-if="icon" :size="20" :icon="icon" />
  <span v-if="title">{{ title }}</span>
</template>

<script setup lang="ts">
defineProps({
  icon: String,
  title: String
})
</script>

<style scoped></style>
