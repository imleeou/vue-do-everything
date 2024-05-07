/** 获取随机标题 */
export function generateRandomTitle() {
  // 定义基础字符集
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 +-*'
  // 确定标题的随机长度，这里设置为 5 到 15 之间
  const titleLength = Math.floor(Math.random() * 21) + 5 // 生成 5 到 25 之间的随机数
  let randomTitle = ''
  for (let i = 0; i < titleLength; i++) {
    // 从基础字符集中随机选择一个字符
    const randomIndex = Math.floor(Math.random() * characters.length)
    randomTitle += characters[randomIndex]
  }
  return randomTitle
}

/** 获取文本宽度、高度 */
export function getTextInfo(text: string, font: string = '16px') {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx!.font = font

  // measureText()函数返回一个包含指定文本宽度的对象
  let metrics = ctx!.measureText(text)
  const width = metrics.width
  // 使用字体大小作为文本高度
  const height = parseInt(ctx!.font)

  return {
    width,
    height
  }
}
