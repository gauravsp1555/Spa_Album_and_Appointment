"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import { serviceCategories } from "@/lib/servicesData";
import BookAppointmentModal from "@/components/BookAppointmentModal";
import PriceListModal from "@/components/PriceListModal";
import {
  Scissors,
  Sparkles,
  UserCheck,
  Hand,
  HeartHandshake,
  Crown,
  Search,
  Grid,
  List,
  Calendar,
  FileText,
  ArrowRight,
} from "lucide-react";


export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Booking Modal State
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [bookingCatId, setBookingCatId] = useState<string | undefined>(undefined);
  const [bookingSubName, setBookingSubName] = useState<string | undefined>(undefined);

  // Price List Modal State
  const [isPriceListOpen, setIsPriceListOpen] = useState(false);

  const handleOpenBooking = (catId?: string, subName?: string) => {
    setBookingCatId(catId);
    setBookingSubName(subName);
    setIsBookModalOpen(true);
  };

  // Icon Resolver
  const renderCategoryIcon = (iconName: string, className: string = "w-6 h-6") => {
    switch (iconName) {
      case "Scissors":
        return <Scissors className={className} />;
      case "Sparkles":
        return <Sparkles className={className} />;
      case "UserCheck":
        return <UserCheck className={className} />;
      case "Hand":
        return <Hand className={className} />;
      case "HeartHandshake":
        return <HeartHandshake className={className} />;
      case "Crown":
        return <Crown className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  // Filter main categories based on search & active filter category pill
  const filteredCategories = useMemo(() => {
    return serviceCategories.filter((category) => {
      const matchesCategoryPill =
        selectedCategory === "all" || selectedCategory === category.id;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        category.title.toLowerCase().includes(query) ||
        category.tagline.toLowerCase().includes(query) ||
        category.quickTags.some((t) => t.toLowerCase().includes(query));

      return matchesCategoryPill && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="glow-bg" />

      <Header />

      <main className="flex-1 w-full px-6 md:px-12 lg:px-16 py-10 space-y-10 relative z-10">
        {/* HERO HEADER SECTION */}
        <section className="relative bg-[#14151c] text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.6)] border border-[#e8602e]/40">
          <div className="relative z-10 w-full space-y-6">
            <div className="inline-flex items-center gap-2.5 bg-[#1a1c26] text-[#e8602e] text-xs sm:text-sm font-black px-5 py-2 rounded-full border border-[#e8602e]/40 shadow-[0_0_25px_rgba(232,96,46,0.3)]">
              <Sparkles className="w-4 h-4 text-[#e8602e]" />
              <span>EXECUTIVES & BARBER MENU</span>
            </div>

            <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider uppercase text-white leading-[1.3] flex flex-wrap items-center gap-3 sm:gap-4">
              <span>Salon Services &</span>
              <span className="relative inline-block border-2 border-[#e8602e] px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-2xl bg-[#e8602e]/10 shadow-[0_0_25px_rgba(232,96,46,0.35)] group">
                {/* Figma Corner Handles */}
                <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
                <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
                <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />

                <span className="bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(255,94,0,0.6)]">
                  Treatment Menu
                </span>
              </span>
            </h1>
            <p className="text-xs sm:text-base text-zinc-400 leading-relaxed font-medium">
              Explore precision haircuts, facials, skin care, body spa & grooming protocols crafted by master Indian stylists.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleOpenBooking()}
                className="bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white font-extrabold px-6 py-3.5 rounded-2xl hover:opacity-90 transition-all text-xs sm:text-sm shadow-[0_0_25px_rgba(232,96,46,0.4)] flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-white" />
                Book Priority Appointment
              </button>
              <button
                onClick={() => setIsPriceListOpen(true)}
                className="bg-[#1a1c26] hover:bg-[#202330] text-zinc-300 hover:text-white font-bold px-6 py-3.5 rounded-2xl transition-all text-xs sm:text-sm border border-white/10 flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#e8602e]" />
                Itemized Price List
              </button>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center sm:text-left font-mono">
            <div>
              <div className="text-2xl font-extrabold text-[#e8602e]">4</div>
              <div className="text-xs text-zinc-400 font-medium">Main Categories</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-amber-400">7</div>
              <div className="text-xs text-zinc-400 font-medium">Bespoke Treatments</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-emerald-400">100%</div>
              <div className="text-xs text-zinc-400 font-medium">Organic & Safe</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-sky-400">4.9 ★</div>
              <div className="text-xs text-zinc-400 font-medium">Client Satisfaction</div>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTER CONTROLS */}
        <section className="bg-[#14151c] rounded-2xl p-4 sm:p-6 border border-white/10 shadow-md space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search haircuts, spa, facials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1a1c26] border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-[#e8602e] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Layout View Toggle */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">VIEW MODE:</span>
              <div className="bg-[#1a1c26] p-1 rounded-xl flex items-center gap-1 border border-white/10">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === "grid"
                      ? "bg-[#e8602e] text-white shadow-xs"
                      : "text-zinc-400 hover:text-white"
                    }`}
                >
                  <Grid className="w-3.5 h-3.5" /> Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${viewMode === "list"
                      ? "bg-[#e8602e] text-white shadow-xs"
                      : "text-zinc-400 hover:text-white"
                    }`}
                >
                  <List className="w-3.5 h-3.5" /> List
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 pt-1 font-mono scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer ${selectedCategory === "all"
                  ? "bg-[#e8602e] text-white shadow-[0_0_20px_rgba(232,96,46,0.4)]"
                  : "bg-[#1a1c26] text-zinc-300 hover:bg-[#202330] border border-white/10"
                }`}
            >
              All Categories ({serviceCategories.length})
            </button>
            {serviceCategories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${isActive
                      ? "bg-[#e8602e] text-white font-black shadow-[0_0_20px_rgba(232,96,46,0.4)]"
                      : "bg-[#1a1c26] text-zinc-300 hover:bg-[#202330] border border-white/10"
                    }`}
                >
                  <span>{cat.title}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* MAIN SERVICE CATEGORIES CARDS */}
        {filteredCategories.length === 0 ? (
          <div className="bg-[#14151c] rounded-3xl p-12 text-center border border-white/10 space-y-3">
            <div className="w-12 h-12 bg-zinc-800 rounded-full flex items-center justify-center mx-auto text-zinc-400">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No Services Found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              We couldn&apos;t find any service matching &quot;{searchQuery}&quot;. Try another keyword.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="bg-[#e8602e] text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#ff7a45] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 gap-8"
                : "space-y-8"
            }
          >
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="bg-[#14151c] rounded-3xl border border-white/15 hover:border-[#e8602e]/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(232,96,46,0.25)] transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-2 relative"
              >
                {/* Main Content & Details */}
                <div className="p-8 space-y-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-[#1a1c26] border border-white/10 flex items-center justify-center text-[#e8602e] group-hover:scale-110 transition-transform duration-300 shadow-md">
                        {renderCategoryIcon(category.iconName, "w-7 h-7 text-[#e8602e]")}
                      </div>
                      <span className="bg-[#e8602e]/15 text-[#e8602e] border border-[#e8602e]/40 text-xs sm:text-sm font-black uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 font-mono shadow-sm">
                        <Sparkles className="w-4 h-4 text-[#e8602e]" />
                        {category.badgeText}
                      </span>
                    </div>

                    <div>
                      <h2 className="text-3xl sm:text-4xl font-black text-white flex items-center gap-3 tracking-tight">
                        <span>{category.title}</span>
                      </h2>
                      <p className="text-sm sm:text-base text-zinc-300 mt-2 leading-relaxed font-medium">
                        {category.tagline}
                      </p>
                    </div>
                  </div>

                  {/* Sub-Services List with Live Prices */}
                  <div className="space-y-3 pt-5 border-t border-white/10 mt-5 font-mono">
                    <span className="text-xs font-black uppercase tracking-widest text-[#e8602e] block mb-2">
                      Treatments & Starting Prices
                    </span>
                    {category.subServices.map((sub, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleOpenBooking(category.id, sub.name)}
                        className="bg-[#1a1c26] hover:bg-[#202330] p-3 rounded-2xl border border-white/5 hover:border-[#e8602e]/40 transition-all duration-200 cursor-pointer flex items-center justify-between gap-2 group/item"
                      >
                        <div className="space-y-0.5 max-w-[65%]">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs text-zinc-200 group-hover/item:text-[#e8602e] transition-colors line-clamp-1">
                              {sub.name}
                            </span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-medium block">
                            {sub.duration}
                          </span>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="bg-[#0b0c10] group-hover/item:bg-[#e8602e] text-[#e8602e] group-hover/item:text-white font-extrabold text-xs px-2.5 py-1 rounded-xl transition-colors duration-200 border border-white/5 inline-block">
                            {sub.startingPrice}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-5 bg-[#0b0c10] border-t border-white/10 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setIsPriceListOpen(true)}
                    className="text-xs font-bold text-zinc-400 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
                  >
                    <FileText className="w-4 h-4 text-[#e8602e]" />
                    Full Price List
                  </button>

                  <button
                    onClick={() => handleOpenBooking(category.id)}
                    className="bg-[#e8602e] text-white font-extrabold text-xs px-4 py-2.5 rounded-xl hover:bg-[#ff7a45] transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(232,96,46,0.3)] group/btn cursor-pointer"
                  >
                    <span>Book Category</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* APPOINTMENT BOOKING MODAL */}
      <BookAppointmentModal
        key={`${bookingCatId || ""}-${bookingSubName || ""}-${isBookModalOpen}`}
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        initialCategoryId={bookingCatId}
        initialSubServiceName={bookingSubName}
      />

      {/* PRICE LIST MODAL */}
      <PriceListModal
        isOpen={isPriceListOpen}
        onClose={() => setIsPriceListOpen(false)}
        onSelectServiceForBooking={(catId, subName) => handleOpenBooking(catId, subName)}
      />
    </div>
  );
}
