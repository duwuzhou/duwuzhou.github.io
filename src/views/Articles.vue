<template>
  <div class="articles-container">
    <!-- 页面标题 -->
    <div class="articles-header">
      <h1 class="page-title">
        <span class="title-icon">📝</span>
        博客文章
      </h1>
      <p class="page-subtitle">探索技术，分享经验</p>
    </div>

    <!-- 搜索和筛选区域 -->
    <div class="filter-section">
      <!-- 搜索框 -->
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 搜索文章标题..."
          class="search-input"
        />
      </div>

      <!-- 标签筛选器 -->
      <div class="tags-filter">
        <button
          @click="selectedTag = null"
          :class="['tag-button', { active: selectedTag === null }]"
        >
          全部
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="selectedTag = tag"
          :class="['tag-button', { active: selectedTag === tag }]"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="loading">
      <div class="loading-spinner"></div>
      <p>加载中...</p>
    </div>

    <!-- 错误状态 -->
    <div v-else-if="error" class="error-message">
      <span class="error-icon">⚠️</span>
      {{ error }}
    </div>

    <!-- 文章列表 -->
    <div v-else-if="filteredArticles.length > 0" class="articles-layout">
      <!-- 首篇文章（大卡片） -->
      <RouterLink
        v-if="filteredArticles[0]"
        :to="`/articles/${filteredArticles[0].id}`"
        class="featured-article"
      >
        <div class="featured-content">
          <div class="featured-badge">精选</div>
          <h2 class="featured-title">{{ filteredArticles[0].title }}</h2>
          <p class="featured-summary">{{ filteredArticles[0].summary }}</p>

          <div class="featured-meta">
            <span class="featured-date">
              📅 {{ formatDate(filteredArticles[0].date) }}
            </span>
            <div class="featured-tags">
              <span v-for="tag in filteredArticles[0].tags" :key="tag" class="tag">
                {{ tag }}
              </span>
            </div>
          </div>

          <div class="read-more">
            阅读全文 <span class="arrow">→</span>
          </div>
        </div>
      </RouterLink>

      <!-- 其余文章（小卡片网格） -->
      <div class="articles-grid">
        <RouterLink
          v-for="(article, index) in filteredArticles.slice(1)"
          :key="article.id"
          :to="`/articles/${article.id}`"
          class="article-card"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <h3 class="article-title">{{ article.title }}</h3>
          <p class="article-summary">{{ article.summary }}</p>

          <div class="article-footer">
            <span class="article-date">📅 {{ formatDate(article.date) }}</span>
            <div class="article-tags">
              <span v-for="tag in article.tags.slice(0, 2)" :key="tag" class="tag">
                {{ tag }}
              </span>
              <span v-if="article.tags.length > 2" class="tag-more">
                +{{ article.tags.length - 2 }}
              </span>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <div class="empty-icon">📭</div>
      <p>{{ searchQuery || selectedTag ? '未找到匹配的文章' : '暂无文章' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { articlesApi } from '@/api/articles'
import type { Article } from '@/types/article'

const articles = ref<Article[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedTag = ref<string | null>(null)

// 获取所有唯一标签
const allTags = computed(() => {
  const tags = new Set<string>()
  if (articles.value && Array.isArray(articles.value)) {
    articles.value.forEach(article => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach(tag => tags.add(tag))
      }
    })
  }
  return Array.from(tags).sort()
})

// 过滤文章
const filteredArticles = computed(() => {
  let result = articles.value || []

  // 按标签筛选
  if (selectedTag.value) {
    result = result.filter(article =>
      article.tags && article.tags.includes(selectedTag.value!)
    )
  }

  // 按标题搜索
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(article =>
      article.title && article.title.toLowerCase().includes(query)
    )
  }

  return result
})

const fetchArticles = async () => {
  try {
    loading.value = true
    error.value = ''
    const response = await articlesApi.getArticles({
      page: 1,
      pageSize: 50,
      sortBy: 'date',
      order: 'DESC'
    })

    // axios 拦截器已经返回了 response.data
    // 所以 response 就是后端的响应体: { success, data, pagination }
    console.log('API Response:', response)

    if (response && response.data && Array.isArray(response.data)) {
      articles.value = response.data
    } else {
      console.error('Invalid response structure:', response)
      articles.value = []
      error.value = '数据格式错误'
    }
  } catch (err) {
    error.value = '加载文章失败，请稍后重试'
    console.error('Failed to fetch articles:', err)
    articles.value = []
  } finally {
    loading.value = false
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchArticles()
})
</script>

<style scoped>
.articles-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
  padding: 2rem;
}

/* 页面标题 */
.articles-header {
  text-align: center;
  margin-bottom: 3rem;
  animation: fadeInDown 0.8s ease-out;
}

