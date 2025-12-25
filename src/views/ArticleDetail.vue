<template>
  <div class="article-detail-container">
    <!-- 返回按钮 -->
    <button @click="goBack" class="back-button">
      ← 返回列表
    </button>

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

    <!-- 文章内容 -->
    <div v-else-if="article" class="article-layout">
      <!-- 主内容区 -->
      <article class="article-content">
        <!-- 文章头部 -->
        <header class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>

          <div class="article-meta">
            <span class="meta-item">
              📅 发布于 {{ formatDate(article.date) }}
            </span>
            <span class="meta-item">
              🕒 创建于 {{ formatDate(article.created_at) }}
            </span>
          </div>

          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </header>

        <!-- 文章摘要 -->
        <div class="article-summary-box">
          <div class="summary-icon">💡</div>
          <p class="summary-text">{{ article.summary }}</p>
        </div>

        <!-- 分隔线 -->
        <div class="divider"></div>

        <!-- 文章正文 -->
        <div class="article-body" ref="contentRef">
          {{ article.content }}
        </div>
      </article>

      <!-- 目录导航（右侧固定） -->
      <aside class="toc-sidebar" v-if="tocItems.length > 0">
        <div class="toc-container">
          <h3 class="toc-title">📑 目录</h3>
          <nav class="toc-nav">
            <a
              v-for="item in tocItems"
              :key="item.id"
              :href="`#${item.id}`"
              :class="['toc-item', `toc-level-${item.level}`]"
              @click.prevent="scrollToSection(item.id)"
            >
              {{ item.text }}
            </a>
          </nav>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { articlesApi } from '@/api/articles'
import type { Article, TocItem } from '@/types/article'

const route = useRoute()
const router = useRouter()

const article = ref<Article | null>(null)
const loading = ref(true)
const error = ref('')
const contentRef = ref<HTMLElement | null>(null)
const tocItems = ref<TocItem[]>([])

