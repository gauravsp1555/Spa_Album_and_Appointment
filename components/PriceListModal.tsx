"use client";

import React, { useState } from "react";
import { X, Search, FileText, CheckCircle, Sparkles } from "lucide-react";
import { serviceCategories } from "@/lib/servicesData";

interface PriceListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectServiceForBooking?: (catId: string, subName: string) => void;
}

export default function PriceListModal({
  isOpen,
  onClose,
  onSelectServiceForBooking,
}: PriceListModalProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCatId, setSelectedCatId] = useState<string>("all");

  if (!isOpen) return null;

  const filteredCategories = serviceCategories.map((cat) => {
    const matchingSubs = cat.subServices.filter((sub) => {
      const matchSearch =
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchCat = selectedCatId === "all" || selectedCatId === cat.id;
      return matchSearch && matchCat;
    });

    return {
      ...cat,
      subServices: matchingSubs,
    };
  }).filter((cat) => cat.subServices.length > 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#14151c] text-white rounded-3xl shadow-[0_0_50px_rgba(232,96,46,0.25)] max-w-3xl w-full overflow-hidden border border-[#e8602e]/40 relative max-h-[90vh] flex flex-col animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b0c10] border-b border-white/10 p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#e8602e] uppercase tracking-widest bg-[#e8602e]/10 px-2.5 py-1 rounded-full border border-[#e8602e]/30 mb-2">
            <FileText className="w-3.5 h-3.5" /> ITEMIZED GROOMING PRICING
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Gaurav Sapkar Salon Price List</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Explore executive treatments, durations, pricing & specifications.
          </p>

          {/* Search & Filter bar inside header */}
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search haircuts, spa, facials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1a1c26] text-white placeholder-zinc-500 text-xs rounded-xl pl-9 pr-3 py-2.5 focus:outline-none focus:border-[#e8602e] border border-white/10"
              />
            </div>
            <select
              value={selectedCatId}
              onChange={(e) => setSelectedCatId(e.target.value)}
              className="bg-[#1a1c26] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#e8602e] border border-white/10 font-semibold cursor-pointer"
            >
              <option value="all" className="bg-[#14151c]">All Categories</option>
              {serviceCategories.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#14151c]">
                  {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-zinc-500">
              <p className="text-xs font-mono">No services found matching &quot;{searchTerm}&quot;</p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.id} className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-white">{cat.title}</h3>
                  </div>
                  <span className="text-xs text-zinc-400 font-mono">{cat.subServices.length} items</span>
                </div>

                <div className="divide-y divide-white/5">
                  {cat.subServices.map((sub, idx) => (
                    <div
                      key={idx}
                      className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-[#1a1c26] px-2 rounded-xl transition-colors"
                    >
                      <div className="space-y-1 max-w-md">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-white">{sub.name}</span>
                          {sub.popular && (
                            <span className="bg-[#e8602e]/20 text-[#e8602e] text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 border border-[#e8602e]/40">
                              <Sparkles className="w-2.5 h-2.5" /> Popular
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 line-clamp-1">{sub.description}</p>
                        {sub.tags && sub.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-0.5">
                            {sub.tags.map((t, i) => (
                              <span
                                key={i}
                                className="bg-[#0b0c10] text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/5"
                              >
                                #{t}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-white/5">
                        <div className="text-right font-mono">
                          <div className="text-base font-extrabold text-[#e8602e]">{sub.startingPrice}</div>
                          <div className="text-[11px] text-zinc-500">{sub.duration}</div>
                        </div>

                        {onSelectServiceForBooking && (
                          <button
                            onClick={() => {
                              onSelectServiceForBooking(cat.id, sub.name);
                              onClose();
                            }}
                            className="bg-[#e8602e] text-white text-xs font-bold px-3 py-1.5 rounded-xl hover:bg-[#ff7a45] transition-colors cursor-pointer shadow-xs"
                          >
                            Book
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0b0c10] border-t border-white/10 flex justify-between items-center text-xs text-zinc-400 flex-shrink-0">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <CheckCircle className="w-4 h-4 text-[#e8602e]" /> All prices include taxes & consultation.
          </span>
          <button
            onClick={onClose}
            className="bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
}
