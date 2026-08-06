import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 部署在仓库子路径下，构建产物资源路径必须指向该子路径
  base: '/KonoYalu-s-personal-web/',
  // 构建输出到 docs/：GitHub Pages 从 main 分支的 /docs 目录发布
  build: {
    outDir: 'docs',
  },
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
