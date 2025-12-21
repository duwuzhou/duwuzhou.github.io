<template>
  <div class="profile-card" :class="{ 'mobile': isMobile }">
    <div class="profile-header">
      <div class="profile-avatar">
        <img 
          :src="avatarUrl" 
          :alt="name"
          class="avatar-image"
          @error="handleImageError"
        />
        <div class="avatar-glow"></div>
      </div>
      <div class="profile-info">
        <h2 class="profile-name">{{ name }}</h2>
        <p class="profile-title">{{ title }}</p>
      </div>
    </div>
    
    <div class="profile-content">
      <p class="profile-bio">{{ bio }}</p>
      
      <div class="profile-tags">
        <span 
          v-for="(tag, index) in tags" 
          :key="index"
          class="tag"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          {{ tag }}
        </span>
      </div>
    </div>
    
    <div class="profile-footer">
      <div class="social-links">
        <a 
          v-for="(link, index) in socialLinks" 
          :key="index"
          :href="link.url"
          :aria-label="link.label"
          class="social-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ link.icon }}
          <span class="social-label">{{ link.label }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

// 组件属性
const props = defineProps({
  name: { type: String, default: '花落' },
  title: { type: String, default: '前端开发者' },
  bio: { type: String, default: '热爱技术，喜欢探索新事物，享受编码的乐趣。' },
  avatarUrl: { type: String, default: '/images/tx.jpg' },
  tags: { 
    type: Array as () => string[], 
    default: () => ['Vue', 'TypeScript', '前端开发', 'UI设计', '动画效果'] 
  },
  socialLinks: { 
    type: Array as () => Array<{ url: string; icon: string; label: string }>, 
    default: () => [
      { url: '#', icon: '📧', label: '邮箱' },
      { url: '#', icon: '🌐', label: '博客' },
      { url: '#', icon: '📱', label: '微信' }
    ] 
  }
});

// 响应式状态
const isMobile = ref(false);
const fallbackAvatar = ref('👤');

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
  // 如果需要，可以在这里显示一个默认头像或图标
};

// 监听窗口大小变化
const handleResize = () => {
  isMobile.value = window.innerWidth <= 768;
};

// 组件挂载时初始化
onMounted(() => {
  handleResize();
  window.addEventListener('resize', handleResize);
});

// 组件卸载时清理
const onUnmounted = () => {
  window.removeEventListener('resize', handleResize);
};
</script>

<style scoped>
/* 卡片容器 */
.profile-card {
  background: linear-gradient(
    135deg,
    rgba(35, 35, 35, 0.5) 0%,
    rgba(45, 45, 45, 0.45) 100%
  );
  backdrop-filter: blur(20px) saturate(120%);
  border-radius: 24px;
  padding: 3rem;
  border: 1px solid rgba(80, 80, 80, 0.4);
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  max-width: 800px;
  margin: 0 auto 4rem;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.profile-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(100, 200, 255, 0.05) 0%,
    transparent 70%
  );
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.profile-card:hover {
  background: linear-gradient(
    135deg,
    rgba(40, 40, 40, 0.6) 0%,
    rgba(50, 50, 50, 0.55) 100%
  );
  border-color: rgba(100, 200, 255, 0.5);
  box-shadow:
    0 25px 70px rgba(100, 200, 255, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transform: translateY(-8px);
}

/* 头部 */
.profile-header {
  display: flex;
  align-items: center;
  gap: 2.5rem;
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

/* 头像 */
.profile-avatar {
  position: relative;
  width: 140px;
  height: 140px;
  flex-shrink: 0;
}

.avatar-image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid rgba(100, 200, 255, 0.4);
  box-shadow: 0 0 25px rgba(100, 200, 255, 0.3);
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

.profile-card:hover .avatar-image {
  transform: scale(1.08);
  border-color: rgba(100, 200, 255, 0.6);
  box-shadow: 0 0 40px rgba(100, 200, 255, 0.5);
}

.avatar-glow {
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(100, 200, 255, 0.4) 0%,
    transparent 70%
  );
  animation: pulse 3s ease-in-out infinite;
  z-index: 1;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.9;
  }
}

