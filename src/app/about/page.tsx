import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
    title: 'Acerca de - BloGame',
    description: 'Conoce más sobre mí y mi blog de videojuegos',
};

export default function About() {
    return (
        <>
            <div className="max-w-4xl mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <div className="mb-8">
                        <Image
                            src="/images/about.jpg"
                            alt="Mi foto de perfil"
                            width={200}
                            height={200}
                            className="rounded-full mx-auto shadow-lg"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        Hola, soy Alex
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto dark:text-gray-100">
                        Desarrollador web apasionado por crear sitios web con estilos modernos y minimalistas.
                    </p>
                </div>

                {/* Contenido principal */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-gray-100">
                            ¿Qué es BloGame?
                        </h2>
                        <div className="prose prose-lg text-gray-700 space-y-4 dark:text-gray-100">
                            <p>
                                Un blog sobre videojuegos, donde vas a encontrar de todo: desde clásicos retro que marcaron nuestra infancia hasta los últimos lanzamientos.
                            </p>
                            <p>
                                Compartimos reseñas, curiosidades, comparativas, tops, historias y muchos más.
                            </p>
                            <p>
                                Si eres gamer de toda la vida o recién estés empezando, este espacio es para vos.
                            </p>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-gray-100">
                            Mi Historia Gamer
                        </h2>
                        <div className="prose prose-lg text-gray-700 space-y-4 dark:text-gray-100">
                            <p>
                                Todo comenzó con mi primera consola a los 11 años. Desde entonces, he vivido la evolución de los videojuegos en primera persona.
                            </p>
                            <p>
                                He jugado en prácticamente todas las plataformas: desde arcade hasta PC, pasando por consolas de Nintendo, PlayStation, Xbox y dispositivos.
                            </p>
                            <p>
                                Esta experiencia me permite ofrecer una perspectiva única sobre cómo han evolucionado los juegos a lo largo de los años.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Estadísticas y datos curiosos */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
                        Algunos números
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <div className="text-3xl font-bold text-orange-600 mb-2">10+</div>
                            <div className="text-gray-600 dark:text-gray-300">Años jugando</div>
                        </div>
                        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <div className="text-3xl font-bold text-orange-600 mb-2">500+</div>
                            <div className="text-gray-600 dark:text-gray-300">Juegos completados</div>
                        </div>
                        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <div className="text-3xl font-bold text-orange-600 mb-2">8</div>
                            <div className="text-gray-600 dark:text-gray-300">Consolas diferentes</div>
                        </div>
                        <div className="text-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                            <div className="text-3xl font-bold text-orange-600 mb-2">50+</div>
                            <div className="text-gray-600 dark:text-gray-300">Artículos escritos</div>
                        </div>
                    </div>
                </div>

                {/* Géneros favoritos */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
                        Mis géneros favoritos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">RPGs</h3>
                            <p className="text-gray-700 dark:text-gray-200">
                                Desde Final Fantasy hasta The Witcher, los RPGs me permiten sumergirme en mundos increíbles y vivir historias épicas.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Plataformeros</h3>
                            <p className="text-gray-700 dark:text-gray-200">
                                Mario, Sonic, Celeste... Los plataformeros nunca pasan de moda y siempre ofrecen diversión pura y desafíos precisos.
                            </p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">Indie</h3>
                            <p className="text-gray-700 dark:text-gray-200">
                                Los juegos independientes me sorprenden constantemente con su creatividad y propuestas innovadoras.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filosofía del blog */}
                <div className="mb-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-6">
                        Mi filosofía
                    </h2>
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
                            Creo que los videojuegos son mucho más que entretenimiento. Son arte, son cultura, son una forma de expresión única que merece ser analizada y celebrada.
                        </p>
                        <p className="text-lg text-gray-700 dark:text-gray-200">
                            En BloGame no encontrarás elitismo ni gatekeeping. Aquí todos los gamers son bienvenidos, sin importar su nivel de experiencia o las plataformas que prefieran.
                        </p>
                    </div>
                </div>

                {/* Qué encontrarás en el blog */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 text-center mb-8">
                        ¿Qué encontrarás aquí?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                <span className="text-orange-600 dark:text-orange-400 text-xl">📝</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Reseñas honestas</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Análisis detallados sin spoilers, destacando tanto fortalezas como debilidades de cada juego.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                <span className="text-orange-600 dark:text-orange-400 text-xl">🎮</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Gaming retro</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Nostálgicos recorridos por los clásicos que definieron la industria del videojuego.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                <span className="text-orange-600 dark:text-orange-400 text-xl">🏆</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Tops y rankings</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Listas curadas de los mejores juegos por género, año o temática específica.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
                                <span className="text-orange-600 dark:text-orange-400 text-xl">💡</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Tips y guías</h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Consejos prácticos para mejorar tu experiencia gaming y superar los desafíos más difíciles.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center bg-orange-50 dark:bg-orange-900 rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        ¿Quieres colaborar?
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                        Si tienes un artículo interesante, quieres proponer un tema o simplemente charlar sobre videojuegos, no dudes en contactarme. ¡Siempre estoy abierto a nuevas ideas y perspectivas!
                    </p>
                    <a
                        href="/contact"
                        className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition duration-300"
                    >
                        Hablemos
                    </a>
                </div>
            </div>
        </>
    )
}