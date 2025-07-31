export default function SkipLinks() {
    return (
        <div className="sr-only focus-within:not-sr-only">
            <a
                href="#main-content"
                className="
                    absolute top-0 left-0 z-50 p-3 m-3 
                    bg-blue-600 text-white rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transform -translate-y-full focus:translate-y-0
                    transition-transform
                "
            >
                Saltar al contenido principal
            </a>
            <a
                href="#navigation"
                className="
                    absolute top-0 left-20 z-50 p-3 m-3 
                    bg-blue-600 text-white rounded-md 
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    transform -translate-y-full focus:translate-y-0
                    transition-transform
                "
            >
                Ir a navegación
            </a>
        </div>
    );
}