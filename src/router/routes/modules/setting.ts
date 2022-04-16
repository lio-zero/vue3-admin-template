import type { AppRouteModule } from '@/router/types'
import Layout from '@/layout/default/index.vue'

const dashboard: AppRouteModule = {
  path: '/setting',
  name: 'Setting',
  component: Layout,
  meta: { title: '个人设置', icon: 'Tools' },
  children: [
    {
      path: 'index',
      name: 'SettingPage',
      component: () => import('@/views/setting/index.vue'),
      meta: { title: '个人设置', icon: 'Tools' }
    }
  ]
}

export default dashboard
