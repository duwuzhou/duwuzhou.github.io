<template>
  <div class="snowfall-container">
    <div 
      v-for="flake in flakes" 
      :key="flake.id"
      class="snowflake"
      :style="getFlakeStyle(flake)"
    >
      {{ flake.symbol }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  swing: number;
  swingSpeed: number;
  color: string;
  symbol: string;
}

const flakes = ref<Snowflake[]>([]);
const containerWidth = ref(window.innerWidth);
const containerHeight = ref(window.innerHeight);
let animationFrameId: number;

// 初始化雪花
const initFlakes = () => {
  const snowflakes = ['❄', '✲', '❅', '❆', '❈', '✻', '❊', '✼', '❉', '✺'];
  const flakeCount = Math.floor(containerWidth.value / 10); // 根据屏幕宽度调整雪花数量
  flakes.value = Array.from({ length: flakeCount }, (_, i) => ({
    id: i,
    x: Math.random() * containerWidth.value,
    y: Math.random() * -containerHeight.value,
    size: Math.random() * 30 + 5, // 5-15px
    speed: Math.random() * 0.3 + 0.2, // 0.2-0.5px per frame (降低速度)
    opacity: Math.random() * 0.5 + 0.5, // 0.5-1
    swing: Math.random() * 100,
    swingSpeed: Math.random() * 0.02 + 0.01, // 0.01-0.03
    color: Math.random() > 0.5 ? '#87CEEB' : '#fff', // 随机蓝色或白色
    symbol: snowflakes[Math.floor(Math.random() * snowflakes.length)] // 固定的雪花符号
  }));
};

// 获取雪花样式
const getFlakeStyle = (flake: Snowflake) => {
  return {
    left: `${flake.x}px`,
    top: `${flake.y}px`,
    fontSize: `${flake.size}px`,
    opacity: flake.opacity,
    color: flake.color,
    transform: `translateX(${Math.sin(flake.swing) * 20}px)`
  };
};

// 动画循环
const animate = () => {
  flakes.value = flakes.value.map(flake => {
    // 更新位置
    let newY = flake.y + flake.speed;
    let newX = flake.x + Math.sin(flake.swing) * 0.5;
    
    // 更新摆动
    const newSwing = flake.swing + flake.swingSpeed;
    
    // 重置超出屏幕的雪花
    if (newY > containerHeight.value) {
      newY = -20;
      newX = Math.random() * containerWidth.value;
    }
    
    return {
      ...flake,
      x: newX,
      y: newY,
      swing: newSwing
    };
  });
  
  animationFrameId = requestAnimationFrame(animate);
};

// 窗口大小调整处理
const handleResize = () => {
  containerWidth.value = window.innerWidth;
  containerHeight.value = window.innerHeight;
  initFlakes();
};

// 生命周期钩子
onMounted(() => {
  initFlakes();
  animate();
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.snowfall-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  user-select: none;
  will-change: transform;
}
</style>