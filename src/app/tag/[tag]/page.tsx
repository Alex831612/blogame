import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, getPostsByTag } from '@/lib/posts';
import PostCard from '@/components/PostCard';

interface TagPageProps {
    params: {
        tag: string;
    };
}

// Generar metadata para SEO
export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
    const decodedtag = decodeURIComponent(params.tag);
    const posts = getPostsByTag(decodedtag);
    
    if (posts.length === 0) {
        return {
            title: 'Tag no encontrada - BloGame',
            description: 'La tag que buscas no existe o no tiene contenido disponible.',
        };
    }

    const tagName = posts[0]?.tag || decodedtag;
    const articleCount = posts.length;
    const articlesText = articleCount === 1 ? 'artículo' : 'artículos';

    return {
        title: `${tagName} - BloGame`,
        description: `Descubre ${articleCount} ${articlesText} sobre ${tagName}. Explora contenido de calidad sobre esta temática.`,
        openGraph: {
            title: `${tagName} - BloGame`,
            description: `${articleCount} ${articlesText} sobre ${tagName}`,
            type: 'website',
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default function tagPage({ params }: TagPageProps) {
    const decodedtag = decodeURIComponent(params.tag);
    const posts = getPostsByTag(decodedtag);
  
    if (posts.length === 0) {
        notFound();
    }

    // Safeguard: usar el primer post para obtener el nombre de categoría
    const tagName = posts[0]?.tag || decodedtag;
    const articleCount = posts.length;
    const articlesText = articleCount === 1 ? 'artículo' : 'artículos';

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            {/* Breadcrumbs */}
            <nav className="container mx-auto px-4 pt-4 pb-4" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <li>
                        <Link 
                            href="/" 
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </li>
                    <li>
                        <Link 
                            href="/tag" 
                            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        >
                            Tags
                        </Link>
                    </li>
                    <li>
                        <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                    </li>
                    <li className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                        {tagName}
                    </li>
                </ol>
            </nav>

            {/* tag Banner */}
            <header className="bg-gradient-to-r from-gray-800 to-blue-700 text-white py-16 shadow-xl">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {tagName}
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-8 leading-relaxed">
                            Explora {articleCount} {articlesText} sobre esta temática
                        </p>
                        
                        {/* Stats Card */}
                        <div className="inline-flex items-center bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            <span className="text-sm font-medium">
                                {articleCount} posts disponibles
                            </span>
                        </div>
                    </div>
                </div>
            </header>

            {/* Posts Grid */}
            <main className="container mx-auto px-4 py-16">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Todos los artículos
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full"></div>
                </div>

                <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {posts.map((post, index) => (
                        <article
                            key={post.slug}
                        >
                            <PostCard post={post} />
                        </article>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="mt-16 text-center">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            ¿No encuentras lo que buscas?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                            Explora otras tags o regresa al inicio para descubrir más contenido interesante.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/tag"
                                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                                </svg>
                                Ver todas las tags
                            </Link>
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Ir al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Generar parámetros estáticos para todas las tags
export async function generateStaticParams() {
    const tags = getAllTags();
    
    return tags.map((tag) => ({
        tag: encodeURIComponent(tag.toLowerCase()),
    }));
}

export const revalidate = 3600;