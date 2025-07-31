import Link from 'next/link';
import { Post } from '@/lib/posts';
import Image from 'next/image';

interface PostCardProps {
    post: Post;
    compact?: boolean;
}

const categoryColors = {
    'Tecnología': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    'Curiosidades': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Guías': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Noticias': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
    'Análisis': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300',
} as const;

export default function PostCard({ post, compact = false }: PostCardProps) {
    const categoryColor = categoryColors[post.category as keyof typeof categoryColors] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

    // Función para formatear la fecha
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <article className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
            <div className="relative p-6">
                <div className="flex items-center justify-between mb-4">
                    <Link
                        href={`/category/${encodeURIComponent(post.category.toLowerCase())}`}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColor} transition-all duration-300 hover:scale-105`}
                    >
                        {post.category}
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {post.readTime}
                    </span>
                </div>

                {post.image && (
                    <div className="mb-4 relative h-48 overflow-hidden rounded-lg">
                        <Image
                            src={post.image}
                            alt={post.alt || post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                )}

                <h2 className={`${compact ? 'text-lg' : 'text-xl'} font-bold mb-3 text-gray-900 dark:text-gray-100 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors duration-300`}>
                    <Link href={`/posts/${post.slug}`} className="hover:underline">
                        {post.title}
                    </Link>
                </h2>

                {/* Metadata */}
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <time dateTime={post.date}>
                            {formatDate(post.date)}
                        </time>
                    </div>
                    <span className="mx-2 text-gray-400">•</span>
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {post.author}
                    </div>
                </div>

                {/* Excerpt */}
                <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3">{post.excerpt}</p>

                {/* Tags */}
                {!compact && post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Link
                                key={tag}
                                href={`/tag/${encodeURIComponent(tag.toLowerCase())}`}
                                className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                            >
                                #{tag}
                            </Link>
                        ))}
                        {post.tags.length > 3 && (
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                +{post.tags.length - 3} más
                            </span>
                        )}
                    </div>
                )}

                {/* CTA Button */}
                <Link 
                    href={`/post/${post.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-600 text-white rounded-lg hover:from-yellow-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                >
                    <span className="font-medium">Leer artículo</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </article>
    );
}