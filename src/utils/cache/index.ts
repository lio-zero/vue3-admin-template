import type { CreateStorageParams } from './storageCache'
import { createStorage as create } from './storageCache'
import { getStorageShortName } from '@/utils/env'
import { DEFAULT_CACHE_TIME, enableStorageEncryption } from '@/settings/encryptionSetting'

export type Options = Partial<CreateStorageParams>

const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    // 调试模式下无加密
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  }
}

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options))
}

export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}

export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME })
}
