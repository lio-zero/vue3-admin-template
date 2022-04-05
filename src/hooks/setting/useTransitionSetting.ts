import type { TransitionSetting } from '#/config'
import { computed } from 'vue'
import store from '@/store'

export function useTransitionSetting() {
  const getEnableTransition = computed(() => store.state.projectConfig.transitionSetting?.enable)

  const getOpenNProgress = computed(
    () => store.state.projectConfig.transitionSetting?.openNProgress
  )

  const getOpenPageLoading = computed((): boolean => {
    return !!store.state.projectConfig.transitionSetting?.openPageLoading
  })

  const getBasicTransition = computed(
    () => store.state.projectConfig.transitionSetting?.basicTransition
  )

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    store.dispatch('setProjectConfig', { transitionSetting })
  }
  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition
  }
}
