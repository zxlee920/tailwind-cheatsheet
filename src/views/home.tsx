import React, { useState, useEffect, lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';

import Category from '../modules/models/category';
import Subcategory from '../modules/models/subcategory';

import { trackView, trackSearch } from '../utils/googleAnalytics';
import { updatePageMetadata, initializePageMetadata } from '../utils/seoUtils';

import SearchBar from '../components/searchBar';
import Categories from '../components/categories';
import Footer from '../components/footer';
import Tagline from '../components/tagline';

// 预加载默认版本数据（v4.1）
import v41Data from '../modules/v4.1.json';

const Home = () => {
    const location = useLocation();
    
    // 可用的 Tailwind CSS 版本（从高到低排序）
    const availableVersions = ['4.1', '3.4.17', '2.2.19', '1.9.6', '0.7.4'];
    
    // 根据路径确定版本
    const getVersionFromPath = (pathname: string): string => {
        const pathVersionMap: { [key: string]: string } = {
            '/v4': '4.1',
            '/v3': '3.4.17', 
            '/v2': '2.2.19',
            '/v1': '1.9.6',
            '/v0': '0.7.4'
        };
        return pathVersionMap[pathname] || '4.1';
    };
    
    // 从路径或 localStorage 获取版本
    const [currentVersion, setCurrentVersion] = useState<string>(() => {
        const pathVersion = getVersionFromPath(location.pathname);
        if (pathVersion !== '4.1') {
            return pathVersion;
        }
        const savedVersion = localStorage.getItem('tailwindVersion');
        return savedVersion && availableVersions.includes(savedVersion) ? savedVersion : '4.1';
    });
    
    // 监听路径变化，自动切换版本
    useEffect(() => {
        const pathVersion = getVersionFromPath(location.pathname);
        if (pathVersion !== currentVersion) {
            setCurrentVersion(pathVersion);
            // 立即加载对应版本的数据
            const loadData = async () => {
                const newData = await loadVersionData(pathVersion);
                setJson(newData);
                setCheatsheet(newData);
                localStorage.setItem('tailwindVersion', pathVersion);
                // 更新页面 SEO 元数据
                updatePageMetadata(pathVersion);
            };
            loadData();
        }
    }, [location.pathname]);
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [json, setJson] = useState<Category[]>(currentVersion === '4.1' ? v41Data : []);
    const [cheatsheet, setCheatsheet] = useState<Category[]>(currentVersion === '4.1' ? v41Data : []);

    useEffect(() => {
        trackView('/cheatsheet');
        // 初始化页面元数据，使用当前路径确定的版本
        const pathVersion = getVersionFromPath(location.pathname);
        initializePageMetadata(pathVersion);
    }, []);
    
    // 确保在 currentVersion 变化时立即更新 SEO 元数据
    useEffect(() => {
        updatePageMetadata(currentVersion);
    }, [currentVersion]);
    
    // 动态加载版本数据
    const loadVersionData = async (version: string) => {
        if (version === '4.1') {
            return v41Data; // 使用预加载的 v4.1 数据
        }
        
        setIsLoading(true);
        try {
            // 动态导入其他版本的数据
            let module;
            switch (version) {
                case '3.4.17':
                    module = await import('../modules/v3.4.17.json');
                    break;
                case '2.2.19':
                    module = await import('../modules/v2.2.19.json');
                    break;
                case '1.9.6':
                    module = await import('../modules/v1.9.6.json');
                    break;
                case '0.7.4':
                    module = await import('../modules/v0.7.4.json');
                    break;
                default:
                    throw new Error(`不支持的版本: ${version}`);
            }
            setIsLoading(false);
            return module.default || module;
        } catch (error) {
            console.error(`无法加载版本 ${version} 的数据:`, error);
            setIsLoading(false);
            // 如果加载失败，回退到默认版本
            if (version !== '4.1') {
                setCurrentVersion('4.1');
                return v41Data;
            }
            return [];
        }
    };
    
    // 当版本变化时重新加载数据
    useEffect(() => {
        const loadData = async () => {
            const newData = await loadVersionData(currentVersion);
            setJson(newData);
            setCheatsheet(newData);
            // 保存当前选择的版本到 localStorage
            localStorage.setItem('tailwindVersion', currentVersion);
            // 更新页面 SEO 元数据
            updatePageMetadata(currentVersion);
        };
        
        loadData();
    }, [currentVersion]);
    
    // 处理版本变更
    const handleVersionChange = (version: string) => {
        setCurrentVersion(version);
        // 同时更新 URL 路径
        const versionPathMap: { [key: string]: string } = {
            '4.1': '/v4',
            '3.4.17': '/v3', 
            '2.2.19': '/v2',
            '1.9.6': '/v1',
            '0.7.4': '/v0'
        };
        const newPath = versionPathMap[version] || '/';
        if (location.pathname !== newPath) {
            window.history.pushState(null, '', newPath);
        }
    };

    const search = (text: string) => {
        // 如果搜索文本为空，不添加匹配标记，直接恢复原始数据
        if (!text) {
            if (window.history?.pushState) {
                const { origin, pathname } = window.location;
                window.history.pushState({ path: `${origin}${pathname}` }, '', `${origin}${pathname}`);
            }
            setCheatsheet(json);
            trackSearch('');
            return;
        }

        const searchText = text.toLowerCase();
        let newCheatsheet: Category[] = json.map((category: Category) => {
            if (window.history?.pushState) {
                const { origin, pathname } = window.location;
                const newUrl = `${origin}${pathname}${searchText ? `?q=${searchText}` : ''}`;
                window.history.pushState({ path: newUrl }, '', newUrl);
            }

            // 检查类别标题是否匹配
            const categoryMatch = category.title.toLowerCase().includes(searchText);
            
            return {
                title: category.title,
                content: category.content.map((subcategory: Subcategory) => {
                    // 检查子类别标题或描述是否匹配
                    const titleMatch = subcategory.title.toLowerCase().includes(searchText);
                    const descriptionMatch = subcategory.description.toLowerCase().includes(searchText);
                    
                    if (titleMatch || descriptionMatch) {
                        // 如果标题或描述匹配，添加匹配标记并保留整个表格
                        return {
                            ...subcategory,
                            hasMatch: true
                        };
                    } else {
                        // 检查表格内容是否匹配
                        const filteredTable = subcategory.table.filter((tr) => {
                            for (let td = 0; td < tr.length; td++) {
                                if (tr[td].toLowerCase().includes(searchText)) {
                                    return true;
                                }
                            }
                            return false;
                        });
                        
                        // 如果表格有匹配项，添加匹配标记并过滤表格
                        return {
                            title: subcategory.title,
                            docs: subcategory.docs,
                            description: subcategory.description,
                            table: filteredTable,
                            hasMatch: filteredTable.length > 0
                        };
                    }
                })
            };
        });

        // 不再过滤掉没有匹配项的类别，而是保留所有类别标题
        // 这样即使没有匹配项，类别标题仍然会显示

        setCheatsheet(newCheatsheet);
        trackSearch(searchText);
    };

    return (
        <main className="tracking-wide font-roboto min-h-screen grid content-start dark:bg-gray-900">
            <div className="max-w-6xl mx-auto w-full">
                <SearchBar 
                    searchFilter={search} 
                    currentVersion={currentVersion}
                    availableVersions={availableVersions}
                    onVersionChange={handleVersionChange}
                />
                <Tagline currentVersion={currentVersion} />
                <Categories cheatsheet={cheatsheet} />
                <Footer />
            </div>
        </main>
    );
}

export default Home;