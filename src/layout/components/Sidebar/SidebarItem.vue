<template>
  <div v-if="!item.hidden"></div>
  <template
    v-if="
      hasOneShowingChild(item.children, item) &&
      (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
      !item.alwaysShow
    "
  >
    <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)">
        <item
          :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
          :title="onlyOneChild.meta.title"
        />
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
  <!-- <el-sub-menu :index="index + '1'" v-for="(item, index) in menu" :key="item.title">
    <template #title>
      <item :title="item.title" :icon="item.icon" />
    </template>
    <el-menu-item-group v-for="(sub_item, sub_index) in item.menuItem" :key="sub_item.title">
      <router-link :to="sub_item.link">
        <el-menu-item :index="`${index + 1}-${sub_index + 1}` + ''">
          {{ sub_item.title }}
        </el-menu-item>
      </router-link>
    </el-menu-item-group>
  </el-sub-menu> -->
</template>

<script setup lang="ts">
import AppLink from './Link.vue'
import Item from './Item.vue'
import { ref, defineProps } from 'vue'
import { isExternal } from '@/utils/validate'
import { resolve } from 'path-browserify'

const props = defineProps({
  // route object
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

const onlyOneChild = ref(null)
const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })
  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }
  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noShowingChildren: true }
    return true
  }
  return false
}
const resolvePath = routePath => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return resolve(props.basePath, routePath)
}
</script>

<style scoped></style>
