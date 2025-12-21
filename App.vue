<template>
  <div class="app-container">
    <transition name="sci-fi-entrance">
      <SciFiDiamondBackground/>
    </transition>

    
    <Snowfall />
    <FloatingMusicPlayer :songs="songs" />   
     <NavigationBar />
   <RouterView class="router-view" />
    <GifDisplay
        class="gif-display"
        :src="GIf"
        width="260px"
        height="180px"
    />

    <GifDisplay
        class="gif-display1"
        :src="GIf1"
        width="260px"
    />


  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import GifDisplay from './components/GifDisplay.vue'
import SciFiDiamondBackground from './components/SciFiDiamondBackground.vue'
import NavigationBar from './components/NavigationBar.vue'
// import FloatingMusicPlayer from './components/FloatingMusicPlayer.vue'
import FloatingMusicPlayer from './components/FloatingMusicPlayer/FloatingMusicPlayer.vue'
import Snowfall from './components/Snowfall.vue'
import { Song } from './components/FloatingMusicPlayer/types'

import GIf from '/images/1000041266.gif'
import GIf1 from '/images/fd.gif'

// 定义歌曲列表
const songs: Song[] = [
  // {
  //   id: 1,
  //   title: '于是',
  //   artist: '郑润泽',
  //   src: '/music/于是.mp3',
  //   cover: '/images/于是.jpg',
  //   lrcFile: '/music/于是.lrc'
  // },
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

onMounted(() => {
  // 如果需要手动触发动画，可以使用:
  // entranceAnimation.value?.startAnimation()
})
</script>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.router-view {
  flex: 1;
  z-index: 1;
}
.gif-display {
  position: fixed;
  top: 5%;
  right: 6%;
  z-index: 0;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow:
      0 0 10px rgba(0, 255, 255, 0.3),
      0 0 30px rgba(0, 255, 255, 0.2);
  padding: 8px;
  transition: all 0.4s ease;
  animation: float 5s ease-in-out infinite;
}

.gif-display1 {
  position: fixed;
  bottom: 5%;
  right: 6%;
  z-index: 0;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow:
      0 0 10px rgba(0, 255, 255, 0.3),
      0 0 30px rgba(0, 255, 255, 0.2);
  padding: 8px;
  transition: all 0.4s ease;
  animation: float 5s ease-in-out infinite;
  /* 添加轻微的动画延迟，使两个 GIF 的浮动不同步 */
  animation-delay: 1s;
}


@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Sci-Fi 入场动画 */
.sci-fi-entrance-enter-active {
  animation: scifiEntrance 2.5s ease-out forwards;
}

@keyframes scifiEntrance {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-50%);
    filter: blur(15px) brightness(0.3);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05) translateY(-50%);
    filter: blur(3px) brightness(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(-50%);
    filter: blur(0) brightness(1);
  }
}

