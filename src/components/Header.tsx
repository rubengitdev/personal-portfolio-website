import React, { useState, useEffect, useRef } from "react";
import { Linkedin, Twitter, ArrowLeft, Send, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  currentView: "home" | "about" | "case-study";
  selectedProjectId: string | null;
  onNavigate: (view: "home" | "about", projectId?: string | null) => void;
  onOpenContact: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export default function Header({
  currentView,
  selectedProjectId,
  onNavigate,
  onOpenContact,
  isDarkMode,
  onToggleDarkMode,
}: HeaderProps) {
  const [visible, setVisible] = useState(true);
  const [isOverlapping, setIsOverlapping] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if overlapping (meaning user scrolled down from absolute top)
      if (currentScrollY > 15) {
        setIsOverlapping(true);
      } else {
        setIsOverlapping(false);
      }

      // Collapsible logic: scroll down hides, scroll up reveals
      if (currentScrollY > lastScrollY.current && currentScrollY > 120) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className="fixed top-0 sm:top-4 left-0 right-0 z-50 w-full max-w-4xl mx-auto px-4 pt-4 sm:pt-0" 
      id="header-container"
      animate={{
        y: visible ? 0 : -120,
        opacity: visible ? 1 : 0
      }}
      transition={{
        duration: 0.35,
        ease: "easeInOut"
      }}
    >
      <div 
        id="header-capsule"
        className={`flex items-center justify-between border-2 px-4 sm:px-6 py-3 sm:py-3.5 rounded-full transition-all duration-300 relative ${
          isOverlapping 
            ? "border-[#ff2a2a] bg-white/50 dark:bg-stone-900/40 backdrop-blur-xl shadow-[4px_4px_0px_0px_#ff2a2a] dark:shadow-[4px_4px_0px_0px_#ff2a2a]" 
            : "border-black dark:border-white bg-[#fafafa]/90 dark:bg-stone-900/95 backdrop-blur-md shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
        }`}
      >
        {/* Left Option: Home / Brand / Back */}
        <div className="flex items-center gap-2">
          {currentView === "case-study" ? (
            <button
              id="header-back-btn"
              onClick={() => onNavigate("home", null)}
              className="flex items-center gap-1.5 font-display text-sm font-bold text-black dark:text-white border-2 border-black dark:border-white bg-white dark:bg-stone-800 rounded-full px-3 py-1 hover:bg-[#ff2a2a] dark:hover:bg-[#ff2a2a] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">all projects</span>
              <span className="sm:hidden">back</span>
            </button>
          ) : (
            <button
              id="header-logo-btn"
              onClick={() => onNavigate("home", null)}
              className="font-display text-base sm:text-lg font-black text-[#ff2a2a] dark:text-[#ff2a2a] tracking-normal relative focus:outline-none select-none hover:opacity-85 transition-opacity"
            >
              ruben c.
            </button>
          )}
        </div>

        {/* Playful Cat & Dog Running Loop Track (Continuous Entertainment) */}
        <div 
          className="hidden sm:flex items-center relative w-28 sm:w-36 h-7 bg-stone-100 dark:bg-stone-800/80 border-2 border-black dark:border-white rounded-full overflow-hidden select-none hover:bg-[#ff2a2a]/10 group transition-colors duration-200"
          id="header-pet-track"
          title="Fierce pet chase loop! Click to hear them bark!"
        >
          {/* Animated Comic Collision Burst */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-xs pointer-events-none select-none z-10"
            animate={{
              scale: [0, 0, 1.4, 0, 0],
              opacity: [0, 0, 1, 0, 0],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              times: [0, 0.28, 0.32, 0.40, 1],
            }}
          >
            💥
          </motion.div>

          <motion.div
            className="absolute left-1/2 -translate-x-1/2 text-[8px] font-black pointer-events-none select-none z-10 font-mono text-[#ff2a2a] dark:text-[#ff2a2a]"
            animate={{
              scale: [0, 0, 1, 0, 0],
              opacity: [0, 0, 1, 0, 0],
              y: [5, 5, -8, -12, -12],
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              times: [0, 0.28, 0.32, 0.40, 1],
            }}
          >
            BUMP!
          </motion.div>

          {/* Cat Animating Left to Right with rapid bubble run bounce */}
          <motion.div
            className="absolute"
            animate={{
              x: [0, 48, 38, 92, 92, 0],
              scaleX: [1, 1, 1, 1, -1, -1]
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{ duration: 0.2, repeat: Infinity, ease: "linear" }}
              className="text-sm cursor-pointer"
            >
              🐱
            </motion.div>
          </motion.div>

          {/* Dog Animating Right to Left with steady panting bounce */}
          <motion.div
            className="absolute"
            style={{ right: 8 }}
            animate={{
              x: [0, -48, -38, -92, -92, 0],
              scaleX: [1, 1, 1, 1, -1, -1]
            }}
            transition={{
              duration: 3.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 0.18, repeat: Infinity, ease: "linear" }}
              className="text-sm cursor-pointer"
            >
              🐶
            </motion.div>
          </motion.div>
        </div>

        {/* Right Navigation Options */}
        <nav className="flex items-center gap-3 sm:gap-4 font-display text-xs font-bold uppercase tracking-wider" id="header-navbar">
          <button
            id="nav-btn-about"
            onClick={() => onNavigate("about", null)}
            className={`transition bg-transparent text-[11px] sm:text-xs font-bold border-none cursor-pointer focus:outline-none hover:text-[#ff2a2a] dark:hover:text-[#ff2a2a] ${
              currentView === "about" ? "text-[#ff2a2a] underline decoration-2 underline-offset-4" : "text-gray-800 dark:text-stone-300"
            }`}
          >
            About
          </button>
          
          <span className="text-gray-300 dark:text-stone-700">|</span>

          <a
            id="nav-link-linkedin"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-stone-300 hover:text-[#ff2a2a] dark:hover:text-[#ff2a2a] text-[11px] sm:text-xs flex items-center gap-1 bg-transparent font-bold"
          >
            LinkedIn
          </a>

          <span className="hidden sm:inline text-gray-300 dark:text-stone-700">|</span>

          <button
            id="nav-btn-contact"
            onClick={onOpenContact}
            className="hidden sm:flex items-center gap-1 text-xs text-black dark:text-white border border-black dark:border-white rounded-full px-3 py-1 bg-white dark:bg-stone-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all cursor-pointer"
          >
            <Send size={11} />
            <span>Say Hello</span>
          </button>

          <span className="text-gray-300 dark:text-stone-700">|</span>

          {/* High-Fidelity neon/neobrutalist light/dark rocker switcher with hover pop */}
          <motion.button
            id="theme-toggle-btn"
            onClick={onToggleDarkMode}
            whileTap={{ scale: 0.85 }}
            whileHover={{ scale: 1.15, rotate: isDarkMode ? -15 : 15 }}
            className="relative flex items-center justify-center w-8 h-8 rounded-full border-2 border-black dark:border-white bg-[#fef08a] dark:bg-stone-800 text-stone-900 dark:text-yellow-300 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] cursor-pointer focus:outline-none"
            title="Toggle Light/Dark Theme"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDarkMode ? "dark" : "light"}
                initial={{ y: -10, opacity: 0, rotate: -45 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 10, opacity: 0, rotate: 45 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center"
              >
                {isDarkMode ? <Sun size={15} /> : <Moon size={15} className="text-indigo-900" />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </nav>
      </div>
    </motion.header>
  );
}
