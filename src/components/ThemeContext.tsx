'use client';
import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    effectiveTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook principal para usar el tema en componentes
export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}

interface ThemeProviderProps {
    children: ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
}

export function ThemeProvider({ 
    children, 
    defaultTheme = 'system',
    storageKey = 'theme',
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(defaultTheme);
    const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
    const [isLoading, setIsLoading] = useState(true);

    // Función para obtener el tema del sistema
    const getSystemTheme = useCallback((): 'light' | 'dark' => {
        if (typeof window !== 'undefined') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    }, []);

    // Función para aplicar el tema
    const applyTheme = useCallback((newTheme: Theme) => {
        let resolvedTheme: 'light' | 'dark';
    
        if (newTheme === 'system') {
            resolvedTheme = getSystemTheme();
        } else {
            resolvedTheme = newTheme;
        }

        setEffectiveTheme(resolvedTheme);
    
        // Aplicar tema al HTML element
        if (typeof document !== 'undefined') {
            const html = document.documentElement;
            
            // Aplicar clase al HTML
            html.classList.remove('light', 'dark');
            html.classList.add(resolvedTheme);
            
            // Actualizar atributo data-theme como respaldo adicional
            html.setAttribute('data-theme', resolvedTheme);
            
        }
    }, [getSystemTheme]);

    // Guarda/lee del localStorage
    const getStoredTheme = useCallback((): Theme | null => {
        if (typeof window === 'undefined') return null;
        
        try {
            return localStorage.getItem(storageKey) as Theme;
        } catch (error) {
            console.warn('Error reading theme from localStorage:', error);
            return null;
        }
    }, [storageKey]);

    const setStoredTheme = useCallback((value: Theme) => {
        if (typeof window === 'undefined') return;
        
        try {
            localStorage.setItem(storageKey, value);
        } catch (error) {
            console.warn('Error saving theme to localStorage:', error);
        }
    }, [storageKey]);

    // Cargar tema inicial
    useEffect(() => {
        let savedTheme: Theme = defaultTheme;
        
        // Intentar cargar tema guardado
        const storedTheme = getStoredTheme();
        
        if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
            savedTheme = storedTheme;
        }

        setTheme(savedTheme);
        applyTheme(savedTheme);
        setIsLoading(false);
    }, [defaultTheme, getStoredTheme, applyTheme]);

    // Escuchar cambios del tema del sistema
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
        const handleChange = (e: MediaQueryListEvent) => {
            // Solo actualizar si el tema está en 'system'
            if (theme === 'system') {
                const newSystemTheme = e.matches ? 'dark' : 'light';
                setEffectiveTheme(newSystemTheme);
                
                // Aplicar cambio inmediatamente
                if (typeof document !== 'undefined') {
                    const html = document.documentElement;
                    html.classList.remove('light', 'dark');
                    html.classList.add(newSystemTheme);
                    html.setAttribute('data-theme', newSystemTheme);
                    
                    // También al body
                    document.body.classList.remove('light', 'dark');
                    document.body.classList.add(newSystemTheme);
                }
            }
        };

        // Usar addEventListener si está disponible
        if (mediaQuery.addEventListener) {
            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme]);

    // Función para cambiar tema
    const changeTheme = useCallback((newTheme: Theme) => {
        // Validar tema
        if (!['light', 'dark', 'system'].includes(newTheme)) {
            console.warn(`Invalid theme: ${newTheme}`);
            return;
        }

        setTheme(newTheme);
        applyTheme(newTheme);
        setStoredTheme(newTheme);
    
        // Dispatch custom event para otros componentes
        if (typeof window !== 'undefined') {
            const effectiveThemeValue = newTheme === 'system' ? getSystemTheme() : newTheme;
            window.dispatchEvent(new CustomEvent('themeChange', { 
                detail: { theme: newTheme, effectiveTheme: effectiveThemeValue }
            }));
        }
    }, [applyTheme, setStoredTheme, getSystemTheme]);

    // Inicialización para evitar hydration mismatch
    useEffect(() => {
        // Aplicar tema inmediatamente en el cliente
        if (typeof document !== 'undefined' && !isLoading) {
            applyTheme(theme);
        }
    }, [theme, applyTheme, isLoading]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                effectiveTheme,
                setTheme: changeTheme,
                isLoading,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}
