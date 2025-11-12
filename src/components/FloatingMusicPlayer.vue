<template>
  <div class="floating-music-player" :class="{ 'collapsed': isCollapsed, 'playing': isPlaying }">
    <!-- 播放器主体 -->
    <div class="player-container" :class="{ 'collapsed': isCollapsed }">
      <!-- 专辑封面 -->
      <div class="album-cover" @click="togglePlay">
        <img :src="currentSong.cover || defaultCover" :alt="currentSong.title + '专辑封面'">
        <div class="play-button">
          <i :class="['icon', isPlaying ? 'icon-pause' : 'icon-play']"></i>
        </div>
        <div class="cover-overlay"></div>
      </div>
      
      <!-- 歌曲信息 -->
      <div class="song-info">
        <!-- 歌词显示按钮 -->
        <button class="lyrics-toggle" @click="toggleLyrics" :title="showLyrics ? '隐藏歌词' : '显示歌词'" v-if="!isCollapsed">
          <i :class="['icon', showLyrics ? 'icon-lyrics-on' : 'icon-lyrics-off']"></i>
        </button>
        
        <div class="song-meta">
          <div class="song-title" :title="currentSong.title">{{ currentSong.title }}</div>
          <div class="song-artist" :title="currentSong.artist">{{ currentSong.artist }}</div>
        </div>
        
        <!-- 歌词显示区域 -->
        <div class="lyrics-container" v-if="showLyrics && !isCollapsed" ref="lyricsContainer">
          <!-- 加载状态 -->
          <div class="lyrics-loading" v-if="isLoading">
            <div class="loading-spinner"></div>
            <span>{{ loadStatus }}</span>
          </div>
          
          <!-- 逐字显示的当前歌词 -->
          <div class="current-lyric-container" v-if="currentLyricText && !isLoading">
            <div class="current-lyric">
              <span class="highlighted-text">{{ displayedLyricText }}</span>
              <span class="remaining-text">{{ currentLyricText.substring(displayedLyricText.length) }}</span>
            </div>
            <div class="lyric-progress-bar">
              <div class="lyric-progress" :style="{ width: lyricProgress * 100 + '%' }"></div>
            </div>
          </div>
          
          <!-- 其他歌词行 -->
          <template v-if="!isLoading">
            <div class="lyrics-text" 
                 v-for="(line, index) in currentLyrics" 
                 :key="index"
                 :class="{ 
                   'active': index === 0 && line === currentLyricText,
                   'previous': index < currentLyricIndex,
                   'next': index > currentLyricIndex
                 }">
              {{ line }}
            </div>
            
            <div class="no-lyrics" v-if="currentLyrics.length === 0 && loadStatus === '无可用歌词'">
              <i class="icon icon-no-lyrics"></i>
              <span>暂无歌词</span>
            </div>
          </template>
        </div>
        
        <!-- 进度条 -->
        <div class="progress-container" v-if="!isCollapsed">
          <div class="progress-bar" 
               @mousedown="startDragging" 
               @mousemove="handleDrag" 
               @mouseup="stopDragging"
               @mouseleave="stopDragging"
               @click="handleProgressClick"
               ref="progressBarRef">
            <div class="progress" :style="{ width: progress + '%' }"></div>
            <div class="progress-handle" 
                 :style="{ left: progress + '%' }" 
                 :class="{ 'dragging': isDragging }"></div>
          </div>
          <div class="time-info">
            <span>{{ formatTime(currentTime) }}</span>
            <span>{{ formatTime(duration) }}</span>
          </div>
        </div>
        
        <!-- 控制按钮 -->
        <div class="controls" v-if="!isCollapsed">
          <button @click="() => autoplay = !autoplay" :title="autoplay ? '关闭自动播放' : '开启自动播放'">
            <i :class="['icon', autoplay ? 'icon-autoplay-on' : 'icon-autoplay-off']"></i>
          </button>
          <button @click="prevSong" title="上一首">
            <i class="icon icon-prev"></i>
          </button>
          <button @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
            <i :class="['icon', isPlaying ? 'icon-pause' : 'icon-play']"></i>
          </button>
          <button @click="nextSong" title="下一首">
            <i class="icon icon-next"></i>
          </button>
          <button @click="toggleMute" :title="isMuted ? '取消静音' : '静音'">
            <i :class="['icon', isMuted ? 'icon-mute' : 'icon-volume']"></i>
          </button>
        </div>
      </div>
    </div>
    
    <!-- 迷你播放器 (收起状态) -->
    <div class="mini-player" v-if="isCollapsed">
      <div class="mini-cover" @dblclick="toggleCollapse">
        <img :src="currentSong.cover || defaultCover" :alt="currentSong.title + '专辑封面'">
        <div class="mini-play-icon" :class="{ 'playing': isPlaying }" @click.stop="togglePlay">
          <i :class="['icon', isPlaying ? 'icon-pause' : 'icon-play']"></i>
        </div>
      </div>
    </div>
    
    <!-- 展开/收起按钮 -->
    <button class="toggle-button" @click="toggleCollapse" :title="isCollapsed ? '展开播放器' : '收起播放器'">
      <i :class="['icon', isCollapsed ? 'icon-expand' : 'icon-collapse']"></i>
    </button>
  </div>
