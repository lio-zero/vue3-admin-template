<template>
  <section class="vzr-main-container">
    <router-view>
      <template #default="{ Component, route }">
        <transition :name="fade" mode="out-in" appear>
          <keep-alive :include="getCaches">
            <component :is="Component" :key="route.fullPath" />
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </section>
</template>

<script setup lang="ts">
import { useTabStore } from '@/store/modules/tabView'

const fade = ref('fade-transform')

const tabStore = useTabStore()
const getCaches = computed(() => tabStore.getCachedViews)
</script>

<style scoped lang="scss">
.vzr-main-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
</style>
