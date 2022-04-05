import store from '@/store'
import type { ProjectConfig } from '#/config'
import { deepMerge } from '@/utils'
import { Persistent } from '@/utils/cache/persistent'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import projectSetting from '@/settings/projectSetting'

export function initAppConfigStore() {
  let projCfg: ProjectConfig = Persistent.getLocal(PROJ_CFG_KEY) as ProjectConfig
  projCfg = deepMerge(projectSetting, projCfg || {})
  store.dispatch('setProjectConfig', projCfg)
}
