import type { AppRouteRecordRaw, AppRouteModule } from '@/router/types'
import { PageEnum } from '@/enums/pageEnum'

import { NotFound } from '@/router/routes/basic'

const modules = import.meta.globEager('./modules/**/*.ts')

const routeModuleList: AppRouteModule[] = []

Object.keys(modules).forEach(key => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

export const asyncRoutes = [...routeModuleList]

export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME
}

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/Login.vue')
}

export const basicRoutes = [RootRoute, LoginRoute, NotFound]
