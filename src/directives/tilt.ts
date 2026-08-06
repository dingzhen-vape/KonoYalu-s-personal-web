// ============================================================
// tilt.ts — v-tilt 指令：卡片 3D 透视面向鼠标
// 用法：在卡片元素上写 v-tilt
// 原理：mousemove 时按鼠标在卡片内的相对位置计算
//       rotateX/rotateY（最大 ±MAX_ANGLE），实时设置无过渡；
//       mouseleave 加过渡平滑回正
// ============================================================

const MAX_ANGLE = 10 // 最大倾斜角度（度）
const PERSPECTIVE = 600 // 透视距离（px，越小透视感越强）
const RESET_MS = 400 // 离开后回正过渡时长

export default {
  mounted(el: HTMLElement) {
    el.addEventListener('mousemove', onMouseMove)
    el.addEventListener('mouseleave', onMouseLeave)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('mousemove', onMouseMove)
    el.removeEventListener('mouseleave', onMouseLeave)
  },
}

function onMouseMove(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  // 鼠标在卡片内的相对位置（0..1）
  const relX = (e.clientX - rect.left) / rect.width
  const relY = (e.clientY - rect.top) / rect.height
  // 偏右 → 绕 Y 轴右转；偏下 → 绕 X 轴前倾（负号让方向符合直觉）
  const rotateY = (relX - 0.5) * 2 * MAX_ANGLE
  const rotateX = -(relY - 0.5) * 2 * MAX_ANGLE
  // 实时跟随：不设过渡，避免迟钝
  el.style.transition = 'none'
  el.style.transform = `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
}

function onMouseLeave(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  // 加过渡平滑回正，结束后清除内联样式
  el.style.transition = `transform ${RESET_MS}ms ease`
  el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg)'
  const clear = () => {
    el.style.transition = ''
    el.style.transform = ''
    el.removeEventListener('transitionend', clear)
  }
  el.addEventListener('transitionend', clear)
}
