<template>
  <div class="typewriter" :style="{ color, fontSize }">
    <span>{{ displayedText }}</span>
    <span class="cursor" :class="{ 'cursor-blink': showCursor }">|</span>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

const props = defineProps({
  text: { type: String, required: true },
  speed: { type: Number, default: 100 },
  delay: { type: Number, default: 0 },
  showCursor: { type: Boolean, default: true },
  loop: { type: Boolean, default: false },
  loopDelay: { type: Number, default: 1000 },
  // 新增
  color: { type: String, default: '#FFF' },
  fontSize: { type: String, default: '16px' }
});

const displayedText = ref('');
const typingInterval = ref<number | null>(null);
const currentIndex = ref(0);
const isDeleting = ref(false);

const type = () => {
  if (isDeleting.value) {
    if (displayedText.value.length > 0) {
      displayedText.value = displayedText.value.slice(0, -1);
    } else {
      isDeleting.value = false;
      currentIndex.value = 0;
      if (props.loop) {
        setTimeout(() => {
          type();
        }, props.loopDelay);
      }
    }
  } else {
    if (currentIndex.value < props.text.length) {
      displayedText.value += props.text.charAt(currentIndex.value);
      currentIndex.value++;
    } else {
      if (props.loop) {
        setTimeout(() => {
          isDeleting.value = true;
          type();
        }, props.loopDelay);
      }
    }
  }
};

const startTyping = () => {
  if (typingInterval.value) clearInterval(typingInterval.value);
  typingInterval.value = window.setInterval(type, props.speed);
};

const reset = () => {
  displayedText.value = '';
  currentIndex.value = 0;
  isDeleting.value = false;
};

onMounted(() => {
  setTimeout(() => {
    startTyping();
  }, props.delay);
});

onUnmounted(() => {
  if (typingInterval.value) clearInterval(typingInterval.value);
});

watch(() => props.text, () => {
  reset();
  startTyping();
});
</script>

<style scoped>
.typewriter {
  display: inline-block;
}

.cursor {
  opacity: 1;
}

.cursor-blink {
  animation: blink 0.7s infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
</style>
