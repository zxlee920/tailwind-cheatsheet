# Cloudflare 配置指南

## 🚀 Cloudflare 部署步骤

### 第一步：准备文件
1. 确保项目已经构建完成：`npm run build`
2. 将 `dist/` 目录中的所有文件上传到你的Web服务器根目录
3. 确保以下文件已正确上传：
   - `index.html` - 主页面文件
   - `assets/` - 静态资源目录
   - `sitemap.xml` - 网站地图
   - `robots.txt` - 搜索引擎配置
   - `favicon.ico` - 网站图标
   - `og-image.jpg` - 社交媒体分享图片

### 第二步：配置DNS
1. 登录Cloudflare控制台
2. 添加你的域名（如：tailwindcheatsheets.com）
3. 设置DNS记录：
   ```
   类型: A
   名称: @
   内容: 你的服务器IP地址
   代理状态: 已代理（橙色云朵）
   ```
4. 如需www子域名，添加CNAME记录：
   ```
   类型: CNAME
   名称: www
   内容: tailwindcheatsheets.com
   代理状态: 已代理（橙色云朵）
   ```

### 第三步：SSL/TLS配置
1. 进入 SSL/TLS → 概述
2. 选择加密模式：**Full (strict)** 或 **Full**
3. 启用以下选项：
   - Always Use HTTPS
   - HTTP Strict Transport Security (HSTS)
   - Automatic HTTPS Rewrites

### 第四步：配置页面规则
按优先级顺序设置以下页面规则：

1. **HTTPS重定向**
   - URL: `http://tailwindcheatsheets.com/*`
   - 设置: Always Use HTTPS

2. **WWW重定向**
   - URL: `www.tailwindcheatsheets.com/*`
   - 设置: Forwarding URL (301 - Permanent Redirect)
   - 目标: `https://tailwindcheatsheets.com/$1`

3. **静态资源缓存**
   - URL: `tailwindcheatsheets.com/assets/*`
   - 设置: 
     - Cache Level: Cache Everything
     - Edge Cache TTL: 1 year
     - Browser Cache TTL: 1 year

4. **HTML文件缓存**
   - URL: `tailwindcheatsheets.com/*`
   - 设置:
     - Cache Level: Cache Everything
     - Edge Cache TTL: 2 hours
     - Browser Cache TTL: 2 hours

### 第五步：性能优化
1. 进入 Speed → Optimization
2. 启用以下功能：
   - Auto Minify (HTML, CSS, JavaScript)
   - Brotli 压缩
   - Early Hints

### 第六步：安全设置
1. 进入 Security → Settings
2. 配置以下选项：
   - Security Level: Medium
   - Bot Fight Mode: 启用
   - Browser Integrity Check: 启用

## 页面规则 (Page Rules)

### 1. HTTPS重定向
- **URL**: `http://tailwindcheatsheets.com/*`
- **设置**: Always Use HTTPS

### 2. WWW重定向
- **URL**: `www.tailwindcheatsheets.com/*`
- **设置**: Forwarding URL (301 - Permanent Redirect)
- **目标**: `https://tailwindcheatsheets.com/$1`

### 3. 静态资源缓存
- **URL**: `tailwindcheatsheets.com/assets/*`
- **设置**: 
  - Cache Level: Cache Everything
  - Edge Cache TTL: 1 year
  - Browser Cache TTL: 1 year

### 4. HTML文件缓存
- **URL**: `tailwindcheatsheets.com/*`
- **设置**:
  - Cache Level: Cache Everything
  - Edge Cache TTL: 2 hours
  - Browser Cache TTL: 2 hours

## DNS 设置

### A记录
```
Type: A
Name: @
Content: 你的服务器IP地址
TTL: Auto
Proxy status: Proxied (橙色云朵)
```

### CNAME记录 (可选，如果需要www子域名)
```
Type: CNAME
Name: www
Content: tailwindcheatsheets.com
TTL: Auto
Proxy status: Proxied (橙色云朵)
```

## SSL/TLS 设置

