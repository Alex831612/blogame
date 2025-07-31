interface HeroSectionProps {
  variant?: 'default' | 'minimal' | 'blog';
}

export function HeroSection({ variant = 'default' }: HeroSectionProps) {
    return (
        <div className="relative overflow-hidden bg-gradient-to-br from-blue-800 to-indigo-900">
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative container mx-auto px-4 py-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Blo
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Game</span>
                    </h1>
                </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -ml-36 -mt-36 animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mb-48 animate-pulse delay-1000"></div>
        </div>
    );
}