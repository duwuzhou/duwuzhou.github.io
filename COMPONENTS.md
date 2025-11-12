# 组件文档

本文档详细介绍了项目中各个组件的功能、属性和使用方法。

## 核心组件

### 1. FloatingMusicPlayer (浮动音乐播放器)

一个功能丰富的浮动音乐播放器组件，支持拖拽、歌词显示等功能。

#### 文件结构
```
FloatingMusicPlayer/
├── FloatingMusicPlayer.vue  # 主组件文件
├── useLyrics.ts            # 歌词处理逻辑
├── usePlayerControl.ts     # 播放器控制逻辑
├── types.ts                # 类型定义
├── styles.scss             # 样式文件
├── index.ts                # 入口文件
└── README.md               # 组件说明
```

#### 主要功能
- 播放/暂停控制
- 上一首/下一首切换
- 进度条控制
- 音量控制和静音
- 歌词显示和同步
- 播放器拖拽移动
- 收起/展开功能
- 右下角缩小动画

#### 使用方法
```vue
<template>
  <FloatingMusicPlayer :songs="songs" />
</template>

<script setup>
import { Song } from '@/components/FloatingMusicPlayer/types'

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

#### 属性
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| songs | `Song[]` | 必填 | 歌曲列表 |
| initialSongIndex | `number` | 0 | 初始播放歌曲索引 |
| autoplay | `boolean` | false | 是否自动播放下一首 |
| showLyrics | `boolean` | false | 是否显示歌词 |

### 2. SciFiDiamondBackground (科幻钻石背景)

创建动态科幻风格的钻石背景效果。

#### 功能特点
- 动态钻石形状生成
- 颜色渐变效果
- 动画过渡
- 响应式设计

#### 使用方法
```vue
<template>
  <div class="app-container">
    <SciFiDiamondBackground />
    <!-- 其他内容 -->
  </div>
</template>

<script setup>
import SciFiDiamondBackground from '@/components/SciFiDiamondBackground.vue'
</script>
```

### 3. Snowfall (雪花飘落效果)

创建雪花飘落的动画效果。

#### 功能特点
- 多个雪花同时飘落
- 随机大小和速度
- 自然的飘落路径
- 轻量级实现

#### 使用方法
```vue
<template>
  <div class="app-container">
    <Snowfall />
    <!-- 其他内容 -->
  </div>
</template>

<script setup>
import Snowfall from '@/components/Snowfall.vue'
</script>
```

### 4. NavigationBar (导航栏)

响应式导航栏组件，支持多页面导航。

#### 功能特点
- 响应式设计
- 路由高亮
- 平滑过渡效果
- 移动端适配

#### 使用方法
```vue
<template>
  <div class="app-container">
    <NavigationBar />
    <!-- 其他内容 -->
  </div>
</template>

<script setup>
import NavigationBar from '@/components/NavigationBar.vue'
</script>
```

### 5. GifDisplay (GIF展示组件)

用于展示GIF动画的组件，支持加载状态和自定义样式。

#### 功能特点
- 加载状态指示
- 自定义尺寸
- 标题显示
- 悬停效果

#### 使用方法
```vue
<template>
  <GifDisplay
    src="/path/to/image.gif"
    title="GIF标题"
    width="300px"
    height="200px"
  />
</template>

<script setup>
import GifDisplay from '@/components/GifDisplay.vue'
</script>
```

#### 属性
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| src | `string` | 必填 | GIF图片URL |
| title | `string` | '' | GIF标题 |
| width | `string` | '300px' | 宽度 |
| height | `string` | 'auto' | 高度 |

### 6. Typewriter (打字机效果)

创建打字机效果的文本展示组件。

#### 功能特点
- 可配置打字速度
- 支持多行文本
- 光标闪烁效果
- 循环播放选项

#### 使用方法
```vue
<template>
  <Typewriter
    text="要展示的文本"
    :speed="100"
    :loop="true"
  />
</template>

