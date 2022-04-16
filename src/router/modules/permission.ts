import Layout from '@/layout/default/index.vue'

export default {
  path: '/permission',
  name: 'User',
  component: Layout,
  redirect: '/permission/user',
  meta: {
    title: '后台权限管理',
    icon: 'Operation',
    roles: ['admin', 'editor']
  },
  children: [
    {
      path: 'user',
      name: 'User',
      component: () => import('@/views/permission/User.vue'),
      meta: { title: '系统用户权限' }
    },
    {
      path: 'role',
      name: 'Role',
      component: () => import('@/views/permission/Role.vue'),
      meta: { title: '系统用户组权限' }
    },
    {
      path: 'permission',
      name: 'Permission',
      component: () => import('@/views/permission/Permission.vue'),
      meta: { title: '系统用户权限管理' }
    }
  ]
}
