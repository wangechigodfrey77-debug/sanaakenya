import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { ThreeDShowcaseCarousel } from './components/Carousels/ThreeDShowcaseCarousel';
import { HeroFilmstripCarousel } from './components/Carousels/HeroFilmstripCarousel';
import { CategoryScrollCarousel } from './components/Carousels/CategoryScrollCarousel';
import { ArtisanSpotlightCarousel } from './components/Carousels/ArtisanSpotlightCarousel';
import { KenyaCraftMap } from './components/Carousels/KenyaCraftMap';
import { ShopByRegionTribe } from './components/ShopByRegionTribe';
import { FeaturedArtisanSection } from './components/FeaturedArtisanSection';
import { ArtDetailModal } from './components/ArtDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { CSSControlsToggle } from './components/CSSControlsToggle';
import { ARTWORKS } from './data/artworks';
import { Artwork, CarouselMode, CartItem, Currency } from './types';
import { KenyaRegionKey } from './data/deliveryRegions';
import { Sparkles, ShieldCheck, HeartHandshake, Truck, Layers } from 'lucide-react';

export default function App() {
  const [carouselMode, setCarouselMode] = useState<CarouselMode>('3d-coverflow');
  const [currency, setCurrency] = useState<Currency>('USD');
  const [cart, setCart] = useState<CartItem[]>([
    { artwork: ARTWORKS[0], quantity: 1 } // Initial item in cart
  ]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [selectedArtworkForModal, setSelectedArtworkForModal] = useState<Artwork | null>(null);
  const [isPureCSSRadioMode, setIsPureCSSRadioMode] = useState<boolean>(false);
  const [transitionSpeedSec, setTransitionSpeedSec] = useState<number>(0.65);
  const [isCSSEngineOpen, setIsCSSEngineOpen] = useState<boolean>(false);
  const [checkoutTipPercentage, setCheckoutTipPercentage] = useState<number>(10);
  const [checkoutRegionKey, setCheckoutRegionKey] = useState<KenyaRegionKey>('nairobi');

  // Price formatter with live exchange rates
  const formatPrice = (priceUSD: number, cur: Currency): string => {
    switch (cur) {
      case 'EUR':
        return `€${Math.round(priceUSD * 0.92)}`;
      case 'GBP':
        return `£${Math.round(priceUSD * 0.79)}`;
      case 'KES':
        return `KSh ${(priceUSD * 130).toLocaleString()}`;
      default:
        return `$${priceUSD}`;
    }
  };

  // Cart operations
  const handleAddToCart = (artwork: Artwork) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.artwork.id === artwork.id);
      if (existing) {
        return prev.map((item) =>
          item.artwork.id === artwork.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { artwork, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (artworkId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(artworkId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.artwork.id === artworkId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (artworkId: string) => {
    setCart((prev) => prev.filter((item) => item.artwork.id !== artworkId));
  };

  const handleProceedToCheckout = (tipPct: number, selectedRegionKey?: KenyaRegionKey) => {
    setCheckoutTipPercentage(tipPct);
    if (selectedRegionKey) {
      setCheckoutRegionKey(selectedRegionKey);
    }
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#e5e5e5] flex flex-col font-sans selection:bg-[#c5a059] selection:text-black">
      
      {/* Navbar */}
      <Navbar
        mode={carouselMode}
        setMode={setCarouselMode}
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenCSSEngine={() => setIsCSSEngineOpen(true)}
        selectedCategory="all"
        setSelectedCategory={() => {}}
      />

      {/* Hero Welcome Banner */}
      <div className="bg-gradient-to-r from-[#121212] via-[#1a1a1a] to-[#080808] text-white/90 py-2.5 px-4 text-center text-xs font-semibold border-b border-white/5 flex items-center justify-center gap-3 flex-wrap">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>100% Authentic Kenyan Craftsmanship</span>
        </span>
        <span className="hidden sm:inline text-white/20">•</span>
        <span className="hidden sm:inline flex items-center gap-1">
          <Truck className="w-3.5 h-3.5 text-[#c5a059]" />
          <span>Worldwide Express Air Freight & Certificate of Authenticity</span>
        </span>
        <span className="hidden md:inline text-white/20">•</span>
        <span className="hidden md:inline flex items-center gap-1 text-[#c5a059] font-bold">
          <Layers className="w-3.5 h-3.5" />
          <span>Heavily CSS-Driven Smooth Transitions</span>
        </span>
      </div>

      {/* Main Content Area based on Carousel Mode */}
      <main className="flex-1 space-y-12 pb-16">
        
        {/* Mode 1: 3D Showcase Carousel */}
        {carouselMode === '3d-coverflow' && (
          <>
            <ThreeDShowcaseCarousel
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
              isPureCSSRadioMode={isPureCSSRadioMode}
              setIsPureCSSRadioMode={setIsPureCSSRadioMode}
              transitionSpeedSec={transitionSpeedSec}
            />
            <CategoryScrollCarousel
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
            />
          </>
        )}

        {/* Mode 2: Hero Filmstrip Horizontal Carousel */}
        {carouselMode === 'hero-filmstrip' && (
          <>
            <HeroFilmstripCarousel
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
            />
            <ArtisanSpotlightCarousel />
          </>
        )}

        {/* Mode 3: Category Collection Tracks */}
        {carouselMode === 'category-snap' && (
          <>
            <CategoryScrollCarousel
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
            />
            <ThreeDShowcaseCarousel
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
              isPureCSSRadioMode={isPureCSSRadioMode}
              setIsPureCSSRadioMode={setIsPureCSSRadioMode}
              transitionSpeedSec={transitionSpeedSec}
            />
          </>
        )}

        {/* Mode 4: Shop by Region & Tribe */}
        {carouselMode === 'shop-by-region' && (
          <>
            <ShopByRegionTribe
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
            />
            <FeaturedArtisanSection
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
            />
          </>
        )}

        {/* Mode 5: Featured Artisan Stories */}
        {carouselMode === 'artisan-stories' && (
          <>
            <FeaturedArtisanSection
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
            />
            <ShopByRegionTribe
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
            />
          </>
        )}

        {/* Mode 6: Heritage Map */}
        {carouselMode === 'craft-map' && (
          <>
            <KenyaCraftMap />
            <ShopByRegionTribe
              artworks={ARTWORKS}
              currency={currency}
              formatPrice={formatPrice}
              onInspect={(art) => setSelectedArtworkForModal(art)}
              onAddToCart={handleAddToCart}
            />
          </>
        )}

        {/* Universal Section: Shop By Region & Tribe */}
        {carouselMode !== 'shop-by-region' && (
          <ShopByRegionTribe
            artworks={ARTWORKS}
            currency={currency}
            formatPrice={formatPrice}
            onInspect={(art) => setSelectedArtworkForModal(art)}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Universal Section: Featured Master Artisan */}
        {carouselMode !== 'artisan-stories' && (
          <FeaturedArtisanSection
            artworks={ARTWORKS}
            currency={currency}
            formatPrice={formatPrice}
            onInspect={(art) => setSelectedArtworkForModal(art)}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* Universal Section: Heritage Map */}
        {carouselMode !== 'craft-map' && (
          <KenyaCraftMap />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#080808] text-white/80 border-t border-white/5 pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-white/5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-[#c5a059] text-black font-serif font-bold text-lg flex items-center justify-center">
                  S
                </div>
                <span className="font-serif font-bold text-xl tracking-[0.15em] uppercase text-white">
                  SANAA <span className="text-[#c5a059]">KENYA</span>
                </span>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Empowering Kenyan artisans through fair-trade fine art galleries. Each purchase preserves cultural craft techniques dating back centuries.
              </p>
            </div>

            <div>
              <h4 className="font-serif font-bold text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-3">
                Art Mediums
              </h4>
              <ul className="text-xs text-white/50 space-y-2">
                <li>• Kisii Soapstone Carvings</li>
                <li>• Maasai Ceremonial Beadwork</li>
                <li>• Machakos Ebony & Olive Sculptures</li>
                <li>• Taita Handwoven Sisal Kiondos</li>
                <li>• Kitengela Recycled Blown Glass</li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-3">
                Fair Trade Guarantee
              </h4>
              <ul className="text-xs text-white/50 space-y-2">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Official Certificate of Authenticity
                </li>
                <li className="flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-[#c5a059]" />
                  Direct Community Guild Tip Option
                </li>
                <li className="flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#c5a059]" />
                  Global Express Air Shipping
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-serif font-bold text-xs uppercase tracking-[0.2em] text-[#c5a059] mb-3">
                CSS Transition Engine
              </h4>
              <p className="text-xs text-white/50 leading-relaxed mb-3">
                Built with hardware-accelerated 3D transforms (<code className="text-[#c5a059]">rotateY</code>, <code className="text-[#c5a059]">translate3d</code>) and pure CSS radio state selectors.
              </p>
              <button
                onClick={() => setIsCSSEngineOpen(true)}
                className="px-3.5 py-2 rounded-lg bg-[#121212] hover:bg-[#1a1a1a] text-[#c5a059] text-xs font-bold border border-white/10 transition-all uppercase tracking-widest"
              >
                Inspect CSS Controls
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30 tracking-wider">
            <p>© 2026 Sanaa Kenya. Crafted in Kenya & Powered by Pure CSS Transitions.</p>
            <div className="flex items-center gap-3">
              <span>🇰🇪 Made in Kenya</span>
              <span>•</span>
              <span>Fair Trade Certified</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Modals & Drawers */}
      <ArtDetailModal
        artwork={selectedArtworkForModal}
        onClose={() => setSelectedArtworkForModal(null)}
        currency={currency}
        formatPrice={formatPrice}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        currency={currency}
        formatPrice={formatPrice}
        onProceedToCheckout={handleProceedToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        tipPercentage={checkoutTipPercentage}
        initialRegionKey={checkoutRegionKey}
        currency={currency}
        formatPrice={formatPrice}
        onOrderComplete={() => setCart([])}
      />

      <CSSControlsToggle
        isOpen={isCSSEngineOpen}
        onClose={() => setIsCSSEngineOpen(false)}
        isPureCSSRadioMode={isPureCSSRadioMode}
        setIsPureCSSRadioMode={setIsPureCSSRadioMode}
        transitionSpeedSec={transitionSpeedSec}
        setTransitionSpeedSec={setTransitionSpeedSec}
      />

    </div>
  );
}
