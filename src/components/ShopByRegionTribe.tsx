import React, { useState } from 'react';
import { MapPin, Compass, Sparkles, ShieldCheck, ShoppingBag, Eye, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { REGION_TRIBE_DATA } from '../data/artworks';
import { Artwork, Currency, RegionTribeInfo } from '../types';

interface ShopByRegionTribeProps {
  artworks: Artwork[];
  currency: Currency;
  formatPrice: (priceUSD: number, cur: Currency) => string;
  onInspect: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
}

export const ShopByRegionTribe: React.FC<ShopByRegionTribeProps> = ({
  artworks,
  currency,
  formatPrice,
  onInspect,
  onAddToCart,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('maasai');

  const activeRegionData: RegionTribeInfo =
    REGION_TRIBE_DATA.find((r) => r.id === selectedRegionId) || REGION_TRIBE_DATA[0];

  // Filter artworks belonging to this region
  const regionArtworks = artworks.filter((art) => {
    const rId = selectedRegionId.toLowerCase();
    if (rId === 'maasai') return art.artisan.id === 'oloitokitok' || art.region.toLowerCase().includes('amboseli') || art.region.toLowerCase().includes('narok');
    if (rId === 'kisii-luo') return art.artisan.id === 'tabaka' || art.region.toLowerCase().includes('kisii');
    if (rId === 'akamba') return art.artisan.id === 'machakos' || art.region.toLowerCase().includes('machakos') || art.region.toLowerCase().includes('wamunyu');
    if (rId === 'taita-kikuyu') return art.artisan.id === 'taita' || art.region.toLowerCase().includes('voi') || art.region.toLowerCase().includes('taita');
    if (rId === 'swahili-giriama') return art.artisan.id === 'lamu' || art.region.toLowerCase().includes('lamu');
    if (rId === 'kitengela-eco') return art.artisan.id === 'kitengela' || art.region.toLowerCase().includes('kitengela');
    return true;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] flex items-center justify-center gap-2">
          <Compass className="w-4 h-4" />
          Kenyan Cultural Heritage & Lineages
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
          Shop by Region & Tribe
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Kenya's artistic expressions are intimately tied to geographic landscapes, indigenous tribal heritage, and ancestral traditions. Explore the unique artistic characteristics of each region.
        </p>
      </div>

      {/* Region / Tribe Selector Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-3 no-scrollbar pt-2">
        {REGION_TRIBE_DATA.map((region) => {
          const isSelected = region.id === selectedRegionId;
          return (
            <button
              key={region.id}
              onClick={() => setSelectedRegionId(region.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap border shrink-0 ${
                isSelected
                  ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-lg shadow-[#c5a059]/20 scale-105'
                  : 'bg-[#121212] text-white/70 border-white/10 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#c5a059]'}`} />
              <span>{region.tribeName}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Region Detailed Spotlight Banner */}
      <div className="bg-[#121212] rounded-3xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Aspect: Visual Cover & Meta */}
        <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[460px] bg-[#080808] overflow-hidden flex flex-col justify-end p-6 sm:p-8">
          <img
            src={activeRegionData.image}
            alt={activeRegionData.tribeName}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover opacity-40 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />

          <div className="relative z-10 space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#c5a059] text-black text-[11px] font-extrabold uppercase tracking-wider">
                {activeRegionData.tribeName}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[11px] font-semibold border border-white/10 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#c5a059]" />
                {activeRegionData.location}
              </span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              {activeRegionData.regionName}
            </h3>

            <p className="text-xs text-white/70 italic leading-relaxed">
              "{activeRegionData.historicalOrigins}"
            </p>

            <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
              <span className="text-white/50">Primary Medium:</span>
              <span className="font-bold text-[#c5a059]">{activeRegionData.primaryMedium}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/50">Artisan Guild Size:</span>
              <span className="font-bold text-white">{activeRegionData.artisanCount}</span>
            </div>
          </div>
        </div>

        {/* Right Aspect: Brief Overview of Artistic Characteristics */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-[#121212]">
          
          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#c5a059]" />
                Artistic Characteristics & Cultural Overview
              </h4>
              <span className="text-xs text-[#c5a059] font-semibold uppercase tracking-widest">
                {activeRegionData.artisanGroup}
              </span>
            </div>

            {/* 3 Overview Characteristic Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Materials & Techniques */}
              <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  <span>Materials & Craft</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {activeRegionData.artisticCharacteristics.materialsAndTechniques}
                </p>
              </div>

              {/* Color & Symbolism */}
              <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>Color & Symbolism</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {activeRegionData.artisticCharacteristics.colorSymbolism}
                </p>
              </div>

              {/* Cultural Significance */}
              <div className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Cultural Lineage</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  {activeRegionData.artisticCharacteristics.culturalSignificance}
                </p>
              </div>

            </div>

            {/* Key Symbols Chips */}
            <div className="pt-2 flex items-center gap-2 flex-wrap">
              <span className="text-xs text-white/40 font-semibold uppercase tracking-wider">Key Motifs:</span>
              {activeRegionData.keySymbols.map((sym, i) => (
                <span key={i} className="px-3 py-1 rounded-xl bg-[#1a1a1a] border border-white/10 text-white/90 text-xs font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#c5a059]" />
                  {sym}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#1a1a1a]/80 border border-[#c5a059]/20 text-xs text-white/60 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              Authentic Direct Sourcing Guarantee
            </span>
            <span className="text-[#c5a059] font-bold">100% Fair Trade Certified</span>
          </div>

        </div>

      </div>

      {/* Handcrafted Artworks Grid for Selected Region */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-white">
              Handcrafted Masterpieces from {activeRegionData.tribeName}
            </h3>
            <p className="text-xs text-white/50">
              Showing {regionArtworks.length} direct certified pieces from {activeRegionData.location}
            </p>
          </div>
        </div>

        {regionArtworks.length === 0 ? (
          <div className="p-12 text-center bg-[#121212] rounded-3xl border border-white/10 space-y-2">
            <p className="text-white/60 text-sm">No artwork available in this region currently.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {regionArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="group bg-[#121212] rounded-3xl border border-white/10 overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Quick Badge */}
                <div className="relative aspect-[4/3] bg-[#1a1a1a] overflow-hidden">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#c5a059] text-black text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-md">
                    {artwork.categoryLabel}
                  </div>
                  <button
                    onClick={() => onInspect(artwork)}
                    className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md hover:bg-black text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                    <span>Inspect</span>
                  </button>
                </div>

                {/* Content Details */}
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {artwork.region}
                    </span>
                    <h4 className="font-serif font-bold text-base text-white mt-1 group-hover:text-[#c5a059] transition-colors line-clamp-1">
                      {artwork.title}
                    </h4>
                    <p className="text-xs italic text-white/50 font-serif line-clamp-1">
                      "{artwork.kiswahiliTitle}"
                    </p>
                    <p className="text-xs text-white/60 line-clamp-2 mt-2 leading-relaxed">
                      {artwork.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] text-white/40 uppercase font-bold block">Fair Price</span>
                      <span className="text-base font-extrabold text-[#c5a059]">
                        {formatPrice(artwork.priceUSD, currency)}
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(artwork)}
                      className="px-4 py-2 rounded-xl bg-[#c5a059] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 transform active:scale-95"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Acquire</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};
