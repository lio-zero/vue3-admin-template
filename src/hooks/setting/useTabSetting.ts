import { useTabStore } from '@/store/modules/tabView'

export function useTabSetting() {
  const tabStore = useTabStore()

  const getVisitedViews = computed(() => tabStore.getVisitedViews)

  return {
    getVisitedViews,
  }
}
