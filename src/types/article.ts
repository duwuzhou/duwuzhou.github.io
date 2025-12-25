// 文章接口
export interface Article {
  id: number
  title: string
  summary: string
  date: string
  content: string
  tags: string[]
  created_at: string
}

// API 响应接口
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  timestamp: string
}

// 分页接口
export interface Pagination {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// 文章列表响应
export interface ArticleListResponse {
  data: Article[]
  pagination: Pagination
}

// 目录项接口
export interface TocItem {
  id: string
  text: string
  level: number
}
