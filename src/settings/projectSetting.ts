import type { ProjectConfig } from '#/config'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { PermissionModeEnum, RouterTransitionEnum } from '@/enums/appEnum'

const setting: ProjectConfig = {
  // 侧边栏
  menuSetting: {
    collapsed: true,
    withoutAnimation: false,
  },
  // 过渡设置
  transitionSetting: {
    // 无论是否打开页面切换动画，禁用状态也将禁用 pageLoading
    enable: true,
    // 路由基本切换动画
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    // 是否仅在 enable: true 时打开页面切换加载
    openPageLoading: true,
    // 是否打开顶部进度条
    openNProgress: false,
  },
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum.LOCAL,
  // 权限模式
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 是否显示侧边栏 Logo,
  showLogo: false,
  openSetting: false,
  // 是否显示全屏按钮
  showFullScreen: false,
  // 是否开启灰色模式
  grayMode: false,
  // 是否开启色弱模式
  colorWeak: false,
  headerSetting: {
    // 是否固定头部
    fixed: true,
  },
  removeAllHttpPending: false,
}

export default setting
