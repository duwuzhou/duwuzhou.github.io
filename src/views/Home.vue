<template>
  <div class="home-container">
    <!-- 背景图片区域 -->
    <div class="hero-section">
      <div class="hero-background">
        <LazyImage
          src="/images/1000041266.gif"
          alt="背景动画"
          loading="eager"
        />
        <div class="hero-overlay"></div>
      </div>

      <!-- 主标题 -->
      <div class="hero-content">
        <h1 class="hero-title">
          <Typewriter
            text="春秋蝉鸣少年归"
            :speed="120"
            :delay="300"
            color="#FFFFFF"
            fontSize="clamp(2.5rem, 8vw, 4.5rem)"
          />
        </h1>
        <div class="hero-subtitle">
          <Typewriter
            text="探索 · 创造 · 分享"
            :speed="100"
            :delay="2500"
            color="#64c8ff"
            fontSize="clamp(1.2rem, 4vw, 2rem)"
          />
        </div>
      </div>

      <!-- 简介卡片 -->
      <div class="intro-card">
        <div class="intro-content">
          <div class="intro-icon">👋</div>
          <h2 class="intro-title">你好，我是花落</h2>
          <p class="intro-description">
            一个热爱技术的开发者，专注于创建美观、高效的应用。
            喜欢探索新技术，享受编码带来的乐趣。
          </p>
        </div>
      </div>
    </div>

    <!-- 技能展示区域 -->
    <div class="skills-section">
      <h2 class="section-title">
        <span class="title-icon">💻</span>
        技术栈
      </h2>
      <div class="skills-grid">
        <div
          v-for="(skill, index) in skills"
          :key="index"
          class="skill-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="skill-icon">{{ skill.icon }}</div>
          <h3 class="skill-name">{{ skill.name }}</h3>
          <div class="skill-bar">
            <div
              class="skill-progress"
              :style="{ width: `${skill.level}%` }"
            ></div>
          </div>
          <span class="skill-level">{{ skill.level }}%</span>
        </div>
      </div>
    </div>

    <!-- 快速导航区域 -->
    <div class="navigation-section">
      <h2 class="section-title">
        <span class="title-icon">🚀</span>
        快速导航
      </h2>
      <div class="nav-grid">
        <RouterLink
          v-for="(nav, index) in navItems"
          :key="index"
          :to="nav.path"
          class="nav-item"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="nav-icon">{{ nav.icon }}</div>
          <h3 class="nav-title">{{ nav.title }}</h3>
          <p class="nav-description">{{ nav.description }}</p>
          <div class="nav-arrow">→</div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import Typewriter from '@/components/Typewriter.vue'
import LazyImage from '@/components/LazyImage.vue'

// 技能数据
const skills = ref([
  { name: 'Vue.js', icon: '🎯', level: 85 },
  { name: 'TypeScript', icon: '📘', level: 80 },
  { name: 'JavaScript', icon: '⚡', level: 90 },
  { name: 'HTML/CSS', icon: '🎨', level: 95 },
  { name: 'Node.js', icon: '🟢', level: 75 },
  { name: 'Git', icon: '🔧', level: 85 },
  { name: 'Java', icon: '🐦', level: 70 },
  { name: 'Python', icon: '🐍', level: 75 },
  { name: 'C/C++', icon: '🐋', level: 65 }
])

// 导航项数据
const navItems = ref([
  {
    path: '/view1',
    icon: '📂',
    title: '我的项目',
    description: '查看我的开源项目和作品集'
  },
  {
    path: '/about',
    icon: '👤',
    title: '关于我',
    description: '了解更多关于我的信息'
  }
])

// 滚动动画观察器
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    }
  )

  // 观察技能卡片
  const skillCards = document.querySelectorAll('.skill-card')
  skillCards.forEach((card) => observer.observe(card))

  // 观察导航卡片
  const navItems = document.querySelectorAll('.nav-item')
  navItems.forEach((item) => observer.observe(item))

  // 观察区域标题
  const sectionTitles = document.querySelectorAll('.section-title')
  sectionTitles.forEach((title) => observer.observe(title))

  return observer
}

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = observeElements()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
/* 容器样式 */
.home-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* 英雄区域 */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 5vh;
  overflow: hidden;
}

/* 背景图片 */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-background :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: blur(0px);
  -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 65%, rgba(0, 0, 0, 0.15) 85%, transparent 100%);
  mask-image: radial-gradient(ellipse 100% 100% at 50% 50%, black 65%, rgba(0, 0, 0, 0.15) 85%, transparent 100%);
  transition: filter 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-section:hover .hero-background :deep(img) {
  filter: blur(8px);
  transform: scale(1.05);
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0.1) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
}

/* 主内容 */
.hero-content {
  position: relative;
  z-index: 3;
  text-align: center;
  padding: 2rem;
  margin-bottom: 3rem;
  animation: fadeInDown 1s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-weight: 800;
  margin: 0 0 2rem 0;
  text-shadow: 0 0 40px rgba(100, 200, 255, 0.5);
}

.hero-subtitle {
  font-weight: 600;
  letter-spacing: 4px;
}

/* 简介卡片 */
.intro-card {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 50%;
  z-index: 2;
  background: transparent;
  backdrop-filter: blur(0px);
  border: none;
  border-radius: 0;
  padding: 2rem;
  box-shadow: none;
  transition: all 0.4s ease;
  animation: fadeInUp 1s ease-out 0.5s both;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 1rem;
  pointer-events: none;
}

