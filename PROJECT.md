# 个人作品集网站 (duwuzhou.github.io)

这是一个基于 Vue 3 + TypeScript + Vite 构建的个人作品集网站，展示了现代化的前端开发技术和交互设计。

## 🚀 技术栈

- **前端框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **样式**: SCSS
- **动画**: Animate.css
- **HTTP客户端**: Axios
- **全屏效果**: vue-fullpage.js
- **部署**: GitHub Pages

## 📁 项目结构

```
duwuzhou.github.io/
├── public/                 # 静态资源
│   ├── images/            # 图片资源
│   ├── music/             # 音乐文件
│   └── vite.svg           # Vite图标
├── src/                   # 源代码
│   ├── api/               # API接口
│   ├── assets/            # 资源文件
│   ├── components/        # 组件
│   │   ├── BlogSection.vue
│   │   ├── EntranceAnimation.vue
│   │   ├── FloatingMusicPlayer/  # 浮动音乐播放器
│   │   ├── GifDisplay.vue
│   │   ├── NavigationBar.vue
│   │   ├── SciFiDiamondBackground.vue
│   │   ├── Snowfall.vue
│   │   └── Typewriter.vue
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── types/             # 类型定义
│   ├── views/             # 页面视图
│   │   ├── Home.vue
│   │   ├── about.vue
│   │   ├── article.vue
│   │   ├── ArticleDetail.vue
│   │   └── view1.vue
│   ├── App.vue            # 根组件
│   ├── main.ts            # 入口文件
│   ├── style.css          # 全局样式
│   └── vite-env.d.ts      # Vite类型声明
├── index.html             # HTML模板
├── package.json           # 项目配置
├── tsconfig.json          # TypeScript配置
├── tsconfig.base.json     # TypeScript基础配置
├── tsconfig.node.json     # Node.js TypeScript配置
└── vite.config.ts         # Vite配置
```

## 🎯 核心功能

### 1. 浮动音乐播放器
- 可拖拽的浮动音乐播放器，支持播放/暂停、上一首/下一首切换
- 进度条控制和音量调节
- 歌词显示和同步
- 收起/展开功能
- 右下角缩小动画效果

### 2. 科幻风格背景
- 动态钻石背景效果
- 雪花飘落动画
- 入场动画效果

### 3. 导航系统
- 响应式导航栏
- 多页面路由配置
- 平滑的页面切换效果

### 4. 内容展示
- 博客文章列表和详情页
- 打字机效果展示
- GIF动画展示

## 🛠️ 开发指南

### 环境要求
- Node.js 16+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

### 部署到GitHub Pages
```bash
npm run deploy
```

## 📱 页面路由

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | Home.vue | 首页 |
| `/view1` | view1.vue | 展示页面1 |
| `/about` | about.vue | 关于页面 |
| `/article` | article.vue | 文章列表页 |
| `/article/:id` | ArticleDetail.vue | 文章详情页 |

## 🎨 组件说明

### FloatingMusicPlayer 组件

这是一个模块化的浮动音乐播放器组件，支持播放、暂停、切换歌曲、显示歌词等功能。

#### 使用方法
```vue
<template>
  <FloatingMusicPlayer :songs="songs" />
</template>

<script setup>
import { Song } from './components/FloatingMusicPlayer/types'

const songs: Song[] = [
  {
    id: 1,
    title: '歌曲标题',
    artist: '艺术家',
    src: '/music/song.mp3',
    cover: '/images/cover.jpg',
    lrcFile: '/music/song.lrc'
  }
]
</script>
```

#### 组件属性
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| songs | `Song[]` | 必填 | 歌曲列表 |
| initialSongIndex | `number` | 0 | 初始播放歌曲索引 |
| autoplay | `boolean` | false | 是否自动播放下一首 |
| showLyrics | `boolean` | false | 是否显示歌词 |

### 其他组件

- **SciFiDiamondBackground**: 科幻风格钻石背景
- **Snowfall**: 雪花飘落效果
- **NavigationBar**: 导航栏组件
- **GifDisplay**: GIF展示组件
- **Typewriter**: 打字机效果组件
- **EntranceAnimation**: 入场动画组件
- **BlogSection**: 博客文章展示组件

## 🎵 音乐播放器功能

### 播放控制
- 播放/暂停
- 上一首/下一首
- 进度条拖动
- 音量控制和静音

### 歌词显示
- LRC格式歌词解析
- 歌词同步高亮
- 歌词面板展开/收起

### 界面交互
- 播放器拖拽移动
- 右下角缩小动画
- 响应式设计
- 平滑过渡效果

## 📝 TypeScript 配置

项目使用TypeScript进行类型检查，主要配置包括：

- 严格模式启用
- 路径映射配置 (`@/` 指向 `src/`)
- Vue组件类型声明
- 模块解析配置

## 🚀 部署说明

项目配置了自动部署到GitHub Pages，通过以下步骤完成：

1. 代码推送到GitHub仓库
2. GitHub Actions自动触发构建
3. 构建产物部署到gh-pages分支
4. 通过GitHub Pages服务访问

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和开源社区。