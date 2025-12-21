<template>
  <div class="app-container">
    <!-- 背景图片 -->
    <div class="background-image">
      <img src="/images/无限循环图片墙1080p%20.gif" alt="背景动画" />
      <div class="background-overlay"></div>
    </div>

    <main class="main-content">
      <header class="app-header">
        <h1 class="app-title">
          <span class="text-switch" :key="currentText">{{ currentText }}</span>
        </h1>
      </header>
      
      <nav class="nav-container">
        <RouterLink to="/home" class="nav-card home-card" aria-label="首页">
          <div class="card-inner">
            <div class="card-icon">🏠</div>
            <h2 class="card-title">首页</h2>
            <p class="card-description">进入首页</p>
            <div class="card-arrow">→</div>
          </div>
        </RouterLink>
      </nav>
    </main>
    
    <footer class="app-footer">
      <p class="footer-text">© 2025 花落</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

// 文字列表
const textList = [
  '花开花落',
  '春秋蝉鸣',
  '少年归来',
  '岁月如歌'
]

const currentText = ref(textList[0])
let currentIndex = 0
let intervalId: number | null = null

// 切换文字
const switchText = () => {
  currentIndex = (currentIndex + 1) % textList.length
  currentText.value = textList[currentIndex]
}

onMounted(() => {
  // 每3秒切换一次文字
  intervalId = window.setInterval(switchText, 3000)
})

onUnmounted(() => {
  if (intervalId !== null) {
    clearInterval(intervalId)
  }
})
</script>

<style scoped>
/* 容器样式 */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

/* 背景图片 */
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.background-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.5) 100%
  );
  backdrop-filter: blur(0px);
}

/* 动态背景 */
.app-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle at center,
    rgba(100, 200, 255, 0.08) 0%,
    transparent 50%
  );
  animation: rotateBackground 30s linear infinite;
  pointer-events: none;
}

@keyframes rotateBackground {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 头部 */
.app-header {
  padding: 8rem 2rem 4rem;
  text-align: center;
  position: relative;
  z-index: 1;
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

.app-title {
  font-size: clamp(3rem, 10vw, 5rem);
  font-weight: 900;
  letter-spacing: 3px;
  text-transform: uppercase;
  position: relative;
  display: inline-block;
  min-height: 1.5em;
  perspective: 1000px;
}

.text-switch {
  display: inline-block;
  background: linear-gradient(135deg, #fff 0%, #64c8ff 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: textFadeIn 1s ease-out, titleGlow 3s ease-in-out infinite;
  transform-style: preserve-3d;
}

/* 淡入动画 - 增强版 */
@keyframes textFadeIn {
  0% {
    opacity: 0;
    transform: translateY(-100px) scale(0.3);
  }
  50% {
    opacity: 0.5;
    transform: translateY(-50px) scale(0.65);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* 淡出动画 - 增强版 */
.text-switch.fade-out {
  animation: textFadeOut 0.6s ease-in forwards;
}

@keyframes textFadeOut {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1) rotateX(0deg);
    filter: blur(0px);
  }
  50% {
    opacity: 0.5;
    transform: translateY(40px) scale(0.75) rotateX(-45deg);
    filter: blur(10px);
  }
  100% {
    opacity: 0;
    transform: translateY(80px) scale(0.5) rotateX(-90deg);
    filter: blur(20px);
  }
}

@keyframes titleGlow {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(100, 200, 255, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 40px rgba(100, 200, 255, 0.8));
  }
}

/* 主内容 */
.main-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 1;
}

.nav-container {
  display: flex;
  gap: 3rem;
  max-width: 1400px;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
}

/* 导航卡片 */
.nav-card {
  text-decoration: none;
  color: inherit;
  flex: 1;
  min-width: 320px;
  max-width: 450px;
  animation: fadeInUp 0.8s ease-out backwards;
}

.nav-card:nth-child(1) {
  animation-delay: 0.2s;
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

.card-inner {
  position: relative;
  width: 100%;
  height: 350px;
  background: radial-gradient(
    ellipse at center,
    rgba(20, 20, 20, 0.5) 0%,
    rgba(30, 30, 30, 0.3) 50%,
    rgba(20, 20, 20, 0.15) 80%,
    transparent 100%
  );
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 24px;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

/* 卡片背景动画 */
.card-inner::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(100, 200, 255, 0.15) 0%,
    transparent 70%
  );
  animation: rotateCard 20s linear infinite;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.nav-card:hover .card-inner::before {
  opacity: 1;
}

@keyframes rotateCard {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 卡片悬停效果 */
.nav-card:hover .card-inner {
  box-shadow: 0 30px 80px rgba(100, 200, 255, 0.4);
  transform: translateY(-15px) scale(1.03);
}

/* 卡片图标 */
.card-icon {
  font-size: 6rem;
  margin-bottom: 2rem;
  filter: drop-shadow(0 0 20px rgba(100, 200, 255, 0.6));
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.nav-card:hover .card-icon {
  transform: scale(1.2) rotate(10deg);
  filter: drop-shadow(0 0 40px rgba(100, 200, 255, 0.9));
}

/* 卡片标题 */
.card-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #64c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.nav-card:hover .card-title {
  transform: scale(1.05);
}

/* 卡片描述 */
.card-description {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.nav-card:hover .card-description {
  color: #cbd5e1;
}

/* 卡片箭头 */
.card-arrow {
  font-size: 2rem;
  color: #64c8ff;
  font-weight: bold;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.4s ease;
  position: relative;
  z-index: 1;
}

.nav-card:hover .card-arrow {
  opacity: 1;
  transform: translateX(0);
  animation: arrowBounce 1s ease-in-out infinite;
}

@keyframes arrowBounce {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
}

/* 页脚 */
.app-footer {
  padding: 3rem 2rem;
  text-align: center;
  position: relative;
  z-index: 1;
  border-top: 1px solid rgba(100, 200, 255, 0.2);
}

.footer-text {
  font-size: 1rem;
  color: #64748b;
  letter-spacing: 1px;
  transition: all 0.3s ease;
}

.footer-text:hover {
  color: #64c8ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .app-header {
    padding: 6rem 1rem 3rem;
  }

  .app-title {
    font-size: 2.5rem;
  }

  .main-content {
    padding: 1rem;
  }

  .nav-container {
    flex-direction: column;
    gap: 2rem;
  }

  .nav-card {
    min-width: 100%;
    max-width: 100%;
  }

  .card-inner {
    height: 300px;
    padding: 2rem;
  }

  .card-icon {
    font-size: 4.5rem;
    margin-bottom: 1.5rem;
  }

  .card-title {
    font-size: 2rem;
  }

  .card-description {
    font-size: 1rem;
  }

  .app-footer {
    padding: 2rem 1rem;
  }
}

@media (max-width: 480px) {
  .app-header {
    padding: 5rem 1rem 2rem;
  }

  .app-title {
    font-size: 2rem;
    letter-spacing: 2px;
  }

  .card-inner {
    height: 280px;
    padding: 1.5rem;
  }

  .card-icon {
    font-size: 4rem;
  }

  .card-title {
    font-size: 1.75rem;
  }

  .card-description {
    font-size: 0.95rem;
  }
}
</style>