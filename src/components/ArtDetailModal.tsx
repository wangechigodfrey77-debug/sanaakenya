import React, { useState } from 'react';
import { X, ShieldCheck, ShoppingBag, MapPin, Award, CheckCircle2, Rotate3d, Layers } from 'lucide-react';
import { Artwork, Currency } from '../types';

interface ArtDetailModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  currency: Currency;
  formatPrice: (priceUSD: number, currency: Currency) => string;
  onAddToCart: (artwork: Artwork) => void;
}

export const ArtDetailModal: React.FC<ArtDetailModalProps> = ({
  artwork,
  onClose,
  currency,
  formatPrice,
  onAddToCart,
}) => {
  const [is3DCardRotated, setIs3DCardRotated] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);

  if (!artwork) return null;

  const allPhotos = [artwork.image, ...(artwork.additionalImages || [])];
  const activePhoto = allPhotos[selectedPhotoIndex] || artwork.image;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-4xl bg-[#121212] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 max-h-[92vh] flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-[#1a1a1a] hover:bg-[#252525] text-white transition-all border border-white/10 shadow-md"
          aria-label="Close Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Photo Inspector with 3D Flip capability */}
        <div className="md:w-1/2 bg-[#080808] p-6 flex flex-col justify-between relative overflow-hidden">
          
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#121212] shadow-xl group">
            <img
              src={activePhoto}
              alt={artwork.title}
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-700 ${
                is3DCardRotated ? 'rotate-12 scale-110' : 'group-hover:scale-105'
              }`}
            />

            <div className="absolute top-3 left-3 bg-[#c5a059] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
              {artwork.categoryLabel}
            </div>

            {/* 3D Visual Rotate Toggle */}
            <button
              onClick={() => setIs3DCardRotated(!is3DCardRotated)}
              className="absolute bottom-3 right-3 bg-[#080808]/80 backdrop-blur-md hover:bg-[#1a1a1a] text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-md"
            >
              <Rotate3d className="w-4 h-4 text-[#c5a059]" />
              <span>{is3DCardRotated ? 'Reset View' : '3D Tilt Preview'}</span>
            </button>
          </div>

          {/* Thumbnail Gallery */}
          {allPhotos.length > 1 && (
            <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar">
              {allPhotos.map((photo, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedPhotoIndex(i)}
                  className={`relative w-16 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedPhotoIndex === i ? 'border-[#c5a059] scale-105 shadow-md' : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={photo} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Provenance Badge */}
          <div className="mt-4 p-3 rounded-2xl bg-[#121212] border border-white/10 text-xs text-white/80 space-y-1">
            <p className="font-bold text-[#c5a059] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              Certificate of Authenticity #{artwork.certificateId}
            </p>
            <p className="text-[11px] text-white/50 leading-snug">{artwork.provenance}</p>
          </div>
        </div>

        {/* Right Side: Artwork Details & Purchase */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#121212]">
          
          <div className="space-y-4">
            <div>
              <span className="text-xs text-[#c5a059] font-extrabold uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {artwork.region}
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                {artwork.title}
              </h2>
              <p className="text-sm italic text-white/50 font-serif">"{artwork.kiswahiliTitle}"</p>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              {artwork.description}
            </p>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 text-xs">
              <div>
                <span className="text-white/40 font-medium">Dimensions:</span>
                <p className="font-bold text-white">{artwork.dimensions}</p>
              </div>
              <div>
                <span className="text-white/40 font-medium">Weight:</span>
                <p className="font-bold text-white">{artwork.weightKg} kg</p>
              </div>
              <div>
                <span className="text-white/40 font-medium">Creation Time:</span>
                <p className="font-bold text-white">{artwork.craftedDays} Days</p>
              </div>
              <div>
                <span className="text-white/40 font-medium">Guaranteed Origin:</span>
                <p className="font-bold text-[#c5a059] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Kenya
                </p>
              </div>
            </div>

            {/* Artisan Profile Box */}
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-[#1a1a1a] border border-white/10">
              <img
                src={artwork.artisan.avatar}
                alt={artwork.artisan.name}
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border-2 border-[#c5a059]"
              />
              <div>
                <p className="text-xs font-bold text-white">{artwork.artisan.name}</p>
                <p className="text-[11px] font-semibold text-[#c5a059]">{artwork.artisan.coopName}</p>
                <p className="text-[10px] text-white/50">{artwork.artisan.location}</p>
              </div>
            </div>
          </div>

          {/* Footer Purchase CTA */}
          <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold text-white/40">Total Investment</span>
              <p className="text-2xl font-extrabold text-[#c5a059]">
                {formatPrice(artwork.priceUSD, currency)}
              </p>
            </div>

            <button
              onClick={() => {
                onAddToCart(artwork);
                onClose();
              }}
              className="px-6 py-3 rounded-2xl bg-[#c5a059] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#c5a059]/20 flex items-center gap-2 transform active:scale-95"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Acquire Artwork</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