<script setup>
import Typewriter from '@/components/Typewriter.vue'
</script>
```

#### 属性
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| text | `string` | 必填 | 要展示的文本 |
| speed | `number` | 100 | 打字速度(毫秒) |
| loop | `boolean` | false | 是否循环播放 |

### 7. EntranceAnimation (入场动画)

为元素添加入场动画效果的组件。

#### 功能特点
- 多种动画效果
- 可配置延迟
- 动画完成后回调
- 响应式设计

#### 使用方法
```vue
<template>
  <EntranceAnimation
    animation="fadeInUp"
    :delay="500"
    @animation-end="handleAnimationEnd"
  >
    <div>要添加动画的内容</div>
  </EntranceAnimation>
</template>

<script setup>
import EntranceAnimation from '@/components/EntranceAnimation.vue'

const handleAnimationEnd = () => {
  console.log('动画完成')
}
</script>
```

#### 属性
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| animation | `string` | 'fadeIn' | 动画类型 |
| delay | `number` | 0 | 延迟时间(毫秒) |
| duration | `number` | 1000 | 动画持续时间(毫秒) |

#### 事件
| 事件名 | 参数 | 说明 |
|--------|------|------|
| animation-end | - | 动画完成时触发 |

### 8. BlogSection (博客文章展示)

展示博客文章列表的组件。

#### 功能特点
- 文章卡片展示
- 标签显示
- 响应式布局
- 加载状态

#### 使用方法
```vue
<template>
  <BlogSection :articles="articles" :loading="loading" />
</template>

<script setup>
import BlogSection from '@/components/BlogSection.vue'
import { ref } from 'vue'

const articles = ref([
  {
    title: '文章标题',
    summary: '文章摘要',
    date: '2023-01-01',
    tags: ['标签1', '标签2']
  }
])

const loading = ref(false)
</script>
```

#### 属性
| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| articles | `BlogArticle[]` | [] | 文章列表 |
| loading | `boolean` | false | 加载状态 |

## 页面组件

### 1. Home (首页)

网站首页，展示主要内容和个人介绍。

### 2. About (关于页面)

个人介绍和联系方式页面。

### 3. Article (文章列表页)

展示博客文章列表的页面。

### 4. ArticleDetail (文章详情页)

展示单篇文章详细内容的页面。

### 5. View1 (展示页面)

自定义展示页面。

## 样式指南

### SCSS变量

项目使用SCSS预处理器，定义了以下全局变量：

```scss
:root {
  --primary-color: #f0f0f0;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --background-color: #121212;
  --accent-color: #42b983;
}
```

### 响应式断点

```scss
$mobile: 768px;
$tablet: 1024px;
$desktop: 1200px;
```

## 组件开发规范

### 1. 命名规范

- 组件文件使用PascalCase命名
- 组件属性使用camelCase命名
- 事件名使用kebab-case命名

### 2. TypeScript规范

- 使用TypeScript进行类型定义
- 为组件属性定义接口
- 导出必要的类型定义

### 3. 样式规范

- 使用SCSS预处理器
- 组件样式使用scoped作用域
- 遵循BEM命名规范

### 4. 组件结构

```vue
<template>
  <!-- 模板内容 -->
</template>

<script setup lang="ts">
// 导入
import { ref, computed, onMounted } from 'vue'

// 类型定义
interface Props {
  // 属性定义
}

// 属性和默认值
const props = withDefaults(defineProps<Props>(), {
  // 默认值
})

// 响应式数据
const data = ref()

// 计算属性
const computedValue = computed(() => {
  // 计算逻辑
})

// 方法
const method = () => {
  // 方法实现
}

// 生命周期
onMounted(() => {
  // 初始化逻辑
})
</script>

<style scoped>
/* 组件样式 */
</style>
```

## 最佳实践

1. **组件复用**: 设计通用、可复用的组件
2. **性能优化**: 使用懒加载和代码分割
3. **响应式设计**: 确保组件在不同设备上正常工作
4. **可访问性**: 添加适当的ARIA属性和键盘导航
5. **错误处理**: 添加错误边界和错误处理逻辑