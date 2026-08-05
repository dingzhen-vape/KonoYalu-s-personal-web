<template>
  <!-- 自定义鼠标图标（双头箭头，fixed 跟随鼠标） -->
  <img ref="cursor" class="custom-cursor" :src="cursorIcon" alt="" />
</template>

<script lang="ts">
// ============================================================
// CustomCursor.vue — 自定义鼠标
// 功能：
//   1. 替换系统光标（挂载时给 body 加 .has-custom-cursor 隐藏原生光标）
//   2. 箭头随移动方向旋转（GSAP 动画，角度跨边界时自动累积不抽搐）
//   3. mix-blend-mode: difference 让光标颜色始终为背景反色
// ============================================================

import gsap from 'gsap'
// 鼠标图标（纯白 SVG，配合 difference 混合实现自动反色）
import cursorIcon from '../assets/imgs/cursor/cursor-1.svg'

export default {
  name: 'CustomCursor',
  data() {
    return {
      cursorIcon,
      lastX: 0, // 上一次鼠标 X（用于计算移动方向）
      lastY: 0, // 上一次鼠标 Y
      hasLast: false, // 是否已有上一次位置（首次移动不计算方向）
      currentAngle: 0, // 当前累计旋转角度（避免角度边界跳变）
    }
  },
  mounted() {
    // 挂载：隐藏系统光标 + 注册事件监听
    document.body.classList.add('has-custom-cursor')
    window.addEventListener('mousemove', this.onMouseMove)
    // 鼠标移出/移入窗口时淡出/淡入光标
    window.addEventListener('mouseleave', this.onMouseLeave)
    window.addEventListener('mouseenter', this.onMouseEnter)
  },
  beforeUnmount() {
    // 卸载：恢复系统光标 + 移除监听
    document.body.classList.remove('has-custom-cursor')
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseleave', this.onMouseLeave)
    window.removeEventListener('mouseenter', this.onMouseEnter)
  },
  methods: {
    /**
     * 鼠标移动：更新位置 + 按移动方向旋转
     * 位置：位置补偿让图标中心对准鼠标点
     * 旋转：atan2(dy, dx) 得方向角，角度偏移适配图标默认竖直方向
     * 角度累积（unwrap）：角度持续累加，跨边界时取"离当前最近"
     *   的同义角度，避免绕大圈抽搐
     */
    onMouseMove(e: MouseEvent) {
      const el = this.$refs.cursor as HTMLElement
      if (!this.hasLast) {
        // 首次移动：直接定位不播放动画
        this.hasLast = true
        gsap.set(el, {
          x: e.clientX - 14,
          y: e.clientY - 14,
          rotation: 0,
          opacity: 1,
        })
        return
      }
      // 移动超过阈值才更新（过滤微抖动）
      if (Math.abs(e.clientX - this.lastX) > 10 || Math.abs(e.clientY - this.lastY) > 10) {
        // 计算移动方向角（基准方向为右，屏幕坐标 y 向下，角度为顺时针）
        const rawAngle = (Math.atan2(e.clientY - this.lastY, e.clientX - this.lastX) * 180) / Math.PI + 90
        // 角度累积：调整到与当前角度差值不超过半圈的同义角度
        let targetAngle = rawAngle
        while (targetAngle - this.currentAngle > 180) targetAngle -= 360
        while (targetAngle - this.currentAngle < -180) targetAngle += 360
        this.currentAngle = targetAngle
        // 旋转动画（缓出；overwrite 防止连续移动时动画堆积）
        gsap.to(el, {
          rotation: targetAngle,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        })
        // 位置跟随（轻微拖尾感）
        gsap.to(el, {
          x: e.clientX - 14,
          y: e.clientY - 14,
          duration: 0.1,
          ease: 'power2.out',
        })
        this.lastX = e.clientX
        this.lastY = e.clientY
      }
    },
    // 鼠标移出窗口：光标淡出
    onMouseLeave() {
      const el = this.$refs.cursor as HTMLElement
      gsap.to(el, { opacity: 0, duration: 0.2 })
    },
    // 鼠标进入窗口：光标淡入
    onMouseEnter() {
      const el = this.$refs.cursor as HTMLElement
      gsap.to(el, { opacity: 1, duration: 0.2 })
    },
  },
}
</script>

<style scoped>
/* 光标本体：fixed 跟随、不拦截点击、最顶层、背景反色混合 */
.custom-cursor {
  position: fixed;
  left: 0;
  top: 0;
  width: 28px;
  height: 28px;
  pointer-events: none;
  z-index: 9999;
  /* 差值混合：与背景颜色相减，亮背景显深色、暗背景显白色（自动反色） */
  mix-blend-mode: difference;
  /* 旋转中心 = 元素中心（与位置补偿对应） */
  transform-origin: 14px 14px;
  opacity: 0;
}
</style>
