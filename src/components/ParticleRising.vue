<template>
  <canvas ref="canvasRef" class="particle-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Particle {
  x: number
  y: number
  length: number
  width: number
  speedY: number
  opacity: number
  hue: number
  life: number
  maxLife: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let particles: Particle[] = []
let animationFrameId: number
let width = 0
let height = 0

// 创建单个线条粒子
const createParticle = (): Particle => {
  return {
    x: Math.random() * width,
    y: height + 20,
    length: Math.random() * 40 + 20, // 线条长度 20-60px
    width: Math.random() * 2 + 1, // 线条宽度 1-3px
    speedY: -(Math.random() * 0.4 + 0.3), // 向上移动速度 0.3-0.7 (减慢速度)
    opacity: Math.random() * 0.5 + 0.5, // 0.5-1.0
    hue: Math.random() * 60 + 180, // 180-240 (蓝色到青色)
    life: 0,
    maxLife: Math.random() * 600 + 400 // 400-1000 帧 (大幅增加生命周期，增加距离)
  }
}

// 初始化粒子
const initParticles = () => {
  particles = []
  const particleCount = Math.floor(width / 20) // 根据屏幕宽度调整数量
  for (let i = 0; i < particleCount; i++) {
    const particle = createParticle()
    particle.y = Math.random() * height // 初始时随机分布在屏幕上
    particle.life = Math.random() * particle.maxLife
    particles.push(particle)
  }
}

// 更新线条粒子
const updateParticles = () => {
  particles.forEach((particle, index) => {
    // 更新位置 - 直线上升
    particle.y += particle.speedY
    particle.life++

    // 更新透明度（淡入淡出效果 + 光芒衰减）
    const lifeRatio = particle.life / particle.maxLife
    if (lifeRatio < 0.1) {
      particle.opacity = lifeRatio * 10 * 0.8 // 淡入
    } else if (lifeRatio > 0.5) {
      // 从生命周期50%开始逐渐衰减光芒
      particle.opacity = (1 - lifeRatio) * 2 * 0.8 // 光芒衰减
    }

    // 粒子超出屏幕或生命周期结束，重新生成
    if (particle.y < -20 || particle.life >= particle.maxLife) {
      particles[index] = createParticle()
    }
  })
}

// 绘制线条粒子
const drawParticles = () => {
  if (!ctx) return

  particles.forEach(particle => {
    ctx!.save()

    // 创建线性渐变（从底部到顶部）
    const gradient = ctx!.createLinearGradient(
      particle.x,
      particle.y,
      particle.x,
      particle.y - particle.length
    )
    gradient.addColorStop(0, `hsla(${particle.hue}, 100%, 70%, 0)`) // 底部透明
    gradient.addColorStop(0.3, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity * 0.5})`)
    gradient.addColorStop(0.7, `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`)
    gradient.addColorStop(1, `hsla(${particle.hue}, 100%, 80%, ${particle.opacity})`) // 顶部最亮

    // 绘制线条
    ctx!.strokeStyle = gradient
    ctx!.lineWidth = particle.width
    ctx!.lineCap = 'round'
    ctx!.shadowBlur = 10
    ctx!.shadowColor = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity * 0.8})`

    ctx!.beginPath()
    ctx!.moveTo(particle.x, particle.y)
    ctx!.lineTo(particle.x, particle.y - particle.length)
    ctx!.stroke()

    ctx!.restore()
  })
}

// 动画循环
const animate = () => {
  if (!ctx) return

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 更新和绘制粒子
  updateParticles()
  drawParticles()

  animationFrameId = requestAnimationFrame(animate)
}

// 调整画布大小
const resizeCanvas = () => {
  if (!canvasRef.value) return

  width = window.innerWidth
  height = window.innerHeight
  canvasRef.value.width = width
  canvasRef.value.height = height

  initParticles()
}

// 组件挂载
onMounted(() => {
  if (!canvasRef.value) return

  ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  resizeCanvas()
  animate()

  window.addEventListener('resize', resizeCanvas)
})

// 组件卸载
onUnmounted(() => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeCanvas)
})
</script>

<style scoped>
.particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 500;
}
</style>
