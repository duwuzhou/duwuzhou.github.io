<template>
  <nav class="navigation-bar">
    <ul>
      <li><router-link to="/">首页</router-link></li>
      <li><router-link to="/about">我</router-link></li>
      <li><router-link to="/article">文章</router-link></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

// 导航组件的逻辑，目前为空，可根据需要添加交互功能
</script>

<style scoped>
.navigation-bar {
  background-color: rgba(0, 0, 0, 0.1); /* 半透明背景 */
  padding: 15px 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.);
}

.navigation-bar ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.navigation-bar li {
  margin: 0 20px;
}

.navigation-bar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
  transition: color 0.3s ease;
}

.navigation-bar a:hover,
.navigation-bar a.router-link-active {
  color: #919191; /* 鼠标悬停时的颜色和激活状态的颜色 */
}
</style>