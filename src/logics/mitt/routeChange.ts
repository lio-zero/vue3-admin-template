/**
 * 用于监视路由更改以更改菜单和选项卡的状态。无需监视路由，因为路由状态更改受页面呈现时间的影响，这将很慢
 */

import type { RouteLocationNormalized } from 'vue-router'
import mitt from '@/utils/mitt'
import { getRawRoute } from '@/utils'

const emitter = mitt()

// eslint-disable-next-line symbol-description
const key = Symbol()

let lastChangeTab: RouteLocationNormalized

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute)
  emitter.emit(key, r)
  lastChangeTab = r
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  emitter.on(key, callback)
  immediate && lastChangeTab && callback(lastChangeTab)
}

export function removeTabChangeListener() {
  emitter.clear()
}
