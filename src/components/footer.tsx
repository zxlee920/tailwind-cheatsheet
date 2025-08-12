import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="mt-auto dark:bg-gray-900">
        <div className="container px-6 pt-16 mx-auto">
            <div className="flex flex-col items-center">
                <div className="py-6 text-center sm:w-2/3">
                    {/* 版本链接 */}
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <Link 
                            to="/v4" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            CheatSheet V4
                        </Link>
                        <Link 
                            to="/v3" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            CheatSheet V3
                        </Link>
                        <Link 
                            to="/v2" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            CheatSheet V2
                        </Link>
                        <Link 
                            to="/v1" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            CheatSheet V1
                        </Link>
                        <Link 
                            to="/v0" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            CheatSheet V0
                        </Link>
                    </div>
                    {/* Terms and Privacy links */}
                    <div className="flex flex-wrap justify-center gap-4 mb-4">
                        <Link 
                            to="/terms" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            Terms of Use
                        </Link>
                        <Link 
                            to="/privacy" 
                            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200"
                        >
                            Privacy
                        </Link>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-200">© Copyright {(new Date().getFullYear())}. Tail Cheat Sheet</p>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;
