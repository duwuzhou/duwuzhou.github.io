import { ref, nextTick, computed } from 'vue';
import { LyricsMap, LyricsState } from './types';

// 歌词相关状态
export const useLyrics = () => {
  const currentLyrics = ref<string[]>([]);
  const lyricsMap = ref<LyricsMap>(new Map());
  const lyricsContainer = ref<HTMLElement | null>(null);
  const currentLyricIndex = ref(-1);
  const currentLyricText = ref('');
  const displayedLyricText = ref('');
  const characterIndex = ref(0);
  const lyricStartTime = ref(0);
  const lyricEndTime = ref(0);
  const isLoading = ref(false);
  const loadStatus = ref('');
  const currentTime = ref(0); // 添加本地时间ref

  // 缓存排序后的歌词，避免每次都重新排序
  let sortedLyricsCache: [number, string][] = [];

  // 加载歌词
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

  // 解析LRC歌词
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

  // 更新歌词显示
  const updateLyrics = (newCurrentTime: number, duration: number, showLyrics: boolean) => {
    // 更新本地时间ref
    currentTime.value = newCurrentTime;
    
    if (lyricsMap.value.size === 0) {
      currentLyrics.value = [];
      return;
    }

    const currentSeconds = newCurrentTime;
    
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
      lyricEndTime.value = idx < sortedLyricsCache.length - 1 ? sortedLyricsCache[idx + 1][0] : duration;

      // 更新显示的歌词行
      currentLyrics.value = sortedLyricsCache.slice(Math.max(0, idx - 1), idx + 3).map(item => item[1]);
      
      updateCharacterDisplay();

      const now = Date.now();
      if (showLyrics && lyricsContainer.value && now - lastScrollTime > SCROLL_THROTTLE_MS) {
        lastScrollTime = now;
        nextTick(scrollToCurrentLyric);
      }
    } else {
      updateCharacterDisplay();
    }
  };

  // 计算歌词进度
  const lyricProgress = computed(() => {
    if (lyricStartTime.value === lyricEndTime.value) return 0;
    const lyricDuration = lyricEndTime.value - lyricStartTime.value;
    const elapsed = currentTime.value - lyricStartTime.value;
    return Math.max(0, Math.min(1, elapsed / lyricDuration));
  });

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

  // 滚动到当前歌词
  const scrollToCurrentLyric = () => {
    if (lyricsContainer.value) {
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

  // 重置歌词状态
  const resetLyricsState = () => {
    currentLyrics.value = [];
    currentLyricIndex.value = -1;
    currentLyricText.value = '';
    displayedLyricText.value = '';
    characterIndex.value = 0;
    lyricStartTime.value = 0;
    lyricEndTime.value = 0;
    sortedLyricsCache = [];
  };

  return {
    // 状态
    currentLyrics,
    lyricsMap,
    lyricsContainer,
    currentLyricIndex,
    currentLyricText,
    displayedLyricText,
    characterIndex,
    lyricStartTime,
    lyricEndTime,
    currentTime,
    isLoading,
    loadStatus,
    
    // 计算属性
    lyricsState: {
      isLoading,
      loadStatus,
      hasLyrics: () => lyricsMap.value.size > 0,
      lyrics: currentLyrics,
      currentLyricIndex
    },
    currentLyric: {
      text: currentLyricText,
      index: currentLyricIndex,
      progress: lyricProgress,
      highlightedText: computed(() => {
        return displayedLyricText.value;
      }),
      remainingText: computed(() => {
        return currentLyricText.value.substring(displayedLyricText.value.length);
      })
    },
    
    // 方法
    loadLyrics,
    updateLyrics,
    updateLyricsDisplay: updateLyrics,
    lyricProgress,
    seekToLyric: (index: number) => {
      if (index >= 0 && index < sortedLyricsCache.length) {
        const [time] = sortedLyricsCache[index];
        return time;
      }
      return 0;
    },
    scrollToCurrentLyric,
    resetLyricsState
  };
};