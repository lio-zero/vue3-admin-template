import type { AppRouteModule } from '@/router/types'
import Layout from '@/layout/default/index.vue'

const dashboard: AppRouteModule = {
  path: '/',
  component: Layout,
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
