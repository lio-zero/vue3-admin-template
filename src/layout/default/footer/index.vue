<template>
  <footer class="vzr-footer-container">
    <div class="vzr-footer_links">
      <SvgIcon
        class="vzr-footer__github cursor-pointer"
        @click="openWindow(GITHUB_URL)"
        size="18"
        name="github"
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
  color: #d9d9d9;
  text-align: center;
  .vzr-footer__github {
    margin: 0 30px;

    &:hover {
      color: var(--c-text);
    }
  }
}
</style>