.gif-display:hover,
.gif-display1:hover {
  transform: scale(1.05);
  box-shadow:
      0 0 20px rgba(0, 255, 255, 0.5),
      0 0 40px rgba(0, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .gif-display,
  .gif-display1 {
    width: 220px;
    height: 150px;
  }
  
  .gif-display {
    top: 3%;
    right: 4%;
  }
  
  .gif-display1 {
    bottom: 3%;
    right: 4%;
  }
}

@media (max-width: 768px) {
  .app-container {
    padding: 0 1rem;
  }
  
  .gif-display,
  .gif-display1 {
    width: 180px;
    height: 120px;
    padding: 6px;
  }
  
  .gif-display {
    top: 2%;
    right: 2%;
  }
  
  .gif-display1 {
    bottom: 2%;
    right: 2%;
  }
  
  .router-view {
    margin: 0.5rem 0;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 0 0.5rem;
  }
  
  .gif-display,
  .gif-display1 {
    width: 140px;
    height: 100px;
    padding: 4px;
    border-radius: 12px;
  }
  
  .gif-display {
    top: 1%;
    right: 1%;
  }
  
  .gif-display1 {
    bottom: 1%;
    right: 1%;
  }
  
  .router-view {
    margin: 0.25rem 0;
  }
  
  /* 移动设备上调整动画效果 */
  .gif-display:hover,
  .gif-display1:hover {
    transform: scale(1.02);
  }
}

@media (max-width: 320px) {
  .gif-display,
  .gif-display1 {
    display: none; /* 在极小屏幕上隐藏GIF显示 */
  }
  
  .app-container {
    padding: 0;
  }
}
</style>


<!-- <template>
  <div class="app-container">
    <transition name="sci-fi-entrance">
      <SciFiDiamondBackground/>
    </transition>

    
    <Snowfall />
    <FloatingMusicPlayer :songs="songs" />   
     <NavigationBar />
   <RouterView class="router-view" />
    <GifDisplay
        class="gif-display"
        :src="GIf"
        width="260px"
        height="180px"
    />

    <GifDisplay
        class="gif-display1"
        :src="GIf1"
        width="260px"
    />


  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import GifDisplay from './components/GifDisplay.vue'
import SciFiDiamondBackground from './components/SciFiDiamondBackground.vue'
import NavigationBar from './components/NavigationBar.vue'
// import FloatingMusicPlayer from './components/FloatingMusicPlayer.vue'
import FloatingMusicPlayer from './components/FloatingMusicPlayer/FloatingMusicPlayer.vue'
import Snowfall from './components/Snowfall.vue'
import { Song } from './components/FloatingMusicPlayer/types'

import GIf from '/images/1000041266.gif'
import GIf1 from '/images/fd.gif'

// 定义歌曲列表
const songs: Song[] = [
  // {
  //   id: 1,
  //   title: '于是',
  //   artist: '郑润泽',
  //   src: '/music/于是.mp3',
  //   cover: '/images/于是.jpg',
  //   lrcFile: '/music/于是.lrc'
  // },
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

onMounted(() => {
  // 如果需要手动触发动画，可以使用:
  // entranceAnimation.value?.startAnimation()
})
</script>

<style scoped>
.app-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.router-view {
  flex: 1;
  z-index: 1;
}
.gif-display {
  position: fixed;
  top: 5%;
  right: 6%;
  z-index: 0;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow:
      0 0 10px rgba(0, 255, 255, 0.3),
      0 0 30px rgba(0, 255, 255, 0.2);
  padding: 8px;
  transition: all 0.4s ease;
  animation: float 5s ease-in-out infinite;
}

.gif-display1 {
  position: fixed;
  bottom: 5%;
  right: 6%;
  z-index: 0;
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow:
      0 0 10px rgba(0, 255, 255, 0.3),
      0 0 30px rgba(0, 255, 255, 0.2);
  padding: 8px;
  transition: all 0.4s ease;
  animation: float 5s ease-in-out infinite;
  /* 添加轻微的动画延迟，使两个 GIF 的浮动不同步 */
  animation-delay: 1s;
}


@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
  100% {
    transform: translateY(0);
  }
}

/* Sci-Fi 入场动画 */
.sci-fi-entrance-enter-active {
  animation: scifiEntrance 2.5s ease-out forwards;
}

@keyframes scifiEntrance {
  0% {
    opacity: 0;
    transform: scale(0) translateY(-50%);
    filter: blur(15px) brightness(0.3);
  }
  50% {
    opacity: 0.7;
    transform: scale(1.05) translateY(-50%);
    filter: blur(3px) brightness(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(-50%);
    filter: blur(0) brightness(1);
  }
}

.gif-display:hover,
.gif-display1:hover {
  transform: scale(1.05);
  box-shadow:
      0 0 20px rgba(0, 255, 255, 0.5),
      0 0 40px rgba(0, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .gif-display,
  .gif-display1 {
    width: 220px;
    height: 150px;
  }
  
  .gif-display {
    top: 3%;
    right: 4%;
  }
  
  .gif-display1 {
    bottom: 3%;
    right: 4%;
  }
}

@media (max-width: 768px) {
  .app-container {
    padding: 0 1rem;
  }
  
  .gif-display,
  .gif-display1 {
    width: 180px;
    height: 120px;
    padding: 6px;
  }
  
  .gif-display {
    top: 2%;
    right: 2%;
  }
  
  .gif-display1 {
    bottom: 2%;
    right: 2%;
  }
  
  .router-view {
    margin: 0.5rem 0;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 0 0.5rem;
  }
  
  .gif-display,
  .gif-display1 {
    width: 140px;
    height: 100px;
    padding: 4px;
    border-radius: 12px;
  }
  
  .gif-display {
    top: 1%;
    right: 1%;
  }
  
  .gif-display1 {
    bottom: 1%;
    right: 1%;
  }
  
  .router-view {
    margin: 0.25rem 0;
  }
  
  /* 移动设备上调整动画效果 */
  .gif-display:hover,
  .gif-display1:hover {
    transform: scale(1.02);
  }
}

@media (max-width: 320px) {
  .gif-display,
  .gif-display1 {
    display: none; /* 在极小屏幕上隐藏GIF显示 */
  }
  
  .app-container {
    padding: 0;
  }
}
</style> -->