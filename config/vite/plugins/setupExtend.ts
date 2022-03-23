/**
 * @name ConfigVueSetupExtendPlugin
 * @description 监听配置文件修改自动重启Vite
 */
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
export const ConfigVueSetupExtendPlugin = () => {
  return VueSetupExtend()
}

// [
//   // eslintPlugin(),
//   createSvg('./src/icons/svg/'),

//   eslintPlugin({
//     // https://blog.csdn.net/xuefeng11111/article/details/121688821
//     cache: false
//   }),
//   createStyleImportPlugin({
//     resolves: [ElementPlusResolve()]
//   }),
//   Components({
//     resolvers: [ElementPlusResolver()],
//     extensions: ['vue'],
//     include: [/\.vue$/, /\.vue\?vue/],
//     dts: 'src/components.d.ts'
//   })
// ]
