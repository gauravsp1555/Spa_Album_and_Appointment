"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ExternalLink,
  Send,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#f3f4f6] flex flex-col font-sans selection:bg-[#e8602e] selection:text-white relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="glow-bg" />

      <Header />

      <main className="flex-1 w-full px-6 md:px-12 lg:px-16 py-10 sm:py-14 space-y-10 relative z-10">
        {/* Title Header */}
        <div className="text-center space-y-6 w-full">
          <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-black tracking-wider uppercase text-white leading-[1.3] flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <span>Contact</span>
            <span className="relative inline-block border-2 border-[#e8602e] px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-2xl bg-[#e8602e]/10 shadow-[0_0_25px_rgba(232,96,46,0.35)] group">
              {/* Figma Corner Handles */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border-2 border-[#e8602e] rounded-xs" />

              <span className="bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent drop-shadow-[0_4px_25px_rgba(255,94,0,0.6)]">
                PHA Salon Studio
              </span>
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed">
            Visit our studio, call our concierge desk, or dispatch your message directly below.
          </p>
        </div>

        {/* TWO EQUAL COLUMNS LAYOUT FOR DESKTOP (STACKED ON MOBILE) */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: CONTACT FORM (GLASSMORPHISM WITH VERTICAL STACKED FIELDS) */}
          <div className="bg-[#14151c]/70 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-[#e8602e]/50 transition-all space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-2xl font-extrabold text-white flex items-center gap-2.5">
                <Send className="w-6 h-6 text-[#e8602e]" /> Send Us a Direct Message
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Fill this form to contact our concierge for appointment inquiries, wedding packages & feedback.
              </p>
            </div>

            {submitted ? (
              <div className="bg-[#1a1c26]/80 backdrop-blur-md border-2 border-[#e8602e]/50 text-white p-8 rounded-2xl text-center space-y-3 shadow-[0_0_30px_rgba(232,96,46,0.25)]">
                <CheckCircle2 className="w-12 h-12 text-[#e8602e] mx-auto animate-bounce" />
                <h4 className="font-extrabold text-xl">Message Dispatched Successfully!</h4>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Thank you for reaching out to PHA Salon. Our concierge will review your message and reach out shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-[#e8602e] text-white text-xs font-bold px-4 py-2 rounded-xl mt-2 cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                {/* 1. NAME FIELD (STRICTLY VERTICAL STACK) */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Your Name"
                    className="w-full bg-[#1a1c26]/80 backdrop-blur-md border border-white/15 text-white placeholder-zinc-500 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#e8602e] focus:shadow-[0_0_20px_rgba(232,96,46,0.3)] transition-all"
                  />
                </div>

                {/* 2. EMAIL FIELD (STRICTLY VERTICAL STACK) */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="phasalon@gmail.com"
                    className="w-full bg-[#1a1c26]/80 backdrop-blur-md border border-white/15 text-white placeholder-zinc-500 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#e8602e] focus:shadow-[0_0_20px_rgba(232,96,46,0.3)] transition-all"
                  />
                </div>

                {/* 3. PHONE FIELD (STRICTLY VERTICAL STACK) */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g.+91 9823621827"
                    className="w-full bg-[#1a1c26]/80 backdrop-blur-md border border-white/15 text-white placeholder-zinc-500 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#e8602e] focus:shadow-[0_0_20px_rgba(232,96,46,0.3)] transition-all"
                  />
                </div>

                {/* 4. MESSAGE FIELD (STRICTLY VERTICAL STACK) */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-xs font-bold text-zinc-300">Your Message / Service Inquiry *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Ask us about haircut appointments, beard grooming, facial spa or custom packages..."
                    className="w-full bg-[#1a1c26]/80 backdrop-blur-md border border-white/15 text-white placeholder-zinc-500 rounded-xl px-4 py-3.5 text-xs font-semibold focus:outline-none focus:border-[#e8602e] focus:shadow-[0_0_20px_rgba(232,96,46,0.3)] transition-all"
                  />
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#e8602e] text-white font-extrabold py-4 rounded-2xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(232,96,46,0.4)] hover:scale-[1.01] active:scale-[0.99] pt-1"
                >
                  <span>Dispatch Message to PHA Salon</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* RIGHT COLUMN: SALON INFO & MAP */}
          <div className="space-y-8 flex flex-col justify-between h-full">
            {/* SALON INFORMATION CARD (GLASSMORPHISM) */}
            <div className="bg-[#14151c]/70 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-[#e8602e]/50 transition-all space-y-6">
              <div className="border-b border-white/10 pb-3">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <span>Salon Information & Direct Desk</span>
                </h3>
                <p className="text-xs text-zinc-400 mt-1">Official contact channels & master concierge hotline.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                {/* Owner & Phone */}
                <div className="flex items-start gap-3.5 bg-[#1a1c26]/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-[#e8602e]/40 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-[#e8602e]/20 text-[#e8602e] border border-[#e8602e]/40 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-sm">Salon Owner: Prakash Sapkar</strong>
                    <a
                      href="tel:+919823621827"
                      className="text-[#e8602e] font-extrabold text-base hover:underline block mt-0.5 font-mono"
                    >
                      +91 98236 21827
                    </a>
                    <a
                      href="https://wa.me/919823621827?text=Hello%20PHA%20Salon,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-bold mt-1"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 bg-[#1a1c26]/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-[#e8602e]/40 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-[#e8602e]/20 text-[#e8602e] border border-[#e8602e]/40 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-sm">Official Email</strong>
                    <a
                      href="mailto:phasalon@gmail.com"
                      className="text-zinc-300 font-semibold hover:text-[#e8602e] transition-colors block mt-0.5 font-mono"
                    >
                      phasalon@gmail.com
                    </a>
                    <span className="text-[11px] text-zinc-400 font-medium block mt-0.5">Corporate & Salon Inquiries</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 bg-[#1a1c26]/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-sm">Operating Hours</strong>
                    <span className="text-zinc-300 font-semibold block mt-0.5">Monday – Sunday: 9:00 AM – 9:00 PM</span>
                    <span className="text-[11px] text-emerald-400 font-extrabold block mt-0.5 font-mono">Open 7 Days a Week</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-3.5 bg-[#1a1c26]/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 hover:border-sky-500/40 transition-colors">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/40 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-white font-bold text-sm">Studio Location</strong>
                    <span className="text-zinc-300 block mt-0.5 leading-relaxed">
                      PHA Salon & Spa, Main Street, India
                    </span>
                    <a
                      href="https://maps.app.goo.gl/ffeu22WRHQZZULxH7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e8602e] hover:underline mt-1 font-mono"
                    >
                      <span>View Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* RESPONSIVE EMBEDDED GOOGLE MAP CARD (GLASSMORPHISM STYLE) */}
            <div className="bg-[#14151c]/70 backdrop-blur-2xl p-6 sm:p-8 rounded-3xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.6)] hover:border-[#e8602e]/50 transition-all space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#e8602e]" /> Direct Studio Map Location
                </h3>
                <a
                  href="https://maps.app.goo.gl/ffeu22WRHQZZULxH7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-[#e8602e] text-white font-bold text-xs px-3.5 py-2 rounded-xl hover:bg-[#ff7a45] transition-all shadow-[0_0_20px_rgba(232,96,46,0.4)] font-mono hover:scale-105"
                >
                  <span>Open Map App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Responsive Embedded Google Map Placeholder Frame */}
              <div className="w-full flex-1 min-h-[260px] sm:min-h-[300px] rounded-2xl overflow-hidden border-2 border-white/15 relative bg-[#0b0c10]/90 shadow-2xl">
                <iframe
                  title="PHA Salon Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.25!2d73.8567!3d18.5204!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDMxJzEzLjQiTiA3M8KwNTEnMjQuMSJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale invert opacity-90 contrast-125 hover:opacity-100 transition-opacity"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
