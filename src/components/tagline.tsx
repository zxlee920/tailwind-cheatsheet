import React from "react";
import { useLocation } from "react-router-dom";

const Tagline = () => {
    const location = useLocation();
    
    // 根据路径获取版本号
    const getVersionText = () => {
        const path = location.pathname;
        if (path === '/v4') return ' V4';
        if (path === '/v3') return ' V3';
        if (path === '/v2') return ' V2';
        if (path === '/v1') return ' V1';
        if (path === '/v0') return ' V0';
        return ''; // 默认首页显示
    };

    return (
        <section className="dark:bg-gray-900 lg:pt-24">
            <h1 className="pt-6 px-4 text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">
                Tailwind CSS Cheat Sheet{getVersionText()}
            </h1>
            <p className="max-w-6xl px-4 mx-auto mt-4 text-base text-center text-gray-500 dark:text-gray-400 md:text-lg">
                The ultimate reference guide for Tailwind CSS classes and utilities. Find any class instantly across all versions.
            </p>
        </section>
    );
};

export default Tagline;
