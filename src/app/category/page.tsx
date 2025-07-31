import { Metadata } from 'next';
import Link from 'next/link';
import { getAllCategories, getPostsByCategory } from '@/lib/posts';

// Metadata para SEO
export const metadata: Metadata = {
    title: 'Categorías - BloGame',
    description: 'Explora todas las categorías de contenido disponibles en BloGame. Encuentra artículos organizados por temáticas.',
    openGraph: {
        title: 'Categorías - BloGame',
        description: 'Explora todas las categorías de contenido disponibles en BloGame',
        type: 'website',
    },
    robots: {
        index: true,
        follow: true,
    },
};

// Interfaz para la información de cada categoría
interface CategoryInfo {
    name: string;
    slug: string;
    postCount: number;
    description?: string;
}

export default function CategoriesPage() {
    // Obtener todas las categorías
    const allCategories = getAllCategories();
    
    // Crear información detallada para cada categoría
    const categoriesInfo: CategoryInfo[] = allCategories.map(category => {
        const posts = getPostsByCategory(category);
        return {
            name: category,
            slug: encodeURIComponent(category.toLowerCase()),
            postCount: posts.length,
            description: `Descubre ${posts.length} ${posts.length === 1 ? 'artículo' : 'artículos'} sobre ${category}`
        };
    }).sort((a, b) => b.postCount - a.postCount); // Ordenar por número de posts

    const totalCategories = categoriesInfo.length;
    const totalPosts = categoriesInfo.reduce((sum, cat) => sum + cat.postCount, 0);

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
                    <li className="text-gray-900 dark:text-gray-100 font-medium" aria-current="page">
                        Categorías
                    </li>
                </ol>
            </nav>

            {/* Hero Section */}
            <header className="bg-gradient-to-r from-gray-800 to-blue-700 text-white py-16 shadow-xl">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            Explorar Categorías
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 mb-8 leading-relaxed">
                            Descubre contenido organizado por temáticas
                        </p>
                        
                        {/* Stats Cards */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <div className="inline-flex items-center bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                                </svg>
                                <span className="text-sm font-medium">
                                    {totalCategories} categorías
                                </span>
                            </div>
                            <div className="inline-flex items-center bg-white/20 dark:bg-white/10 backdrop-blur-sm rounded-xl px-6 py-3 border border-white/30">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                <span className="text-sm font-medium">
                                    {totalPosts} artículos totales
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Categories Grid */}
            <main className="container mx-auto px-4 py-16">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Todas las Categorías
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-full"></div>
                </div>

                {/* Grid de categorías */}
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {categoriesInfo.map((category) => (
                        <Link
                            key={category.name}
                            href={`/category/${category.slug}`}
                            className="group block"
                        >
                            <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 p-6 h-full group-hover:scale-105 group-hover:border-orange-300 dark:group-hover:border-orange-600">
                                {/* Icono de categoría */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center group-hover:from-yellow-600 group-hover:to-orange-700 transition-all duration-300">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                                        </svg>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        {category.postCount}
                                    </div>
                                </div>

                                {/* Título de categoría */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {category.name}
                                </h3>

                                {/* Descripción */}
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                                    {category.description}
                                </p>

                                {/* Call to action */}
                                <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
                                    Explorar artículos
                                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {/* Mensaje si no hay categorías */}
                {categoriesInfo.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 max-w-md mx-auto">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0l-4-4m4 4l-4 4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                No hay categorías disponibles
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Aún no se han creado categorías con contenido.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                )}

                {/* Call to Action */}
                {categoriesInfo.length > 0 && (
                    <div className="mt-16 text-center">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                ¿Quieres ver todo el contenido?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                                Regresa al inicio para explorar todos los artículos o navega por las categorías específicas.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Ver todos los artículos
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}