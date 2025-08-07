import React, { useRef, useEffect } from 'react';
import Logo from '../images/logo.svg?react';
import { dispatch } from 'use-bus';
import { useLocation } from 'react-router-dom';
import DarkModeToggle from './darkModeToggle';
import VersionSelector from './versionSelector';

let searchTimeout: number | null = null
function clearSearch() {
    if (searchTimeout !== null) {
        clearTimeout(searchTimeout)
    }
}

const useSearchParams = () => {
    return new URLSearchParams(useLocation().search);
}

interface SearchBarProps {
    searchFilter: (text: string) => void;
    currentVersion: string;
    availableVersions: string[];
    onVersionChange: (version: string) => void;
}

const SearchBar = ({ searchFilter, currentVersion, availableVersions, onVersionChange }: SearchBarProps) => {
    const query = useSearchParams().get('q') ?? undefined;

    useEffect(() => {
        searchFilter(query || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 使用传入的当前版本
    const tailwindVersion = currentVersion;
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    const handleFocus = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
            //preventDefault if ctrl + k is already binded to any browser function
            e.preventDefault();
            searchInputRef?.current?.focus();
        }

        if (e.key === "Escape") {
            searchInputRef?.current?.blur();
        }
    };

    useEffect(() => {
        document.addEventListener("keydown", handleFocus);
        return () => {
            document.removeEventListener("keydown", handleFocus);
        };
    }, []);

    // The search is currently very expensive, as it redraws many elements on
    // the screen. This little wrapper adds an artificial delay so that the
    // app doesn't block user input.
    const search = (event: any) => {
        const text: string = event.target.value.toLowerCase();
        if (text.length < 5) {
            clearSearch()
            searchTimeout = window.setTimeout(() => searchFilter(text), 300)
        } else {
            clearSearch()
            searchFilter(text)
        }
    }

    const clearInput = () => {
        const inputElement = searchInputRef?.current
        if (inputElement) {
            inputElement.value = ''
            clearSearch()
            searchFilter('')
        }
    }

    let shouldRenderClearBtn = false
    const length = searchInputRef?.current?.value?.length
    if (length !== undefined && length > 0) {
        shouldRenderClearBtn = true
    }

    return (
        <div className="bg-white dark:bg-gray-900 dark:border-gray-700 lg:fixed lg:w-full lg:top-0 lg:z-50 lg:left-0">
            <div className="w-full p-4 mx-auto">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:space-x-4 w-full">
                    <div className="flex flex-row items-center justify-between">
                        <Logo className="object-cover object-left h-8" />
                        <VersionSelector 
                            currentVersion={currentVersion}
                            versions={availableVersions}
                            onVersionChange={onVersionChange}
                        />
                    </div>

                    <div className="flex items-center mt-4 space-x-3 lg:mt-0 lg:justify-between lg:flex-1">
                        <div className="relative h-10 flex-1 lg:flex-none lg:w-96 xl:w-96 2xl:w-[32rem] lg:mx-auto">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-gray-500 dark:text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                            </div>
                            <input
                                ref={searchInputRef}
                                className="w-full h-full pl-10 text-gray-700 bg-white border border-gray-300 rounded-lg peer dark:bg-gray-900 dark:text-gray-300 dark:border-gray-500 focus:border-primary dark:focus:border-primary focus:outline-none focus:ring focus:ring-primary dark:placeholder-gray-400 focus:ring-opacity-20"
                                type="text"
                                placeholder="Search..."
                                defaultValue={query}
                                onChange={search}
                            />
                            {shouldRenderClearBtn ? (
                                <button onClick={clearInput} className="absolute text-gray-500 -translate-y-1/2 right-2 focus:outline-none top-1/2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </button>
                            ) : (
                                <span className="absolute px-2 py-1 text-xs text-gray-400 transition-opacity duration-75 -translate-y-1/2 border rounded-lg pointer-events-none py- dark:border-gray-700 right-2 top-1/2 peer-focus:opacity-0 dark:text-gray-400 ">
                                    Ctrl k
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-3">
                        <button onClick={() => dispatch('ui/expand')} className="px-4 py-2 text-sm text-gray-600 transition-colors duration-300 transform border border-gray-300 rounded-lg dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">Expand All</button>
                        <button onClick={() => dispatch('ui/collapse')} className="px-4 py-2 text-sm text-gray-600 transition-colors duration-300 transform border border-gray-300 rounded-lg dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">Collapse All</button>
                        <DarkModeToggle />
                    </div>

                    <div className="flex items-center justify-center mt-4 space-x-3 lg:hidden">
                        <button onClick={() => dispatch('ui/expand')} className="px-4 py-2 text-sm text-gray-600 transition-colors duration-300 transform border border-gray-300 rounded-lg dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">Expand <span className="lg:hidden xl:inline">All</span></button>
                        <button onClick={() => dispatch('ui/collapse')} className="px-4 py-2 text-sm text-gray-600 transition-colors duration-300 transform border border-gray-300 rounded-lg dark:text-gray-200 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none">Collapse <span className="lg:hidden xl:inline">All</span></button>
                        <DarkModeToggle />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
