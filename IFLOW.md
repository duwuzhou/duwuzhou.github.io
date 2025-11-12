# 项目概述

这是一个基于 Vue 3、TypeScript 和 Vite 构建的单页面应用程序 (SPA)。该项目主要包含一个主页、关于我页面、文章页面和一个视图1页面，并实现了一个功能丰富的浮动音乐播放器组件。

主要技术栈：
- Vue 3 (Composition API)
- TypeScript
- Vite
- Vue Router
- Pinia (状态管理)
- Sass (CSS 预处理器)

## 项目结构

```
F:\grxc\duwuzhou.github.io\
├── index.html           # 应用入口 HTML 文件
├── package.json         # 项目依赖和脚本配置
├── vite.config.ts       # Vite 构建配置
├── src\
│   ├── main.ts          # 应用入口文件
│   ├── App.vue          # 根组件
│   ├── router\          # 路由配置
│   ├── views\           # 页面视图组件
│   ├── components\      # 可复用组件 (如导航栏、音乐播放器、打字机效果)
│   └── ...
└── ...
```

# 构建和运行

## 开发环境

1.  **安装依赖**:
    ```bash
    npm install
    ```

2.  **启动开发服务器**:
    ```bash
    npm run dev
    ```
    这将启动一个本地开发服务器，通常在 `http://localhost:5173` (具体端口可能在终端中显示)。

## 构建生产版本

1.  **构建项目**:
    ```bash
    npm run build
    ```
    构建后的文件将输出到 `dist` 目录。

2.  **预览生产构建**:
    ```bash
    npm run preview
    ```
    在本地预览构建后的静态文件。

## 部署

项目配置了 GitHub Pages 部署脚本：
```bash
npm run deploy
```
此命令会先执行 `npm run build` 构建项目，然后使用 `gh-pages` 工具将 `dist` 目录的内容部署到 `gh-pages` 分支。

# 开发约定

- **组件**: 使用 `.vue` 单文件组件格式，推荐使用 Composition API (script setup)。
- **样式**: 使用 scoped CSS 或 CSS Modules 避免样式污染。项目中也使用了 Sass。
- **路由**: 使用 `vue-router` 进行页面路由管理，路由配置在 `src/router/index.ts`。
- **状态管理**: 使用 `pinia` 进行全局状态管理。
- **API 请求**: 目前项目中包含了 `axios` 依赖和相关类型定义，但尚未在主要视图中使用。API 相关逻辑可能在 `src/api/blog.ts` 中。

# 核心功能

- **主页 (Home.vue)**: 包含打字机效果的文本展示，并在文本播放完毕后显示"下一页"按钮跳转到 `view1`。
- **关于我 (about.vue)**: 展示个人头像和信息，并提供 GitHub 和邮箱联系方式。
- **文章 (article.vue)**: 目前内容为空，预留用于展示文章列表或详情。
- **视图1 (view1.vue)**: 目前内容为空。
- **导航栏 (NavigationBar.vue)**: 固定在页面顶部的导航，提供到主页、关于我和文章页的链接。
- **浮动音乐播放器 (FloatingMusicPlayer.vue)**: 一个功能完整的音乐播放器，支持播放/暂停、上一首/下一首、进度条拖拽、歌词显示（逐字高亮）、音量控制、自动播放切换、展开/收起等。音乐文件和歌词文件存放在 `public/music/` 目录下，封面图片在 `public/images/` 目录下。
- **打字机效果组件 (Typewriter.vue)**: 用于实现文本逐字显示的动画效果。