<script lang="ts">
import CustomCursor from './components/CustomCursor.vue'
import axios from 'axios'
import gsap from 'gsap'
export default {
  components: {
    CustomCursor,
  },
  data() {
    return {
      DailyWallpaper: '',
      isLoading: true,
      loadingStart: 0,
    }
  },
  created() {
    this.showLoading()
  },

  watch: {
    '$route.path'() {
      this.showLoading()
    },
  },

  methods: {
    // playSpinnerAnimation() {
    //   gsap.fromTo(
    //     '.spinner',
    //     {
    //       opacity: 0,
    //       scale: 10,
    //     },
    //     {
    //       opacity: 1,
    //       scale: 1,
    //       duration: 1,
    //       ease: 'power4.out',
    //     },
    //   )
    // },
    showLoading() {
      this.loadingStart = Date.now()
      this.isLoading = true
      // this.$nextTick(() => {
      //   this.playSpinnerAnimation()
      // })
      if (this.DailyWallpaper) {
        this.finishLoading()
      } else {
        this.loadWallpaper()
      }
    },
    async loadWallpaper() {
      this.DailyWallpaper = await getDailyWallpaper()
      this.finishLoading()
    },
    finishLoading() {
      if (!this.isLoading) return
      const elapsed = Date.now() - this.loadingStart
      const remaining = Math.max(0, 500 - elapsed)
      setTimeout(() => {
        this.isLoading = false
      }, remaining)
    },
  },
}

async function getDailyWallpaper() {
  try {
    const res = await axios.get('https://bing.biturl.top/?format=json&resolution=UHD')
    return res.data.url
  } catch (error) {
    console.error('Error parsing JSON:', error)
    return null
  }
}
</script>

<template>


  <div class="bg-wrap">
    <img :src="DailyWallpaper" alt="" @load="finishLoading()" @error="finishLoading()" />
    <div class="bg-overlay"></div>
  </div>


  <main>
    <RouterView />
  </main>


  <Transition name="fade-up">
    <div v-if="isLoading" class="loading-overlay-BLACK"></div>
  </Transition>
  <Transition name="fade-down">
    <div v-if="isLoading" class="loading-overlay-ORANGE"></div>
  </Transition>


  <CustomCursor />
</template>
