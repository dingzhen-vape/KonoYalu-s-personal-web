// ============================================================
// 全局加载状态（模块级共享响应式状态）
// 用途：路由守卫与 App.vue 之间共享"是否显示加载遮罩"
// 说明：App.vue 是组件实例，路由守卫在组件外拿不到其 data，
//       因此把加载状态提升为独立模块，双方 import 同一份引用
// ============================================================

import { ref } from 'vue'

// 是否显示加载遮罩（初始为 true：首屏加载期间遮罩已显示）
export const isLoading = ref(true)

// 遮罩开始显示的时刻（毫秒时间戳），用于计算最短停留时长
export const loadingStart = ref(0)

/**
 * 显示加载遮罩：重置计时起点并置 isLoading 为 true
 * 由路由 beforeEach 在页面切换前调用
 */
export function showLoading() {
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
  const remaining = Math.max(0, 500 - elapsed)
  setTimeout(() => {
    isLoading.value = false
  }, remaining)
}
