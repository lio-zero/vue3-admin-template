<script setup lang="ts" name="Dashboard">
const { x, y } = useMouse()
</script>

<template>
  <div>
    <h3>Mouse: {{ x }} x {{ y }}</h3>
  </div>
</template>
