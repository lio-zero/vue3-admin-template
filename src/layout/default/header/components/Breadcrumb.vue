<script setup lang="ts">
import { compile } from 'path-to-regexp'

const levelList: any = ref(null)
const router = useRouter()
const route = useRoute()

const isDashboard = (route: any) => {
  const name = route && route.name
  if (!name)
    return false

  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const getBreadcrumb = () => {
  // 1 一个数组，包含当前路由的所有嵌套路径片段的路由记录
  // 2 一个路由匹配到的所有路由记录会暴露为 $route 对象 (还有在导航守卫中的路由对象) 的 $route.matched 数组
  // 仅显示带有 meta.title 的路由
  let matched: any = route.matched.filter(item => item.meta && item.meta.title)
  const first: any = matched[0]

  if (!isDashboard(first))
    matched = [{ path: '/dashboard', meta: { title: '首页' } }].concat(matched)

  // 拿到路由元信息 meta 中的存在的 title
  levelList.value = matched.filter(
    (item: any) => item.meta && item.meta.title && item.meta.breadcrumb !== false,
  )
}

const pathCompile = (path: string) => {
  const toPath = compile(path)
  return toPath(route.params)
}

const handleLink = (item: { redirect: string; path: string }) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(pathCompile(path))
}

getBreadcrumb()
watch(route, getBreadcrumb)
</script>

<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index === levelList.length - 1"
          class="no-redirect"
        >
          {{ item.meta.title }}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
