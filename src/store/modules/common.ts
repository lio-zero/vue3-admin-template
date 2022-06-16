import { store } from '@/store'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
  id: 'Common',
  state: () => ({}),
  getters: {},
  actions: {}
})

// 需要在 setup 之外使用
export function useCommonStoreWithOut() {
  return useCommonStore(store)
}
