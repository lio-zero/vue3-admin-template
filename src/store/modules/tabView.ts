import { defineStore } from 'pinia'
import { store } from '@/store'

interface TabState {
  visitedViews: any
  cachedViews: any
}

export const useTabStore = defineStore({
  id: 'Tab',
  state: (): TabState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  getters: {
    getVisitedViews(): any {
      return this.visitedViews
    },
    getCachedViews(): any {
      return this.cachedViews
    },
  },
  actions: {
    addView(view) {
      this.addVisitedView(view)
      this.addCachedView(view)
    },
    addVisitedView(view) {
      if (this.visitedViews.some(v => v.path === view.path))
        return

      this.visitedViews.push(
        Object.assign({}, view, {
          title: view.meta.title || 'no-name',
        }),
      )
    },
    addCachedView(view) {
      if (this.cachedViews.includes(view.name))
        return
      if (!view.meta.noCache)
        this.cachedViews.push(view.name)
    },
    delView(view) {
      return new Promise((resolve) => {
        this.delVisitedView(view)
        this.delCachedView(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delVisitedView(view) {
      return new Promise((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1)
            break
          }
        }
        resolve([...this.visitedViews])
      })
    },
    delCachedView(view) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        index > -1 && this.cachedViews.splice(index, 1)
        resolve([...this.cachedViews])
      })
    },
    delOthersViews(view) {
      return new Promise((resolve) => {
        this.delOthersVisitedViews(view)
        this.delOthersCachedViews(view)
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delOthersVisitedViews(view) {
      return new Promise((resolve) => {
        this.visitedViews = this.visitedViews.filter((v) => {
          return v.meta.affix || v.path === view.path
        })
        resolve([...this.visitedViews])
      })
    },
    delOthersCachedViews(view) {
      return new Promise((resolve) => {
        const index = this.cachedViews.indexOf(view.name)
        if (index > -1)
          this.cachedViews = this.cachedViews.slice(index, index + 1)

        else
          this.cachedViews = []

        resolve([...this.cachedViews])
      })
    },

    delAllViews() {
      return new Promise((resolve) => {
        this.delAllVisitedViews()
        this.delAllCachedViews()
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        })
      })
    },
    delAllVisitedViews() {
      return new Promise((resolve) => {
        const affixTags = this.visitedViews.filter(tag => tag.meta.affix)
        this.visitedViews = affixTags
        resolve([...this.visitedViews])
      })
    },
    delAllCachedViews() {
      return new Promise((resolve) => {
        this.cachedViews = []
        resolve([...this.cachedViews])
      })
    },

    updateVisitedView(view) {
      for (let v of this.visitedViews) {
        if (v.path === view.path) {
          v = Object.assign(v, view)
          break
        }
      }
    },
  },
})

export function useTabStoreWithOut() {
  return useTabStore(store)
}
