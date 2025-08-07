# Tailwind CSS Cheat Sheet

一个现代化的 Tailwind CSS 快速参考手册，支持多个版本的 Tailwind CSS，提供快速搜索和便捷的类名查找功能。

## 🌟 特性

- **多版本支持**: 支持 Tailwind CSS v0.7.4 到 v4.1 的所有主要版本
- **实时搜索**: 快速搜索 CSS 类名、属性和描述
- **响应式设计**: 完美适配桌面端和移动端
- **深色模式**: 支持明暗主题切换
- **瀑布流布局**: 使用 Masonry 布局优化内容展示
- **键盘快捷键**: 支持 Ctrl/Cmd + K 快速聚焦搜索框
- **SEO 优化**: 完整的 SEO 元数据和结构化数据
- **性能优化**: 代码分割和懒加载，提升加载速度

## 🚀 在线访问

访问 [https://tailwindcheatsheets.com](https://tailwindcheatsheets.com) 体验完整功能。

## 📦 技术栈

- **前端框架**: React 17 + TypeScript
- **构建工具**: Vite
- **样式框架**: Tailwind CSS 3.x
- **状态管理**: Redux + React Redux
- **路由**: React Router v5
- **布局**: React Masonry CSS
- **分析**: Google Analytics + Microsoft Clarity
- **其他**: Puppeteer (数据爬取)

## 🛠️ 本地开发

### 环境要求

- Node.js >= 14.0.0
- npm 或 yarn

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn install
```

### 启动开发服务器

```bash
# 使用 npm
npm start

# 或使用 yarn
yarn start
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用。

### 构建生产版本

```bash
# 使用 npm
npm run build

# 或使用 yarn
yarn build
```

### 预览生产构建

```bash
# 使用 npm
npm run preview

# 或使用 yarn
yarn preview
```

## 📁 项目结构

```
tailwind-cheatsheet/
├── public/                 # 静态资源
│   ├── favicon.ico
│   ├── og-image.jpg
│   └── robots.txt
├── src/
│   ├── components/         # React 组件
│   │   ├── categories.tsx  # 分类展示组件
│   │   ├── category.tsx    # 单个分类组件
│   │   ├── searchBar.tsx   # 搜索栏组件
│   │   ├── versionSelector.tsx # 版本选择器
│   │   └── ...
│   ├── modules/           # 数据模块
│   │   ├── v4.1.json     # Tailwind CSS v4.1 数据
│   │   ├── v3.4.17.json  # Tailwind CSS v3.4.17 数据
│   │   ├── v2.2.19.json  # Tailwind CSS v2.2.19 数据
│   │   ├── v1.9.6.json   # Tailwind CSS v1.9.6 数据
│   │   ├── v0.7.4.json   # Tailwind CSS v0.7.4 数据
│   │   └── models/       # TypeScript 类型定义
│   ├── utils/            # 工具函数
│   ├── views/            # 页面组件
│   └── css/              # 样式文件
├── scripts/              # 构建脚本
│   └── puppeteerCrawler.js # 数据爬取脚本
├── index.html            # HTML 模板
├── vite.config.ts        # Vite 配置
├── tailwind.config.js    # Tailwind CSS 配置
└── package.json          # 项目配置
```

## 🔧 核心功能

### 版本切换
支持在以下 Tailwind CSS 版本间切换：
- v4.1 (最新)
- v3.4.17
- v2.2.19
- v1.9.6
- v0.7.4

### 搜索功能
- 支持类名、属性值、描述的模糊搜索
- 实时搜索结果高亮
- URL 参数同步搜索状态
- 防抖优化，提升搜索性能

### 响应式布局
- 桌面端：4列瀑布流布局
- 平板端：2-3列布局
- 移动端：单列布局

### 键盘快捷键
- `Ctrl/Cmd + K`: 聚焦搜索框
- `Escape`: 取消搜索框焦点

## 📊 数据来源

项目使用 Puppeteer 自动爬取 Tailwind CSS 官方文档，确保数据的准确性和及时性。爬取脚本位于 `scripts/puppeteerCrawler.js`。

## 🎨 自定义主题

项目支持明暗两种主题，主题状态保存在 localStorage 中，用户偏好会在下次访问时自动恢复。

## 📈 分析和监控

- **Google Analytics**: 页面访问和搜索行为分析
- **Microsoft Clarity**: 用户行为热图和会话录制
- **Google AdSense**: 广告展示和收益分析

## 🚀 部署指南

### Cloudflare 部署

本项目推荐使用 Cloudflare 进行部署，享受全球CDN加速和安全防护。

#### 快速部署步骤

1. **构建项目**
   ```bash
   npm run build
   ```

2. **上传文件**
   - 将 `dist/` 目录中的所有文件上传到你的Web服务器根目录

3. **配置 Cloudflare**
   - 在 Cloudflare 中添加你的域名
   - 设置 DNS A 记录指向服务器IP
   - 启用代理状态（橙色云朵）

4. **配置 SSL/TLS**
   - 选择 "Full (strict)" 加密模式
   - 启用 "Always Use HTTPS"

详细配置请参考 [cloudflare-config.md](cloudflare-config.md) 文件。

### SPA 路由处理

⚠️ **重要**: 这是一个单页应用(SPA)，包含以下路由：
- `/` - 主页 (默认v4.1版本)
- `/v4` - Tailwind CSS v4.1
- `/v3` - Tailwind CSS v3.4.17  
- `/v2` - Tailwind CSS v2.2.19
- `/v1` - Tailwind CSS v1.9.6
- `/v0` - Tailwind CSS v0.7.4

为避免直接访问路由时出现404错误，需要在Web服务器中配置重定向规则：

#### Nginx 配置
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### Apache 配置
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

#### 测试部署
部署完成后，请测试以下URL是否正常访问：
- https://tailwindcheatsheets.com/
- https://tailwindcheatsheets.com/v4
- https://tailwindcheatsheets.com/v3
- https://tailwindcheatsheets.com/v2
- https://tailwindcheatsheets.com/v1
- https://tailwindcheatsheets.com/v0

## 🤝 贡献指南

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

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 网站: [https://tailwindcheatsheets.com](https://tailwindcheatsheets.com)
- GitHub Issues: [提交问题](https://github.com/zxlee920/tailwind-cheatsheet/issues)

---

⭐ 如果这个项目对你有帮助，请给它一个星标！