import { useAppStore } from '@/store/modules/app'
import type { ProjectConfig } from '#/config'
import { deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'

export function initAppConfigStore() {
  const appStore = useAppStore()
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  appStore.setProjectConfig(projCfg)
}
