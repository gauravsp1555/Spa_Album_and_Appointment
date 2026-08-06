"use client";

import React from "react";
import { Sparkles, Scissors, Percent, MapPin, Phone } from "lucide-react";

interface TopMarqueeProps {
  onBookClick?: () => void;
}

export default function TopMarquee({ onBookClick }: TopMarqueeProps) {
  const marqueeItems = [
    {
      label: "Hair Care & Cutting",
      offer: "FLAT 20% OFF",
      icon: Scissors,
      type: "offer",
      link: "/services",
    },
    {
      label: "Skin & Facials",
      offer: "FLAT 20% OFF",
      icon: Sparkles,
      type: "offer",
      link: "/services",
    },
    {
      label: "Men's Grooming",
      offer: "FLAT 20% OFF",
      icon: Scissors,
      type: "offer",
      link: "/services",
    },
    {
      label: "Body Spa & Massage",
      offer: "FLAT 20% OFF",
      icon: Sparkles,
      type: "offer",
      link: "/services",
    },
    {
      label: "SPECIAL OFFER: 20% OFF ON EVERY SALON SERVICE",
      offer: "20% OFF ALL",
      icon: Percent,
      type: "highlight",
      link: "/services",
    },
    {
      label: "Address: PHA Salon & Spa, Main Street, India",
      offer: "VISIT US",
      icon: MapPin,
      type: "info",
      link: "/contact",
    },
    {
      label: "Salon Owner: Prakash Sapkar — Mob No: +91 9823621827",
      offer: "CALL NOW",
      icon: Phone,
      type: "contact",
      link: "tel:+919823621827",
    },
  ];

  // Quadruple array to create infinite smooth scroll effect without gaps
  const items = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];

  return (
    <div className="w-full bg-[#0a0b0e] border-b border-[#e8602e]/30 text-white py-2 overflow-hidden relative z-50 select-none shadow-[0_4px_15px_rgba(0,0,0,0.4)]">
      {/* Background Subtle Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#e8602e]/10 via-amber-500/5 to-[#e8602e]/10 pointer-events-none" />

      {/* Left Edge Gradient Overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#0a0b0e] to-transparent z-20 pointer-events-none" />

      {/* Right Edge Gradient Overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#0a0b0e] to-transparent z-20 pointer-events-none" />

      {/* Marquee Continuous Row */}
      <div className="animate-marquee flex items-center gap-4 sm:gap-6 whitespace-nowrap cursor-pointer">
        {items.map((item, idx) => {
          const IconComp = item.icon;
          return (
            <div
              key={`top-m-${idx}`}
              onClick={() => {
                if (item.type === "offer" || item.type === "highlight") {
                  if (onBookClick) onBookClick();
                }
              }}
              className="inline-flex items-center gap-2.5 bg-[#14151f]/90 hover:bg-[#1c1e2d] text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full border border-white/10 hover:border-[#e8602e] transition-all group duration-200 shadow-md hover:scale-105"
            >
              <span className="w-2 h-2 rounded-full bg-[#e8602e] animate-pulse flex-shrink-0 group-hover:scale-125 transition-transform" />
              
              <IconComp className="w-3.5 h-3.5 text-[#e8602e] group-hover:text-amber-400 transition-colors" />

              <span className="text-zinc-200 group-hover:text-white transition-colors font-medium">
                {item.label}
              </span>

              <span
                className={`text-[10px] sm:text-xs font-black px-2 py-0.5 rounded-md font-mono transition-colors tracking-wide ${
                  item.type === "highlight"
                    ? "bg-[#e8602e] text-white shadow-[0_0_10px_rgba(232,96,46,0.5)]"
                    : item.type === "contact"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-[#e8602e]/20 text-[#e8602e] group-hover:bg-[#e8602e] group-hover:text-white"
                }`}
              >
                {item.offer}
              </span>

              <span className="text-zinc-600 text-xs font-bold pl-1">✦</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
