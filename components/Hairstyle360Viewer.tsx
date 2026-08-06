"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Hairstyle, HairstyleAngleSet } from "@/lib/hairstylesData";
import { Smartphone, RotateCw, Pause } from "lucide-react";

interface Hairstyle360ViewerProps {
  hairstyle: Hairstyle;
  onOpenBarberTicket?: () => void;
  className?: string;
}

export default function Hairstyle360Viewer({
  hairstyle,
  onOpenBarberTicket,
  className = "",
}: Hairstyle360ViewerProps) {
  const [angle, setAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);

  // Map degree to the 8 angles
  const getAngleInfo = useCallback(
    (deg: number, angles: HairstyleAngleSet): { url: string; label: string } => {
      const norm = ((deg % 360) + 360) % 360;
      if (norm >= 337.5 || norm < 22.5) return { url: angles.front, label: "Front View" };
      if (norm >= 22.5 && norm < 67.5) return { url: angles.frontRight, label: "Front-Right Angle" };
      if (norm >= 67.5 && norm < 112.5) return { url: angles.right, label: "Right Profile" };
      if (norm >= 112.5 && norm < 157.5) return { url: angles.backRight, label: "Back-Right Angle" };
      if (norm >= 157.5 && norm < 202.5) return { url: angles.back, label: "Back View" };
      if (norm >= 202.5 && norm < 247.5) return { url: angles.backLeft, label: "Back-Left Angle" };
      if (norm >= 247.5 && norm < 292.5) return { url: angles.left, label: "Left Profile" };
      return { url: angles.frontLeft, label: "Front-Left Angle" };
    },
    []
  );

  const currentView = getAngleInfo(angle, hairstyle.angles);

  // Auto spin loop
  useEffect(() => {
    if (isAutoSpinning) {
      const interval = setInterval(() => {
        setAngle((prev) => (prev + 4) % 360);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAutoSpinning]);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setIsAutoSpinning(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setIsAutoSpinning(false);
    }
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - startX;
      const newAngle = (angle - deltaX * 0.8) % 360;
      setAngle(newAngle < 0 ? newAngle + 360 : newAngle);
      setStartX(e.clientX);
    },
    [isDragging, startX, angle]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - startX;
      const newAngle = (angle - deltaX * 0.8) % 360;
      setAngle(newAngle < 0 ? newAngle + 360 : newAngle);
      setStartX(e.touches[0].clientX);
    },
    [isDragging, startX, angle]
  );

  const handleDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleDragEnd);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleDragEnd);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleDragEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleDragEnd]);

  return (
    <div className={`bg-[#14151c] rounded-3xl p-5 sm:p-6 border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-4 border-b border-white/10">
        <div>
          <span className="text-[11px] font-extrabold text-[#e8602e] bg-[#e8602e]/10 border border-[#e8602e]/30 px-3 py-1 rounded-full uppercase tracking-wider">
            360° INTERACTIVE LOOKBOOK
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-2 tracking-tight">
            {hairstyle.name}
          </h2>
        </div>

        {onOpenBarberTicket && (
          <button
            onClick={onOpenBarberTicket}
            className="bg-gradient-to-r from-[#e8602e] to-[#ff7a45] hover:opacity-90 text-white font-extrabold px-4 py-2.5 rounded-2xl text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(232,96,46,0.3)] active:scale-95 cursor-pointer flex items-center gap-2"
          >
            <Smartphone className="w-4 h-4" />
            <span>Show Barber</span>
          </button>
        )}
      </div>

      {/* Main Interactive Image Viewport */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className="relative w-full h-80 sm:h-96 rounded-2xl bg-[#0b0c10] border border-white/10 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none group shadow-inner"
      >
        {/* Drag Hint */}
        <div className="absolute bottom-4 bg-[#14151c]/90 border border-white/10 backdrop-blur-md text-zinc-300 text-xs px-3.5 py-1.5 rounded-full z-10 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity font-mono">
          👈 Drag left or right to spin 360° 👉
        </div>

        {/* View Angle Pill */}
        <div className="absolute top-4 right-4 bg-[#e8602e]/20 text-[#e8602e] border border-[#e8602e]/40 text-[11px] font-mono font-bold px-3 py-1 rounded-full z-10">
          {currentView.label}
        </div>

        {/* Image */}
        <img
          src={currentView.url}
          alt={hairstyle.name}
          className="max-h-full max-w-full object-cover rounded-xl shadow-2xl pointer-events-none transition-all brightness-95"
          draggable={false}
        />
      </div>

      {/* Quick Angle Buttons */}
      <div className="mt-5 space-y-3">
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider text-center font-mono">
          ANGLE CONTROLS
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono">
          <button
            onClick={() => { setAngle(0); setIsAutoSpinning(false); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              Math.abs((angle % 360) - 0) < 30 || Math.abs((angle % 360) - 360) < 30
                ? "bg-[#e8602e] text-white shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                : "bg-[#1a1c26] text-zinc-300 hover:bg-[#202330] border border-white/5"
            }`}
          >
            👤 Front
          </button>

          <button
            onClick={() => { setAngle(90); setIsAutoSpinning(false); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              Math.abs((angle % 360) - 90) < 30
                ? "bg-[#e8602e] text-white shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                : "bg-[#1a1c26] text-zinc-300 hover:bg-[#202330] border border-white/5"
            }`}
          >
            👉 Right Side
          </button>

          <button
            onClick={() => { setAngle(180); setIsAutoSpinning(false); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              Math.abs((angle % 360) - 180) < 30
                ? "bg-[#e8602e] text-white shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                : "bg-[#1a1c26] text-zinc-300 hover:bg-[#202330] border border-white/5"
            }`}
          >
            🚶 Back
          </button>

          <button
            onClick={() => { setAngle(270); setIsAutoSpinning(false); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              Math.abs((angle % 360) - 270) < 30
                ? "bg-[#e8602e] text-white shadow-[0_0_15px_rgba(232,96,46,0.4)]"
                : "bg-[#1a1c26] text-zinc-300 hover:bg-[#202330] border border-white/5"
            }`}
          >
            👈 Left Side
          </button>

          <button
            onClick={() => setIsAutoSpinning(!isAutoSpinning)}
            className={`col-span-2 sm:col-span-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              isAutoSpinning
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-[#1a1c26] text-zinc-300 hover:bg-[#202330] border border-white/5"
            }`}
          >
            {isAutoSpinning ? (
              <>
                <Pause className="w-3.5 h-3.5" /> Pause
              </>
            ) : (
              <>
                <RotateCw className="w-3.5 h-3.5" /> Auto Spin
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
