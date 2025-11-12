<template>
  <div
      class="sci-fi-bg"
      @mouseenter="showMenu = true"
      @mouseleave="showMenu = false"
  >
    <!-- 菱形主体 -->
    <div class="diamond"></div>

    <!-- 菱形环绕菜单 -->
    <transition name="fade">
      <div v-if="showMenu" class="menu-container">
        <button
            v-for="(item, index) in menuItems"
            :key="item.type"
            :style="getMenuStyle(index)"
            @click="handleClick(item.type)"
        >
          {{ item.label }}
        </button>
      </div>
    </transition>

    <!-- 上下左右光束 -->
    <div
        v-for="i in beamCount"
        :key="'top-'+i"
        class="beam beam-top"
        :style="getFixedStyle('top', i)"
        :data-index="i"
    ></div>
    <div
        v-for="i in beamCount"
        :key="'bottom-'+i"
        class="beam beam-bottom"
        :style="getFixedStyle('bottom', i)"
        :data-index="i"
    ></div>
    <div
        v-for="i in beamCount"
        :key="'left-'+i"
        class="beam beam-left"
        :style="getFixedStyle('left', i)"
        :data-index="i"
    ></div>
    <div
        v-for="i in beamCount"
        :key="'right-'+i"
        class="beam beam-right"
        :style="getFixedStyle('right', i)"
        :data-index="i"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const beamCount = 8
const showMenu = ref(false)
const rotation = ref(0) // 菱形菜单旋转角度

const menuItems = [
  { type: 'profile', label: '资料' },
  { type: 'settings', label: '设置' },
  { type: 'logout', label: '退出' }
]

const menuRadius = 120 // 菱形中心到按钮半径

const handleClick = (type: string) => {

  console.log('点击菜单项:', type)
}

/**
 * 获取环绕按钮的样式
 */
