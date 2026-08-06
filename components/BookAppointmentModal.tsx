"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, CheckCircle2, Sparkles } from "lucide-react";
import { serviceCategories } from "@/lib/servicesData";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategoryId?: string;
  initialSubServiceName?: string;
}

export default function BookAppointmentModal({
  isOpen,
  onClose,
  initialCategoryId,
  initialSubServiceName,
}: BookAppointmentModalProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(
    initialCategoryId || serviceCategories[0].id
  );
  const [selectedSubService, setSelectedSubService] = useState<string>(() => {
    if (initialSubServiceName) return initialSubServiceName;
    const cat = serviceCategories.find((c) => c.id === (initialCategoryId || serviceCategories[0].id));
    return cat && cat.subServices.length > 0 ? cat.subServices[0].name : "";
  });
  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00 AM");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const activeCategory = serviceCategories.find((c) => c.id === selectedCategoryId) || serviceCategories[0];

  const handleCategoryChange = (catId: string) => {
    setSelectedCategoryId(catId);
    const cat = serviceCategories.find((c) => c.id === catId);
    if (cat && cat.subServices.length > 0) {
      setSelectedSubService(cat.subServices[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#14151c] text-white rounded-3xl shadow-[0_0_50px_rgba(232,96,46,0.2)] max-w-lg w-full overflow-hidden border border-[#e8602e]/40 relative animate-scaleUp max-h-[90vh] flex flex-col"
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
            <Sparkles className="w-3.5 h-3.5" /> PRIORITY APPOINTMENT PROTOCOL
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Book Grooming Session</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Reserve your session with PHA&apos;s elite Indian barbers & stylists.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-[#e8602e]/20 text-[#e8602e] rounded-full flex items-center justify-center mx-auto border border-[#e8602e]/40 shadow-[0_0_20px_rgba(232,96,46,0.3)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Slot Reserved Successfully!</h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xs mx-auto">
                Thank you, <span className="font-bold text-[#e8602e]">{name || "Valued Client"}</span>. We have reserved your grooming slot for{" "}
                <span className="font-semibold text-white">{selectedSubService}</span> on{" "}
                <span className="font-semibold text-white">{date || "your selected date"}</span> at{" "}
                <span className="font-semibold text-white">{time}</span>.
              </p>
              <div className="bg-[#1a1c26] text-zinc-300 p-3.5 rounded-2xl text-xs font-mono border border-white/10">
                Our concierges will reach out at {phone || "your phone number"} for instant dispatch confirmation.
              </div>
              <button
                onClick={handleReset}
                className="w-full bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white font-extrabold py-3.5 rounded-2xl transition-all text-sm shadow-[0_0_20px_rgba(232,96,46,0.4)] mt-4 cursor-pointer"
              >
                Done / Return to App
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#e8602e] mb-1.5">
                  1. Select Category
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {serviceCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${selectedCategoryId === cat.id
                        ? "border-[#e8602e] bg-[#e8602e] text-white shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                        : "border-white/10 bg-[#1a1c26] text-zinc-300 hover:border-white/20"
                        }`}
                    >
                      <span className="truncate">{cat.title.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub Service Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#e8602e] mb-1.5">
                  2. Select Treatment / Service
                </label>
                <select
                  value={selectedSubService}
                  onChange={(e) => setSelectedSubService(e.target.value)}
                  className="w-full bg-[#1a1c26] border border-white/10 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e]"
                  required
                >
                  {activeCategory.subServices.map((sub) => (
                    <option key={sub.name} value={sub.name} className="bg-[#14151c] text-white">
                      {sub.name} ({sub.startingPrice} • {sub.duration})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#e8602e]" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1a1c26] border border-white/10 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#e8602e]" /> Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#1a1c26] border border-white/10 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e]"
                  >
                    <option value="10:00 AM" className="bg-[#14151c]">10:00 AM</option>
                    <option value="11:30 AM" className="bg-[#14151c]">11:30 AM</option>
                    <option value="01:00 PM" className="bg-[#14151c]">01:00 PM</option>
                    <option value="03:00 PM" className="bg-[#14151c]">03:00 PM</option>
                    <option value="04:30 PM" className="bg-[#14151c]">04:30 PM</option>
                    <option value="06:00 PM" className="bg-[#14151c]">06:00 PM</option>
                    <option value="07:30 PM" className="bg-[#14151c]">07:30 PM</option>
                  </select>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#e8602e]" /> Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1a1c26] border border-white/10 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#e8602e]" /> Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98236 21827"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1a1c26] border border-white/10 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white font-extrabold py-3.5 rounded-2xl hover:opacity-95 transition-opacity text-sm shadow-[0_0_25px_rgba(232,96,46,0.4)] mt-4 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Confirm Appointment</span>
                <Sparkles className="w-4 h-4 text-amber-200" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
