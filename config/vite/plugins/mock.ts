/**
 * 用于开发和生产环境的模拟数据插件。
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'
export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild, // 实际开发请关闭，会影响打包体积
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProdMockServer';
      setupProdMockServer();
      `
  })
}
