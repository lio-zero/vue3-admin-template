<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.prevent="handleScroll"
  >
    <slot></slot>
  </el-scrollbar>
</template>

<script setup lang="ts" name="ScrollPane">
const tagAndTagSpacing = 4
const scrollContainer = ref<HTMLElement | null>(null)
const scrollWrapper = computed(() => unref(scrollContainer)?.wrap$)
const emit = defineEmits(['scroll'])

const emitScroll = () => {
  emit('scroll')
}

onMounted(() => {
  unref(scrollWrapper).addEventListener('scroll', emitScroll, true)
})

onBeforeUnmount(() => {
  unref(scrollWrapper).removeEventListener('scroll', emitScroll)
})

const handleScroll = e => {
  const eventDelta = e.wheelDelta || -e.deltaY * 40
  const $scrollWrapper = unref(scrollWrapper)
  $scrollWrapper.scrollLeft = $scrollWrapper.scrollLeft + eventDelta / 4
}

const tags: any = inject('data')

const moveToTarget = currentTag => {
  const $container = unref(scrollContainer)?.wrap$.parentElement
  const $containerWidth = $container.offsetWidth
  const $scrollWrapper = unref(scrollWrapper)
  const tagList = tags.value

  let firstTag = null
  let lastTag = null
  // 查找第一个标记和最后一个标记
  if (tagList.length > 0) {
    firstTag = tagList[0].$el
    lastTag = tagList[tagList.length - 1].$el
  }
  if (firstTag === currentTag) {
    $scrollWrapper.scrollLeft = 0
  } else if (lastTag === currentTag) {
    $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth
  } else {
    // 找到 preTag 和 nextTag
    const currentIndex = tagList.findIndex(item => item === currentTag)
    const prevTag = tagList[currentIndex - 1]
    const nextTag = tagList[currentIndex + 1]
    // 标签在 nextTag 之后的 offsetLeft

    const afterNextTagOffsetLeft =
      nextTag.$el.offsetLeft + nextTag.$el.offsetWidth + tagAndTagSpacing
    // 标签在 prevTag 之前的 offsetLeft
    const beforePrevTagOffsetLeft = prevTag.$el.offsetLeft - tagAndTagSpacing
    if (afterNextTagOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
      $scrollWrapper.scrollLeft = afterNextTagOffsetLeft - $containerWidth
    } else if (beforePrevTagOffsetLeft < $scrollWrapper.scrollLeft) {
      $scrollWrapper.scrollLeft = beforePrevTagOffsetLeft
    }
  }
}

defineExpose({
  moveToTarget
})
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  :v-deep() {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 49px;
    }
  }
}
</style>