</template>

<style scoped>
/* 基础样式 */
:root {
  --primary-color: #f0f0f0;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --text-tertiary: rgba(255, 255, 255, 0.5);
  --bg-primary: rgba(30, 30, 30, 0.9);
  --bg-secondary: rgba(40, 40, 40, 0.8);
  --bg-tertiary: rgba(0, 0, 0, 0.2);
  --shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  --transition: all 0.3s ease;
}

.icon {
  font-style: normal;
  font-weight: normal;
  display: inline-block;
  text-decoration: none;
  width: 1em;
  text-align: center;
}

.icon-play::before { content: "▶"; }
.icon-pause::before { content: "⏸"; }
.icon-prev::before { content: "⏮"; }
.icon-next::before { content: "⏭"; }
.icon-volume::before { content: "🔊"; }
.icon-mute::before { content: "🔇"; }
.icon-autoplay-on::before { content: "🔄"; }
.icon-autoplay-off::before { content: "⏹"; }
.icon-lyrics-on::before { content: "📜"; }
.icon-lyrics-off::before { content: "🎵"; }
.icon-expand::before { content: "⬆"; }
.icon-collapse::before { content: "⬇"; }
.icon-no-lyrics::before { content: "❌"; }

/* 播放器容器 */
.floating-music-player {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 320px;
  background-color: var(--bg-primary);
  border-radius: 12px;
  box-shadow: var(--shadow);
  color: var(--text-primary);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), height 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.4s ease;
  z-index: 1000;
  overflow: hidden;
  font-family: 'Noto Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
}

.player-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  opacity: 1;
  transition: opacity 0.3s ease;
}

.player-container.collapsed {
  opacity: 0;
  pointer-events: none;
}

/* 专辑封面 */
.album-cover {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
  cursor: pointer;
}

.album-cover img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.album-cover:hover img {
  transform: scale(1.05);
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
}

.play-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 2;
}

.play-button .icon {
  font-size: 36px;
  color: white;
  text-shadow: 0 2px 8px rgba(0,0,0,0.5);
  background: rgba(0,0,0,0.5);
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.album-cover:hover .play-button {
  opacity: 1;
}

/* 歌曲信息 */
.song-info {
  position: relative;
}

.song-meta {
  margin-bottom: 12px;
}

.song-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
}

.song-artist {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 歌词按钮 */
.lyrics-toggle {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 16px;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background-color 0.2s;
  z-index: 10;
}

.lyrics-toggle:hover {
  background-color: var(--bg-tertiary);
}

/* 歌词容器 */
.lyrics-container {
  margin: 12px 0 16px;
  padding: 12px;
  background-color: var(--bg-tertiary);
  border-radius: 8px;
  max-height: 200px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) transparent;
}

.lyrics-container::-webkit-scrollbar {
  width: 6px;
}

.lyrics-container::-webkit-scrollbar-thumb {
  background-color: var(--primary-color);
  border-radius: 3px;
}

.lyrics-container::-webkit-scrollbar-track {
  background: transparent;
}

/* 歌词加载状态 */
.lyrics-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  color: var(--text-secondary);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.2);
  border-radius: 50%;
  border-top-color: var(--primary-color);
  animation: spin 1s linear infinite;
  margin-bottom: 8px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 当前歌词 */
