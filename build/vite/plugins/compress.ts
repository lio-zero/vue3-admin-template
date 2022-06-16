/**
 * @description 用于打包和输出 gzip。请注意，这在 Vite 中无法正常工作，具体原因仍在调查中
 * @link https://github.com/anncwb/vite-plugin-compression
 */
import type { PluginOption } from 'vite'
import compressPlugin from 'vite-plugin-compression'

export function configCompressPlugin(
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginFile = false
): PluginOption | PluginOption[] {
  const compressList = compress.split(',')

  const plugins: PluginOption[] = []

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile
      })
    )
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile
      })
    )
  }
  return plugins
}
