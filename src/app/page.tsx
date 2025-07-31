import { Metadata } from 'next';
import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import Link from 'next/link';

// SEO Metadata
export const metadata: Metadata = {
    title: 'BloGame - Artículos y Noticias Recientes',
    description: 'Explora nuestros últimos artículos sobre noticias, eventos y mucho más. Contenido actualizado regularmente para mantenerte informado.',
    keywords: ['blog', 'noticias', 'artículos', 'eventos', 'actualidad', 'juegos', 'videojuegos'],
    authors: [{ name: 'Alex Andres' }],
    openGraph: {
        title: 'BloGame - Artículos y Noticias Recientes',
        description: 'Explora nuestros últimos artículos sobre noticias, eventos y mucho más.',
        type: 'website',
        locale: 'es_ES',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'BloGame - Artículos y Noticias Recientes',
        description: 'Explora nuestros últimos artículos sobre noticias, eventos y mucho más.',
    },
    alternates: {
        canonical: '/',
    },
};

export default async function Home({ params }: { params: { page?: string } }) {
    // Paginación
    const currentPage = Number(params?.page) || 1;
    const postsPerPage = 9;
    const allPosts = await getAllPosts();
  
    // Calcular posts para la página actual
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const posts = allPosts.slice(startIndex, endIndex);
  
    // Información de paginación
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      
            {/* Posts Section */}
            <section 
                className="container mx-auto px-4 py-16"
                aria-labelledby="recent-posts-heading"
            >
                <header className="text-center mb-12">
                    <h1 
                        id="recent-posts-heading"
                        className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4"
                    >
                        Artículos Recientes
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Explora nuestros últimos artículos sobre noticias, eventos y mucho más
                    </p>
          
                    {/* Información de paginación */}
                    {totalPages > 1 && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Página {currentPage} de {totalPages} - {allPosts.length} artículos en total
                        </p>
                    )}
                </header>

                {/* Posts Grid */}
                {posts.length > 0 ? (
                    <>
                        <div 
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                            role="feed"
                            aria-label="Lista de artículos recientes"
                        >
                            {posts.map((post) => (
                                <article key={post.slug} >
                                    <PostCard post={post} />
                                </article>
                            ))}
                        </div>

                        {/* Paginación */}
                        {totalPages > 1 && (
                            <nav 
                                className="flex justify-center items-center gap-4 mt-12"
                                aria-label="Navegación de páginas"
                            >
                                {hasPrevPage && (
                                    <Link
                                        href={currentPage === 2 ? '/' : `/?page=${currentPage - 1}`}
                                        className="px-4 py-2 text-orange-600 dark:text-orange-400 border border-orange-300 dark:border-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                        aria-label="Página anterior"
                                    >
                                        Anterior
                                    </Link>
                                )}
                
                                <span 
                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg"
                                    aria-current="page"
                                >
                                    {currentPage}
                                </span>
                
                                {hasNextPage && (
                                    <Link
                                        href={`/?page=${currentPage + 1}`}
                                        className="px-4 py-2 text-orange-600 dark:text-orange-400 border border-orange-300 dark:border-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                                        aria-label="Página siguiente"
                                    >
                                        Siguiente
                                    </Link>
                                )}
                            </nav>
                        )}
                    </>
                ) : (
                    <EmptyState />
                )}
            </section>
        </div>
    );
}

// Componente para estado vacío
function EmptyState() {
    return (
        <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No hay artículos disponibles
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
                Pronto publicaremos contenido interesante. ¡Vuelve pronto!
            </p>
        </div>
    );
}