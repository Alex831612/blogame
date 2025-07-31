'use client';
import { useState, useEffect, useCallback, useMemo, JSX } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchModal from './SearchModal';
import ThemeSelector from './ThemeSelector';
import { HeroSection }  from './HeroSection';
import { NavigationMenu }  from './NavigationMenu';

interface HeaderProps {
    categories?: string[];
    showHero?: boolean;
    variant?: 'default' | 'minimal' | 'blog';
}

export default function Header({ 
    categories = [], 
    showHero = true,
    variant = 'default'
}: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

    // Memoizar elementos de navegación
    const navigationItems = useMemo(() => [
        { 
            name: 'Inicio', 
            href: '/',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            )
        },
        { 
            name: 'Acerca de', 
            href: '/about',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        },
        { 
            name: 'Contacto', 
            href: '/contact',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            )
        },
    ], []);

    // Efecto para scroll con throttle
    useEffect(() => {
        let ticking = false;
    
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY > 50);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Atajo de teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K para búsqueda
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
      
            // Escape para cerrar menús
            if (e.key === 'Escape') {
                setIsMenuOpen(false);
                setIsSearchOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Prevenir scroll cuando el menú móvil está abierto
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    // Cerrar menú móvil en cambio de ruta
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Marcar como montado para evitar hydration issues
    useEffect(() => {
        setMounted(true);
    }, []);

    // Handlers memoizados
    const toggleMenu = useCallback(() => {
        setIsMenuOpen(prev => !prev);
    }, []);

    const openSearch = useCallback(() => {
        setIsSearchOpen(true);
        setIsMenuOpen(false);
    }, []);

    const closeSearch = useCallback(() => {
        setIsSearchOpen(false);
    }, []);

    // Clases dinámicas
    const headerClasses = useMemo(() => {
        const base = 'sticky top-0 z-40 transition-all duration-300';
        const scrolled = isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent';
        return `${base} ${scrolled}`;
    }, [isScrolled]);

    if (!mounted) {
        return <HeaderSkeleton showHero={showHero} />;
    }

    return (
        <>
            {/* Hero Section */}
            {showHero && <HeroSection variant={variant} />}

            {/* Header Navigation */}
            <header className={headerClasses} role="banner">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <Logo />

                        {/* Desktop Navigation */}
                        <NavigationMenu
                            items={navigationItems}
                            categories={categories}
                            currentPath={pathname}
                        />

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center space-x-2">
                            <SearchButton onClick={openSearch} />
                            <ThemeSelector variant="toggle" />
                        </div>

                        {/* Mobile Menu Button */}
                        <MobileMenuButton 
                            isOpen={isMenuOpen} 
                            onClick={toggleMenu}
                            className="lg:hidden"
                        />
                    </div>
                    
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMenuOpen}
                navigationItems={navigationItems}
                categories={categories}
                currentPath={pathname}
                onSearchClick={openSearch}
                onLinkClick={() => setIsMenuOpen(false)}
            />

            {/* Search Modal */}
            <SearchModal
                isOpen={isSearchOpen}
                onClose={closeSearch}
            />
        </>
    );
}

// Componente Logo separado
function Logo() {
    return (
        <Link 
            href="/" 
            className="flex items-center space-x-3 group focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg p-1"
            aria-label="BloGame - Ir al inicio"
        >
            <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <span className="text-white font-bold text-lg">B</span>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl opacity-0 group-hover:opacity-30 scale-150 transition-all duration-300 -z-10 blur-md"></div>
            </div>
      
            <div className="hidden sm:block">
                <h1 className="font-bold text-xl text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    BloGame
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                    Videojuegos
                </p>
            </div>
        </Link>
    );
}

// Componente SearchButton separado
interface SearchButtonProps {
    onClick: () => void;
    className?: string;
}

