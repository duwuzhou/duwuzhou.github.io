<template>
  <nav class="navigation-bar">
    <div class="nav-container">
      <div class="nav-logo">
        <RouterLink to="/" class="logo-link">
          <span class="logo-text">花落</span>
        </RouterLink>
      </div>
      
      <!-- 桌面端导航菜单 -->
      <ul class="nav-menu desktop-menu">
        <li>
          <RouterLink to="/" class="nav-link">导航中心</RouterLink>
        </li>
        <li>
          <RouterLink to="/home" class="nav-link">首页</RouterLink>
        </li>
        <li>
          <RouterLink to="/articles" class="nav-link">博客</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="nav-link">个人介绍</RouterLink>
        </li>
      </ul>
      
      <!-- 移动端菜单按钮 -->
      <button 
        class="mobile-menu-toggle" 
        @click="toggleMobileMenu"
        aria-label="切换菜单"
      >
        <span class="menu-icon"></span>
      </button>
      
      <!-- 移动端导航菜单 -->
      <ul class="nav-menu mobile-menu" :class="{ 'menu-open': isMobileMenuOpen }">
        <li>
          <RouterLink to="/" class="nav-link" @click="toggleMobileMenu">导航中心</RouterLink>
        </li>
        <li>
          <RouterLink to="/home" class="nav-link" @click="toggleMobileMenu">首页</RouterLink>
        </li>
        <li>
          <RouterLink to="/articles" class="nav-link" @click="toggleMobileMenu">博客</RouterLink>
        </li>
        <li>
          <RouterLink to="/about" class="nav-link" @click="toggleMobileMenu">个人介绍</RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

// 移动端菜单状态
const isMobileMenuOpen = ref(false)

// 切换移动端菜单
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
</script>

<style scoped>
.navigation-bar {
  background: rgba(18, 18, 18, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.nav-logo {
  flex: 0 0 auto;
}

.logo-link {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--light-blue);
  text-shadow: 0 0 10px rgba(0, 119, 204, 0.5);
  background: linear-gradient(135deg, var(--text-primary), var(--light-blue));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 导航菜单基础样式 */
.nav-menu {
  list-style: none;
  display: flex;
  gap: 1rem;
  margin: 0;
  padding: 0;
}

/* 桌面端菜单 */
.desktop-menu {
  display: flex;
}

/* 移动端菜单 */
.mobile-menu {
  display: none;
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background: rgba(18, 18, 18, 0.4);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  flex-direction: column;
  gap: 0;
}

.mobile-menu.menu-open {
  display: flex;
}

/* 移动端菜单按钮 */
.mobile-menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  position: relative;
  width: 30px;
  height: 30px;
}

.menu-icon {
  display: block;
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  position: relative;
  transition: background-color 0.3s ease;
}

.menu-icon::before,
.menu-icon::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: transform 0.3s ease, top 0.3s ease;
}

.menu-icon::before {
  top: -8px;
}

.menu-icon::after {
  top: 8px;
}

/* 菜单按钮激活状态 */
.mobile-menu-toggle.active .menu-icon {
  background-color: transparent;
}

.mobile-menu-toggle.active .menu-icon::before {
  top: 0;
  transform: rotate(45deg);
}

.mobile-menu-toggle.active .menu-icon::after {
  top: 0;
  transform: rotate(-45deg);
}

/* 导航链接样式 */
.nav-link {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--text-secondary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 8px;
  position: relative;
}

/* 桌面端链接悬停效果 */
.desktop-menu .nav-link:hover {
  color: var(--light-blue);
  background: rgba(0, 119, 204, 0.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 119, 204, 0.2);
}

/* 移动端链接样式 */
.mobile-menu .nav-link {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-align: center;
}

.mobile-menu .nav-link:hover {
  color: var(--light-blue);
  background: rgba(0, 119, 204, 0.1);
}

/* 激活链接样式 */
.nav-link.router-link-active {
  color: var(--light-blue);
  font-weight: 700;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .nav-container {
    padding: 0 1.5rem;
  }
  
  .desktop-menu {
    gap: 0.75rem;
  }
  
  .nav-link {
    padding: 0.6rem 0.8rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 768px) {
  .desktop-menu {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: block;
  }
  
  .mobile-menu {
    display: none;
  }
}

/* 平板设备特殊处理 */
@media (max-width: 968px) {
  .nav-link {
    font-size: 0.9rem;
  }
}
</style>