import type { HeaderSetting } from '#/config'

import { useAppStore } from '@/store/modules/app'

export function useHeaderSetting() {
  const appStore = useAppStore()

  const getHeaderFixed = computed(() => appStore.getHeaderSetting.fixed)

  // 设置 header 配置
  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setProjectConfig({ headerSetting })
  }

  return {
    setHeaderSetting,

    getHeaderFixed
  }
}
