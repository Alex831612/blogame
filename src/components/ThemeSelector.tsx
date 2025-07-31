'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from './ThemeContext';

interface ThemeOption {
    value: 'light' | 'dark' | 'system';
    label: string;
    description: string;
    icon: React.ReactElement;
}

interface ThemeSelectorProps {
    variant?: 'dropdown' | 'toggle' | 'buttons';
    showLabels?: boolean;
    className?: string;
}

export default function ThemeSelector({ 
    variant = 'dropdown',
    showLabels = false,
    className = ''
}: ThemeSelectorProps) {
    const { theme, effectiveTheme, setTheme, isLoading } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Configuración de temas disponibles
    const themes: ThemeOption[] = React.useMemo(() => [
        {
            value: 'light',
            label: 'Claro',
            description: 'Tema claro para mejor visibilidad durante el día',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
        },
        {
            value: 'dark',
            label: 'Oscuro',
            description: 'Tema oscuro para reducir fatiga visual',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
            ),
        },
        {
            value: 'system',
            label: 'Sistema',
            description: 'Usar preferencia del sistema operativo',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
    ], []);

    // Cerrar dropdown al hacer clic fuera
    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (
            dropdownRef.current && 
            !dropdownRef.current.contains(event.target as Node) &&
            buttonRef.current &&
            !buttonRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    }, []);

    // Manejo de teclado para accesibilidad
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!isOpen) return;

        switch (event.key) {
            case 'Escape':
                setIsOpen(false);
                buttonRef.current?.focus();
                break;
            case 'ArrowDown':
                event.preventDefault();
                // Focus en el primer elemento del dropdown
                const firstItem = dropdownRef.current?.querySelector('button[role="menuitem"]') as HTMLButtonElement;
                firstItem?.focus();
                break;
        }
    }, [isOpen]);

    // Event listeners
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleKeyDown);
      
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                document.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [isOpen, handleClickOutside, handleKeyDown]);

    // Manejar cambio de tema
    const handleThemeChange = useCallback((newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
        setIsOpen(false);
    
        // Anunciar cambio para screen readers
        const announcement = `Tema cambiado a ${themes.find(t => t.value === newTheme)?.label}`;
        const announcer = document.createElement('div');
        announcer.setAttribute('aria-live', 'polite');
        announcer.setAttribute('aria-atomic', 'true');
        announcer.className = 'sr-only';
        announcer.textContent = announcement;
        document.body.appendChild(announcer);
    
        setTimeout(() => {
            document.body.removeChild(announcer);
        }, 1000);
    }, [setTheme, themes]);

    // Toggle simple para alternar entre light/dark
    if (variant === 'toggle') {
        return (
            <button
                onClick={() => handleThemeChange(effectiveTheme === 'dark' ? 'light' : 'dark')}
                className={`
                    p-2 rounded-lg transition-all duration-300 
                    text-gray-600 dark:text-gray-300 
                    hover:text-orange-600 dark:hover:text-orange-400 
                    hover:bg-gray-50 dark:hover:bg-gray-800
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${className}
                `}
                title={`Cambiar a tema ${effectiveTheme === 'dark' ? 'claro' : 'oscuro'}`}
                disabled={isLoading}
                aria-label={`Cambiar a tema ${effectiveTheme === 'dark' ? 'claro' : 'oscuro'}`}
            >
                {effectiveTheme === 'dark' ? themes[0].icon : themes[1].icon}
                {showLabels && (
                    <span className="ml-2 text-sm">
                        {effectiveTheme === 'dark' ? 'Claro' : 'Oscuro'}
                    </span>
                )}
            </button>
        );
    }

    // Botones en línea
    if (variant === 'buttons') {
        return (
            <div className={`flex gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg ${className}`}>
                {themes.map((themeOption) => (
                    <button
                        key={themeOption.value}
                        onClick={() => handleThemeChange(themeOption.value)}
                        className={`
                            flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${theme === themeOption.value
                                ? 'bg-white dark:bg-gray-700 text-orange-600 dark:text-orange-400 shadow-sm'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                            }
                        `}
                        disabled={isLoading}
                        aria-pressed={theme === themeOption.value}
                        title={themeOption.description}
                    >
                        {themeOption.icon}
                        {showLabels && themeOption.label}
                    </button>
                ))}
            </div>
        );
    }
}