<template>
  <div class="about-container">
    <!-- 背景粒子效果 -->
    <div class="particles-bg">
      <div class="particle" v-for="i in 20" :key="i" :style="getParticleStyle(i)"></div>
    </div>

    <div class="content-wrapper">
      <div class="profile-section">
        <div class="avatar-container">
          <div class="avatar-wrapper">
            <img class="avatar" src="/images/tx.jpg" alt="个人头像" />
            <div class="avatar-glow"></div>
          </div>
          <h2 class="profile-name">末路. 花落</h2>
        </div>

        <div class="typewriter-container">
          <div v-for="item in text" :key="item.text" class="typewriter-item">
            <Typewriter
                :text="item.text"
                :speed="item.speed"
                :delay="item.delay"
                :color="item.color"
                :fontSize="item.fontSize"
            />
          </div>
        </div>
      </div>

      <div class="divider">
        <div class="divider-line"></div>
        <div class="divider-icon">✦</div>
        <div class="divider-line"></div>
      </div>

      <div class="contact-section">
        <div class="contact-item">
          <div class="contact-icon github">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </div>
          <a href="https://github.com/duwuzhou" target="_blank" rel="noopener noreferrer">
            github.com/duwuzhou
          </a>
        </div>
        <div class="contact-item">
          <div class="contact-icon email">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="currentColor" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            </svg>
          </div>
          <a href="mailto:1503965150@qq.com">1503965150@qq.com</a>
        </div>
      </div>

      <div class="about-section">
        <h3 class="section-title">关于我</h3>
        <div class="about-content">
          <div class="about-text">
            我的童年充满着悲剧的色彩，在幼时我是一个留守儿童。在五年级父母就各奔东西了，父亲并没有给过我关怀，包括基本的教育，很少的抚养义务。母亲在我多少岁时组建了新的家庭，我也记不清了。我的所以认知基本都是在网络还有悲痛的童年中获取。
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Typewriter from '../components/Typewriter.vue'

const text = ref([
  {
    text: '心如悲歌',
    speed: 100,
    color: '#00d4ff',
    fontSize: '24px'
  },
  {
    text: '不在,不存',
    speed: 100,
    delay: 1000,
    color: '#7c3aed',
    fontSize: '20px'
  }
])

// 生成粒子样式
const getParticleStyle = (_index: number) => {
  const size = Math.random() * 4 + 1
  const duration = Math.random() * 20 + 10
  const delay = Math.random() * 5
  const posX = Math.random() * 100
  const posY = Math.random() * 100
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${posX}%`,
    top: `${posY}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
    opacity: Math.random() * 0.5 + 0.2
  }
}
</script>

<style scoped>
.about-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  overflow: hidden;
  background: transparent;
}

/* 粒子背景 */
.particles-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
}

.particle {
  position: absolute;
  background: #00d4ff;
  border-radius: 50%;
  animation: float linear infinite;
  box-shadow: 0 0 10px 2px rgba(0, 212, 255, 0.5);
}

@keyframes float {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(720deg);
    opacity: 0;
  }
}

.content-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
}

.avatar-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.avatar-wrapper {
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  box-shadow: 0 0 0 4px rgba(0, 212, 255, 0.3);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.avatar-wrapper:hover {
  transform: scale(1.05);
  box-shadow: 0 0 0 6px rgba(0, 212, 255, 0.5), 0 0 30px rgba(0, 212, 255, 0.7);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.avatar-wrapper:hover .avatar {
  transform: scale(1.1);
}

.avatar-glow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle at center, transparent 50%, rgba(0, 212, 255, 0.4) 100%);
  animation: pulse 3s infinite alternate;
}

@keyframes pulse {
  0% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  100% {
    opacity: 0.7;
    transform: scale(1.05);
  }
}

.profile-name {
  font-size: 1.8rem;
  font-weight: 600;
  color: #fff;
  margin: 0;
  letter-spacing: 0.05em;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
}

.typewriter-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;
}

.typewriter-item {
  text-align: center;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  width: 100%;
}

.divider-line {
  height: 1px;
  width: 100%;
  background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.divider-icon {
  margin: 0 1rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 1.2rem;
}

.contact-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 2rem 0;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.contact-icon.github {
  background: linear-gradient(135deg, #333, #555);
}

.contact-icon.email {
  background: linear-gradient(135deg, #ea4335, #d93025);
}

.contact-item a {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.2s ease;
}

.contact-item a:hover {
  color: #00d4ff;
}

.about-section {
  margin-top: 2rem;
}

.section-title {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 1.5rem;
  text-align: center;
  position: relative;
  padding-bottom: 0.5rem;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(to right, transparent, #00d4ff, transparent);
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.about-content .about-text {
  color: #cbd5e1;
  line-height: 1.6;
  margin: 0;
  text-align: justify;
  padding: 0.5rem 0;
}

.about-content .about-text:last-child {
  border-bottom: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 1rem;
  }
  
  .content-wrapper {
    padding: 2rem 1.5rem;
  }
  
  .avatar-wrapper {
    width: 120px;
    height: 120px;
  }
  
  .profile-name {
    font-size: 1.5rem;
  }
  
  .contact-item {
    padding: 0.8rem;
  }
  
  .contact-icon {
    width: 36px;
    height: 36px;
  }
}
</style>

