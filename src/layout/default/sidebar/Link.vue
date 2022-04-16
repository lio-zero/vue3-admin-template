<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { isExternal as isExt } from '@/utils/validate'
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})
const isExternal = computed(() => isExt(props.to))
// type是一个计算属性
const type = computed(() => {
  if (isExternal.value) {
    return 'a'
  }
  return 'router-link'
})
const linkProps = (to: string) => {
  if (isExternal.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return { to }
}
</script>
