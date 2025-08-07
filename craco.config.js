module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // 找到 HtmlWebpackPlugin 实例
      const htmlWebpackPlugin = webpackConfig.plugins.find(
        (plugin) => plugin.constructor.name === 'HtmlWebpackPlugin'
      );
      
      if (htmlWebpackPlugin) {
        // 禁用 HTML 压缩
        htmlWebpackPlugin.options.minify = false;
      }
      
      // 禁用 JavaScript 压缩
      webpackConfig.optimization.minimize = false;
      
      // 优化代码分割配置
      webpackConfig.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 20000,
        maxSize: 200000, // 限制每个分割包的最大大小为 200KB
        cacheGroups: {
          // 将 React 相关库打包到一个文件中
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            name: 'vendor-react',
            priority: 20,
          },
          // 将其他第三方库打包到一个文件中
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: 10,
          },
          // 将 JSON 数据文件单独打包
          jsonData: {
            test: /[\\/]modules[\\/]v[0-9].*\.json$/,
            name: 'json-data',
            priority: 30,
            enforce: true,
          },
        },
      };
      
      // 配置动态导入的 JSON 文件的 chunk 名称
      webpackConfig.output.chunkFilename = 'static/js/[name].[contenthash:8].chunk.js';
      
      // 自定义 HTML 插入点，将 CSS 和 JS 文件插入到指定位置
      if (htmlWebpackPlugin) {
        // 设置脚本加载方式为 defer
        htmlWebpackPlugin.options.scriptLoading = 'defer';
        
        // 自定义插入点
        htmlWebpackPlugin.options.inject = false;
        
        // 自定义模板参数
        htmlWebpackPlugin.options.templateParameters = (compilation, assets, assetTags, options) => {
          // 按照指定顺序排序脚本
          const sortedScripts = [...assetTags.headTags.filter(tag => tag.tagName === 'script')]
            .sort((a, b) => {
              const order = ['main', 'vendor-react', 'vendors', 'json-data'];
              
              // 获取文件名前缀用于排序
              const getChunkPrefix = (src) => {
                for (const prefix of order) {
                  if (src && src.includes(prefix)) {
                    return prefix;
                  }
                }
                return src;
              };
              
              const srcA = a.attributes.src || '';
              const srcB = b.attributes.src || '';
              
              const prefixA = getChunkPrefix(srcA);
              const prefixB = getChunkPrefix(srcB);
              
              // 根据前缀在排序数组中的位置排序
              return order.indexOf(prefixA) - order.indexOf(prefixB);
            });
          
          // 样式标签
          const styles = assetTags.headTags.filter(tag => tag.tagName === 'link' && tag.attributes.rel === 'stylesheet');
          
          return {
            ...options.templateParameters,
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: {
                headTags: assetTags.headTags,
                bodyTags: assetTags.bodyTags,
                styles,
                scripts: sortedScripts,
              },
              files: assets,
              options,
            },
          };
        };
      }
      
      return webpackConfig;
    },
  },
};
