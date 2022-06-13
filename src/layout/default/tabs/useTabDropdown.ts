import { MenuEventEnum } from './types'
import { useTabStore } from '@/store/modules/tab'
import { useRouter, useRoute } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'
import { WHITE_NAME_LIST } from '@/router'
import { resolve } from 'path-browserify'

export interface DropMenu {
  icon?: string
  event: string | number
  text: string
  disabled?: boolean
}

export const dropMenuList: DropMenu[] = [
  {
    text: '重新加载',
    event: MenuEventEnum.REFRESH_PAGE,
    icon: 'ion:reload-sharp'
  },
  {
    text: '关闭标签页',
    event: MenuEventEnum.CLOSE_CURRENT,
    icon: 'clarity:close-line'
  },
  {
    text: '关闭其他标签页',
    event: MenuEventEnum.CLOSE_OTHER,
    icon: 'dashicons:align-center'
  },
  {
    text: '关闭全部标签页',
    event: MenuEventEnum.CLOSE_ALL,
    icon: 'clarity:minus-line'
  }
]

export function useTabDropdown(tag, scrollPane) {
  const tabStore = useTabStore()
  const { buildRoutesAction } = usePermissionStore()

  const route = useRoute()
  const router = useRouter()

  const routes = ref()
  const affixTags = ref([])
  let _tag
  let _scrollPane

  onMounted(() => {
    _tag = tag
    _scrollPane = scrollPane
  })

  onBeforeMount(async () => {
    routes.value = await buildRoutesAction()
    initTags()
    addTags()
  })

  const isActive = routes => routes.path === route.path
  const isAffix = tag => tag.meta && tag.meta.affix

  const toLastView = (visitedViews, view) => {
    const latestView = visitedViews.slice(-1)[0]
    if (latestView) {
      router.push(latestView.fullPath)
    } else {
      // 如果没有标记视图，默认情况下会重定向到主页，你可以根据需要调整。
      if (view.name === 'Dashboard') {
        // 重新加载主页
        router.replace({ path: '/redirect' + view.fullPath })
      } else {
        router.push('/')
      }
    }
  }

  const moveToCurrentTag = () => {
    nextTick(() => {
      for (const item of unref(_tag)) {
        if (item.to.path === route.path) {
          unref(_scrollPane).moveToTarget(item.$el)
          // 当查询不同时，则更新
          if (item.to.fullPath !== route.fullPath) {
            tabStore.updateVisitedView(route)
          }
          break
        }
      }
    })
  }

  const filterAffixTags = (routes, basePath = '/') => {
    let tags: any = []

    routes.forEach(route => {
      if (route.meta && route.meta.affix) {
        const tagPath = resolve(basePath, route.path)

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

  // 初始化标签
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
    const { name }: any = route

    if (name && !WHITE_NAME_LIST.includes(name)) {
      tabStore.addView(route)
    }

    return false
  }

  const closeSelectedTag = (menu, selectedTag) => {
    tabStore.delView(selectedTag).then(({ visitedViews }) => {
      if (isActive(selectedTag)) {
        toLastView(visitedViews, menu)
      }
    })
  }

  function handleMenuEvent(menu, selectedTag): void {
    const { event } = menu

    switch (event) {
      // 刷新页面
      case MenuEventEnum.REFRESH_PAGE:
        tabStore.delCachedView(selectedTag).then(() => {
          const { fullPath } = selectedTag

          nextTick(() => {
            router.replace({
              path: `/redirect${fullPath}`
            })
          })
        })
        break
      // 关闭当前标签页
      case MenuEventEnum.CLOSE_CURRENT:
        closeSelectedTag(menu, selectedTag)
        break
      // 关闭其他标签页
      case MenuEventEnum.CLOSE_OTHER:
        router.push(selectedTag)
        tabStore.delOthersViews(selectedTag).then(() => {
          moveToCurrentTag()
        })
        break
      // 关闭所有标签页
      case MenuEventEnum.CLOSE_ALL:
        tabStore.delAllViews().then(({ visitedViews }) => {
          if (unref(affixTags).some((tag: any) => tag.path === selectedTag.path)) {
            return
          }
          toLastView(visitedViews, selectedTag)
        })
        break
    }
  }

  return { addTags, isActive, isAffix, moveToCurrentTag, closeSelectedTag, handleMenuEvent }
}
