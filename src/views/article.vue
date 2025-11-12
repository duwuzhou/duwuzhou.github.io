<template>
  <div class="articles-container">
    <div class="articles-content">
      <!-- 加载状态 -->
      <div v-if="blogStore.isLoading" class="loading">
        <div class="spinner"></div>
        <p>正在加载文章...</p>
      </div>
  
      <!-- 错误状态 -->
      <div v-else-if="blogStore.errorMessage" class="error">
        <p>{{ blogStore.errorMessage }}</p>
        <button @click="blogStore.fetchArticles" class="retry-button">重新加载</button>
      </div>
  
      <!-- 文章列表 -->
      <div v-else class="articles-list">
        <div 
          v-for="article in blogStore.articles" 
          :key="article.title" 
          class="article-card"
          @click="viewArticle(article)"
        >
          <h2 class="article-title">{{ article.title }}</h2>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta">
            <span class="article-date">{{ formatDate(article.date) }}</span>
            <div class="article-tags">
              <span 
                v-for="tag in article.tags" 
                :key="tag" 
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 空状态 -->
      <div v-if="!blogStore.isLoading && !blogStore.errorMessage && blogStore.articles.length === 0" class="empty-state">
        <p>暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blogStore'
import type { BlogArticle } from '../api/blog'

const blogStore = useBlogStore()
const router = useRouter()

// 格式化日期
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}

// 查看文章详情
const viewArticle = (article: BlogArticle) => {
  // 导航到文章详情页
  router.push(`/article/${encodeURIComponent(article.title)}`)
}

// 组件挂载时获取文章
onMounted(() => {
  blogStore.fetchArticles()
})
</script>

<style scoped>
.articles-container {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow: hidden;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  background: transparent;
  justify-content: center;
  align-items: center;
}

/* 背景透明效果 */
.articles-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(15, 23, 42, 0.7) 0%, rgba(15, 23, 42, 0.9) 100%);
  z-index: 0;
}

.articles-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 800px;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.8s ease-out;
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.header p {
  color: #7f8c8d;
  font-size: 1.1rem;
}

.loading {
  text-align: center;
  padding: 2rem;
  position: relative;
}

.loading::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 60px;
  height: 60px;
  margin: -30px 0 0 -30px;
  border: 3px solid rgba(30, 41, 59, 0.3);
  border-top: 3px solid #60a5fa;
  border-radius: 50%;
  animation: spin 1s linear infinite, pulse 2s ease-in-out infinite;
}

.loading p {
  color: #cbd5e1;
  font-size: 1.1rem;
  margin-top: 80px;
  animation: fadeInOut 1.5s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes fadeInOut {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}

.error p {
  color: #fca5a5;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  animation: shake 0.5s ease-in-out;
}

.retry-button {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border: 1px solid rgba(59, 130, 246, 0.4);
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.retry-button:hover {
  background: rgba(59, 130, 246, 0.3);
  color: #93c5fd;
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: rgba(30, 41, 59, 0.1);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  overflow: hidden;
}

.empty-state::before {
  content: '📝';
  font-size: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
  animation: float 3s ease-in-out infinite;
}

.empty-state p {
  color: #cbd5e1;
  font-size: 1.2rem;
  margin: 0;
  position: relative;
  z-index: 1;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -50%) translateY(0px); }
  50% { transform: translate(-50%, -50%) translateY(-10px); }
}

.articles-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: slideInUp 0.8s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.article-card {
  background: rgba(30, 41, 59, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.article-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
  transition: left 0.5s ease;
}

.article-card:hover::before {
  left: 100%;
}

.article-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(59, 130, 246, 0.5);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(59, 130, 246, 0.2);
  transform: translateY(-4px);
}

.article-title {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #e2e8f0;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}

.article-summary {
  color: #cbd5e1;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}



.tag {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  padding: 0.35rem 0.75rem;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid rgba(59, 130, 246, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  animation: tagAppear 0.5s ease-out;
  animation-fill-mode: both;
}

.tag:nth-child(1) { animation-delay: 0.1s; }
.tag:nth-child(2) { animation-delay: 0.2s; }
.tag:nth-child(3) { animation-delay: 0.3s; }
.tag:nth-child(4) { animation-delay: 0.4s; }
.tag:nth-child(5) { animation-delay: 0.5s; }

.tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.tag:hover::before {
  left: 100%;
}

.tag:hover {
  background: rgba(59, 130, 246, 0.4);
  color: #93c5fd;
  border-color: rgba(59, 130, 246, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

@keyframes tagAppear {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 1rem;
}

.article-date {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #94a3b8;
  font-size: 0.9rem;
  position: relative;
}

.article-date::before {
  content: '📅';
  opacity: 0.7;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.empty-state p {
  color: #cbd5e1;
  font-size: 1.2rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .articles-container {
    padding: 1rem;
  }
  
  .articles-content {
    padding: 2rem;
    border-radius: 16px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .header p {
    font-size: 1rem;
  }
  
  .article-card {
    padding: 1.25rem;
    border-radius: 12px;
  }
  
  .article-title {
    font-size: 1.3rem;
    line-height: 1.4;
  }
  
  .article-summary {
    font-size: 0.95rem;
    line-height: 1.5;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
    padding-top: 0.75rem;
  }
  
  .article-date {
    font-size: 0.85rem;
  }
  
  .tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
  
  .loading::before {
    width: 50px;
    height: 50px;
    margin: -25px 0 0 -25px;
  }
  
  .loading p {
    font-size: 1rem;
    margin-top: 70px;
  }
  
  .empty-state {
    padding: 2rem;
  }
  
  .empty-state::before {
    font-size: 3rem;
  }
  
  .empty-state p {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .articles-container {
    padding: 0.75rem;
  }
  
  .articles-content {
    padding: 1.5rem;
  }
  
  .header h1 {
    font-size: 1.75rem;
  }
  
  .article-card {
    padding: 1rem;
  }
  
  .article-title {
    font-size: 1.2rem;
  }
  
  .article-summary {
    font-size: 0.9rem;
  }
  
  .tag {
    font-size: 0.7rem;
    padding: 0.2rem 0.4rem;
  }
  
  .article-tags {
    gap: 0.3rem;
  }
}
</style>