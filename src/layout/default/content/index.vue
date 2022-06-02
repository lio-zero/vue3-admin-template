<template>
  <main class="vzr-main-container dark:bg-[#111]">
    <router-view v-slot="{ Component }">
      <transition :name="fade" mode="out-in">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
  </main>
</template>

<script setup lang="ts">
const fade = ref('fade-transform')
</script>

<style scoped lang="scss">
.vzr-main-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
</style>
