<template>
  <div
    class="floating-music-player"
    :class="{ 
      collapsed: isCollapsed, 
      playing: isPlaying,
      'dragging-player': isDraggingPlayer
    }"
    ref="playerElement"
    @mousedown="startPlayerDrag"
    @touchstart="startPlayerDrag"
  >
    <!-- 主播放器内容 -->
    <div class="player-container" :class="{ collapsed: isCollapsed }">
      <!-- 专辑封面 -->
      <div class="album-cover" @click="togglePlay">
        <img :src="currentSong.cover" :alt="currentSong.title" />
        <div class="cover-overlay"></div>
        <div class="play-button">
          <span class="icon" :class="isPlaying ? 'icon-pause' : 'icon-play'"></span>
        </div>
      </div>

      <!-- 歌曲信息 -->
      <div class="song-info">
        <div class="song-meta">
          <h3 class="song-title">{{ currentSong.title }}</h3>
          <p class="song-artist">{{ currentSong.artist }}</p>
        </div>
        
        <!-- 歌词显示按钮 -->
        <button 
          class="lyrics-toggle" 
          @click="toggleLyrics" 
          :title="showLyrics ? '隐藏歌词' : '显示歌词'"
        >
          <span class="icon" :class="showLyrics ? 'icon-lyrics-on' : 'icon-lyrics-off'"></span>
        </button>
      </div>

      <!-- 歌词容器 -->
      <div class="lyrics-container" v-if="showLyrics">
        <!-- 加载状态 -->
        <div v-if="isLoading" class="lyrics-loading">
          <div class="loading-spinner"></div>
          <p>{{ loadStatus }}</p>
        </div>
        
        <!-- 当前歌词 -->
        <div v-else-if="currentLyricText" class="current-lyric-container">
          <div class="current-lyric">
            <span class="highlighted-text">{{ displayedLyricText }}</span>
            <span class="remaining-text">{{ currentLyricText.substring(displayedLyricText.length) }}</span>
          </div>
          <div class="lyric-progress-bar">
            <div class="lyric-progress" :style="{ width: `${lyricProgress * 100}%` }"></div>
          </div>
        </div>
        
        <!-- 歌词列表 -->
        <div v-if="!isLoading && currentLyrics.length > 0" ref="lyricsContainer">
          <div
            v-for="(lyric, index) in currentLyrics"
            :key="index"
            class="lyrics-text"
            :class="{
              active: lyric === currentLyricText,
              previous: lyric !== currentLyricText,
              next: lyric !== currentLyricText
            }"
          >
            {{ lyric }}
          </div>
        </div>
        
        <!-- 无歌词提示 -->
        <div v-else-if="!isLoading" class="no-lyrics">
          <span class="icon icon-no-lyrics"></span>
          <p>暂无歌词</p>
        </div>
      </div>

      <!-- 进度条 -->
      <div class="progress-container">
        <div class="progress-bar" @click="seekToPosition" ref="progressBarRef">
          <div class="progress" :style="{ width: `${progress}%` }"></div>
          <div 
            class="progress-handle" 
            :class="{ dragging: isDragging }"
            :style="{ left: `${progress}%` }"
          ></div>
        </div>
        <div class="time-info">
          <span>{{ formatTime(currentTime) }}</span>
          <span>{{ formatTime(duration) }}</span>
        </div>
      </div>

      <!-- 控制按钮 -->
      <div class="controls">
        <button @click="toggleAutoplay" :title="autoplay ? '关闭自动播放' : '开启自动播放'">
          <span class="icon" :class="autoplay ? 'icon-autoplay-on' : 'icon-autoplay-off'"></span>
        </button>
        <button @click="prevSong" title="上一首">
          <span class="icon icon-prev"></span>
        </button>
        <button @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
          <span class="icon" :class="isPlaying ? 'icon-pause' : 'icon-play'"></span>
        </button>
        <button @click="nextSong" title="下一首">
          <span class="icon icon-next"></span>
        </button>
        <button @click="toggleMute" :title="isMuted ? '取消静音' : '静音'">
          <span class="icon" :class="isMuted ? 'icon-mute' : 'icon-volume'"></span>
        </button>
      </div>
    </div>

    <!-- 收起/展开按钮 -->
    <button 
      class="toggle-button" 
      @click="toggleCollapse" 
      :title="isCollapsed ? '展开播放器' : '收起播放器'"
    >
      <span class="icon" :class="isCollapsed ? 'icon-expand' : 'icon-collapse'"></span>
    </button>

    <!-- 迷你播放器 -->
    <div class="mini-player" @click="toggleCollapse" v-if="isCollapsed">
      <div class="mini-cover">
        <img :src="currentSong.cover" :alt="currentSong.title" />
        <div class="mini-play-icon" :class="{ playing: isPlaying }">
          <span class="icon" :class="isPlaying ? 'icon-pause' : 'icon-play'"></span>
        </div>
      </div>
    </div>

    <!-- 隐藏的音频元素 -->
    <audio 
      ref="audioElement" 
      @timeupdate="handleTimeUpdate" 
      @loadedmetadata="handleLoadedMetadata" 
      @ended="handleSongEnded"
      :src="currentSong.src"
      preload="auto"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, } from 'vue';
