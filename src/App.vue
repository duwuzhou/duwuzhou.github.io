<script setup lang="ts">
import { onMounted, ref } from 'vue'
import 'vue-fullpage.js/dist/style.css'
import 'fullpage.js/dist/fullpage.css'
import '@/assets/css/Animation.css'
import 'animate.css';
const bk = ref(false)
const sy = ref(true)

const typeWriter = (target: any, text: string, index: number = 0, speed: number = 100) => {
  let currentText = ''
  let charIndex = 0

  const timer = setInterval(() => {
    if (charIndex < text.length) {
      currentText += text[charIndex]
      if (Array.isArray(target.value)) {
        target.value[index] = currentText
      } else {
        target.value = currentText
      }
      charIndex++
    } else {
      clearInterval(timer)
    }
  }, speed)
}

const introText = ref('')
const introText2 = ref('')
const introText3 = ref('')

// 博客列表数据
const blogList = ref([
  {
    title: '雨天的thoughts',
    summary: '雨滴敲打窗棂的声音，总是能勾起我无尽的思绪...',
    date: '2023-11-15',
    tags: ['随笔', '生活']
  },
  {
    title: 'Vue3 组合式API实践',
    summary: '探索Vue3组合式API的优势及实际应用场景，提升代码复用性和可维护性...',
    date: '2023-10-28',
    tags: ['技术', 'Vue3']
  },
  {
    title: '旅行中的偶遇',
    summary: '在陌生的城市里，有时一次偶然的相遇会带来意想不到的惊喜...',
    date: '2023-09-20',
    tags: ['旅行', '随笔']
  },
  {
    title: 'TypeScript类型体操实战',
    summary: '深入TypeScript类型系统，解析常见的类型编程技巧和实用模式...',
    date: '2023-08-15',
    tags: ['技术', 'TypeScript']
  }
])

const moveSectionDown = () => {
  sy.value=false
  bk.value=true
}

onMounted(() => {

  // 个人介绍动画
  setTimeout(() => typeWriter(introText, '心中依旧孤独'), 500)
  setTimeout(() => typeWriter(introText2, '雨落在心里'), 1500)
  setTimeout(() => typeWriter(introText3, 'ovo'), 2000)
})


