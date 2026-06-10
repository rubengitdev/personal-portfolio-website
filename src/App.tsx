import React, { useState, useEffect } from "react";
import { 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  Cpu, 
  Smile, 
  Linkedin, 
  Instagram, 
  Send, 
  Clock, 
  Play, 
  Heart, 
  ThumbsUp,
  FileText
} from "lucide-react";
import Header from "./components/Header";
import CaseStudyDetail from "./components/CaseStudyDetail";
import ContactForm from "./components/ContactForm";
import PhotoReel from "./components/PhotoReel";
import ProjectPreview from "./components/ProjectPreviews";
import { projectsData, bioStory, photoReelData } from "./data";
import { motion, AnimatePresence } from "motion/react";
import TheatreCurtain, { playTheatricalSound } from "./components/TheatreCurtain";
import { PROFILE_IMAGE } from "./imageAssets";
import resumePdf from "./assets/resume/resume.pdf";

const stickerPresets = [
  { emoji: "🥚", label: "Egg Hunter", color: "#fdba74" }, 
  { emoji: "👔", label: "Lost Intern", color: "#fca5a5" }, 
  { emoji: "🫘", label: "Sneaky Bean", color: "#93c5fd" }, 
  { emoji: "🐧", label: "Penguin", color: "#fbcfe8" }, 
  { emoji: "🌟", label: "Kaizen Boss", color: "#6ee7b7" }, 
  { emoji: "👹", label: "Scroll Goblin", color: "#fde047" } 
];

const highlightStoryPhrases = (text: string) => {
  return text.split(/(The Plot Twist|The Level Up|The Forever Learner Vibe)/g).map((part, idx) => {
    if (part === "The Plot Twist" || part === "The Level Up" || part === "The Forever Learner Vibe") {
      return (
        <span key={idx} className="font-semibold">
          {part}
        </span>
      );
    }
    return part;
  });
};

