<script lang="ts">
import HomePage from './components/HomePage.vue'
import axios from 'axios'
import gsap from 'gsap';
export default {
  components: {
    HomePage,
  },
  data() {
    return {
      DailyWallpaper: '',
      isLoading: true,
      loadingStart: 0,
    }
  },
  async created() {
    this.loadingStart = Date.now()
    this.DailyWallpaper = await getDailyWallpaper()
    if (!this.DailyWallpaper) {
      this.finishLoading()
    }
  },

  mounted() {
    this.$nextTick(() =>{
      gsap.fromTo(".spinner",
        {
          opacity: 0,
          scale: 10,
        },{
          opacity: 1,
          scale: 1,
          duration: 1,
          ease:"power4.out"
        }
      )
    })
  },

  methods: {
    finishLoading() {
      if (!this.isLoading) return
      const elapsed = Date.now() - this.loadingStart
      const remaining = Math.max(0, 1000 - elapsed)
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
    <HomePage></HomePage>
  </main>
  <Transition name="fade">
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
      <p>加载中</p>
    </div>
  </Transition>
</template>
