<template>
  <main class="vzr-main-container">
    <!-- 内部应该显示子路由页面信息 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.vzr-main-container {
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
</style>
