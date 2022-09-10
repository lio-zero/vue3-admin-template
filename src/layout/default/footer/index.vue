<script setup lang="ts" name="Footer">
import { openWindow } from '@/utils'
import { GITHUB_URL } from '@/settings/siteSetting'
</script>

<template>
  <footer class="vzr-footer-container">
    <div class="vzr-footer_links">
      <Icon
        class="vzr-footer__github cursor-pointer"
        size="24"
        icon="ant-design:github-filled"
        @click="openWindow(GITHUB_URL)"
      />
    </div>
    <div>Copyright &copy;2020 vue3-admin-template</div>
  </footer>
</template>

<style lang="scss" scoped>
.vzr-footer-container {
  width: 100%;
  padding: 20px;
  color: var(--c-text-2);
  text-align: center;

  .vzr-footer__github {
    margin: 0 30px;
    transition: color 0.3s;

    &:hover {
      color: var(--c-text);
      transition: color 0.25s;
    }
  }
}
</style>
