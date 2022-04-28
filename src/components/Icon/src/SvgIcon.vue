<template>
  <svg class="svg-icon-spin" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>
<script lang="ts" setup name="SvgIcon">
import type { CSSProperties } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  },
  spin: {
    type: Boolean,
    default: false
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)

const getStyle = computed((): CSSProperties => {
  const { size } = props

  let s = `${size}`
  s = `${s.replace('px', '')}px`
  return {
    width: s,
    height: s
  }
})
</script>
<style lang="scss" scoped name="SvgIcon">
.svg-icon-spin {
  display: inline-block;
  overflow: hidden;
  vertical-align: -0.15em;
  fill: currentColor;
}

.svg-icon-spin {
  animation: loadingCircle 1s infinite linear;
}
</style>
