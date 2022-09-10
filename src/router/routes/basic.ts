import type { AppRouteRecordRaw } from '@/router/types'
import { EXCEPTION_COMPONENT, LAYOUT } from '@/router/constant'

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)',
  name: 'ErrorPage',
  component: EXCEPTION_COMPONENT,
}

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  children: [
    {
      path: '/redirect/:path(.*)',
      name: 'Redirect',
      component: () => import('@/views/sys/redirect/index.vue'),
    },
  ],
}
