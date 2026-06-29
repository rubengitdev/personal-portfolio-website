import React, { useState } from "react";
import { motion } from "motion/react";
import { STORY_IMAGES } from "../imageAssets";

interface DesignStoryCanvasProps {
  projectId: string;
}

// ====================================================
// 🛠️ CUSTOM IMAGE CONFIGURATION MATRIX
// All of these image assets are properly imported from imageAssets.ts
// for production-ready builds with Vite.
// =====================================================

interface MediaSlotProps {
  customUrl: string;
  projectId: string;
  stepIndex: number;
  label: string;
}

function StoryMediaSlot({
  customUrl,
  projectId,
  stepIndex,
  label,
}: MediaSlotProps) {
  const [hasError, setHasError] = useState(false);

  if (customUrl && customUrl.trim() !== "" && !hasError) {
    return (
      <div className="relative border-4 border-black dark:border-stone-800 rounded-2xl overflow-hidden aspect-video bg-stone-100 dark:bg-stone-900 group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] flex items-center justify-center cursor-zoom-in">
        {/* Click to Expand Trigger Overlaid Mask */}
        <div
          className="absolute inset-0 z-15 bg-black/0 hover:bg-black/25 transition-colors flex items-center justify-center pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(
              new CustomEvent("trigger-image-preview", {
                detail: {
                  src: customUrl,
                  alt: `${projectId.toUpperCase()} — CHAPTER 0${stepIndex + 1}: ${label}`,
                },
              }),
            );
          }}
          title="Zoom to Fullscreen Preview"
        >
          <span className="opacity-0 group-hover:opacity-100 bg-black/85 backdrop-blur-xs text-white text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-stone-805 transition-all shadow-md transform scale-95 group-hover:scale-100 flex items-center gap-1.5 pointer-events-none">
            🔍 Click to Expand
          </span>
        </div>

        <img
          src={customUrl}
          alt={label}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-500"
          onError={() => setHasError(true)}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-black/70 backdrop-blur-xs p-2 text-white text-[10px] font-mono flex justify-between items-center select-none z-10">
          <span className="truncate pr-1">{label}</span>
          <span className="text-[8px] bg-yellow-300 text-stone-900 px-1.5 py-0.5 rounded font-black font-mono shrink-0">
            PNG ACTIVE
          </span>
        </div>
      </div>
    );
  }

  // Fallback elegant representation placeholder in case the user deletes or renames their own PNG
  return (
    <div className="relative border-4 border-black dark:border-stone-700 bg-stone-100 dark:bg-stone-900 rounded-2xl p-6 text-center flex flex-col justify-between aspect-video select-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.15)] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2d2d2d_1px,transparent_1px),linear-gradient(to_bottom,#2d2d2d_1px,transparent_1px)] bg-[size:16px_16px] opacity-40 pointer-events-none" />

      <div className="space-y-1.5 pt-4 z-10">
        <div className="inline-block bg-black dark:bg-stone-800 text-white text-[8px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-black">
          {projectId.toUpperCase()} // STEP 0{stepIndex + 1}
        </div>
        <h5 className="text-xs font-mono font-black text-[#ff2a2a] uppercase">
          {label}
        </h5>
      </div>

      <div className="border border-dashed border-stone-400 dark:border-stone-600 rounded-xl p-3 bg-white/90 dark:bg-stone-950/95 py-1.5 z-10 max-w-xs mx-auto">
        <p className="text-[9px] font-mono text-stone-600 dark:text-stone-300 leading-normal">
          📷{" "}
          <strong className="text-stone-900 dark:text-white uppercase">
            Replace with custom image
          </strong>
          <br /> Save your mock image file to:
          <br />
          <code className="text-stone-800 dark:text-stone-200 font-bold bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded block mt-1 text-[8px] overflow-x-auto truncate select-all">
            {customUrl}
          </code>
        </p>
      </div>

      <div className="text-[9px] uppercase tracking-wide font-mono text-stone-500 pb-1 z-10">
        ✨ Place a PNG file here to swap
      </div>
    </div>
  );
}

