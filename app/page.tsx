"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LookbookCard from "@/components/LookbookCard";
import BookAppointmentModal from "@/components/BookAppointmentModal";
import {
  Scissors,
  Users,
  Star,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  RotateCw,
  Clock,
  HeartHandshake,
  Calendar,
  FileText,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

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

  const salonPillars = [
    {
      icon: RotateCw,
      title: "360° Studio Lookbooks",
      description: "Inspect hair volume, fade contours, and nape tapers from 8 authentic camera angles before sitting in the chair.",
    },
    {
      icon: Scissors,
      title: "Barber Spec Blueprints",
      description: "Every cut comes with technical guard specs, top section measurements, and lineup guides to show your barber.",
    },
    {
      icon: HeartHandshake,
      title: "Holistic Spa & Grooming",
      description: "Rejuvenating dermal facials, therapeutic head massages, beard sculpting, and premium organic skin therapies.",
    },
    {
      icon: Clock,
      title: "Priority Concierge Service",
      description: "Zero waiting times with guaranteed priority scheduling, open 7 days a week from 9:00 AM to 9:00 PM.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
      <div className="glow-bg" />

      <Header />

      <main className="flex-1 w-full px-6 md:px-12 lg:px-16 py-10 sm:py-16 space-y-16 lg:space-y-20 relative z-10">
        {/* ========================================================================= */}
        {/* HERO SECTION */}
        {/* ========================================================================= */}
        <section className="text-center space-y-8 w-full max-w-5xl mx-auto pt-4 relative">
          {/* Trust Badge Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#14151c]/90 border border-[#e8602e]/40 shadow-[0_0_25px_rgba(232,96,46,0.25)] text-xs font-mono font-extrabold uppercase tracking-widest text-[#e8602e] animate-fadeIn">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
            <span>GAURAV GROOMING STUDIO • EXECUTIVE SALON & SPA</span>
          </div>

          {/* Majestic Hero Headline */}
          <div className="space-y-4">
            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider uppercase text-white leading-[1.25] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <span>Trending</span>
              <span className="relative inline-block border-2 border-[#e8602e] px-4 sm:px-6 py-1 sm:py-1.5 rounded-2xl bg-[#e8602e]/10 shadow-[0_0_30px_rgba(232,96,46,0.35)] group">
                {/* Decorative Precision Corners */}
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

            <p className="max-w-2xl mx-auto text-sm sm:text-base text-zinc-300 leading-relaxed font-medium">
              Explore 360° interactive hairstyle lookbooks, precision barbering blueprints, and bespoke salon therapies crafted by elite Indian stylists.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#e8602e] text-white font-extrabold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-2xl shadow-[0_0_30px_rgba(232,96,46,0.45)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Priority Appointment</span>
            </button>

            <Link
              href="/album?type=all"
              className="bg-[#14151c] hover:bg-[#1a1c26] text-zinc-200 hover:text-white font-bold text-xs sm:text-sm px-6 sm:px-8 py-3.5 rounded-2xl border border-white/10 hover:border-[#e8602e]/50 shadow-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
            >
              <RotateCw className="w-4 h-4 text-[#e8602e]" />
              <span>360° Lookbook Studio</span>
            </Link>

            <Link
              href="/services"
              className="bg-[#14151c]/80 hover:bg-[#1a1c26] text-zinc-300 hover:text-white font-bold text-xs sm:text-sm px-5 py-3.5 rounded-2xl border border-white/5 hover:border-white/20 transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Services & Prices</span>
            </Link>
          </div>

          {/* Quick Perks Strip */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 font-mono">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e8602e]" />
              FLAT 20% OFF ALL SERVICES
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              100% ORGANIC & SAFE PRODUCTS
            </span>
            <span className="hidden sm:inline text-zinc-600">•</span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              OPEN 7 DAYS (9 AM – 9 PM)
            </span>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* TRENDING HAIRSTYLES GRID */}
        {/* ========================================================================= */}
        <section className="space-y-8 w-full max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-5 gap-3">
            <div>
              <span className="text-xs font-extrabold text-[#e8602e] uppercase tracking-widest block font-mono">
                FEATURED SALON LOOKBOOKS
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mt-1">
                Haircut Collections
              </h2>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <Link
                href="/album?type=all"
                className="text-xs sm:text-sm font-bold text-[#e8602e] hover:text-[#ff7a45] transition-colors flex items-center gap-1 font-mono"
              >
                <span>View All In 360°</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-xs sm:text-sm text-zinc-300 font-mono bg-[#14151c] px-4 py-2 rounded-2xl border border-white/10">
                4 Collections
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

        {/* ========================================================================= */}
        {/* WHY PHA SALON PILLARS */}
        {/* ========================================================================= */}
        <section className="w-full max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-extrabold text-[#e8602e] uppercase tracking-widest block font-mono">
              THE PHA STANDARD
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Why Executive Clients Choose PHA
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              Modern engineering meets traditional Indian grooming hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {salonPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#14151c] p-6 rounded-3xl border border-white/10 hover:border-[#e8602e]/60 transition-all duration-300 space-y-3 group shadow-lg hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[#1a1c26] text-[#e8602e] group-hover:bg-[#e8602e] group-hover:text-white transition-all flex items-center justify-center border border-white/10 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-extrabold text-white group-hover:text-[#e8602e] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* BRAND STATS SECTION */}
        {/* ========================================================================= */}
        <section className="w-full max-w-7xl mx-auto bg-[#14151c] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="w-12 h-12 bg-[#e8602e]/20 text-[#e8602e] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-[#e8602e]/30 shadow-xs">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">50,000+</div>
            <div className="text-xs text-zinc-400 font-medium">Clients Groomed</div>
          </div>

          <div className="space-y-1">
            <div className="w-12 h-12 bg-[#e8602e]/20 text-[#e8602e] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-[#e8602e]/30 shadow-xs">
              <Scissors className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">100%</div>
            <div className="text-xs text-zinc-400 font-medium">Barber Spec Accuracy</div>
          </div>

          <div className="space-y-1">
            <div className="w-12 h-12 bg-[#e8602e]/20 text-[#e8602e] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-[#e8602e]/30 shadow-xs">
              <Star className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">4.9 / 5.0</div>
            <div className="text-xs text-zinc-400 font-medium">Average Review</div>
          </div>

          <div className="space-y-1">
            <div className="w-12 h-12 bg-[#e8602e]/20 text-[#e8602e] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-[#e8602e]/30 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">15+ Yrs</div>
            <div className="text-xs text-zinc-400 font-medium">Master Barber Exp.</div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* VIP CALL TO ACTION BANNER */}
        {/* ========================================================================= */}
        <section className="w-full max-w-7xl mx-auto bg-gradient-to-r from-[#14151c] via-[#1a1c26] to-[#14151c] border border-[#e8602e]/40 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(232,96,46,0.2)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left z-10">
            <span className="bg-[#e8602e] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider font-mono">
              SPECIAL 20% DISCOUNT APPLIED
            </span>
            <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Ready For Your Next Signature Look?
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl">
              Lock in your priority appointment today. Choose your cut, inspect specs in 360°, and let our master barbers handle the precision.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto z-10 flex-shrink-0">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:opacity-95 text-white font-black text-xs sm:text-sm px-8 py-4 rounded-2xl shadow-[0_0_30px_rgba(232,96,46,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve My Slot</span>
            </button>
            <Link
              href="/contact"
              className="bg-[#0b0c10] hover:bg-[#14151c] text-zinc-300 hover:text-white font-bold text-xs sm:text-sm px-6 py-4 rounded-2xl border border-white/10 transition-all text-center"
            >
              Studio Directions
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      {/* Appointment Modal */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  );
}