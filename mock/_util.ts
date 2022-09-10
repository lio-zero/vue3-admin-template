export interface requestParams {
  method: string
  body: any
  headers?: { authorization?: string }
  query: any
}

export function resultSuccess<T = Recordable>(result: T, { message = 'ok' } = {}) {
  return {
    code: 0,
    result,
    message,
    type: 'success',
  }
}

/**
 * @description 本函数用于从 request 数据中获取 token，请根据项目的实际情况修改
 */
export function getRequestToken({ headers }: requestParams): string | undefined {
  return headers?.authorization
}

export function resultError(message = 'Request failed', { code = -1, result = null } = {}) {
  return {
    code,
    result,
    message,
    type: 'error',
  }
}
