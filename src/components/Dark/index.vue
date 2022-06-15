<template>
  <div aria-label="Toggle Theme" class="nav-btn" @click="toggleDark()">
    <div class="cursor-pointer right-menu-item">
      <Icon size="20" icon="ri:moon-fill" v-show="isDark" />
      <Icon size="20" icon="ri:sun-fill" v-show="!isDark" />
    </div>
  </div>
</template>

<script setup lang="ts">
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
