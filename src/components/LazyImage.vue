<template>
  <div class="lazy-image-container" :class="{ loaded: isLoaded }">
    <div v-if="!isLoaded" class="image-placeholder">
      <div class="loading-spinner"></div>
      <p class="loading-text">加载中...</p>
    </div>
    <img
      :src="src"
      :alt="alt"
      :loading="loading"
      :decoding="decoding"
      @load="handleLoad"
      @error="handleError"
      class="lazy-image"
      :class="{ visible: isLoaded }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  loading: {
    type: String as () => 'lazy' | 'eager',
    default: 'lazy'
  },
  decoding: {
    type: String as () => 'async' | 'sync' | 'auto',
    default: 'async'
  }
})

const isLoaded = ref(false)

const handleLoad = () => {
  isLoaded.value = true
}

const handleError = () => {
  console.error(`Failed to load image: ${props.src}`)
  isLoaded.value = true // 即使失败也隐藏加载器
}
</script>

<style scoped>
.lazy-image-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(20, 20, 20, 0.95),
    rgba(30, 30, 30, 0.95)
  );
  z-index: 2;
  transition: opacity 0.5s ease;
}

.lazy-image-container.loaded .image-placeholder {
  opacity: 0;
  pointer-events: none;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(100, 200, 255, 0.2);
  border-radius: 50%;
  border-top-color: rgba(100, 200, 255, 0.8);
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-text {
  color: rgba(200, 200, 200, 0.8);
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.lazy-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.lazy-image.visible {
  opacity: 1;
}
</style>
