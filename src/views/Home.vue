<template>
  <div class="page-container" :style="{ backgroundImage: `url(${backgroundImage})` }">
    <div class="content-wrapper">
      <div v-for="(item, index) in textArray" :key="index" class="text-item">
        <Typewriter
            :text="item.text"
            :speed="item.speed"
            :delay="item.delay"
        />
      </div>
    </div>

    <!-- 固定在底部的半透明按钮 -->
    <button
        v-if="showButton"
        @click="handleButtonClick"
        class="fixed-bottom-button"
    >
      下一页
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Typewriter from '../components/Typewriter.vue'
import { useRouter } from 'vue-router'

// 使用 URL 方式引用 public 目录中的图片
import backgroundImage from '/images/gzr.gif?url'

const textArray = ref([
  {
    text: '心所志，树众敌',
    speed: 100,
    delay: 0,
  },
  {
    text: '纵然荆棘满途，亦不改初心：',
    speed: 100,
    delay: 1000,
  }
])

const showButton = ref(false)
const router = useRouter()

function handleButtonClick() {
  router.push('/view1')
}

onMounted(() => {
  const last = textArray.value[textArray.value.length - 1]
  const totalTime =
      last.delay + last.text.length * last.speed // 毫秒
  setTimeout(() => {
    showButton.value = true
  }, totalTime)
})
</script>

<style scoped>
.page-container {
  min-height: 90vh;
  width: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;

  /* 3D变换 */
  transform-style: preserve-3d;
  transform: perspective(1000px) rotateX(5deg) rotateY(5deg);
  transition: transform 0.5s ease;

  /* 半透明边框 */
  border: 1px solid rgba(255, 255, 255, 0.3);

  /* 圆角 */
  border-radius: 10px;

  /* 增强的3D阴影效果 */
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    0 10px 20px rgba(0, 0, 0, 0.2),
    inset 0 0 20px rgba(255, 255, 255, 0.1);

  /* 背景 */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  /* ✨ 动画叠加：淡入 + 悬浮 */
  animation:
      fade-in-fwd 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both,
      float 3s ease-in-out 0.6s infinite;
  /* ↑ 第二个动画延迟0.6s开始，避免刚加载时突兀 */
}

.page-container:hover {
  transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(20px);
}

.content-wrapper {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding: 20px;
}

.text-item {
  width: 100%;
  text-align: center;
  margin: 10px 0;
  font-size: clamp(1.2rem, 4vw, 2rem);
  line-height: 1.5;
}

.fixed-bottom-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.4);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: clamp(14px, 3vw, 18px);
  z-index: 1000;
  transition: all 0.3s ease;
  min-width: 120px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.fixed-bottom-button:hover {
  background-color: rgba(0, 0, 0, 0.6);
  transform: translateX(-50%) translateY(-5px) scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

/* 针对小屏幕 */
@media (max-width: 600px) {
  .page-container {
    padding: 10px;
  }
  .content-wrapper {
    padding: 10px;
  }
  .text-item {
    margin: 8px 0;
  }
  .fixed-bottom-button {
    padding: 10px 20px;
    bottom: 15px;
  }
}

/* 横屏设备优化 */
@media (orientation: landscape) and (max-height: 500px) {
  .content-wrapper {
    padding-top: 30px;
  }
  .fixed-bottom-button {
    position: absolute;
    bottom: 10px;
  }
}

/* ✨ 动画定义 */

/* 淡入 + 前移 */
@keyframes fade-in-fwd {
  0% {
    transform: translateZ(-80px);
    opacity: 0;
  }
  100% {
    transform: translateZ(0);
    opacity: 1;
  }
}

/* 上下轻浮动 */
@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}
</style>
