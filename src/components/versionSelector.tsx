import React, { useState, useRef, useEffect } from 'react';

export interface VersionSelectorProps {
  currentVersion: string;
  versions: string[];
  onVersionChange: (version: string) => void;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({ 
  currentVersion, 
  versions, 
  onVersionChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // 点击外部关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="relative inline-block ml-4" ref={dropdownRef}>
      {/* 当前选中版本显示 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-28 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm dark:bg-gray-800 dark:text-gray-200 dark:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-30 transition-colors duration-200"
      >
        <span>v{currentVersion}</span>
        <svg
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute z-10 w-28 mt-1 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {versions.map((version) => (
              <button
                key={version}
                onClick={() => {
                  onVersionChange(version);
                  setIsOpen(false);
                }}
                className={`block w-full px-4 py-2 text-sm text-left ${currentVersion === version ? 'text-primary font-medium bg-gray-100 dark:bg-gray-700' : 'text-gray-700 dark:text-gray-200'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150`}
              >
                v{version}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VersionSelector;
