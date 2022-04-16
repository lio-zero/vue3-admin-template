import type { AppRouteRecordRaw } from '@/router/types'

// export const NotFound: AppRouteRecordRaw = {
//   path: '/:path(.*)*',
//   children: [
//     {
//       path: '/:path(.*)*',
//       name: 'NotFound',
//       component: () => import('@/views/error-page/NotFound.vue')
//     }
//   ]
// }

export const NotFound: AppRouteRecordRaw = {
  path: '/404',
  name: 'NotFound',
  component: () => import('@/views/error-page/NotFound.vue')
}

// export const NotFound: AppRouteRecordRaw = {
//   path: '/:path(.*)',
//   redirect: '/dashboard'
// }
