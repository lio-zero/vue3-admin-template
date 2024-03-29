<script setup lang="ts">
import { resolve } from 'path-browserify'
import AppLink from './Link.vue'
import type { Menu } from '@/router/types'
import { isExternal } from '@/utils/is'

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: '',
  },
})

const onlyOneChild = ref<Nullable<Menu>>(null)

const hasOneShowingChild = (children = [], parent: any) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false
    }
    else {
      // 临时设置（如果只有一个显示子项，则将使用）
      onlyOneChild.value = item
      return true
    }
  })
  // 当只有一个子路由器时，默认情况下显示子路由
  if (showingChildren.length === 1)
    return true

  // 如果没有要显示的子路由器，则显示父路由
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}

const resolvePath = (routePath: any) => {
  if (isExternal(routePath))
    return routePath

  if (isExternal(props.basePath))
    return props.basePath

  return resolve(props.basePath, routePath)
}
</script>

<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item)
          && (!onlyOneChild?.children || onlyOneChild?.noShowingChildren)
          && !item.alwaysShow
      "
    >
      <AppLink v-if="onlyOneChild?.meta" :to="resolvePath(onlyOneChild?.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild?.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <Icon
            v-if="onlyOneChild?.meta.icon"
            :size="20"
            :icon="onlyOneChild?.meta.icon || (item.meta && item.meta.icon)"
          />
          <template #title>
            <span v-if="onlyOneChild?.meta && onlyOneChild?.meta.title">
              {{ onlyOneChild?.meta.title }}
            </span>
          </template>
        </el-menu-item>
      </AppLink>
    </template>

    <el-sub-menu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template #title>
        <Icon v-if="item.meta && item.meta.icon" :size="20" :icon="item.meta && item.meta.icon" />
        <span v-if="item.meta.title">{{ item.meta.title }}</span>
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
