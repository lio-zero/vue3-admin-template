<template>
  <div class="dashboard">
    <grow-card :loading="loading" class="enter-y" />
    <site-analysis class="!my-4 enter-y" :loading="loading" />
    <div class="md:flex enter-y">
      <sales-product-pie class="md:w-1/3 w-full" :loading="loading" />
      <visit-radar class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" :loading="loading" />
      <visit-source class="md:w-1/3 w-full" :loading="loading" />
    </div>
  </div>
</template>

<script setup lang="ts" name="Dashboard">
import SiteAnalysis from './component/SiteAnalysis.vue'
import GrowCard from './component/GrowCard.vue'
import SalesProductPie from './component/SalesProductPie.vue'
import VisitRadar from './component/VisitRadar.vue'
import VisitSource from './component/VisitSource.vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 1500)
</script>