.current-lyric-container {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.current-lyric {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 8px;
  text-align: center;
  font-weight: 500;
}

.highlighted-text {
  color: var(--primary-color);
  font-weight: 700;
  text-shadow: 0 0 8px rgba(29, 185, 84, 0.3);
}

.remaining-text {
  color: var(--text-secondary);
}

.lyric-progress-bar {
  height: 2px;
  background-color: rgba(255,255,255,0.1);
  border-radius: 1px;
  margin: 8px auto;
  width: 80%;
  overflow: hidden;
}

.lyric-progress {
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.1s linear;
}

/* 歌词文本 */
.lyrics-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text-secondary);
  margin: 8px 0;
  padding: 4px 8px;
  border-radius: 4px;
  transition: var(--transition);
}

.lyrics-text.active {
  color: var(--text-primary);
  font-weight: 500;
  background-color: rgba(255,255,255,0.05);
}

.lyrics-text.previous {
  opacity: 0.5;
  transform: scale(0.95);
}

.lyrics-text.next {
  opacity: 0.7;
}

.no-lyrics {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  color: var(--text-secondary);
}

.no-lyrics .icon {
  font-size: 24px;
  margin-bottom: 8px;
}

/* 进度条 */
.progress-container {
  margin-bottom: 16px;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: rgb(0, 0, 0,0.3);
  border-radius: 2px;
  cursor: pointer;
  position: relative;
  margin: 8px 0;
}

.progress {
  height: 100%;
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  transition: width 0.1s linear;
}

.progress-handle {
  position: absolute;
  top: 50%;
  width: 12px;
  height: 12px;
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: var(--transition);
  pointer-events: none;
}

.progress-bar:hover .progress-handle,
.progress-handle.dragging {
  transform: translate(-50%, -50%) scale(1);
}

.progress-handle.dragging {
  transform: translate(-50%, -50%) scale(1.2);
}

.time-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-tertiary);
  margin-top: 4px;
}

