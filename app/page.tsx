"use client";

import React from "react";
import Header from "@/components/Header";
import LookbookCard from "@/components/LookbookCard";
import { Scissors, Users, Star, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const trendingIndianHairstyles = [
    {
      title: "Business Professional Styles",
      imageSrc: "/images/categories/men.jpg",
      tags: ["Mid Fade", "Textured Quiff", "Beard Blend", "Athletic Cut"],
      linkType: "men",
      subtitle: "Precision executive haircuts tailored for modern Indian professionals.",
    },
    {
      title: "Gen-Z Styles",
      imageSrc: "/images/categories/genz.jpg",
      tags: ["Drop Fade", "Textured Crop", "Fringe", "Urban Look"],
      linkType: "gen z",
      subtitle: "High contrast urban cuts, messy textures & sharp lineup fades.",
    },
    {
      title: "Junior & Children Styles",
      imageSrc: "/images/categories/children.jpg",
      tags: ["School Cut", "Clean Fade", "Festive Style", "Low Maintenance"],
      linkType: "children",
      subtitle: "Comfortable, smart & trendy haircuts for kids and young scholars.",
    },
    {
      title: "Senior Citizen Styles",
      imageSrc: "/images/categories/seniors.jpg",
      tags: ["Royal Pompadour", "Silver Taper", "Beard Sculpt", "Classic"],
      linkType: "seniors",
      subtitle: "Distinguished classic tapers, silver hair grooming & royal pompadours.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
      <div className="glow-bg" />

      <Header />

      <main className="flex-1 w-full px-6 md:px-12 lg:px-16 py-10 sm:py-16 space-y-12 relative z-10">
        {/* HERO HEADING SECTION */}
        <section className="text-center space-y-6 w-full pt-4 relative">

          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider uppercase text-white leading-[1.3] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span>Trending</span>
            <span className="relative inline-block border-2 border-[#e8602e] px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-2xl bg-[#e8602e]/10 shadow-[0_0_25px_rgba(232,96,46,0.35)] group">
              {/* Figma Corner Selection Handles */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />

              <span className="bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(255,94,0,0.6)]">
                Indian
              </span>
            </span>
            <span>Hairstyles</span>
          </h1>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/services"
              className="bg-[#e8602e] hover:bg-[#ff7a45] text-white font-extrabold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-[0_0_25px_rgba(232,96,46,0.4)] transition-all flex items-center gap-2"
            >
              <span>All Services & Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/album?type=all"
              className="bg-[#14151c] hover:bg-[#1a1c26] text-zinc-300 hover:text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl border border-white/10 transition-all flex items-center gap-2"
            >
              <Scissors className="w-4 h-4 text-[#e8602e]" />
              <span>360° Lookbook Studio</span>
            </Link>
          </div>
        </section>

        {/* TRENDING HAIRSTYLES GRID (2 ON TOP, 2 BELOW) */}
        <section className="space-y-8 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-3">
            <div>
              <span className="text-xs font-extrabold text-[#e8602e] uppercase tracking-widest block font-mono">
                FEATURED SALON LOOKBOOKS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1">
                Haircut Categories
              </h2>
            </div>
            <span className="text-xs sm:text-sm text-zinc-300 font-mono bg-[#14151c] px-4 py-2 rounded-2xl border border-white/10 self-start sm:self-auto">
              4 Featured Collections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trendingIndianHairstyles.map((card, index) => (
              <LookbookCard
                key={index}
                title={card.title}
                imageSrc={card.imageSrc}
                tags={card.tags}
                linkType={card.linkType}
                subtitle={card.subtitle}
              />
            ))}
          </div>
        </section>

        {/* SHERYIANS BRAND STATS SECTION */}
        <section className="w-full bg-[#14151c] rounded-3xl p-6 sm:p-10 border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="w-10 h-10 bg-[#e8602e]/20 text-[#e8602e] rounded-xl flex items-center justify-center mx-auto mb-2 border border-[#e8602e]/30">
              <Users className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">50,000+</div>
            <div className="text-xs text-zinc-400 font-medium">Clients Groomed</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 bg-[#e8602e]/20 text-[#e8602e] rounded-xl flex items-center justify-center mx-auto mb-2 border border-[#e8602e]/30">
              <Scissors className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100%</div>
            <div className="text-xs text-zinc-400 font-medium">Barber Spec Accuracy</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 bg-[#e8602e]/20 text-[#e8602e] rounded-xl flex items-center justify-center mx-auto mb-2 border border-[#e8602e]/30">
              <Star className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">4.9 / 5.0</div>
            <div className="text-xs text-zinc-400 font-medium">Average Review</div>
          </div>

          <div className="space-y-1">
            <div className="w-10 h-10 bg-[#e8602e]/20 text-[#e8602e] rounded-xl flex items-center justify-center mx-auto mb-2 border border-[#e8602e]/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">15+ Yrs</div>
            <div className="text-xs text-zinc-400 font-medium">Master Barber Exp.</div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b0c10] border-t border-white/10 py-8 px-4 sm:px-8 text-center text-xs text-zinc-500 space-y-3 relative z-10">
        <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-400 font-medium">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>•</span>
          <Link href="/services" className="hover:text-white transition-colors">Services & Pricing</Link>
          <span>•</span>
          <Link href="/album?type=all" className="hover:text-white transition-colors">360° Album</Link>
          <span>•</span>
          <Link href="/contact" className="hover:text-white transition-colors">Contact & Location</Link>
        </div>
        <p className="text-zinc-500 text-[11px] font-mono">
          Visual theme & design aesthetics by{" "}
          <span className="text-[#e8602e] font-bold">
            Created By Gaurav Sapkar Studio
          </span>
          . All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}