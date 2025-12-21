# 个人作品集网站 (duwuzhou.github.io)

![Vue](https://img.shields.io/badge/Vue-3.5.13-4FC08D?style=flat-square&logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?style=flat-square&logo=vite&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

一个基于 Vue 3 + TypeScript + Vite 构建的现代化个人作品集网站，展示了前端开发技术和创意交互设计。

## ✨ 特性

- 🎬 **沉浸式首页** - 全屏 GIF 动态背景，边缘模糊中间清晰的视觉效果
- 🎵 **浮动音乐播放器** - 支持拖拽、歌词显示、右下角缩小动画
- 🌌 **科幻风格背景** - 动态钻石效果和雪花飘落动画
- 📱 **响应式设计** - 完美适配各种设备屏幕
- 🎨 **精美动画** - 流畅的过渡效果和微交互
- 💎 **毛玻璃效果** - 高透明度卡片配合背景模糊
- 🎯 **TypeScript** - 完整的类型支持和开发体验

## 🚀 快速开始

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

## 📁 项目结构

```
duwuzhou.github.io/
├── public/                 # 静态资源
├── src/                   # 源代码
│   ├── api/               # API接口
│   ├── assets/            # 资源文件
│   ├── components/        # 组件
│   │   ├── FloatingMusicPlayer/  # 浮动音乐播放器
│   │   ├── SciFiDiamondBackground.vue
│   │   ├── Snowfall.vue
│   │   └── ...
│   ├── router/            # 路由配置
│   ├── stores/            # 状态管理
│   ├── types/             # 类型定义
│   ├── views/             # 页面视图
│   └── ...
├── docs/                  # 文档
│   ├── PROJECT.md         # 项目文档
│   ├── API.md             # API文档
│   └── COMPONENTS.md      # 组件文档
└── ...
```

## 📖 文档

- [项目文档](./PROJECT.md) - 详细的项目介绍和技术说明
- [API文档](./API.md) - API接口和数据结构说明
- [组件文档](./COMPONENTS.md) - 组件使用指南和开发规范

## 🎯 核心功能

### 沉浸式首页 (Home.vue)

一个视觉冲击力强的首页设计，具有以下特点：

- **全屏动态背景**: GIF 动画作为背景，宽度与视图一致
- **边缘模糊效果**: 使用径向渐变遮罩和内阴影实现中间清晰、边缘模糊的景深效果
- **打字机动画**: 欢迎标题和副标题的打字机效果
- **高透明卡片**: 20%/10% 透明度的简介卡片，配合 15px 毛玻璃模糊
- **技能展示**: 6 个技能卡片，带进度条和悬停动画
- **快速导航**: 导航卡片带渐变边框发光效果
- **完美响应式**: 桌面、平板、移动端全适配

### 浮动音乐播放器

一个功能丰富的音乐播放器组件，具有以下特点：

- 播放/暂停、上一首/下一首控制
- 进度条拖动和音量调节
- LRC格式歌词显示和同步
- 可拖拽移动和右下角缩小动画
- 收起/展开功能

### 科幻风格界面

- 动态钻石背景效果
- 雪花飘落动画
- 入场动画效果
- 精美的过渡和微交互

## 🛠️ 技术栈

- **前端框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **路由**: Vue Router 4
- **状态管理**: Pinia
- **样式**: SCSS
- **动画**: Animate.css
- **HTTP客户端**: Axios
- **全屏效果**: vue-fullpage.js

## 📱 页面路由

| 路径 | 组件 | 描述 |
|------|------|------|
| `/` | dh.vue | 导航页 - 欢迎页面和快速导航 |
| `/home` | Home.vue | 首页 - 沉浸式动态背景展示 |
| `/view1` | view1.vue | 项目展示页 - 个人开源项目 |
| `/about` | about.vue | 关于页面 - 个人介绍和社交链接 |

## 🎨 页面展示

### 首页 (Home.vue)

首页采用沉浸式设计，主要技术实现：

**背景效果**:
```css
/* 径向渐变遮罩 - 实现边缘模糊 */
mask-image: radial-gradient(
  ellipse 100% 100% at 50% 50%,
  black 50%,
  rgba(0, 0, 0, 0.3) 75%,
  transparent 100%
);

/* 内阴影 - 增强边缘暗化 */
box-shadow: inset 0 0 100px 50px rgba(0, 0, 0, 0.8);

/* 图片增强 */
filter: brightness(1.1) contrast(1.05) saturate(1.1);
```

**全宽布局**:
```css
/* 负边距实现全宽 */
margin-left: -2rem;
margin-right: -2rem;
width: calc(100% + 4rem);
```

**高透明卡片**:
```css
background: linear-gradient(
  145deg,
  rgba(30, 30, 30, 0.2),
  rgba(45, 45, 45, 0.1)
);
backdrop-filter: blur(15px);
```

### 浮动音乐播放器

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

## 🚀 部署

项目配置了自动部署到GitHub Pages：

1. 代码推送到GitHub仓库
2. GitHub Actions自动触发构建
3. 构建产物部署到gh-pages分支
4. 通过GitHub Pages服务访问

手动部署命令：

```bash
npm run deploy
```

## 🤝 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开Pull Request

## 📄 许可证

本项目采用 [MIT](LICENSE) 许可证。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和开源社区。

---

**注意**: 这是一个个人作品集项目，用于展示前端开发技能和创意设计。欢迎提供反馈和建议！