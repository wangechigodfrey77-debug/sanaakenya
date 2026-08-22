import React from 'react';
import { ShoppingBag, Compass, Sparkles, MapPin, Users, Filter, SlidersHorizontal, ShieldCheck } from 'lucide-react';
import { CarouselMode, Currency } from '../types';

interface NavbarProps {
  mode: CarouselMode;
  setMode: (mode: CarouselMode) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenCSSEngine: () => void;
  onOpenAdmin: () => void;
  selectedCategory: string;
  setSelectedCategory: (cat: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  currency,
  setCurrency,
  cartCount,
  onOpenCart,
  onOpenCSSEngine,
  onOpenAdmin,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#080808]/90 backdrop-blur-md border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059] text-black flex items-center justify-center font-serif text-2xl font-bold shadow-md shadow-[#c5a059]/20 transform transition-transform hover:scale-105">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-2xl font-bold tracking-[0.15em] text-white uppercase">
                  SANAA <span className="text-[#c5a059]">KENYA</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#c5a059]/10 text-[#c5a059] font-semibold border border-[#c5a059]/20 hidden sm:inline-block">
                  Pure Craft
                </span>
              </div>
              <p className="text-xs text-white/50 font-medium hidden md:block">
                Handcrafted Artistry from Kenyan Master Artisans
              </p>
            </div>
          </div>

          {/* Carousel Mode Selector Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#121212] p-1.5 rounded-2xl border border-white/10 shadow-inner">
            <button
              id="nav-mode-3d"
              onClick={() => setMode('3d-coverflow')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === '3d-coverflow'
                  ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/30 scale-[1.02]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>3D Showcase</span>
            </button>

            <button
              id="nav-mode-hero"
              onClick={() => setMode('hero-filmstrip')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === 'hero-filmstrip'
                  ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/30 scale-[1.02]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Filmstrip</span>
            </button>

            <button
              id="nav-mode-category"
              onClick={() => setMode('category-snap')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === 'category-snap'
                  ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/30 scale-[1.02]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Collection Tracks</span>
            </button>

            <button
              id="nav-mode-region"
              onClick={() => setMode('shop-by-region')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === 'shop-by-region'
                  ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/30 scale-[1.02]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-current" />
              <span>Region / Tribe</span>
            </button>

            <button
              id="nav-mode-artisan"
              onClick={() => setMode('artisan-stories')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === 'artisan-stories'
                  ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/30 scale-[1.02]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Featured Artisans</span>
            </button>

            <button
              id="nav-mode-map"
              onClick={() => setMode('craft-map')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                mode === 'craft-map'
                  ? 'bg-[#c5a059] text-black shadow-md shadow-[#c5a059]/30 scale-[1.02]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Heritage Map</span>
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Admin Portal Button */}
            <button
              id="open-admin-portal-btn"
              onClick={onOpenAdmin}
              title="Open Sanaa Kenya Admin Portal"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#171717] hover:bg-[#222] text-[#00a859] text-xs font-bold border border-[#00a859]/30 shadow-sm transition-all hover:scale-105"
            >
              <ShieldCheck className="w-4 h-4 text-[#00a859]" />
              <span className="hidden sm:inline">Admin Portal</span>
            </button>

            {/* Display Controls Button */}
            <button
              id="open-css-engine-btn"
              onClick={onOpenCSSEngine}
              title="Inspect Display Controls"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#121212] hover:bg-[#1a1a1a] text-[#c5a059] text-xs font-semibold border border-white/10 transition-all hover:scale-105"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Controls</span>
            </button>

            {/* Currency Switcher */}
            <div className="relative">
              <select
                id="currency-selector"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
                className="appearance-none bg-[#121212] hover:bg-[#1a1a1a] text-white text-xs font-bold px-2.5 py-1.5 pr-6 rounded-xl border border-white/10 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] transition-all cursor-pointer"
              >
                <option value="USD" className="bg-[#121212] text-white">USD ($)</option>
                <option value="EUR" className="bg-[#121212] text-white">EUR (€)</option>
                <option value="GBP" className="bg-[#121212] text-white">GBP (£)</option>
                <option value="KES" className="bg-[#121212] text-white">KES (KSh)</option>
              </select>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-[10px]">▼</span>
            </div>

            {/* Shopping Bag Button */}
            <button
              id="open-cart-btn"
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-[#c5a059] hover:bg-white text-black shadow-md shadow-[#c5a059]/20 transition-all transform hover:scale-105 flex items-center justify-center font-bold"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-black" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md border border-black/20">
                  {cartCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Mobile Navigation Sub-Bar */}
        <div className="lg:hidden mt-3 pt-2 border-t border-white/10 flex items-center gap-1 overflow-x-auto no-scrollbar pb-1">
          <button
            onClick={onOpenAdmin}
            className="whitespace-nowrap text-xs font-bold px-3 py-1 rounded-lg bg-[#00a859]/20 text-[#00a859] border border-[#00a859]/40 flex items-center gap-1"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Admin
          </button>
          <button
            onClick={() => setMode('3d-coverflow')}
            className={`whitespace-nowrap text-xs font-medium px-3 py-1 rounded-lg transition-all ${
              mode === '3d-coverflow' ? 'bg-[#c5a059] text-black font-bold' : 'bg-[#121212] text-white/70 border border-white/5'
            }`}
          >
            ✨ 3D Showcase
          </button>
          <button
            onClick={() => setMode('hero-filmstrip')}
            className={`whitespace-nowrap text-xs font-medium px-3 py-1 rounded-lg transition-all ${
              mode === 'hero-filmstrip' ? 'bg-[#c5a059] text-black font-bold' : 'bg-[#121212] text-white/70 border border-white/5'
            }`}
          >
            🎞️ Filmstrip
          </button>
          <button
            onClick={() => setMode('category-snap')}
            className={`whitespace-nowrap text-xs font-medium px-3 py-1 rounded-lg transition-all ${
              mode === 'category-snap' ? 'bg-[#c5a059] text-black font-bold' : 'bg-[#121212] text-white/70 border border-white/5'
            }`}
          >
            🎨 Categories
          </button>
          <button
            onClick={() => setMode('shop-by-region')}
            className={`whitespace-nowrap text-xs font-medium px-3 py-1 rounded-lg transition-all ${
              mode === 'shop-by-region' ? 'bg-[#c5a059] text-black font-bold' : 'bg-[#121212] text-white/70 border border-white/5'
            }`}
          >
            🧭 Region / Tribe
          </button>
          <button
            onClick={() => setMode('artisan-stories')}
            className={`whitespace-nowrap text-xs font-medium px-3 py-1 rounded-lg transition-all ${
              mode === 'artisan-stories' ? 'bg-[#c5a059] text-black font-bold' : 'bg-[#121212] text-white/70 border border-white/5'
            }`}
          >
            👥 Featured Artisans
          </button>
          <button
            onClick={() => setMode('craft-map')}
            className={`whitespace-nowrap text-xs font-medium px-3 py-1 rounded-lg transition-all ${
              mode === 'craft-map' ? 'bg-[#c5a059] text-black font-bold' : 'bg-[#121212] text-white/70 border border-white/5'
            }`}
          >
            🗺️ Map
          </button>
        </div>

      </div>
    </header>
  );
};
