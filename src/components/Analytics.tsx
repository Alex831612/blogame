export default function Analytics() {
    const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
    
    // Solo cargar en producción y si hay GA_ID configurado
    if (process.env.NODE_ENV !== 'production' || !GA_ID) {
        return null;
    }

    return (
        <>
            {/* Google Analytics 4 */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            />
            <script
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        
                        gtag('config', '${GA_ID}', {
                            page_title: document.title,
                            page_location: window.location.href,
                            // Configuraciones adicionales para GA4
                            send_page_view: true,
                            anonymize_ip: true,
                            allow_google_signals: false,
                            allow_ad_personalization_signals: false,
                            // Configuración de eventos personalizados
                            custom_map: {
                                'custom_parameter': 'dimension1'
                            }
                        });
                        
                        // Event tracking personalizado para el blog
                        gtag('event', 'page_view', {
                            page_title: document.title,
                            page_location: window.location.href,
                            content_group1: 'Blog Gaming'
                        });
                        
                        // Tracking de interacciones del tema
                        window.addEventListener('themechange', function(e) {
                            gtag('event', 'theme_change', {
                                event_category: 'UI',
                                event_label: e.detail.theme,
                                value: 1
                            });
                        });
                        
                        // Tracking de formulario de contacto
                        window.addEventListener('contactform_submit', function(e) {
                            gtag('event', 'form_submit', {
                                event_category: 'Contact',
                                event_label: 'Contact Form',
                                value: 1
                            });
                        });
                    `,
                }}
            />
            
            {/* 
            Opcional: Google Tag Manager (comentado por ahora)
            <script
                dangerouslySetInnerHTML={{
                    __html: \`
                        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                        })(window,document,'script','dataLayer','GTM-XXXXXXX');
                    \`,
                }}
            />
            */}
        </>
    );
}