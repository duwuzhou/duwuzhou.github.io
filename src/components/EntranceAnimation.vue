<template>
  <div class="entrance-animation" :class="{ 'is-active': isActive }">
    <!-- 粒子效果 -->
    <div class="particles-container">
      <div
        v-for="i in particleCount"
        :key="i"
        class="particle"
        :style="getParticleStyle(i)"
      ></div>
    </div>
    
    <!-- 中心发光元素 -->
    <div class="center-element">
      <div class="inner-core"></div>
      <div class="outer-ring"></div>
      <div class="energy-waves">
        <div
          v-for="i in 3"
          :key="`wave-${i}`"
          class="wave"
          :class="`wave-${i}`"
        ></div>
      </div>
    </div>
    
    <!-- 扫描线效果 -->
    <div class="scan-line"></div>
    
    <!-- 光束效果 -->
    <div class="light-beams">
      <div
        v-for="i in beamCount"
        :key="`beam-${i}`"
        class="beam"
        :style="getBeamStyle(i)"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps({
  duration: {
    type: Number,
    default: 3000
  },
  autoStart: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['animation-start', 'animation-end'])

const isActive = ref(false)
const particleCount = 50
const beamCount = 8

const getParticleStyle = (index: number) => {
  const angle = (360 / particleCount) * index
  const distance = 100 + Math.random() * 150
  const size = 2 + Math.random() * 4
  const delay = Math.random() * 2
  const duration = 2 + Math.random() * 3
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    transform: `rotate(${angle}deg) translateX(${distance}px)`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

const getBeamStyle = (index: number) => {
  const angle = (360 / beamCount) * index
  const delay = Math.random() * 1.5
  const length = 100 + Math.random() * 200
  
  return {
    transform: `rotate(${angle}deg)`,
    height: `${length}px`,
    animationDelay: `${delay}s`
  }
}

const startAnimation = () => {
  isActive.value = true
  emit('animation-start')
  
  setTimeout(() => {
    isActive.value = false
    emit('animation-end')
  }, props.duration)
}

onMounted(() => {
  if (props.autoStart) {
    setTimeout(startAnimation, 100)
  }
})

defineExpose({
  startAnimation
})
</script>

<style scoped>
.entrance-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.entrance-animation.is-active {
  opacity: 1;
}

/* 粒子效果 */
.particles-container {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 4px;
  background: rgba(0, 200, 255, 0.8);
  border-radius: 50%;
  box-shadow: 0 0 6px rgba(0, 200, 255, 0.8);
  opacity: 0;
}

.entrance-animation.is-active .particle {
  animation: particleAnimation 3s ease-out forwards;
}

@keyframes particleAnimation {
  0% {
    opacity: 0;
    transform: rotate(var(--angle)) translateX(0) scale(0);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(var(--angle)) translateX(var(--distance)) scale(1);
  }
}

/* 中心元素 */
.center-element {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inner-core {
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, rgba(0, 200, 255, 0.9) 0%, rgba(0, 100, 255, 0.7) 50%, rgba(0, 50, 200, 0.5) 100%);
  border-radius: 50%;
  box-shadow: 
    0 0 20px rgba(0, 200, 255, 0.8),
    0 0 40px rgba(0, 150, 255, 0.6),
    inset 0 0 20px rgba(255, 255, 255, 0.5);
  transform: scale(0);
}

.entrance-animation.is-active .inner-core {
  animation: coreAnimation 2s ease-out forwards;
}

@keyframes coreAnimation {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.outer-ring {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(0, 200, 255, 0.7);
  border-radius: 50%;
  transform: scale(0);
}

.entrance-animation.is-active .outer-ring {
  animation: ringAnimation 2.5s ease-out forwards;
}

@keyframes ringAnimation {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
}

/* 能量波 */
.energy-waves {
  position: absolute;
  width: 100%;
  height: 100%;
}

.wave {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  border: 1px solid rgba(0, 200, 255, 0.5);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
}

.entrance-animation.is-active .wave-1 {
  animation: waveAnimation 3s ease-out forwards;
}

.entrance-animation.is-active .wave-2 {
  animation: waveAnimation 3s ease-out 0.3s forwards;
}

.entrance-animation.is-active .wave-3 {
  animation: waveAnimation 3s ease-out 0.6s forwards;
}

@keyframes waveAnimation {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(3);
    opacity: 0;
  }
}

/* 扫描线 */
.scan-line {
  position: absolute;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, 
    rgba(0, 200, 255, 0) 0%, 
    rgba(0, 200, 255, 0.8) 50%, 
    rgba(0, 200, 255, 0) 100%);
  top: 50%;
  transform: translateY(-50%) scaleX(0);
}

.entrance-animation.is-active .scan-line {
  animation: scanLineAnimation 2s ease-out forwards;
}

@keyframes scanLineAnimation {
  0% {
    transform: translateY(-50%) scaleX(0);
    opacity: 0;
  }
  50% {
    transform: translateY(-50%) scaleX(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-50%) scaleX(1);
    opacity: 0;
  }
}

/* 光束效果 */
.light-beams {
  position: absolute;
  width: 100%;
  height: 100%;
}

.beam {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  background: linear-gradient(to bottom, 
    rgba(0, 200, 255, 0) 0%, 
    rgba(0, 200, 255, 0.8) 50%, 
    rgba(0, 200, 255, 0) 100%);
  transform-origin: center top;
  opacity: 0;
}

.entrance-animation.is-active .beam {
  animation: beamAnimation 2s ease-out forwards;
}

@keyframes beamAnimation {
  0% {
    opacity: 0;
    transform: rotate(var(--angle)) scaleY(0);
  }
  50% {
    opacity: 1;
    transform: rotate(var(--angle)) scaleY(1);
  }
  100% {
    opacity: 0;
    transform: rotate(var(--angle)) scaleY(1);
  }
}
</style>