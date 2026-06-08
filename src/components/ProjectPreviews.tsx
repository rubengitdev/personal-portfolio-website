import React, { useState } from "react";
import { MessageSquarePlus, Sparkles, Filter, ShieldCheck, Play, ArrowRight, MapPin, Compass, Layers, Gift, Image as ImageIcon, Terminal } from "lucide-react";
import { PREVIEW_IMAGES } from "../imageAssets";

interface ProjectPreviewProps {
  projectId: string;
}

export default function ProjectPreview({ projectId }: ProjectPreviewProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [toggleActive, setToggleActive] = useState<boolean>(true);
  const [previewMode, setPreviewMode] = useState<"png" | "code">("png");
  const [imageError, setImageError] = useState<boolean>(false);

  const pngUrl = PREVIEW_IMAGES[projectId];

  // Helper toggle overlay
  const renderToggleBar = () => (
    <div className="absolute top-2 right-2 flex gap-1 z-30 pointer-events-auto shadow-sm">
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setPreviewMode("png");
        }}
        className={`px-2 py-0.5 rounded text-[9px] font-mono font-black uppercase flex items-center gap-1 border border-black cursor-pointer transition-all ${
          previewMode === "png" && !imageError
            ? "bg-yellow-300 text-stone-900 shadow-[1px_1px_0px_rgba(0,0,0,1)]"
            : "bg-stone-900 text-stone-200 hover:bg-stone-850"
        }`}
        title="View PNG Image Asset"
      >
        <ImageIcon size={10} />
        <span>PNG</span>
      </button>
    </div>
  );

  // Render PNG layout if selected and image loaded fine
  if (previewMode === "png" && pngUrl && !imageError) {
    return (
      <div className="w-full h-64 sm:h-72 bg-stone-100 dark:bg-stone-900 relative overflow-hidden flex items-center justify-center border-2 border-black rounded-lg group select-none cursor-zoom-in">
        {/* Click to Expand Trigger Overlaid Mask */}
        <div 
          className="absolute inset-0 z-10 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-auto"
          onClick={(e) => {
            e.stopPropagation();
            window.dispatchEvent(new CustomEvent("trigger-image-preview", { 
              detail: { 
                src: pngUrl, 
                alt: `${projectId.toUpperCase()} - HIGH-FIDELITY PROJECT PREVIEW OVERVIEW` 
              } 
            }));
          }}
          title="Click to preview full-size"
        >
          <span className="opacity-0 group-hover:opacity-100 bg-black/80 backdrop-blur-xs text-white text-[10px] font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-stone-800 transition-all shadow-md transform scale-95 group-hover:scale-100 flex items-center gap-1.5 pointer-events-none">
            🔍 Click to Expand Asset
          </span>
        </div>

        <img
          src={pngUrl}
          alt={`${projectId} high fidelity overview preview (PNG)`}
          className="w-full h-full object-cover transition-transform duration-505 group-hover:scale-101"
          referrerPolicy="no-referrer"
          onError={() => {
            setImageError(true);
            setPreviewMode("code");
          }}
        />
        {/* Toggle overlay */}
        {renderToggleBar()}
      </div>
    );
  }

  return (
    <div className="w-full h-64 bg-slate-100 border rounded flex items-center justify-center relative">
      {renderToggleBar()}
      <span>Preview Widget</span>
    </div>
  );
}
