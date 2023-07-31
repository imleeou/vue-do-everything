// uno.config.ts
import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'

export default defineConfig({
  rules: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      collections: {
        ep: () => import('@iconify-json/ep/icons.json').then((i) => i.default),
        carbon: () => import('@iconify-json/carbon/icons.json').then((i) => i.default)
      }
    })
  ]
})
