<template>
  <!-- 四角高亮框：fixed 定位、透明本体，四角为金色 L 形 -->
  <div ref="box" class="magic-box"></div>
</template>

<script lang="ts">
// ============================================================
// MagicBox.vue — 全局唯一的"魔法高亮框"
// 功能：鼠标悬停到目标卡片时，一个独立的高亮框元素
//       自动移动并框住该卡片（事件委托 + GSAP 动画）
// 用法：<MagicBox targets=".tech-card, .work-card" />
// ============================================================

import gsap from 'gsap'

export default {
  name: 'MagicBox',
  props: {
    // 需要框住的卡片选择器（逗号分隔多个选择器）
    targets: {
      type: String,
      required: true,
    },
  },
  mounted() {
    // 事件委托挂到 document：鼠标悬停任何元素都会触发检查
    document.addEventListener('mouseover', this.onMouseOver)
  },
  beforeUnmount() {
    document.removeEventListener('mouseover', this.onMouseOver)
  },
  methods: {
    /**
     * mouseover 处理：从悬停元素向上查找最近的卡片
     * 找到 → 读取卡片位置尺寸，GSAP 动画移动高亮框并淡入
     * 没找到（悬停空白区域）→ 高亮框淡出
     */
    onMouseOver(e: MouseEvent) {
      const el = this.$refs.box as HTMLElement
      // closest()：从 e.target 逐级向上查找匹配卡片选择器的元素
      // （悬停卡片内任意子元素都能命中卡片本身）
      const card = (e.target as Element).closest(this.targets)
      if (!card) {
        if (this.visible) {
          this.visible = false
          gsap.to(el, { opacity: 0, duration: 0.2, overwrite: 'auto' })
        }
        return
      }
      // getBoundingClientRect()：卡片相对视口的几何信息（与 fixed 定位同坐标系）
      const rect = card.getBoundingClientRect()
      this.visible = true
      // GSAP 动画：平滑移动框到卡片位置（缓出，overwrite 防止动画堆积）
      gsap.to(el, {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        opacity: 1,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      })
    },
  },
  data() {
    return {
      // 高亮框当前是否可见（避免重复触发淡出动画）
      visible: false,
    }
  },
}
</script>

<style scoped>
/* 高亮框本体：fixed 定位、不拦截鼠标事件、z-index 高于卡片 */
.magic-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0;
  /* 用多段 CSS 渐变绘制 L 形金色角（每角两段线段） */
  background:
    linear-gradient(var(--accent), var(--accent)) top left / 16px 3px no-repeat,
    linear-gradient(var(--accent), var(--accent)) top left / 3px 16px no-repeat,
    linear-gradient(var(--accent), var(--accent)) top right / 16px 3px no-repeat,
    linear-gradient(var(--accent), var(--accent)) top right / 3px 16px no-repeat,
    linear-gradient(var(--accent), var(--accent)) bottom left / 16px 3px no-repeat,
    linear-gradient(var(--accent), var(--accent)) bottom left / 3px 16px no-repeat,
    linear-gradient(var(--accent), var(--accent)) bottom right / 16px 3px no-repeat,
    linear-gradient(var(--accent), var(--accent)) bottom right / 3px 16px no-repeat;
}
</style>
