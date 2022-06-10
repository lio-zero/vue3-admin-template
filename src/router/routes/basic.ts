import type { AppRouteRecordRaw } from '@/router/types'
import { LAYOUT, EXCEPTION_COMPONENT } from '@/router/constant'

// export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
//   path: '/:path(.*)*',
//   name: 'NotFound',
//   component: LAYOUT,
//   children: [
//     {
//       path: '/:path(.*)*',
//       name: 'NotFound',
//       component: () => import('@/views/error-page/NotFound.vue')
//     }
//   ]
// }

export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/404',
  name: 'ErrorPage',
  component: () => EXCEPTION_COMPONENT
}

export const REDIRECT_ROUTE: AppRouteRecordRaw = {
  path: '/redirect',
  component: LAYOUT,
  children: [
    {
      path: '/redirect/:path(.*)',
      component: () => import('@/views/sys/redirect/index.vue')
    }
  ]
}
