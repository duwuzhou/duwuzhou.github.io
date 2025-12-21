<template>
  <div class="article-detail-container">
    <div class="article-header">
      <button @click="goBack" class="back-button">&larr; 返回</button>
      <h1 class="article-title">{{ article?.title }}</h1>
      <div class="article-meta" v-if="article">
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
    
    <div class="article-content" v-if="article">
      <p>{{ article.summary }}</p>
      <p>这是文章的详细内容。在实际应用中，这里会显示从API获取的完整文章内容。</p>
      <p>文章内容会在这里展示，包括文字、图片、代码等。对于技术文章，可能会包含代码示例：</p>
      
      <pre><code class="language-javascript">
// 示例代码
function helloWorld() {
  console.log("Hello, World!");
}
      </code></pre>
      
      <p>还可以包含图片、表格等富媒体内容，以提供更丰富的阅读体验。</p>
      
      <h2>章节标题</h2>
      <p>文章通常会分为多个章节，每个章节都有明确的主题和内容。</p>
      
      <h3>子章节</h3>
      <p>子章节用于进一步细分内容，使文章结构更清晰。</p>
      
      <blockquote>
        <p>这是引用内容，用于强调重要观点或引用他人观点。</p>
      </blockquote>
      
      <p>文章结尾部分通常会总结主要观点，并可能提供进一步阅读的建议。</p>
    </div>
    
    <div class="loading" v-else>
      <div class="spinner"></div>
      <p>正在加载文章...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { fetchBlogArticles, type BlogArticle } from '../api/blog'

const article = ref<BlogArticle | null>(null)
const route = useRoute()
const router = useRouter()

// 格式化日期
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}

// 返回文章列表
const goBack = () => {
  router.push('/article')
}

// 根据文章标题获取文章详情
const getArticleByTitle = async (title: string): Promise<BlogArticle | undefined> => {
  // 在实际应用中，这里应该调用API获取具体文章详情
  // 现在我们使用测试数据来模拟
  const articles = fetchBlogArticles();
  return (await articles).find(article => article.title === decodeURIComponent(title));
}

// 获取文章详情
onMounted(async () => {
  // 从路由参数获取文章标题
  const articleTitle = route.params.id as string;
  
  if (articleTitle) {
    // 模拟API调用延迟
    setTimeout(async () => {
      try {
        // 在实际应用中，这里会调用获取文章详情的API
        // 现在我们从测试数据中查找匹配的文章
        const articles = await fetchBlogArticles();
        article.value = articles.find(a => 
          a.title === decodeURIComponent(articleTitle)
        ) || null;
      } catch (error) {
        console.error('获取文章详情失败:', error);
      }
    }, 500);
  }
})
</script>

<style scoped>
.article-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.back-button {
  background: none;
  border: none;
  color: #3498db;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  font-weight: 500;
}

.back-button:hover {
  text-decoration: underline;
}

.article-header {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 6px;
}

.article-title {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: #2c3e50;
}

.article-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1rem 0;
  border-top: 1px solid #ecf0f1;
  border-bottom: 1px solid #ecf0f1;
}

.article-date {
  color: #95a5a6;
  font-size: 0.9rem;
}

.article-tags {
  display: flex;
  gap: 0.5rem;
}

.tag {
  background-color: #e1f0fa;
  color: #3498db;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.article-content {
  line-height: 1.8;
  color: #2c3e50;
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 6px;
}

.article-content p {
  margin-bottom: 1.5rem;
}

.article-content h2 {
  margin: 2rem 0 1rem 0;
  font-size: 1.5rem;
  color: #2c3e50;
  border-left: 4px solid #3498db;
  padding-left: 0.8rem;
}

.article-content h3 {
  margin: 1.5rem 0 1rem 0;
  font-size: 1.2rem;
  color: #34495e;
  border-left: 3px solid #3498db;
  padding-left: 0.6rem;
}

.article-content pre {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 1rem;
  overflow-x: auto;
  margin: 1.5rem 0;
  border: 1px solid #e1f0fa;
}

.article-content code {
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #2c3e50;
}

.article-content blockquote {
  border-left: 4px solid #3498db;
  padding: 0.5rem 1rem;
  margin: 1.5rem 0;
  background-color: #f8f9fa;
  color: #7f8c8d;
  border-radius: 0 4px 4px 0;
}

.loading {
  text-align: center;
  padding: 2rem;
  background-color: white;
  border-radius: 8px;
}

.spinner {
  border: 4px solid rgba(44, 62, 80, 0.1);
  border-left-color: #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail-container {
    padding: 1rem;
  }
  
  .article-header,
  .article-content {
    padding: 1rem;
  }
  
  .article-title {
    font-size: 1.5rem;
  }
  
  .article-meta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>