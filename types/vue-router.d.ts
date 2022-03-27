export {}

declare module 'vue-router' {
  interface RouteMeta extends Record<string | number | symbol, unknown> {
    orderNo?: number
    title: string
    // 动态路由器级别。
    dynamicLevel?: number
    // 动态路由真实路由路径（性能）。
    realPath?: string
    // 是否忽略权限
    ignoreAuth?: boolean
    // 是否不缓存
    ignoreKeepAlive?: boolean
    // 是否固定 tab
    affix?: boolean
    // tab 上的 icon
    icon?: string
    frameSrc?: string
    // 当前页面转换
    transitionName?: string
    // 是否已动态添加路由
    hideBreadcrumb?: boolean
    // 隐藏子菜单
    hideChildrenInMenu?: boolean
    // 运载参数
    carryParam?: boolean
    // 内部用于标记单级菜单
    single?: boolean
    // 当前活动菜单
    currentActiveMenu?: string
    // 从不显示在 tab 中
    hideTab?: boolean
    // 永远不要出现在菜单上
    hideMenu?: boolean
    isLink?: boolean
    // 仅为菜单构建
    ignoreRoute?: boolean
    // 隐藏 children 路径
    hidePathForChildren?: boolean
  }
}
