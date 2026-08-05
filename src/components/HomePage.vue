<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <nav id="NavBar">
      <div class="nav-brand">食我压路</div>
      <ul class="nav-links">
        <li><router-link to="/page2">主页</router-link></li>
        <li><a href="#About">关于</a></li>
        <li><a href="#TechStack">技术栈</a></li>
        <li><a href="#Works">作品</a></li>
        <li><a href="#Contacts">联系方式</a></li>
        <li id="another"><router-link to="/Page2">除此之外</router-link></li>
      </ul>
    </nav>

    <!-- Hero 首屏 -->
    <section id="Home">
      <div class="hero-vertical">作品集 · 二〇二六</div>
      <h1 class="hero-name">食我压路</h1>
      <p class="hero-sub">臭玩电脑的</p>
      <div class="hero-actions">
        <a href="#Works" class="btn-primary">查看作品</a>
        <a href="#About" class="btn-ghost">关于我</a>
      </div>
    </section>

    <!-- 关于我 -->
    <section id="About">
      <h2 class="section-title">关于我</h2>
      <div class="about-body">
        <div class="avatar">
          <img src="../assets/imgs/Snipaste_2026-08-04_01-24-43.png" />
        </div>
        <div class="about-text">
          <p>这里是食我压路,一个对编程充满热情的开发者</p>
          <p>享受从零搭建的过程,享受编程带来的乐趣,愿意不断学习新的事物</p>
          <p>目前正在研究 UnityMod制作 MinecraftMod开发 前端网页开发 等方向</p>
        </div>
      </div>
    </section>

    <!-- 技术栈 -->
    <section id="TechStack">
      <h2 class="section-title">技术栈</h2>
      <div id="TechDisplay">
        <a v-for="tech in sortedTechStack" :key="tech.name" class="tech-card" :href="tech.link">
          <div class="tech-thumb" :style="{ background: tech.thumbGradient }">
            <img :src="tech.icon" alt="" />
          </div>
          <div class="tech-info">
            <h3 class="tech-name">{{ tech.name }}</h3>
            <p class="tech-desc">{{ tech.desc }}</p>
            <div class="tech-proficiency">
              <div class="tech-proficiency-fill" :style="{ width: tech.level + '%' }"></div>
            </div>
            <span class="tech-proficiency-level">{{ tech.level }}%</span>
          </div>
        </a>
      </div>
    </section>

    <!-- 作品集 -->
    <section id="Works">
      <h2 class="section-title">作品集</h2>
      <div class="works-grid">
        <a v-for="work in works" :key="work.title" class="work-card" :href="work.link">
          <div class="work-thumb" :style="{ background: work.thumbGradient }">
            <img :src="work.icon" />
          </div>
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

    <!-- 联系方式 -->
    <section id="Contacts">
      <h2 class="section-title">联系方式</h2>
      <h3 class="section-sub">哪个地方可以找到我</h3>
      <div class="contacts-grid">
        <a v-for="contact in Contacts" :key="contact.title" class="work-card" :href="contact.link">
          <div
            class="contact-thumb"
            style="background-image: linear-gradient(135deg, #23232e, #3a3a4d)"
          >
            <img :src="contact.icon" alt="" />
          </div>
          <div class="contact-info">
            <h3 class="contact-title">{{ contact.title }}</h3>
            <p class="contact-desc">{{ contact.desc }}</p>
          </div>
        </a>
      </div>
    </section>

    <!-- 底部 -->
    <footer>© 2026 食我压路 Written at 2026-08-04</footer>
    <MagicBox targets=".tech-card, .work-card, .contact-card,h1,h2,h3" />
  </div>
</template>

<script lang="ts">
// ============================================================
// HomePage.vue — 主页（开发者作品集）
// 板块：导航栏 / Hero 首屏 / 关于我 / 技术栈 / 作品集 / 联系方式 / 底部
// 数据：TechStack（技术栈）、works（作品）、Contacts（联系方式）
// 组件：MagicBox（金色四角高亮框，悬停卡片时自动框住）
// ============================================================

// MagicBox：悬停时自动框住卡片的四角高亮框组件
import MagicBox from './MagicBox.vue'
// 技术栈图标（本地 SVG）
import cplusplusIcon from '../assets/imgs/cplusplus.svg'
import csharpIcon from '../assets/imgs/Csharp2.svg'
import pythonIcon from '../assets/imgs/python.svg'
import javascriptIcon from '../assets/imgs/JavaScript.svg'
import javaIcon from '../assets/imgs/java.svg'
import vueIcon from '../assets/imgs/Vue.svg'
// 联系方式图标（本地 SVG）
import bilibiliIcon from '../assets/imgs/哔哩哔哩.svg'
import githubIcon from '../assets/imgs/github-fill.svg'
// 作品缩略图（Minecraft Mod 汉化项目图标）
import wurstIcon from '../assets/imgs/works/Wurst.png'
import meteorIcon from '../assets/imgs/works/Meteor.png'

