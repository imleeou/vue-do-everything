// uno.config.ts
import { defineConfig, presetUno, presetIcons, presetAttributify, presetWebFonts } from 'unocss'

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
  shortcuts: {
    'wh-full': 'w-full h-full'
  }
})
