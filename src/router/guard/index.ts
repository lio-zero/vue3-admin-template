import type { Router, RouteLocationNormalized } from 'vue-router'

import NProgress from 'nprogress'
import { useAppStoreWithOut } from '@/store/modules/app'
import { useUserStoreWithOut } from '@/store/modules/user'
import { setRouteChange } from '@/logics/mitt/routeChange'
import { AxiosCanceler } from '@/utils/http/axiosCancel'
import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { createPermissionGuard } from './permissionGuard'
import projectSetting from '@/settings/projectSetting'

export function setupRouterGuard(router: Router) {
  createPageGuard(router)
  createPageLoadingGuard(router)
  createHttpGuard(router)
  createScrollGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
}

/**
 * 用于处理页面状态的 hooks
 */
function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>()

  router.beforeEach(async to => {
    // 页面已经加载，再次打开会更快，无需进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.path)
    // 通知路由更改
    setRouteChange(to)

    return true
  })

  router.afterEach(to => {
    loadedPageMap.set(to.path, true)
  })
}

function createPageLoadingGuard(router: Router) {
  const userStore = useUserStoreWithOut()
  const appStore = useAppStoreWithOut()
  const { getOpenPageLoading } = useTransitionSetting()

  router.beforeEach(async to => {
    if (!userStore.getToken) return true
    if (to.meta.loaded) return true

    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
      return true
    }

    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // TODO 正在寻找更好的方法
      // 计时器模拟加载时间，以防止闪烁过快
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 220)
    }

    return true
  })
}

/**
 * 用于在切换路由时关闭当前页面以完成请求的接口
 * @param router
 */
function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = projectSetting
  let axiosCanceler: Nullable<AxiosCanceler>
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler()
  }
  router.beforeEach(async () => {
    // 切换路由将删除以前的请求
    axiosCanceler?.removeAllPending()
    return true
  })
}

// 路由切换滚动至顶部
function createScrollGuard(router: Router) {
  const isHash = (href: string) => /^#/.test(href)

  const body = document.body

  router.afterEach(async to => {
    // 滚动至顶部
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}

export function createProgressGuard(router: Router) {
  NProgress.configure({ showSpinner: false })
  const { getOpenNProgress } = useTransitionSetting()
  router.beforeEach(async to => {
    if (to.meta.loaded) {
      return true
    }

    unref(getOpenNProgress) && NProgress.start()
    return true
  })

  router.afterEach(async () => {
    unref(getOpenNProgress) && NProgress.done()
    return true
  })
}
