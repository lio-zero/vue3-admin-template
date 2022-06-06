<template>
  <div ref="tagArea" id="tags-view-container" class="tags-view-container">
    <ScrollPane ref="scrollPane" class="tags-view-wrapper">
      <router-link
        ref="tag"
        v-for="tagItem in visitedViews"
        :key="tagItem.path"
        :to="{ path: tagItem.path, query: tagItem.query, fullPath: tagItem.fullPath }"
        v-slot="{ navigate }"
        class="tags-view-item"
        :class="isActive(tagItem) ? 'active' : ''"
        @click.middle="!isAffix(tagItem) ? closeSelectedTag(tagItem) : ''"
        @contextmenu.prevent="openMenu(tagItem, $event)"
      >
        <span @click="navigate" @keypress.enter="navigate" role="link">
          {{ tagItem.title }}
          <el-icon v-if="!isAffix(tagItem)" class="align-sub">
            <Close class="el-icon-close" @click.prevent.stop="closeSelectedTag(tagItem)" />
          </el-icon>
        </span>
      </router-link>
    </ScrollPane>

    <ul v-show="visible" :style="{ left: `${menuLeft}px`, top: `${top}px` }" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        <el-icon :size="18" class="align-middle">
          <RefreshRight />
        </el-icon>
        <span class="align-middle"> 重新加载 </span>
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <el-icon :size="18" class="align-middle">
          <Close />
        </el-icon>
        <span class="align-middle"> 关闭标签页 </span>
      </li>
      <li class="border-t-1" @click="closeOthersTags">
        <el-icon :size="18" class="align-middle">
          <Icon size="20" icon="dashicons:align-center" />
        </el-icon>
        <span class="align-middle"> 关闭其他标签页 </span>
      </li>
      <li @click="closeAllTags(selectedTag)">
        <el-icon :size="18" class="align-middle">
          <Icon size="20" icon="clarity:minus-line" />
        </el-icon>
        <span class="align-middle"> 关闭全部标签页 </span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup name="Tab">
import ScrollPane from './ScrollPane.vue'
import path from 'path'
import { useRoute, useRouter } from 'vue-router'
import { routes } from '@/router/index'
import { useTabStore } from '@/store/modules/tab'

const route = useRoute()
const router = useRouter()
const tabStore = useTabStore()

const visible = ref(false)
const top = ref(0)
const menuLeft = ref(0)
let selectedTag = ref({})
const tag = ref<HTMLElement | null>(null)
const scrollPane = ref<HTMLElement | null>(null)
const tagArea = ref<HTMLDivElement | null>(null)
let affixTags = ref([])

const visitedViews = computed(() => tabStore.getVisitedViews)

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

provide('data', tag)

onMounted(() => {
  initTags()
  addTags()
})

const isActive = routes => routes.path === route.path
const isAffix = tag => tag.meta && tag.meta.affix
const filterAffixTags = (routes, basePath = '/') => {
  let tags: any = []

  routes.forEach(route => {
    if (route.meta && route.meta.fixed) {
      const tagPath = path.resolve(basePath, route.path)
      tags.push({
        fullPath: tagPath,
        path: tagPath,
        name: route.name,
        meta: { ...route.meta }
      })
    }
    if (route.children) {
      const tempTags = filterAffixTags(route.children, route.path)
      if (tempTags.length >= 1) {
        tags = [...tags, ...tempTags]
      }
    }
  })
  return tags
}

const initTags = () => {
  const _affixTags = (affixTags.value = filterAffixTags(unref(routes)))
  for (const tag of _affixTags) {
    // 必须有标记名
    if (tag.name) {
      tabStore.addVisitedView(tag)
    }
  }
}

const addTags = () => {
  const { name } = route
  if (name) {
    tabStore.addView(route)
  }
  return false
}

const moveToCurrentTag = () => {
  nextTick(() => {
    for (const item of unref(tag)) {
      if (item.to.path === route.path) {
        unref(scrollPane)?.moveToTarget(item.$el)
        // 当查询不同时，则更新
        if (item.to.fullPath !== route.fullPath) {
          tabStore.updateVisitedView(route)
        }
        break
      }
    }
  })
}

const refreshSelectedTag = view => {
  tabStore.delCachedView(view).then(() => {
    const { fullPath } = view
    nextTick(() => {
      router.replace({
        path: '/redirect' + fullPath
      })
    })
  })
}

const closeSelectedTag = view => {
  tabStore.delView(view).then(({ visitedViews }) => {
    if (isActive(view)) {
      toLastView(visitedViews, view)
    }
  })
}

const closeOthersTags = () => {
  router.push(unref(selectedTag))
  tabStore.delOthersViews(unref(selectedTag)).then(() => {
    moveToCurrentTag()
  })
}

const closeAllTags = view => {
  tabStore.delAllViews().then(({ visitedViews }) => {
    if (unref(affixTags).some((tag: any) => tag.path === view.path)) {
      return
    }
    toLastView(visitedViews, view)
  })
}
const toLastView = (visitedViews, view) => {
  const latestView = visitedViews.slice(-1)[0]
  if (latestView) {
    router.push(latestView.fullPath)
  } else {
    // 如果没有标记视图，默认情况下会重定向到主页，
    // 你可以根据需要调整。
    if (view.name === 'Dashboard') {
      // 重新加载主页
      router.replace({ path: '/redirect' + view.fullPath })
    } else {
      router.push('/')
    }
  }
}

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
  // box-shadow: 0 3px 5px 1px rgba(0, 32, 128, 0.07);
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
        // &::before {
        //   content: '';
        //   background: #fff;
        //   display: inline-block;
        //   width: 8px;
        //   height: 8px;
        //   border-radius: 50%;
        //   position: relative;
        //   margin-right: 2px;
        // }
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
  }
}
</style>
