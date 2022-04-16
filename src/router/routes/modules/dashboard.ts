import type { AppRouteModule } from '@/router/types'
import Layout from '@/layout/default/index.vue'

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: Layout,
  redirect: '/dashboard/index',
  meta: { title: '首页', icon: 'HomeFilled', badge: 'new' },
  children: [
    {
      path: 'index',
      name: 'DashboardPage',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: 'HomeFilled', badge: 'new' }
    }
  ]
}

export default dashboard
