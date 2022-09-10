import type { getMenuListResultModel } from './model/menuModel'
import { http } from '@/utils/http'

enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: 基于 id 获取用户菜单
 */
export const getMenuList = () => {
  return http.get<getMenuListResultModel>({ url: Api.GetMenuList })
}
