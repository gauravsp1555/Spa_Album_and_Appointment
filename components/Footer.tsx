"use client";

import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  MessageCircle,
  Scissors,
  Radio,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="w-full bg-[#0b0c10] border-t border-white/10 relative z-10 text-zinc-400">
      {/* Top Accent Gradient Border */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#e8602e]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand & Story */}
          <div className="space-y-4">
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl overflow-hidden bg-[#14151c] border border-[#e8602e]/60 p-0.5 shadow-[0_0_15px_rgba(232,96,46,0.3)] flex items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/pha-logo.png"
                  alt="PHA Salon Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-lg tracking-wider bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent">
                    PHA SALON
                  </span>
                  <span className="bg-[#e8602e] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-widest">
                    PRO
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500 font-medium block">
                  Gaurav Grooming Studio
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Modern Indian luxury grooming studio blending 360° digital lookbook consultations, precision barbering, revitalizing spa therapies, and executive hospitality.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#e8602e]">
              <Scissors className="w-3.5 h-3.5" />
              <span>FLAT 20% OFF on all salon treatments</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8602e]" />
              Navigation Menu
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span>Services & Treatments</span>
                </Link>
              </li>
              <li>
                <Link href="/album?type=all" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span>360° Hairstyle Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/soundtrack" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span>PHA Soundtrack Lounge</span>
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span>Business Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all">
                  <span>Contact & Location</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Operations */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Hours & Availability
            </h4>

            <div className="bg-[#14151c] p-4 rounded-2xl border border-white/10 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 text-white font-semibold">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Monday – Sunday</span>
              </div>
              <p className="text-zinc-400 font-mono pl-6">
                9:00 AM – 9:00 PM IST
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-bold">Open 7 Days a Week</span>
                <span className="text-[10px] text-zinc-500 font-mono">Walk-ins Welcome</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Radio className="w-3.5 h-3.5 text-[#e8602e] animate-pulse" />
              <span>Live Salon Audio Playing 24/7</span>
            </div>
          </div>

          {/* Col 4: Concierge & Direct Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold text-white uppercase tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#e8602e]" />
              Concierge Desk
            </h4>

            <div className="space-y-2 text-xs">
              <p className="text-zinc-400">
                Salon Owner: <strong className="text-white">Prakash Sapkar</strong>
              </p>

              <div className="flex flex-col gap-2 pt-1">
                <a
                  href="tel:+919823621827"
                  className="inline-flex items-center gap-2 text-zinc-200 hover:text-white bg-[#14151c] hover:bg-[#1a1c26] border border-white/10 hover:border-[#e8602e]/50 px-3 py-2 rounded-xl transition-all font-mono"
                >
                  <Phone className="w-3.5 h-3.5 text-[#e8602e]" />
                  <span>+91 98236 21827</span>
                </a>

                <a
                  href="https://wa.me/919823621827?text=Hello%20PHA%20Salon,%20I%20would%20like%20to%20inquire%20about%20booking%20an%20appointment"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-300 hover:text-emerald-200 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 rounded-xl transition-all font-semibold"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="mailto:phasalon@gmail.com"
                  className="inline-flex items-center gap-2 text-zinc-300 hover:text-[#e8602e] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-zinc-500" />
                  <span>phasalon@gmail.com</span>
                </a>

                <a
                  href="https://maps.app.goo.gl/ffeu22WRHQZZULxH7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                  <span className="truncate">Main Street, India</span>
                  <ExternalLink className="w-3 h-3 text-[#e8602e]" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-zinc-500 text-center sm:text-left">
            © {new Date().getFullYear()} PHA Salon & Spa. Visual aesthetics & development crafted by{" "}
            <span className="text-[#e8602e] font-semibold">Gaurav Sapkar Studio</span>.
          </p>

          <div className="flex items-center gap-4">
            <span className="text-zinc-600 hidden sm:inline">•</span>
            <span className="text-zinc-500 font-mono text-[11px]">All Rights Reserved</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-[#14151c] hover:bg-[#1a1c26] text-zinc-400 hover:text-white border border-white/10 hover:border-[#e8602e] transition-all cursor-pointer flex items-center gap-1 text-[11px] font-mono"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5 text-[#e8602e]" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
