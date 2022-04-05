import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
import permission from './modules/permission'
import middleware from '../middleware'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/LoginPage.vue')
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
        meta: { title: '首页', icon: 'HomeFilled', badge: 'new' }
      }
    ]
  },
  permission,
  {
    path: '/setting',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Setting',
        component: () => import('@/views/Setting.vue'),
        meta: { title: '个人设置', icon: 'Tools' }
      }
    ]
  },
  {
    path: '/404',
    name: 'NotFount',
    component: () => import('@/views/NotFount.vue')
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404'
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes
})

middleware(router)

export default router
