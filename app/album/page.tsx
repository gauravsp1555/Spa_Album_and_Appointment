"use client";

import React, { useState, Suspense, useMemo } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Camera, Scissors, Sparkles, CheckCircle2 } from "lucide-react";
import Hairstyle360Viewer from "@/components/Hairstyle360Viewer";
import BarberSpecsCard from "@/components/BarberSpecsCard";
import { HAIRSTYLES_DATA } from "@/lib/hairstylesData";
import { useSearchParams } from "next/navigation";

function AlbumContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("type");

  const initialCat = useMemo(() => {
    if (!categoryParam) return "all";
    const decoded = decodeURIComponent(categoryParam).toLowerCase().trim();
    return ["all", "men", "gen z", "children", "seniors", "women"].includes(decoded) ? decoded : "all";
  }, [categoryParam]);

  const [userSelectedCategory, setUserSelectedCategory] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);
  const [isBarberModalOpen, setIsBarberModalOpen] = useState(false);

  const activeCategory = userSelectedCategory ?? initialCat;

  const visibleHairstyles = useMemo(() => {
    return HAIRSTYLES_DATA.filter(
      (item) => activeCategory === "all" || item.category === activeCategory
    );
  }, [activeCategory]);

  const selectedStyle = useMemo(() => {
    if (selectedStyleId) {
      const found = visibleHairstyles.find((h) => h.id === selectedStyleId);
      if (found) return found;
    }
    return visibleHairstyles[0] || HAIRSTYLES_DATA[0];
  }, [selectedStyleId, visibleHairstyles]);

  const handleCategoryChange = (catId: string) => {
    setUserSelectedCategory(catId);
    setSelectedStyleId(null);
  };

  const categories = [
    { id: "all", label: "All Collections" },
    { id: "men", label: "Men Professional" },
    { id: "gen z", label: "Gen-Z Urban Fades" },
    { id: "children", label: "Kids & Juniors" },
    { id: "seniors", label: "Seniors Royal" },
    { id: "women", label: "Women Styling" },
  ];

  return (
    <main className="flex-1 w-full px-6 md:px-12 lg:px-16 py-10 sm:py-14 flex flex-col space-y-12 relative z-10">
      {/* Header Title */}
      <div className="text-center space-y-6 w-full max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14151c] border border-[#e8602e]/40 text-xs font-mono font-extrabold uppercase tracking-widest text-[#e8602e]">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>360° VIRTUAL STUDIO CONSULTATION</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider uppercase text-white leading-[1.3] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <span>Interactive</span>
          <span className="relative inline-block border-2 border-[#e8602e] px-4 sm:px-6 py-1 sm:py-1.5 rounded-2xl bg-[#e8602e]/10 shadow-[0_0_25px_rgba(232,96,46,0.35)] group">
            {/* Precision Handles */}
            <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
            <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
            <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />

            <span className="bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(255,94,0,0.6)]">
              Hairstyle Album
            </span>
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
          Inspect haircuts in 360° from 8 studio angles. Review sides guard, crown length, and taper specs before your appointment.
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2 font-mono">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-[#e8602e] text-white shadow-[0_0_20px_rgba(232,96,46,0.4)]"
                  : "bg-[#14151c] text-zinc-300 hover:bg-[#1a1c26] border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HAIRSTYLE SELECTION STRIP (Allows switching between haircuts in category) */}
      {/* ========================================================================= */}
      <section className="w-full max-w-7xl mx-auto space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e8602e] flex items-center gap-1.5">
            <Scissors className="w-3.5 h-3.5" /> Select Cut to Inspect ({visibleHairstyles.length} available)
          </span>
          <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
            Click any style to preview in 360°
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {visibleHairstyles.map((style) => {
            const isSelected = selectedStyle.id === style.id;
            return (
              <button
                key={style.id}
                onClick={() => setSelectedStyleId(style.id)}
                className={`group text-left p-2.5 rounded-2xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#1f202c] border-[#e8602e] shadow-[0_0_20px_rgba(232,96,46,0.35)] scale-[1.02]"
                    : "bg-[#14151c] hover:bg-[#1a1c26] border-white/10 hover:border-white/20"
                }`}
              >
                <div className="w-full h-24 rounded-xl overflow-hidden bg-stone-900 mb-2 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={style.angles.front}
                    alt={style.name}
                    width={200}
                    height={150}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-[#e8602e] text-white p-1 rounded-full shadow-md">
                      <CheckCircle2 className="w-3 h-3" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className={`text-xs font-bold truncate ${isSelected ? "text-[#e8602e]" : "text-white"}`}>
                    {style.name}
                  </h4>
                  <span className="text-[10px] text-zinc-400 block truncate font-mono mt-0.5">
                    {style.specs.sidesGuard.split(" ")[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* INTERACTIVE 360 VIEWER & BARBER SPECS BLUEPRINT */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <Hairstyle360Viewer
            hairstyle={selectedStyle}
            onOpenBarberTicket={() => setIsBarberModalOpen(true)}
          />
        </div>
        <div>
          <BarberSpecsCard
            hairstyle={selectedStyle}
            isOpenModal={isBarberModalOpen}
            onCloseModal={() => setIsBarberModalOpen(false)}
          />
        </div>
      </section>

      {/* ========================================================================= */}
      {/* ELFSIGHT INSTAGRAM LIVE GALLERY STREAM */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto w-full pt-8 border-t border-white/10 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
            <Camera className="w-5 h-5 text-[#e8602e]" /> Live Transformation Stream
          </h2>
          <p className="text-xs text-zinc-400 font-medium">Real-time haircuts straight from our salon studio floor</p>
        </div>

        <div className="pt-2">
          <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
          <div
            className="elfsight-app-4d92a994-e73b-430d-8b6f-98578c0292f3"
            data-elfsight-app-lazy
          ></div>
        </div>
      </section>
    </main>
  );
}

export default function AlbumPage() {
  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
      <div className="glow-bg" />

      <Header />

      <Suspense
        fallback={
          <div className="flex-1 flex items-center justify-center py-24 text-zinc-400 font-mono text-sm">
            Loading Lookbook 360 Studio...
          </div>
        }
      >
        <AlbumContent />
      </Suspense>

      <Footer />
    </div>
  );
}