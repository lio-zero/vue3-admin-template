<template>
  <section class="app-main">
    <!-- 内部应该显示子路由页面信息 -->
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <!-- <transition :name="name" mode="out-in">
      <router-view />
    </transition> -->
  </section>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
// const name = ref('el-fade-in')
</script>

<style scoped lang="scss">
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 20px;
}
</style>
