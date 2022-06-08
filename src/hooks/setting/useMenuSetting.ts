import type { MenuSetting } from '#/config'

import { useAppStore } from '@/store/modules/app'

export function useMenuSetting() {
  const appStore = useAppStore()

  const getCollapsed = computed(() => appStore.getProjectConfig.menuSetting.collapsed)

  const getWithoutAnimation = computed(() => appStore.getProjectConfig.menuSetting.withoutAnimation)

  // 设置菜单配置
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting })
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
      withoutAnimation: false
    })
  }

  return {
    setMenuSetting,
    toggleCollapsed,

    getCollapsed,
    getWithoutAnimation
  }
}
