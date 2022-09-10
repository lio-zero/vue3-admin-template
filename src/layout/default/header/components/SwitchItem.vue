<script setup lang="ts">
import type { PropType } from 'vue'
import type { HandlerEnum } from '../enum'
import { baseHandler } from '../handler'

const props = defineProps({
  event: {
    type: Number as PropType<HandlerEnum>,
  },
  disabled: {
    type: Boolean,
  },
  title: {
    type: String,
  },
  def: {
    type: Boolean,
  },
})

const getBindValue = computed(() => (props.def ? { value: props.def } : {}))

function handleChange(val) {
  props.event && baseHandler(props.event, val)
}
</script>

<template>
  <div class="v-setting-switch-item">
    <span> {{ title }}</span>
    <el-switch
      v-bind="getBindValue"
      :disabled="disabled"
      inline-prompt
      active-text="开"
      inactive-text="关"
      @change="handleChange"
    />
  </div>
</template>
