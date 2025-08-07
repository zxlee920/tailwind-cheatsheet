// 使用 Puppeteer 爬取 Tailwind CSS 文档
// 安装依赖: npm install puppeteer fs-extra

const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

/**
 * 不同版本的 Tailwind CSS 文档配置
 */
const versionConfigs = {
  '4.1': {
    url: 'https://tailwindcss.com/docs/installation',
    selectors: {
      navCategories: 'nav h3',
      navItems: titleElement => titleElement.nextElementSibling?.querySelectorAll('li a') || [],
      description: [
        'div[data-description="true"]',
        'p[data-description="true"]',
        'main p:first-of-type'
      ],
      tableRows: [
        'table tbody tr',
        '.grid div[role="row"]'
      ],
      tableCells: {
        'table tbody tr': 'td',
        '.grid div[role="row"]': 'div[role="cell"]'
      }
    }
  },
  '3.4.17': {
    url: 'https://v3.tailwindcss.com/docs/installation',
    selectors: {
      navCategories: 'nav h5',
      navItems: titleElement => titleElement.nextElementSibling?.querySelectorAll('li a') || [],
      description: [
        'div[data-description="true"]',
        'header#header p.mt-2',
        'div.prose p:first-of-type'
      ],
      tableRows: [
        'table tbody tr'
      ],
      tableCells: {
        'table tbody tr': 'td'
      }
    }
  },
  '2.2.19': {
    url: 'https://v2.tailwindcss.com/docs',
    selectors: {
      navCategories: 'nav h5',
      navItems: titleElement => titleElement.nextElementSibling?.querySelectorAll('li a') || [],
      description: [
        'div#content-wrapper p:first-of-type',
        'div.markdown p:first-of-type'
      ],
      tableRows: [
        'table tbody tr'
      ],
      tableCells: {
        'table tbody tr': 'td'
      }
    }
  },
  '1.9.6': {
    url: 'https://v1.tailwindcss.com/docs/installation',
    selectors: {
      navCategories: 'nav h5',
      navItems: titleElement => titleElement.nextElementSibling?.querySelectorAll('li a') || [],
      description: [
        'div.markdown p:first-of-type',
        'div.w-full p:first-of-type'
      ],
      tableRows: [
        'table tbody tr'
      ],
      tableCells: {
        'table tbody tr': 'td'
      }
    }
  },
  '0.7.4': {
    url: 'https://tailwindcss-v0.netlify.app/docs/what-is-tailwind/',
    selectors: {
      navCategories: 'nav#nav p',
      navItems: titleElement => {
        // v0 版本的导航结构不同，需要特殊处理
        const nextElement = titleElement.nextElementSibling;
        if (nextElement && nextElement.tagName === 'UL') {
          return nextElement.querySelectorAll('li a');
        }
        return [];
      },
      description: [
        'div#content-wrapper div.text-xl',
        'div.markdown p:first-of-type'
      ],
      tableRows: [
        'table tbody tr'
      ],
      tableCells: {
        'table tbody tr': 'td'
      }
    }
  }
};

/**
 * 爬取 Tailwind CSS 文档并生成备忘录 JSON 文件
 * @param {string} version - Tailwind 版本号，如 "4.1"
 */
