import type { ProjectConfig, TransitionSetting, HeaderSetting } from '#/config'
import { store } from '@/store'
import { defineStore } from 'pinia'

import { Persistent } from '@/utils/cache/persistent'
import { PROJ_CFG_KEY } from '@/enums/cacheEnum'
import { deepMerge } from '@/utils'
import { resetRouter } from '@/router'

let timeId: TimeoutHandle

interface AppState {
  pageLoading: boolean
  projectConfig: ProjectConfig | null
  device: string
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: Persistent.getLocal(PROJ_CFG_KEY),
    device: 'desktop'
  }),
  getters: {
    getProjectConfig(): ProjectConfig {
      return this.projectConfig || ({} as ProjectConfig)
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting
    },
    getDevice(): string {
      return this.device
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting
    }
  },
  actions: {
    toggleDevice(device: string) {
      this.device = device
    },
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading
    },
    async resetAllState() {
      resetRouter()
      Persistent.clearAll()
    },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId)
        // 防止闪烁
        timeId = setTimeout(() => {
          this.setPageLoading(loading)
        }, 50)
      } else {
        this.setPageLoading(loading)
        clearTimeout(timeId)
      }
    },
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(this.projectConfig || {}, config)
      Persistent.setLocal(PROJ_CFG_KEY, this.projectConfig)
    }
  }
})

// 需要在 setup 之外使用
export function useAppStoreWithOut() {
  return useAppStore(store)
}
