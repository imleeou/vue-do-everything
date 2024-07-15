import type { App } from 'vue'
import hoverLight from './hoverLight/index'

const directives: {
  [key: string]: any
} = {
  hoverLight
}
/** 注册全局自定义指令 */
export const registerDirectives = function (app: App<Element>) {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}
