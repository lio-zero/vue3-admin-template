<script lang="ts" setup name="Tab">
import type { RouteLocationNormalized } from 'vue-router'
import ScrollPane from './ScrollPane.vue'
import { dropMenuList, useTabDropdown } from './useTabDropdown'
import { useTabSetting } from '@/hooks/setting/useTabSetting'

const route = useRoute()

const top = ref(0)
const menuLeft = ref(0)
const visible = ref(false)
const tag = ref<HTMLElement | null>(null)
const scrollPane = ref<ComponentRef>(null)
const tagArea = ref<ElRef>(null)
const selectedTag = ref<Nullable<RouteLocationNormalized>>(null)

const { getVisitedViews } = useTabSetting()
const { addTags, isActive, isAffix, moveToCurrentTag, closeSelectedTag, handleMenuEvent }
  = useTabDropdown(tag, scrollPane)

const handleClickMenu = (item) => {
  handleMenuEvent(item, unref(selectedTag) as any)
}

const closeMenu = () => {
  visible.value = false
}

provide('data', tag)

watch(route, () => {
  addTags()
  moveToCurrentTag()
})

watch(visible, (value) => {
  if (value)
    document.body.addEventListener('click', closeMenu)
  else
    document.body.removeEventListener('click', closeMenu)
})

const openMenu = (tag, e) => {
  const menuMinWidth = 205

  const offsetLeft = unref(tagArea)!.getBoundingClientRect().left // container 左边距
  const offsetWidth = unref(tagArea)!.offsetWidth // container 宽度
  const maxLeft = offsetWidth - menuMinWidth // 左边界
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft)
    menuLeft.value = maxLeft
  else
    menuLeft.value = left

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}
</script>

<template>
  <div id="tags-view-container" ref="tagArea" class="tags-view-container">
    <ScrollPane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        v-for="tagItem in getVisitedViews"
        ref="tag"
        :key="tagItem.path"
        v-slot="{ navigate }"
        :to="{ path: tagItem.path, query: tagItem.query, fullPath: tagItem.fullPath }"
        class="tags-view-item"
        :class="isActive(tagItem) ? 'active' : ''"
        @click.middle="!isAffix(tagItem) ? closeSelectedTag(tagItem) : ''"
        @contextmenu.prevent="openMenu(tagItem, $event)"
      >
        <span role="link" @click="navigate" @keypress.enter="navigate">
          {{ tagItem.title }}
          <el-icon v-if="!isAffix(tagItem)" class="align-sub el-icon-close">
            <Close @click.prevent.stop="closeSelectedTag(tagItem)" />
          </el-icon>
        </span>
      </router-link>
    </ScrollPane>

    <ul
      v-show="visible"
      :style="{ left: `${menuLeft}px`, top: `${top}px` }"
      class="el-dropdown-link contextmenu"
    >
      <li v-for="item in dropMenuList" :key="item.icon" @click="handleClickMenu(item)">
        <el-icon :size="18" class="align-top">
          <Icon size="18" :icon="item.icon" />
        </el-icon>
        <span class="ml-1 align-top"> {{ item.text }} </span>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-divider);
  transition: background-color var(--el-transition-duration) !important;

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;
      transition: padding var(--el-transition-duration)
        var(--el-transition-function-ease-in-out-bezier);

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        border-color: #1890ff;
        color: #fff;
        background-color: #1890ff;

        & .el-icon-close {
          width: 16px;
        }

        &::before {
          content: '';
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 8px;
        }
      }

      &:hover .el-icon-close {
        width: 16px;
      }

      .el-icon-close {
        position: relative;
        right: -2px;
        width: 0;
        height: 16px;
        overflow: hidden;
        vertical-align: -2px;
        text-align: center;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transform-origin: 100% 50%;

        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    width: 160px;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
