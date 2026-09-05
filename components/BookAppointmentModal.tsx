"use client";

import React, { useState } from "react";
import { X, Calendar, Clock, User, Phone, CheckCircle2, Sparkles, MessageCircle } from "lucide-react";
import { serviceCategories } from "@/lib/servicesData";

interface BookAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategoryId?: string;
  initialSubServiceName?: string;
}

function createAppointmentRecord(
  name: string,
  phone: string,
  category: string,
  service: string,
  date: string,
  time: string
) {
  return {
    id: `apt-${Date.now()}`,
    name,
    phone,
    category,
    service,
    date,
    time,
    createdAt: new Date().toISOString(),
  };
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
    try {
      const appointmentRecord = createAppointmentRecord(
        name,
        phone,
        activeCategory.title,
        selectedSubService,
        date,
        time
      );
      const existing = JSON.parse(localStorage.getItem("pha_appointments") || "[]");
      existing.unshift(appointmentRecord);
      localStorage.setItem("pha_appointments", JSON.stringify(existing.slice(0, 10)));
    } catch {
      // safe fallback
    }
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  const todayStr = new Date().toISOString().split("T")[0];

  const whatsappConfirmUrl = `https://wa.me/919823621827?text=${encodeURIComponent(
    `Hello PHA Salon Concierge! I just reserved an appointment on the website:\n\n👤 Name: ${name || "Client"}\n📱 Phone: ${phone}\n✂️ Service: ${selectedSubService}\n📅 Date: ${date}\n⏰ Time: ${time}\n\nPlease confirm my priority slot.`
  )}`;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-[#14151c] text-white rounded-3xl shadow-[0_0_50px_rgba(232,96,46,0.3)] max-w-lg w-full overflow-hidden border border-[#e8602e]/40 relative animate-scaleUp max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0b0c10] border-b border-white/10 p-6 relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-zinc-400 hover:text-white bg-zinc-800 hover:bg-zinc-700 p-2 rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold text-[#e8602e] uppercase tracking-widest bg-[#e8602e]/10 px-2.5 py-1 rounded-full border border-[#e8602e]/30 mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5" /> PRIORITY APPOINTMENT PROTOCOL
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Book Grooming Session</h2>
          <p className="text-xs text-zinc-400 mt-1">
            Reserve your executive session with PHA&apos;s master Indian barbers & stylists.
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-[#e8602e]/20 text-[#e8602e] rounded-full flex items-center justify-center mx-auto border border-[#e8602e]/40 shadow-[0_0_25px_rgba(232,96,46,0.35)]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white">Slot Reserved Successfully!</h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="font-bold text-[#e8602e]">{name || "Valued Client"}</span>. We have reserved your priority slot for{" "}
                <span className="font-semibold text-white">{selectedSubService}</span> on{" "}
                <span className="font-semibold text-white">{date || "your selected date"}</span> at{" "}
                <span className="font-semibold text-white">{time}</span>.
              </p>
              
              <div className="bg-[#1a1c26] text-zinc-300 p-4 rounded-2xl text-xs font-mono border border-white/10 text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Service:</span>
                  <span className="text-white font-bold">{selectedSubService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Client Phone:</span>
                  <span className="text-[#e8602e] font-bold">{phone || "Not provided"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Offer Applied:</span>
                  <span className="text-emerald-400 font-bold">FLAT 20% OFF</span>
                </div>
              </div>

              {/* WhatsApp instant dispatch */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={whatsappConfirmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Confirm on WhatsApp</span>
                </a>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-[#1a1c26] hover:bg-[#202330] text-zinc-300 hover:text-white font-bold py-3 rounded-xl transition-all text-xs border border-white/10 cursor-pointer"
                >
                  Done / Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Category Selector (Balanced 2x2 on mobile, 4 in row on tablet) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#e8602e] mb-1.5 font-mono">
                  1. Select Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {serviceCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`text-center p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer truncate ${selectedCategoryId === cat.id
                        ? "border-[#e8602e] bg-[#e8602e] text-white shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                        : "border-white/10 bg-[#1a1c26] text-zinc-300 hover:border-white/20 hover:text-white"
                        }`}
                    >
                      <span className="truncate block">{cat.title.split(" ")[0]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sub Service Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#e8602e] mb-1.5 font-mono">
                  2. Select Treatment / Service
                </label>
                <select
                  value={selectedSubService}
                  onChange={(e) => setSelectedSubService(e.target.value)}
                  className="w-full bg-[#1a1c26] border border-white/10 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e] cursor-pointer"
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
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-[#e8602e]" /> Date
                  </label>
                  <input
                    type="date"
                    required
                    min={todayStr}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#1a1c26] border border-white/10 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1.5 flex items-center gap-1 font-mono">
                    <Clock className="w-3.5 h-3.5 text-[#e8602e]" /> Time Slot
                  </label>
                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full bg-[#1a1c26] border border-white/10 text-white rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e] cursor-pointer"
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
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1 font-mono">
                    <User className="w-3.5 h-3.5 text-[#e8602e]" /> Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#1a1c26] border border-white/10 text-white placeholder-zinc-500 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-400 mb-1 flex items-center gap-1 font-mono">
                    <Phone className="w-3.5 h-3.5 text-[#e8602e]" /> Phone Number (10 digits) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98236 21827"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#1a1c26] border border-white/10 text-white placeholder-zinc-500 rounded-xl p-3 text-xs font-semibold focus:outline-none focus:border-[#e8602e]"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:opacity-95 text-white font-black py-3.5 rounded-2xl transition-all text-sm shadow-[0_0_25px_rgba(232,96,46,0.4)] mt-4 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
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
