# Tailwind CSS Cheat Sheet

一个现代化的 Tailwind CSS 速查表应用，支持多版本切换、实时搜索和暗黑模式。

## 🌟 特性

- **多版本支持**: 支持 Tailwind CSS v0.7.4 到 v4.1 的所有主要版本
- **实时搜索**: 快速搜索任何 CSS 类名和工具类
- **响应式设计**: 完美适配桌面端和移动端
- **暗黑模式**: 支持明暗主题切换
- **键盘快捷键**: 支持 Ctrl/Cmd + K 快速聚焦搜索框
- **URL 路由**: 支持版本切换的 URL 路由，便于分享和书签
- **展开/折叠**: 一键展开或折叠所有分类
- **Google Analytics**: 集成使用统计分析

## 🚀 在线预览

访问 [Tailwind CSS Cheat Sheet](https://tailwindcss-cheatsheet.com) 查看在线版本。

## 📦 技术栈

- **前端框架**: React 17 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS 3.1.8
- **路由**: React Router 5
- **状态管理**: Redux + React Redux
- **图标**: SVG React 组件
- **分析**: React GA (Google Analytics)
- **数据爬取**: Puppeteer (用于爬取官方文档数据)

## 🛠️ 本地开发

### 环境要求

- Node.js >= 14.0.0
- npm >= 6.0.0

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm start
```

应用将在 `http://localhost:3000` 启动。

### 构建生产版本

```bash
npm run build
```

构建文件将输出到 `dist` 目录。

### 预览生产版本

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
│   │   ├── categories.tsx  # 分类列表组件
│   │   ├── category.tsx    # 单个分类组件
│   │   ├── darkModeToggle.tsx # 暗黑模式切换
│   │   ├── footer.tsx      # 页脚组件
│   │   ├── searchBar.tsx   # 搜索栏组件
│   │   ├── tagline.tsx     # 标题组件
│   │   ├── toast.tsx       # 提示组件
│   │   └── versionSelector.tsx # 版本选择器
│   ├── modules/            # 数据模块
│   │   ├── v0.7.4.json    # Tailwind v0.7.4 数据
│   │   ├── v1.9.6.json    # Tailwind v1.9.6 数据
│   │   ├── v2.2.19.json   # Tailwind v2.2.19 数据
│   │   ├── v3.4.17.json   # Tailwind v3.4.17 数据
│   │   ├── v4.1.json      # Tailwind v4.1 数据
│   │   └── models/        # 数据模型
│   ├── utils/             # 工具函数
│   │   ├── copyTextToClipboard.ts
│   │   └── googleAnalytics.tsx
│   ├── views/             # 页面组件
│   │   ├── app.tsx        # 主应用组件
│   │   ├── home.tsx       # 首页组件
│   │   └── no_match.tsx   # 404 页面
│   └── css/               # 样式文件
├── scripts/               # 脚本文件
│   └── puppeteerCrawler.js # 数据爬取脚本
└── package.json
```

## 🔍 功能说明

### 版本切换

支持以下 Tailwind CSS 版本：
- v4.1 (最新) - `/v4` 或 `/`
- v3.4.17 - `/v3`
- v2.2.19 - `/v2`
- v1.9.6 - `/v1`
- v0.7.4 - `/v0`

### 搜索功能

- 支持按类名、描述搜索
- 实时搜索结果高亮
- 搜索结果 URL 参数化 (`?q=搜索词`)
- 键盘快捷键 `Ctrl/Cmd + K` 快速聚焦搜索框
- `Escape` 键取消搜索框焦点

### 暗黑模式

- 自动检测系统主题偏好
- 手动切换明暗主题
- 主题设置本地存储

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 数据更新

如需更新 Tailwind CSS 数据：

1. 运行爬虫脚本：
```bash
node scripts/puppeteerCrawler.js
```

2. 检查生成的 JSON 数据文件
3. 更新对应版本的数据文件

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Tailwind CSS](https://tailwindcss.com/) - 优秀的 CSS 框架
- [React](https://reactjs.org/) - 用户界面库
- [Vite](https://vitejs.dev/) - 快速的构建工具

## 📊 统计

![GitHub stars](https://img.shields.io/github/stars/zxlee920/tailwind-cheatsheet?style=social)
![GitHub forks](https://img.shields.io/github/forks/zxlee920/tailwind-cheatsheet?style=social)
![GitHub issues](https://img.shields.io/github/issues/zxlee920/tailwind-cheatsheet)
![GitHub license](https://img.shields.io/github/license/zxlee920/tailwind-cheatsheet)

---

如果这个项目对你有帮助，请给个 ⭐️ 支持一下！