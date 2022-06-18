<template>
  <footer class="vzr-footer-container">
    <div class="vzr-footer_links">
      <Icon
        class="vzr-footer__github cursor-pointer"
        @click="openWindow(GITHUB_URL)"
        size="24"
        icon="ant-design:github-filled"
      />
    </div>
    <div>Copyright &copy;2020 vlio Admin</div>
  </footer>
</template>

<script setup lang="ts" name="Footer">
import { openWindow } from '@/utils'
import { GITHUB_URL } from '@/settings/siteSetting'
</script>

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
