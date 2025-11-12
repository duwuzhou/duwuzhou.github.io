<template>
  <div class="view1-container fade-in-fwd">
    <div class="content-wrapper">
      <!-- 打字机效果文本 -->
      <div v-for="(item, index) in textArray" :key="index" class="text-item">
        <Typewriter
          :text="item.text"
          :speed="item.speed"
          :delay="item.delay"
          :color="item.color"
          :fontSize="item.fontSize"/>
      </div>

      <!-- 项目展示区域 -->
      <div class="projects-section">
        <h2 class="section-title">项目</h2>
        <div class="projects-grid">
          <div 
            class="project-card" 
            v-for="(project, index) in projects" 
            :key="index"
            @mouseenter="setHoveredProject(index)"
            @mouseleave="setHoveredProject(null)"
            @mousemove="handleCardMouseMove($event, index)"
            :class="{'project-card-hovered': hoveredProject === index}"
          >
            <div class="project-header">
              <h3 class="project-title">{{ project.name }}</h3>
            </div>
            <p class="project-description">{{ project.description }}</p>
            <div class="project-tags">
              <span v-for="(tag, tagIndex) in project.tags" :key="tagIndex" class="project-tag">
                {{ tag }}
              </span>
            </div>
            <div class="project-links">
              <a :href="project.url" target="_blank" rel="noopener noreferrer" class="project-link">
                查看项目
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Typewriter from '@/components/Typewriter.vue'

// 打字机效果文本配置
const textArray = ref([
  {
    text: '我心如悲歌',
    speed: 100,
    delay: 0,
    color: '#FFFFFF',
    fontSize: '24px',
  },
  {
    text: '不在,不存',
    speed: 100,
    delay: 2000,
    color: '#E0E0E0',
    fontSize: '20px',
  }
])

// 项目数据
const projects = ref([
  {
    name: 'Segmenter',
    description: '一个高效的中文分词工具，基于深度学习技术实现精准的文本分割。',
    url: 'https://github.com/duwuzhou/Segmenter',
    tags: ['c++', 'JNI', '算法分词']
  },
  {
    name: 'LibZhpinyin',
    description: '轻量级中文拼音转换库.',
    url: 'https://github.com/duwuzhou/libZhpinyin',
    tags: ['C++', '词库匹配', '拼音']
  },
  {
    name: '电话生成',
    description: '在线电话号码生成工具，支持多种格式和地区选择。',
    url: "https://dianhuascqi.netlify.app/",
    tags: ['Web应用', '工具', 'JavaScript']
  }
])

// 项目卡片悬停状态
const hoveredProject = ref<number | null>(null)

// 设置悬停项目
const setHoveredProject = (index: number | null) => {
  hoveredProject.value = index
}

// 处理卡片鼠标移动效果
const handleCardMouseMove = (event: MouseEvent, index: number) => {
  const card = event.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  const x = ((event.clientX - rect.left) / rect.width) * 100
  const y = ((event.clientY - rect.top) / rect.height) * 100
  
  card.style.setProperty('--mouse-x', `${x}%`)
  card.style.setProperty('--mouse-y', `${y}%`)
}
</script>

<style scoped>
.view1-container {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.1);
}

.content-wrapper {
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
}

.text-item {
  width: 100%;
  text-align: center;
  margin: 10px 0;
  line-height: 1.5;
}

.section-title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
  color: #FFFFFF;
  position: relative;
  padding-bottom: 10px;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 2px;
}

.projects-section {
  width: 100%;
  padding: 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(15, 15, 35, 0.8), rgba(25, 25, 55, 0.6));
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), 
              0 0 0 1px rgba(255, 255, 255, 0.05) inset;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.projects-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(255, 255, 255, 0.2), 
    transparent);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  width: 100%;
  margin-top: 10px;
}

.project-card {
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
  border-radius: 12px;
  padding: 24px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.project-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
    rgba(255, 255, 255, 0.05) 0%, 
    transparent 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.project-card:hover::after {
  opacity: 1;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, #4facfe, #00f2fe);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-card-hovered {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.25), 
              0 5px 15px rgba(0, 0, 0, 0.15);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0.08));
  border-color: rgba(255, 255, 255, 0.15);
}

.project-card-hovered::before {
  transform: scaleX(1);
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
}

.project-tag {
  display: inline-block;
  padding: 6px 12px;
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.2), rgba(0, 242, 254, 0.2));
  color: #e0f7ff;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(79, 172, 254, 0.3);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.project-card-hovered .project-tag {
  background: linear-gradient(135deg, rgba(79, 172, 254, 0.3), rgba(0, 242, 254, 0.3));
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.project-header {
  margin-bottom: 16px;
}

.project-title {
  font-size: 22px;
  margin: 0;
  color: #FFFFFF;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.project-card-hovered .project-title {
  color: #4facfe;
}

.project-description {
  color: #c0c0c0;
  flex-grow: 1;
  margin: 16px 0;
  line-height: 1.6;
  font-size: 14px;
}

.project-links {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

.project-link {
  display: inline-block;
  padding: 10px 20px;
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  color: #FFFFFF;
  text-decoration: none;
  border-radius: 25px;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(79, 172, 254, 0.3);
  position: relative;
  overflow: hidden;
}

.project-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.project-link:hover::before {
  left: 100%;
}

.project-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(79, 172, 254, 0.4);
  background: linear-gradient(135deg, #3d8bfd, #00d4fe);
}

/* 动画效果 */
.fade-in-fwd {
  -webkit-animation: fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
          animation: fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}

@-webkit-keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
            transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}

@keyframes fade-in-fwd {
  0% {
    -webkit-transform: translateZ(-80px);
            transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);
    opacity: 1;
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .projects-section {
    padding: 20px;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .section-title {
    font-size: 24px;
  }
  
  .project-card {
    padding: 20px;
  }
  
  .project-title {
    font-size: 20px;
  }
  
  .project-description {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .projects-section {
    padding: 15px;
    border-radius: 12px;
  }
  
  .project-card {
    padding: 16px;
  }
  
  .project-title {
    font-size: 18px;
  }
  
  .project-link {
    padding: 8px 16px;
    font-size: 13px;
  }
}
</style>