/** 获取 x - y 的随机整数，一定是10的倍数 */
export function getRandomInt(x: number, y = 0): number {
  if (y > x) {
    ;[x, y] = [y, x]
  }
  // 除以10后向下取整来确保是整数，然后乘以10来获取10的倍数
  return Math.floor(Math.floor(Math.random() * (x / 10 - y / 10 + 1)) + y / 10) * 10
}

/** 获取uuid */
export function getUUID(): string {
  return getRandomInt(1000, 9999) + '-' + getRandomInt(1000, 9999) + '-' + new Date().getTime()
}
