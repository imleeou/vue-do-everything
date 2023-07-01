import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        globalVars: {
          hack: `true;@import '@/assets/css/variable.less'`
        }
      }
    }
  },
  plugins: [
    vue(),
    UnoCSS(),
    Components({
      dts: true,
      resolvers: [ElementPlusResolver()]
    }),
    AutoImport({
      dts: true,
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
