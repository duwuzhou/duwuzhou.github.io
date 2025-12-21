import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // 启用 CSS 代码分割
    cssCodeSplit: true,
    // 构建后是否生成 source map 文件
    sourcemap: false,
    // chunk 大小警告的限制（以 kbs 为单位）
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 分包策略
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          'music-player': [
            './src/components/FloatingMusicPlayer/FloatingMusicPlayer.vue',
            './src/components/FloatingMusicPlayer/usePlayerControl.ts',
            './src/components/FloatingMusicPlayer/useLyrics.ts'
          ]
        },
        // 用于从入口点创建的块的打包输出格式
        entryFileNames: 'assets/js/[name]-[hash].js',
        // 用于命名代码拆分时创建的共享块的输出命名
        chunkFileNames: 'assets/js/[name]-[hash].js',
        // 用于输出静态资源的命名
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.')
          let extType = info?.[info.length - 1]
          if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name || '')) {
            extType = 'media'
          } else if (/\.(png|jpe?g|gif|svg|ico|webp)(\?.*)?$/i.test(assetInfo.name || '')) {
            extType = 'images'
          } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name || '')) {
            extType = 'fonts'
          }
          return `assets/${extType}/[name]-[hash][extname]`
        }
      }
    },
    // 压缩选项 - 使用 esbuild 压缩（更快）
    minify: 'esbuild',
    // esbuild 压缩配置
    esbuild: {
      drop: ['console', 'debugger']
    }
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia']
  }
})
