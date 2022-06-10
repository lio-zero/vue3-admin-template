import { useTabStore } from '@/store/modules/tab'

export function useTabSetting() {
  const tabStore = useTabStore()

  const getVisitedViews = computed(() => tabStore.getVisitedViews)

  return {
    getVisitedViews
  }
}
