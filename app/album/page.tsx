"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Camera } from "lucide-react";
import Hairstyle360Viewer from "@/components/Hairstyle360Viewer";
import BarberSpecsCard from "@/components/BarberSpecsCard";
import { HAIRSTYLES_DATA, Hairstyle } from "@/lib/hairstylesData";

export default function AlbumPage() {
  const [selectedStyle, setSelectedStyle] = useState<Hairstyle>(HAIRSTYLES_DATA[0]);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const categories = [
    { id: "all", label: "All Lookbooks" },
    { id: "men", label: "Men Professional" },
    { id: "gen z", label: "Gen-Z Fades" },
    { id: "children", label: "Kids & Juniors" },
    { id: "seniors", label: "Seniors Royal" },
  ];

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    const matched = HAIRSTYLES_DATA.find(
      (item) => catId === "all" || item.category === catId
    );
    if (matched) {
      setSelectedStyle(matched);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="glow-bg" />

      <Header />

      <main className="flex-1 w-full px-6 md:px-12 lg:px-16 py-10 sm:py-14 flex flex-col space-y-10 relative z-10">
        {/* Header Title */}
        <div className="text-center space-y-6 w-full">

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider uppercase text-white leading-[1.3] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span>Interactive</span>
            <span className="relative inline-block border-2 border-[#e8602e] px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-2xl bg-[#e8602e]/10 shadow-[0_0_25px_rgba(232,96,46,0.35)] group">
              {/* Figma Corner Handles */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />

              <span className="bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(255,94,0,0.6)]">
                Hairstyle Album
              </span>
            </span>
          </h1>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 font-mono">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${activeCategory === cat.id
                  ? "bg-[#e8602e] text-white shadow-[0_0_20px_rgba(232,96,46,0.4)]"
                  : "bg-[#14151c] text-zinc-300 hover:bg-[#1a1c26] border border-white/10"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive 360 Viewer & Barber Specs Side-by-Side */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Hairstyle360Viewer hairstyle={selectedStyle} />
          </div>
          <div>
            <BarberSpecsCard hairstyle={selectedStyle} />
          </div>
        </section>

        {/* Elfsight Instagram Live Gallery */}
        <section className="pt-6 border-t border-white/10 space-y-4">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-extrabold text-white flex items-center justify-center gap-2">
              <Camera className="w-5 h-5 text-[#e8602e]" /> Live Transformation Stream
            </h2>
            <p className="text-xs text-zinc-400 font-medium">Real-time haircuts from our studio salon floor</p>
          </div>

          <div className="pt-2">
            <div
              className="elfsight-app-4d92a994-e73b-430d-8b6f-98578c0292f3"
              data-elfsight-app-lazy
            ></div>
          </div>
        </section>
      </main>
    </div>
  );
}