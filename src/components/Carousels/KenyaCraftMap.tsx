import React, { useState } from 'react';
import { MapPin, Compass, Users, Sparkles } from 'lucide-react';
import { REGIONS_MAP } from '../../data/artworks';

export const KenyaCraftMap: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('kisii');
  const activeRegion = REGIONS_MAP.find((r) => r.id === selectedRegionId) || REGIONS_MAP[0];

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 bg-[#121214] text-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs text-amber-400 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5" />
              Geographical Origins
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1">
              Kenya’s <span className="text-amber-400">Craft Regions</span> Map
            </h2>
            <p className="text-stone-400 text-sm mt-1">
              Click any region to discover where Kenya's traditional soapstone, beadwork, ebony, and glass originate.
            </p>
          </div>
        </div>

        {/* Map Grid & Region Card Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Kenya Region Pin Selector Track */}
          <div className="lg:col-span-5 bg-stone-900 rounded-3xl p-6 border border-stone-800 space-y-3">
            <p className="text-xs uppercase text-stone-400 font-bold tracking-wider mb-2">
              Select Cultural Artisan Region:
            </p>

            {REGIONS_MAP.map((region) => (
              <button
                key={region.id}
                onClick={() => setSelectedRegionId(region.id)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all border flex items-center justify-between ${
                  selectedRegionId === region.id
                    ? 'bg-[#993D20] text-white border-amber-500 shadow-lg scale-[1.02]'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700/60 hover:bg-stone-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${selectedRegionId === region.id ? 'bg-amber-500 text-stone-950' : 'bg-stone-700 text-amber-400'}`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm">{region.name}</h4>
                    <p className="text-xs opacity-80">{region.craft}</p>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-1 rounded-full bg-black/40 border border-white/10">
                  {region.artisanCount}
                </span>
              </button>
            ))}
          </div>

          {/* Active Region Full Card Display */}
          <div className="lg:col-span-7 bg-stone-900 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl relative min-h-[420px] flex flex-col justify-between">
            <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-950">
              <img
                src={activeRegion.image}
                alt={activeRegion.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent" />

              <div className="absolute top-4 left-4 bg-[#993D20] text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{activeRegion.craft}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-3 bg-stone-900">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {activeRegion.name}
                </h3>
                <span className="text-xs text-amber-400 font-bold flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                  <Users className="w-3.5 h-3.5" />
                  {activeRegion.artisanCount}
                </span>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed">
                {activeRegion.description}
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
