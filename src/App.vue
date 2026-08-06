<script lang="ts">
// ============================================================
// App.vue — 全局应用框架
// 职责：
//   1. Bing 每日壁纸背景（含暗色遮罩）
//   2. 全局加载遮罩（金/黑双层斜切滑入滑出，由路由守卫控制）
//   3. 页面出口 RouterView + 全局自定义鼠标
// 说明：加载状态来自 src/loading.ts 共享模块（路由守卫也用同一份）
// ============================================================

import CustomCursor from './components/CustomCursor.vue'
import axios from 'axios'
// 共享加载状态（v-if 控制遮罩显隐、壁纸加载完成时揭罩、随机 tip 显示）
import { isLoading, currentTip, tipVisible, finishLoading } from './loading'

export default {
  components: {
    CustomCursor,
  },
  // 把共享状态暴露给模板使用（Options API 需 setup 返回）
  setup() {
    return { isLoading, currentTip, tipVisible }
  },
  data() {
    return {
      // 必应每日壁纸 URL（首次加载后缓存，路由切换不重复请求）
      DailyWallpaper: '',
    }
  },
  created() {
    // 应用启动时拉取壁纸（加载失败/成功都会走 finishLoading 揭罩）
    this.loadWallpaper()
  },

  methods: {
    /**
     * 请求必应每日壁纸（bing.biturl.top 返回完整图片 URL）
     * 成功后赋值给 DailyWallpaper，无论成败都触发揭罩计时
     */
    async loadWallpaper() {
      this.DailyWallpaper = await getDailyWallpaper()
      finishLoading()
    },
    // 模板中 <img> 的 @load/@error 兜底：壁纸图片加载结束即揭罩
    onWallpaperLoaded() {
      finishLoading()
    },
  },
}

/**
 * 拉取必应每日壁纸
 * @returns 壁纸图片完整 URL；失败返回 null（页面仅显示暗色遮罩）
 */
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
  <!-- ============ 背景层：Bing 壁纸 + 暗色遮罩 ============ -->
  <div class="bg-wrap">
    <!-- 壁纸图片加载完成/失败均调用 onWallpaperLoaded 关闭加载遮罩 -->
    <img :src="DailyWallpaper" alt="" @load="onWallpaperLoaded()" @error="onWallpaperLoaded()" />
    <div class="bg-overlay"></div>
  </div>

  <!-- ============ 页面出口：当前路由组件渲染位置 ============ -->
  <main>
    <RouterView />
  </main>




  <!-- 加载期间的提示框：右下角、暗色底 + 右侧金色竖杠，延迟弹出 -->
  <Transition name="tip-pop">
    <div v-if="tipVisible" class="loading-tips-border">
      <p>{{ currentTip }}</p>
    </div>
  </Transition>
  <!-- ============ 加载遮罩：双层斜切滑入/滑出（时序见 Loading.css） ============ -->
  <!-- 黑色层：后进入、先离开（盖在金色层上） -->
  <Transition name="fade-up">
    <div v-if="isLoading" class="loading-overlay-BLACK"></div>
  </Transition>
  <!-- 金色层：先进入、后离开 -->
  <Transition name="fade-down">
    <div v-if="isLoading" class="loading-overlay-ORANGE"></div>
  </Transition>

  <!-- 全局自定义鼠标（随移动方向旋转、背景反色） -->
  <CustomCursor />
</template>
