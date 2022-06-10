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
<!-- <script>
import { useRoute, useRouter } from 'vue-router'

export default {
  setup(props) {
    const route = useRoute()
    const router = useRouter()

    const { params, query } = route
    const { path } = params
    console.log({ path: '/' + path, query })
    router.replace({ path: '/' + path, query })

    return () => h()
  }
}
</script> -->
