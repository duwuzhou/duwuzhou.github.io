import { defineStore } from 'pinia'
import { fetchBlogArticles, type BlogArticle } from '../api/blog'

/**
 * 博客状态管理
 * 集中管理博客相关的状态和操作
 */
export const useBlogStore = defineStore('blog', {
  // 状态定义
  state: () => ({
    // 博客文章列表
    articles: [] as BlogArticle[],
    // 加载状态
    isLoading: false,
    // 错误信息
    errorMessage: ''
  }),
  
  // 计算属性
  getters: {
    // 获取文章数量
    articleCount: (state) => state.articles.length,
    // 检查是否有文章
    hasArticles: (state) => state.articles.length > 0
  },
  
  // 操作方法
  actions: {
    /**
     * 获取博客文章数据
     */
    async fetchArticles() {
      this.isLoading = true
      this.errorMessage = ''
      
      try {
        const articles = await fetchBlogArticles()
        this.articles = articles
      } catch (error) {
        console.error('获取博客文章失败:', error)
        this.errorMessage = '获取博客文章失败，请稍后再试'
      } finally {
        this.isLoading = false
      }
    },
    
    /**
     * 重置状态
     */
    resetState() {
      this.articles = []
      this.isLoading = false
      this.errorMessage = ''
    }
  }
})