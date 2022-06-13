<template>
  <div ref="tagArea" id="tags-view-container" class="tags-view-container">
    <ScrollPane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        ref="tag"
        v-for="tagItem in getVisitedViews"
        :key="tagItem.path"
        :to="{ path: tagItem.path, query: tagItem.query, fullPath: tagItem.fullPath }"
        v-slot="{ navigate }"
        class="tags-view-item"
        :class="isActive(tagItem) ? 'active' : ''"
        @click.middle="!isAffix(tagItem) ? closeSelectedTag(tagItem, selectedTag) : ''"
        @contextmenu.prevent="openMenu(tagItem, $event)"
      >
        <span @click="navigate" @keypress.enter="navigate" role="link">
          {{ tagItem.title }}
          <el-icon v-if="!isAffix(tagItem)" class="align-sub">
            <Close
              v-show="isActive(tagItem)"
              class="el-icon-close"
              @click.prevent.stop="closeSelectedTag(tagItem, selectedTag)"
            />
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

<script lang="ts" setup name="Tab">
import ScrollPane from './ScrollPane.vue'
import { useRoute } from 'vue-router'
import { useTabSetting } from '@/hooks/setting/useTabSetting'

import { useTabDropdown, dropMenuList } from './useTabDropdown'

const route = useRoute()

const top = ref(0)
const menuLeft = ref(0)
const visible = ref(false)
const tag = ref<HTMLElement | null>(null)
const scrollPane = ref<HTMLElement | null>(null)
const tagArea = ref<HTMLDivElement | null>(null)
let selectedTag = ref({})

const { getVisitedViews } = useTabSetting()
const { addTags, isActive, isAffix, moveToCurrentTag, closeSelectedTag, handleMenuEvent } =
  useTabDropdown(tag, scrollPane)

const handleClickMenu = (item: any) => {
  handleMenuEvent(item, unref(selectedTag))
}

provide('data', tag)

watch(route, () => {
  addTags()
  moveToCurrentTag()
})

watch(visible, value => {
  if (value) {
    document.body.addEventListener('click', closeMenu)
  } else {
    document.body.removeEventListener('click', closeMenu)
  }
})

const openMenu = (tag, e) => {
  const menuMinWidth = 205

  const offsetLeft = unref(tagArea)!.getBoundingClientRect().left // container 左边距
  const offsetWidth = unref(tagArea)!.offsetWidth // container 宽度
  const maxLeft = offsetWidth - menuMinWidth // 左边界
  const left = e.clientX - offsetLeft + 15 // 15: margin right

  if (left > maxLeft) {
    menuLeft.value = maxLeft
  } else {
    menuLeft.value = left
  }

  top.value = e.clientY
  visible.value = true
  selectedTag.value = tag
}

const closeMenu = () => {
  visible.value = false
}
</script>

<style lang="scss" scoped>
.tags-view-container {
  height: 34px;
  width: 100%;
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-divider);
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
      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        background-color: #1890ff;
        color: #fff;
        border-color: #1890ff;
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

<style lang="scss">
// reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        transform: scale(1.2);
      }
    }
    &:hover .el-icon-close {
      display: inline-block !important;
    }
  }
}
</style>
