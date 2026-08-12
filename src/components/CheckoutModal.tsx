import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ShieldCheck,
  CreditCard,
  Phone,
  Sparkles,
  MapPin,
  Smartphone,
  Send,
  AlertCircle,
  Truck,
  Building2,
  Info
} from 'lucide-react';
import { CartItem, Currency, ShippingDetails, OrderConfirmation } from '../types';
import { KENYA_DELIVERY_REGIONS, getDeliveryRegionInfo, KenyaRegionKey } from '../data/deliveryRegions';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  tipPercentage: number;
  initialRegionKey?: KenyaRegionKey;
  currency: Currency;
  formatPrice: (priceUSD: number, currency: Currency) => string;
  onOrderComplete: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  tipPercentage,
  initialRegionKey = 'nairobi',
  currency,
  formatPrice,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'form' | 'stk_prompt' | 'processing' | 'confirmed'>('form');
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: 'Juma Omondi',
    email: 'juma.omondi@example.com',
    address: 'Kilmarnock Road, Suite 4B',
    city: 'Nairobi',
    country: 'Kenya',
    kenyaRegion: initialRegionKey,
    postalCode: '00100',
    paymentMethod: 'mpesa',
    phoneNumber: '0712 345 678',
    artisanTipPercentage: tipPercentage,
  });

  const [mpesaPin, setMpesaPin] = useState<string>('1234');
  const [pinError, setPinError] = useState<string>('');
  const [orderResult, setOrderResult] = useState<OrderConfirmation | null>(null);

  useEffect(() => {
    if (initialRegionKey) {
      setShippingDetails((prev) => ({ ...prev, kenyaRegion: initialRegionKey }));
    }
  }, [initialRegionKey]);

  if (!isOpen) return null;

  // Pricing math
  const subtotalUSD = cart.reduce((acc, item) => acc + item.artwork.priceUSD * item.quantity, 0);
  const artisanTipUSD = (subtotalUSD * tipPercentage) / 100;

  const activeRegion = getDeliveryRegionInfo(shippingDetails.kenyaRegion);
  const shippingKsh = activeRegion.feeKsh;
  const shippingUSD = shippingKsh / 130;

  const totalUSD = subtotalUSD + artisanTipUSD + shippingUSD;
  const subtotalKsh = Math.round(subtotalUSD * 130);
  const artisanTipKsh = Math.round(artisanTipUSD * 130);
  const totalKsh = subtotalKsh + artisanTipKsh + shippingKsh;

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (shippingDetails.paymentMethod === 'mpesa') {
      // Trigger M-PESA STK Push overlay
      setStep('stk_prompt');
    } else {
      // Direct processing for Card/Apple Pay
      triggerProcessingOrder();
    }
  };

  const handleMpesaStkConfirm = () => {
    if (mpesaPin.length !== 4) {
      setPinError('Please enter a valid 4-digit M-PESA PIN');
      return;
    }
    setPinError('');
    triggerProcessingOrder();
  };

  const triggerProcessingOrder = () => {
    setStep('processing');

    const receiptNo = `SKE${Math.floor(100000 + Math.random() * 900000)}M4P`;

    setTimeout(() => {
      const order: OrderConfirmation = {
        orderId: `SK-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-KE', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotalUSD,
        shippingUSD,
        shippingKsh,
        artisanTipUSD,
        totalUSD,
        totalKsh,
        shippingDetails,
        certificateNumber: `CERT-KE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        estimatedDelivery: `${activeRegion.estimatedTime} (${activeRegion.label})`,
        mpesaReceiptNo: receiptNo,
      };
      setOrderResult(order);
      setStep('confirmed');
    }, 2400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      
      <div className="relative w-full max-w-2xl bg-[#121212] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#1a1a1a] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-6 h-6 text-[#c5a059]" />
            <div>
              <h3 className="font-serif font-bold text-xl tracking-wide">
                Sanaa Kenya Express Checkout
              </h3>
              <p className="text-xs text-white/50">
                Official Artisan Guild Dispatch • Kenya Regional Express & M-PESA
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: FORM */}
          {step === 'form' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-white/80 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Select Payment Method</span>
                  <span className="text-[#00a859] font-mono text-[10px] font-extrabold flex items-center gap-1">
                    <Phone className="w-3 h-3" /> M-PESA Instant STK Push Supported
                  </span>
                </label>

                <div className="grid grid-cols-3 gap-3">
                  
                  {/* M-PESA Option */}
                  <button
                    type="button"
                    onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'mpesa' })}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      shippingDetails.paymentMethod === 'mpesa'
                        ? 'border-[#00a859] bg-[#00a859]/15 text-white font-bold ring-2 ring-[#00a859]'
                        : 'border-white/10 bg-[#1a1a1a] text-white/70 hover:bg-[#252525]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-6 h-6 rounded-full bg-[#00a859] text-white font-black text-[10px] flex items-center justify-center">
                        M
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-[#00a859] text-white text-[9px] font-mono font-black uppercase">
                        Ksh Direct
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-xs font-extrabold block text-white">Pay via M-PESA</span>
                      <span className="text-[10px] text-emerald-400 font-medium">Safaricom STK Push</span>
                    </div>
                  </button>

                  {/* Credit Card Option */}
                  <button
                    type="button"
                    onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'card' })}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      shippingDetails.paymentMethod === 'card'
                        ? 'border-[#c5a059] bg-[#c5a059]/15 text-white font-bold ring-2 ring-[#c5a059]'
                        : 'border-white/10 bg-[#1a1a1a] text-white/70 hover:bg-[#252525]'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-white/80" />
                    <div className="mt-2">
                      <span className="text-xs font-extrabold block text-white">Credit / Debit Card</span>
                      <span className="text-[10px] text-white/40">Visa, Mastercard</span>
                    </div>
                  </button>

                  {/* Apple Pay Option */}
                  <button
                    type="button"
                    onClick={() => setShippingDetails({ ...shippingDetails, paymentMethod: 'applepay' })}
                    className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      shippingDetails.paymentMethod === 'applepay'
                        ? 'border-[#c5a059] bg-[#c5a059]/15 text-white font-bold ring-2 ring-[#c5a059]'
                        : 'border-white/10 bg-[#1a1a1a] text-white/70 hover:bg-[#252525]'
                    }`}
                  >
                    <Sparkles className="w-5 h-5 text-[#c5a059]" />
                    <div className="mt-2">
                      <span className="text-xs font-extrabold block text-white">Apple Pay</span>
                      <span className="text-[10px] text-white/40">Instant Express</span>
                    </div>
                  </button>

                </div>
              </div>

              {/* Dedicated M-PESA Phone Details Box */}
              {shippingDetails.paymentMethod === 'mpesa' && (
                <div className="p-4 bg-[#00a859]/10 rounded-2xl border border-[#00a859]/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#00a859] flex items-center gap-1.5 uppercase tracking-wider">
                      <Smartphone className="w-4 h-4" />
                      Safaricom M-PESA Phone Number
                    </span>
                    <span className="text-[10px] text-emerald-400 font-mono font-bold bg-[#00a859]/20 px-2 py-0.5 rounded">
                      Paybill: 247247 (Sanaa Kenya)
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/70">
                      M-PESA Registered Number
                    </label>
                    <div className="relative mt-1">
                      <input
                        type="tel"
                        required
                        placeholder="0712 345 678 or 07XX XXX XXX"
                        value={shippingDetails.phoneNumber}
                        onChange={(e) => setShippingDetails({ ...shippingDetails, phoneNumber: e.target.value })}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#00a859]/40 bg-[#121212] text-xs font-bold text-white focus:ring-2 focus:ring-[#00a859] focus:outline-none"
                      />
                      <Phone className="w-4 h-4 text-[#00a859] absolute left-3.5 top-3" />
                    </div>
                  </div>

                  <p className="text-[11px] text-white/70 flex items-center gap-1.5 leading-snug">
                    <Info className="w-3.5 h-3.5 text-[#00a859] shrink-0" />
                    An M-PESA STK Push prompt will be sent directly to this phone to enter your M-PESA PIN and authorize <strong className="text-white">KSh {totalKsh.toLocaleString()}</strong>.
                  </p>
                </div>
              )}

              {/* Delivery Fee per Region in Kenya Selector */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-[#c5a059] uppercase tracking-wider flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#c5a059]" />
                    Delivery Fee per Region in Kenya
                  </h4>
                  <span className="text-xs font-mono font-extrabold text-[#c5a059]">
                    KSh {shippingKsh} ({activeRegion.label})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto p-1 custom-scrollbar">
                  {KENYA_DELIVERY_REGIONS.map((reg) => {
                    const isSelected = shippingDetails.kenyaRegion === reg.key;
                    return (
                      <button
                        key={reg.key}
                        type="button"
                        onClick={() => setShippingDetails({ ...shippingDetails, kenyaRegion: reg.key })}
                        className={`p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-[#c5a059] bg-[#c5a059]/15 text-white ring-1 ring-[#c5a059]'
                            : 'border-white/10 bg-[#1a1a1a] text-white/70 hover:bg-[#252525]'
                        }`}
                      >
                        <div className="min-w-0 pr-2">
                          <span className="text-xs font-bold text-white block truncate">
                            {reg.label}
                          </span>
                          <span className="text-[10px] text-white/50 block truncate">
                            {reg.countiesSample}
                          </span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className={`text-xs font-extrabold block ${isSelected ? 'text-[#c5a059]' : 'text-white'}`}>
                            KSh {reg.feeKsh}
                          </span>
                          <span className="text-[9px] text-white/40 font-mono">
                            {reg.estimatedTime.split(' ')[0]}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact & Address Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-[#c5a059] uppercase tracking-wider">
                  Contact & Dispatch Address
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-white/60">Full Name</label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.fullName}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-xs text-white font-medium focus:ring-2 focus:ring-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/60">Email Address</label>
                    <input
                      type="email"
                      required
                      value={shippingDetails.email}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-xs text-white font-medium focus:ring-2 focus:ring-[#c5a059] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white/60">Street / Estate / Building Address</label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    className="w-full mt-1 p-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-xs text-white font-medium focus:ring-2 focus:ring-[#c5a059] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-white/60">Town / City</label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-xs text-white font-medium focus:ring-2 focus:ring-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/60">Country</label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.country}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, country: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-xs text-white font-medium focus:ring-2 focus:ring-[#c5a059] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-white/60">Postal Code</label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.postalCode}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                      className="w-full mt-1 p-2.5 rounded-xl border border-white/10 bg-[#1a1a1a] text-xs text-white font-medium focus:ring-2 focus:ring-[#c5a059] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Order Breakdown Summary Box */}
              <div className="p-4 bg-[#1a1a1a] rounded-2xl border border-white/10 space-y-2">
                <div className="flex justify-between text-xs text-white/70">
                  <span>Artwork Subtotal</span>
                  <span className="font-bold text-white">KSh {subtotalKsh.toLocaleString()} ({formatPrice(subtotalUSD, currency)})</span>
                </div>

                <div className="flex justify-between text-xs text-white/70">
                  <span>Regional Kenya Delivery ({activeRegion.label})</span>
                  <span className="font-extrabold text-[#c5a059]">KSh {shippingKsh.toLocaleString()}</span>
                </div>

                <div className="flex justify-between text-xs text-white/70">
                  <span>Artisan Fund Contribution ({tipPercentage}%)</span>
                  <span className="font-bold text-white">KSh {artisanTipKsh.toLocaleString()} ({formatPrice(artisanTipUSD, currency)})</span>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Grand Total Payable</span>
                    <span className="text-[10px] text-white/50">Includes Region Delivery Fee + Handcrafted Certificate</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#00a859] block">
                      KSh {totalKsh.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#c5a059] font-bold">
                      {formatPrice(totalUSD, currency)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-4 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2 transform active:scale-98 ${
                  shippingDetails.paymentMethod === 'mpesa'
                    ? 'bg-[#00a859] hover:bg-emerald-400 text-white shadow-[#00a859]/30'
                    : 'bg-[#c5a059] hover:bg-white text-black shadow-[#c5a059]/20'
                }`}
              >
                {shippingDetails.paymentMethod === 'mpesa' ? (
                  <>
                    <Smartphone className="w-4 h-4" />
                    <span>Pay KSh {totalKsh.toLocaleString()} via M-PESA STK Push</span>
                  </>
                ) : (
                  <span>Complete Order & Generate Certificate</span>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: M-PESA STK PUSH INTERACTIVE PROMPT */}
          {step === 'stk_prompt' && (
            <div className="space-y-6 text-center py-2 animate-fadeIn">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00a859]/20 border border-[#00a859]/40 text-[#00a859] text-xs font-extrabold uppercase tracking-widest">
                <Smartphone className="w-4 h-4" />
                Safaricom M-PESA Express
              </div>

              <div className="space-y-2">
                <h3 className="font-serif font-bold text-2xl text-white">
                  STK Push Prompt Dispatched!
                </h3>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  A pop-up has been sent to phone <strong className="text-[#00a859]">{shippingDetails.phoneNumber}</strong>. Please check your handset screen to enter your M-PESA PIN.
                </p>
              </div>

              {/* Interactive Phone Screen Mockup */}
              <div className="max-w-sm mx-auto bg-[#0a0a0a] rounded-3xl p-5 border-4 border-[#00a859] shadow-2xl space-y-4 text-left relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#00a859]/30 rounded-b-xl" />

                <div className="flex items-center justify-between border-b border-white/10 pb-2.5 pt-2">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#00a859] text-white font-black text-[9px] flex items-center justify-center">
                      M
                    </div>
                    <span className="text-xs font-extrabold text-white">M-PESA Express</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">SIM 1 • Safaricom</span>
                </div>

                <div className="space-y-2 text-xs text-white/90">
                  <p className="text-white/60 text-[11px]">Do you want to pay:</p>
                  <div className="p-3 bg-[#1a1a1a] rounded-xl border border-white/10 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-white/50">Paybill Name:</span>
                      <strong className="text-white">Sanaa Kenya Guild</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Paybill No:</span>
                      <strong className="text-[#00a859]">247247</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Destination Region:</span>
                      <strong className="text-white">{activeRegion.label}</strong>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-white/10 text-sm">
                      <span className="font-bold text-white">Total Amount:</span>
                      <strong className="text-[#00a859] font-black">KSh {totalKsh.toLocaleString()}</strong>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-white/80 mb-1">
                    Enter M-PESA PIN to Authorize:
                  </label>
                  <input
                    type="password"
                    maxLength={4}
                    value={mpesaPin}
                    onChange={(e) => setMpesaPin(e.target.value)}
                    placeholder="••••"
                    className="w-full text-center text-lg font-mono font-bold tracking-widest p-2.5 rounded-xl border border-[#00a859] bg-[#121212] text-white focus:outline-none"
                  />
                  {pinError && <p className="text-[10px] text-rose-400 mt-1">{pinError}</p>}
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleMpesaStkConfirm}
                    className="flex-1 py-2.5 rounded-xl bg-[#00a859] hover:bg-emerald-400 text-white text-xs font-extrabold transition-all shadow-md flex items-center justify-center gap-1"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Authorize PIN</span>
                  </button>
                </div>
              </div>

              <p className="text-[10px] text-white/40">
                Didn't receive prompt? Make sure your handset is unlocked and registered with Safaricom M-PESA.
              </p>
            </div>
          )}

          {/* STEP 3: PROCESSING ANIMATION */}
          {step === 'processing' && (
            <div className="text-center py-12 space-y-4">
              <div className="relative w-20 h-20 mx-auto">
                <div className="w-20 h-20 rounded-full border-4 border-[#00a859] border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-[#00a859] font-extrabold text-sm font-mono">
                  M
                </div>
              </div>

              <h3 className="font-serif font-bold text-2xl text-white">
                Verifying M-PESA Payment & Regional Dispatch...
              </h3>
              <p className="text-xs text-white/60 max-w-sm mx-auto">
                Confirming Daraja API transaction callback for <strong className="text-white">{activeRegion.label}</strong> (Delivery Fee KSh {shippingKsh}).
              </p>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMED */}
          {step === 'confirmed' && orderResult && (
            <div className="space-y-6 text-center animate-fadeIn">
              
              <div className="w-16 h-16 rounded-full bg-[#00a859]/20 text-[#00a859] flex items-center justify-center mx-auto border border-[#00a859]/40">
                <CheckCircle2 className="w-10 h-10 text-[#00a859]" />
              </div>

              <div>
                <span className="text-xs font-extrabold uppercase text-[#00a859] tracking-wider block">
                  Order Successfully Confirmed
                </span>
                <h3 className="font-serif font-bold text-3xl text-white mt-1">
                  Asante Sana! (Thank You)
                </h3>
                <p className="text-xs text-white/60 mt-1">
                  Order Reference: <span className="font-mono font-bold text-[#c5a059]">{orderResult.orderId}</span>
                </p>
              </div>

              {/* M-PESA SMS Confirmation Badge */}
              {orderResult.mpesaReceiptNo && (
                <div className="p-4 bg-[#00a859]/15 rounded-2xl border border-[#00a859]/40 text-left space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[#00a859] font-bold">
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4" />
                      Safaricom M-PESA Payment Receipt
                    </span>
                    <span className="font-mono font-extrabold text-white text-sm">
                      {orderResult.mpesaReceiptNo}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/80 font-mono leading-relaxed bg-[#0a0a0a] p-2.5 rounded-xl border border-white/10">
                    {orderResult.mpesaReceiptNo} Confirmed. KSh {orderResult.totalKsh.toLocaleString()} paid to Sanaa Kenya Guild. Delivery to {activeRegion.label} (KSh {orderResult.shippingKsh}).
                  </p>
                </div>
              )}

              {/* Certificate Box */}
              <div className="p-6 bg-[#1a1a1a] rounded-3xl border-2 border-dashed border-[#c5a059]/40 text-left space-y-3 relative">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#c5a059]" />
                    <span className="font-serif font-bold text-white">Official Certificate of Authenticity</span>
                  </div>
                  <span className="text-xs font-mono font-extrabold text-[#c5a059]">
                    {orderResult.certificateNumber}
                  </span>
                </div>

                <div className="text-xs text-white/80 space-y-1.5">
                  <p><strong>Recipient Name:</strong> {orderResult.shippingDetails.fullName}</p>
                  <p><strong>Delivery Destination:</strong> {orderResult.shippingDetails.address}, {activeRegion.label} ({orderResult.shippingDetails.city})</p>
                  <p><strong>Region Express Timeline:</strong> {orderResult.estimatedDelivery}</p>
                  <p><strong>Delivery Fee Paid:</strong> KSh {orderResult.shippingKsh} ({activeRegion.label})</p>
                  <p><strong>Artisan Community Tip Paid:</strong> KSh {Math.round(orderResult.artisanTipUSD * 130).toLocaleString()} ({formatPrice(orderResult.artisanTipUSD, currency)})</p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    onOrderComplete();
                    onClose();
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-[#c5a059] text-black text-xs font-extrabold uppercase tracking-wider transition-all hover:bg-white shadow-md"
                >
                  Return to Gallery
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
