<script setup lang="ts">
import { isExternal as isExt } from '@/utils/is'
const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})

const isExternal = computed(() => isExt(props.to))
const type = computed(() => {
  if (isExternal.value)
    return 'a'

  return 'router-link'
})

const linkProps = (to: string) => {
  if (isExternal.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener',
    }
  }
  return { to }
}
</script>

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>
