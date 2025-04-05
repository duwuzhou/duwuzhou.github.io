import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
import path from 'path'
import { fileURLToPath } from 'url'
// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  // 如果你的仓库名是 username.github.io，使用 './'
  // 如果是其他仓库名，使用 '/your-repo-name/'
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
