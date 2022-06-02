import { computed } from 'vue'

import { useAppStore } from '@/store/modules/app'

export function useRootSetting() {
  const appStore = useAppStore()

  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo)

  const getShowFullScreen = computed(() => appStore.getProjectConfig.showFullScreen)

  const getColorWeak = computed(() => appStore.getProjectConfig.colorWeak)

  const getGrayMode = computed(() => appStore.getProjectConfig.grayMode)

  return {
    getShowFullScreen,
    getColorWeak,
    getGrayMode,
    getShowLogo
  }
}
