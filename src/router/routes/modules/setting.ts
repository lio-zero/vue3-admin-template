import type { AppRouteModule } from '@/router/types'
import { LAYOUT } from '@/router/constant'

const dashboard: AppRouteModule = {
  path: '/setting',
  component: LAYOUT,
  redirect: '/setting/index',
  children: [
    {
      path: 'index',
      name: 'Setting',
      component: () => import('@/views/sys/setting/index.vue'),
      meta: { title: '个人设置', icon: 'ci:settings-filled' }
    }
  ]
}

export default dashboard
