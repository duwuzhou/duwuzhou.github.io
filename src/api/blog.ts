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

// 测试文章数据
const mockArticles: BlogArticle[] = [
  {
    title: "Vue 3 Composition API 实战指南",
    summary: "深入了解Vue 3 Composition API的核心概念和实际应用，通过实例展示如何构建可复用的逻辑组件。",
    date: "2025-10-15",
    tags: ["Vue", "JavaScript", "前端开发"]
  },
  {
    title: "TypeScript 高级类型技巧",
    summary: "掌握TypeScript中的高级类型系统，包括条件类型、映射类型和工具类型，提升代码类型安全性。",
    date: "2025-10-10",
    tags: ["TypeScript", "JavaScript"]
  },
  {
    title: "响应式设计最佳实践",
    summary: "探讨现代Web开发中的响应式设计原则和实现技巧，确保网站在各种设备上都能提供优秀的用户体验。",
    date: "2025-10-05",
    tags: ["CSS", "响应式设计", "UI/UX"]
  },
  {
    title: "Pinia 状态管理详解",
    summary: "学习如何使用Pinia进行Vue应用的状态管理，对比Vuex的优势和使用场景。",
    date: "2025-09-28",
    tags: ["Vue", "Pinia", "状态管理"]
  },
  {
    title: "Vite 构建优化策略",
    summary: "深入了解Vite构建工具的优化技巧，包括代码分割、预加载和缓存策略，提升应用性能。",
    date: "2025-09-20",
    tags: ["Vite", "构建工具", "性能优化"]
  }
];

/**
 * 获取博客文章列表
 * @returns 返回博客文章列表Promise
 */
export const fetchBlogArticles = async (): Promise<BlogArticle[]> => {
  try {
    const response = await axios.get(BLOG_API_URL);
    return response.data;
  } catch (error) {
    console.error('获取博客文章失败，使用测试数据:', error);
    // 发生错误时返回测试数据
    return mockArticles;
  }
};