const hoverLight = {
  mounted: (el: any, binding: any) => {
    const { color, size } = binding.value ?? {}
    // 光环颜色
    const lightColor = color || 'radial-gradient(circle, rgba(245, 49, 255, 0.5) 0%, rgba(245, 49, 255, 0) 100%)'
    // 光环大小，百分比
    const lightSize = typeof size === 'number' ? (size >= 0 && size <= 100 ? size : 20) : 20

    // 设置前置样式
    el.style.position = 'relative'
    el.style.overflow = 'hidden'
    // 获取盒子的位置和尺寸信息。
    const rect = el.getBoundingClientRect()

    // 创建一个子元素
    const child = document.createElement('div')
    child.className = '__hover-light-effect'
    // 将子元素添加到盒子中
    el.appendChild(child)

    // 添加mousemove事件监听器
    el.addEventListener('mousemove', (event: any) => {
      // 获取鼠标的位置
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      child.style.top = `${y}px`
      child.style.left = `${x}px`
      child.style.background = lightColor
      child.style.width = `${lightSize}%`
      child.style.paddingTop = `${lightSize}%`

      // 如果鼠标在盒子内，则显示子元素
      if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
        child.style.display = 'block'
      } else {
        child.style.display = 'none'
      }
    })

    // 移入事件监听器
    el.addEventListener('mouseenter', () => {
      child.style.display = 'block'
    })

    // 移出事件监听器
    el.addEventListener('mouseleave', () => {
      child.style.display = 'none'
    })
  },
  unmounted: (el: any) => {
    el.removeEventListener('mousemove')
    el.removeEventListener('mouseenter')
    el.removeEventListener('mouseleave')
  }
}

export default hoverLight
