import { defineStore } from 'pinia'
import { store } from '@/store'

export const useCommonStore = defineStore({
  id: 'Common',
  state: () => ({}),
  getters: {},
  actions: {},
})

// 需要在 setup 之外使用
export function useCommonStoreWithOut() {
  return useCommonStore(store)
}