.intro-card .intro-content {
  pointer-events: auto;
  margin-top: -2rem;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.intro-card:hover {
  background: rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(3px);
}

.intro-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.intro-icon {
  font-size: 4rem;
  animation: wave 2s ease-in-out infinite;
}

@keyframes wave {
  0%, 100% { transform: rotate(0deg); }
  25% { transform: rotate(20deg); }
  75% { transform: rotate(-20deg); }
}

.intro-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #64c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.intro-description {
  font-size: 1.2rem;
  color: #cbd5e1;
  line-height: 1.8;
  margin: 0;
  text-align: center;
}

/* 区域标题 */
.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: linear-gradient(135deg, #fff 0%, #64c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  opacity: 0;
  transform: translateY(50px) scale(0.9);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.section-title.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.title-icon {
  font-size: 2.5rem;
  filter: drop-shadow(0 0 10px rgba(100, 200, 255, 0.6));
}

/* 技能区域 */
.skills-section {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: linear-gradient(145deg, rgba(20, 30, 50, 0.8), rgba(30, 40, 60, 0.7));
  backdrop-filter: blur(10px);
  border: 1px solid rgba(100, 200, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(80px) rotateX(20deg);
  transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.skill-card.visible {
  opacity: 1;
  transform: translateY(0) rotateX(0deg);
}

.skill-card:nth-child(1).visible { transition-delay: 0.1s; }
.skill-card:nth-child(2).visible { transition-delay: 0.2s; }
.skill-card:nth-child(3).visible { transition-delay: 0.3s; }
.skill-card:nth-child(4).visible { transition-delay: 0.4s; }
.skill-card:nth-child(5).visible { transition-delay: 0.5s; }
.skill-card:nth-child(6).visible { transition-delay: 0.6s; }
.skill-card:nth-child(7).visible { transition-delay: 0.7s; }
.skill-card:nth-child(8).visible { transition-delay: 0.8s; }
.skill-card:nth-child(9).visible { transition-delay: 0.9s; }

.skill-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.1), transparent);
  transition: left 0.6s ease;
}

.skill-card:hover::before {
  left: 100%;
}

.skill-card:hover {
  transform: translateY(-10px);
  border-color: rgba(100, 200, 255, 0.5);
  box-shadow: 0 20px 50px rgba(100, 200, 255, 0.3);
}

.skill-icon {
  font-size: 3.5rem;
  filter: drop-shadow(0 0 15px rgba(100, 200, 255, 0.6));
  transition: transform 0.4s ease;
}

.skill-card:hover .skill-icon {
  transform: scale(1.2) rotate(10deg);
}

.skill-name {
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.skill-bar {
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, #64c8ff, #00bfff);
  border-radius: 5px;
  transition: width 1.5s ease-out 0.5s;
  box-shadow: 0 0 15px rgba(100, 200, 255, 0.6);
}

.skill-level {
  font-size: 1rem;
  font-weight: 700;
  color: #64c8ff;
}

/* 导航区域 */
.navigation-section {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.nav-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 3rem;
}

.nav-item {
  background: linear-gradient(145deg, rgba(20, 30, 50, 0.9), rgba(30, 40, 60, 0.8));
  backdrop-filter: blur(15px);
  border: 2px solid rgba(100, 200, 255, 0.3);
  border-radius: 24px;
  padding: 3rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1.5rem;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  opacity: 0;
  transform: translateY(100px) scale(0.8);
  transition: all 1s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.nav-item.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.nav-item:nth-child(1).visible { transition-delay: 0.2s; }
.nav-item:nth-child(2).visible { transition-delay: 0.4s; }

.nav-item::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(100, 200, 255, 0.15) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
  opacity: 0;
  transition: opacity 0.4s ease;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.nav-item:hover::before {
  opacity: 1;
}

.nav-item:hover {
  transform: translateY(-15px) scale(1.03);
  border-color: rgba(100, 200, 255, 0.6);
  box-shadow: 0 30px 80px rgba(100, 200, 255, 0.4);
}

.nav-icon {
  font-size: 4rem;
  filter: drop-shadow(0 0 20px rgba(100, 200, 255, 0.6));
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.nav-item:hover .nav-icon {
  transform: scale(1.3) rotate(10deg);
  filter: drop-shadow(0 0 40px rgba(100, 200, 255, 0.9));
}

.nav-title {
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin: 0;
  background: linear-gradient(135deg, #fff 0%, #64c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  z-index: 1;
}

.nav-description {
  font-size: 1.1rem;
  color: #94a3b8;
  margin: 0;
  line-height: 1.6;
  position: relative;
  z-index: 1;
  transition: color 0.4s ease;
}

.nav-item:hover .nav-description {
  color: #cbd5e1;
}

.nav-arrow {
  font-size: 2rem;
  color: #64c8ff;
  font-weight: bold;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.nav-item:hover .nav-arrow {
  opacity: 1;
  transform: translateX(0);
  animation: arrowBounce 1s ease-in-out infinite;
}

@keyframes arrowBounce {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(10px); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-container {
    gap: 3rem;
  }

  .hero-content {
    padding: 1rem;
  }

  .intro-card {
    width: 95%;
    padding: 2rem;
  }

  .intro-icon {
    font-size: 3rem;
  }

  .intro-title {
    font-size: 2rem;
  }

  .intro-description {
    font-size: 1rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .skills-section,
  .navigation-section {
    padding: 3rem 1rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .nav-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .nav-item {
    padding: 2rem;
  }
}

@media (max-width: 480px) {
  .home-container {
    gap: 2rem;
  }

  .intro-card {
    padding: 1.5rem;
  }

  .intro-title {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .skill-card {
    padding: 1.5rem;
  }

  .nav-item {
    padding: 1.5rem;
  }
}
</style>
