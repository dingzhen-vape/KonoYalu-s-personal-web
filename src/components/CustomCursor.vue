<template>
  <img ref="cursor" class="custom-cursor" :src="cursorIcon" alt="" />
</template>

<script lang="ts">
import gsap from 'gsap'
import cursorIcon from '../assets/imgs/cursor/cursor-1.svg'

export default {
  name: 'CustomCursor',
  data() {
    return {
      cursorIcon,
      lastX: 0,
      lastY: 0,
      hasLast: false,
      currentAngle: 0,
    }
  },
  mounted() {
    document.body.classList.add('has-custom-cursor')
    window.addEventListener('mousemove', this.onMouseMove)
    window.addEventListener('mouseleave', this.onMouseLeave)
    window.addEventListener('mouseenter', this.onMouseEnter)
  },
  beforeUnmount() {
    document.body.classList.remove('has-custom-cursor')
    window.removeEventListener('mousemove', this.onMouseMove)
    window.removeEventListener('mouseleave', this.onMouseLeave)
    window.removeEventListener('mouseenter', this.onMouseEnter)
  },
  methods: {
    onMouseMove(e: MouseEvent) {
      const el = this.$refs.cursor as HTMLElement
      if (!this.hasLast) {
        this.hasLast = true
        gsap.set(el, {
          x: e.clientX - 14,
          y: e.clientY - 14,
          rotation: 0,
          opacity: 1,
        })
        return
      }
      if (Math.abs(e.clientX - this.lastX) > 10 || Math.abs(e.clientY - this.lastY) > 10) {
        const rawAngle = (Math.atan2(e.clientY - this.lastY, e.clientX - this.lastX) * 180) / Math.PI + 90
        let targetAngle = rawAngle
        while (targetAngle - this.currentAngle > 180) targetAngle -= 360
        while (targetAngle - this.currentAngle < -180) targetAngle += 360
        this.currentAngle = targetAngle
        gsap.to(el, {
          rotation: targetAngle,
          duration: 0.25,
          ease: 'power2.out',
          overwrite: 'auto',
        })
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
    onMouseLeave() {
      const el = this.$refs.cursor as HTMLElement
      gsap.to(el, { opacity: 0, duration: 0.2 })
    },
    onMouseEnter() {
      const el = this.$refs.cursor as HTMLElement
      gsap.to(el, { opacity: 1, duration: 0.2 })
    },
  },
}
</script>

<style scoped>
.custom-cursor {
  position: fixed;
  left: 0;
  top: 0;
  width: 28px;
  height: 28px;
  pointer-events: none;
  z-index: 9999;
  transform-origin: 14px 14px;
  opacity: 0;
}
</style>
