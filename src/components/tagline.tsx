import React from "react";

interface TaglineProps {
    currentVersion?: string;
}

const Tagline: React.FC<TaglineProps> = ({ currentVersion }) => {
    // 根据当前版本获取版本号显示文本
    const getVersionText = () => {
        if (!currentVersion) return '';
        
        const versionMap: { [key: string]: string } = {
            '4.1': ' V4',
            '3.4.17': ' V3', 
            '2.2.19': ' V2',
            '1.9.6': ' V1',
            '0.7.4': ' V0'
        };
        
        return versionMap[currentVersion] || '';
    };

    return (
        <section className="dark:bg-gray-900 lg:pt-24">
            <h1 className="pt-6 px-4 text-3xl font-semibold text-center text-gray-800 dark:text-gray-200">
                Tailwind Cheat Sheet{getVersionText()}
            </h1>
            <p className="max-w-6xl px-4 mx-auto mt-4 text-base text-center text-gray-500 dark:text-gray-400 md:text-lg">
                The ultimate reference guide for Tailwind CSS classes and utilities. Find any class instantly across all versions.
            </p>
        </section>
    );
};

export default Tagline;