export default {
  name: 'HomePage',
  components: {
    MagicBox,
  },
  data() {
    return {
      // ---------- 技术栈（level 为熟练度，展示时按降序排列） ----------
      TechStack: [
        {
          name: 'C++',
          desc: '面向对象编程,算法与底层开发',
          icon: cplusplusIcon,
          level: 5,
          thumbGradient: 'linear-gradient(135deg, #23232e, #3a3a4d)',
          link: '#',
        },
        {
          name: 'C#',
          desc: '.NET 平台开发与应用',
          icon: csharpIcon,
          level: 10,
          thumbGradient: 'linear-gradient(135deg, #262b3a, #3d4a6b)',
          link: '#',
        },
        {
          name: 'Python',
          desc: '脚本编写与自动化处理',
          icon: pythonIcon,
          level: 80,
          thumbGradient: 'linear-gradient(135deg, #262b26, #3d6b4a)',
          link: '#',
        },
        {
          name: 'JavaScript',
          desc: '前端开发主力语言',
          icon: javascriptIcon,
          level: 50,
          thumbGradient: 'linear-gradient(135deg, #2b2626, #6b4a3d)',
          link: '#',
        },
        {
          name: 'Java',
          desc: '跨平台应用与后端开发',
          icon: javaIcon,
          level: 10,
          thumbGradient: 'linear-gradient(135deg, #26262e, #4a3d6b)',
          link: '#',
        },
        {
          name: 'Vue',
          desc: '渐进式前端框架,本博客就是用它构建的',
          icon: vueIcon,
          level: 70,
          thumbGradient: 'linear-gradient(135deg, #23302e, #3d6b5e)',
          link: '#',
        },
      ],
      // ---------- 作品集（icon 为缩略图，link 跳转 GitHub 仓库） ----------
      works: [
        {
          title: '个人博客',
          icon: vueIcon,
          desc: '基于 Vue 3 的个人主页与作品展示',
          tags: ['Vue', 'Vite', 'TS'],
          thumbGradient: 'linear-gradient(135deg, #23232e, #3a3a4d)',
          link: '#',
        },
        {
          title: 'WurstCN[归档]',
          icon: wurstIcon,
          desc: '对MiencraftMod的汉化以及相关优化',
          tags: ['Java'],
          thumbGradient: 'linear-gradient(135deg, #262b26, #39463a)',
          link: 'https://github.com/dingzhen-vape/WurstCN',
        },
        {
          title: 'MeteorCN[归档]',
          icon: meteorIcon,
          desc: 'MeteorMod的汉化以及字体修复',
          tags: ['Java'],
          thumbGradient: 'linear-gradient(135deg, #2b2626, #463939)',
          link: 'https://github.com/dingzhen-vape/MeteorCN',
        },
        {
          title: 'Wurst-I18n-Plugin',
          icon: wurstIcon,
          desc: '使用java实现的WurstMod汉化插件',
          tags: ['Java'],
          thumbGradient: 'linear-gradient(135deg, #26262e, #373e4d)',
          link: 'https://github.com/dingzhen-vape/WurstI18nPlusPlugin',
        },
        {
          title: 'Meteor-I18n-Plugin',
          icon: meteorIcon,
          desc: '使用java实现的MeteorMod汉化插件',
          tags: ['Java'],
          thumbGradient: 'linear-gradient(135deg, #26262e, #373e4d)',
          link: 'https://github.com/dingzhen-vape/Meteor-I18n-Support-plugin',
        },
      ],
      // ---------- 联系方式（点击卡片跳转外部链接） ----------
      Contacts: [
        {
          title: 'Bilibili',
          icon: bilibiliIcon,
          desc: 'B站主页',
          link: 'https://space.bilibili.com/432060575',
        },
        {
          title: 'Github',
          icon: githubIcon,
          desc: 'github主页',
          link: 'https://github.com/dingzhen-vape?tab=repositories',
        },
      ],
    }
  },
  computed: {
    // 技术栈按熟练度降序排列（展示时最熟的排前面）
    sortedTechStack() {
      return [...this.TechStack].sort((a, b) => b.level - a.level)
    },
  },
}
</script>
