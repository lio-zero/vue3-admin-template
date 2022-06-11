<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const { params, query } = useRoute()
const { replace } = useRouter()
const { path } = params

replace({ path: '/' + path, query })
</script>