export default function DesignStoryCanvas({
  projectId,
}: DesignStoryCanvasProps) {
  const amazainCmsSteps = [
    {
      title: "Conducted UX Research",
      subtitle: "Enterprise option fatigue in search bars",
      narrative:
        "Enterprise search needs vast capabilities, but cluttered filter selectors, date range toggles, and platform icons caused immediate visual overload (up to 78% click drop-off among professionals). I introduced a cleaner interface approach by adopting progressive disclosure. Notice how simple, compact layout blocks can represent complicated systems gracefully when we hide redundant tools until they are actually invoked by text prompts.",
      imageLabel: "Wireframe exploration for search filter states",
    },
    {
      title: "Created Optimized User Flow",
      subtitle: "Converting micro-gestures to instant search indices",
      narrative:
        "True power-users rely entirely on keyboard muscle memory. Rather than forcing them to navigate menus, pressing intuitive trigger characters like '@' or '/' dynamically opens local context feeds without breaking physical workflows. I built high-velocity index parsers that receive these inputs, mapping them into query arrays automatically to minimize physical keyboard-to-mouse displacement.",
      imageLabel: "Context lookup filter parsing layout diagram",
    },
    {
      title: "Arranged Information Architecture",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Created Wireframes",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Final Design",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Design System",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
  ];

  const notionSteps = [
    {
      title: "Conducted UX Research",
      subtitle: "Enterprise option fatigue in search bars",
      narrative:
        "Enterprise search needs vast capabilities, but cluttered filter selectors, date range toggles, and platform icons caused immediate visual overload (up to 78% click drop-off among professionals). I introduced a cleaner interface approach by adopting progressive disclosure. Notice how simple, compact layout blocks can represent complicated systems gracefully when we hide redundant tools until they are actually invoked by text prompts.",
      imageLabel: "Wireframe exploration for search filter states",
    },
    {
      title: "Created Optimized User Flow",
      subtitle: "Converting micro-gestures to instant search indices",
      narrative:
        "True power-users rely entirely on keyboard muscle memory. Rather than forcing them to navigate menus, pressing intuitive trigger characters like '@' or '/' dynamically opens local context feeds without breaking physical workflows. I built high-velocity index parsers that receive these inputs, mapping them into query arrays automatically to minimize physical keyboard-to-mouse displacement.",
      imageLabel: "Context lookup filter parsing layout diagram",
    },
    {
      title: "Arranged Information Architecture",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Created Wireframes",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Final Design",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Design System",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
  ];

  const eyeMarketSteps = [
    {
      title: "Conducted UX Research",
      subtitle: "Enterprise option fatigue in search bars",
      narrative:
        "Enterprise search needs vast capabilities, but cluttered filter selectors, date range toggles, and platform icons caused immediate visual overload (up to 78% click drop-off among professionals). I introduced a cleaner interface approach by adopting progressive disclosure. Notice how simple, compact layout blocks can represent complicated systems gracefully when we hide redundant tools until they are actually invoked by text prompts.",
      imageLabel: "Wireframe exploration for search filter states",
    },
    {
      title: "Created Optimized User Flow",
      subtitle: "Converting micro-gestures to instant search indices",
      narrative:
        "True power-users rely entirely on keyboard muscle memory. Rather than forcing them to navigate menus, pressing intuitive trigger characters like '@' or '/' dynamically opens local context feeds without breaking physical workflows. I built high-velocity index parsers that receive these inputs, mapping them into query arrays automatically to minimize physical keyboard-to-mouse displacement.",
      imageLabel: "Context lookup filter parsing layout diagram",
    },
    {
      title: "Arranged Information Architecture",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Created Wireframes",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Final Design",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Design System",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
  ];

  const bearSteps = [
    {
      title: "Conducted UX Research",
      subtitle: "Enterprise option fatigue in search bars",
      narrative:
        "Enterprise search needs vast capabilities, but cluttered filter selectors, date range toggles, and platform icons caused immediate visual overload (up to 78% click drop-off among professionals). I introduced a cleaner interface approach by adopting progressive disclosure. Notice how simple, compact layout blocks can represent complicated systems gracefully when we hide redundant tools until they are actually invoked by text prompts.",
      imageLabel: "Wireframe exploration for search filter states",
    },
    {
      title: "Created Optimized User Flow",
      subtitle: "Converting micro-gestures to instant search indices",
      narrative:
        "True power-users rely entirely on keyboard muscle memory. Rather than forcing them to navigate menus, pressing intuitive trigger characters like '@' or '/' dynamically opens local context feeds without breaking physical workflows. I built high-velocity index parsers that receive these inputs, mapping them into query arrays automatically to minimize physical keyboard-to-mouse displacement.",
      imageLabel: "Context lookup filter parsing layout diagram",
    },
    {
      title: "Arranged Information Architecture",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Created Wireframes",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Final Design",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
    {
      title: "Design System",
      subtitle: "Bypassing server lag with staggered visual cues",
      narrative:
        "Enterprise-grade APIs occasionally introduce up to 500ms in latency. Static spinners feel dragging and slow. Instead of standard loaders, I designed staggered content-box entries that occupy focus incrementally. By timing UI renders to fit typical cognitive recognition thresholds (50ms - 150ms), we trick internal human perception into feeling that the platform operates with near-instant speed.",
      imageLabel: "API latency timeline and render staggered visual map",
    },
  ];

  const steps =
    projectId === "amazaincms"
      ? amazainCmsSteps
      : projectId === "notion"
        ? notionSteps
        : projectId === "eyemarket"
          ? eyeMarketSteps
          : bearSteps;

  const projectColor =
    projectId === "amazaincms"
      ? "#4f46e5"
      : projectId === "notion"
        ? "#e11d48"
        : projectId === "eyemarket"
          ? "#8b5cf6"
          : "#16a34a";

  const customUrls = STORY_IMAGES[projectId] || ["", "", ""];

  return (
    <div
      className="border-3 border-black dark:border-white bg-[#fafafa] dark:bg-stone-950 p-6 sm:p-10 rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] text-left space-y-10"
      id="design-story-canvas"
    >
      {/* 🚀 Section Typography Header */}
      <div className="space-y-2 border-b-2 border-black dark:border-stone-800 pb-6">
        <div className="inline-flex items-center gap-1.5 bg-[#ff2a2a] text-white text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded border border-black transform -rotate-1 select-none">
          📝 DESIGN JOURNAL STAGE
        </div>
        <h3 className="text-3xl sm:text-4xl font-display font-black text-stone-900 dark:text-white uppercase tracking-tight">
          How I Designed It: Creative Process
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-300 font-sans max-w-2xl leading-relaxed">
          I document each evolution of the product architecture sequentially.
          Browse each chapter to see how core problems are analyzed and resolved
          physically with curated high-fidelity PNG design assets.
        </p>
      </div>

      {/* 📜 Continuous Vertical Story Scroll list linked by a retro dashed line */}
      <div className="relative space-y-16 py-4">
        {/* Central timeline connector line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 border-l-2 border-dashed border-stone-300 dark:border-stone-850 transform -translate-x-1/2" />

        {steps.map((step, idx) => {
          const stepImageSrc = customUrls[idx] || "";
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
            >
              {/* Timeline bubble locator */}
              <div
                style={{ backgroundColor: projectColor }}
                className="absolute left-6 md:left-1/2 top-4 w-5 h-5 rounded-full border-2 border-black transform -translate-x-1/2 z-10 flex items-center justify-center shadow-[1px_1px_0px_0px_#000]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>

              {/* 📖 Left/Alternating Column: Narrative Text Block */}
              <div
                className={`pl-12 md:pl-0 space-y-3 flex flex-col justify-between ${
                  isEven ? "md:pr-10" : "md:pl-10 md:order-2"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-widest bg-red-50 dark:bg-red-950/20 border border-red-200 px-2 py-0.5 rounded">
                      CHAPTER 0{idx + 1}
                    </span>
                    <span className="text-[10px] font-mono text-stone-400 capitalize hidden sm:inline">
                      — {step.subtitle.toLowerCase()}
                    </span>
                  </div>

                  <h4 className="text-xl sm:text-2xl font-display font-black text-stone-900 dark:text-white uppercase leading-tight">
                    {step.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-stone-605 dark:text-stone-300 font-sans leading-relaxed text-justify">
                    {step.narrative}
                  </p>
                </div>

                <div className="border-t border-dashed border-stone-200 dark:border-stone-800 pt-3 flex items-center justify-between text-[9px] font-mono text-stone-400 uppercase tracking-wider">
                  <span>Methodology: High-Fi Design</span>
                  <span>PNG Asset Chapter</span>
                </div>
              </div>

              {/* 🖼️ Right/Alternating Column: Content Asset Card */}
              <div
                className={`pl-12 md:pl-0 flex flex-col justify-center ${
                  isEven ? "md:pl-10 md:order-2" : "md:pr-10"
                }`}
              >
                {/* 📌 Story image component with manual customization guidance */}
                <StoryMediaSlot
                  customUrl={stepImageSrc}
                  projectId={projectId}
                  stepIndex={idx}
                  label={step.imageLabel}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER */}
      <div className="border-t border-solid border-black dark:border-stone-850 pt-5 text-center text-[10px] font-mono text-stone-500 uppercase tracking-wider">
        ⚓ End of Designed Chronology // All Chapters Powered by PNG Assets
      </div>
    </div>
  );
}
