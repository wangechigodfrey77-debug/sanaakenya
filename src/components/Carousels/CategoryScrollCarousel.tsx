import React, { useState } from 'react';
import { Search, SlidersHorizontal, Eye, ShoppingBag, ShieldCheck, Star } from 'lucide-react';
import { Artwork, Category, Currency } from '../../types';

interface CategoryScrollCarouselProps {
  artworks: Artwork[];
  currency: Currency;
  formatPrice: (priceUSD: number, currency: Currency) => string;
  onInspect: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
}

const CATEGORY_ITEMS: { id: Category; label: string; icon: string }[] = [
  { id: 'all', label: 'All Collections', icon: '🏛️' },
  { id: 'soapstone', label: 'Kisii Soapstone', icon: '🗿' },
  { id: 'beadwork', label: 'Maasai Beadwork', icon: '📿' },
  { id: 'woodcarving', label: 'Ebony Woodcraft', icon: '🪵' },
  { id: 'baskets', label: 'Sisal Kiondo', icon: '🧺' },
  { id: 'glass', label: 'Kitengela Glass', icon: '🧪' },
  { id: 'batik', label: 'Swahili Batik', icon: '🎨' },
];

export const CategoryScrollCarousel: React.FC<CategoryScrollCarouselProps> = ({
  artworks,
  currency,
  formatPrice,
  onInspect,
  onAddToCart,
}) => {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(500);

  const filteredArtworks = artworks.filter((art) => {
    const matchesCategory = activeCategory === 'all' || art.category === activeCategory;
    const matchesSearch =
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = art.priceUSD <= maxPriceFilter;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs text-[#c5a059] font-extrabold uppercase tracking-widest">
              Curated Masterpiece Collections
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1 tracking-wide">
              Explore by <span className="text-[#c5a059]">Traditional Medium</span>
            </h2>
          </div>

          {/* Search & Filter Inputs */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search art, region or artisan..."
                className="pl-9 pr-4 py-2 rounded-xl bg-[#121212] border border-white/10 text-xs font-medium text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c5a059] w-60 shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 bg-[#121212] px-3 py-2 rounded-xl border border-white/10 text-xs font-semibold text-white/80 shadow-sm">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Under ${maxPriceFilter}</span>
              <input
                type="range"
                min="100"
                max="500"
                step="25"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-20 accent-[#c5a059] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-6">
          {CATEGORY_ITEMS.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-md shadow-[#c5a059]/25 scale-[1.02]'
                  : 'bg-[#121212] text-white/70 border-white/10 hover:border-white/20 hover:bg-[#1a1a1a]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Product Track */}
        {filteredArtworks.length === 0 ? (
          <div className="text-center py-16 bg-[#121212] rounded-3xl border border-dashed border-white/10 p-8">
            <p className="text-lg font-bold text-white">No handcrafted pieces match your criteria</p>
            <p className="text-xs text-white/50 mt-1">Try resetting search query or price slider filter</p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
                setMaxPriceFilter(500);
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-[#c5a059] text-black text-xs font-bold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="snap-carousel flex overflow-x-auto no-scrollbar gap-6 py-2 px-1">
            {filteredArtworks.map((art) => (
              <div
                key={art.id}
                className="snap-card flex-none w-[280px] sm:w-[320px] bg-[#121212] rounded-3xl p-4 border border-white/10 shadow-lg css-parallax-hover group flex flex-col justify-between text-white"
              >
                <div>
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1a1a1a] mb-3.5">
                    <img
                      src={art.image}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover css-zoom-img"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#080808]/80 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full border border-white/20">
                      {art.categoryLabel}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#c5a059] font-bold uppercase tracking-wider">{art.region}</span>
                      <span className="flex items-center gap-1 text-[#c5a059] font-extrabold bg-[#c5a059]/10 px-2 py-0.5 rounded border border-[#c5a059]/20">
                        <Star className="w-3 h-3 fill-[#c5a059] text-[#c5a059]" />
                        {art.rating}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-white text-lg leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-xs text-white/50 italic">"{art.kiswahiliTitle}"</p>

                    <p className="text-xs text-white/60 line-clamp-2 mt-1">
                      {art.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-white/40 font-bold">Price</span>
                    <p className="text-lg font-extrabold text-[#c5a059]">
                      {formatPrice(art.priceUSD, currency)}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onInspect(art)}
                      className="p-2 rounded-xl bg-[#1a1a1a] hover:bg-[#252525] text-white transition-all border border-white/10"
                      title="Inspect Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onAddToCart(art)}
                      className="px-3 py-2 rounded-xl bg-[#c5a059] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Buy</span>
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
