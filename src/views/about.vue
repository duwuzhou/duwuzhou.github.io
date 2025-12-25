<template>
  <div class="about-container">
    <!-- 背景粒子效果 -->
    <div class="particles-bg">
      <div class="particle" v-for="i in 20" :key="i" :style="getParticleStyle(i)"></div>
    </div>

    <div class="content-wrapper">
      <!-- 使用ProfileCard组件 -->
      <ProfileCard 
        :name="'末路. 花落'"
        :title="'没有标题'"
        :bio="'不知道说什么'"
        :avatarUrl="'/images/tx.jpg'"
        :tags="['Vue', 'TypeScript', '前端开发', '后端开发', 'java','python','c/c++']"
        :socialLinks="socialLinks"
      />

      <div class="divider">
        <div class="divider-line"></div>
        <div class="divider-icon">✦</div>
        <div class="divider-line"></div>
      </div>

      <div class="about-section">
        <h3 class="section-title">关于我</h3>
        <div class="about-content">
          <div class="about-text">
            <p>你好！我是<strong>末路. 花落</strong>，一名大学生</p>
            <p>我喜欢编程，因为代码不会骗我，报错可以看日志。人会</p>
          </div>
        </div>
      </div>

      <div class="about-section">
        <h3 class="section-title">技术栈</h3>
        <div class="about-content">
          <div class="skills-grid">
            <div class="skill-item">
              <div class="skill-icon">⚡</div>
              <div class="skill-info">
                <h4>前端框架</h4>
                <p>Vue 3、React、TypeScript、js</p>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-icon">🎨</div>
              <div class="skill-info">
                <h4>UI/UX</h4>
                <p>CSS3、SCSS、动画效果、响应式设计、AE</p>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-icon">🛠️</div>
              <div class="skill-info">
                <h4>开发工具</h4>
                <p>Vite、Webpack、Git、VS Code、idea、ida</p>
              </div>
            </div>
            <div class="skill-item">
              <div class="skill-icon">🚀</div>
              <div class="skill-info">
                <h4>其他技能</h4>
                <p>不知道</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="about-section">
        <h3 class="section-title">兴趣爱好</h3>
        <div class="about-content">
          <div class="hobbies-list">
            <div class="hobby-item">
              <span class="hobby-icon">💻</span>
              <span class="hobby-text">写代码</span>
            </div>
            <div class="hobby-item">
              <span class="hobby-icon">🎵</span>
              <span class="hobby-text">听歌</span>
            </div>
            <div class="hobby-item">
              <span class="hobby-icon">📚</span>
              <span class="hobby-text">看蛊真人</span>
            </div>
            <div class="hobby-item">
              <span class="hobby-icon">🎮</span>
              <span class="hobby-text">打游戏</span>
            </div>
          </div>
        </div>
      </div>

      <div class="about-section">
        <h3 class="section-title">联系方式</h3>
        <div class="about-content">
          <div class="about-text">
            <p>如果你对我的项目感兴趣，或者想要交流技术、合作开发，欢迎随时联系我！</p>
            <p>我很乐意与志同道合的朋友一起探讨技术、分享经验。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProfileCard from '../components/ProfileCard.vue'

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

// 社交链接数据
const socialLinks = ref([
  { url: 'mailto:1503965150@qq.com', icon: '📧', label: '邮箱' },
  { url: 'https://github.com/duwuzhou', icon: '🌐', label: 'GitHub' },
  { url: '#', icon: '📱', label: '微信' }
])
</script>

<style scoped>
/* 容器样式 */
.about-container {
  min-height: 100vh;
  padding: 6rem 2rem 4rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(18, 18, 18, 0.98) 0%,
    rgba(25, 25, 25, 0.99) 50%,
    rgba(18, 18, 18, 0.98) 100%
  );
  overflow-x: hidden;
}

/* 粒子背景 */
.particles-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(100, 200, 255, 0.6) 0%,
    rgba(50, 150, 255, 0.3) 50%,
    transparent 100%
  );
  border-radius: 50%;
  animation: float linear infinite;
  box-shadow: 0 0 15px rgba(100, 200, 255, 0.4);
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

/* 内容包装器 */
.content-wrapper {
  width: 100%;
  max-width: 1200px;
  position: relative;
  z-index: 1;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 分隔线 */
.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4rem 0;
  gap: 1rem;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(100, 200, 255, 0.3),
    transparent
  );
}

