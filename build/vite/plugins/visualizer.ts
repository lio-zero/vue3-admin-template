/**
 * @description 包体积分析
 * @link https://github.com/btd/rollup-plugin-visualizer
 */
import visualizer from 'rollup-plugin-visualizer'
import { isReportMode } from '../../utils'

export function configVisualizerConfig() {
  if (isReportMode()) {
    process.env.REPORT
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  }
  return []
}