async function crawlTailwindDocs(version) {
  // 获取版本对应的配置
  const config = versionConfigs[version];
  if (!config) {
    console.error(`错误: 不支持的版本 ${version}`);
    return null;
  }
  
  const docsUrl = config.url;
  
  console.log(`\n====================================`);
  console.log(`开始爬取 Tailwind CSS ${version} 文档...`);
  console.log(`文档地址: ${docsUrl}`);
  console.log(`====================================\n`);
  
  // 确保输出目录存在
  const outputDir = path.join(process.cwd(), 'src', 'modules', 'crawled');
  await fs.ensureDir(outputDir);
  
  const browser = await puppeteer.launch({
    headless: 'new', // 使用新的无头模式
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // 设置视口大小
    await page.setViewport({ width: 1280, height: 800 });
    
    // 访问文档首页
    console.log(`访问文档首页: ${docsUrl}`);
    await page.goto(docsUrl, { waitUntil: 'networkidle2', timeout: 60000 });
    
    // 等待导航菜单加载
    await page.waitForSelector('nav', { timeout: 10000 });
    
    // 提取分类和链接
    console.log('提取导航菜单...');
    
    // 将选择器信息传递给浏览器执行环境
    const categories = await page.evaluate((navCategorySelector) => {
      const result = [];
      
      // 查找所有分类标题
      const categoryTitles = Array.from(document.querySelectorAll(navCategorySelector));
      
      categoryTitles.forEach(titleElement => {
        const title = titleElement.textContent.trim();
        const items = [];
        
        // 查找该分类下的所有链接
        // 注意：由于不能直接将函数传递给evaluate，所以在这里重新实现选择器逻辑
        let linkElements = [];
        const nextElement = titleElement.nextElementSibling;
        
        if (nextElement && nextElement.tagName === 'UL') {
          // v0 和其他版本的导航结构
          linkElements = Array.from(nextElement.querySelectorAll('li a'));
        } else if (nextElement) {
          // 其他可能的结构
          linkElements = Array.from(nextElement.querySelectorAll('a'));
        }
        
        linkElements.forEach(linkElement => {
          const itemTitle = linkElement.textContent.trim();
          const url = linkElement.href;
          
          items.push({
            title: itemTitle,
            url: url
          });
        });
        
        if (items.length > 0) {
          result.push({
            title: title,
            children: items
          });
        }
      });
      
      return result;
    }, config.selectors.navCategories);
    
    console.log(`成功提取 ${categories.length} 个分类`);
    
    // 爬取每个页面的详细内容
    console.log('开始爬取详细页面内容...');
    for (const category of categories) {
      console.log(`正在处理分类: ${category.title}`);
      
      for (const item of category.children) {
        console.log(`  - 爬取: ${item.title} (${item.url})`);
        
        try {
          // 访问页面
          await page.goto(item.url, { waitUntil: 'networkidle2', timeout: 30000 });
          
          // 提取描述和表格数据
          const pageData = await page.evaluate((config) => {
            // 尝试获取描述
            let description = '';
            
            // 尝试所有可能的描述选择器
            for (const selector of config.description) {
              const element = document.querySelector(selector);
              if (element) {
                description = element.textContent.trim();
                if (description) break;
              }
            }
            
            // 如果找不到描述，使用标题生成一个
            if (!description && document.querySelector('h1')) {
              const title = document.querySelector('h1').textContent.trim();
              description = `Utilities for ${title.toLowerCase()}.`;
            }
            
            // 尝试获取表格数据
            const tableData = [];
            
            // 尝试所有可能的表格行选择器
            for (const rowSelector of config.tableRows) {
              const rows = document.querySelectorAll(rowSelector);
              if (rows.length > 0) {
                const cellSelector = config.tableCells[rowSelector];
                if (cellSelector) {
                  rows.forEach(row => {
                    const cells = row.querySelectorAll(cellSelector);
                    if (cells.length >= 2) {
                      const className = cells[0].textContent.trim();
                      const properties = cells[1].textContent.trim();
                      if (className && properties) {
                        tableData.push([className, properties]);
                      }
                    }
                  });
                  
                  // 如果找到了表格数据，就不再尝试其他选择器
                  if (tableData.length > 0) break;
                }
              }
            }
            
            return {
              description,
              tableData
            };
          }, config.selectors);
          
          // 添加到项目中
          item.description = pageData.description;
          item.table = pageData.tableData;
          
        } catch (err) {
          console.error(`  ❌ 爬取失败: ${item.url}`, err.message);
        }
        
        // 添加延迟，避免请求过于频繁
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    // 转换为项目所需的数据格式
    const formattedData = formatDataForCheatsheet(categories);
    
    // 保存到文件
    const outputFile = path.join(outputDir, `v${version}.json`);
    await fs.writeJson(outputFile, formattedData, { spaces: 2 });
    
    console.log(`✅ 爬取完成！数据已保存到 ${outputFile}`);
    console.log(`您可以比较 src/modules/v${version}.json（手动）和 ${outputFile}（爬虫）的区别`);
    
  } catch (error) {
    console.error('❌ 爬取过程中发生错误:', error);
  } finally {
    await browser.close();
  }
}

/**
 * 将爬取的数据转换为备忘录项目所需的格式
 * @param {Array} categories - 分类数据
 * @returns {Array} - 格式化后的数据
 */
function formatDataForCheatsheet(categories) {
  return categories.map(category => {
    return {
      title: category.title,
      content: category.children.map(item => {
        return {
          title: item.title,
          docs: item.url,
          description: item.description || '',
          table: item.table || []
        };
      })
    };
  });
}

/**
 * 爬取多个版本的 Tailwind CSS 文档
 * @param {Array} versions - 要爬取的版本列表
 */
async function crawlMultipleVersions(versions) {
  console.log(`开始爬取 ${versions.length} 个版本的 Tailwind CSS 文档...`);
  
  for (const version of versions) {
    try {
      await crawlTailwindDocs(version);
      console.log(`\n版本 ${version} 爬取完成!\n`);
      
      // 添加延迟，避免过快连续爬取
      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error(`版本 ${version} 爬取失败: ${error.message}`);
    }
  }
  
  console.log('\n所有版本爬取完成!');
}

// 如果直接运行该文件，执行爬取
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length > 0 && args[0] === '--all') {
    // 爬取所有支持的版本
    const allVersions = Object.keys(versionConfigs);
    crawlMultipleVersions(allVersions)
      .then(() => process.exit(0))
      .catch(err => {
        console.error('爬取过程中发生错误:', err);
        process.exit(1);
      });
  } else {
    // 爬取单个版本
    const version = args[0] || '4.1';
    
    crawlTailwindDocs(version)
      .then(() => process.exit(0))
      .catch(err => {
        console.error('爬取过程中发生错误:', err);
        process.exit(1);
      });
  }
}
