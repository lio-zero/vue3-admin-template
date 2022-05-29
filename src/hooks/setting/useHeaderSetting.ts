import type { HeaderSetting } from '#/config'

import { useAppStore } from '@/store/modules/app'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getHeaderFixed = computed(() => appStore.getHeaderSetting.fixed)

  // Set header configuration
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting })
  }
  return {
    setHeaderSetting,

    getHeaderFixed
  }
}
