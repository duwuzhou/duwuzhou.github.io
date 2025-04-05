import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
import path from 'path'
import { fileURLToPath } from 'url'
// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: '/grxc/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
