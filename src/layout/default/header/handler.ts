import { HandlerEnum } from './enum'
import { updateGrayMode } from '@/logics/theme/updateGrayMode'
import { updateColorWeak } from '@/logics/theme/updateColorWeak'
import { useAppStore } from '@/store/modules/app'
import type { ProjectConfig } from '#/config'

export function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore()
  const config = handler(event, value)
  appStore.setProjectConfig(config)
}

export function handler(event: HandlerEnum, value: any): DeepPartial<ProjectConfig> {
  switch (event) {
    case HandlerEnum.HEADER_FIXED:
      return { headerSetting: { fixed: value } }
    case HandlerEnum.SHOW_LOGO:
      return { showLogo: value }
    case HandlerEnum.FULL_CONTENT:
      return { showFullScreen: value }
    case HandlerEnum.GRAY_MODE:
      updateGrayMode(value)
      return { grayMode: value }
    case HandlerEnum.COLOR_WEAK:
      updateColorWeak(value)
      return { colorWeak: value }
    case HandlerEnum.OPEN_PROGRESS:
      return { transitionSetting: { openNProgress: value } }
    default:
      return {}
  }
}
