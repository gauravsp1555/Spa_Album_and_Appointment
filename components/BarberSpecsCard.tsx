"use client";

import React, { useState } from "react";
import { Hairstyle } from "@/lib/hairstylesData";
import {
  Scissors,
  Sparkles,
  Smartphone,
  X,
  Compass,
  CheckCircle2,
  Copy,
  Check,
  Share2,
} from "lucide-react";

interface BarberSpecsCardProps {
  hairstyle: Hairstyle;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
  className?: string;
}

export default function BarberSpecsCard({
  hairstyle,
  isOpenModal = false,
  onCloseModal,
  className = "",
}: BarberSpecsCardProps) {
  const [showModal, setShowModal] = useState<boolean>(isOpenModal);
  const [copied, setCopied] = useState<boolean>(false);
  const specs = hairstyle.specs;

  const handleOpen = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    if (onCloseModal) onCloseModal();
  };

  const handleCopySpecs = () => {
    const text = `💈 PHA SALON BARBER SPEC PROTOCOL: ${hairstyle.name}
• Sides & Back: ${specs.sidesGuard}
• Top Section: ${specs.topLength}
• Taper Style: ${specs.taperStyle}
• Lineup: ${specs.lineupType}
${specs.beardBlend ? `• Beard Blend: ${specs.beardBlend}` : ""}
• Hair Texture: ${specs.hairTexture}
• Styling Product: ${specs.stylingProduct}
• Face Shapes: ${specs.recommendedFaceShape.join(", ")}
📍 Studio: PHA Salon & Spa (Gaurav Grooming Studio)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(
    `Check out this haircut specs from PHA Salon: ${hairstyle.name}\nSides: ${specs.sidesGuard}\nTop: ${specs.topLength}`
  )}`;

  return (
    <>
      <div className={`bg-[#14151c] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${className}`}>
        <div className="flex justify-between items-center pb-3 mb-4 border-b border-white/10">
          <div>
            <span className="text-[11px] font-bold text-[#e8602e] uppercase tracking-wider block font-mono">
              Barber Specs Protocol
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white mt-0.5 tracking-tight">
              Cut Technical Blueprint
            </h3>
          </div>

          <button
            onClick={handleOpen}
            className="bg-[#e8602e]/20 hover:bg-[#e8602e] text-[#e8602e] hover:text-white font-extrabold px-3.5 py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 border border-[#e8602e]/40 shadow-xs"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Show Barber</span>
          </button>
        </div>

        {/* Clean Specs List with Restored Labels */}
        <div className="space-y-2.5 text-xs sm:text-sm font-mono">
          <div className="bg-[#1a1c26] p-3 rounded-2xl border border-white/5 flex justify-between items-center gap-2">
            <span className="text-zinc-400 font-sans font-medium flex items-center gap-2 flex-shrink-0">
              <Scissors className="w-4 h-4 text-[#e8602e]" /> Sides & Back:
            </span>
            <span className="font-bold text-white text-right truncate">{specs.sidesGuard}</span>
          </div>

          <div className="bg-[#1a1c26] p-3 rounded-2xl border border-white/5 flex justify-between items-center gap-2">
            <span className="text-zinc-400 font-sans font-medium flex items-center gap-2 flex-shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" /> Crown & Top:
            </span>
            <span className="font-bold text-white text-right truncate">{specs.topLength}</span>
          </div>

          <div className="bg-[#1a1c26] p-3 rounded-2xl border border-white/5 flex justify-between items-center gap-2">
            <span className="text-zinc-400 font-sans font-medium flex items-center gap-2 flex-shrink-0">
              <Compass className="w-4 h-4 text-sky-400" /> Lineup & Edges:
            </span>
            <span className="font-bold text-white text-right truncate">{specs.lineupType}</span>
          </div>

          {specs.beardBlend && (
            <div className="bg-[#1a1c26] p-3 rounded-2xl border border-white/5 flex justify-between items-center gap-2">
              <span className="text-zinc-400 font-sans font-medium flex items-center gap-2 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Beard Blend:
              </span>
              <span className="font-bold text-white text-right truncate">{specs.beardBlend}</span>
            </div>
          )}

          <div className="bg-[#1a1c26] p-3 rounded-2xl border border-white/5 flex justify-between items-center gap-2">
            <span className="text-zinc-400 font-sans font-medium flex items-center gap-2 flex-shrink-0">
              Ideal Face Shape:
            </span>
            <span className="font-bold text-amber-300 text-right truncate">
              {specs.recommendedFaceShape.join(", ")}
            </span>
          </div>
        </div>

        {/* Recommended Product & Styling */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap justify-between items-center gap-2 text-xs">
          <span className="text-zinc-400">
            Styling Product: <strong className="text-amber-400 font-semibold">{specs.stylingProduct}</strong>
          </span>

          <button
            onClick={handleCopySpecs}
            className="text-[11px] font-mono text-[#e8602e] hover:underline flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Specs
              </>
            )}
          </button>
        </div>
      </div>

      {/* Show Barber Fullscreen Ticket Modal */}
      {(showModal || isOpenModal) && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#14151c] rounded-3xl p-6 text-white border border-[#e8602e]/50 shadow-[0_0_50px_rgba(232,96,46,0.3)] space-y-5 animate-scaleUp">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-9 h-9 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full flex items-center justify-center font-bold text-sm transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-2 pb-3 border-b border-white/10">
              <span className="inline-flex items-center gap-1 bg-[#e8602e]/20 text-[#e8602e] text-xs font-extrabold px-3 py-1 rounded-full border border-[#e8602e]/40 uppercase tracking-widest font-mono">
                <Sparkles className="w-3.5 h-3.5" /> SHOW TO YOUR BARBER
              </span>
              <h2 className="text-2xl font-black text-white mt-3 tracking-tight">{hairstyle.name}</h2>
              <p className="text-xs text-zinc-400 mt-1">{hairstyle.subtitle}</p>
            </div>

            <div className="space-y-3 font-mono">
              <div className="bg-[#1a1c26] p-4 rounded-2xl border border-white/10">
                <span className="text-[11px] text-[#e8602e] uppercase font-bold tracking-wider block">Sides & Back Guard</span>
                <span className="text-lg sm:text-xl font-extrabold text-white mt-1 block">{specs.sidesGuard}</span>
              </div>

              <div className="bg-[#1a1c26] p-4 rounded-2xl border border-white/10">
                <span className="text-[11px] text-[#e8602e] uppercase font-bold tracking-wider block">Top Section Cut</span>
                <span className="text-lg sm:text-xl font-extrabold text-white mt-1 block">{specs.topLength}</span>
              </div>

              <div className="bg-[#1a1c26] p-4 rounded-2xl border border-white/10">
                <span className="text-[11px] text-[#e8602e] uppercase font-bold tracking-wider block">Lineup & Edges</span>
                <span className="text-base font-bold text-white mt-1 block">{specs.lineupType}</span>
              </div>

              {specs.beardBlend && (
                <div className="bg-[#1a1c26] p-4 rounded-2xl border border-white/10">
                  <span className="text-[11px] text-[#e8602e] uppercase font-bold tracking-wider block">Beard Blend</span>
                  <span className="text-base font-bold text-white mt-1 block">{specs.beardBlend}</span>
                </div>
              )}

              <div className="bg-[#1a1c26] p-3 rounded-2xl border border-white/10 flex justify-between items-center text-xs">
                <span className="text-zinc-400">Styling Product:</span>
                <span className="text-amber-300 font-bold">{specs.stylingProduct}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleCopySpecs}
                className="flex-1 bg-[#1a1c26] hover:bg-[#202330] text-zinc-200 hover:text-white font-bold py-3 rounded-xl text-xs transition-colors border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer font-mono"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#e8602e]" />}
                <span>{copied ? "Copied" : "Copy Blueprint"}</span>
              </button>

              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                aria-label="Share blueprint via WhatsApp"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#e8602e] text-white font-extrabold py-3.5 rounded-2xl text-sm transition-all shadow-[0_0_20px_rgba(232,96,46,0.4)] cursor-pointer"
            >
              Done / Close Protocol
            </button>
          </div>
        </div>
      )}
    </>
  );
}
