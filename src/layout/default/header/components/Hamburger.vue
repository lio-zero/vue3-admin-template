<script setup lang="ts">
defineProps({
  isActive: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggleClick'])
const toggleClick = () => emit('toggleClick')
</script>

<template>
  <div class="nav-btn hamburger" @click="toggleClick">
    <el-icon :size="20">
      <Expand v-show="isActive" />
      <Fold v-show="!isActive" />
    </el-icon>
  </div>
</template>

<style lang="scss" scoped>
.hamburger {
  padding: 0 10px;
  transition: color var(--el-transition-duration);
}
</style>
