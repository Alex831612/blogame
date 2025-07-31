import Link from 'next/link';
import { JSX } from 'react';

// Tipo NavigationItem
interface NavigationItem {
    name: string;
    href: string;
    icon?: JSX.Element;
}

interface NavigationMenuProps {
    items: NavigationItem[];
    categories: string[];
    currentPath: string;
    className?: string;
}

export function NavigationMenu({ items, categories, currentPath, className = '' }: NavigationMenuProps) {
    return (
        <nav className={`hidden lg:flex items-center space-x-8 ${className}`}>
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 ${
                        currentPath === item.href
                            ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-900 dark:text-orange-400 font-bold'
                            : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                >
                    {item.icon && (
                        <span className="w-4 h-4">
                            {item.icon}
                        </span>
                    )}
                    <span>{item.name}</span>
                </Link>
            ))}

            {/* Categories Dropdown */}
            {categories.length > 0 && (
                <div className="relative group">
                    <button 
                        className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                        aria-expanded="false"
                        aria-haspopup="true"
                        aria-label="Menú de categorías"
                    >
                        <span>Categorías</span>
                        <svg 
                            className="w-4 h-4 transition-transform group-hover:rotate-180" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                  
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                        <div className="py-2">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/category/${category.toLowerCase()}`}
                                    className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 focus:outline-none focus:bg-orange-50 dark:focus:bg-orange-900/20"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}

// Exportar el tipo para uso en otros componentes
export type { NavigationItem };