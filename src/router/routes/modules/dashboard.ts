import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'

const dashboard: AppRouteModule = {
  path: '/',
  component: LAYOUT,
  redirect: '/dashboard',
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: 'HomeFilled', affix: true }
    }
  ]
}

export default dashboard
