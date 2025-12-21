import { ref, reactive, computed } from 'vue';
import { Song } from './types';
import { useLyrics } from './useLyrics';

// 播放器控制逻辑
export const usePlayerControl = () => {
  // 播放器状态
  const isPlaying = ref(false);
  const isCollapsed = ref(false);
  const isMuted = ref(false);
  const currentTime = ref(0);
  const duration = ref(0);
  const autoplay = ref(true);
  const showLyrics = ref(false);
  const volume = ref(1); // 音量，范围0-1
  
  // 进度条拖拽相关
  const isDragging = ref(false);
  const progressBarRef = ref<HTMLElement | null>(null);
  
  // 播放进度缓存 key
  const STORAGE_KEY = 'floating-music-player-progress';
  
  // 使用歌词功能
  const {
    loadLyrics,
    updateLyrics,
    resetLyricsState,
    lyricProgress,
    isLoading,
    loadStatus,
    currentLyrics,
    lyricsContainer,
    currentLyricText,
    displayedLyricText
  } = useLyrics();
  
  // 播放列表
  const playlist = reactive<Song[]>([]);
  
  const currentIndex = ref(0);
  const currentSong = computed(() => playlist[currentIndex.value] || {});
  
  // 设置播放列表
  const setPlaylist = (songs: Song[]) => {
    playlist.splice(0, playlist.length, ...songs);
    if (currentIndex.value >= playlist.length) {
      currentIndex.value = 0;
    }
  };
  
  // 默认封面图片
  const defaultCover = '/images/default-cover.jpg';
  
  // 计算属性
  const progress = computed(() => {
    return duration.value ? (currentTime.value / duration.value) * 100 : 0;
  });
  
  let audio: HTMLAudioElement;
  
  // 音频初始化
  const initAudio = (audioElement?: HTMLAudioElement) => {
    if (audioElement) {
      audio = audioElement;
    } else {
      audio = new Audio();
    }
    audio.src = currentSong.value.src;
    // 只有在音频元素没有设置muted属性时才设置为true
    if (audio.muted === undefined) {
      audio.muted = true; // 初始静音绕过浏览器限制
    }
    loadLyrics(currentSong.value);
  };
  
  // 音频事件处理函数
  const handleTimeUpdate = () => {
    updateProgress();
    updateLyrics(currentTime.value, duration.value, showLyrics.value);
  };

  const handleLoadedMetadata = () => {
    duration.value = audio.duration;
  };

  const handleSongEnded = () => {
    if (autoplay.value) {
      nextSong();
    }
  };

  // 音频事件设置
  const setupAudioEvents = () => {
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleSongEnded);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('canplay', handleCanPlay);
    
    // 保存引用以便清理
    (audio as any)._handleTimeUpdate = handleTimeUpdate;
    (audio as any)._handleLoadedMetadata = handleLoadedMetadata;
    (audio as any)._handleSongEnded = handleSongEnded;
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
      if ((audio as any)._handleSongEnded) {
        audio.removeEventListener('ended', (audio as any)._handleSongEnded);
      }
      if ((audio as any)._handleLoadedMetadata) {
        audio.removeEventListener('loadedmetadata', (audio as any)._handleLoadedMetadata);
      }
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
  
  const seekToPosition = (event: MouseEvent) => {
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
  
  // 播放器位置拖拽相关
  const isDraggingPlayer = ref(false);
  const dragOffset = reactive({ x: 0, y: 0 });
  
  // 开始拖拽播放器位置
  const startPlayerDrag = (event: MouseEvent | TouchEvent, playerElement?: HTMLElement) => {
    // 只在非收起状态下允许拖拽
    if (isCollapsed.value) return;
    
    isDraggingPlayer.value = true;
    
    // 如果没有传入playerElement，尝试从事件目标获取
    const element = playerElement || (event.target as HTMLElement).closest('.floating-music-player') as HTMLElement;
    if (!element) return;
    
    if ('touches' in event) {
      dragOffset.x = event.touches[0].clientX - element.offsetLeft;
      dragOffset.y = event.touches[0].clientY - element.offsetTop;
    } else {
      dragOffset.x = event.clientX - element.offsetLeft;
      dragOffset.y = event.clientY - element.offsetTop;
    }
    
    element.style.cursor = 'grabbing';
    element.style.transition = 'none';
  };
  
  // 拖拽播放器位置过程
  const dragPlayer = (event: MouseEvent | TouchEvent, playerElement?: HTMLElement) => {
    if (!isDraggingPlayer.value) return;
    
    // 如果没有传入playerElement，尝试从事件目标获取
    const element = playerElement || document.querySelector('.floating-music-player') as HTMLElement;
    if (!element) return;
    
    event.preventDefault();
    
    let clientX = 0;
    let clientY = 0;
    
    if ('touches' in event) {
      clientX = event.touches[0].clientX;
      clientY = event.touches[0].clientY;
    } else {
      clientX = event.clientX;
      clientY = event.clientY;
    }
    
    const newX = clientX - dragOffset.x;
    const newY = clientY - dragOffset.y;
    
    // 限制在视窗内
    const maxX = window.innerWidth - element.offsetWidth;
    const maxY = window.innerHeight - element.offsetHeight;
    
    element.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
    element.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;
    element.style.right = 'auto';
    element.style.bottom = 'auto';
  };
  
  // 停止拖拽播放器位置
  const stopPlayerDrag = (playerElement?: HTMLElement) => {
    if (isDraggingPlayer.value) {
      isDraggingPlayer.value = false;
      
      // 如果没有传入playerElement，尝试从选择器获取
      const element = playerElement || document.querySelector('.floating-music-player') as HTMLElement;
      if (element) {
        element.style.cursor = '';
        element.style.transition = '';
      }
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
    if (!audio) {
      console.warn('音频元素未初始化');
      return;
    }
    
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
  
  // 定义可重复使用的事件处理函数
  const onCanPlay = () => {
    if (!audio) return;
    
    audio.play().then(() => {
      isPlaying.value = true;
    }).catch(err => {
      console.warn('切歌自动播放被拦截:', err);
    });
    
    // 移除事件监听器
    audio.removeEventListener('canplay', onCanPlay);
  };
  
  const changeSong = () => {
    // 重置所有状态
    if (!audio) {
      console.warn('音频元素未初始化');
      return;
    }
    
    // 先暂停当前播放
    audio.pause();
    
    // 移除之前的事件监听器，避免重复调用
    audio.removeEventListener('canplay', onCanPlay);
    
    audio.src = currentSong.value.src;
    resetLyricsState();
    loadLyrics(currentSong.value);
  
    if (autoplay.value) {
      // 添加事件监听器
      audio.addEventListener('canplay', onCanPlay);
    } else {
      isPlaying.value = false;
    }
  };
  
  // 更新音量
  const updateAudioVolume = (newVolume: number) => {
    volume.value = Math.max(0, Math.min(1, newVolume)); // 确保音量在0-1范围内
    if (audio) {
      audio.volume = volume.value;
    }
  };
  
  // UI交互
  const toggleLyrics = () => {
    showLyrics.value = !showLyrics.value;
  };
  
  const toggleMute = () => {
    audio.muted = !audio.muted;
    isMuted.value = audio.muted;
  };
  
  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value;
    
    // 强制设置变换原点为右下角
    const playerElement = document.querySelector('.floating-music-player') as HTMLElement;
    if (playerElement) {
      playerElement.style.transformOrigin = 'bottom right';
    }
  };
  
  const toggleAutoplay = () => {
    autoplay.value = !autoplay.value;
    if (audio) {
      audio.loop = !autoplay.value;
    }
  };
  
  // 恢复播放进度
  const restoreProgress = () => {
    const savedProgress = localStorage.getItem(STORAGE_KEY);
    if (savedProgress) {
      const time = parseFloat(savedProgress);
      if (!isNaN(time) && time < duration.value) {
        currentTime.value = time;
        if (audio) audio.currentTime = time;
      }
    }
  };
  
  // 缓存播放进度
  const saveProgress = () => {
    localStorage.setItem(STORAGE_KEY, currentTime.value.toString());
  };
  
  /**
   * 清理拖拽事件处理器
   * @param playerElement 播放器元素
   */
  const cleanupDragHandlers = (playerElement: HTMLElement) => {
    if (!playerElement || !(playerElement as any)._dragHandlers) return;
    
    const handlers = (playerElement as any)._dragHandlers;
    
    // 移除播放器拖拽事件监听
    playerElement.removeEventListener('mousedown', handlers.startPlayerDrag);
    window.removeEventListener('mousemove', handlers.dragPlayer);
    window.removeEventListener('mouseup', handlers.stopPlayerDrag);
    
    playerElement.removeEventListener('touchstart', handlers.startPlayerDrag);
    window.removeEventListener('touchmove', handlers.dragPlayer);
    window.removeEventListener('touchend', handlers.stopPlayerDrag);
    
    // 移除进度条拖拽事件监听
    if (handlers.progressBarRef) {
      handlers.progressBarRef.removeEventListener('mousedown', handlers.startDragging);
      handlers.progressBarRef.removeEventListener('touchstart', handlers.startDragging);
    }
    
    window.removeEventListener('mousemove', handlers.handleDrag);
    window.removeEventListener('mouseup', handlers.stopDragging);
    window.removeEventListener('touchmove', handlers.handleDrag);
    window.removeEventListener('touchend', handlers.stopDragging);
    
    // 清理引用
    delete (playerElement as any)._dragHandlers;
  };
  
  return {
    // 状态
    isPlaying,
    isCollapsed,
    isMuted,
    currentTime,
    duration,
    autoplay,
    showLyrics,
    isDragging,
    isDraggingPlayer,
    progressBarRef,
    currentSong,
    defaultCover,
    progress,
    playlist,
    currentIndex,
    volume,
    
    // 歌词相关
    isLoading,
    loadStatus,
    currentLyrics,
    lyricsContainer,
    currentLyricText,
    displayedLyricText,
    lyricProgress,
    
    // 方法
    initAudio,
    setupAudioEvents,
    setupUnlockAudio,
    cleanupAudio,
    handleCanPlay,
    updateProgress,
    handleProgressClick,
    seekToPosition,
    startDragging,
    handleDrag,
    stopDragging,
    startPlayerDrag,
    dragPlayer,
    stopPlayerDrag,
    handleSongEnd,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleSongEnded,
    formatTime,
    togglePlay,
    nextSong,
    prevSong,
    changeSong,
    toggleLyrics,
    toggleMute,
    toggleCollapse,
    toggleAutoplay,
    restoreProgress,
    saveProgress,
    updateAudioVolume,
    setPlaylist,
    
    // 获取audio实例
    getAudio: () => audio,
    
    // 清理函数
    cleanupDragHandlers
  };
};

// 导出清理拖拽事件处理器的函数
export const cleanupDragHandlers = (playerElement: HTMLElement) => {
  if (!playerElement || !(playerElement as any)._dragHandlers) return;
  
  const handlers = (playerElement as any)._dragHandlers;
  
  // 移除播放器拖拽事件监听
  playerElement.removeEventListener('mousedown', handlers.startPlayerDrag);
  window.removeEventListener('mousemove', handlers.dragPlayer);
  window.removeEventListener('mouseup', handlers.stopPlayerDrag);
  
  playerElement.removeEventListener('touchstart', handlers.startPlayerDrag);
  window.removeEventListener('touchmove', handlers.dragPlayer);
  window.removeEventListener('touchend', handlers.stopPlayerDrag);
  
  // 移除进度条拖拽事件监听
  if (handlers.progressBarRef) {
    handlers.progressBarRef.removeEventListener('mousedown', handlers.startDragging);
    handlers.progressBarRef.removeEventListener('touchstart', handlers.startDragging);
  }
  
  window.removeEventListener('mousemove', handlers.handleDrag);
  window.removeEventListener('mouseup', handlers.stopDragging);
  window.removeEventListener('touchmove', handlers.handleDrag);
  window.removeEventListener('touchend', handlers.stopDragging);
  
  // 清理引用
  delete (playerElement as any)._dragHandlers;
};

// 拖拽相关函数需要在usePlayerControl外部定义，以便导出
// 进度条拖拽相关
const isDraggingGlobal = ref(false);
const progressBarRefGlobal = ref<HTMLElement | null>(null);
const audioElementGlobal = ref<HTMLAudioElement | null>(null);

// 支持鼠标和触摸拖拽开始
const startDraggingGlobal = (event: MouseEvent | TouchEvent) => {
  isDraggingGlobal.value = true;
  handleDragGlobal(event);
};

// 支持鼠标和触摸拖拽过程
const handleDragGlobal = (event: MouseEvent | TouchEvent) => {
  if (!isDraggingGlobal.value || !progressBarRefGlobal.value) return;

  let clientX = 0;
  if ('touches' in event && event.touches.length) {
    clientX = event.touches[0].clientX;
  } else if ('clientX' in event) {
    clientX = event.clientX;
  } else {
    return;
  }

  const rect = progressBarRefGlobal.value.getBoundingClientRect();
  const offsetX = Math.max(0, Math.min(clientX - rect.left, rect.width));
  const percentage = offsetX / rect.width;
  
  // 使用全局audio元素引用
  if (audioElementGlobal.value && audioElementGlobal.value.duration) {
    audioElementGlobal.value.currentTime = percentage * audioElementGlobal.value.duration;
  }
};

// 停止拖拽
const stopDraggingGlobal = () => {
  isDraggingGlobal.value = false;
};

// 播放器位置拖拽相关
const isDraggingPlayerGlobal = ref(false);
const dragOffsetGlobal = reactive({ x: 0, y: 0 });

// 开始拖拽播放器位置
const startPlayerDragGlobal = (event: MouseEvent | TouchEvent, playerElement?: HTMLElement) => {
  // 只在非收起状态下允许拖拽
  if (playerElement && playerElement.classList.contains('collapsed')) return;
  
  isDraggingPlayerGlobal.value = true;
  
  // 如果没有传入playerElement，尝试从事件目标获取
  const element = playerElement || (event.target as HTMLElement);
  if (!element) return;
  
  // 计算鼠标/触摸点与播放器右下角的偏移
  const rect = element.getBoundingClientRect();
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
  
  dragOffsetGlobal.x = clientX - rect.right; // 使用右边界而不是左边界
  dragOffsetGlobal.y = clientY - rect.bottom; // 使用底部边界而不是顶部边界
};

// 拖拽播放器位置
const dragPlayerGlobal = (event: MouseEvent | TouchEvent, playerElement?: HTMLElement) => {
  if (!isDraggingPlayerGlobal.value) return;
  
  const element = playerElement || document.querySelector('.floating-music-player') as HTMLElement;
  if (!element) return;
  
  // 计算新位置
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  const clientY = 'touches' in event ? event.touches[0].clientY : event.clientY;
  
  // 使用右下角作为参考点计算新位置
  const newRight = window.innerWidth - (clientX - dragOffsetGlobal.x);
  const newBottom = window.innerHeight - (clientY - dragOffsetGlobal.y);
  
  // 使用right和bottom而不是left和top，这样可以保持transform-origin: bottom right有效
  element.style.position = 'fixed';
  element.style.right = `${newRight}px`;
  element.style.bottom = `${newBottom}px`;
  element.style.left = 'auto';
  element.style.top = 'auto';
  element.style.zIndex = '1000';
};

// 停止拖拽播放器位置
const stopPlayerDragGlobal = (playerElement?: HTMLElement) => {
  isDraggingPlayerGlobal.value = false;
  
  // 确保拖拽结束后transform-origin仍然是bottom right
  const element = playerElement || document.querySelector('.floating-music-player') as HTMLElement;
  if (element) {
    element.style.transformOrigin = 'bottom right';
    // 确保保持使用right和bottom定位
    element.style.left = 'auto';
    element.style.top = 'auto';
  }
};

/**
 * 设置拖拽处理器
 * @param playerElement 播放器元素
 * @param progressBarRef 进度条元素引用
 * @param audioElement 音频元素引用
 */
export function setupDragHandlers(playerElement: HTMLElement, progressBarRef: HTMLElement | null, audioElement: HTMLAudioElement | null) {
  // 保存全局引用
  progressBarRefGlobal.value = progressBarRef;
  audioElementGlobal.value = audioElement;
  
  // 添加进度条拖拽事件监听
  if (progressBarRef) {
    progressBarRef.addEventListener('mousedown', startDraggingGlobal);
    progressBarRef.addEventListener('touchstart', startDraggingGlobal);
  }
  
  // 添加播放器位置拖拽事件监听
  playerElement.addEventListener('mousedown', (e) => {
    // 检查点击的目标是否是控制按钮或进度条
    const target = e.target as HTMLElement;
    if (
      target.closest('.controls') || 
      target.closest('.progress-container') || 
      target.closest('.toggle-button') ||
      target.closest('.lyrics-toggle') ||
      target.closest('.album-cover')
    ) {
      return; // 如果点击这些元素，不启动拖拽
    }
    startPlayerDragGlobal(e, playerElement);
  });
  
  playerElement.addEventListener('touchstart', (e) => {
    // 检查点击的目标是否是控制按钮或进度条
    const target = e.target as HTMLElement;
    if (
      target.closest('.controls') || 
      target.closest('.progress-container') || 
      target.closest('.toggle-button') ||
      target.closest('.lyrics-toggle') ||
      target.closest('.album-cover')
    ) {
      return; // 如果点击这些元素，不启动拖拽
    }
    startPlayerDragGlobal(e, playerElement);
  });
  
  window.addEventListener('mousemove', handleDragGlobal);
  window.addEventListener('mouseup', stopDraggingGlobal);
  window.addEventListener('touchmove', handleDragGlobal);
  window.addEventListener('touchend', stopDraggingGlobal);
  
  window.addEventListener('mousemove', (e) => dragPlayerGlobal(e, playerElement));
  window.addEventListener('mouseup', () => stopPlayerDragGlobal(playerElement));
  window.addEventListener('touchmove', (e) => dragPlayerGlobal(e, playerElement));
  window.addEventListener('touchend', () => stopPlayerDragGlobal(playerElement));

  // 保存事件处理函数引用，以便后续清理
  (playerElement as any)._dragHandlers = {
    startDragging: startDraggingGlobal,
    handleDrag: handleDragGlobal,
    stopDragging: stopDraggingGlobal,
    startPlayerDrag: startPlayerDragGlobal,
    dragPlayer: dragPlayerGlobal,
    stopPlayerDrag: stopPlayerDragGlobal,
    progressBarRef
  };
}