.page-title {
  font-size: clamp(2.5rem, 6vw, 4rem);
  background: linear-gradient(135deg, #e2e8f0 0%, #64c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.title-icon {
  font-size: clamp(2rem, 5vw, 3.5rem);
  filter: drop-shadow(0 0 20px rgba(100, 200, 255, 0.5));
}

.page-subtitle {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: #94a3b8;
}

/* 搜索和筛选区域 */
.filter-section {
  max-width: 1200px;
  margin: 0 auto 3rem;
  animation: fadeInUp 0.8s ease-out 0.2s backwards;
}

.search-box {
  margin-bottom: 1.5rem;
}

.search-input {
  width: 100%;
  background: #1a1f2e;
  border: 1px solid #2d3748;
  color: #e2e8f0;
  padding: 14px 20px;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.search-input::placeholder {
  color: #64748b;
}

.tags-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
}

.tag-button {
  background: #1a1f2e;
  border: 1px solid #2d3748;
  color: #94a3b8;
  padding: 8px 18px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
  font-weight: 500;
}

.tag-button:hover {
  border-color: #3b82f6;
  color: #64c8ff;
  transform: translateY(-2px);
}

.tag-button.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* 加载和错误状态 */
.loading {
  text-align: center;
  padding: 4rem 2rem;
  color: #94a3b8;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #2d3748;
  border-top-color: #3b82f6;
  border-radius: 50%;
  margin: 0 auto 1rem;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-message {
  text-align: center;
  padding: 3rem 2rem;
  color: #ef4444;
  font-size: 1.1rem;
}

.error-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

/* 文章布局 */
.articles-layout {
  max-width: 1200px;
  margin: 0 auto;
}

/* 精选文章（大卡片） */
.featured-article {
  display: block;
  background: linear-gradient(145deg, rgba(30, 40, 60, 0.9), rgba(20, 30, 50, 0.8));
  backdrop-filter: blur(15px) saturate(120%);
  border: 2px solid rgba(100, 200, 255, 0.3);
  border-radius: 24px;
  padding: 3rem;
  margin-bottom: 3rem;
  min-height: 400px;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.8s ease-out 0.4s backwards;
  position: relative;
  overflow: hidden;
}

.featured-article::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.4s;
}

.featured-article:hover::before {
  opacity: 1;
}

.featured-article:hover {
  border-color: rgba(100, 200, 255, 0.6);
  box-shadow: 0 30px 80px rgba(100, 200, 255, 0.4);
  transform: translateY(-5px);
}

.featured-content {
  position: relative;
  z-index: 1;
}

.featured-badge {
  display: inline-block;
  background: linear-gradient(135deg, #3b82f6, #64c8ff);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.featured-title {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  background: linear-gradient(135deg, #e2e8f0 0%, #64c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.featured-summary {
  font-size: clamp(1rem, 2vw, 1.2rem);
  color: #cbd5e1;
  line-height: 1.8;
  margin-bottom: 2rem;
}

.featured-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.featured-date {
  color: #94a3b8;
  font-size: 1rem;
}

.featured-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #64c8ff;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s;
}

.featured-article:hover .read-more {
  gap: 1rem;
}

.arrow {
  transition: transform 0.3s;
}

.featured-article:hover .arrow {
  transform: translateX(5px);
}

/* 文章网格（小卡片） */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.article-card {
  display: block;
  background: linear-gradient(145deg, rgba(20, 30, 50, 0.8), rgba(30, 40, 60, 0.7));
  backdrop-filter: blur(10px) saturate(120%);
  border: 1px solid rgba(100, 200, 255, 0.2);
  border-radius: 16px;
  padding: 1.8rem;
  text-decoration: none;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  animation: fadeInUp 0.6s ease-out backwards;
  opacity: 0;
}

.article-card:hover {
  border-color: rgba(100, 200, 255, 0.5);
  box-shadow: 0 20px 60px rgba(100, 200, 255, 0.3);
  transform: translateY(-8px);
}

.article-title {
  font-size: 1.3rem;
  color: #e2e8f0;
  margin-bottom: 1rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-summary {
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(100, 200, 255, 0.1);
}

.article-date {
  color: #64748b;
  font-size: 0.85rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  background: #1e3a8a;
  color: #93c5fd;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tag-more {
  background: #2d3748;
  color: #94a3b8;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
}

/* 空状态 */
.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  color: #64748b;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state p {
  font-size: 1.2rem;
}

/* 动画 */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .articles-container {
    padding: 1.5rem;
  }

  .articles-header {
    margin-bottom: 2rem;
  }

  .filter-section {
    margin-bottom: 2rem;
  }

  .featured-article {
    padding: 2rem;
    min-height: 300px;
    margin-bottom: 2rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .article-card {
    padding: 1.5rem;
  }
}

@media (max-width: 480px) {
  .articles-container {
    padding: 1rem;
  }

  .featured-article {
    padding: 1.5rem;
  }

  .tags-filter {
    gap: 0.5rem;
  }

  .tag-button {
    padding: 6px 14px;
    font-size: 0.85rem;
  }
}
</style>