.divider-icon {
  color: rgba(100, 200, 255, 0.6);
  font-size: 1.2rem;
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 关于我部分 */
.about-section {
  margin-bottom: 4rem;
  animation: slideUp 0.8s ease-out backwards;
}

.about-section:nth-child(2) { animation-delay: 0.1s; }
.about-section:nth-child(3) { animation-delay: 0.2s; }
.about-section:nth-child(4) { animation-delay: 0.3s; }
.about-section:nth-child(5) { animation-delay: 0.4s; }

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  text-transform: uppercase;
  letter-spacing: 3px;
  background: linear-gradient(135deg, #64c8ff 0%, #00bfff 50%, #64c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 15px rgba(100, 200, 255, 0.5));
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 3px;
  background: linear-gradient(90deg, transparent, rgba(100, 200, 255, 0.5), transparent);
  border-radius: 2px;
  box-shadow: 0 0 10px rgba(100, 200, 255, 0.3);
}

/* 内容区域 */
.about-content {
  background: linear-gradient(
    145deg,
    rgba(35, 35, 35, 0.4),
    rgba(45, 45, 45, 0.35)
  );
  backdrop-filter: blur(20px) saturate(120%);
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(80, 80, 80, 0.3);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-content:hover {
  background: linear-gradient(
    145deg,
    rgba(40, 40, 40, 0.5),
    rgba(50, 50, 50, 0.45)
  );
  border-color: rgba(100, 200, 255, 0.4);
  box-shadow:
    0 12px 48px rgba(100, 200, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transform: translateY(-3px);
}

.about-text {
  color: rgba(180, 220, 255, 0.9);
  line-height: 2;
  font-size: 1.1rem;
}

.about-text p {
  margin-bottom: 1.5rem;
}

.about-text strong {
  color: rgba(100, 200, 255, 1);
  font-weight: 700;
  text-shadow: 0 0 12px rgba(100, 200, 255, 0.4);
}

/* 技能网格 */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-item {
  background: linear-gradient(
    145deg,
    rgba(40, 40, 40, 0.4),
    rgba(50, 50, 50, 0.35)
  );
  backdrop-filter: blur(15px) saturate(120%);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(80, 80, 80, 0.3);
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow:
    0 4px 20px rgba(0, 0, 0, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(100, 200, 255, 0.08),
    transparent
  );
  transition: left 0.8s ease;
}

.skill-item:hover::before {
  left: 100%;
}

.skill-item:hover {
  background: linear-gradient(
    145deg,
    rgba(45, 45, 45, 0.5),
    rgba(55, 55, 55, 0.45)
  );
  border-color: rgba(100, 200, 255, 0.4);
  transform: translateY(-5px);
  box-shadow:
    0 8px 32px rgba(100, 200, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.skill-icon {
  font-size: 3rem;
  filter: drop-shadow(0 0 10px rgba(100, 200, 255, 0.6));
  transition: transform 0.4s ease;
}

.skill-item:hover .skill-icon {
  transform: scale(1.2) rotate(10deg);
}

.skill-info h4 {
  color: rgba(100, 200, 255, 0.95);
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.75rem 0;
  text-shadow: 0 0 8px rgba(100, 200, 255, 0.3);
}

.skill-info p {
  color: rgba(180, 220, 255, 0.85);
  font-size: 1rem;
  line-height: 1.6;
  margin: 0;
}

/* 兴趣爱好列表 */
.hobbies-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.hobby-item {
  background: linear-gradient(
    135deg,
    rgba(40, 40, 40, 0.4),
    rgba(50, 50, 50, 0.35)
  );
  backdrop-filter: blur(15px) saturate(120%);
  border-radius: 16px;
  padding: 1.5rem 2rem;
  border: 1px solid rgba(80, 80, 80, 0.3);
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  box-shadow:
    0 4px 16px rgba(0, 0, 0, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.03);
}

.hobby-item:hover {
  background: linear-gradient(
    135deg,
    rgba(45, 45, 45, 0.5),
    rgba(55, 55, 55, 0.45)
  );
  border-color: rgba(100, 200, 255, 0.4);
  transform: translateX(8px);
  box-shadow:
    0 6px 24px rgba(100, 200, 255, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.hobby-icon {
  font-size: 2rem;
  filter: drop-shadow(0 0 8px rgba(100, 200, 255, 0.5));
  transition: transform 0.3s ease;
}

.hobby-item:hover .hobby-icon {
  transform: scale(1.2) rotate(-10deg);
}

.hobby-text {
  color: rgba(100, 200, 255, 0.9);
  font-size: 1.1rem;
  font-weight: 600;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 4rem 1rem 2rem;
  }

  .section-title {
    font-size: 2rem;
    margin-bottom: 2rem;
  }

  .about-content {
    padding: 1.5rem;
  }

  .about-section {
    margin-bottom: 3rem;
  }

  .skills-grid,
  .hobbies-list {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .skill-item,
  .hobby-item {
    padding: 1.5rem;
  }

  .skill-icon {
    font-size: 2.5rem;
  }

  .hobby-icon {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 3rem 1rem 2rem;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .about-text {
    font-size: 1rem;
  }

  .skill-info h4 {
    font-size: 1.1rem;
  }

  .skill-info p {
    font-size: 0.9rem;
  }

  .hobby-text {
    font-size: 1rem;
  }
}
</style>

