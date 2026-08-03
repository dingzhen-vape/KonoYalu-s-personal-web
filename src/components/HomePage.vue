<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <nav id="NavBar">
      <div class="nav-brand">食我压路</div>
      <ul class="nav-links">
        <li><a href="#Home">主页</a></li>
        <li><a href="#About">关于</a></li>
        <li><a href="#Works">作品</a></li>
      </ul>
    </nav>

    <!-- Hero 首屏 -->
    <section id="Home">
      <div class="hero-vertical">作品集 · 二〇二六</div>
      <h1 class="hero-name">食我压路</h1>
      <p class="hero-sub">把想法做成东西的人，前端开发爱好者</p>
      <div class="hero-actions">
        <a href="#Works" class="btn-primary">查看作品</a>
        <a href="#About" class="btn-ghost">关于我</a>
      </div>
    </section>

    <!-- 关于我 -->
    <section id="About">
      <h2 class="section-title">关于我</h2>
      <div class="about-body">
        <div class="avatar">头像<br />占位</div>
        <div class="about-text">
          <p>你好，我是食我压路。这里是我放作品的地方——做过的项目、写过的东西都会整理在这里。</p>
          <p>享受把一个想法从零做成能用的东西的过程，目前专注前端方向。</p>
        </div>
      </div>
    </section>

    <!-- 作品集 -->
    <section id="Works">
      <h2 class="section-title">作品集</h2>
      <div class="works-grid">
        <a v-for="work in works" :key="work.title" class="work-card" :href="work.link">
          <div class="work-thumb" :style="{ background: work.thumbGradient }"></div>
          <div class="work-info">
            <h3 class="work-title">{{ work.title }}</h3>
            <p class="work-desc">{{ work.desc }}</p>
            <div class="work-tags">
              <span v-for="tag in work.tags" :key="tag" class="work-tag">{{ tag }}</span>
            </div>
          </div>
        </a>
      </div>
    </section>

    <!-- 底部 -->
    <footer>© 2026 食我压路</footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HomePage',
  data() {
    return {
      works: [
        {
          title: '个人博客',
          desc: '基于 Vue 3 的个人主页与作品展示',
          tags: ['Vue', 'Vite', 'TS'],
          thumbGradient: 'linear-gradient(135deg, #23232e, #3a3a4d)',
          link: '#'
        },
        {
          title: '待填项目',
          desc: '这里放你的第二个项目简介',
          tags: ['TODO'],
          thumbGradient: 'linear-gradient(135deg, #262b26, #39463a)',
          link: '#'
        },
        {
          title: '待填项目',
          desc: '这里放你的第三个项目简介',
          tags: ['TODO'],
          thumbGradient: 'linear-gradient(135deg, #2b2626, #463939)',
          link: '#'
        },
        {
          title: '待填项目',
          desc: '这里放你的第四个项目简介',
          tags: ['TODO'],
          thumbGradient: 'linear-gradient(135deg, #26262e, #373e4d)',
          link: '#'
        }
      ]
    }
  }
}
</script>
