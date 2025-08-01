import { Github, Linkedin, X } from 'lucide-react';
import Link from 'next/link';

export default function Footer(){
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold mb-4">BloGame</h3>
                        <p className="text-gray mb-4">
                            Contenido sobre videojuegos
                        </p>
                    </div>
                    {/*Enlaces*/}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white">Inicio</Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-white">Acerca de</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-white">Contacto</Link>
                            </li>
                            <li>
                                <Link href="/privacy-policy" className="text-gray-300 hover:text-white">Política de privacidad</Link>
                            </li>
                        </ul>
                    </div>
                    {/*Redes sociales*/}
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Sígueme</h4>
                        <div className="flex space-x-4">
                            <a href="#">
                                <X size={24} />
                            </a>
                            <a href="https://github.com/Alex831612/blogame">
                                <Github size={24} />
                            </a>
                            <a href="#">
                                <Linkedin size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400">
                        &copy; 2025 BloGame. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
}