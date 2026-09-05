"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Menu, X, Sun, Moon } from "lucide-react";
import BookAppointmentModal from "./BookAppointmentModal";
import TopMarquee from "./TopMarquee";

export default function Header() {
  const pathname = usePathname();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(isLight ? "light" : "dark");
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Lookbook 360", href: "/album?type=all" },
    { name: "PHA Soundtrack", href: "/soundtrack" },
    { name: "Analytics", href: "/analytics" },
    { name: "Contact & Visit", href: "/contact" },
  ];

  return (
    <>
      <div className="w-full sticky top-0 z-40">
        <TopMarquee onBookClick={() => setIsBookModalOpen(true)} />
        <header className="w-full bg-[#0b0c10]/90 backdrop-blur-xl border-b border-white/10 px-6 sm:px-10 lg:px-12 py-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
        <div className="w-full flex items-center justify-between">

          <Link href="/" className="group flex items-center gap-3.5 text-lg sm:text-xl font-extrabold tracking-tight">
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-2xl overflow-hidden bg-[#14151c] border-2 border-[#e8602e]/60 p-0.5 group-hover:border-[#e8602e] transition-all shadow-[0_0_20px_rgba(232,96,46,0.35)] flex-shrink-0 flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/pha-logo.png"
                alt="PHA Salon Logo"
                width={48}
                height={48}
                className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-wider bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(232,96,46,0.5)]">
                  PHA SALON
                </span>
                <span className="bg-[#e8602e] text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-md uppercase tracking-widest">
                  PRO
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium tracking-wide">
                Gaurav Grooming Studio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Items */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2 text-xs sm:text-sm font-semibold">
            {navLinks.map((link) => {
              const baseHref = link.href.split("?")[0];
              const isActive = pathname === baseHref;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3.5 lg:px-4 py-2 rounded-xl transition-all duration-200 ${isActive
                      ? "bg-[#e8602e] text-white font-bold shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                      : "text-zinc-300 hover:text-white hover:bg-zinc-800/80"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <button
              onClick={toggleTheme}
              className="ml-1 mr-1 p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-md border border-white/5 hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>

            <button
              onClick={() => setIsBookModalOpen(true)}
              className="ml-2 bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:from-[#ff7a45] hover:to-[#e8602e] text-white font-bold text-xs px-4 py-2 rounded-xl transition-all duration-200 flex items-center gap-1.5 shadow-[0_0_20px_rgba(232,96,46,0.3)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsBookModalOpen(true)}
              className="bg-[#e8602e] text-white p-2 rounded-xl text-xs font-bold flex items-center gap-1"
              aria-label="Book Appointment"
            >
              <Calendar className="w-4 h-4" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-md border border-white/5"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-400" />
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-300 hover:text-white p-2 rounded-xl bg-zinc-800/60"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 px-2 border-t border-white/10 mt-3 space-y-1.5 animate-fadeIn">
            {navLinks.map((link) => {
              const baseHref = link.href.split("?")[0];
              const isActive = pathname === baseHref;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive
                      ? "bg-[#e8602e] text-white font-bold shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                      : "text-zinc-300 hover:bg-zinc-800"
                    }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </header>
      </div>

      {/* Appointment Modal */}
      <BookAppointmentModal
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </>
  );
}
