<script lang="ts">
import HomePage from './components/HomePage.vue'
import axios from 'axios'

export default {
  components: {
    HomePage
  },
  data() {
    return {
      DailyWallpaper: ''
    }
  },
  async created() {
    this.DailyWallpaper = await getDailyWallpaper()
  }
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
    <img :src="DailyWallpaper" alt="" />
    <div class="bg-overlay"></div>
  </div>
  <main>
    <HomePage></HomePage>
  </main>
</template>
