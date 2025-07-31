import { NextRequest, NextResponse } from 'next/server';
import { searchPosts } from '@/lib/posts';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q');

        if (!query) {
            return NextResponse.json({ posts: [] });
        }

        // función de búsqueda del servidor
        const results = searchPosts(query);

        return NextResponse.json({ 
            posts: results,
            count: results.length 
        });

    } catch (error) {
        console.error('Error in search API:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' }, 
            { status: 500 }
        );
    }
}

// También permitir POST para búsquedas más complejas
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { query, filters } = body;

        if (!query) {
            return NextResponse.json({ posts: [] });
        }

        let results = searchPosts(query);

        if (filters?.category) {
            results = results.filter(post => 
                post.category.toLowerCase() === filters.category.toLowerCase()
            );
        }

        if (filters?.author) {
            results = results.filter(post => 
                post.author.toLowerCase() === filters.author.toLowerCase()
            );
        }

        return NextResponse.json({ 
            posts: results,
            count: results.length 
        });

    } catch (error) {
        console.error('Error in search POST API:', error);
        return NextResponse.json(
            { error: 'Error interno del servidor' }, 
            { status: 500 }
        );
    }
}