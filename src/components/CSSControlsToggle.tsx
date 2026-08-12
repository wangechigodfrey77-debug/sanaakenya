import React from 'react';
import { X, Sliders, Cpu, Sparkles, Layers, Zap } from 'lucide-react';

interface CSSControlsToggleProps {
  isOpen: boolean;
  onClose: () => void;
  isPureCSSRadioMode: boolean;
  setIsPureCSSRadioMode: (val: boolean) => void;
  transitionSpeedSec: number;
  setTransitionSpeedSec: (speed: number) => void;
}

export const CSSControlsToggle: React.FC<CSSControlsToggleProps> = ({
  isOpen,
  onClose,
  isPureCSSRadioMode,
  setIsPureCSSRadioMode,
  transitionSpeedSec,
  setTransitionSpeedSec,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#121212] text-white rounded-3xl p-6 shadow-2xl border border-white/10 animate-slideUp">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-[#c5a059]" />
          <h3 className="font-serif font-bold text-sm tracking-wide">Pure CSS Engine Inspector</h3>
        </div>
        <button onClick={onClose} className="p-1 text-white/40 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-4 space-y-4 text-xs">
        {/* CSS Engine Mode */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#1a1a1a] border border-white/10">
          <div>
            <span className="font-bold text-white flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#c5a059]" />
              Pure CSS Radio Selectors
            </span>
            <p className="text-[10px] text-white/50">Uses pure CSS :checked sibling rules without JS event loops</p>
          </div>
          <button
            onClick={() => setIsPureCSSRadioMode(!isPureCSSRadioMode)}
            className={`px-3 py-1.5 rounded-xl font-extrabold text-[11px] transition-all ${
              isPureCSSRadioMode ? 'bg-[#c5a059] text-black' : 'bg-[#252525] text-white/60'
            }`}
          >
            {isPureCSSRadioMode ? 'ENABLED' : 'DISABLED'}
          </button>
        </div>

        {/* Transition Duration Slider */}
        <div className="space-y-1.5 p-3 rounded-2xl bg-[#1a1a1a] border border-white/10">
          <div className="flex justify-between">
            <span className="font-bold text-white/80 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#c5a059]" />
              CSS Transition Speed
            </span>
            <span className="font-mono text-[#c5a059] font-bold">{transitionSpeedSec}s</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="1.5"
            step="0.1"
            value={transitionSpeedSec}
            onChange={(e) => setTransitionSpeedSec(Number(e.target.value))}
            className="w-full accent-[#c5a059] cursor-pointer"
          />
          <p className="text-[10px] text-white/40">Controls CSS cubic-bezier easing curve acceleration</p>
        </div>

        {/* Hardware Specs Badge */}
        <div className="p-3 bg-[#c5a059]/10 rounded-2xl border border-[#c5a059]/20 text-white/80 space-y-1">
          <p className="font-bold text-[#c5a059] flex items-center gap-1.5 text-[11px]">
            <Cpu className="w-3.5 h-3.5 text-[#c5a059]" />
            GPU Hardware Acceleration Active
          </p>
          <p className="text-[10px] text-white/50">
            Utilizes <code className="text-[#c5a059] font-mono">transform: translate3d(...) rotateY(...)</code> for 60FPS fluid motion.
          </p>
        </div>
      </div>
    </div>
  );
};
