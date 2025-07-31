'use client'
import React, { useState } from 'react';
import { Share2, MessageCircle, Send, Copy, ExternalLink, Linkedin, X } from 'lucide-react';

interface ShareButtonsProps {
    title: string;
    url?: string;
    description?: string;
    className?: string;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ 
    title, 
    url = typeof window !== 'undefined' ? window.location.href : '',
    description = '',
    className = ''
}) => {
    const [copied, setCopied] = useState(false);

    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(url);
    const encodedDescription = encodeURIComponent(description);

    const shareLinks = {
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
        telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
        reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
    };

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error al copiar URL:', err);
        }
    };

    const handleShare = (platform: string) => {
        if (typeof window !== 'undefined') {
            window.open(shareLinks[platform as keyof typeof shareLinks], '_blank', 'width=600,height=400');
        }
    };

    return (
        <div className={`bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto ${className}`}>
            <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                        <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">¡Comparte este artículo!</h3>
                </div>
            </div>

            {/* Botones de redes sociales */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {/* LinkedIn */}
                <button
                    onClick={() => handleShare('facebook')}
                    className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                    <Linkedin className='w-4 h-4'/>
                    <span className="text-sm">LinkedIn</span>
                </button>

                {/* Twitter */}
                <button
                    onClick={() => handleShare('twitter')}
                    className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-gray-800 to-black hover:from-gray-900 hover:to-black text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25"
                >
                    <X className="w-4 h-4" />
                    <span className="text-sm">Twitter</span>
                </button>

                {/* WhatsApp */}
                <button
                    onClick={() => handleShare('whatsapp')}
                    className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/25"
                >
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">WhatsApp</span>
                </button>

                {/* Telegram */}
                <button
                    onClick={() => handleShare('telegram')}
                    className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25"
                >
                    <Send className="w-4 h-4" />
                    <span className="text-sm">Telegram</span>
                </button>

                {/* Reddit */}
                <button
                    onClick={() => handleShare('reddit')}
                    className="group flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/25"
                >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Reddit</span>
                </button>

                {/* Copiar URL */}
                <button
                    onClick={handleCopyUrl}
                    className={`group flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                        copied 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/25' 
                        : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white hover:shadow-lg hover:shadow-slate-500/25'
                    }`}
                >
                    <Copy className="w-4 h-4" />
                    <span className="text-sm">{copied ? '¡Copiado!' : 'Copiar URL'}</span>
                </button>
            </div>

            {/* Separador con estilo gaming */}
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-600 dark:bg-gray-800 dark:text-gray-100">
                        🎮 Comparte con la comunidad gamer
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ShareButtons;