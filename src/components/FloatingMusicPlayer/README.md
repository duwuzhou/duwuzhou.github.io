# 浮动音乐播放器 (FloatingMusicPlayer)

这是一个模块化的浮动音乐播放器组件，支持播放、暂停、切换歌曲、显示歌词等功能。

## 组件结构

```
FloatingMusicPlayer/
├── FloatingMusicPlayer.vue  # 主组件文件
├── useLyrics.ts            # 歌词处理逻辑
├── usePlayerControl.ts     # 播放器控制逻辑
├── types.ts                # 类型定义
├── styles.scss             # 样式文件
├── index.ts                # 入口文件
└── README.md               # 说明文档
```

## 使用方法

### 基本用法

```vue
<template>
  <div>
    <FloatingMusicPlayer 
      :songs="songs" 
      :initialSongIndex="0" 
      :autoplay="true"
      :showLyrics="true"
      :lyrics="lyrics"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { FloatingMusicPlayer } from '@/components/FloatingMusicPlayer';

// 歌曲列表
const songs = ref([
  {
    id: 'song1',
    title: '歌曲1',
    artist: '歌手1',
    url: 'https://example.com/song1.mp3',
    cover: 'https://example.com/cover1.jpg'
  },
  {
    id: 'song2',
    title: '歌曲2',
    artist: '歌手2',
    url: 'https://example.com/song2.mp3',
    cover: 'https://example.com/cover2.jpg'
  }
]);

// 歌词数据
const lyrics = ref({
  song1: [
    { time: 0, text: '这是第一句歌词' },
    { time: 5, text: '这是第二句歌词' },
    // ...
  ],
  song2: [
    { time: 0, text: '另一首歌的歌词' },
    // ...
  ]
});
</script>
```

### 导入单个模块

如果只需要使用部分功能，可以单独导入：

```javascript
// 只导入歌词处理逻辑
import { useLyrics } from '@/components/FloatingMusicPlayer/useLyrics';

// 只导入播放器控制逻辑
import { usePlayerControl } from '@/components/FloatingMusicPlayer/usePlayerControl';

// 只导入类型定义
import type { Song, LyricsMap } from '@/components/FloatingMusicPlayer/types';
```

## 组件属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| songs | `Song[]` | 必填 | 歌曲列表 |
| initialSongIndex | `number` | 0 | 初始播放歌曲索引 |
| autoplay | `boolean` | false | 是否自动播放下一首 |
| showLyrics | `boolean` | false | 是否显示歌词 |
| lyrics | `LyricsMap` | undefined | 歌词数据 |

## 类型定义

### Song

```typescript
interface Song {
  id: string;
  title: string;
  artist: string;
  url: string;
  cover: string;
}
```

### LyricsMap

```typescript
type LyricsMap = Record<string, Array<{
  time: number;
  text: string;
}>>;
```

## 功能特性

- 播放/暂停控制
- 上一首/下一首切换
- 进度条控制
- 音量控制和静音
- 自动播放下一首
- 歌词显示和同步
- 收起/展开播放器
- 拖拽移动播放器位置
- 响应式设计

## 自定义样式

可以通过修改 `styles.scss` 文件来自定义播放器样式。主要变量定义在文件顶部：

```scss
:root {
  --primary-color: #f0f0f0;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  // ...
}
```

## 注意事项

1. 确保音频文件URL可访问
2. 歌词数据格式需要符合 `LyricsMap` 类型定义
3. 组件使用了Vue 3的Composition API，需要Vue 3环境
4. 样式使用了SCSS，需要确保项目支持SCSS预处理器