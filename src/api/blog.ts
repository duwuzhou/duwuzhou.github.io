import axios from 'axios';
// 需要安装 axios 依赖: npm install axios @types/axios

// 博客文章接口URL
const BLOG_API_URL = 'https://duwuzhou-dh.vercel.app/articles';

// 博客文章类型定义
export interface BlogArticle {
  title: string;
  summary: string;
  date: string;
  tags: string[];
}

/**
 * 获取博客文章列表
 * @returns 返回博客文章列表Promise
 */
export const fetchBlogArticles = async (): Promise<BlogArticle[]> => {
  try {
    const response = await axios.get(BLOG_API_URL);
    return response.data;
  } catch (error) {
    console.error('获取博客文章失败:', error);
    // 发生错误时返回空数组
    return [];
  }
};