/* 个人信息 */
.profile-info {
  flex: 1;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 900;
  margin: 0 0 1rem;
  background: linear-gradient(135deg, rgba(230, 230, 230, 0.95) 0%, rgba(180, 180, 180, 0.9) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: 1px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.15));
}

.profile-title {
  font-size: 1.3rem;
  color: rgba(180, 180, 180, 0.9);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  background: rgba(60, 60, 60, 0.4);
  border-left: 3px solid rgba(100, 200, 255, 0.6);
  border-radius: 8px;
  display: inline-block;
}

/* 内容 */
.profile-content {
  margin-bottom: 2.5rem;
  position: relative;
  z-index: 1;
}

.profile-bio {
  font-size: 1.15rem;
  line-height: 2;
  color: rgba(200, 200, 200, 0.9);
  margin: 0 0 2.5rem;
}

/* 标签 */
.profile-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.tag {
  background: rgba(60, 60, 60, 0.4);
  border: 2px solid rgba(80, 80, 80, 0.5);
  color: rgba(200, 200, 200, 0.9);
  padding: 0.75rem 1.5rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 700;
  transition: all 0.3s ease;
  cursor: pointer;
  animation: fadeIn 0.6s ease-out backwards;
}

.tag:nth-child(1) { animation-delay: 0.1s; }
.tag:nth-child(2) { animation-delay: 0.2s; }
.tag:nth-child(3) { animation-delay: 0.3s; }
.tag:nth-child(4) { animation-delay: 0.4s; }
.tag:nth-child(5) { animation-delay: 0.5s; }

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

.tag:hover {
  background: rgba(100, 200, 255, 0.25);
  border-color: rgba(100, 200, 255, 0.6);
  color: rgba(100, 200, 255, 0.95);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(100, 200, 255, 0.25);
}

/* 底部 */
.profile-footer {
  position: relative;
  z-index: 1;
  padding-top: 2rem;
  border-top: 1px solid rgba(80, 80, 80, 0.3);
}

.social-links {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(60, 60, 60, 0.4);
  border: 2px solid rgba(80, 80, 80, 0.5);
  color: rgba(200, 200, 200, 0.9);
  padding: 1rem 2rem;
  border-radius: 50px;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 700;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(100, 200, 255, 0.2);
  border-color: rgba(100, 200, 255, 0.5);
  color: rgba(100, 200, 255, 0.95);
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(100, 200, 255, 0.25);
}

.social-icon {
  font-size: 1.5rem;
  filter: drop-shadow(0 0 8px rgba(100, 200, 255, 0.6));
}

.social-label {
  letter-spacing: 0.5px;
}

/* 移动端 */
.profile-card.mobile {
  padding: 2rem;
}

.profile-card.mobile .profile-header {
  flex-direction: column;
  text-align: center;
  gap: 2rem;
}

.profile-card.mobile .profile-avatar {
  width: 120px;
  height: 120px;
}

.profile-card.mobile .profile-name {
  font-size: 2rem;
}

.profile-card.mobile .profile-title {
  display: block;
  text-align: center;
}

.profile-card.mobile .profile-bio {
  text-align: center;
  font-size: 1rem;
}

.profile-card.mobile .profile-tags {
  justify-content: center;
}

.profile-card.mobile .social-links {
  flex-direction: column;
}

.profile-card.mobile .social-link {
  justify-content: center;
}

/* 响应式 */
@media (max-width: 768px) {
  .profile-card {
    padding: 2.5rem 2rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .profile-avatar {
    width: 120px;
    height: 120px;
  }

  .profile-name {
    font-size: 2rem;
  }

  .profile-title {
    font-size: 1.1rem;
  }

  .profile-bio {
    text-align: center;
    font-size: 1rem;
  }

  .profile-tags {
    justify-content: center;
  }

  .social-links {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 2rem 1.5rem;
  }

  .profile-avatar {
    width: 100px;
    height: 100px;
  }

  .profile-name {
    font-size: 1.75rem;
  }

  .profile-title {
    font-size: 1rem;
    padding: 0.6rem 1.2rem;
  }

  .profile-bio {
    font-size: 0.95rem;
  }

  .tag {
    font-size: 0.9rem;
    padding: 0.6rem 1.2rem;
  }

  .social-link {
    font-size: 0.95rem;
    padding: 0.85rem 1.5rem;
  }
}
</style>