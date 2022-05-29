import { useAppStore } from '@/store/modules/app'
import type { ProjectConfig } from '#/config'
import { deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'
import { updateGrayMode } from '@/logics/theme/updateGrayMode'
import { updateColorWeak } from '@/logics/theme/updateColorWeak'

export function initAppConfigStore() {
  const appStore = useAppStore()
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  const { colorWeak, grayMode } = projCfg

  grayMode && updateGrayMode(grayMode)
  colorWeak && updateColorWeak(colorWeak)

  appStore.setProjectConfig(projCfg)
}
