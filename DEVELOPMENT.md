# 开发指南

本文档为项目开发者提供详细的开发指南和最佳实践。

## 🛠️ 开发环境设置

### 必需软件

1. **Node.js** (推荐 18.x 或更高版本)
   - [下载地址](https://nodejs.org/)
   - 安装后检查版本: `node -v`

2. **代码编辑器**
   - 推荐使用 [Visual Studio Code](https://code.visualstudio.com/)
   - 安装以下扩展:
     - Vue Language Features (Volar)
     - TypeScript Vue Plugin (Volar)
     - SCSS IntelliSense
     - GitLens

### 项目设置

1. 克隆仓库
```bash
git clone https://github.com/duwuzhou/duwuzhou.github.io.git
cd duwuzhou.github.io
```

2. 安装依赖
```bash
npm install
```

3. 启动开发服务器
```bash
npm run dev
```

4. 在浏览器中打开 `http://localhost:5173`

## 📁 项目结构详解

```
duwuzhou.github.io/
├── public/                 # 静态资源
│   ├── images/            # 图片资源
│   ├── music/             # 音乐文件
│   └── vite.svg           # Vite图标
├── src/                   # 源代码
│   ├── api/               # API接口
│   │   └── blog.ts        # 博客API
│   ├── assets/            # 资源文件
│   │   ├── css/           # CSS文件
│   │   └── vue.svg        # Vue图标
│   ├── components/        # 组件
│   │   ├── BlogSection.vue
│   │   ├── EntranceAnimation.vue
│   │   ├── FloatingMusicPlayer/  # 浮动音乐播放器
│   │   │   ├── FloatingMusicPlayer.vue
│   │   │   ├── useLyrics.ts
│   │   │   ├── usePlayerControl.ts
│   │   │   ├── types.ts
│   │   │   └── styles.scss
│   │   ├── GifDisplay.vue
│   │   ├── NavigationBar.vue
│   │   ├── SciFiDiamondBackground.vue
│   │   ├── Snowfall.vue
│   │   └── Typewriter.vue
│   ├── router/            # 路由配置
│   │   └── index.ts       # 路由定义
│   ├── stores/            # 状态管理
│   │   └── blogStore.ts   # 博客状态
│   ├── types/             # 类型定义
│   │   └── vue-fullpage.d.ts
│   ├── views/             # 页面视图
│   │   ├── Home.vue       # 首页
│   │   ├── about.vue      # 关于页面
│   │   ├── article.vue    # 文章列表
│   │   ├── ArticleDetail.vue # 文章详情
│   │   └── view1.vue      # 展示页面
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   ├── style.css          # 全局样式
│   └── vite-env.d.ts      # Vite类型声明
├── docs/                  # 文档
│   ├── PROJECT.md         # 项目文档
│   ├── API.md             # API文档
│   ├── COMPONENTS.md      # 组件文档
│   └── DEVELOPMENT.md     # 开发指南
├── index.html             # HTML模板
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript配置
├── tsconfig.base.json     # TypeScript基础配置
├── tsconfig.node.json     # Node.js TypeScript配置
└── vite.config.ts         # Vite配置
```

## 🎯 开发工作流

### 1. 功能开发流程

1. 创建功能分支
```bash
git checkout -b feature/新功能名称
```

2. 开发功能
   - 创建/修改组件
   - 添加类型定义
   - 编写测试（如需要）
   - 更新文档

3. 提交代码
```bash
git add .
git commit -m "feat: 添加新功能描述"
```

4. 推送分支
```bash
git push origin feature/新功能名称
```

5. 创建Pull Request

### 2. 提交信息规范

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复bug
- `docs:` 文档更新
- `style:` 代码格式调整（不影响功能）
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建过程或辅助工具的变动

示例：
```bash
git commit -m "feat: 添加音乐播放器歌词显示功能"
git commit -m "fix: 修复移动端导航栏样式问题"
git commit -m "docs: 更新组件文档"
```

## 🧩 组件开发指南

### 1. 组件创建步骤

1. 在 `src/components` 目录下创建组件文件夹
2. 创建组件文件（使用PascalCase命名）
3. 编写组件代码
4. 添加类型定义
5. 编写组件文档
6. 导出组件

### 2. 组件模板

```vue
<template>
  <div class="component-name">
    <!-- 组件内容 -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 类型定义
interface Props {
  // 属性定义
  title: string
  count?: number
}

// 属性和默认值
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// 事件定义
interface Emits {
  (e: 'update', value: string): void
  (e: 'submit'): void
}

const emit = defineEmits<Emits>()

// 响应式数据
const data = ref('')

// 计算属性
const computedValue = computed(() => {
  return props.count > 0 ? props.count : 0
})

// 方法
const method = () => {
  emit('update', data.value)
}

// 生命周期
onMounted(() => {
  // 初始化逻辑
})
</script>

<style scoped>
.component-name {
  /* 组件样式 */
}
</style>
```

### 3. 组件导出

在组件文件夹下创建 `index.ts` 文件：

```typescript
import ComponentName from './ComponentName.vue'

export default ComponentName
export { ComponentName }
```

## 🎨 样式指南

### 1. SCSS变量

在 `src/style.css` 中定义全局变量：

```scss
:root {
  // 颜色
  --primary-color: #42b983;
  --secondary-color: #34495e;
  --background-color: #121212;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  
  // 间距
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  // 字体
  --font-size-sm: 14px;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
  
  // 阴影
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
}
```

### 2. 响应式断点

```scss
// 断点变量
$mobile: 768px;
$tablet: 1024px;
$desktop: 1200px;

// 媒体查询混入
@mixin mobile {
  @media (max-width: #{$mobile}) {
    @content;
  }
}

@mixin tablet {
  @media (min-width: #{$mobile + 1}) and (max-width: #{$tablet}) {
    @content;
  }
}

@mixin desktop {
  @media (min-width: #{$tablet + 1}) {
    @content;
  }
}

// 使用示例
.example {
  width: 100%;
  
  @include desktop {
    width: 50%;
  }
}
```

### 3. BEM命名规范

```scss
.block {
  // 块
  &__element {
    // 元素
  }
  
  &--modifier {
    // 修饰符
  }
}

// 示例
.card {
  padding: var(--spacing-md);
  
  &__header {
    font-size: var(--font-size-lg);
  }
  
  &__content {
    margin-top: var(--spacing-sm);
  }
  
  &--highlighted {
    border: 1px solid var(--primary-color);
  }
}
```

## 🔄 状态管理

使用Pinia进行状态管理：

```typescript
import { defineStore } from 'pinia'

interface State {
  // 状态定义
}

export const useStoreName = defineStore('storeName', {
  state: (): State => ({
    // 初始状态
  }),
  
  getters: {
    // 计算属性
  },
  
  actions: {
    // 操作方法
  }
})
```

## 🧪 测试

### 1. 单元测试

项目可以使用Vitest进行单元测试：

```bash
npm install -D vitest @vue/test-utils jsdom
```

### 2. 测试文件结构

```
src/
├── components/
│   ├── ComponentName.vue
│   └── __tests__/
│       └── ComponentName.spec.ts
```

### 3. 测试示例

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ComponentName from '../ComponentName.vue'

describe('ComponentName', () => {
  it('renders properly', () => {
    const wrapper = mount(ComponentName, { 
      props: { 
        title: 'Test Title' 
      } 
    })
    expect(wrapper.text()).toContain('Test Title')
  })
})
```

## 🚀 构建和部署

### 1. 构建命令

```bash
# 开发环境构建
npm run build

# 预览构建结果
npm run preview

# 部署到GitHub Pages
npm run deploy
```

### 2. 环境变量

创建 `.env.local` 文件（不提交到版本控制）：

```env
VITE_API_URL=https://your-api-url.com
VITE_APP_TITLE=Your App Title
```

在代码中使用：

```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 🐛 调试技巧

### 1. Vue DevTools

安装 [Vue DevTools](https://devtools.vuejs.org/) 浏览器扩展，用于调试Vue应用。

### 2. TypeScript调试

在 `tsconfig.json` 中启用更严格的检查：

```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

### 3. 性能分析

使用Chrome DevTools的Performance面板分析应用性能。

## 📚 学习资源

- [Vue 3 官方文档](https://vuejs.org/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [Pinia 官方文档](https://pinia.vuejs.org/)
- [SCSS 文档](https://sass-lang.com/)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

确保所有提交都遵循代码规范和提交信息规范。