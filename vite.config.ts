import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      port: +env.VITE_GLOB_PORT
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          globalVars: {
            hack: `true;@import '@/assets/css/variable.less'`
          }
        }
      }
    },
    plugins: [
      vue(),
      UnoCSS(),
      AutoImport({
        dts: true,
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          IconsResolver()
        ]
      }),
      Components({
        dts: true,
        resolvers: [
          ElementPlusResolver(),
          // 自动注册图标组件
          IconsResolver({
            prefix: 'icon',
            enabledCollections: ['ep']
          })
        ]
      }),
      Icons({
        // compiler: 'vue3',
        autoInstall: true
      })
    ],
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
})
