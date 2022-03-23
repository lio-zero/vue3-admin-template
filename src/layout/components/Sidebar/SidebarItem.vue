<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <el-icon :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
          <template #title>
            <span v-if="onlyOneChild.meta && onlyOneChild.meta.title">
              {{ onlyOneChild.meta.title }}
            </span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import AppLink from './Link.vue'
// @ts-ignore
import Item from './Item.tsx'
// @ts-ignore
import ElIcon from './ElIcon.tsx'
import { isExternal } from '@/utils/validate'
import { resolve } from 'path-browserify'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild: any = ref(null)

const hasOneShowingChild = (children = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    } else {
      // 临时设置（如果只有一个显示子项，则将使用）
      onlyOneChild.value = item
      return true
    }
  })
  // 当只有一个子路由器时，默认情况下显示子路由
  if (showingChildren.length === 1) {
    return true
  }
  // 如果没有要显示的子路由器，则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}
const resolvePath = (routePath: any) => {
  if (isExternal(routePath)) {
    return routePath
  }

  if (isExternal(props.basePath)) {
    return props.basePath
  }

  return resolve(props.basePath, routePath)
}
</script>

<style scoped>
.sub-el-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
