'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// Constantes
const SEARCH_DEBOUNCE_MS = 300;
const MAX_VISIBLE_TAGS = 3;
const SCROLL_BEHAVIOR = 'smooth' as const;

interface Post {
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
    date: string;
    alt: string;
    tags: string[];
}

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Custom hook para debounce
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

// Custom hook para búsqueda con API
function useSearchAPI(searchTerm: string) {
    const [results, setResults] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!searchTerm.trim()) {
            setResults([]);
            setIsLoading(false);
            setError(null);
            return;
        }

        const searchPosts = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
                
                console.log('Response status:', response.status);
                console.log('Response statusText:', response.statusText);
                
                if (!response.ok) {
                    const errorData = await response.text();
                    console.error('API Error:', errorData);
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log('Search results:', data);
                setResults(data.posts || []);
            } catch (err) {
                console.error('Search error:', err);
                setError(err instanceof Error ? err.message : 'Error al buscar. Inténtalo de nuevo.');
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        searchPosts();
    }, [searchTerm]);

    return { results, isLoading, error };
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const resultsRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Debounced search term para optimizar performance
    const debouncedSearchTerm = useDebounce(searchTerm, SEARCH_DEBOUNCE_MS);
    
    // Usar custom hook para la búsqueda API
    const { results: filteredPosts, isLoading, error } = useSearchAPI(debouncedSearchTerm);

    // Reset índice seleccionado cuando cambian los resultados
    useEffect(() => {
        setSelectedIndex(0);
    }, [filteredPosts]);

    // Manejar navegación con teclado
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!isOpen) return;

        switch (e.key) {
            case 'Escape':
                onClose();
                break;
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < filteredPosts.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : prev);
                break;
            case 'Enter':
                e.preventDefault();
                if (filteredPosts[selectedIndex]) {
                    router.push(`/post/${filteredPosts[selectedIndex].slug}`);
                    handleClose();
                }
                break;
        }
    }, [isOpen, filteredPosts, selectedIndex, onClose, router]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    // Auto-focus en el input cuando se abre
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    // Scroll automático del item seleccionado
    useEffect(() => {
        if (resultsRef.current && filteredPosts.length > 0) {
            const selectedElement = resultsRef.current.children[selectedIndex] as HTMLElement;
            if (selectedElement) {
                selectedElement.scrollIntoView({
                    behavior: SCROLL_BEHAVIOR,
                    block: 'nearest'
                });
            }
        }
    }, [selectedIndex, filteredPosts.length]);

    // Reset estado al cerrar
    const handleClose = useCallback(() => {
        setSearchTerm('');
        setSelectedIndex(0);
        onClose();
    }, [onClose]);

    // Handler para errores de imagen
    const handleImageError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = 'https://placehold.co/600x400@2x.png';
    }, []);

    // Handler para limpiar búsqueda
    const handleClearSearch = useCallback(() => {
        setSearchTerm('');
        searchInputRef.current?.focus();
    }, []);

    // Debug handler
    const handleOverlayClick = useCallback((e: React.MouseEvent) => {
        console.log('Overlay clicked');
        handleClose();
    }, [handleClose]);

    const handleModalClick = useCallback((e: React.MouseEvent) => {
        console.log('Modal clicked');
        e.stopPropagation();
    }, []);

    const handleResultClick = useCallback((e: React.MouseEvent, slug: string) => {
        console.log('Result clicked:', slug);
        e.stopPropagation();
        router.push(`/post/${slug}`);
        handleClose();
    }, [router, handleClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={handleOverlayClick}
                aria-label="Cerrar modal de búsqueda"
            />
            
            {/* Modal Container */}
            <div className="flex min-h-full items-start justify-center p-4 pt-16 relative z-10">
                <div 
                    className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 shadow-2xl transition-all"
                    role="dialog"
                    aria-labelledby="search-title"
                    aria-describedby="search-description"
                    onClick={handleModalClick}
                >
                    
                    {/* Search Input */}
                    <div className="border-b border-gray-200 dark:border-gray-700 p-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                {isLoading ? (
                                    <svg 
                                        className="h-5 w-5 text-orange-500 animate-spin" 
                                        fill="none" 
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                                        <path fill="currentColor" d="m12 2 A10,10 0 0,1 22,12" className="opacity-75"/>
                                    </svg>
                                ) : (
                                    <svg 
                                        className="h-5 w-5 text-gray-400 dark:text-gray-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                )}
                            </div>
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar posts por título, contenido, categoría, autor o tags..."
                                className="w-full pl-10 pr-4 py-3 text-lg border-0 ring-0 focus:ring-0 focus:outline-none placeholder-gray-400 dark:placeholder-gray-500 bg-transparent text-gray-900 dark:text-white"
                                aria-label="Campo de búsqueda"
                                aria-describedby="search-description"
                            />
                            {searchTerm && (
                                <button
                                    onClick={handleClearSearch}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-colors"
                                    aria-label="Limpiar búsqueda"
                                >
                                    <svg 
                                        className="h-5 w-5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Results */}
                    <div 
                        className="max-h-96 overflow-y-auto" 
                        ref={resultsRef}
                        role="listbox"
                        aria-label="Resultados de búsqueda"
                        id="search-results"
                    >
                        {!debouncedSearchTerm.trim() ? (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                <svg 
                                    className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <p className="text-lg font-medium" id="search-title">Busca en el blog</p>
                                <p className="text-sm" id="search-description">Escribe para encontrar posts por título, contenido completo, categoría, autor o tags</p>
                            </div>
                        ) : error ? (
                            <div className="p-8 text-center text-red-500 dark:text-red-400">
                                <svg 
                                    className="mx-auto h-12 w-12 text-red-300 dark:text-red-600 mb-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-lg font-medium">Error en la búsqueda</p>
                                <p className="text-sm">{error}</p>
                            </div>
                        ) : isLoading ? (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                <svg 
                                    className="mx-auto h-12 w-12 text-orange-500 animate-spin mb-4" 
                                    fill="none" 
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25"/>
                                    <path fill="currentColor" d="m12 2 A10,10 0 0,1 22,12" className="opacity-75"/>
                                </svg>
                                <p className="text-lg font-medium">Buscando...</p>
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                                <svg 
                                    className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-4" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467.896-6.072 2.364l-.465.465a.121.121 0 01-.182-.013C3.056 15.835 2 12.837 2 9.5 2 4.253 6.477 0 12 0s10 4.253 10 9.5c0 3.337-1.056 6.335-3.281 8.316a.121.121 0 01-.182.013l-.465-.465z" />
                                </svg>
                                <p className="text-lg font-medium">No se encontraron resultados</p>
                                <p className="text-sm">Intenta con diferentes términos de búsqueda</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100 dark:divide-gray-700">
                                {filteredPosts.map((post, index) => (
                                    <div
                                        key={post.slug}
                                        onClick={(e) => handleResultClick(e, post.slug)}
                                        className={`block p-4 transition-colors duration-200 cursor-pointer ${
                                            index === selectedIndex 
                                                ? 'bg-orange-50 dark:bg-orange-900/30 border-l-4 border-orange-400 dark:border-orange-500' 
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                        role="option"
                                        aria-selected={index === selectedIndex}
                                        tabIndex={-1}
                                    >
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={post.image}
                                                alt={post.alt || post.title}
                                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                                loading="lazy"
                                                onError={handleImageError}
                                            />
                                            <div className="flex-1 min-w-0">
                                                <h3 className={`font-medium text-gray-900 dark:text-white line-clamp-2 ${
                                                    index === selectedIndex ? 'text-orange-900 dark:text-orange-400' : ''
                                                }`}>
                                                    {post.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                                                    {post.excerpt}
                                                </p>
                                                <div className="flex items-center flex-wrap mt-2 text-xs text-gray-500 dark:text-gray-400 space-x-4">
                                                    <span className="bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 px-2 py-1 rounded">
                                                        {post.category}
                                                    </span>
                                                    <span>{post.author}</span>
                                                    <span>{post.readTime}</span>
                                                    {post.tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-1 ml-2">
                                                            {post.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
                                                                <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded text-xs">
                                                                    #{tag}
                                                                </span>
                                                            ))}
                                                            {post.tags.length > MAX_VISIBLE_TAGS && (
                                                                <span className="text-gray-400 dark:text-gray-500 text-xs">
                                                                    +{post.tags.length - MAX_VISIBLE_TAGS}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    {filteredPosts.length > 0 && (
                        <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 text-xs text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
                            <div className="flex justify-between items-center">
                                <span>
                                    {filteredPosts.length} resultado{filteredPosts.length !== 1 ? 's' : ''}
                                </span>
                                <div className="flex items-center space-x-4">
                                    <span className="flex items-center">
                                        <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded mr-1 text-xs">
                                            ↑↓
                                        </kbd>
                                        Navegar
                                    </span>
                                    <span className="flex items-center">
                                        <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded mr-1 text-xs">
                                            Enter
                                        </kbd>
                                        Abrir
                                    </span>
                                    <span className="flex items-center">
                                        <kbd className="px-2 py-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded mr-1 text-xs">
                                            Esc
                                        </kbd>
                                        Cerrar
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}