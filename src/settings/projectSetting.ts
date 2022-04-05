import type { ProjectConfig } from '#/config'
import { CacheTypeEnum } from '@/enums/cacheEnum'
import { RouterTransitionEnum } from '@/enums/appEnum'

const setting: ProjectConfig = {
  permissionCacheType: CacheTypeEnum.LOCAL,
  transitionSetting: {
    enable: true,
    basicTransition: RouterTransitionEnum.FADE_SIDE,
    openPageLoading: true,
    openNProgress: false
  }
}

export default setting
