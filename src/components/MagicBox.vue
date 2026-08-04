<template>
  <div ref="box" class="magic-box"></div>
</template>

<script lang="ts">
import gsap from 'gsap'

export default {
  name: 'MagicBox',
  props: {
    targets: {
      type: String,
      required: true,
    },
  },
  mounted() {
    document.addEventListener('mouseover', this.onMouseOver)
  },
  beforeUnmount() {
    document.removeEventListener('mouseover', this.onMouseOver)
  },
  methods: {
    onMouseOver(e: MouseEvent) {
      const el = this.$refs.box as HTMLElement
      const card = (e.target as Element).closest(this.targets)
      if (!card) {
        if (this.visible) {
          this.visible = false
          gsap.to(el, { opacity: 0, duration: 0.2, overwrite: 'auto' })
        }
        return
      }
      const rect = card.getBoundingClientRect()
      this.visible = true
      gsap.to(el, {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        opacity: 1,
        duration: 0.5,
        ease: 'power4.out',
        overwrite: 'auto',
      })
    },
  },
  data() {
    return {
      visible: false,
    }
  },
}
</script>

<style scoped>
.magic-box {
  position: fixed;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 999;
  opacity: 0;
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
