import { RouterTransitionEnum } from '@/enums/appEnum'

export interface ProjectConfig {
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum
  // Animation configuration
  transitionSetting: TransitionSetting
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean
  // Route basic switching animation
  basicTransition: RouterTransitionEnum
  // Whether to open page switching loading
  openPageLoading: boolean
  // Whether to open the top progress bar
  openNProgress: boolean
}

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string
  // Service interface url
  VITE_GLOB_API_URL: string
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string
}

export interface GlobConfig {
  // 网站名称
  title: string
  // 服务接口url
  apiUrl: string
  // Upload url
  uploadUrl?: string
  // 服务接口url前缀
  urlPrefix?: string
  // 项目缩写
  shortName: string
}

export interface TransitionSetting {
  // 是否打开页面切换动画
  enable: boolean
  // 路由基本切换动画
  basicTransition: RouterTransitionEnum
  // 是否打开页面切换加载
  openPageLoading: boolean
  // 是否打开顶部进度条
  openNProgress: boolean
}
