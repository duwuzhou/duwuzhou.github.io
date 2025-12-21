import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/view1',
    name: 'view1',
    component: () => import('../views/view1.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue')
  },
  // {
  //   path: '/article',
  //   name: 'article',
  //   component: () => import('../views/article.vue')
  // },
  // {
  //   path: '/article/:id',
  //   name: 'article-detail',
  //   component: () => import('../views/ArticleDetail.vue'),
  //   props: true
  // },
  {
    path: '/',
    name: 'dh',
    component: () => import('../views/dh.vue')
  },

]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router