import { Song, LyricsMap } from './types';

import { usePlayerControl } from './usePlayerControl';
import { setupDragHandlers } from './usePlayerControl';
import './styles.scss';

// 组件属性
const props = defineProps<{
  songs: Song[];
  initialSongIndex?: number;
  autoplay?: boolean;
  showLyrics?: boolean;
  lyrics?: LyricsMap;
}>();

// 组件引用
const playerElement = ref<HTMLElement | null>(null);
const progressBarRef = ref<HTMLElement | null>(null);
const audioElement = ref<HTMLAudioElement | null>(null);

// 使用播放器控制逻辑
const {
  currentSong,
  currentIndex,
  isPlaying,
  currentTime,
  duration,
  progress,
  isMuted,
  volume,
  autoplay,
  showLyrics,
  isCollapsed,
  isDragging,
  isDraggingPlayer,
  togglePlay,
  prevSong,
  nextSong,
  toggleMute,
  toggleAutoplay,
  toggleLyrics,
  toggleCollapse,
  seekToPosition,
  handleTimeUpdate,
  handleLoadedMetadata,
  handleSongEnded,
  formatTime,
  cleanupDragHandlers: cleanupPlayerDragHandlers,
  updateAudioVolume,
  startPlayerDrag,
  initAudio,
  setupAudioEvents,
  setupUnlockAudio,
  changeSong,
  setPlaylist,
  // 歌词相关
  isLoading,
  loadStatus,
  currentLyrics,
  lyricsContainer,
  currentLyricText,
  displayedLyricText,
  lyricProgress
} = usePlayerControl();

// 监听当前歌曲变化，加载歌词
watch(currentSong, (newSong) => {
  if (newSong) {
    changeSong();
  }
}, { immediate: true });

// 监听音量变化，更新音频元素
watch(volume, (newVolume) => {
  if (audioElement.value) {
    updateAudioVolume(newVolume);
  }
});

// 监听静音状态变化，更新音频元素
watch(isMuted, (newMuted) => {
  if (audioElement.value) {
    audioElement.value.muted = newMuted;
  }
});

// 监听自动播放状态变化
watch(autoplay, (newAutoplay) => {
  if (audioElement.value) {
    audioElement.value.loop = !newAutoplay;
  }
});

// 组件挂载后设置事件监听
onMounted(() => {
  // 设置播放列表
  setPlaylist(props.songs);
  
  // 设置初始歌曲索引
  if (props.initialSongIndex !== undefined) {
    currentIndex.value = props.initialSongIndex;
  }
  
  if (playerElement.value) {
    setupDragHandlers(playerElement.value, progressBarRef.value, audioElement.value);
  }
  
  // 初始化音频元素
  if (audioElement.value) {
    audioElement.value.volume = volume.value;
    audioElement.value.muted = isMuted.value;
    audioElement.value.loop = !autoplay.value;
    // 使用现有的audio元素初始化播放器
    initAudio(audioElement.value);
    setupAudioEvents();
    setupUnlockAudio();
    
    // 如果设置了初始歌曲索引，加载对应的歌曲
    if (props.initialSongIndex !== undefined) {
      changeSong();
    }
  }
});

// 组件卸载时清理事件监听
onUnmounted(() => {
  // 清理播放器拖拽处理器
  if (playerElement.value) {
    cleanupPlayerDragHandlers(playerElement.value);
  }
});
</script>