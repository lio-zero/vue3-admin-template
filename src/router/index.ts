import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/default/index.vue'
import middleware from '../middleware'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'dashicons:dashboard', affix: true }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/views/setting/index.vue'),
        meta: { title: '个人设置', icon: 'ci:settings-filled' }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error-page/NotFound.vue')
  },
  {
    path: '/:path(.*)',
    redirect: '/404'
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

middleware(router)

export function setupRouter(app: App<Element>) {
  app.use(router)
}
