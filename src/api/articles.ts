import { apiClient } from './config'
import type { ApiResponse, Article, ArticleListResponse } from '@/types/article'

export const articlesApi = {
  // 获取文章列表
  getArticles(params?: {
    page?: number
    pageSize?: number
    sortBy?: string
    order?: string
  }): Promise<ApiResponse<ArticleListResponse>> {
    return apiClient.get('/articles', { params })
  },

  // 获取单篇文章
  getArticleById(id: number): Promise<ApiResponse<Article>> {
    return apiClient.get(`/articles/${id}`)
  }
}
