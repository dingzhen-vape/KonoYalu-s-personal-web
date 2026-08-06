// ============================================================
// 路由配置与加载遮罩守卫
// 路由：/ 主页（HomePage）、/page2 画师页（Page2）
// 守卫流程：点击导航 → 遮罩盖住旧页 → 盖满后在遮罩下切换
//           → 切换后计时揭开遮罩露出新页
// ============================================================

import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import Page2 from '../components/Page2.vue'
// 共享加载状态：showLoading 盖罩、finishLoading 揭罩
import { showLoading, finishLoading } from '../loading'

const router = createRouter({
  // HTML5 History 模式（URL 不带 #）
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/page2', name: 'page2', component: Page2 },
  ],
  scrollBehavior(to){
    if (to.hash){
      return(to.hash,{behavior:"instant"})
    }else{
      return{top:0,behavior:"instant"}
    }
  }
})

// 导航计数：防止快速连点时，旧导航的延迟放行覆盖新导航
let navId = 0

router.beforeEach((to, from, next) => {
  // 首次进入（from 无 name）：应用刚启动，遮罩本就显示，直接放行
  if (from.name === undefined) {
    next()
    return
  }
  // 同一路径跳转（仅锚点 hash 变化，如 #About 滚动）：不触发加载动画
  if (to.path === from.path) {
    next()
    return
  }
  const id = ++navId
  showLoading()
  // 等待遮罩盖住大半后再切换页面（切换动作发生在遮罩下，用户不可见）
  // 注意：此等待时长与 Loading.css 的动画时长耦合，
  //       修改动画时长时需同步调整此值，否则切换瞬间会暴露页面
  setTimeout(() => {
    if (id === navId) next()
  }, 400)
})

// 切换完成后：启动揭罩计时（保证最短停留时长，避免闪一下就消失）
router.afterEach(() => {
  finishLoading()
})

export default router
