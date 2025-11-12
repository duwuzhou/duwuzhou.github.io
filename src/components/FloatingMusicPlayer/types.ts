// 歌曲类型接口
export interface Song {
  id: number;
  title: string;
  artist: string;
  src: string;
  cover?: string;
  lrcFile?: string;
  lyrics?: [number, string][];
}

// 歌词类型
export type LyricsMap = Map<number, string>;

// 播放器状态接口
export interface PlayerState {
  isPlaying: boolean;
  isCollapsed: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  autoplay: boolean;
  showLyrics: boolean;
  isLoading: boolean;
  loadStatus: string;
}

// 进度条拖拽状态
export interface DragState {
  isDragging: boolean;
  progressBarRef: HTMLElement | null;
}

// 歌词显示状态
export interface LyricsState {
  currentLyrics: string[];
  lyricsMap: LyricsMap;
  lyricsContainer: HTMLElement | null;
  currentLyricIndex: number;
  currentLyricText: string;
  displayedLyricText: string;
  characterIndex: number;
  lyricStartTime: number;
  lyricEndTime: number;
}