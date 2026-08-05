// ============================================================
// 应用入口
// 负责：引入全局样式、创建 Vue 应用、注册路由并挂载到 #app
// ============================================================

// 全局样式（含各板块 CSS：Hero/Works/TechStack/Loading/Contacts）
import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// 路由实例（/ 主页、/page2 画师页，含加载遮罩守卫）
import router from './router/index.ts'

// 创建应用 → 挂载路由 → 渲染到 #app
createApp(App).use(router).mount('#app')
