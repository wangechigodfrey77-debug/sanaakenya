import React, { useState } from 'react';
import { Users, Award, Heart, Sparkles, MapPin, Eye, ShoppingBag, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { ARTISANS, ARTWORKS } from '../data/artworks';
import { Artwork, Currency, Artisan } from '../types';

interface FeaturedArtisanSectionProps {
  artworks: Artwork[];
  currency: Currency;
  formatPrice: (priceUSD: number, cur: Currency) => string;
  onInspect: (artwork: Artwork) => void;
  onAddToCart: (artwork: Artwork) => void;
}

// Detailed story narratives for featured master artisans
const FEATURED_ARTISAN_STORIES: Record<string, {
  quote: string;
  inspiration: string;
  processSteps: { title: string; desc: string; icon: string }[];
  impactStatement: string;
}> = {
  oloitokitok: {
    quote: "Every color in a Maasai necklace is a spoken word from our ancestors. Red is the courage in our blood; blue is the sky that grants us rain.",
    inspiration: "Born at the foothills of Mount Kilimanjaro, Sipatoi learned the art of glass beadwork from her grandmother during her youth. Her creations are inspired by the sacred age-grade ceremonies of the Maasai people, preserving matrilineal storytelling through vivid geometric patterns.",
    processSteps: [
      {
        title: "1. Ethical Leather Foundation",
        desc: "Sipatoi hand-selects ethically tanned cattle hide, cutting precise structural collar bases that rest comfortably on the collarbones.",
        icon: "🛡️",
      },
      {
        title: "2. Micro-Bead Stringing",
        desc: "Using fine copper wire and tendon thread, she hand-strings over 18,000 Czech glass seed beads in precise mathematical symmetry.",
        icon: "✨",
      },
      {
        title: "3. Sacred Color Alignment",
        desc: "Colors are interwoven following traditional Maasai lineage rules: red for valor, white for peace, and gold for warmth.",
        icon: "🎨",
      },
      {
        title: "4. Guild Blessing & Certificate",
        desc: "Each finished piece is reviewed by the Oloitokitok Guild Elders and stamped with a unique Certificate of Authenticity.",
        icon: "📜",
      },
    ],
    impactStatement: "Sipatoi's leadership supports 45 women beadwork artists, providing stable income for children's education and clean drinking water wells in Amboseli.",
  },
  tabaka: {
    quote: "Kisii stone is alive inside the earth. When my chisel touches the quarry rock, I do not force a shape — I simply release the spirit hidden within.",
    inspiration: "Agnes has spent over 3 decades near the Tabaka quarry pits of Kisii County. Her work honors maternal warmth and family unity (Umoja), using soft pink and cream talc stone unique to southwestern Kenya.",
    processSteps: [
      {
        title: "1. Underground Pit Quarrying",
        desc: "Raw talc soapstone blocks are hand-excavated 50 feet underground using traditional pickaxes and crowbars.",
        icon: "⛏️",
      },
      {
        title: "2. Hand Machete Shaping",
        desc: "While the stone is still moist and soft from underground moisture, sculptors hand-chisel organic contours.",
        icon: "🗿",
      },
      {
        title: "3. River Sand Smoothing",
        desc: "Sculptures are submerged in water and repeatedly sanded using fine Kisii riverbed silt until silky smooth.",
        icon: "🌊",
      },
      {
        title: "4. Organic Beeswax Sheen",
        desc: "Heated local beeswax is rubbed into the porous stone to reveal its natural pink veins and durable luster.",
        icon: "🐝",
      },
    ],
    impactStatement: "Agnes founded the Tabaka Women's Quarry Collective, empowering over 60 female sculptors in a historically male-dominated quarry trade.",
  },
  machakos: {
    quote: "A log of Mpingo blackwood takes two centuries to mature. My job as a carver is to honor every year of its life with patience and precision.",
    inspiration: "Mzee Mutua Wambua is a third-generation Akamba woodcarver. His grandfather carved ceremonial walking sticks for community elders. Mutua's inspiration stems from wildlife in the Tsavo ecosystem and ancestral Akamba spiritual masks.",
    processSteps: [
      {
        title: "1. Sustainable Wood Seasoning",
        desc: "Only licensed fallen African Blackwood (Mpingo) trunks are seasoned over smoke kilns for up to 6 months.",
        icon: "🪵",
      },
      {
        title: "2. Adze & Chisel Sculpting",
        desc: "Using hand-forged curved adzes passed down through generations, Mutua chisels intricate facial and animal anatomy.",
        icon: "🪓",
      },
      {
        title: "3. Fire & Smoke Curing",
        desc: "Carvings are gently flame-treated to deepen the jet-black tone and seal natural Macassar grain streaks.",
        icon: "🔥",
      },
      {
        title: "4. Coconut Oil Polish",
        desc: "Hand-buffed with cold-pressed virgin coconut oil and organic shoe wax for a satin museum-grade finish.",
        icon: "🥥",
      },
    ],
    impactStatement: "Mutua mentors young apprentices at Wamunyu, keeping the 100-year-old Akamba woodcarving heritage alive for future generations.",
  },
  lamu: {
    quote: "The Indian Ocean breeze guides our dhow sails, and the hot beeswax locks that tranquility onto canvas for eternity.",
    inspiration: "Rashid Ali Skanda works in Lamu Old Town, a UNESCO World Heritage island. His wax-resist batik paintings draw inspiration from Swahili coastal architecture, wooden dhows, and Arabian sea trade routes.",
    processSteps: [
      {
        title: "1. Cotton Canvas Stretching",
        desc: "Raw organic cotton canvas is stretched tightly across hardwood frames in Rashid's open-air Lamu studio.",
        icon: "🖼️",
      },
      {
        title: "2. Hot Beeswax Resist Painting",
        desc: "Molten natural beeswax is painted onto the fabric using tjanting tools to block areas from pigment dye.",
        icon: "🕯️",
      },
      {
        title: "3. Layered Pigment Dyeing",
        desc: "Canvases are submerged in coastal indanthrene dye baths, building deep cobalt blues and sunset ambers.",
        icon: "🎨",
      },
      {
        title: "4. Wax Dewaxing & Crackle",
        desc: "The dry wax is gently cracked to allow subtle veins of color through before being boiled off in clean water.",
        icon: "☀️",
      },
    ],
    impactStatement: "Rashid donates 15% of all artwork sales to the Lamu Youth Maritime Heritage Guild, funding ocean conservation and Swahili woodcraft education.",
  },
};

export const FeaturedArtisanSection: React.FC<FeaturedArtisanSectionProps> = ({
  artworks,
  currency,
  formatPrice,
  onInspect,
  onAddToCart,
}) => {
  const featuredArtisanKeys = ['oloitokitok', 'tabaka', 'machakos', 'lamu'];
  const [activeArtisanKey, setActiveArtisanKey] = useState<string>('oloitokitok');

  const activeArtisan: Artisan = ARTISANS[activeArtisanKey] || ARTISANS.oloitokitok;
  const activeStory = FEATURED_ARTISAN_STORIES[activeArtisanKey] || FEATURED_ARTISAN_STORIES.oloitokitok;

  // Find 3 to 5 curated handcrafted items by this artisan
  const curatedArtworks = artworks.filter((art) => art.artisan.id === activeArtisanKey).slice(0, 5);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#c5a059] flex items-center justify-center gap-2">
          <Users className="w-4 h-4" />
          Voices of Kenyan Master Craftsmen
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
          Featured Master Artisan
        </h2>
        <p className="text-sm text-white/60 leading-relaxed">
          Behind every piece of art is a human story of heritage, resilience, and master craftsmanship. Meet the guardians of Kenya's cultural arts.
        </p>
      </div>

      {/* Master Artisan Tabs */}
      <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto pb-2 no-scrollbar">
        {featuredArtisanKeys.map((key) => {
          const artisan = ARTISANS[key];
          const isSelected = key === activeArtisanKey;
          return (
            <button
              key={key}
              onClick={() => setActiveArtisanKey(key)}
              className={`flex items-center gap-3 p-2 pr-4 rounded-2xl border transition-all shrink-0 ${
                isSelected
                  ? 'bg-[#c5a059] text-black border-[#c5a059] shadow-lg shadow-[#c5a059]/20 scale-105'
                  : 'bg-[#121212] text-white/70 border-white/10 hover:bg-[#1a1a1a] hover:text-white'
              }`}
            >
              <img
                src={artisan.avatar}
                alt={artisan.name}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-xl object-cover border border-black/20"
              />
              <div className="text-left">
                <p className="text-xs font-bold leading-tight">{artisan.name}</p>
                <p className={`text-[10px] ${isSelected ? 'text-black/70' : 'text-[#c5a059]'}`}>
                  {artisan.location}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Artisan Narrative Card */}
      <div className="bg-[#121212] rounded-3xl border border-white/10 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Portrait & Stats */}
        <div className="lg:col-span-5 bg-[#080808] p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10 space-y-6">
          <div className="space-y-4">
            <div className="relative aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden border-2 border-[#c5a059]/30 shadow-2xl group">
              <img
                src={activeArtisan.avatar}
                alt={activeArtisan.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#c5a059] block">
                  Master Guild Member
                </span>
                <h3 className="font-serif text-xl font-bold">{activeArtisan.name}</h3>
                <p className="text-xs text-white/70 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-[#c5a059]" />
                  {activeArtisan.location}
                </p>
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-[#121212] border border-white/10 text-xs">
              <div>
                <span className="text-white/40 block text-[10px] uppercase font-semibold">Craft Medium</span>
                <p className="font-bold text-[#c5a059]">{activeArtisan.craftType}</p>
              </div>
              <div>
                <span className="text-white/40 block text-[10px] uppercase font-semibold">Mastery Experience</span>
                <p className="font-bold text-white">{activeArtisan.experienceYears} Years</p>
              </div>
              <div className="col-span-2 pt-2 border-t border-white/5">
                <span className="text-white/40 block text-[10px] uppercase font-semibold">Cooperative Guild</span>
                <p className="font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                  {activeArtisan.coopName}
                </p>
              </div>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="p-4 rounded-2xl bg-[#c5a059]/10 border border-[#c5a059]/20 text-xs text-white/80 space-y-1">
            <p className="font-bold text-[#c5a059] flex items-center gap-1.5">
              <Heart className="w-4 h-4 fill-[#c5a059]" />
              Community Fair Trade Impact
            </p>
            <p className="text-[11px] text-white/70 leading-relaxed">
              {activeStory.impactStatement}
            </p>
          </div>
        </div>

        {/* Right Column: Narrative, Inspiration & Process */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 bg-[#121212] flex flex-col justify-between">
          
          <div className="space-y-6">
            
            {/* Story Quote */}
            <div className="p-5 rounded-2xl bg-[#1a1a1a] border-l-4 border-[#c5a059] space-y-2">
              <p className="font-serif italic text-sm text-white/90 leading-relaxed">
                "{activeStory.quote}"
              </p>
              <span className="text-xs font-bold text-[#c5a059] block text-right">— {activeArtisan.name}</span>
            </div>

            {/* Inspiration Narrative */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                Cultural Inspiration & Calling
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                {activeStory.inspiration}
              </p>
            </div>

            {/* Step-by-Step Crafting Process */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-lg text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-[#c5a059]" />
                The Handcrafting Process
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeStory.processSteps.map((step, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#1a1a1a] border border-white/10 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#c5a059]">{step.title}</span>
                      <span className="text-sm">{step.icon}</span>
                    </div>
                    <p className="text-[11px] text-white/60 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Authentic Kenyan Artisan
            </span>
            <span className="text-[#c5a059] font-mono">Guild Ref #{activeArtisan.id.toUpperCase()}-2026</span>
          </div>

        </div>

      </div>

      {/* Curated Display of 3-5 Handcrafted Items */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-xl text-white">
              Curated Masterpieces by {activeArtisan.name}
            </h3>
            <p className="text-xs text-white/50">
              Showing {curatedArtworks.length} authenticated items crafted in {activeArtisan.location}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {curatedArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="group bg-[#121212] rounded-3xl border border-white/10 overflow-hidden shadow-lg hover:shadow-2xl hover:border-[#c5a059]/50 transition-all duration-300 flex flex-col justify-between"
            >
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

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[#c5a059] font-bold uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Handcrafted by {activeArtisan.name}
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
      </div>

    </section>
  );
};
