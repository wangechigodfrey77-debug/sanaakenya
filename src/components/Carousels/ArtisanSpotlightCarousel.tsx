import React from 'react';
import { Award, MapPin, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { ARTISANS } from '../../data/artworks';

export const ArtisanSpotlightCarousel: React.FC = () => {
  const artisanList = Object.values(ARTISANS);

  return (
    <section className="relative w-full py-12 px-4 sm:px-6 bg-[#080808] border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs text-[#c5a059] font-extrabold uppercase tracking-widest">
            Fair Trade & Ethical Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-1 tracking-wide">
            Meet the <span className="text-[#c5a059]">Master Artisans</span>
          </h2>
          <p className="text-white/60 text-sm mt-2 font-light">
            Every piece is handmade by generational Kenyan artisans. 100% of fair trade proceeds go directly to their local community guilds.
          </p>
        </div>

        {/* Horizontal Snap Scroll Artisan Cards */}
        <div className="snap-carousel flex overflow-x-auto no-scrollbar gap-6 pb-6 pt-2">
          {artisanList.map((artisan) => (
            <div
              key={artisan.id}
              className="snap-card flex-none w-[310px] sm:w-[360px] bg-[#121212] rounded-3xl p-6 border border-white/10 shadow-xl flex flex-col justify-between css-parallax-hover text-white"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={artisan.avatar}
                    alt={artisan.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#c5a059]/40 shadow-md"
                  />
                  <div>
                    <h3 className="font-serif font-bold text-lg text-white leading-snug">
                      {artisan.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#c5a059] flex items-center gap-1">
                      <MapPin className="w-3 h-3 inline" />
                      {artisan.location}
                    </p>
                    <span className="inline-block text-[10px] bg-[#c5a059]/10 text-[#c5a059] font-extrabold px-2 py-0.5 rounded-full mt-1 border border-[#c5a059]/20 uppercase tracking-wider">
                      {artisan.experienceYears} Yrs Guild Mastery
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-[#1a1a1a] rounded-2xl border border-white/5 mb-4">
                  <p className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#c5a059]" />
                    <span>{artisan.coopName}</span>
                  </p>
                  <p className="text-[11px] text-white/50 mt-0.5">
                    Specialization: <span className="font-semibold text-white/80">{artisan.craftType}</span>
                  </p>
                </div>

                <p className="text-xs text-white/60 leading-relaxed italic">
                  "{artisan.bio}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#c5a059] font-bold">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059]" />
                  Fair Trade Certified
                </span>
                <span className="flex items-center gap-1 text-white/40 font-normal">
                  <HeartHandshake className="w-4 h-4 text-[#c5a059]" />
                  Direct Impact
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