/* 控制按钮 */
.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.controls button {
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: var(--transition);
  flex: 1;
  max-width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.controls button:hover {
  background-color: var(--bg-tertiary);
  transform: scale(1.1);
}

.controls button:active {
  transform: scale(0.95);
}

/* 主播放按钮特殊样式 */
.controls button:nth-child(3) {
  background-color: var(--primary-color);
  color: white;
  max-width: 48px;
  height: 48px;
}

.controls button:nth-child(3):hover {
  background-color: rgba(255, 255, 255, 0.8);
  transform: scale(1.05);
}

/* 收起/展开按钮 */
.toggle-button {
  width: 100%;
  padding: 8px 0;
  background-color: var(--bg-secondary);
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 14px;
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
}

.toggle-button:hover {
  background-color: rgba(50, 50, 50, 0.8);
}

/* 收起状态时调整按钮位置 */
.collapsed .toggle-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 50%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 收起状态 */
.collapsed {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 迷你播放器 */
.mini-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.collapsed .mini-player {
  opacity: 1;
  pointer-events: all;
}

.mini-cover {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
}

.mini-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mini-play-icon {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
  transition: all 0.3s ease;
}

.mini-player:hover .mini-play-icon, .mini-play-icon.playing {
  opacity: 1;
}

.mini-play-icon .icon {
  color: white;
  font-size: 20px;
}

.mini-player:hover .mini-play-icon {
  opacity: 1;
}

/* 展开/收起图标动画 */
.icon-expand, .icon-collapse {
  transition: transform 0.3s ease;
}

.collapsed .icon-expand {
  transform: rotate(180deg);
}

.icon-collapse {
  transform: rotate(180deg);
}

.collapsed .icon-collapse {
  transform: rotate(0deg);
}

/* 响应式调整 */
@media (max-width: 480px) {
  .floating-music-player {
    width: 280px;
    right: 10px;
    bottom: 10px;
  }
  
  .collapsed {
    width: 50px;
    height: 50px;
  }
  
  .lyrics-container {
    max-height: 150px;
  }
  
  .current-lyric {
    font-size: 16px;
  }
  
  .lyrics-text {
    font-size: 14px;
  }
}

.mini-play-icon.playing {
  opacity: 1;
  background-color: rgba(0,0,0,0.5);
}

.collapsed .mini-cover img {
  animation: spin 4s linear infinite;
  animation-play-state: paused;
}

.collapsed.playing .mini-cover img {
  animation-play-state: running;
}


</style>

<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue';

// 定义歌曲类型接口
interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  lrcFile?: string;
  lyrics?: [number, string][];
}

// 默认封面图片
const defaultCover = '/images/default-cover.jpg';

// 播放器状态
const isPlaying = ref(false);
const isCollapsed = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const autoplay = ref(true);
const showLyrics = ref(false);
const isLoading = ref(false);
const loadStatus = ref('');

// 歌词相关
const currentLyrics = ref<string[]>([]);
const lyricsMap = ref<Map<number, string>>(new Map());
const lyricsContainer = ref<HTMLElement | null>(null);

// 逐字显示相关
const currentLyricIndex = ref(-1);
const currentLyricText = ref('');
const displayedLyricText = ref('');
const characterIndex = ref(0);
const lyricStartTime = ref(0);
const lyricEndTime = ref(0);

// 进度条拖拽相关
const isDragging = ref(false);
const progressBarRef = ref<HTMLElement | null>(null);

// 播放进度缓存 key
const STORAGE_KEY = 'floating-music-player-progress';

// 计算属性
const progress = computed(() => {
  return duration.value ? (currentTime.value / duration.value) * 100 : 0;
});

const lyricProgress = computed(() => {
  if (lyricStartTime.value === lyricEndTime.value) return 0;
  const lyricDuration = lyricEndTime.value - lyricStartTime.value;
  const elapsed = currentTime.value - lyricStartTime.value;
  return Math.max(0, Math.min(1, elapsed / lyricDuration));
});

// 播放列表
const playlist = reactive<Song[]>([
  {
    id: 1,
    title: '于是',
    artist: '郑润泽',
    src: '/music/于是.mp3',
    cover: '/images/于是.jpg',
    lrcFile: '/music/于是.lrc'
  },
]);

const currentIndex = ref(0);
const currentSong = computed(() => playlist[currentIndex.value] || {});

let audio: HTMLAudioElement;

// 生命周期钩子
onMounted(() => {
  initAudio();
  setupAudioEvents();
  setupUnlockAudio();

  // 恢复播放进度
  const savedProgress = localStorage.getItem(STORAGE_KEY);
  if (savedProgress) {
    const time = parseFloat(savedProgress);
    if (!isNaN(time) && time < duration.value) {
      currentTime.value = time;
      if (audio) audio.currentTime = time;
    }
  }
});

onUnmounted(() => {
  cleanupAudio();

  // 缓存播放进度
  localStorage.setItem(STORAGE_KEY, currentTime.value.toString());
});

// 音频初始化
const initAudio = () => {
  audio = new Audio();
  audio.src = currentSong.value.src;
  audio.muted = true; // 初始静音绕过浏览器限制
  loadLyrics(currentSong.value);
};

// 音频事件设置
const setupAudioEvents = () => {
  // 合并 timeupdate 事件处理
  const handleTimeUpdate = () => {
    updateProgress();
    updateLyrics();
  };
  
  audio.addEventListener('timeupdate', handleTimeUpdate);
  audio.addEventListener('ended', handleSongEnd);
  audio.addEventListener('loadedmetadata', () => {
    duration.value = audio.duration;
  });
  audio.addEventListener('canplay', handleCanPlay);
  
  // 保存引用以便清理
  (audio as any)._handleTimeUpdate = handleTimeUpdate;
};

// 解锁音频自动播放
const setupUnlockAudio = () => {
  const unlockAudio = () => {
    if (audio.muted) {
      audio.muted = false;
      if (autoplay.value && !isPlaying.value) {
        audio.play().then(() => {
          isPlaying.value = true;
        }).catch(console.warn);
      }
    }
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('touchstart', unlockAudio);
  };

  window.addEventListener('click', unlockAudio, { once: true });
  window.addEventListener('touchstart', unlockAudio, { once: true });
};

// 清理音频
const cleanupAudio = () => {
  if (audio) {
    audio.pause();
    // 移除所有事件监听器
    if ((audio as any)._handleTimeUpdate) {
      audio.removeEventListener('timeupdate', (audio as any)._handleTimeUpdate);
    }
    audio.removeEventListener('ended', handleSongEnd);
    audio.removeEventListener('loadedmetadata', () => {
      duration.value = audio.duration;
    });
    audio.removeEventListener('canplay', handleCanPlay);
    // 重置音频相关状态
    audio.currentTime = 0;
    audio.src = '';
  }
};

// 可以播放时处理
const handleCanPlay = () => {
  if (autoplay.value) {
    audio.play().then(() => {
      isPlaying.value = true;
    }).catch(err => {
      console.warn('自动播放被拦截:', err);
    });
  }
};

// 更新进度
const updateProgress = () => {
  if (!isDragging.value) {
    currentTime.value = audio.currentTime;
  }
};

// 进度条交互
const handleProgressClick = (event: MouseEvent) => {
  if (!progressBarRef.value) return;
  const rect = progressBarRef.value.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const percentage = offsetX / rect.width;
  const newTime = percentage * duration.value;
  currentTime.value = newTime;
  audio.currentTime = newTime;
};

// 支持鼠标和触摸拖拽开始
const startDragging = (event: MouseEvent | TouchEvent) => {
  isDragging.value = true;
  handleDrag(event);
};

// 支持鼠标和触摸拖拽过程
const handleDrag = (event: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !progressBarRef.value) return;

  let clientX = 0;
  if ('touches' in event && event.touches.length) {
    clientX = event.touches[0].clientX;
  } else if ('clientX' in event) {
    clientX = event.clientX;
  } else {
    return;
  }

  const rect = progressBarRef.value.getBoundingClientRect();
  const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
  const percentage = offsetX / rect.width;
  currentTime.value = percentage * duration.value;
};