const getMenuStyle = (index: number) => {
  const angle = (360 / menuItems.length) * index + rotation.value - 90
  return {
    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${menuRadius}px) rotate(${-angle}deg)`
  }
}

/**
 * 获取每条光束的位置和闪烁延迟
 */
const getFixedStyle = (dir: string, i: number): Record<string, string> => {
  const random = Math.random()
  const delay = (random * 2).toFixed(2)
  const spacing = 25
  const offset = (i - (beamCount + 1) / 2) * spacing

  switch (dir) {
    case 'top':
    case 'bottom':
      return {
        animationDelay: `${delay}s`,
        left: `calc(50% + ${offset}px)`,
        animationDuration: `${3 + random * 2}s`
      }
    case 'left':
    case 'right':
      return {
        animationDelay: `${delay}s`,
        top: `calc(50% + ${offset}px)`,
        animationDuration: `${3 + random * 2}s`
      }
    default:
      return {
        animationDelay: `${delay}s`,
        animationDuration: `${3 + random * 2}s`
      }
  }
}

// 菱形菜单自动旋转动画
onMounted(() => {
  const animate = () => {
    rotation.value += 0.2
    requestAnimationFrame(animate)
  }
  animate()
})
</script>

<style scoped>
.sci-fi-bg {
  position: fixed;
  left: 8%;
  top: 50%;
  transform: translateY(-50%);
  width: 200px;
  height: 200px;
  z-index: 0;
  will-change: transform;
}

/* === 菱形主体 === */
.diamond {
  position: absolute;
  inset: 0;
  transform: rotate(45deg);
  border: none;
  background:
      linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(0, 100, 200, 0.2)),
      repeating-linear-gradient(
          45deg,
          rgba(0, 200, 255, 0.05),
          rgba(0, 200, 255, 0.05) 2px,
          transparent 2px,
          transparent 4px
      );
  box-shadow:
      0 0 10px rgba(0, 200, 255, 0.5),
      0 0 20px rgba(0, 150, 255, 0.3),
      0 0 40px rgba(0, 100, 255, 0.2),
      inset 0 0 15px rgba(0, 200, 255, 0.3),
      inset 0 0 30px rgba(0, 150, 255, 0.2);
  animation:
      diamondGlow 4s ease-in-out infinite,
      diamondRotate 20s linear infinite,
      diamondPulse 3s ease-in-out infinite,
      diamondScan 5s linear infinite,
      diamondFloat 6s ease-in-out infinite;
  backface-visibility: hidden;
  perspective: 1000px;
  transform-style: preserve-3d;
  pointer-events: auto;
  cursor: pointer;
}

.diamond::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  border-radius: 8px;
  background: linear-gradient(
      45deg,
      rgba(0, 200, 255, 0),
      rgba(0, 200, 255, 0.3),
      rgba(0, 200, 255, 0.6),
      rgba(0, 200, 255, 0.3),
      rgba(0, 200, 255, 0)
  );
  z-index: -1;
  animation: borderGlow 3s linear infinite;
  transform: rotate(45deg);
}

/* === 菱形环绕菜单容器 === */
.menu-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.menu-container button {
  position: absolute;
  background: rgba(0,30,50,0.85);
  border: 1px solid rgba(0,200,255,0.3);
  border-radius: 12px;
  color: #00eaff;
  padding: 6px 10px;
  cursor: pointer;
  transition: all 0.2s ease;
  pointer-events: auto;
  backdrop-filter: blur(6px);
}

.menu-container button:hover {
  color: white;
  text-shadow: 0 0 8px #00eaff;
}

/* 菜单渐入动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

/* === 光束基础 === */
.beam {
  position: absolute;
  filter: blur(0.8px);
  animation: beamFlow 3s linear infinite;
  opacity: 0.6;
  transform-origin: center center;
  will-change: opacity, transform;
  box-shadow: 0 0 10px rgba(0, 200, 255, 0.5);
}

.beam-top, .beam-bottom { width: 2px; height: 100vh; transform: translateX(-50%); }
.beam-left, .beam-right { height: 2px; width: 100vw; transform: translateY(-50%); }

.beam-top { top: -100vh; background: linear-gradient(to bottom, rgba(0,200,255,0), rgba(0,200,255,1), rgba(0,200,255,0)); }
.beam-bottom { bottom: -100vh; background: linear-gradient(to top, rgba(0,200,255,0), rgba(0,200,255,1), rgba(0,200,255,0)); }
.beam-left { left: -100vw; background: linear-gradient(to right, rgba(0,200,255,0), rgba(0,200,255,1), rgba(0,200,255,0)); }
.beam-right { right: -100vw; background: linear-gradient(to left, rgba(0,200,255,0), rgba(0,200,255,1), rgba(0,200,255,0)); }

/* === 动画关键帧 === */
@keyframes diamondGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(0,200,255,0.3), inset 0 0 20px rgba(0,200,255,0.2); }
  50% { box-shadow: 0 0 45px rgba(0,200,255,0.8), inset 0 0 30px rgba(0,200,255,0.4); }
}

@keyframes diamondRotate { 0% { transform: rotate(45deg); } 100% { transform: rotate(405deg); } }
@keyframes diamondPulse {
  0%,100% { background: linear-gradient(135deg, rgba(0,150,255,0.1), rgba(0,100,200,0.2)); }
  50% { background: linear-gradient(135deg, rgba(0,180,255,0.15), rgba(0,120,220,0.25)); }
}
@keyframes diamondScan {
  0%,100% { box-shadow:0 0 10px rgba(0,200,255,0.5), inset 0 0 15px rgba(0,200,255,0.3); }
  50% { box-shadow:0 0 40px rgba(0,240,255,0.9), inset 0 0 25px rgba(0,240,255,0.7); }
}
@keyframes diamondFloat {
  0%,100% { transform: rotate(45deg) translate(0,0); }
  50% { transform: rotate(45deg) translate(0,-10px); }
}
@keyframes borderGlow { 0%,100% { opacity:0.3; transform:rotate(45deg) scale(1); } 50% { opacity:0.8; transform:rotate(45deg) scale(1.05); } }
@keyframes beamFlow { 0%,100% { opacity:0.2; filter:blur(0.5px); transform:scale(1); } 50% { opacity:1; filter:blur(1.5px); transform:scale(1.05); } }
</style>