### 加密模式
- 选择: **Full (strict)** 或 **Full**
- 如果服务器有有效SSL证书，选择 Full (strict)
- 如果使用自签名证书，选择 Full

### Edge Certificates
- 启用: **Always Use HTTPS**
- 启用: **HTTP Strict Transport Security (HSTS)**
- 启用: **Automatic HTTPS Rewrites**

## 速度优化

### Auto Minify
- 启用: HTML, CSS, JavaScript

### Brotli
- 启用: Brotli 压缩

### Rocket Loader
- 启用: Rocket Loader (可选，可能影响某些JavaScript功能)

## 安全设置

### Security Level
- 设置: Medium

### Bot Fight Mode
- 启用: Bot Fight Mode

### Browser Integrity Check
- 启用: Browser Integrity Check

## 缓存配置

### Caching Level
- 设置: Standard

### Browser Cache TTL
- 设置: 4 hours (对于HTML)
- 设置: 1 year (对于静态资源)

## 防火墙规则 (可选)

### 阻止恶意请求
```
Field: Country
Operator: does not equal
Value: 选择允许的国家列表
Action: Block
```

### 限制请求频率
```
Field: Rate
Operator: greater than
Value: 100 requests per minute
Action: Challenge
```

## 重定向规则 (Redirect Rules)

### SPA路由支持
由于这是单页应用，主要依赖服务器端的nginx配置来处理路由。
Cloudflare的重定向规则主要用于域名重定向。

## 监控和分析

### Analytics
- 启用: Web Analytics
- 查看访问统计和性能指标

### Real User Monitoring (RUM)
- 启用: 实时用户监控
- 监控页面加载性能

## 🔧 SPA路由处理注意事项

### 问题说明
这是一个React单页应用(SPA)，包含以下路由：
- `/` - 主页 (默认v4.1版本)
- `/v4` - Tailwind CSS v4.1
- `/v3` - Tailwind CSS v3.4.17
- `/v2` - Tailwind CSS v2.2.19
- `/v1` - Tailwind CSS v1.9.6
- `/v0` - Tailwind CSS v0.7.4

### 路由处理方案

#### 方案一：服务器端配置 (推荐)
在你的Web服务器中配置重定向规则，将所有路径重定向到 `index.html`：

**Nginx配置示例：**
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache配置示例：**
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

#### 方案二：Cloudflare Workers (高级)
如果无法修改服务器配置，可以使用Cloudflare Workers：

```javascript
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // 如果是静态资源，直接返回
  if (url.pathname.startsWith('/assets/') || 
      url.pathname.includes('.') || 
      url.pathname === '/sitemap.xml' || 
      url.pathname === '/robots.txt') {
    return fetch(request)
  }
  
  // 对于所有其他路径，返回index.html
  const indexUrl = new URL('/', request.url)
  const indexRequest = new Request(indexUrl, request)
  return fetch(indexRequest)
}
```

### 测试路由
部署完成后，测试以下URL是否正常访问：
- https://tailwindcheatsheets.com/
- https://tailwindcheatsheets.com/v4
- https://tailwindcheatsheets.com/v3
- https://tailwindcheatsheets.com/v2
- https://tailwindcheatsheets.com/v1
- https://tailwindcheatsheets.com/v0

### 常见问题解决

1. **404错误**: 确保服务器配置了SPA路由重定向
2. **缓存问题**: 更新后清除Cloudflare缓存
3. **HTTPS问题**: 检查SSL/TLS配置是否正确
4. **性能问题**: 确保静态资源缓存配置正确

## 注意事项

1. **缓存清除**: 更新网站后，记得在Cloudflare控制台清除缓存
2. **开发模式**: 开发时可以启用"Development Mode"暂时绕过缓存
3. **SSL证书**: 如果使用Cloudflare的SSL证书，需要在服务器中配置相应的证书文件
4. **IP白名单**: 可以考虑将Cloudflare的IP范围加入服务器防火墙白名单
5. **SPA路由**: 确保服务器正确配置了单页应用的路由处理
6. **sitemap.xml**: 确保搜索引擎可以正常访问网站地图
7. **robots.txt**: 确保搜索引擎爬虫配置正确