// 停止拖拽
const stopDragging = () => {
  if (isDragging.value) {
    isDragging.value = false;
    audio.currentTime = currentTime.value;
  }
};

// 歌曲结束处理
const handleSongEnd = () => {
  nextSong();
};

// 时间格式化
const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// 播放控制
const togglePlay = () => {
  if (isPlaying.value) {
    audio.pause();
    isPlaying.value = false;
  } else {
    audio.play().then(() => {
      isPlaying.value = true;
    }).catch(console.error);
  }
};

const nextSong = () => {
  currentIndex.value = (currentIndex.value + 1) % playlist.length;
  changeSong();
};

const prevSong = () => {
  currentIndex.value = (currentIndex.value - 1 + playlist.length) % playlist.length;
  changeSong();
};

const changeSong = () => {
  // 重置所有状态
  audio.src = currentSong.value.src;
  currentLyrics.value = [];
  currentLyricIndex.value = -1;
  currentLyricText.value = '';
  displayedLyricText.value = '';
  characterIndex.value = 0;
  lyricStartTime.value = 0;
  lyricEndTime.value = 0;
  sortedLyricsCache = [];
  
  loadLyrics(currentSong.value);

  if (autoplay.value) {
    audio.play().then(() => {
      isPlaying.value = true;
    }).catch(err => {
      console.warn('切歌自动播放被拦截:', err);
    });
  } else {
    isPlaying.value = false;
  }
};

// 优化歌词加载 - 先解析后赋值，避免闪烁
const loadLyrics = async (song: any) => {
  isLoading.value = true;
  loadStatus.value = '加载歌词中...';
  lyricsMap.value.clear();

  try {
    let tempMap = new Map<number, string>();
    if (song.lrcFile) {
      const response = await fetch(song.lrcFile);
      if (response.ok) {
        const lrcText = await response.text();
        tempMap = parseLRCToMap(lrcText);
        loadStatus.value = '';
      } else {
        loadStatus.value = '歌词加载失败';
        console.error('加载歌词文件失败:', response.statusText);
      }
    } else if (song.lyrics && Array.isArray(song.lyrics)) {
      song.lyrics.forEach((item: [number, string]) => {
        tempMap.set(item[0], item[1]);
      });
      loadStatus.value = '';
    } else {
      loadStatus.value = '无可用歌词';
    }
    lyricsMap.value = tempMap;
  } catch (error) {
    loadStatus.value = '歌词加载出错';
    console.error('加载歌词文件出错:', error);
  } finally {
    isLoading.value = false;
  }
};

