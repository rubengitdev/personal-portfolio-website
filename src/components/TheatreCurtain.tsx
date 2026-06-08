import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Star, Film, Volume2, Hammer } from "lucide-react";

// Web Audio API Sound Synthesizer for high-fidelity theater feedback
export const playTheatricalSound = (type: "close" | "open") => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === "close") {
      // 1. Sliding dramatic "swish" curtain chord chord closing down (exp sweep)
      const duration = 0.85;
      const frequencies = [392.00, 311.13, 261.63, 196.00, 130.81]; // G minor/major cozy chord
      
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = Math.random() > 0.5 ? "sine" : "triangle";
        
        // Sweep pitch downwards
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.35, ctx.currentTime + duration);
        
        // Gain envelope: fast swell, slow decay
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + duration);
      });

      // 2. Thick realistic wooden curtain slap/thud right as they lock in center (at ~0.76s)
      setTimeout(() => {
        try {
          const woodCtx = new AudioContextClass();
          const oscThud = woodCtx.createOscillator();
          const gainThud = woodCtx.createGain();
          
          oscThud.type = "sawtooth";
          oscThud.frequency.setValueAtTime(100, woodCtx.currentTime);
          oscThud.frequency.exponentialRampToValueAtTime(25, woodCtx.currentTime + 0.18);
          
          // Thud gain
          gainThud.gain.setValueAtTime(0.2, woodCtx.currentTime);
          gainThud.gain.exponentialRampToValueAtTime(0.001, woodCtx.currentTime + 0.18);
          
          // Filter to make it wooden and dark
          const lp = woodCtx.createBiquadFilter();
          lp.type = "lowpass";
          lp.frequency.setValueAtTime(180, woodCtx.currentTime);
          
          oscThud.connect(lp);
          lp.connect(gainThud);
          gainThud.connect(woodCtx.destination);
          
          oscThud.start();
          oscThud.stop(woodCtx.currentTime + 0.18);
        } catch (e) {
          // ignore sandboxed audio limits
        }
      }, 730);

    } else {
      // 3. Celebratory ascending magical chime arpeggio sweep!
      const notes = [261.63, 311.13, 392.00, 523.25, 622.25, 783.99, 1046.50]; // Cm7 or Eb major sweep
      
      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        
        const delay = index * 0.07;
        const noteDuration = 0.5;
        
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        // Subtle octave swell vibrato
        osc.frequency.linearRampToValueAtTime(freq * 1.01, ctx.currentTime + delay + 0.1);
        
        gain.gain.setValueAtTime(0, ctx.currentTime + delay);
        gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + delay + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + noteDuration);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + noteDuration);
      });
    }
  } catch (err) {
    // mute fail silently
  }
};

interface TheatreCurtainProps {
  state: "idle" | "closing" | "closed" | "opening";
  destinationLabel: string;
}

