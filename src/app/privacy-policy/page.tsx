import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Política de Privacidad - BloGame',
    description: 'En BloGame, nos comprometemos a proteger tu privacidad.',
};

export default function PrivacyPolicy() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="text-center mb-12">
                <h1 className='text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4'>Política de Privacidad</h1>
                <p className='text-sm text-gray-600 dark:text-gray-100 max-w-2xl mx-auto mb-4'>
                    Última actualización: 23/07/2025
                </p>
                <p className='text-xl text-gray-700 dark:text-gray-100 mb-4'>
                    En <strong>BloGame</strong>, nos comprometemos a proteger tu privacidad. Esta política explica qué información recopilamos, cómo la usamos y cuáles son tus derechos.
                </p>
            </div>
            
            <div className="mb-12">
                <div className='mb-6'>
                    <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>Información que Recopilamos</h2>
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
                        Información que Proporcionas Voluntariamente
                    </h3>
                    <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                        <li>
                            <span className='font-bold'>Formulario de contacto:</span> Cuando nos contactas, recopilamos tu nombre, email y mensaje.
                        </li>
                        <li>
                            <span className='font-bold'>Suscripción al newsletter:</span> Si te suscribes, recopilamos tu dirección de email.
                        </li>
                    </ul>
                </div>                 
                <div className="mb-6">
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-4'>Información Recopilada Automáticamente</h3>
                    <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                        <li>
                            <span className='font-bold'>Cookies técnicas:</span> Utilizamos cookies esenciales para el funcionamiento del sitio (preferencias de tema, idioma).
                        </li>
                        <li>
                            <span className='font-bold'>Datos de navegación:</span> Información básica sobre tu visita (páginas visitadas, tiempo de permanencia, dispositivo utilizado).
                        </li>
                        <li>
                            <span className='font-bold'>Dirección IP:</span> Para análisis básicos de tráfico y seguridad.
                        </li>
                    </ul>
                </div>
                <div className="mb-6">
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
                        Servicios de Terceros
                    </h3>
                    <p className='text-gray-700 dark:text-gray-100 mb-4'>
                        Si utilizamos servicios externos, estos pueden recopilar información adicional:
                    </p>
                    <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                        <li>
                            <span className='font-bold'>Google Analytics:</span> Para análisis de tráfico web
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>Cómo Utilizamos tu Información</h2>
                <p className='text-gray-700 dark:text-gray-100 mb-4'>Utilizamos la información recopilada para:</p>
                <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                        <li>
                            <span className='font-bold'>Mejorar el contenido:</span> Entender qué artículos son más populares
                        </li>
                        <li>
                            <span className='font-bold'>Responder consultas:</span> Contestar tus mensajes de contacto
                        </li>
                        <li>
                            <span className='font-bold'>Enviar actualizaciones:</span> Notificarte sobre nuevos artículos (solo si te suscribiste)
                        </li>
                        <li>
                            <span className='font-bold'>Mantener la seguridad:</span> Prevenir spam y actividades maliciosas
                        </li>
                        <li>
                            <span className='font-bold'>Personalizar experiencia:</span> Recordar tus preferencias de navegación
                        </li>
                    </ul>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                    Base Legal para el Procesamiento
                </h2>
                <p className='text-gray-700 dark:text-gray-100 mb-4'>Procesamos tu información basándose en:</p>
                <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                    <li>
                        <span className='font-bold'>Consentimiento:</span> Cuando te suscribes o dejas comentarios voluntariamente
                        </li>
                    <li>
                        <span className='font-bold'>Interés legítimo:</span> Para análisis básicos de funcionamiento del sitio
                    </li>
                    <li>
                        <span className='font-bold'>Cumplimiento legal:</span> Si es requerido por ley
                    </li>
                </ul>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                    Compartir Información con Terceros
                </h2>
                <p className='text-gray-700 dark:text-gray-100 mb-4'>
                    <span className='font-bold'>No vendemos, alquilamos ni compartimos</span> tu información personal con terceros, excepto:
                </p>
                <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                    <li>
                        <span className='font-bold'>Proveedores de servicios:</span> Como hosting web o servicios de email (bajo estrictos acuerdos de confidencialidad)
                        </li>
                    <li>
                        <span className='font-bold'>Cumplimiento legal:</span> Si es requerido por autoridades competentes
                    </li>
                    <li>
                        <span className='font-bold'>Protección de derechos:</span> Para proteger nuestros derechos legales o de terceros
                    </li>
                </ul>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                    Cookies y Tecnologías Similares
                </h2>
                <div className="mb-6">
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
                        Tipos de Cookies que Utilizamos:
                    </h3>
                    <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                        <li>
                            <span className='font-bold'>Cookies esenciales:</span> Necesarias para el funcionamiento básico del sitio
                        </li>
                        <li>
                            <span className='font-bold'>Cookies de preferencias:</span> Para recordar tu configuración (tema, idioma)
                        </li>
                        <li>
                            <span className='font-bold'>Cookies analíticas:</span>  Para entender cómo usas el sitio
                        </li>
                    </ul>
                </div>
                <div className="mb-6">
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
                        Control de Cookies:
                    </h3>
                    <p className='text-gray-700 dark:text-gray-100 mb-4'>
                        Puedes controlar las cookies a través de:
                    </p>
                    <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                        <li>
                            Configuración de tu navegador
                        </li>
                        <li>
                            Extensiones de privacidad
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                    Seguridad de la Información
                </h2>
                <p className='text-gray-700 dark:text-gray-100 mb-4'>
                    Implementamos medidas de seguridad para proteger tu información:
                </p>
                <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                    <li>
                        <span className='font-bold'>Acceso limitado:</span> Solo personal autorizado tiene acceso a datos personales
                    </li>
                    <li>
                        <span className='font-bold'>Actualizaciones regulares:</span> Mantenemos actualizados nuestros sistemas de seguridad
                    </li>
                    <li>
                        <span className='font-bold'>Respaldos seguros:</span> Los datos se respaldan de forma segura
                    </li>
                </ul>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                    Tus Derechos
                </h2>
                <p className='text-gray-700 dark:text-gray-100 mb-4'>
                    Dependiendo de tu ubicación, puedes tener los siguientes derechos:
                </p>
                <div className="mb-6">
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
                        Derechos Generales:
                    </h3>
                    <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                        <li>
                            <span className='font-bold'>Acceso:</span> Solicitar qué información tenemos sobre ti
                        </li>
                        <li>
                            <span className='font-bold'>Rectificación:</span> Corregir información incorrecta
                        </li>
                        <li>
                            <span className='font-bold'>Eliminación:</span> Solicitar la eliminación de tus datos
                        </li>
                        <li>
                            <span className='font-bold'>Portabilidad:</span> Obtener una copia de tus datos
                        </li>
                        <li>
                            <span className='font-bold'>Oposición:</span> Oponerte a ciertos usos de tu información
                        </li>
                    </ul>
                </div>
                <div className="mb-6">
                    <h3 className='text-xl font-bold text-gray-800 dark:text-gray-100 mb-4'>
                        Para Ejercer tus Derechos:
                    </h3>
                    <p className='text-gray-700 dark:text-gray-100 mb-4'>Contacta con nosotros a través de andresalex983@gmail.com con:</p>
                    <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                        <li>
                            Asunto: &quot;Solicitud de Privacidad&quot;
                        </li>
                        <li>
                            Tu solicitud específica
                        </li>
                        <li>
                            Información para verificar tu identidad
                        </li>
                    </ul>
                </div>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                    Retención de Datos
                </h2>
                <p className='text-gray-700 dark:text-gray-100 mb-4'>Conservamos tu información durante:</p>
                <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                    <li>
                        <span className='font-bold'>Comentarios:</span> Hasta que solicites su eliminación
                    </li>
                    <li>
                        <span className='font-bold'>Emails de contacto:</span> 2 años para referencia
                    </li>
                    <li>
                        <span className='font-bold'>Datos analíticos:</span> De forma anónima e indefinida
                    </li>
                    <li>
                        <span className='font-bold'>Suscripciones:</span> Hasta que te desuscribas
                    </li>
                </ul>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                    Enlaces a Sitios Externos
                </h2>
                <p className='text-gray-700 dark:text-gray-100 mb-4'>
                    Nuestro blog puede contener enlaces a otros sitios web. Esta política de privacidad no se aplica a sitios externos. Te recomendamos revisar sus políticas de privacidad.
                </p>
            </div>
            
            <div className="mb-12">
                <h2 className='text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                    Cambios en esta Política
                </h2>
                <p className='text-gray-700 dark:text-gray-100 mb-4'>
                    Podemos actualizar esta política ocasionalmente. Los cambios importantes serán notificados mediante:
                </p>
                <ul className='text-gray-700 dark:text-gray-100 space-y-2'>
                    <li>
                        Aviso destacado en el sitio web
                    </li>
                    <li>
                        Email a suscriptores
                    </li>
                    <li>
                        Actualización de la fecha &quot;Última actualización&quot;
                    </li>
                </ul>
            </div>
        </div>
    );
}