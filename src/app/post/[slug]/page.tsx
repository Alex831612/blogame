import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPostBySlug, markdownToHtml, getAllPosts, getRelatedPosts } from '@/lib/posts';
import ShareButtons from '@/components/ShareButtons';
import PostCard from '@/components/PostCard';

interface PostPageProps {
    params: {
        slug: string;
    };
}

// Generar metadata para SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const post = getPostBySlug(params.slug);
    
    if (!post) {
        return {
            title: 'Post no encontrado - BloGame',
            description: 'El artículo que buscas no existe o ha sido removido.',
        };
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://mi-blog.com';
    const postUrl = `${baseUrl}/post/${post.slug}`;

    return {
        title: `${post.title} - BloGame`,
        description: post.excerpt,
        keywords: post.tags?.join(', '),
        authors: [{ name: post.author }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            url: postUrl,
            images: [
                {
                    url: post.image,
                    width: 1200,
                    height: 630,
                    alt: post.alt || post.title,
                },
            ],
            authors: [post.author],
            publishedTime: post.date,
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.image],
            creator: `@${post.author.toLowerCase().replace(/\s+/g, '')}`,
        },
        alternates: {
            canonical: postUrl,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const post = getPostBySlug(params.slug);
  
    if (!post) {
        notFound();
    }

    const contentHtml = await markdownToHtml(post.content);
    
    // Obtener posts relacionados de la misma categoría
    const relatedPosts = getRelatedPosts(post.slug, 3);

    // Formatear fecha
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Calcular tiempo de lectura estimado
    const estimateReadingTime = (content: string) => {
        const wordsPerMinute = 200;
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / wordsPerMinute);
        return readingTime;
    };

    const readingTime = estimateReadingTime(post.content);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-4">
                {/* Breadcrumbs */}
                <nav className="mb-8" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <li>
                            <Link 
                                href="/" 
                                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
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
                                href={`/category/${encodeURIComponent(post.category.toLowerCase())}`}
                                className="hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                            >
                                {post.category}
                            </Link>
                        </li>
                        <li>
                            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </li>
                        <li className="text-gray-900 dark:text-gray-100 font-medium line-clamp-1" aria-current="page">
                            {post.title}
                        </li>
                    </ol>
                </nav>

                {/* Back Button */}
                <Link 
                    href="/"
                    className="inline-flex items-center text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 mb-8 transition-colors duration-200 focus-ring rounded-md p-2 -ml-2"
                >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Volver al inicio
                </Link>
        
                {/* Article */}
                <article className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden max-w-4xl mx-auto mb-12">
                    {/* Featured Image */}
                    {post.image && (
                        <div className="relative h-64 md:h-96 w-full overflow-hidden">
                            <Image
                                src={post.image}
                                alt={post.alt || post.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1200px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            
                            {/* Category badge on image */}
                            <div className="absolute top-4 left-4">
                                <Link
                                    href={`/category/${encodeURIComponent(post.category.toLowerCase())}`}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200"
                                >
                                    {post.category}
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="p-8 md:p-12">
                        {/* Article Header */}
                        <header className="mb-8">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                                {post.title}
                            </h1>
                            
                            {/* Article Meta */}
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="font-medium">{post.author}</span>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <time dateTime={post.date}>
                                        {formatDate(post.date)}
                                    </time>
                                </div>
                                
                                <div className="flex items-center">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{readingTime} min de lectura</span>
                                </div>
                            </div>

                            {/* Tags */}
                            {post.tags && post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Excerpt */}
                            {post.excerpt && (
                                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed border-l-4 border-orange-500 pl-4 italic">
                                    {post.excerpt}
                                </p>
                            )}
                        </header>

                        {/* Article Content */}
                        <div 
                            className="article-content max-w-none"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                        />
                    </div>
                </article>

                {/* Share Buttons */}
                <div className="max-w-4xl mx-auto mb-12">
                    <ShareButtons 
                        title={post.title}
                        description={post.excerpt}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6"
                    />
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="max-w-6xl mx-auto mb-12">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
                                <svg className="w-6 h-6 mr-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Artículos relacionados
                            </h2>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {relatedPosts.map((relatedPost, index) => (
                                    <div
                                        key={relatedPost.slug}
                                        className="animate-fade-in-up"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <PostCard post={relatedPost} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Call to Action */}
                <section className="bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-700 dark:to-red-700 rounded-xl shadow-xl p-8 text-white max-w-4xl mx-auto text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        💬 ¿Te gustó este artículo?
                    </h3>
                    <p className="text-lg mb-6 text-orange-100">
                        Compártelo con otros gamers y déjanos saber tu opinión en las redes sociales.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/category"
                            className="btn-secondary bg-white text-orange-600 hover:bg-gray-100 border-0"
                        >
                            Explorar más categorías
                        </Link>
                        <Link
                            href="/"
                            className="btn-secondary bg-orange-700 hover:bg-orange-800 text-white border-0"
                        >
                            Ver todos los posts
                        </Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

// Generar parámetros estáticos para todos los posts
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// Opcional: configurar revalidación
export const revalidate = 3600; // Revalidar cada hora