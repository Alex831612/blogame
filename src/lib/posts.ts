import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Ubicación de los archivos
const postsDirectory = path.join(process.cwd(), 'posts');

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

// Interfaces
export interface PostFrontmatter {
    title: string;
    date: string;
    excerpt: string;
    author: string;
    category: string;
    readTime: string;
    image: string;
    alt: string;
    tags?: string[];
}

// Estructura esperada de cada post
export interface Post {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    author: string;
    content: string;
    category: string;
    readTime: string;
    image: string;
    alt: string;
    tags: string[];
}

// Cache
let postsCache: Post[] | null = null;
let cacheTimestamp = 0;

// Función de validación
function validatePostData(data: unknown): PostFrontmatter {
    const requiredFields = ['title', 'date', 'excerpt', 'author', 'category', 'readTime', 'image', 'alt'];

    if (typeof data !== 'object' || data === null) {
        throw new Error('Frontmatter data must be an object');
    }

    for (const field of requiredFields) {
        if (!(field in data) || !(data as Record<string, unknown>)[field]) {
            throw new Error(`Missing required frontmatter field: ${field}`);
        }
    }

    return data as PostFrontmatter;
}

// Función para crear objeto Post
function createPostObject(slug: string, data: PostFrontmatter, content: string): Post {
    return {
        slug,
        title: data.title,
        date: data.date,
        excerpt: data.excerpt,
        author: data.author,
        content,
        category: data.category,
        readTime: data.readTime,
        image: data.image,
        alt: data.alt,
        tags: data.tags || [],
    };
}

// Función para invalidar cache
export function invalidateCache(): void {
    postsCache = null;
    cacheTimestamp = 0;
}

export function getAllPosts(): Post[] {
    const now = Date.now();

    // Verificar cache
    if (postsCache && (now - cacheTimestamp) < CACHE_DURATION) {
        return postsCache;
    }

    try {
        // Solo archivos .md
        const fileNames = fs.readdirSync(postsDirectory)
        .filter(fileName => fileName.endsWith('.md'));
    
        const allPostsData = fileNames.map((fileName) => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            // Validar datos
            const validatedData = validatePostData(data);
            return createPostObject(slug, validatedData, content);
        });

        // Ordenar por fecha (más reciente primero)
        postsCache = allPostsData.sort((a, b) => 
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    
        cacheTimestamp = now;
        return postsCache;
    
    } catch (error) {
        console.error('Error reading posts directory:', error);
        return [];
    }
}

export function getPostBySlug(slug: string): Post | null {
    try {
        const fullPath = path.join(postsDirectory, `${slug}.md`);
    
        // Verificar si el archivo existe
        if (!fs.existsSync(fullPath)) {
            return null;
        }
    
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        // Validar datos
        const validatedData = validatePostData(data);
        return createPostObject(slug, validatedData, content);
    
    } catch (error) {
        console.error(`Error reading post ${slug}:`, error);
        return null;
    }
}

export function getAllCategories(): string[] {
    const posts = getAllPosts();
    const categories = posts
    .map(post => post.category)
    .filter(Boolean);
  
    return Array.from(new Set(categories)).sort();
}

export function getAllTags(): string[] {
    const posts = getAllPosts();
    const allTags = posts
    .flatMap(post => post.tags)
    .filter(Boolean);
  
    return Array.from(new Set(allTags)).sort();
}

export function getPostsByCategory(category: string): Post[] {
    if (!category) return [];
  
    const posts = getAllPosts();
    return posts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
    );
}

export function getPostsByTag(tag: string): Post[] {
    if (!tag) return [];
  
    const posts = getAllPosts();
    return posts.filter(post => 
        post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    );
}

// Búsqueda de posts
export function searchPosts(query: string): Post[] {
    if (!query || query.trim().length < 2) return [];
  
    const posts = getAllPosts();
    const lowercaseQuery = query.toLowerCase().trim();
  
    return posts.filter(post => 
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.content.toLowerCase().includes(lowercaseQuery) ||
        post.author.toLowerCase().includes(lowercaseQuery) ||
        post.category.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
}

// Posts relacionados
export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
    const currentPost = getPostBySlug(currentSlug);
    if (!currentPost) return [];
  
    const posts = getAllPosts()
        .filter(post => post.slug !== currentSlug);
  
    // Puntuación por relevancia
    const scoredPosts = posts.map(post => {
        let score = 0;
    
        // Misma categoría = +3 puntos
        if (post.category.toLowerCase() === currentPost.category.toLowerCase()) {
            score += 3;
        }
    
        // Tags compartidos = +2 puntos por tag
        const sharedTags = post.tags.filter(tag =>
            currentPost.tags.some(currentTag => 
                currentTag.toLowerCase() === tag.toLowerCase()
            )
        );
        score += sharedTags.length * 2;
    
        // Mismo autor = +1 punto
        if (post.author.toLowerCase() === currentPost.author.toLowerCase()) {
            score += 1;
        }
    
        return { post, score };
    });
  
    // Ordenar por puntuación y fecha
    return scoredPosts
        .filter(item => item.score > 0)
        .sort((a, b) => {
            if (a.score !== b.score) {
                return b.score - a.score; // Mayor puntuación primero
            }
            // Si tienen la misma puntuación, más reciente primero
            return new Date(b.post.date).getTime() - new Date(a.post.date).getTime();
        })
        .slice(0, limit)
        .map(item => item.post);
}

