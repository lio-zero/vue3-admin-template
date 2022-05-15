import Layout from '@/layout/default/index.vue'

export default {
  path: '/permission',
  name: 'User',
  component: Layout,
  redirect: '/permission/user',
  meta: {
    title: '后台权限管理',
    icon: 'bxs:lock-alt',
    roles: ['admin', 'editor']
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/permission/User.vue'),
      meta: { title: '用户权限' }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/permission/Role.vue'),
      meta: { title: '角色组' }
    },
    {
      path: 'permission',
      name: 'Permission',
      component: () => import('@/views/permission/Permission.vue'),
      meta: { title: '资源管理' }
    }
  ]
}