// 实现下雨动画效果
onMounted(() => {
  const canvas = document.getElementById('bgCanvas') as HTMLCanvasElement
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  // 设置画布尺寸
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // 定义雨滴类
  class RainDrop {
    x: number
    y: number
    length: number
    speed: number
    opacity: number
    size: number

    constructor() {
      this.x = Math.random() * canvas.width
      this.y = Math.random() * canvas.height - canvas.height
      this.length = Math.random() * 30 + 15
      this.speed = Math.random() * 15 + 8
      this.opacity = Math.random() * 0.4 + 0.1
      this.size = Math.random() * 2 + 1
    }

    update() {
      this.y += this.speed
      if (this.y > canvas.height) {
        this.y = -this.length
        this.x = Math.random() * canvas.width
        // 添加涟漪效果
        if (Math.random() > 0.95) {
          createRipple(this.x, canvas.height)
        }
      }
    }

    draw() {
      if (!ctx) return
      ctx.beginPath()
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(this.x, this.y + this.length)
      ctx.strokeStyle = `rgba(144, 224, 239, ${this.opacity})`
      ctx.lineWidth = this.size
      ctx.stroke()
    }
  }

  // 涟漪效果类
  class Ripple {
    x: number
    y: number
    radius: number
    opacity: number

    constructor(x: number, y: number) {
      this.x = x
      this.y = y
      this.radius = 1
      this.opacity = 0.6
    }

    update() {
      this.radius += 1.5
      this.opacity -= 0.03
      return this.opacity > 0
    }

    draw() {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(144, 224, 239, ${this.opacity})`
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }

  // 创建涟漪
  const ripples: Ripple[] = []
  function createRipple(x: number, y: number) {
    ripples.push(new Ripple(x, y))
  }

  // 创建雨滴数组
  const raindrops: RainDrop[] = []
  const raindropCount = 200
  for (let i = 0; i < raindropCount; i++) {
    raindrops.push(new RainDrop())
  }

  // 动画循环
  const animate = () => {
    if (!ctx) return
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // 更新和绘制所有雨滴
    raindrops.forEach(raindrop => {
      raindrop.update()
      raindrop.draw()
    })

    // 更新和绘制所有涟漪
    for (let i = ripples.length - 1; i >= 0; i--) {
      if (!ripples[i].update()) {
        ripples.splice(i, 1)
      } else {
        ripples[i].draw()
      }
    }

    requestAnimationFrame(animate)
  }

  animate()
})

</script>

<template>
<div class="background-container"></div>
  <div  id="fullpage">
    <!-- 首页/个人介绍 -->
    <div v-if="sy" class="section">
      <div class="content">
        <h1>欢迎来到这里</h1>
        <div class="intro">
          <h3>{{ introText }}<span class="cursor">|</span></h3>
          <p>{{ introText2 }}</p>
          <P>{{ introText3 }}</P>
         <canvas id="bgCanvas" class="background-canvas"></canvas>
        </div>
      </div>
      <div class="scroll-down-btn" @click="moveSectionDown">
        <div class="arrow"></div>
      </div>
    </div>

    <!-- 博客列表 -->
    <div v-if="bk" class="section animate__bounceIn">
      <div class="content">
        <h2>博客文章</h2>
        <div class="blog-list">
          <div class="blog-item" v-for="(blog, index) in blogList" :key="index">
            <h3>{{ blog.title }}</h3>
            <p>{{ blog.summary }}</p>
            <div class="blog-footer">
              <span class="date">{{ blog.date }}</span>
              <span class="tag" v-for="(tag, i) in blog.tags" :key="i">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 项目展示
    <div class="section">
      <div class="content">
        <h2>项目展示</h2>
        <div class="project-list">
          <div class="project-item" v-for="i in 3" :key="i">
            <h3>项目 {{ i }}</h3>
            <p>项目描述和主要技术栈...</p>
            <div class="tech-stack">
              <span>Vue</span>
              <span>TypeScript</span>
              <span>Node.js</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- 联系方式
    <div class="section">
      <div class="content">
        <h2>联系我</h2>
        <div class="contact-info">
          <p>Email: example@email.com</p>
          <p>GitHub: github.com/example</p>
        </div>
      </div>
    </div> -->
  </div>
</template>

<style lang="scss" scoped>

.content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.section {
  h1 {
    font-size: 3em;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2em;
    margin-bottom: 30px;
  }
}

.intro {
  margin-top: 40px;
  h3 {
    background: linear-gradient(45deg, #00b4d8, #90e0ef);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    transition: background 0.5s ease;
  }
  p {
    font-size: 1.2em;
    color: #666;
  }
}

.blog-list, .project-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.blog-item, .project-item {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-bottom: 10px;
    color: #333;
    min-height: 1.5em;
  }

  p {
    color: #666;
    margin-bottom: 15px;
    min-height: 3em;
  }

  .date {
    color: #999;
    font-size: 0.9em;
  }
}

// 添加博客标签样式
.blog-footer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  
  .tag {
    background: linear-gradient(45deg, rgba(0, 180, 216, 0.1), rgba(144, 224, 239, 0.2));
    padding: 3px 10px;
    border-radius: 12px;
    font-size: 0.8em;
    color: #00b4d8;
    border: 1px solid rgba(0, 180, 216, 0.3);
  }
}

.scroll-down-btn {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  bottom: 40px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: transparent;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 180, 216, 0.3);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    // 向下
    transform: translateX(-50%) translateY(5px);
    box-shadow: 0 6px 20px rgba(0, 180, 216, 0.5);
  }

  .arrow {
    width: 20px;
    height: 20px;
    border-left: 3px solid rgba(0, 180, 216, 0.8);
    border-bottom: 3px solid rgba(0, 180, 216, 0.8);
    transform: rotate(-45deg);
    position: relative;
    top: -3px;
    animation: arrow-bounce 1.5s infinite;
  }
}

@keyframes arrow-bounce {
  0%, 100% { transform: rotate(-45deg) translateY(0); }
  50% { transform: rotate(-45deg) translateY(5px); }
}

.cursor {
  background: linear-gradient(45deg, #00b4d8, #90e0ef);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: blink 1s infinite, gradient-pulse 2s infinite;
  font-weight: bold;
  margin-left: 2px;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

@keyframes gradient-pulse {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.tech-stack {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 10px;

  span {
    background: #f0f0f0;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.9em;
    color: #666;
  }
}

.contact-info {
  margin-top: 30px;
  p {
    font-size: 1.2em;
    margin: 10px 0;
    color: #666;
  }
}

// 画布
.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-image: url('/images/image.png');
  background-size: cover;
  background-position: center;
  opacity: 0.8;
}

.background-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
}

.background-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -2;
  background-image: url('/images/image.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