// Posts recientes
export function getRecentPosts(limit = 5): Post[] {
    const posts = getAllPosts();
    return posts.slice(0, limit);
}

// Posts populares (basado en readTime como proxy)
export function getPopularPosts(limit = 5): Post[] {
    const posts = getAllPosts();
  
    return posts
    .sort((a, b) => {
        // Extraer números del readTime (ej: "5 min" -> 5)
        const aTime = parseInt(a.readTime.match(/\d+/)?.[0] || '0');
        const bTime = parseInt(b.readTime.match(/\d+/)?.[0] || '0');
        return bTime - aTime; // Mayor tiempo de lectura = más popular
    })
    .slice(0, limit);
}

// Función para estadísticas del blog
export function getBlogStats() {
    const posts = getAllPosts();
    const categories = getAllCategories();
    const tags = getAllTags();
  
    return {
        totalPosts: posts.length,
        totalCategories: categories.length,
        totalTags: tags.length,
        totalAuthors: Array.from(new Set(posts.map(p => p.author))).length,
        averageReadTime: Math.round(
            posts.reduce((acc, post) => {
                const time = parseInt(post.readTime.match(/\d+/)?.[0] || '0');
                return acc + time;
            }, 0) / posts.length
        ),
        newestPost: posts[0]?.date || null,
        oldestPost: posts[posts.length - 1]?.date || null,
    };
}

// Función para convertir markdown a HTML con clases CSS
export async function markdownToHtml(markdown: string): Promise<string> {
    try {
        const result = await remark()
            .use(remarkGfm)
            .use(html, { 
                sanitize: false,
                allowDangerousHtml: true 
            })
            .process(markdown);
        
        let htmlContent = result.toString();
        
        // Aplicar clases CSS a elementos HTML específicos
        htmlContent = htmlContent
            // Títulos
            .replace(/<h1>/g, '<h1 class="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6 mt-8 leading-tight">')
            .replace(/<h2>/g, '<h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-5 mt-8 leading-tight border-b-2 border-orange-500 pb-2">')
            .replace(/<h3>/g, '<h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 mt-6 leading-tight">')
            .replace(/<h4>/g, '<h4 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-5">')
            .replace(/<h5>/g, '<h5 class="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3 mt-4">')
            .replace(/<h6>/g, '<h6 class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2 mt-3">')
            
            // Párrafos
            .replace(/<p>/g, '<p class="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-base">')
            
            // Enlaces
            .replace(/<a href="/g, '<a class="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline transition-colors duration-200" href="')
            
            // Texto en negrita y cursiva
            .replace(/<strong>/g, '<strong class="font-semibold text-gray-900 dark:text-gray-100">')
            .replace(/<em>/g, '<em class="italic text-gray-600 dark:text-gray-400">')
            
            // Código inline
            .replace(/<code>/g, '<code class="text-orange-600 dark:text-orange-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono text-sm">')
            
            // Bloques de código
            .replace(/<pre>/g, '<pre class="bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 overflow-x-auto my-6">')
            
            // Citas
            .replace(/<blockquote>/g, '<blockquote class="border-l-4 border-orange-500 pl-6 py-2 bg-orange-50 dark:bg-orange-900/20 rounded-r-lg my-6 italic text-gray-700 dark:text-gray-300">')
            
            // Listas
            .replace(/<ul>/g, '<ul class="my-6 space-y-2 list-disc list-inside">')
            .replace(/<ol>/g, '<ol class="my-6 space-y-2 list-decimal list-inside">')
            .replace(/<li>/g, '<li class="text-gray-700 dark:text-gray-300 leading-relaxed ml-4">')
            
            // Imágenes
            .replace(/<img /g, '<img class="rounded-lg shadow-md my-8 border border-gray-200 dark:border-gray-700 max-w-full h-auto" ')
            
            // Líneas horizontales
            .replace(/<hr>/g, '<hr class="border-gray-300 dark:border-gray-600 my-8">')
            
            // Tablas
            .replace(/<table>/g, '<table class="my-8 border-collapse w-full">')
            .replace(/<th>/g, '<th class="bg-gray-50 dark:bg-gray-800 font-semibold text-left px-4 py-3 border border-gray-300 dark:border-gray-600">')
            .replace(/<td>/g, '<td class="px-4 py-3 border border-gray-300 dark:border-gray-600">')
            
            // Agregar clase especial al primer párrafo para first-letter
            .replace(/(<p class="[^"]*">)/, '$1<span class="first-letter:text-4xl first-letter:font-bold first-letter:text-orange-600 dark:first-letter:text-orange-400 first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-none">');
        
        return htmlContent;
    } catch (error) {
        console.error('Error converting markdown to HTML:', error);
        return '';
    }
}