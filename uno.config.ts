// uno.config.ts
import { defineConfig, presetUno, presetIcons, presetAttributify, presetWebFonts, transformerDirectives } from 'unocss'

export default defineConfig({
  rules: [],
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Inter', 'Roboto']
      }
    }),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      collections: {
        ep: () => import('@iconify-json/ep/icons.json').then((i) => i.default),
        carbon: () => import('@iconify-json/carbon/icons.json').then((i) => i.default)
      },
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],
  transformers: [transformerDirectives()],
  shortcuts: {
    'wh-full':'w-full h-full',
    'wh-screen':'w-screen h-screen',
    'flex-center': 'flex items-center justify-center'
  }
})
