# API 文档

本文档描述了项目中使用的API接口和相关数据结构。

## 博客文章 API

### 接口概述

博客文章API用于获取博客文章列表数据。当API请求失败时，系统会自动使用本地模拟数据作为降级方案。

### 接口详情

#### 获取博客文章列表

- **URL**: `https://duwuzhou-dh.vercel.app/articles`
- **方法**: GET
- **描述**: 获取博客文章列表

#### 响应数据结构

```typescript
interface BlogArticle {
  title: string;      // 文章标题
  summary: string;    // 文章摘要
  date: string;       // 发布日期 (格式: YYYY-MM-DD)
  tags: string[];     // 文章标签
}
```

#### 响应示例

```json
[
  {
    "title": "Vue 3 Composition API 实战指南",
    "summary": "深入了解Vue 3 Composition API的核心概念和实际应用，通过实例展示如何构建可复用的逻辑组件。",
    "date": "2025-10-15",
    "tags": ["Vue", "JavaScript", "前端开发"]
  },
  {
    "title": "TypeScript 高级类型技巧",
    "summary": "掌握TypeScript中的高级类型系统，包括条件类型、映射类型和工具类型，提升代码类型安全性。",
    "date": "2025-10-10",
    "tags": ["TypeScript", "JavaScript"]
  }
]
```

## 状态管理

### 博客状态管理 (BlogStore)

使用Pinia进行博客相关状态的管理，包括文章列表、加载状态和错误信息。

#### 状态结构

```typescript
interface BlogState {
  articles: BlogArticle[];  // 博客文章列表
  isLoading: boolean;       // 加载状态
  errorMessage: string;     // 错误信息
}
```

#### 计算属性

- `articleCount`: 获取文章数量
- `hasArticles`: 检查是否有文章

#### 操作方法

- `fetchArticles()`: 获取博客文章数据
- `resetState()`: 重置状态

#### 使用示例

```typescript
import { useBlogStore } from '@/stores/blogStore'

// 在组件中使用
const blogStore = useBlogStore()

// 获取文章列表
await blogStore.fetchArticles()

// 访问状态
console.log(blogStore.articles)
console.log(blogStore.articleCount)
console.log(blogStore.isLoading)

// 重置状态
blogStore.resetState()
```

## API 服务函数

### fetchBlogArticles

获取博客文章列表的API服务函数。

```typescript
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
```

## 错误处理

当API请求失败时，系统会：

1. 在控制台输出错误信息
2. 返回本地模拟数据作为降级方案
3. 在状态管理中设置错误信息

## 模拟数据

系统提供了5篇模拟博客文章数据，用于开发和测试：

1. Vue 3 Composition API 实战指南
2. TypeScript 高级类型技巧
3. 响应式设计最佳实践
4. Pinia 状态管理详解
5. Vite 构建优化策略

## 注意事项

1. API请求使用了Axios库，需要确保已安装相关依赖
2. 当API不可用时，系统会自动使用模拟数据
3. 日期格式遵循ISO 8601标准 (YYYY-MM-DD)
4. 标签数组可以为空
5. 错误信息会在状态管理中保存，可以在UI中展示给用户