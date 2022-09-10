<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div aria-label="Toggle Theme" class="nav-btn" @click="toggleDark()">
    <div class="cursor-pointer right-menu-item">
      <Icon v-show="isDark" size="20" icon="ri:moon-fill" />
      <Icon v-show="!isDark" size="20" icon="ri:sun-fill" />
    </div>
  </div>
</template>
