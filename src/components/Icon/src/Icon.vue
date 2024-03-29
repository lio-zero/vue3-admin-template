<script lang="ts" setup name="Icon">
import type { CSSProperties, PropType } from 'vue'

import Iconify from '@purge-icons/generated'
import { isString } from '@/utils/is'
import { propTypes } from '@/utils/propTypes'

const props = defineProps({
  // icon name
  icon: propTypes.string,
  // icon color
  color: propTypes.string,
  // icon size
  size: {
    type: [String, Number] as PropType<string | number>,
    default: 16,
  },
  spin: propTypes.bool.def(false),
  prefix: propTypes.string.def(''),
})
const SVG_END_WITH_FLAG = '|svg'
const elRef = ref<ElRef>(null)

const isSvgIcon = computed(() => props.icon?.endsWith(SVG_END_WITH_FLAG))
const getSvgIcon = computed(() => props.icon.replace(SVG_END_WITH_FLAG, ''))
const getIconRef = computed(() => `${props.prefix ? `${props.prefix}:` : ''}${props.icon}`)

const update = async () => {
  if (unref(isSvgIcon))
    return

  const el = unref(elRef)
  if (!el)
    return

  await nextTick()
  const icon = unref(getIconRef)
  if (!icon)
    return

  const svg = Iconify.renderSVG(icon, {})

  if (svg) {
    el.textContent = ''
    el.appendChild(svg)
  }
  else {
    const span = document.createElement('span')
    span.className = 'iconify'
    span.dataset.icon = icon
    el.textContent = ''
    el.appendChild(span)
  }
}

const getWrapStyle = computed((): CSSProperties => {
  const { size, color } = props
  let fs = size
  if (isString(size))
    fs = parseInt(size, 10)

  return {
    fontSize: `${fs}px`,
    color,
    display: 'inline-flex',
  }
})

watch(() => props.icon, update, { flush: 'post' })

onMounted(update)
</script>

<template>
  <SvgIcon v-if="isSvgIcon" :size="size" :name="getSvgIcon" />
  <el-icon v-else>
    <span ref="elRef" class="app-iconify" :style="getWrapStyle" />
  </el-icon>
</template>

<style lang="scss">
.app-iconify {
  display: inline-block;

  &-spin {
    svg {
      animation: loadingCircle 1s infinite linear;
    }
  }
}

span.iconify {
  display: block;
  min-width: 1em;
  min-height: 1em;
  border-radius: 100%;
}
</style>
