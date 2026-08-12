import React, { useState, useRef } from 'react';
import { Volume2, VolumeX, ShieldCheck, ArrowRight, Eye, ShoppingBag, Sparkles, MapPin } from 'lucide-react';
import { Artwork, Currency } from '../../types';

interface HeroFilmstripCarouselProps {
  artworks: Artwork[];
  currency: Currency;
  formatPrice: (priceUSD: number, currency: Currency) => string;
  onInspect: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
}

export const HeroFilmstripCarousel: React.FC<HeroFilmstripCarouselProps> = ({
  artworks,
  currency,
  formatPrice,
  onInspect,
  onAddToCart,
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Synthesize relaxing African Savannah background soundscape using Web Audio API
  const toggleSavannahAudio = () => {
    if (isAudioPlaying) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsAudioPlaying(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Gentle wind / savannah ambient sound generator using pink noise and warm filter
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.02; // Very gentle volume
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.08, ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();
        setIsAudioPlaying(true);
      } catch (err) {
        console.log('Audio playback initialized');
      }
    }
  };

  return (
    <section className="relative w-full bg-[#080808] text-white py-10 md:py-16 overflow-hidden">
      
      {/* Background Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Horizontal Snap Filmstrip</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-wide">
            The <span className="text-[#c5a059]">Cultural Narrative</span> Gallery
          </h2>
          <p className="text-white/60 text-sm mt-1 max-w-xl font-light">
            Slide horizontally through Kenya’s rich artistic heritage.
          </p>
        </div>

        {/* Ambient Soundscape Button */}
        <button
          onClick={toggleSavannahAudio}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all border shadow-lg ${
            isAudioPlaying
              ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-[#c5a059]/30'
              : 'bg-[#121212] text-white/80 border-white/10 hover:bg-[#1a1a1a]'
          }`}
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-pulse text-black" /> : <VolumeX className="w-4 h-4 text-white/40" />}
          <span>{isAudioPlaying ? 'Savannah Ambience Playing' : 'Play Savannah Soundscape'}</span>
        </button>
      </div>

      {/* Horizontal Full-Bleed Scroll Snap Container */}
      <div className="snap-carousel flex overflow-x-auto no-scrollbar gap-6 px-4 sm:px-8 pb-8 pt-2">
        {artworks.map((art) => (
          <div
            key={art.id}
            className="snap-card flex-none w-[88vw] sm:w-[620px] md:w-[780px] bg-[#121212] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 h-full">
              
              {/* Photo Box */}
              <div className="md:col-span-7 relative h-72 sm:h-80 md:h-[480px] overflow-hidden bg-[#080808]">
                <img
                  src={art.image}
                  alt={art.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover animate-ken-burns transition-transform duration-1000"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/30" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#c5a059] text-black text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                    {art.categoryLabel}
                  </span>
                  <span className="bg-[#080808]/70 backdrop-blur-md text-white/90 text-[11px] font-mono px-3 py-1 rounded-full border border-white/20">
                    <MapPin className="w-3 h-3 inline mr-1 text-[#c5a059]" />
                    {art.region}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#080808]/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-xs text-white/80 font-mono flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#c5a059]">
                    <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                    Certificate: {art.certificateId}
                  </span>
                  <span>{art.craftedDays} Days Handcrafted</span>
                </div>
              </div>

              {/* Story & Purchase Details Column */}
              <div className="md:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#121212]">
                
                <div>
                  <p className="text-xs text-[#c5a059] font-bold uppercase tracking-widest mb-1">
                    Artisan Story & Provenance
                  </p>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
                    {art.title}
                  </h3>
                  <p className="text-xs italic text-white/50 font-serif mb-4">
                    "{art.kiswahiliTitle}"
                  </p>

                  <p className="text-xs text-white/70 leading-relaxed mb-4 line-clamp-4">
                    {art.description}
                  </p>

                  {/* Materials Badges */}
                  <div className="space-y-1.5 mb-6">
                    <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold">Natural Authentic Materials:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {art.materials.map((mat, i) => (
                        <span key={i} className="text-[11px] bg-[#1a1a1a] text-white/80 px-2.5 py-1 rounded-lg border border-white/5">
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Artisan Profile Box */}
                  <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#1a1a1a] border border-white/10 mb-6">
                    <img
                      src={art.artisan.avatar}
                      alt={art.artisan.name}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border-2 border-[#c5a059]/50"
                    />
                    <div>
                      <p className="text-xs font-bold text-white">{art.artisan.name}</p>
                      <p className="text-[11px] text-[#c5a059]">{art.artisan.coopName}</p>
                      <p className="text-[10px] text-white/50">{art.artisan.experienceYears} Years Craft Heritage</p>
                    </div>
                  </div>
                </div>

                {/* Purchase Bar */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">Acquisition</span>
                    <p className="text-2xl font-extrabold text-[#c5a059]">
                      {formatPrice(art.priceUSD, currency)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onInspect(art)}
                      className="p-3 rounded-2xl bg-[#1a1a1a] hover:bg-[#252525] text-white text-xs font-semibold transition-all border border-white/10"
                      title="Inspect Provenance"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(art)}
                      className="px-4 py-3 rounded-2xl bg-[#c5a059] hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#c5a059]/20 flex items-center gap-2 transform active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Acquire Piece</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