export default function App() {
  const [currentView, setCurrentView] = useState<"home" | "about">("home");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [bioLength, setBioLength] = useState<"short" | "long" | "longer">("short");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedHeroTag, setSelectedHeroTag] = useState<string | null>(null);

  // Global High Fidelity Image Zoom Modal State
  const [zoomedImage, setZoomedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const handleZoom = (e: Event) => {
      const customEvent = e as CustomEvent<{ src: string; alt: string }>;
      if (customEvent.detail) {
        setZoomedImage(customEvent.detail);
      }
    };
    window.addEventListener("trigger-image-preview", handleZoom);
    return () => {
      window.removeEventListener("trigger-image-preview", handleZoom);
    };
  }, []);

  useEffect(() => {
    if (!zoomedImage) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setZoomedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [zoomedImage]);

  // Theater Curtain Transition States
  const [curtainState, setCurtainState] = useState<"idle" | "closing" | "closed" | "opening">("idle");
  const [curtainLabel, setCurtainLabel] = useState<string>("ACT II");

  // Dark Mode Support synced with LocalStorage & browser settings
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem("portfolio_dark_mode");
    if (saved) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Tap ripple wave array
  const [ripples, setRipples] = useState<{ id: string; x: number; y: number }[]>([]);

  // Spawned stickers array
  const [stickers, setStickers] = useState<{
    id: string;
    emoji: string;
    label: string;
    color: string;
    x: number;
    y: number;
    rotate: number;
  }[]>([]);

  // Sync class state with root HTML node
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("portfolio_dark_mode", String(darkMode));
  }, [darkMode]);

  const handleToggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // Interactive page ripple spawns
  const handlePageClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    // Exclude when clicking button element or inputs
    if (
      target.closest("button") || 
      target.closest("a") || 
      target.closest("input") || 
      target.closest("textarea") ||
      target.closest(".pointer-events-auto")
    ) {
      return;
    }
    const newRipple = {
      id: Math.random().toString(),
      x: e.pageX,
      y: e.pageY
    };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);
  };

  const spawnSticker = (emoji: string, label: string, color: string) => {
    const scrollY = window.scrollY;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const randomOffset = () => Math.floor(Math.random() * 120) - 60;

    const newSticker = {
      id: `sticker-${Date.now()}-${Math.random()}`,
      emoji,
      label,
      color,
      x: (viewportWidth / 2) + randomOffset() - 80,
      y: scrollY + (viewportHeight / 3) + randomOffset() - 20,
      rotate: Math.floor(Math.random() * 32) - 16
    };
    setStickers(prev => [...prev, newSticker]);
  };

  const removeSticker = (id: string) => {
    setStickers(prev => prev.filter(s => s.id !== id));
  };

  const clearStickers = () => {
    setStickers([]);
  };

  // Interactive Floating Bubble particles state triggered by hero interactions
  const [bubbles, setBubbles] = useState<{ id: string; emoji: string; x: number; y: number; rotate: number; scale: number; speedY: number }[]>([]);
  
  // Custom synth instrument voice selection ("chip" | "laser" | "shimmer" | "sine")
  const [synthVoice, setSynthVoice] = useState<"chip" | "laser" | "shimmer" | "sine">("chip");

  // State to track if the AudioContext is warm/allowed
  const [audioWarmed, setAudioWarmed] = useState(false);

  const spawnFloatingParticle = (index: number, char: string) => {
    const chars = ["✨", "🎨", "🚀", "💡", "🎮", "🌟", "👾", "❤️", "🍕"];
    const pickedEmoji = chars[index % chars.length];
    
    // Spawn a bubble particle near the top center area
    const newBubble = {
      id: `bubble-${Date.now()}-${Math.random()}`,
      emoji: pickedEmoji,
      x: window.innerWidth / 2 + (index * 25 - 120) + (Math.random() * 20 - 10),
      y: window.scrollY + 180 + (Math.random() * 20 - 10),
      rotate: Math.floor(Math.random() * 60) - 30,
      scale: Math.random() * 0.4 + 0.9,
      speedY: Math.random() * 2 + 1.5
    };
    setBubbles(prev => [...prev, newBubble]);
    
    // Auto remove after 2.5 seconds
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
    }, 2500);
  };

  const pumpBouncyBubbles = () => {
    const emojis = ["🐼", "🥑", "🍕", "🍔", "🎯", "🎮", "🧩", "👾", "🎨", "🔥", "🌈", "🎈", "🔮", "✨"];
    const newBubblesList = Array.from({ length: 12 }).map((_, i) => {
      const scrollY = window.scrollY;
      const viewportWidth = window.innerWidth;
      const randomOffset = () => Math.floor(Math.random() * viewportWidth * 0.7) - (viewportWidth * 0.35);
      return {
        id: `bubble-${Date.now()}-${Math.random()}-${i}`,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        x: (viewportWidth / 2) + randomOffset(),
        y: scrollY + window.innerHeight - 80 + (Math.random() * 40 - 20),
        rotate: Math.floor(Math.random() * 120) - 60,
        scale: Math.random() * 0.6 + 0.9,
        speedY: Math.random() * 3 + 2
      };
    });
    setBubbles(prev => [...prev, ...newBubblesList]);
    
    // Clean up
    setTimeout(() => {
      setBubbles(prev => prev.filter(b => !newBubblesList.some(nb => nb.id === b.id)));
    }, 3500);
  };

  const playSynthSound = (pitchIndex: number, type?: "chip" | "laser" | "shimmer" | "sine" | "custom_coin" | "custom_laser" | "custom_jump" | "custom_powerup") => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      setAudioWarmed(true);

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const notes = [
        130.81, // C3
        146.83, // D3
        164.81, // E3
        196.00, // G3
        220.00, // A3
        261.63, // C4
        293.66, // D4
        329.63, // E4
        392.00, // G4
        440.00, // A4
        523.25, // C5
        587.33, // D5
        659.25, // E5
        783.99, // G5
        880.00, // A5
        1046.50 // C6
      ];
      
      let freq = notes[pitchIndex % notes.length];
      let oscType: OscillatorType = "sine";
      let releaseTime = 0.35;
      let startVol = 0.12;

      // Handle custom funny SFX buttons!
      if (type === "custom_coin") {
        oscType = "square";
        freq = 987.77;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.frequency.setValueAtTime(1318.51, ctx.currentTime + 0.08);
        releaseTime = 0.25;
        startVol = 0.08;
      } else if (type === "custom_laser") {
        oscType = "sawtooth";
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.3);
        releaseTime = 0.3;
        startVol = 0.1;
      } else if (type === "custom_jump") {
        oscType = "triangle";
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.22);
        releaseTime = 0.25;
        startVol = 0.15;
      } else if (type === "custom_powerup") {
        oscType = "square";
        osc.frequency.setValueAtTime(330, ctx.currentTime);
        osc.frequency.setValueAtTime(440, ctx.currentTime + 0.06);
        osc.frequency.setValueAtTime(554, ctx.currentTime + 0.12);
        osc.frequency.setValueAtTime(660, ctx.currentTime + 0.18);
        releaseTime = 0.4;
        startVol = 0.06;
      } else {
        const voice = type || synthVoice;
        if (voice === "chip") {
          oscType = "square";
          startVol = 0.06;
        } else if (voice === "laser") {
          oscType = "sawtooth";
          osc.frequency.exponentialRampToValueAtTime(freq * 0.2, ctx.currentTime + 0.25);
          startVol = 0.06;
          releaseTime = 0.3;
        } else if (voice === "shimmer") {
          oscType = "triangle";
          osc2.type = "sine";
          osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);
          osc2.connect(gain);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.45);
          releaseTime = 0.45;
          startVol = 0.15;
        } else {
          oscType = "sine";
          releaseTime = 0.4;
          startVol = 0.2;
        }
      }

      osc.type = oscType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + releaseTime);

      gain.gain.setValueAtTime(startVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + releaseTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + releaseTime);
    } catch (e) {
      // safe fallback
    }
  };

  // Simple navigational handler wrapped in a high-fidelity theater curtain transition
  const handleNavigate = (view: "home" | "about", projectId: string | null = null) => {
    // Determine the cute loading marquee label based on where user is headed
    let label = "SCENE DETOUR";
    if (projectId) {
      const proj = projectsData.find(p => p.id === projectId);
      label = proj ? `PROJECT: ${proj.title.toUpperCase()}` : "CASE STUDY REVEAL";
    } else if (view === "about") {
      label = "RUBEN'S HISTORY";
    } else {
      label = "MAIN WORKSHOP";
    }
    setCurtainLabel(label);

    // Begin closing sequence
    setCurtainState("closing");
    playTheatricalSound("close");

    // Keep curtains closed momentarily to perform visual switch safely behind the veil
    setTimeout(() => {
      setCurrentView(view);
      setSelectedProjectId(projectId);
      
      // Instantly scroll back to top of new page while obscured so there is no awkward scroll snap!
      window.scrollTo({ top: 0 });

      // Begin opening sequence to reveal the new page
      setCurtainState("opening");
      playTheatricalSound("open");

      // Complete transition
      setTimeout(() => {
        setCurtainState("idle");
      }, 750); // Matches curtain opening duration
    }, 850); // Matches curtain closing duration
  };

  // Open sequential project case study wrapped in the theater curtain transition
  const handleNextProject = () => {
    if (!selectedProjectId) return;
    const currentIndex = projectsData.findIndex(p => p.id === selectedProjectId);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    const nextProj = projectsData[nextIndex];

    setCurtainLabel(`PROJECT: ${nextProj.title.toUpperCase()}`);
    setCurtainState("closing");
    playTheatricalSound("close");

    setTimeout(() => {
      setSelectedProjectId(nextProj.id);
      
      // Scroll instantly behind the closed curtain
      window.scrollTo({ top: 0 });

      setCurtainState("opening");
      playTheatricalSound("open");

      setTimeout(() => {
        setCurtainState("idle");
      }, 750);
    }, 850);
  };

  const selectedProject = projectsData.find((p) => p.id === selectedProjectId);

  // Time and location tracker logic for honest status indicators
  const currentHour = new Date().getHours();
  const timeStr = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div 
      className={`min-h-screen ${darkMode ? "dark bg-[#121214] text-stone-100" : "bg-[#fafafa] text-stone-950"} font-sans selection:bg-[#ff2a2a] selection:text-white flex flex-col justify-between transition-colors duration-300 relative overflow-x-hidden`} 
      id="app-root"
      onClick={handlePageClick}
    >
      
      {/* Dynamic Dramatic Theatre Curtain Layer */}
      <TheatreCurtain state={curtainState} destinationLabel={curtainLabel} />
      
      {/* Absolute background grid pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-25 z-0 animate-fade-in" id="ambient-grid">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="main-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill={darkMode ? "#71717a" : "#a8a29e"} />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#main-pattern)" />
        </svg>
      </div>

      {/* Global interactive page click ripple waves */}
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{ left: r.x - 24, top: r.y - 24 }}
            className="absolute w-12 h-12 rounded-full border-4 border-[#ff2a2a] dark:border-white pointer-events-none z-50 shadow-[0_0_8px_rgba(255,42,42,0.5)]"
          />
        ))}
      </AnimatePresence>

      {/* Dynamic Floating Interactive Emoji Bubbles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
        <AnimatePresence>
          {bubbles.map(b => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0, scale: 0, x: b.x, y: b.y }}
              animate={{ 
                opacity: [0, 1, 1, 0], 
                scale: b.scale, 
                y: b.y - 450,
                x: b.x + Math.sin(b.y) * 40,
                rotate: b.rotate + 180
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 3.2, ease: "easeOut" }}
              className="absolute text-3xl select-none"
            >
              {b.emoji}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Draggable Sandbox Stickers Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-40">
        <AnimatePresence>
          {stickers.map((sticker) => (
            <motion.div
              key={sticker.id}
              initial={{ scale: 0, rotate: sticker.rotate - 15 }}
              animate={{ scale: 1, rotate: sticker.rotate }}
              exit={{ scale: 0, rotate: sticker.rotate + 15 }}
              drag
              dragMomentum={true}
              dragElastic={0.06}
              whileDrag={{ scale: 1.15, rotate: sticker.rotate + 12 }}
              onDoubleClick={() => removeSticker(sticker.id)}
              style={{
                left: sticker.x,
                top: sticker.y,
                backgroundColor: sticker.color,
              }}
              className="absolute pointer-events-auto cursor-grab active:cursor-grabbing border-3 border-black p-3 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 select-none z-40 text-black outline-none font-mono font-black text-xs"
              title="Drag me! Double-click to remove."
            >
              <span className="text-xl no-select">{sticker.emoji}</span>
              <span className="uppercase tracking-wider mr-1 no-select">{sticker.label}</span>
              <button
                type="button"
                onClick={() => removeSticker(sticker.id)}
                className="w-4 h-4 rounded-full bg-black text-white hover:bg-red-500 font-mono text-[9px] border border-black flex items-center justify-center cursor-pointer focus:outline-none"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10 flex flex-col flex-1">
        {/* Floating Capsule Header */}
        <Header
          currentView={selectedProjectId ? "case-study" : currentView}
          selectedProjectId={selectedProjectId}
          onNavigate={(view, pId) => handleNavigate(view, pId || null)}
          onOpenContact={() => setIsContactOpen(true)}
          isDarkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />

        <main className="flex-1 pt-24 sm:pt-28">
          <AnimatePresence mode="wait">
            
            {/* 1. CASE STUDY VIEW */}
            {selectedProjectId && selectedProject ? (
              <div key={selectedProjectId}>
                <CaseStudyDetail
                  project={selectedProject}
                  onBack={() => handleNavigate("home", null)}
                  onNextProject={handleNextProject}
                />
              </div>
            ) : currentView === "about" ? (
              
              /* 2. ABOUT PAGE VIEW */
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl mx-auto px-4 py-8 space-y-12"
                id="about-view-root"
              >
                {/* Intro greetings & Bio Switcher with Profile Picture */}
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start" id="about-intro-container">
                  {/* Neobrutalist Profile Photo Frame */}
                  <div className="relative shrink-0 select-none pb-4 md:pb-0" id="designer-profile-frame">
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      className="border-3 border-black dark:border-white bg-[#fdba74] p-3 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] max-w-[240px]"
                    >
                      <div className="aspect-square w-48 h-48 rounded-xl overflow-hidden border-2 border-black dark:border-white object-cover bg-stone-100">
                        <img 
                          src={PROFILE_IMAGE} 
                          alt="Ruben Cahyadi" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="text-center font-mono font-black text-[10px] uppercase mt-2.5 text-black tracking-widest">
                        Ruben Cahyadi
                      </div>
                    </motion.div>
                    {/* Decorative cute absolute badges */}
                    <div className="absolute -top-3 -left-3 bg-[#ff2a2a] text-white text-[9px] font-mono font-black px-2 py-0.5 rounded border-2 border-black rotate-[-12deg] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      UI/UX DESIGNER
                    </div>
                  </div>

                  <div className="flex-1 space-y-6 text-left" id="about-intro">
                    <div className="inline-flex items-center gap-2 bg-[#ff2a2a]/10 text-[#ff2a2a] border border-[#ff2a2a]/30 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                      <Smile size={12} className="animate-bounce" />
                      <span>how I got here</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-display font-black text-stone-950 dark:text-white tracking-tight leading-none">
                      Hello Again! <span className="text-[#ff2a2a]">Welcome</span> to my cozy digital drawer.
                    </h1>

                    <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 font-sans font-medium tracking-tight max-w-2xl leading-normal">
                      In this crazy world of AI, I`m the guy who`s obsessed with mastering the basics and keeping things human. Grab a coffee, take a look around, and let`s build something cool together! 
                    </p>

                    {/* HUGE HEADING: NICE TO MEET YOU. */}
                    <div className="pt-2 animate-fade-in" id="about-nice-to-meet-heading">
                      <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#ff2a2a] dark:text-[#ff2a2a] uppercase tracking-tighter leading-none select-none">
                        NICE TO MEET YOU.
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Narrative Display with staggered transitions */}
                <div className="border-3 border-black dark:border-white bg-white dark:bg-stone-900 p-6 sm:p-8 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] space-y-6 text-left" id="about-story-container">
                  <div className="space-y-8 animate-fade-in">
                    <h3 className="text-xs font-mono font-black uppercase text-stone-400 dark:text-stone-500 tracking-widest border-b border-stone-100 dark:border-stone-800 pb-1.5 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#ff2a2a] animate-ping" />
                      <span>THE COMPLETE JOURNEY</span>
                    </h3>
                    {bioStory.longer.map((section, idx) => (
                      <div key={idx} className="space-y-2.5">
                        <h4 className="text-sm font-display font-black uppercase tracking-widest text-[#ff2a2a] flex items-center gap-1.5">
                          <span>◈</span>
                          <span>{section.title}</span>
                        </h4>
                        {section.paragraphs.map((p, pIdx) => (
                          <p key={pIdx} className="text-sm sm:text-base text-stone-700 dark:text-stone-300 font-sans leading-relaxed">
                            {highlightStoryPhrases(p)}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Playful Interactive Polaroid Horizontal Carousel */}
                <PhotoReel photos={photoReelData} />

                {/* About CTA buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center bg-[#fef08a] border-2 border-black dark:border-white p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] text-[#1c1917]" id="about-ctas">
                  <span className="font-display font-extrabold text-sm sm:text-base text-center sm:text-left text-neutral-900">
                     Want to review my professional credentials & qualifications?
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={resumePdf}
                      download="resume.pdf"
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold uppercase tracking-wider border-2 border-black bg-white select-none px-4 py-2 text-stone-900 hover:bg-[#ff2a2a] hover:text-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      <FileText size={13} />
                      <span>Request Resume</span>
                    </a>
                    
                    <button
                      onClick={() => handleNavigate("home", null)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-extrabold uppercase tracking-wider border-2 border-black bg-black text-white select-none px-4 py-2 hover:bg-[#ff2a2a] hover:text-white rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                    >
                      <span>Explore Work</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

              </motion.div>
            ) : (
              
              /* 3. HOME VIEW (PROJECTS GRID) */
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-4xl mx-auto px-4 py-12 space-y-16"
                id="home-view-root"
              >
                 {/* Spectacular Repeated Outline "Tunnel Logo" (Ruben C. signature) */}
                <div className="text-center relative select-none pt-4 pb-4" id="hero-heading-tunnel">
                  <div className="absolute inset-x-0 top-0 flex flex-col items-center justify-center pointer-events-none opacity-40 space-y-0.5">
                    <span 
                      className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter animate-pulse"
                      style={{ WebkitTextStroke: darkMode ? "1.5px #2e2a24" : "1.5px #d6d3d1", color: "transparent" }}
                    >
                      ruben cahyadi
                    </span>
                    <span 
                      className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tighter"
                      style={{ WebkitTextStroke: darkMode ? "1.5px #3e3831" : "1.5px #e7e5e4", color: "transparent" }}
                    >
                      ruben cahyadi
                    </span>
                  </div>

                  {/* Character-by-character rubber spring bouncy name with hover synthesized notes */}
                  <h1 className="relative font-display text-5xl sm:text-7xl md:text-8xl font-black text-[#ff2a2a] dark:text-[#ff2a2a] uppercase tracking-tighter leading-none pt-8 drop-shadow-sm flex justify-center flex-wrap select-none gap-x-4">
                    {"ruben cahyadi".split(" ").map((word, wordIdx) => (
                      <span key={wordIdx} className="flex">
                        {word.split("").map((letter, charIdx) => {
                          const pitchIdx = (wordIdx * 5) + charIdx + 4;
                          return (
                            <motion.span
                              key={charIdx}
                              className="inline-block cursor-pointer transition-colors"
                              whileHover={{ 
                                y: -24, 
                                scale: 1.4, 
                                rotate: Math.floor(Math.random() * 40) - 20, 
                                color: "#facc15" 
                              }}
                              whileTap={{ scale: 0.85, rotate: -15, color: "#10b981" }}
                              transition={{ type: "spring", stiffness: 450, damping: 8 }}
                              onMouseEnter={() => {
                                playSynthSound(pitchIdx);
                                spawnFloatingParticle(pitchIdx, letter);
                              }}
                              onClick={() => {
                                playSynthSound(pitchIdx + 4);
                                pumpBouncyBubbles();
                              }}
                            >
                              {letter}
                            </motion.span>
                          );
                        })}
                      </span>
                    ))}
                  </h1>

                  {/* Micro Hint Tag */}
                  <span className="inline-flex mt-2 items-center gap-1 bg-[#10b981]/15 text-[#10b981] border border-[#10b981]/30 font-mono text-[9px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider animate-bounce">
                    Tap my name and let's see what happen!
                  </span>

                  {/* Under-hero descriptive summary */}
                  <p className="max-w-xl mx-auto text-sm sm:text-base font-sans font-medium text-stone-600 dark:text-stone-350 leading-snug tracking-tight px-4 mt-4">
                    Hey! I&apos;m Ruben, a UI/UX designer building interfaces that make people smile.
                  </p>

                  {/* 🕹️ STYLISH NEOBRUTALIST HERO TOYBOX & DIGITAL SOUNDPAD */}
                  <div 
                    className="bg-[#fef08a] dark:bg-stone-900 border-3 border-black dark:border-white p-5 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] max-w-lg mx-auto space-y-4 text-left relative overflow-hidden mt-8"
                    id="hero-soundpad-console"
                  >
                    <div className="absolute top-0 right-0 h-4 w-24 bg-[#ff2a2a] rotate-45 translate-x-8 translate-y-2 border-b border-black" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-dashed border-black dark:border-stone-700 pb-3">
                      <div>
                        <h3 className="font-display font-black text-xs sm:text-sm text-stone-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                          <span className="animate-spin text-sm">💿</span> 
                          <span>SYNTH SOUNDPAD</span>
                        </h3>
                        <p className="text-[9px] text-stone-700 dark:text-stone-400 font-mono mt-0.5">
                          {audioWarmed ? "🟢 TAP / HOVER PADS TO MAKE SOUND EFFECTS" : "👋 TAP PADS TO MAKE SOUND EFFECTS"}
                        </p>
                      </div>

                      {/* Interactive Pump Machine button */}
                      <button
                        onClick={pumpBouncyBubbles}
                        className="text-[9px] shrink-0 font-mono font-black uppercase tracking-wider bg-[#ff2a2a] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-white border-2 border-black dark:border-white px-2.5 py-1 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all cursor-pointer select-none"
                      >
                        🎈 Bubble Party
                      </button>
                    </div>

                    {/* Synth Voice Selectors */}
                    <div className="space-y-1">
                      <label className="text-[8px] font-mono font-black uppercase text-stone-600 dark:text-stone-400">CHOOSE OSCILLATOR INSTANCE</label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {[
                          { id: "chip", label: "👾 CHIPTUNE", color: "bg-orange-100 hover:bg-orange-200" },
                          { id: "laser", label: "⚡ LASER", color: "bg-cyan-100 hover:bg-cyan-200" },
                          { id: "shimmer", label: "✨ SHIMMER", color: "bg-emerald-100 hover:bg-emerald-200" },
                          { id: "sine", label: "🎵 SOFT SINE", color: "bg-purple-100 hover:bg-purple-200" }
                        ].map(voice => (
                          <button
                            key={voice.id}
                            style={{ background: "transparent" }}
                            onClick={() => {
                              setSynthVoice(voice.id as any);
                              playSynthSound(7, voice.id as any);
                            }}
                            className={`border-2 py-1 text-[8px] font-mono font-black rounded-lg transition-all cursor-pointer ${
                              synthVoice === voice.id
                                ? "bg-black text-black dark:bg-[#ff2a2a] border-black dark:border-white shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-all -translate-x-0.5 -translate-y-0.5"
                                : "bg-white  text-stone-700 dark:bg-stone-850 dark:text-stone-300 border-stone-200 hover:border-black dark:hover:border-white"
                            }`}
                          >
                            {voice.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fast SFX Trigger Pads */}
                    <div className="space-y-1 bg-white dark:bg-stone-850 p-2.5 rounded-2xl border-2 border-black dark:border-white">
                      <label className="text-[8px] font-mono font-black uppercase text-stone-500">PLAY SYNTH SFX CHANNELS</label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                        {[
                          { emoji: "🍄", label: "MUSHROOM JUMP", type: "custom_jump" },
                          { emoji: "🍒", label: "COIN PLUCK", type: "custom_coin" },
                          { emoji: "⚡", label: "BEAM LASER", type: "custom_laser" },
                          { emoji: "⭐", label: "POWERUP TONE", type: "custom_powerup" }
                        ].map((pad, idx) => (
                          <button
                            key={idx}
                            onMouseEnter={() => playSynthSound(9, pad.type as any)}
                            onClick={() => {
                              playSynthSound(9, pad.type as any);
                              // Also shoot some local bubbles for extreme responsiveness
                              for (let i = 0; i < 4; i++) {
                                setTimeout(() => {
                                  setBubbles(prev => [...prev, {
                                    id: `pad-${Date.now()}-${Math.random()}-${i}`,
                                    emoji: pad.emoji,
                                    x: window.innerWidth / 2 + (Math.random() * 200 - 100),
                                    y: window.scrollY + 200 + (Math.random() * 100 - 50),
                                    rotate: Math.random() * 60 - 30,
                                    scale: Math.random() * 0.4 + 0.9,
                                    speedY: Math.random() * 2 + 2
                                  }]);
                                }, i * 100);
                              }
                            }}
                            className={`flex flex-col items-center justify-center py-2.5 px-1.5 text-stone-800 dark:text-stone-100 bg-stone-50 dark:bg-stone-800 hover:text-stone-950 dark:hover:text-white border-2 border-dashed border-stone-300 hover:border-black dark:border-stone-700 hover:border-solid hover:bg-[#ff2a2a]/10 active:translate-y-0.5 rounded-xl cursor-pointer transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-none select-none`}
                          >
                            <span className="text-lg">{pad.emoji}</span>
                            <span className="text-[8px] font-mono font-black uppercase mt-1 tracking-wider text-center">{pad.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive floating banner if Pogo clicked */}
                  <AnimatePresence>
                    {selectedHeroTag === "pogo" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="mt-4 max-w-sm mx-auto bg-amber-50 dark:bg-stone-900 border-2 border-black dark:border-white p-3.5 rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] text-left relative"
                      >
                        <button 
                          onClick={() => setSelectedHeroTag(null)}
                          className="absolute -top-1 -right-1 bg-black dark:bg-[#ff2a2a] text-white rounded-full p-0.5 hover:bg-black/90 text-[8px] w-4 h-4 flex items-center justify-center border border-black dark:border-white"
                        >
                          ✕
                        </button>
                        <p className="text-[10px] uppercase font-mono font-bold text-amber-800 dark:text-amber-400">DESIGN LEADER @ POGO</p>
                        <p className="text-stone-700 dark:text-stone-300 text-xs mt-0.5 leading-snug">
                          Managing user experience constructs that empower consumers to capitalize on their browser data & transactions.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2-Column Responsive Neobrutalist Project Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="projects-grid">
                  {projectsData.map((project) => (
                    <motion.div
                      key={project.id}
                      whileHover={{ y: -4 }}
                      onClick={() => handleNavigate("home", project.id)}
                      className={`group border-3 border-black dark:border-white bg-white dark:bg-stone-900 rounded-2xl overflow-hidden cursor-pointer ${project.shadowColor} dark:shadow-[6px_6px_0px_0px_#ff2a2a] ${project.borderColor} ${project.bgHoverColor} transition-all duration-300 p-5 space-y-3.5`}
                      id={`project-card-${project.id}`}
                    >
                      {/* Simplified Top Labels - Tagline removed to alleviate clutter */}
                      <div className="flex items-center justify-between" id={`project-info-${project.id}`}>
                        <span className="font-mono text-[10px] font-black uppercase text-stone-500 dark:text-stone-400 tracking-widest flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.themeColor }} />
                          <span>{project.category}</span>
                        </span>
                        
                        <span className="text-[9px] font-mono font-bold text-[#ff2a2a] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          VIEW CASE STUDY ↗
                        </span>
                      </div>

                      {/* Simplified Title & Subtitle with integrated active indicator arrow */}
                      <div className="space-y-1 text-left">
                        <h2 className="text-xl sm:text-2xl font-display font-black text-stone-900 dark:text-white leading-tight flex items-center gap-2 group-hover:text-[#ff2a2a] dark:group-hover:text-[#ff2a2a] transition-colors duration-200">
                          <span>{project.title}</span>
                          <span className="text-[#ff2a2a] transition-transform duration-200 transform group-hover:translate-x-1.5 inline-block font-sans">→</span>
                        </h2>
                        <p className="text-xs text-stone-500 dark:text-stone-400 font-sans font-medium line-clamp-1 leading-relaxed">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Standalone design preview illustration renderer */}
                      <div className="border-2 border-black dark:border-white rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] bg-neutral-900">
                        <ProjectPreview projectId={project.id} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 3. INTERACTIVE STICKER PLAYGROUND SANDBOX */}
                <div 
                  id="playground-sandbox-panel"
                  className="border-3 border-black dark:border-white bg-[#f0f9ff] dark:bg-stone-900/60 p-6 sm:p-8 rounded-3xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] space-y-5 text-left"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl font-display font-black text-stone-900 dark:text-white uppercase tracking-tight flex items-center gap-2">
                        <span>🕹️ Let's play easter egg!</span>
                      </h3>
                      <p className="text-xs text-stone-600 dark:text-stone-300 font-sans font-medium leading-relaxed">
                        Click the badges below to place draggable stickers anywhere on the website. As you continue exploring different pages, keep an eye out for them! When you find a sticker, double-click it to banish it. Find them all to complete the hunt!
                      </p>
                    </div>

                    {stickers.length > 0 && (
                      <button
                        onClick={clearStickers}
                        className="text-xs shrink-0 font-mono font-bold uppercase tracking-wider bg-red-400 text-black border-2 border-black px-3.5 py-1.5 rounded-lg hover:bg-rose-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                      >
                        Sweep Desk 🧹
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-2 flex-wrap" id="sticker-presets-tray">
                    {stickerPresets.map(preset => (
                      <button
                        key={preset.label}
                        onClick={() => spawnSticker(preset.emoji, preset.label, preset.color)}
                        className="flex items-center gap-1.5 bg-white hover:bg-[#ff2a2a] hover:text-white dark:bg-stone-800 dark:hover:bg-[#ff2a2a] dark:hover:border-white border-2 border-black dark:border-white rounded-xl px-3 py-1.8 text-[11px] font-mono font-black uppercase cursor-pointer transition-all shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2.5px_2.5px_0px_0px_rgba(255,255,255,1)] -translate-y-0.5 active:translate-y-0"
                      >
                        <span className="text-base">{preset.emoji}</span>
                        <span>{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Coffee invitation callout */}
                <div 
                  id="home-coffee-panel"
                  className="border-3 border-black dark:border-white bg-[#e0f1fe] dark:bg-stone-900 text-stone-900 dark:text-stone-100 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]"
                >
                  <div className="space-y-1.5 text-left z-10 max-w-md">
                    <div className="inline-flex items-center gap-1.5 bg-[#ff2a2a] text-white text-[10px] font-mono font-black uppercase px-2 py-0.5 border border-black dark:border-white rounded rotate-1">
                      <span>Available for work immediately</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-black text-stone-900 dark:text-white tracking-tight leading-none mt-2">
                      Let&apos;s drink some digital coffee.
                    </h3>
                    <p className="text-xs text-stone-600 dark:text-stone-300 font-sans leading-relaxed">
                      Whether you need to hire an agile UX Designer, Product Designer, or talk about anything else, my inbox is lock-and-load.
                    </p>
                  </div>

                  <div className="z-10 shrink-0">
                    <button
                      onClick={() => setIsContactOpen(true)}
                      className="border-2 border-black dark:border-white bg-[#ff2a2a] text-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] rounded-2xl px-6 py-3.5 text-xs font-mono font-black uppercase tracking-widest flex items-center gap-2 select-none transition-all cursor-pointer"
                    >
                      <Send size={13} />
                      <span>Transmit message</span>
                    </button>
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Modern, Meticulous Footer Grid with zero 'AI slop' indicators */}
      <footer className="border-t-3 border-black dark:border-white bg-[#fafafa]/80 dark:bg-stone-900/60 py-8 px-4 z-20 relative transition-colors" id="app-footer">
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center md:text-left">
          
          {/* Copyright node */}
          <div className="space-y-1">
            <p className="font-display text-sm font-black text-stone-900 dark:text-white uppercase tracking-widest">
              Ruben C. © 2026
            </p>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">
              Crafted with passion and love.
            </p>
          </div>

          {/* Core Status Block */}
          <div className="flex flex-col items-center justify-center font-mono text-[10px] text-stone-500 dark:text-stone-400 gap-1">
            <span className="flex items-center gap-1.5 border border-stone-200 dark:border-stone-700 px-3 py-1 bg-stone-50 dark:bg-stone-800 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Yogyakarta, IDN Current Time: {timeStr}</span>
            </span>
          </div>

          {/* Social icons */}
          <div className="flex justify-center md:justify-end gap-3" id="footer-socials">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border-2 border-black dark:border-white bg-white dark:bg-stone-800 text-black dark:text-white flex items-center justify-center hover:bg-[#ff2a2a] dark:hover:bg-[#ff2a2a] hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            >
              <Linkedin size={14} />
            </a>
            <a
              href="https://www.instagram.com/rubenirl/"
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border-2 border-black dark:border-white bg-white dark:bg-stone-800 text-black dark:text-white flex items-center justify-center hover:bg-[#ff2a2a] dark:hover:bg-[#ff2a2a] hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            >
              <Instagram size={14} />
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="w-8 h-8 rounded-full border-2 border-black dark:border-white bg-white dark:bg-stone-800 text-black dark:text-white flex items-center justify-center hover:bg-[#ff2a2a] dark:hover:bg-[#ff2a2a] hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] cursor-pointer"
            >
              <Send size={14} />
            </button>
          </div>

        </div>
      </footer>

      {/* Interactive Contact Drawer & Guestbook popup */}
      <ContactForm
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Immersive high fidelity project-wide full-screen preview zoom modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md pointer-events-auto cursor-zoom-out"
            onClick={() => setZoomedImage(null)}
            id="image-zoom-overlay"
          >
            {/* Prevent clicks on the content wrapper from closing the modal */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", stiffness: 350, damping: 26 }}
              style={{ 
                backgroundColor: darkMode ? "#1a1a1a" : "#ffffff", 
                borderColor: darkMode ? "#ffffff" : "#000000" 
              }}
              className="relative max-w-5xl w-full flex flex-col items-center gap-4 border-4 p-4 sm:p-5 rounded-3xl shadow-[8px_8px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_rgba(255,255,255,0.15)] cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="w-full flex items-center justify-between border-b-2 border-black dark:border-stone-800 pb-3">
                <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100">
                  <span className="text-[10px] font-mono bg-yellow-300 text-stone-950 px-2.5 py-0.5 rounded font-black border border-black select-none uppercase">
                    HIGH-FI DESIGN SPEC
                  </span>
                  <span className="text-xs font-mono font-black uppercase truncate max-w-[200px] sm:max-w-md">
                    {zoomedImage.alt}
                  </span>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setZoomedImage(null)}
                  className="p-1 px-3 bg-[#ff2a2a] text-white rounded-lg border-2 border-black font-mono font-black text-xs hover:bg-black transition-colors cursor-pointer flex items-center gap-1.5 shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                >
                  <span>CLOSE</span>
                  <span>✕</span>
                </button>
              </div>

              {/* Main Image View Port with a grid visual backing */}
              <div className="w-full bg-stone-100 dark:bg-stone-950 rounded-2xl border-2 border-black dark:border-stone-850 overflow-hidden flex items-center justify-center aspect-[16/10] sm:aspect-video max-h-[68vh] relative">
                {/* Clean retro design grid background */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#202023_1px,transparent_1px),linear-gradient(to_bottom,#202023_1px,transparent_1px)] bg-[size:16px_16px] opacity-25 pointer-events-none" />
                <img
                  src={zoomedImage.src}
                  alt={zoomedImage.alt}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-full object-contain z-10"
                />
              </div>

              {/* Footnotes */}
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono text-stone-500 dark:text-stone-400 border-t border-dashed border-stone-200 dark:border-stone-800 pt-3">
                <span className="italic block shrink-0">Click outside card or press esc to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
