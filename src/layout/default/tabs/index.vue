<template>
  <div>{{ name }}</div>
</template>
<script lang="ts" setup name="tabs">
defineProps({
  name: String
})
defineEmits(['handleClick'])
</script>
<style></style>
