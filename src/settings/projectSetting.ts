import type { ProjectConfig } from '#/config'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { PermissionModeEnum, RouterTransitionEnum } from '@/enums/appEnum'

const setting: ProjectConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  // 侧边栏
  sidebar: {
    opened: true,
    withoutAnimation: false
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
    openNProgress: false
  },
  // Permission mode
  permissionMode: PermissionModeEnum.ROUTE_MAPPING,
  // 是否显示侧边栏 Logo,
  showLogo: false,
  openSetting: false,
  // 是否显示全屏按钮
  showFullScreen: false
}

export default setting
