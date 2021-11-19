import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    meta: { title: '首页', icon: 'home' }
  },
  {
    path: '/user',
    name: 'User',
    component: Layout,
    meta: { title: '后台权限管理', icon: 'sliders' },
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/Home.vue'),
        meta: { title: '系统用户权限' }
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import('@/views/Home.vue'),
        meta: { title: '系统用户组权限' }
      },
      {
        path: '/permission',
        name: 'Permission',
        component: () => import('@/views/Home.vue'),
        meta: { title: '系统用户权限管理' }
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
        component: () => import('@/views/Setting.vue'),
        meta: { title: '个人设置', icon: 'setting' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
