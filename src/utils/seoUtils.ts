// SEO 工具函数，用于动态更新页面元数据
export const updatePageMetadata = (version: string) => {
    console.log(`开始更新 SEO 元数据，版本: ${version}`);
    
    const versionText = `v${version}`;
    const baseTitle = 'Tailwind CSS Cheat Sheet';
    const baseDescription = 'Tailwind CSS Cheat Sheet - A quick reference guide for Tailwind CSS classes and utilities';
    
    // 更新页面标题
    const newTitle = `${baseTitle} ${versionText} - Quick Reference Guide`;
    document.title = newTitle;
    console.log(`页面标题已更新为: ${newTitle}`);
    
    // 更新描述
    const newDescription = `${baseDescription} for ${versionText}. Complete reference manual with all CSS classes and utilities.`;
    
    // 更新 meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute('content', newDescription);
    }
    
    // 更新 canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
        const baseUrl = 'https://tailwindcheatsheets.com';
        const versionPath = getVersionPath(version);
        canonical.setAttribute('href', `${baseUrl}${versionPath}`);
    }
    
    // 更新 Open Graph 标签
    updateMetaProperty('og:title', newTitle);
    updateMetaProperty('og:description', newDescription);
    updateMetaProperty('og:url', `https://tailwindcheatsheets.com${getVersionPath(version)}`);
    
    // 更新 Twitter 标签
    updateMetaProperty('twitter:title', newTitle);
    updateMetaProperty('twitter:description', newDescription);
    updateMetaProperty('twitter:url', `https://tailwindcheatsheets.com${getVersionPath(version)}`);
    
    // 更新结构化数据
    updateStructuredData(version, newTitle, newDescription);
};

// 辅助函数：更新 meta property
const updateMetaProperty = (property: string, content: string) => {
    const meta = document.querySelector(`meta[property="${property}"]`);
    if (meta) {
        meta.setAttribute('content', content);
    }
};

// 辅助函数：获取版本对应的路径
const getVersionPath = (version: string): string => {
    const versionPathMap: { [key: string]: string } = {
        '4.1': '/v4',
        '3.4.17': '/v3',
        '2.2.19': '/v2',
        '1.9.6': '/v1',
        '0.7.4': '/v0'
    };
    return versionPathMap[version] || '/v4';
};

// 更新结构化数据
const updateStructuredData = (version: string, title: string, description: string) => {
    const scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (scriptTag) {
        try {
            const structuredData = JSON.parse(scriptTag.textContent || '{}');
            const versionPath = getVersionPath(version);
            
            // 更新结构化数据
            structuredData.name = `Tailwind CSS Cheat Sheet v${version}`;
            structuredData.url = `https://tailwindcheatsheets.com${versionPath}`;
            structuredData.description = description;
            
            if (structuredData.potentialAction) {
                structuredData.potentialAction.target = `https://tailwindcheatsheets.com${versionPath}`;
            }
            
            // 更新脚本内容
            scriptTag.textContent = JSON.stringify(structuredData, null, 2);
        } catch (error) {
            console.error('更新结构化数据时出错:', error);
        }
    }
};

// 初始化页面元数据
export const initializePageMetadata = (version: string) => {
    // 在页面加载时设置正确的元数据
    updatePageMetadata(version);
};