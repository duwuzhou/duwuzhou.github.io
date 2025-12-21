<script setup lang="ts">
import Snowfall from './components/Snowfall.vue'
import FloatingMusicPlayer from './components/FloatingMusicPlayer/FloatingMusicPlayer.vue'
import NavigationBar from './components/NavigationBar.vue'
import ParticleRising from './components/ParticleRising.vue'
import { Song } from '@/components/FloatingMusicPlayer'

// 定义歌曲列表
const songs: Song[] = [
  {
    id: 2,
    title: '记得吗 忘了吧',
    artist: '安杨',
    src: '/music/安扬 - 记得吗 忘了吧.flac',
    cover: '/images/wlm.png',
    lrcFile: '/music/记得吗 忘了吧-安扬.lrc'
  },
  {
    id: 3,
    title: 'Time is broken',
    artist: 'Eddie Chen',
    src: '/music/Eddie Chen - Time is broken.flac',
    cover: '/images/Eddie Chen - Time is broken.jpg',
    lrcFile: '/music/Eddie Chen - Time is broken.lrc'
  }
]
</script>

<template>
  <Snowfall />
  <NavigationBar />
  <RouterView class="router-view" />
  <FloatingMusicPlayer :songs="songs" />
  <ParticleRising />
</template>
