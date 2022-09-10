<script setup lang="ts">
const { params, query } = useRoute()
const { replace } = useRouter()
const { path } = params

replace({ path: `/${path}`, query })
</script>

<template>
  <div />
</template>
