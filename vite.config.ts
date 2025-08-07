import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      name: 'html-assets-reorder',
      transformIndexHtml(html) {
        // 提取所有的 link 和 script 标签
        const cssRegex = /<link rel="stylesheet"[^>]*>/g
        const jsRegex = /<script type="module"[^>]*><\/script>/g
        const preloadRegex = /<link rel="modulepreload"[^>]*>/g
        
        const cssLinks = html.match(cssRegex) || []
        const jsScripts = html.match(jsRegex) || []
        const preloadLinks = html.match(preloadRegex) || []
        
        // 移除原有的资源标签
        html = html.replace(cssRegex, '')
        html = html.replace(jsRegex, '')
        html = html.replace(preloadRegex, '')
        
        // 按要求的顺序组合资源：CSS在最前面，然后JS，最后preload
        const orderedAssets = [
          ...cssLinks,
          ...jsScripts,
          ...preloadLinks
        ].map(tag => `    ${tag}`).join('\n')
        
        // 在指定位置插入资源
        html = html.replace(
          /<!-- Vite will inject styles and scripts automatically -->/,
          `<!-- Vite will inject styles and scripts automatically -->\n${orderedAssets}`
        )
        
        // 移除多余的空白行（特别是 </head> 前的空行）
        html = html.replace(/\n\s*\n\s*\n\s*\n\s*\n\s*\n\s*<\/head>/g, '\n  </head>')
        
        return html
      }
    }
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-redux': ['redux', 'react-redux', 'connected-react-router'],
          'tailwind-data': [
            './src/modules/v3.4.17.json',
            './src/modules/v4.1.json',
            './src/modules/v2.2.19.json',
            './src/modules/v1.9.6.json',
            './src/modules/v0.7.4.json'
          ]
        }
      }
    }
  },
  define: {
    'process.env': {}
  }
})