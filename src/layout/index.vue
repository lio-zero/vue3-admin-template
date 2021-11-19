<template>
  <el-container>
    <sidebar />
    <el-container class="is-vertical">
      <navbar />
      <app-main />
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
</script>

<style scoped></style>
