<template>
  <svg-icon v-if="icon" :name="icon" class="sub-el-icon" />
  <span v-if="title">{{ title }}</span>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>

<script lang="ts">
import { h, resolveComponent } from 'vue'
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      default: ''
    }
  },
  setup(props, { slots }) {
    console.log(slots)

    return () =>
      h('', {}, [
        h(resolveComponent('svg-icon'), {
          name: props.icon,
          class: 'sub-el-icon'
        }),
        h('span', {}, slots.title())
      ])
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
