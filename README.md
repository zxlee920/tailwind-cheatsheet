# Tailwind CSS Cheat Sheet

一个现代化的 Tailwind CSS 速查表和参考手册，支持多个版本的 Tailwind CSS，提供快速搜索和便捷的类名查找功能。

## 🌟 特性

- **多版本支持**: 支持 Tailwind CSS v0.7.4 到 v4.1 的所有主要版本
- **实时搜索**: 快速搜索 CSS 类名、属性和描述
- **响应式设计**: 完美适配桌面端和移动端
- **深色模式**: 支持明暗主题切换
- **瀑布流布局**: 使用 Masonry 布局优化内容展示
- **键盘快捷键**: 支持 Ctrl/Cmd + K 快速聚焦搜索框
- **一键复制**: 点击即可复制 CSS 类名到剪贴板
- **SEO 优化**: 完整的 SEO 元数据和结构化数据

## 🚀 在线访问

访问 [https://tailcheatsheet.top](https://tailcheatsheet.top) 体验完整功能。

## 📦 技术栈

- **前端框架**: React 17 + TypeScript
- **状态管理**: Redux + React-Redux
- **路由**: React Router v5
- **样式**: Tailwind CSS v3.1.8
- **构建工具**: Vite
- **布局**: React Masonry CSS
- **数据爬取**: Puppeteer
- **分析**: Google Analytics + Microsoft Clarity

## 🛠️ 本地开发

### 环境要求

- Node.js >= 14
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

项目将在 `http://localhost:5173` 启动。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 📁 项目结构

```
tailwind-cheatsheet/
├── public/                 # 静态资源
│   ├── favicon.ico
│   ├── og-image.jpg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/         # React 组件
│   │   ├── categories.tsx  # 分类展示组件
│   │   ├── category.tsx    # 单个分类组件
│   │   ├── searchBar.tsx   # 搜索栏组件
│   │   ├── darkModeToggle.tsx
│   │   └── ...
│   ├── modules/           # 数据模块
│   │   ├── v4.1.json     # Tailwind v4.1 数据
│   │   ├── v3.4.17.json  # Tailwind v3.4.17 数据
│   │   └── ...
│   ├── utils/            # 工具函数
│   │   ├── copyTextToClipboard.ts
│   │   └── googleAnalytics.tsx
│   ├── views/            # 页面组件
│   │   ├── app.tsx
│   │   └── home.tsx
│   └── css/
│       └── index.css     # 全局样式
├── scripts/
│   └── puppeteerCrawler.js  # 数据爬取脚本
└── ...配置文件
```

## 🔧 核心功能

### 版本切换
支持在以下 Tailwind CSS 版本间切换：
- v4.1 (最新)
- v3.4.17
- v2.2.19
- v1.9.6
- v0.7.4

不同版本分别对应下面的url
- https://tailcheatsheet.top/v4
- https://tailcheatsheet.top/v3
- https://tailcheatsheet.top/v2
- https://tailcheatsheet.top/v1
- https://tailcheatsheet.top/v0
  
### 搜索功能
- 支持按类名、描述、属性值搜索
- 实时搜索结果高亮
- URL 参数保存搜索状态
- 防抖优化搜索性能

### 响应式布局
- 桌面端：4列瀑布流布局
- 平板端：2-3列布局
- 移动端：单列布局

## 📊 数据来源

项目使用 Puppeteer 爬虫从 Tailwind CSS 官方文档获取最新的类名和属性数据，确保信息的准确性和时效性。

## 🌐 部署

项目支持部署到各种静态托管平台：

- **Vercel**: 推荐，零配置部署
- **Netlify**: 支持表单和函数
- **GitHub Pages**: 免费静态托管
- **Cloudflare Pages**: 全球 CDN 加速

## 📈 SEO 优化

- 完整的 Open Graph 和 Twitter Card 元数据
- 结构化数据 (JSON-LD)
- 语义化 HTML 结构
- 优化的页面标题和描述
- 自动生成的 sitemap.xml

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Tailwind CSS](https://tailwindcss.com/) - 优秀的 CSS 框架
- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 快速的构建工具

## 📞 联系

如有问题或建议，请通过以下方式联系：


- GitHub Issues: [提交问题](https://github.com/zxlee920/tailwind-cheatsheet/issues)

---

⭐ 如果这个项目对你有帮助，请给个 Star 支持一下！
