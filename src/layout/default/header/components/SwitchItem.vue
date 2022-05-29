<template>
  <div class="v-setting-switch-item">
    <span> {{ title }}</span>
    <el-switch
      v-bind="getBindValue"
      @change="handleChange"
      :disabled="disabled"
      inline-prompt
      active-text="开"
      inactive-text="关"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { HandlerEnum } from './enum'
import { baseHandler } from './handler'

const props = defineProps({
  event: {
    type: Number as PropType<HandlerEnum>
  },
  disabled: {
    type: Boolean
  },
  title: {
    type: String
  },
  def: {
    type: Boolean
  }
})

const getBindValue = computed(() => (props.def ? { value: props.def } : {}))

function handleChange(val) {
  props.event && baseHandler(props.event, val)
}
</script>

<style scoped></style>
