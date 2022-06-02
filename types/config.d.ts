import { PermissionModeEnum, RouterTransitionEnum } from '@/enums/appEnum'

export interface ProjectConfig {
  // 侧边栏设置
  sidebar: Sidebar
  // 权限相关信息的存储位置
  permissionCacheType: CacheTypeEnum
  // 过渡设置
  transitionSetting: TransitionSetting
  // 权限模式
  permissionMode: PermissionModeEnum
  // 侧边栏 Logo
  showLogo: boolean
  // 是否显示设置按钮
  openSetting: boolean
  // 是否显示全屏按钮
  showFullScreen: boolean
  // 是否显示灰色模式按钮
  grayMode: boolean
  // 是否显示色弱模式按钮
  colorWeak: boolean
  headerSetting: {
    fixed: boolean
  }
}

export interface Sidebar {
  opened: boolean
  withoutAnimation: boolean
}

export interface HeaderSetting {
  fixed: boolean
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

export interface GlobEnvConfig {
  // 网站标题
  VITE_GLOB_APP_TITLE: string
  // 服务接口 URL
  VITE_GLOB_API_URL: string
  // 服务接口 URL 前缀
  VITE_GLOB_API_URL_PREFIX?: string
  // 项目缩写
  VITE_GLOB_APP_SHORT_NAME: string
  // 上传 URL
  VITE_GLOB_UPLOAD_URL?: string
}

export interface GlobConfig {
  // 网站名称
  title: string
  // 服务接口 URL
  apiUrl: string
  // 上传 URL
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