// 辅助函数：解析 LRC 返回 Map
const parseLRCToMap = (lrcText: string): Map<number, string> => {
  const map = new Map<number, string>();
  const lines = lrcText.split('\n');
  // 修改正则表达式以支持2-3位毫秒数字
  const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/;
  lines.forEach(line => {
    const match = line.match(timeRegex);
    if (match) {
      const minutes = parseInt(match[1]);
      const seconds = parseInt(match[2]);
      const milliseconds = parseInt(match[3]);
      // 根据毫秒位数调整计算
      const totalSeconds = minutes * 60 + seconds + milliseconds / (match[3].length === 3 ? 1000 : 100);
      const lyricText = line.replace(timeRegex, '').trim();
      if (lyricText) {
        map.set(totalSeconds, lyricText);
      }
    }
  });
  return map;
};

// 优化歌词更新，节流滚动，避免卡顿
let lastScrollTime = 0;
const SCROLL_THROTTLE_MS = 200;

// 缓存排序后的歌词，避免每次都重新排序
let sortedLyricsCache: [number, string][] = [];

const updateLyrics = () => {
  if (lyricsMap.value.size === 0) {
    currentLyrics.value = [];
    return;
  }

  const currentSeconds = currentTime.value;
  
  // 只在歌词映射变化时重新排序
  if (sortedLyricsCache.length === 0 || sortedLyricsCache.length !== lyricsMap.value.size) {
    sortedLyricsCache = Array.from(lyricsMap.value.entries()).sort((a, b) => a[0] - b[0]);
  }

  let idx = sortedLyricsCache.findIndex(([time]) => time > currentSeconds) - 1;
  if (idx < 0) idx = 0;

  // 只在当前歌词索引变化时更新显示的歌词
  if (idx !== currentLyricIndex.value) {
    currentLyricIndex.value = idx;
    currentLyricText.value = sortedLyricsCache[idx][1];
    displayedLyricText.value = '';
    characterIndex.value = 0;

    lyricStartTime.value = sortedLyricsCache[idx][0];
    lyricEndTime.value = idx < sortedLyricsCache.length - 1 ? sortedLyricsCache[idx + 1][0] : duration.value;

    // 更新显示的歌词行
    currentLyrics.value = sortedLyricsCache.slice(Math.max(0, idx - 1), idx + 3).map(item => item[1]);
    
    updateCharacterDisplay();

    const now = Date.now();
    if (showLyrics.value && lyricsContainer.value && now - lastScrollTime > SCROLL_THROTTLE_MS) {
      lastScrollTime = now;
      nextTick(scrollToCurrentLyric);
    }
  } else {
    updateCharacterDisplay();
  }
};

// 逐字显示歌词更新
const updateCharacterDisplay = () => {
  if (!currentLyricText.value) return;

  const totalChars = currentLyricText.value.length;
  const progress = lyricProgress.value;
  const charsToShow = Math.min(
    totalChars,
    Math.floor(totalChars * progress * 1.2) // 缓冲效果
  );

  if (charsToShow > characterIndex.value) {
    characterIndex.value = charsToShow;
    displayedLyricText.value = currentLyricText.value.substring(0, characterIndex.value);
  }

  if (progress >= 0.95) {
    displayedLyricText.value = currentLyricText.value;
    characterIndex.value = totalChars;
  }
};

// 滚动当前歌词
const scrollToCurrentLyric = () => {
  if (showLyrics.value && lyricsContainer.value) {
    const container = lyricsContainer.value;
    if (container) {
      const activeLyric = container.querySelector('.lyrics-text.active') as HTMLElement;
      if (activeLyric) {
        container.scrollTo({
          top: activeLyric.offsetTop - container.clientHeight / 3,
          behavior: 'smooth'
        });
      }
    }
  }
};

// UI交互
const toggleLyrics = () => {
  showLyrics.value = !showLyrics.value;
  if (showLyrics.value) {
    nextTick(scrollToCurrentLyric);
  }
};

const toggleMute = () => {
  audio.muted = !audio.muted;
  isMuted.value = audio.muted;
};

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>