function SearchButton({ onClick, className = '' }: SearchButtonProps) {
    return (
        <button 
            onClick={onClick}
            className={`
                group relative p-2 rounded-lg transition-all duration-300
                text-gray-600 dark:text-gray-300 
                hover:text-orange-600 dark:hover:text-orange-400 
                hover:bg-gray-50 dark:hover:bg-gray-800
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                ${className}
            `}
            title="Buscar artículos (⌘K)"
            aria-label="Abrir búsqueda"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
      
            {/* Keyboard shortcut indicator */}
            <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                <div className="bg-gray-800 dark:bg-gray-600 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-lg">
                    <span className="font-mono">⌘K</span>
                </div>
            </div>
        </button>
    );
}

// Componente MobileMenuButton separado
interface MobileMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
    className?: string;
}

function MobileMenuButton({ isOpen, onClick, className = '' }: MobileMenuButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`
                p-2 rounded-lg transition-all duration-300
                text-gray-600 dark:text-gray-300 
                hover:text-orange-600 dark:hover:text-orange-400 
                hover:bg-gray-50 dark:hover:bg-gray-800
                focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                ${className}
            `}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
        </button>
    );
}

// Componente MobileMenu separado
interface MobileMenuProps {
    isOpen: boolean;
    navigationItems: Array<{ name: string; href: string; icon: JSX.Element }>;
    categories: string[];
    currentPath: string;
    onSearchClick: () => void;
    onLinkClick: () => void;
}

// MobileMenu
function MobileMenu({ 
    isOpen, 
    navigationItems, 
    categories, 
    currentPath, 
    onSearchClick, 
    onLinkClick 
}: MobileMenuProps) {
    const [topPosition, setTopPosition] = useState(64);

    useEffect(() => {
        const updatePosition = () => {
            const header = document.querySelector('header');
            if (header) {
                // Obtener la posición del header relativa al viewport
                const headerRect = header.getBoundingClientRect();
                const headerBottom = headerRect.bottom;
                setTopPosition(headerBottom);
            }
        };

        if (isOpen) {
            // Actualizar posición al abrir
            updatePosition();
            
            // Actualizar en scroll para manejar el cambio de sticky
            const handleScroll = () => {
                updatePosition();
            };

            window.addEventListener('scroll', handleScroll);
            window.addEventListener('resize', updatePosition);

            return () => {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', updatePosition);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div 
            id="mobile-menu"
            className="lg:hidden fixed left-0 right-0 bottom-0 z-50 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-y-auto"
            style={{ top: `${topPosition}px` }}
            role="navigation"
            aria-label="Menú de navegación móvil"
        >
            <div className="px-4 py-6 space-y-4">
                {/* Search Button */}
                <button
                    onClick={onSearchClick}
                    className="flex items-center space-x-3 w-full px-3 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 group"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <span className="font-medium">Buscar artículos</span>
                    <span className="ml-auto text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md font-mono">⌘K</span>
                </button>

                {/* Navigation Links */}
                <nav className="space-y-2">
                    {navigationItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onLinkClick}
                            className={`
                                flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-300 font-medium
                                ${currentPath === item.href
                                    ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                                    : 'text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                }
                            `}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                            {currentPath === item.href && (
                                <div className="ml-auto w-2 h-2 bg-orange-500 rounded-full"></div>
                            )}
                        </Link>
                    ))}
                </nav>

                {/* Categories */}
                {categories.length > 0 && (
                    <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                        <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Categorías
                        </h3>
                        <div className="space-y-1">
                            {categories.map((category) => (
                                <Link
                                    key={category}
                                    href={`/category/${category.toLowerCase()}`}
                                    onClick={onLinkClick}
                                    className="block px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg mx-3"
                                >
                                    {category}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Theme Selector */}
                <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
                    <h3 className="px-3 py-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Apariencia
                    </h3>
                    <div className="px-3">
                        <ThemeSelector variant="buttons" showLabels className="w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Skeleton loader para hidratación
function HeaderSkeleton({ showHero }: { showHero: boolean }) {
    return (
        <>
            {showHero && (
                <div className="h-64 bg-gradient-to-br from-blue-800 to-indigo-900 animate-pulse" />
            )}
            <header className="sticky top-0 z-40 bg-white dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse" />
                            <div className="hidden sm:block">
                                <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                                <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mt-1" />
                            </div>
                        </div>
                        <div className="hidden lg:flex space-x-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            ))}
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                            <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}