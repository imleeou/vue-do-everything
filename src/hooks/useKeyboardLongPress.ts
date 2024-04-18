import { onMounted, onUnmounted, ref } from 'vue'

enum BehaviorEnum {
  DOWN = 'down',
  UP = 'up'
}

/**
 * @param keyCode 按键码
 * @param callback 回调函数 code: 按键码, behavior: 是否按下
 * @param timeout 超时时间
 */
const useKeyboardLongPress = (
  keyCode: string | string[],
  callback: (code: string, behavior: BehaviorEnum) => void,
  timeout: number = 500
): void => {
  const keyCodeArray = Array.isArray(keyCode) ? keyCode : [keyCode]
  const timer = ref()
  const activeKey = ref('')

  // 键盘按下
  const longPressHandlerKeyDown = (event: KeyboardEvent) => {
    if (!timer.value && keyCodeArray.includes(event.code)) {
      timer.value = setTimeout(() => {
        activeKey.value = event.code
        callback(event.code, BehaviorEnum.DOWN)
      }, timeout)
    }
  }
  // 键盘松开
  const longPressHandlerKeyUp = (event: KeyboardEvent) => {
    if (activeKey.value === event.code) {
      clearTimeout(timer.value)
      timer.value = null
      activeKey.value = ''
      callback(event.code, BehaviorEnum.UP)
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', longPressHandlerKeyDown)
    window.addEventListener('keyup', longPressHandlerKeyUp)
  })

  onUnmounted(() => {
    clearTimeout(timer.value)
    timer.value = null
    window.removeEventListener('keydown', longPressHandlerKeyDown)
    window.removeEventListener('keyup', longPressHandlerKeyUp)
  })
}

export { useKeyboardLongPress, BehaviorEnum }
