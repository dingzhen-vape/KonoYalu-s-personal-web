// ============================================================
// reveal.ts — 滚动进场缓入动画
// 功能：页面元素滚动进入视口时，淡入 + 从右侧移入到位
// 使用：initReveal(根元素) 在页面组件 mounted 后调用
// 说明：ScrollTrigger 是 gsap 内置插件，无需额外安装
// ============================================================

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// 文字元素选择器（淡入 + 右移）
const TEXT_SELECTOR =
  '.section-title, .section-en, .section-sub, .hero-vertical, .hero-name, .hero-sub, .hero-actions, .about-body, .thanks-list, footer'

// 卡片选择器（仅淡入，不动 transform 避免与 v-tilt 冲突）
const CARD_SELECTOR = '.tech-card, .work-card'

/**
 * 为根元素内的目标元素创建滚动进场动画
 * @param root 页面根元素（通常传组件 this.$el）
 * 用 data-revealed 去重：路由切换重复调用时不会重复创建动画
 */
export function initReveal(root: HTMLElement) {
  createTween(root.querySelectorAll(TEXT_SELECTOR), { x: 30 })
  createTween(root.querySelectorAll(CARD_SELECTOR), {})
}

function createTween(elements: NodeListOf<Element>, from: { x?: number }) {
  elements.forEach((el) => {
    const target = el as HTMLElement
    if (target.dataset.revealed) return
    target.dataset.revealed = '1'
    gsap.fromTo(
      target,
      { opacity: 0, ...from }, // 初始：透明（文字另加右侧偏移）
      {
        opacity: 1,
        x: 0, // 到位：淡入 + 回原位
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: target, start: 'top 88%' }, // 滚入视口 88% 处触发
      },
    )
  })
}
