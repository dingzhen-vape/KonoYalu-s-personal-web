// ============================================================
// 全局加载状态（模块级共享响应式状态）
// 用途：路由守卫与 App.vue 之间共享"是否显示加载遮罩"
// 说明：App.vue 是组件实例，路由守卫在组件外拿不到其 data，
//       因此把加载状态提升为独立模块，双方 import 同一份引用
// ============================================================

import { ref } from 'vue'
import { uselessTips } from './assets/ts/UselessTips'

// 是否显示加载遮罩（初始为 true：首屏加载期间遮罩已显示）
export const isLoading = ref(true)

// 遮罩开始显示的时刻（毫秒时间戳），用于计算最短停留时长
// 初始即设为模块加载时刻：首屏不走 showLoading()，必须从加载就开始计时
export const loadingStart = ref(Date.now())

// 当前要显示的随机 tip（初始化抽一条，首屏加载也有内容）
export const currentTip = ref(pickRandomTip())

const WaitTime = 1000 // 最短停留时长（毫秒）

// 随机抽取一条 tip（带空数组保护）
function pickRandomTip() {
  return uselessTips[Math.floor(Math.random() * uselessTips.length)] ?? ''
}

/**
 * 显示加载遮罩：重置计时起点并置 isLoading 为 true
 * 由路由 beforeEach 在页面切换前调用
 */
export function showLoading() {
  currentTip.value = pickRandomTip()
  loadingStart.value = Date.now()
  isLoading.value = true
}

/**
 * 关闭加载遮罩：保证遮罩至少停留一段最短时长，避免闪一下就消失
 * 由路由 afterEach 与壁纸加载回调（@load/@error）调用
 */
export function finishLoading() {
  if (!isLoading.value) return
  const elapsed = Date.now() - loadingStart.value
  const remaining = Math.max(0, WaitTime - elapsed)
  setTimeout(() => {
    isLoading.value = false
  }, remaining)
}
