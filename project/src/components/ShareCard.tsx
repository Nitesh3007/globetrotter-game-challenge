import React, { useRef } from 'react';
import { Globe2, Award, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';
import type { ShareCardProps } from '../types';

function ShareCard({ username, score, totalPlayed, playerId }: ShareCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const generateImage = async () => {
    if (!cardRef.current) return;
    
    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 0.95,
        backgroundColor: '#ffffff'
      });
      
      const shareText = `🌍 Join me in the Globetrotter Challenge! Can you beat my score of ${score}/${totalPlayed}? Play here: ${window.location.origin}?invite=${playerId}`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
      window.open(whatsappUrl, '_blank');
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div
        ref={cardRef}
        className="bg-white text-purple-600 p-8 rounded-lg shadow-xl"
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <Globe2 className="w-12 h-12" />
          <h2 className="text-3xl font-bold">Globetrotter Challenge</h2>
        </div>
        <div className="text-center space-y-4">
          <p className="text-xl font-medium">{username}'s Score</p>
          <div className="flex items-center justify-center gap-2">
            <Award className="w-8 h-8" />
            <span className="text-4xl font-bold">{score}/{totalPlayed}</span>
          </div>
        </div>
      </div>
      
      <button
        onClick={generateImage}
        className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        <Share2 className="w-5 h-5" />
        Share on WhatsApp
      </button>
    </div>
  );
}

export default ShareCard;