// 生成目录
const generateToc = () => {
  if (!article.value) return

  const content = article.value.content
  const lines = content.split('\n')
  const toc: TocItem[] = []
  let idCounter = 0

  lines.forEach((line) => {
    const trimmed = line.trim()

    // 检测标题行（以 # 开头）
    if (trimmed.startsWith('#')) {
      const level = trimmed.match(/^#+/)?.[0].length || 1
      const text = trimmed.replace(/^#+\s*/, '')
      if (text) {
        toc.push({
          id: `heading-${idCounter++}`,
          text,
          level: Math.min(level, 3)
        })
      }
    }
    // 检测全大写标题（简单规则）
    else if (
      trimmed.length > 3 &&
      trimmed.length < 50 &&
      trimmed === trimmed.toUpperCase() &&
      /^[A-Z\s\u4e00-\u9fa5]+$/.test(trimmed)
    ) {
      toc.push({
        id: `heading-${idCounter++}`,
        text: trimmed,
        level: 1
      })
    }
  })

  tocItems.value = toc
}

const fetchArticle = async () => {
  try {
    loading.value = true
    error.value = ''
    const id = Number(route.params.id)

    if (isNaN(id)) {
      error.value = '无效的文章ID'
      return
    }

    const response = await articlesApi.getArticleById(id)

    // 确保响应数据结构正确
    if (response && response.data) {
      article.value = response.data
      await nextTick()
      generateToc()
    } else {
      console.error('Invalid response structure:', response)
      error.value = '数据格式错误'
    }
  } catch (err: any) {
    if (err.response?.status === 404) {
      error.value = '文章不存在'
    } else {
      error.value = '加载文章失败，请稍后重试'
    }
    console.error('Failed to fetch article:', err)
  } finally {
    loading.value = false
  }
}

const scrollToSection = (id: string) => {
  // 简单实现：滚动到内容顶部
  // 实际应该找到对应的标题位置
  if (contentRef.value) {
    contentRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const goBack = () => {
  router.push('/articles')
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  fetchArticle()
})
</script>

<style scoped>
.article-detail-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f1419 0%, #1a1f2e 100%);
  padding: 2rem;
}

/* 返回按钮 */
.back-button {
  background: #1a1f2e;
  border: 1px solid #2d3748;
  color: #94a3b8;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s;
  margin-bottom: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.back-button:hover {
  border-color: #3b82f6;
  color: #64c8ff;
  transform: translateX(-5px);
}

/* 加载和错误状态 */
.loading {
  text-align: center;
  padding: 6rem 2rem;
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
  padding: 4rem 2rem;
  color: #ef4444;
  font-size: 1.1rem;
}

.error-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

/* 文章布局 */
.article-layout {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 3rem;
  align-items: flex-start;
}

/* 主内容区 */
.article-content {
  flex: 1;
  max-width: 900px;
  background: linear-gradient(145deg, rgba(20, 30, 50, 0.8), rgba(30, 40, 60, 0.7));
  backdrop-filter: blur(10px) saturate(120%);
  border: 1px solid rgba(100, 200, 255, 0.2);
  border-radius: 20px;
  padding: 3rem;
  animation: fadeInUp 0.8s ease-out;
}

/* 文章头部 */
.article-header {
  margin-bottom: 2rem;
}

.article-title {
  font-size: clamp(2rem, 5vw, 3rem);
  background: linear-gradient(135deg, #e2e8f0 0%, #64c8ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1.5rem;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.meta-item {
  color: #94a3b8;
  font-size: 0.95rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #1e3a8a;
  color: #93c5fd;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.85rem;
  font-weight: 500;
}

/* 文章摘要 */
.article-summary-box {
  background: rgba(59, 130, 246, 0.1);
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.summary-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.summary-text {
  color: #cbd5e1;
  line-height: 1.8;
  font-size: 1.05rem;
}

/* 分隔线 */
.divider {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(100, 200, 255, 0.3),
    transparent
  );
  margin: 2rem 0;
}

/* 文章正文 */
.article-body {
  color: #cbd5e1;
  font-size: 1.05rem;
  line-height: 1.9;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* 目录导航 */
.toc-sidebar {
  position: sticky;
  top: 100px;
  width: 280px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  flex-shrink: 0;
  animation: fadeInRight 0.8s ease-out 0.2s backwards;
}

.toc-container {
  background: linear-gradient(145deg, rgba(20, 30, 50, 0.8), rgba(30, 40, 60, 0.7));
  backdrop-filter: blur(10px) saturate(120%);
  border: 1px solid rgba(100, 200, 255, 0.2);
  border-radius: 16px;
  padding: 1.5rem;
}

.toc-title {
  color: #e2e8f0;
  font-size: 1.1rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(100, 200, 255, 0.2);
}

.toc-nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.toc-item {
  display: block;
  color: #94a3b8;
  padding: 8px 12px;
  border-left: 2px solid transparent;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
  line-height: 1.4;
}

.toc-item:hover {
  color: #64c8ff;
  border-left-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  transform: translateX(4px);
}

.toc-level-1 {
  font-weight: 600;
}

.toc-level-2 {
  padding-left: 24px;
  font-size: 0.85rem;
}

.toc-level-3 {
  padding-left: 36px;
  font-size: 0.8rem;
  color: #64748b;
}

/* 滚动条样式 */
.toc-sidebar::-webkit-scrollbar {
  width: 6px;
}

.toc-sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.toc-sidebar::-webkit-scrollbar-thumb {
  background: rgba(100, 200, 255, 0.3);
  border-radius: 3px;
}

.toc-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(100, 200, 255, 0.5);
}

/* 动画 */
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

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .toc-sidebar {
    display: none;
  }

  .article-content {
    max-width: 100%;
  }
}

@media (max-width: 768px) {
  .article-detail-container {
    padding: 1.5rem;
  }

  .article-content {
    padding: 2rem;
  }

  .article-title {
    font-size: 1.8rem;
  }

  .article-body {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .article-detail-container {
    padding: 1rem;
  }

  .article-content {
    padding: 1.5rem;
  }

  .article-summary-box {
    padding: 1rem;
  }

  .back-button {
    padding: 8px 16px;
    font-size: 0.9rem;
  }
}
</style>