export default function TheatreCurtain({ state, destinationLabel }: TheatreCurtainProps) {
  const [lightsBlink, setLightsBlink] = useState(false);

  // Cycle the marquee border lights
  useEffect(() => {
    if (state === "idle") return;
    const interval = setInterval(() => {
      setLightsBlink((prev) => !prev);
    }, 250);
    return () => clearInterval(interval);
  }, [state]);

  if (state === "idle") return null;

  // 12 3D curtain pleat shadows and folds for authentic theater look
  const drapesCount = 10;
  const drapes = Array.from({ length: drapesCount });

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none w-full h-full" id="theatre-transition-layer">
      {/* Absolute stage borders container */}
      <div className="absolute inset-0 overflow-hidden pointer-events-auto flex w-full h-full relative">
        
        {/* LEFT PANEL CURTAIN */}
        <motion.div
          id="curtain-panel-left"
          className="absolute left-0 top-0 bottom-0 w-1/2 bg-red-700 h-full border-r-4 border-black dark:border-amber-400 select-none z-10 flex overflow-hidden shadow-[10px_0_30px_rgba(0,0,0,0.6)]"
          initial={{ x: "-100%" }}
          animate={{
            x: (state === "closing" || state === "closed") ? "0%" : "-100%"
          }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Shading structure */}
          <div className="w-full h-full relative flex">
            {drapes.map((_, idx) => (
              <div
                key={`left-drape-${idx}`}
                style={{
                  width: `${100 / drapesCount}%`,
                  backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.45) 0%, rgba(255,100,100,0.18) 32%, rgba(255,255,255,0) 65%, rgba(0,0,0,0.55) 100%)",
                  backgroundColor: idx % 2 === 0 ? "#b91c1c" : "#991b1b"
                }}
                className="h-full border-r border-red-800/20"
              />
            ))}
            
            {/* Golden Rope tassel hanging at left side curtain fold */}
            <div className="absolute right-6 bottom-1/4 flex flex-col items-center pointer-events-none">
              <div className="w-1.5 h-36 bg-amber-400 border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]" />
              <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-black -mt-1 flex items-center justify-center font-bold text-[7px] text-black">◆</div>
              <div className="w-3.5 h-8 bg-amber-400 border-2 border-black rounded-b-lg -mt-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
            </div>

            {/* Stage Left Comic badge */}
            <div className="absolute left-6 top-8 transform -rotate-6 bg-yellow-400 text-black border-2 border-black px-2.5 py-1 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] font-mono font-black text-[9px] uppercase">
              🎭 ACT I ENDED
            </div>
          </div>
        </motion.div>

        {/* RIGHT PANEL CURTAIN */}
        <motion.div
          id="curtain-panel-right"
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-red-700 h-full border-l-4 border-black dark:border-amber-400 select-none z-10 flex overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.6)]"
          initial={{ x: "100%" }}
          animate={{
            x: (state === "closing" || state === "closed") ? "0%" : "100%"
          }}
          transition={{
            duration: 0.75,
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          {/* Shading structure */}
          <div className="w-full h-full relative flex flex-row-reverse">
            {drapes.map((_, idx) => (
              <div
                key={`right-drape-${idx}`}
                style={{
                  width: `${100 / drapesCount}%`,
                  backgroundImage: "linear-gradient(to left, rgba(0,0,0,0.45) 0%, rgba(255,100,100,0.18) 32%, rgba(255,255,255,0) 65%, rgba(0,0,0,0.55) 100%)",
                  backgroundColor: idx % 2 === 0 ? "#b91c1c" : "#991b1b"
                }}
                className="h-full border-l border-red-800/20"
              />
            ))}
            
            {/* Golden Rope tassel hanging at right side curtain fold */}
            <div className="absolute left-6 bottom-1/4 flex flex-col items-center pointer-events-none">
              <div className="w-1.5 h-36 bg-amber-400 border border-black shadow-[1px_1px_0px_rgba(0,0,0,1)]" />
              <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-black -mt-1 flex items-center justify-center font-bold text-[7px] text-black">◆</div>
              <div className="w-3.5 h-8 bg-amber-400 border-2 border-black rounded-b-lg -mt-1 shadow-[2px_2px_0px_rgba(0,0,0,1)]" />
            </div>

            {/* Stage Right Comic badge */}
            <div className="absolute right-6 top-8 transform rotate-6 bg-[#6ee7b7] text-black border-2 border-black px-2.5 py-1 rounded shadow-[2px_2px_0px_rgba(0,0,0,1)] font-mono font-black text-[9px] uppercase">
              🍿 TO BE CONTINUED...
            </div>
          </div>
        </motion.div>

        {/* DRAPED SWEEP BACKGROUND GLOWS (SPOTLIGHT SECTOR) */}
        <AnimatePresence>
          {(state === "closing" || state === "closed") && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-20 overflow-hidden mix-blend-color-dodge"
              id="theatre-spotlights-overlay"
            >
              {/* Dynamic Golden Spotlight A */}
              <motion.div
                animate={{
                  x: [-120, 200, -50, 300, -120],
                  y: [-50, 150, -100, 350, -50],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-72 h-72 rounded-full filter blur-[50px] bg-yellow-400/20"
              />
              {/* Dynamic Violet Spotlight B */}
              <motion.div
                animate={{
                  x: [400, -100, 200, -50, 400],
                  y: [300, -50, 350, 100, 300],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-96 h-96 rounded-full filter blur-[60px] bg-[#ff2a2a]/15"
              />
              {/* Dynamic Cyan Spotlight C */}
              <motion.div
                animate={{
                  x: [100, 300, -150, 50, 100],
                  y: [-100, 200, 50, -150, -100],
                }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-80 h-80 rounded-full filter blur-[50px] bg-emerald-400/15"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* CENTRAL THEATRICAL NEON BULLETIN MARQUEE */}
        <AnimatePresence>
          {(state === "closing" || state === "closed") && (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none p-4">
              <motion.div
                className="relative bg-[#fef08a] dark:bg-stone-900 border-4 border-black text-black dark:text-white w-full max-w-sm rounded-3xl p-5 sm:p-7 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center transition-colors pointer-events-auto"
                id="theatric-marquee-board"
                initial={{ scale: 0.3, opacity: 0, rotate: -12, y: 50 }}
                animate={{ scale: 1, opacity: 1, rotate: 0, y: 0 }}
                exit={{ scale: 1.4, opacity: 0, rotate: 8, y: -60 }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 18,
                  delay: 0.28
                }}
              >
                {/* Comic crown banner design */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-3 py-1 rounded-xl text-[8px] font-mono font-black tracking-widest uppercase border-2 border-white flex items-center gap-1 shadow-md">
                  <Star size={9} className="text-yellow-400 animate-spin" />
                  <span>SCENE LOADER DETOUR</span>
                  <Star size={9} className="text-yellow-400 animate-spin" />
                </div>

                {/* Blinking marquee dot light bezel decor! */}
                <div className="absolute -inset-1.5 rounded-3xl border-2 border-dashed border-black/30 pointer-events-none flex justify-between items-center" />
                
                {/* Chasing star marquee lights */}
                <div className="flex justify-center gap-3 pt-2 pb-1 text-[10px]">
                  <span className={`${lightsBlink ? "opacity-100" : "opacity-30"} transition-all duration-150`}>🟡</span>
                  <span className={`${!lightsBlink ? "opacity-100" : "opacity-30"} transition-all duration-150`}>⚪</span>
                  <span className={`${lightsBlink ? "opacity-100" : "opacity-30"} transition-all duration-150`}>🔴</span>
                  <span className={`${!lightsBlink ? "opacity-100" : "opacity-30"} transition-all duration-150`}>🟡</span>
                  <span className={`${lightsBlink ? "opacity-100" : "opacity-30"} transition-all duration-150`}>⚪</span>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono font-extrabold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                    <span>◈ STAGE MANAGER WORKING ◈</span>
                  </div>

                  <h3 className="font-display text-lg sm:text-2xl font-black text-stone-900 dark:text-white leading-tight uppercase tracking-tight break-words">
                    {destinationLabel}
                  </h3>

                  {/* Playful loading process bar with custom cute styling */}
                  <div className="border-2 border-black rounded-lg h-5 bg-white dark:bg-stone-800 relative overflow-hidden p-0.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                    <motion.div
                      className="h-full bg-[#ff2a2a] border border-black rounded-md"
                      initial={{ width: "4%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-[8px] font-mono font-black text-black dark:text-white uppercase tracking-widest">
                      SEAMLESS FLIP ⌛
                    </span>
                  </div>

                  <p className="text-[10px] sm:text-xs text-stone-600 dark:text-stone-300 font-sans tracking-tight leading-normal">
                    Wait while the set crew clears the floor and drafts new animation assets!
                  </p>

                  {/* Chasing dog & cat on stage cameo */}
                  <div className="flex items-center justify-center gap-2 border-t-2 border-dashed border-stone-300 dark:border-stone-700 pt-3 mt-4 text-[10px] text-stone-400 font-mono">
                    <motion.span
                      animate={{ x: [-8, 8, -8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🐱
                    </motion.span>
                    <span>rapid chase stage loop...</span>
                    <motion.span
                      animate={{ x: [8, -8, 8] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      🐶
                    </motion.span>
                  </div>
                </div>

                {/* Outer badge tags on marquee board */}
                <div className="absolute -bottom-3.5 -right-3.5 rotate-[8deg] bg-black text-[#6ee7b7] border-2 border-black text-[8px] font-mono font-black px-1.5 py-0.5 rounded shadow-sm">
                  100% BUILT-IN
                </div>
                <div className="absolute -bottom-3.5 -left-3.5 -rotate-[12deg] bg-[#ff2a2a] text-white border-2 border-black text-[8px] font-mono font-black px-1.5 py-0.5 rounded shadow-sm">
                  KAIZEN ◈
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
