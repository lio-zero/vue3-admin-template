/**
 * @description 监听配置文件修改自动重启 Vite
 * @link https://github.com/antfu/vite-plugin-restart
 */
import ViteRestart from 'vite-plugin-restart'
export function configRestartPlugin() {
  return ViteRestart({
    restart: ['*.config.[jt]s', '**/config/*.[jt]s']
  })
}
