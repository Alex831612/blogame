import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Analytics from '@/components/Analytics';
import SkipLinks from '@/components/SkipLinks';
import JsonLd from '@/components/JsonLd';

// Configuración de fuente
const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter',
});

// Metadata completa para SEO
export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://blogame.vercel.app'),
    title: {
        template: '%s | BloGame - Blog de Videojuegos',
        default: 'BloGame - Blog de Videojuegos',
    },
    description: 'Tu blog favorito sobre videojuegos, reviews, análisis y noticias. Descubre los mejores juegos, guías completas y las últimas novedades del mundo gaming.',
    keywords: [
        'videojuegos',
        'gaming',
        'reviews',
        'análisis',
        'noticias gaming',
        'guías videojuegos',
        'blog gaming',
        'PlayStation',
        'Xbox',
        'Nintendo',
        'PC gaming'
    ],
    authors: [{ name: 'Alex', url: 'https://blogame.vercel.app/about' }],
    creator: 'Alex - BloGame',
    publisher: 'BloGame',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'es_ES',
        url: 'https://blogame.vercel.app',
        siteName: 'BloGame',
        title: 'BloGame - Blog de Videojuegos',
        description: 'Tu blog favorito sobre videojuegos, reviews, análisis y noticias del mundo gaming.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'BloGame - Blog de Videojuegos',
                type: 'image/jpeg',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BloGame - Blog de Videojuegos',
        description: 'Tu blog favorito sobre videojuegos, reviews, análisis y noticias del mundo gaming.',
        images: ['/og-image.jpg'],
        creator: '@blogame',
        site: '@blogame',
    },
    verification: {
        google: 'tu-codigo-de-verificacion-google',
        // yandex: 'tu-codigo-yandex',
        // yahoo: 'tu-codigo-yahoo',
    },
    alternates: {
        canonical: 'https://blogame.vercel.app',
        languages: {
            'es-ES': 'https://blogame.vercel.app',
        },
        types: {
            'application/rss+xml': [
                { url: '/feed.xml', title: 'BloGame RSS Feed' }
            ],
        },
    },
    category: 'technology',
    applicationName: 'BloGame',
    referrer: 'origin-when-cross-origin',
    other: {
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'BloGame',
    },
};

// Configuración de viewport
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
    ],
    colorScheme: 'light dark',
};

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html 
            lang="es" 
            suppressHydrationWarning
            className={inter.variable}
        >
            <head>
                {/* Preload crítico */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                
                {/* DNS Hints para servicios externos */}
                <link rel="dns-prefetch" href="https://www.google-analytics.com" />
                <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
                {/* Favicons mejorados */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/svg+xml" href="/logo.svg" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#3b82f6" />
                <link rel="shortcut icon" href="/favicon.ico" />
        
                {/* Meta adicionales */}
                <meta name="msapplication-TileColor" content="#3b82f6" />
                <meta name="msapplication-config" content="/browserconfig.xml" />
                <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
                <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
                
                {/* PWA Meta */}
                <meta name="apple-mobile-web-app-capable" content="yes" />
                <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                <meta name="apple-mobile-web-app-title" content="BloGame" />
                <meta name="mobile-web-app-capable" content="yes" />
        
                {/* JSON-LD estructurado */}
                <JsonLd />
                
                {/* Script para tema sin flash - movido al head para mayor eficiencia */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            try {
                                var theme = localStorage.getItem('theme');
                                var isDark = theme === 'dark' || 
                                    (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                                
                                if (isDark) {
                                    document.documentElement.classList.add('dark');
                                } else {
                                    document.documentElement.classList.remove('dark');
                                }
                            } catch (_) {}
                        })();
                        `,
                    }}
                />
            </head>
      
            <body className={`
                ${inter.className} 
                bg-white dark:bg-gray-900 
                text-gray-900 dark:text-gray-100 
                transition-colors duration-300
                antialiased
                overflow-x-hidden
            `}>
                {/* Skip Links para accesibilidad */}
                <SkipLinks />
        
                <ThemeProvider>
                    <div className="min-h-screen flex flex-col">
                        {/* Header con datos optimizados */}
                        <HeaderWrapper />
            
                        {/* Contenido principal */}
                        <main 
                            id="main-content"
                            className="flex-1"
                            role="main"
                            aria-label="Contenido principal"
                        >
                            {children}
                        </main>
            
                        {/* Footer */}
                        <Footer />
                    </div>
                </ThemeProvider>
        
                {/* Analytics y scripts al final */}
                <Analytics />
            </body>
        </html>
    );
}

// Header con datos y manejo de errores
async function HeaderWrapper() {
    try {
        const [{ getAllCategories }] = await Promise.all([
            import('@/lib/posts'),
        ]);
        
        const categories = await getAllCategories();
        return <Header categories={categories} />;
    } catch (error) {
        console.error('Error loading header data:', error);
        // Fallback con categorías vacías si hay error
        return <Header categories={[]} />;
    }
}