import { isDevMode } from '@/utils/env'

// 系统默认缓存时间，以秒为单位
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

// aes 加密密钥
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_'
}

export const enableStorageEncryption = !isDevMode()
