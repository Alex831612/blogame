export default function JsonLd() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://blogame.vercel.app';
    
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        name: 'BloGame',
        alternateName: 'BloGame - Blog de Videojuegos',
        description: 'Blog de videojuegos con reviews, análisis, noticias y guías. Tu fuente confiable de información gaming.',
        url: baseUrl,
        inLanguage: 'es-ES',
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
        },
        publisher: {
            '@type': 'Organization',
            '@id': `${baseUrl}/#organization`,
            name: 'BloGame',
            url: baseUrl,
            logo: {
                '@type': 'ImageObject',
                '@id': `${baseUrl}/#logo`,
                url: `${baseUrl}/logo.svg`,
                caption: 'BloGame Logo',
                inLanguage: 'es-ES',
                width: '60',
                height: '60',
            },
            sameAs: [
                // Agregar aquí redes sociales
                // 'https://twitter.com/blogame',
                // 'https://facebook.com/blogame',
                // 'https://instagram.com/blogame'
            ],
        },
        author: {
            '@type': 'Person',
            '@id': `${baseUrl}/#author`,
            name: 'Alex',
            url: `${baseUrl}/about`,
            sameAs: [
                // Enlaces a perfiles del autor
            ],
        },
        mainEntity: {
            '@type': 'Blog',
            '@id': `${baseUrl}/#blog`,
            name: 'BloGame',
            description: 'Blog especializado en videojuegos, reviews, análisis y noticias gaming',
            url: baseUrl,
            inLanguage: 'es-ES',
            author: {
                '@id': `${baseUrl}/#author`,
            },
            publisher: {
                '@id': `${baseUrl}/#organization`,
            },
        },
        breadcrumb: {
            '@type': 'BreadcrumbList',
            '@id': `${baseUrl}/#breadcrumb`,
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: 'Inicio',
                    item: baseUrl,
                },
            ],
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd, null, process.env.NODE_ENV === 'development' ? 2 : 0) }}
        />
    );
}