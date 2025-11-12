<template>
  <div class="gif-container">
    <!-- 标题（可选） -->
    <h3 v-if="title" class="gif-title">{{ title }}</h3>

    <!-- 加载动画 -->
    <div v-show="!loaded" class="loading-spinner"></div>

    <!-- GIF 图片 -->
    <img
        v-show="loaded"
        :src="src"
        :alt="title || 'GIF 图片'"
        class="gif-image"
        :style="{ width: width, height: height }"
        @load="loaded = true"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  src: string;
  title?: string;
  width?: string;
  height?: string;
}

const { src, title = '', width = '300px', height = 'auto' } = defineProps<Props>()

const loaded = ref(false)
</script>

<style scoped>
.gif-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  position: relative;

}

/* 标题 */
.gif-title {
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
}

/* 加载动画样式 */
.loading-spinner {
  width: 48px;
  height: 48px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top-color: #42b983;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* 图片样式 */
.gif-image {
  border-radius: 8px;
  object-fit: fill; /* 让 GIF 可拉伸宽高 */
  transition: opacity 0.3s ease;
}
</style>
