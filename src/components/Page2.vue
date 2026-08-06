<template>
  <div class="home-page">
    <!-- 导航栏 -->
    <nav id="NavBar">
      <div class="nav-brand">KONO_YALU</div>
      <ul class="nav-links">
        <li><a href="#Home">主页</a></li>
        <li><a href="#About">关于</a></li>
        <li><a href="#Works">作品</a></li>
        <li><a href="#Contacts">联系方式</a></li>
        <li id="another"><router-link to="/">除此之外</router-link></li>
      </ul>
    </nav>

    <!-- Hero 首屏 -->
    <section id="Home">
      <div class="hero-vertical">作品集 · 二〇二六</div>
      <h1 class="hero-name">KONO_YALU</h1>
      <p class="hero-sub">绘画爱好者</p>
      <div class="hero-actions">
        <a href="#Works" class="btn-primary">查看作品</a>
        <a href="#About" class="btn-ghost">关于我</a>
      </div>
    </section>

    <!-- 关于我 -->
    <section id="About">
      <h2 class="section-title">关于我</h2>
      <p class="section-en">ABOUT ME</p>
      <div class="about-body">
        <div class="avatar">
          <img src="../assets/imgs/Snipaste_2026-08-04_01-24-43.png" />
        </div>
        <div class="about-text">
          <p>Hello!这里是YALU ISFP,很高兴你能查看这个没什么用的网页awa</p>
          <p>一个福瑞画师(对),从23年11月开始学习</p>
          <p>截止至2026年8月6日,我现在正在学习光影渲染,结构刻画以及材质 背景的绘制(好难(sad))</p>
          <p>⬅️你能看到我的头像也是我自己画的(画的是Deltarune的Raisei)</p>
          <p>额,欢迎扩列!</p>
        </div>
      </div>
    </section>

    <!-- 作品集 -->
    <section id="Works">
      <h2 class="section-title">作品集</h2>
      <p class="section-en">GALLERY</p>
      <div class="works-grid">
        <a v-for="work in works" :key="work.title" v-tilt class="work-card" :href="work.link">
          <div class="work-thumb-art">
            <img v-if="work.icon" :src="work.icon" />
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
      <p class="section-en">CONTACT</p>
      <!-- <h3 class="section-sub">Where you can find me</h3> -->
      <div class="contacts-grid">
        <a v-for="contact in Contacts" :key="contact.title" v-tilt class="work-card" :href="contact.link">
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
    <MagicBox targets=".tech-card, .work-card, .contact-card" />
  </div>
</template>

<script lang="ts">
// ============================================================
// Page2.vue — 画师作品集页（KONO_YALU，路由 /page2）
// 板块：导航栏 / Hero 首屏 / 关于我 / 作品集 / 联系方式 / 底部
// 数据：works（画作占位示例）、Contacts（B站小号/Pixiv/X/QQ）
// 说明：与 HomePage 共用 main.css 全局样式（Hero/Works/Contacts 等）
// ============================================================

// MagicBox：悬停时自动框住卡片的四角高亮框组件
import MagicBox from './MagicBox.vue'
// 联系方式图标（本地 SVG）
import bilibiliIcon from '../assets/imgs/哔哩哔哩.svg'
import XIcon from '../assets/imgs/x (1).svg'
import PixivIcon from '../assets/imgs/Pixiv.svg'
import QQIcon from '../assets/imgs/qq.svg'
import Work1 from '../assets/imgs/MyArtWorks/稿件20260726165823-info.png'
import Work2 from '../assets/imgs/MyArtWorks/ralsei2.png'
import Work3 from '../assets/imgs/MyArtWorks/wowaa.png'
import Work4 from '../assets/imgs/MyArtWorks/QQQ.png'
// 滚动进场动画（滚入视口时淡入 + 右移）
import { initReveal } from '../reveal'
export default {
  name: 'HomePage',
  components: {
    MagicBox,
  },
  mounted() {
    // 页面挂载后初始化滚动进场动画（路由切换重扫安全）
    this.$nextTick(() => initReveal(this.$el))
  },
  data() {
    return {
      // ---------- 画作作品集（icon 填本地图片路径，link 可指向投稿页） ----------
      works: [
        {
          title: '稿件作品',
          icon: Work1,
          desc: '近期我较为满意的一张双人半身氛围作品,但我个人感觉仍有进步空间',
          link: '#',
          tags: ['插画', '半身','氛围',"双人"],
        },
        {
          title: 'Deltarune Ralsei',
          icon: Work2,
          desc: '氛围感作品,当时玩玩Deltarune有感而发,我挺喜欢这个作品的',
          link: '#',
          tags: ['插画','Ralsei',"Deltarune"],
        },
        {
          title: '自设半身',
          icon: Work3,
          desc: '聚光灯氛围感作品,还行看着',
          link: '#',
          tags: ['半身','自设'],
        },
        {
          title: 'OC 夏煜',
          icon: Work4,
          desc: '想画QQ,但是我的画风好像不太适合画QQ,这个姿势也是有参考的,这也是我第一次尝试用颜色将线稿盖掉',
          link: '#',
          tags: ['OC',"夏煜"],
        },
      ],
      // ---------- 联系方式（点击卡片跳转外部链接） ----------
      Contacts: [
        {
          title: 'Bilibili',
          icon: bilibiliIcon,
          desc: 'B站主页(我的小号)',
          link: 'https://space.bilibili.com/3546601740044597?spm_id_from=333.1007.0.0',
        },
        {
          title: 'Pixiv',
          icon: PixivIcon,
          desc: '蓝P的主页',
          link: 'https://www.pixiv.net/users/64369758',
        },
        {
          title: 'X',
          icon: XIcon,
          desc: '推特)',
          link: 'https://x.com/KONO_YALU',
        },
        {
          title: 'QQ',
          icon: QQIcon,
          desc: 'QQ群喵',
          link: 'https://qm.qq.com/q/3obp1T4wus',
        },
      ],
    }
  },
}
</script>
