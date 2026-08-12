import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Heart, ShieldCheck, ArrowRight, Truck, MapPin } from 'lucide-react';
import { CartItem, Currency } from '../types';
import { KENYA_DELIVERY_REGIONS, getDeliveryRegionInfo, KenyaRegionKey } from '../data/deliveryRegions';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (artworkId: string, qty: number) => void;
  onRemoveItem: (artworkId: string) => void;
  currency: Currency;
  formatPrice: (priceUSD: number, currency: Currency) => string;
  onProceedToCheckout: (tipPercentage: number, selectedRegionKey?: KenyaRegionKey) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  currency,
  formatPrice,
  onProceedToCheckout,
}) => {
  const [tipPercentage, setTipPercentage] = useState<number>(10);
  const [selectedRegionKey, setSelectedRegionKey] = useState<KenyaRegionKey>('nairobi');

  if (!isOpen) return null;

  const activeRegion = getDeliveryRegionInfo(selectedRegionKey);
  const shippingKsh = activeRegion.feeKsh;
  const shippingUSD = shippingKsh / 130;

  const subtotalUSD = cart.reduce((acc, item) => acc + item.artwork.priceUSD * item.quantity, 0);
  const artisanTipUSD = (subtotalUSD * tipPercentage) / 100;
  const totalUSD = subtotalUSD + artisanTipUSD + shippingUSD;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        
        <div className="w-screen max-w-md bg-[#080808] text-white shadow-2xl flex flex-col justify-between border-l border-white/10">
          
          {/* Drawer Header */}
          <div className="p-6 bg-[#121212] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#c5a059]" />
              <h2 className="font-serif text-xl font-bold text-white tracking-wide">
                Your Acquisition Bag ({cart.reduce((a, c) => a + c.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-[#1a1a1a] transition-all border border-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#121212] border border-white/10 mx-auto flex items-center justify-center text-white/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="font-serif font-bold text-lg text-white">Your bag is empty</p>
                <p className="text-xs text-white/50 max-w-xs mx-auto">
                  Explore our 3D showcase to add authentic handcrafted Kenyan artwork to your collection.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.artwork.id}
                  className="p-3.5 bg-[#121212] rounded-2xl border border-white/10 shadow-sm flex items-center gap-3"
                >
                  <img
                    src={item.artwork.image}
                    alt={item.artwork.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover bg-[#1a1a1a] border border-white/10"
                  />

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif font-bold text-sm text-white truncate">
                      {item.artwork.title}
                    </h4>
                    <p className="text-[11px] text-[#c5a059] font-semibold">{item.artwork.region}</p>
                    <p className="text-xs font-extrabold text-[#c5a059] mt-1">
                      {formatPrice(item.artwork.priceUSD, currency)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.artwork.id)}
                      className="text-white/40 hover:text-rose-400 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center gap-2 bg-[#1a1a1a] px-2 py-1 rounded-lg border border-white/10">
                      <button
                        onClick={() => onUpdateQuantity(item.artwork.id, item.quantity - 1)}
                        className="text-white/60 hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.artwork.id, item.quantity + 1)}
                        className="text-white/60 hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Kenya Delivery Region Fee Estimator */}
            {cart.length > 0 && (
              <div className="p-4 bg-[#121212] rounded-2xl border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                    Kenya Delivery Region:
                  </span>
                  <span className="text-xs font-extrabold text-[#c5a059]">
                    KSh {shippingKsh.toLocaleString()}
                  </span>
                </div>

                <select
                  value={selectedRegionKey}
                  onChange={(e) => setSelectedRegionKey(e.target.value as KenyaRegionKey)}
                  className="w-full p-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-xs font-semibold text-white focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                >
                  {KENYA_DELIVERY_REGIONS.map((reg) => (
                    <option key={reg.key} value={reg.key}>
                      {reg.label} — KSh {reg.feeKsh} ({reg.estimatedTime})
                    </option>
                  ))}
                </select>

                <p className="text-[10px] text-white/50 italic leading-tight">
                  Delivery fee: 200 KSh Nairobi, 300 KSh Central, 500 KSh Western, 600 KSh Coast, 500 KSh All Other Regions.
                </p>
              </div>
            )}

            {/* Artisan Community Impact Tip Selector */}
            {cart.length > 0 && (
              <div className="p-4 bg-[#121212] rounded-2xl border border-[#c5a059]/20 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#c5a059] flex items-center gap-1.5">
                    <Heart className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                    Direct Artisan Community Fund Tip:
                  </span>
                  <span className="text-xs font-extrabold text-[#c5a059]">
                    +{formatPrice(artisanTipUSD, currency)}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[0, 5, 10, 15].map((pct) => (
                    <button
                      key={pct}
                      onClick={() => setTipPercentage(pct)}
                      className={`py-1.5 rounded-xl text-xs font-extrabold transition-all border ${
                        tipPercentage === pct
                          ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-sm'
                          : 'bg-[#1a1a1a] text-white/80 border-white/10 hover:bg-[#252525]'
                      }`}
                    >
                      {pct === 0 ? 'None' : `+${pct}%`}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Checkout Footer Breakdown */}
          {cart.length > 0 && (
            <div className="p-6 bg-[#121212] border-t border-white/10 space-y-3">
              <div className="space-y-1.5 text-xs text-white/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">{formatPrice(subtotalUSD, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Artisan Fund Contribution ({tipPercentage}%)</span>
                  <span className="font-bold text-white">{formatPrice(artisanTipUSD, currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#c5a059]" /> Regional Express Courier ({activeRegion.label})
                  </span>
                  <span className="font-bold text-white">
                    {currency === 'KES' ? `KSh ${shippingKsh.toLocaleString()}` : `${formatPrice(shippingUSD, currency)} (KSh ${shippingKsh})`}
                  </span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-base font-extrabold text-white">
                  <span>Grand Total</span>
                  <span className="text-[#c5a059]">{formatPrice(totalUSD, currency)}</span>
                </div>
              </div>

              <button
                onClick={() => onProceedToCheckout(tipPercentage, selectedRegionKey)}
                className="w-full py-3.5 rounded-2xl bg-[#c5a059] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#c5a059]/20 flex items-center justify-center gap-2 transform active:scale-95"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[10px] text-center text-white/40 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
                Includes M-PESA Payment Option & Authenticity Certificate
              </p>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
