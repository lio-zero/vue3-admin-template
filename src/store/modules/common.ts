import { store } from '@/store'
import { defineStore } from 'pinia'

export const useCommonStore = defineStore({
  id: 'Common',
  state: () => ({}),
  getters: {},
  actions: {}
})

export function useCommonStoreWithOut() {
  return useCommonStore(store)
}
