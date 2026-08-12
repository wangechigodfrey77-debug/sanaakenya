import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Eye, ShoppingBag, ShieldCheck, Play, Pause, Sparkles, MapPin, Award, Layers } from 'lucide-react';
import { Artwork, Currency } from '../../types';

interface ThreeDShowcaseCarouselProps {
  artworks: Artwork[];
  currency: Currency;
  formatPrice: (priceUSD: number, currency: Currency) => string;
  onInspect: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
  isPureCSSRadioMode: boolean;
  setIsPureCSSRadioMode: (val: boolean) => void;
  transitionSpeedSec: number;
}

export const ThreeDShowcaseCarousel: React.FC<ThreeDShowcaseCarouselProps> = ({
  artworks,
  currency,
  formatPrice,
  onInspect,
  onAddToCart,
  isPureCSSRadioMode,
  setIsPureCSSRadioMode,
  transitionSpeedSec,
}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [touchStartX, setTouchStartX] = useState<number>(0);

  const total = artworks.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-play timer (uses smooth CSS transitions between slides)
  useEffect(() => {
    if (!isPlaying || isPureCSSRadioMode) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [isPlaying, isPureCSSRadioMode, nextSlide]);

  // Keyboard navigation listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const activeArt = artworks[activeIndex] || artworks[0];

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) nextSlide();
    if (diff < -40) prevSlide();
  };

  return (
    <section className="relative w-full py-8 md:py-14 px-4 sm:px-6 overflow-hidden">
      
      {/* Background Decorative Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#c5a059]/10 via-[#c5a059]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* Stage Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 text-xs font-bold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>CSS 3D Coverflow Engine</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-wide">
              Kenyan <span className="text-[#c5a059]">Masterpiece</span> Showcase
            </h2>
            <p className="text-white/60 text-sm sm:text-base mt-1 max-w-xl font-light">
              Immerse in handcrafted Kenyan fine art with hardware-accelerated 3D CSS perspective transitions.
            </p>
          </div>

          {/* Engine Controls Bar */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            
            {/* Pure CSS Radio Toggle */}
            <button
              onClick={() => setIsPureCSSRadioMode(!isPureCSSRadioMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                isPureCSSRadioMode
                  ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-md shadow-[#c5a059]/30'
                  : 'bg-[#121212] text-white/80 border-white/10 hover:bg-[#1a1a1a]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Pure CSS Radio Engine: {isPureCSSRadioMode ? 'ON' : 'OFF'}</span>
            </button>

            {/* Auto Play Toggle */}
            {!isPureCSSRadioMode && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-2 rounded-xl bg-[#121212] border border-white/10 text-white/80 hover:bg-[#1a1a1a] transition-all shadow-sm flex items-center justify-center"
                title={isPlaying ? 'Pause Auto-Rotation' : 'Play Auto-Rotation'}
              >
                {isPlaying ? <Pause className="w-4 h-4 text-[#c5a059]" /> : <Play className="w-4 h-4 text-white/60" />}
              </button>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* PURE CSS RADIO CAROUSEL ENGINE MODE */}
        {/* ========================================================= */}
        {isPureCSSRadioMode ? (
          <div className="css-radio-engine relative w-full py-8">
            {/* Radio inputs for CSS selector triggering */}
            {artworks.slice(0, 5).map((_, idx) => (
              <input
                key={`radio-${idx}`}
                type="radio"
                name="pure-css-carousel"
                id={`radio-slide-${idx}`}
                defaultChecked={idx === 0}
              />
            ))}

            {/* 3D Track */}
            <div className="css-radio-track css-3d-stage relative min-h-[460px] sm:min-h-[520px] flex items-center justify-center">
              {artworks.slice(0, 5).map((art, idx) => (
                <div
                  key={art.id}
                  className={`radio-card-${idx} css-3d-card absolute w-[290px] sm:w-[350px] md:w-[380px] bg-[#121212] rounded-3xl p-5 border border-white/10 shadow-2xl cursor-pointer text-white`}
                >
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4 bg-[#1a1a1a]">
                    <img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#080808]/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">
                      {art.categoryLabel}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#c5a059] font-bold tracking-wider uppercase flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {art.region}
                      </span>
                      <span className="text-xs text-[#c5a059] font-extrabold bg-[#c5a059]/10 px-2 py-0.5 rounded-md border border-[#c5a059]/20">
                        ★ {art.rating}
                      </span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-white leading-snug line-clamp-1">
                      {art.title}
                    </h3>
                    <p className="text-xs italic text-white/50 font-serif">"{art.kiswahiliTitle}"</p>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                      <span className="text-lg font-extrabold text-[#c5a059]">
                        {formatPrice(art.priceUSD, currency)}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onInspect(art)}
                          className="p-2 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] text-white text-xs font-semibold transition-all border border-white/10"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onAddToCart(art)}
                          className="px-3.5 py-2 rounded-xl bg-[#c5a059] hover:bg-white text-black text-xs font-bold transition-all uppercase tracking-wider shadow-md shadow-[#c5a059]/20 flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Buy</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pure CSS Radio Control Buttons */}
            <div className="css-radio-controls flex items-center justify-center gap-2.5 mt-8">
              {artworks.slice(0, 5).map((art, idx) => (
                <label
                  key={`label-${idx}`}
                  htmlFor={`radio-slide-${idx}`}
                  className="w-3 h-3 rounded-full bg-white/20 hover:bg-[#c5a059] cursor-pointer transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-transparent"
                >
                  {idx + 1}
                </label>
              ))}
            </div>
          </div>

        ) : (

          /* ========================================================= */
          /* JAVASCRIPT-DRIVEN CSS TRANSITION 3D PERSPECTIVE CAROUSEL */
          /* ========================================================= */
          <div
            className="relative min-h-[500px] sm:min-h-[550px] md:min-h-[580px] flex items-center justify-center py-6"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Stage */}
            <div className="css-3d-stage relative w-full h-full flex items-center justify-center">
              {artworks.map((art, index) => {
                // Calculate position relative to active slide
                let offset = index - activeIndex;
                if (offset < -Math.floor(total / 2)) offset += total;
                if (offset > Math.floor(total / 2)) offset -= total;

                const absOffset = Math.abs(offset);
                const isActive = offset === 0;

                // CSS 3D Transforms calculated with smooth CSS transition curves
                let transformStyle: React.CSSProperties = {};
                
                if (isActive) {
                  transformStyle = {
                    transform: 'translate3d(0, 0, 100px) scale(1.08)',
                    zIndex: 40,
                    opacity: 1,
                    filter: 'drop-shadow(0 25px 40px rgba(197, 160, 89, 0.25))',
                    transitionDuration: `${transitionSpeedSec}s`,
                  };
                } else if (offset === -1) {
                  transformStyle = {
                    transform: 'translate3d(-68%, 0, -140px) rotateY(26deg) scale(0.85)',
                    zIndex: 20,
                    opacity: 0.65,
                    filter: 'brightness(0.88) blur(0.3px)',
                    transitionDuration: `${transitionSpeedSec}s`,
                  };
                } else if (offset === 1) {
                  transformStyle = {
                    transform: 'translate3d(68%, 0, -140px) rotateY(-26deg) scale(0.85)',
                    zIndex: 20,
                    opacity: 0.65,
                    filter: 'brightness(0.88) blur(0.3px)',
                    transitionDuration: `${transitionSpeedSec}s`,
                  };
                } else if (offset < -1) {
                  transformStyle = {
                    transform: `translate3d(-135%, 0, -320px) rotateY(38deg) scale(0.68)`,
                    zIndex: 10,
                    opacity: 0.25,
                    filter: 'brightness(0.6) blur(1px)',
                    pointerEvents: 'none',
                    transitionDuration: `${transitionSpeedSec}s`,
                  };
                } else {
                  transformStyle = {
                    transform: `translate3d(135%, 0, -320px) rotateY(-38deg) scale(0.68)`,
                    zIndex: 10,
                    opacity: 0.25,
                    filter: 'brightness(0.6) blur(1px)',
                    pointerEvents: 'none',
                    transitionDuration: `${transitionSpeedSec}s`,
                  };
                }

                return (
                  <div
                    key={art.id}
                    style={transformStyle}
                    onClick={() => !isActive && setActiveIndex(index)}
                    className={`css-3d-card absolute w-[290px] sm:w-[360px] md:w-[410px] bg-[#121212] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-2xl transition-all cursor-pointer text-white ${
                      isActive ? 'ring-1 ring-[#c5a059]/60' : 'hover:opacity-80'
                    }`}
                  >
                    {/* Image Box */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#1a1a1a] group">
                      <img
                        src={art.image}
                        alt={art.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <span className="bg-[#080808]/85 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-white/20 shadow-md">
                          {art.categoryLabel}
                        </span>
                        {art.isFeatured && (
                          <span className="bg-[#c5a059] text-black font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                            ★ Masterpiece
                          </span>
                        )}
                      </div>

                      {/* Certificate Overlay */}
                      <div className="absolute bottom-3 left-3 bg-[#080808]/90 backdrop-blur-md text-white/90 text-[10px] font-mono px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5 shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-[#c5a059]" />
                        <span>{art.certificateId}</span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#c5a059] font-extrabold tracking-wider uppercase flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {art.region}
                        </span>
                        <span className="text-xs text-[#c5a059] font-extrabold bg-[#c5a059]/10 px-2.5 py-0.5 rounded-md border border-[#c5a059]/20">
                          ★ {art.rating} ({art.reviewsCount})
                        </span>
                      </div>

                      <div>
                        <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                          {art.title}
                        </h3>
                        <p className="text-xs italic text-white/50 font-serif mt-0.5">
                          "{art.kiswahiliTitle}"
                        </p>
                      </div>

                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                        {art.description}
                      </p>

                      {/* Artisan Mini Tag */}
                      <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#1a1a1a] border border-white/5">
                        <img
                          src={art.artisan.avatar}
                          alt={art.artisan.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover border border-[#c5a059]/40"
                        />
                        <div className="overflow-hidden">
                          <p className="text-xs font-bold text-white truncate">{art.artisan.name}</p>
                          <p className="text-[10px] text-white/50 truncate">{art.artisan.coopName}</p>
                        </div>
                      </div>

                      {/* Footer Price & Buttons */}
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <div>
                          <p className="text-[10px] uppercase text-white/40 font-semibold tracking-wider">Handcrafted Price</p>
                          <p className="text-xl font-extrabold text-[#c5a059]">
                            {formatPrice(art.priceUSD, currency)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            id={`inspect-btn-${art.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onInspect(art);
                            }}
                            className="p-2.5 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] text-white text-xs font-semibold transition-all border border-white/10 flex items-center gap-1"
                            title="Inspect Artwork Details & Materials"
                          >
                            <Eye className="w-4 h-4 text-white/80" />
                          </button>

                          <button
                            id={`buy-btn-${art.id}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(art);
                            }}
                            className="px-4 py-2.5 rounded-xl bg-[#c5a059] hover:bg-white text-black text-xs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-[#c5a059]/20 flex items-center gap-1.5 transform active:scale-95"
                          >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Acquire</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            {/* Left & Right Stage Arrow Navigation Buttons */}
            <button
              id="showcase-prev-btn"
              onClick={prevSlide}
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#121212]/90 hover:bg-white text-white hover:text-black shadow-xl border border-white/20 transition-all hover:scale-110 active:scale-95"
              aria-label="Previous Artwork"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              id="showcase-next-btn"
              onClick={nextSlide}
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#121212]/90 hover:bg-white text-white hover:text-black shadow-xl border border-white/20 transition-all hover:scale-110 active:scale-95"
              aria-label="Next Artwork"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Thumbnail Carousel Dots & Selector */}
        {!isPureCSSRadioMode && (
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            {artworks.map((art, idx) => (
              <button
                key={art.id}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-500 rounded-full flex items-center ${
                  idx === activeIndex
                    ? 'w-10 h-3 bg-[#c5a059] shadow-md shadow-[#c5a059]/40'
                    : 'w-3 h-3 bg-white/20 hover:bg-white/40'
                }`}
                title={art.title}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
