"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { SALON_PLAYLIST, getSongsByCategory, Track } from "@/lib/musicData";
import {
  Play,
  Pause,
  Radio,
  Sparkles,
  Disc,
  Clock,
  Headphones,
  Flame,
} from "lucide-react";

export default function SoundtrackPage() {
  const [activeCategory, setActiveCategory] = useState<"90s" | "gen-z">("90s");
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);

  // Sync state with global audio player via window events or localStorage
  useEffect(() => {
    const checkState = () => {
      try {
        const savedIndex = localStorage.getItem("pha_music_track_index");
        if (savedIndex !== null) {
          const idx = parseInt(savedIndex, 10);
          if (!isNaN(idx) && SALON_PLAYLIST[idx]) {
            setPlayingTrackId(SALON_PLAYLIST[idx].id);
          }
        }
      } catch {}
    };

    checkState();
    const interval = setInterval(checkState, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeSongs: Track[] = getSongsByCategory(activeCategory);

  const handlePlaySong = (track: Track) => {
    setPlayingTrackId(track.id);

    // Dispatch custom event to SalonMusicPlayer
    window.dispatchEvent(
      new CustomEvent("pha_play_track", {
        detail: { trackId: track.id },
      })
    );
  };

  const ninetySongsCount = getSongsByCategory("90s").length;
  const genZSongsCount = getSongsByCategory("gen-z").length;

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#f3f4f6] relative overflow-hidden selection:bg-[#e8602e] selection:text-white">
      
      {/* ========================================================================= */}
      {/* SPECIAL ROUTE-SPECIFIC BACKGROUND IMAGE (APPEARS ONLY ON /soundtrack PAGE) */}
      {/* ========================================================================= */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none transition-opacity duration-700"
        style={{ backgroundImage: "url('/images/soundtrack_bg.png')" }}
      />
      {/* Dark Ambient Radial Gradient & Glass Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0b0c10]/70 via-[#0b0c10]/85 to-[#0b0c10] pointer-events-none" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e8602e]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Global Header */}
      <Header />

      {/* Main Soundtrack Container */}
      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-4 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14151c]/90 border border-[#e8602e]/40 shadow-[0_0_20px_rgba(232,96,46,0.25)] text-xs font-extrabold uppercase tracking-widest text-amber-400">
            <Radio className="w-4 h-4 text-[#e8602e] animate-pulse" />
            <span>PHA SALON AUDIO SUITE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-cinzel text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            PHA <span className="bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent">SOUNDTRACK</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-medium max-w-2xl mx-auto leading-relaxed">
            Immerse yourself in our signature salon melodies. Choose between nostalgic classic Indian 90s retro vibes or vibrant modern Gen-Z lo-fi beats while relaxing during your grooming session.
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-semibold text-zinc-400">
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
              <Headphones className="w-3.5 h-3.5 text-[#e8602e]" />
              High Fidelity Studio Audio
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-3 py-1 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Curated by Gaurav Grooming Studio
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CATEGORY SELECTOR TABS (90s Songs vs Gen-Z Songs) */}
        {/* ========================================================================= */}
        <div className="flex justify-center mb-10 animate-fadeIn">
          <div className="bg-[#14151c]/90 backdrop-blur-xl p-1.5 rounded-2xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.5)] inline-flex gap-2 max-w-full overflow-x-auto">
            
            {/* Category 1: 90s Songs */}
            <button
              onClick={() => setActiveCategory("90s")}
              className={`px-5 sm:px-8 py-3 rounded-xl font-black text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                activeCategory === "90s"
                  ? "bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white shadow-[0_0_25px_rgba(232,96,46,0.5)] scale-105"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
              aria-label="Select 90s Songs category"
            >
              <Disc className={`w-4 h-4 ${activeCategory === "90s" ? "animate-spin text-white" : "text-amber-400"}`} />
              <span>🎵 90s Songs</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeCategory === "90s" ? "bg-black/30 text-white" : "bg-white/10 text-zinc-400"
              }`}>
                {ninetySongsCount} Tracks
              </span>
            </button>

            {/* Category 2: Gen-Z Songs */}
            <button
              onClick={() => setActiveCategory("gen-z")}
              className={`px-5 sm:px-8 py-3 rounded-xl font-black text-xs sm:text-sm tracking-wide transition-all duration-300 flex items-center gap-2.5 cursor-pointer whitespace-nowrap ${
                activeCategory === "gen-z"
                  ? "bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white shadow-[0_0_25px_rgba(232,96,46,0.5)] scale-105"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
              aria-label="Select Gen-Z Songs category"
            >
              <Flame className={`w-4 h-4 ${activeCategory === "gen-z" ? "animate-pulse text-white" : "text-[#e8602e]"}`} />
              <span>🎵 Gen-Z Songs</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                activeCategory === "gen-z" ? "bg-black/30 text-white" : "bg-white/10 text-zinc-400"
              }`}>
                {genZSongsCount} Tracks
              </span>
            </button>

          </div>
        </div>

        {/* ========================================================================= */}
        {/* SONG LIST GRID / CONTAINER */}
        {/* ========================================================================= */}
        <div className="bg-[#14151c]/80 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] animate-scaleUp">
          
          {/* Header info inside list */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                {activeCategory === "90s" ? (
                  <>
                    <span className="text-[#e8602e]">🎵 90s Classics</span> & Retro Nostalgic Vibes
                  </>
                ) : (
                  <>
                    <span className="text-amber-400">🎵 Gen-Z Urban</span> Hits & Lo-Fi Beats
                  </>
                )}
              </h2>
              <p className="text-xs text-zinc-400 mt-1">
                {activeCategory === "90s"
                  ? "Golden era acoustic melodies, vintage Bollywood tunes, and relaxed salon rhythms."
                  : "Modern urban cuts, ambient lo-fi beat drops, and trending acoustic sessions."}
              </p>
            </div>

            {/* Play Category Action */}
            {activeSongs.length > 0 && (
              <button
                onClick={() => handlePlaySong(activeSongs[0])}
                className="bg-[#e8602e] hover:bg-[#ff7a45] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,96,46,0.3)] cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Play All ({activeCategory === "90s" ? "90s" : "Gen-Z"})</span>
              </button>
            )}
          </div>

          {/* Songs Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSongs.map((track, index) => {
              const isCurrentPlaying = playingTrackId === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => handlePlaySong(track)}
                  className={`group relative p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer overflow-hidden ${
                    isCurrentPlaying
                      ? "bg-[#1f202b] border-[#e8602e] shadow-[0_0_25px_rgba(232,96,46,0.3)] scale-[1.01]"
                      : "bg-white/5 hover:bg-white/10 border-white/10 hover:border-white/20"
                  }`}
                >
                  {/* Active track left indicator accent */}
                  {isCurrentPlaying && (
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#e8602e]" />
                  )}

                  <div className="flex items-center gap-3.5 min-w-0">
                    
                    {/* Index or Disc icon */}
                    <div className="w-11 h-11 rounded-xl bg-stone-900 border border-white/10 flex-shrink-0 flex items-center justify-center relative overflow-hidden group-hover:border-[#e8602e]/60 transition-colors">
                      {isCurrentPlaying ? (
                        <Disc className="w-5 h-5 text-[#e8602e] animate-spin" />
                      ) : (
                        <span className="text-xs font-mono text-zinc-400 group-hover:text-white font-bold">
                          {index < 9 ? `0${index + 1}` : index + 1}
                        </span>
                      )}
                    </div>

                    {/* Track Title & Artist */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-sm sm:text-base text-white truncate group-hover:text-[#e8602e] transition-colors">
                          {track.title}
                        </h3>
                        {isCurrentPlaying && (
                          <span className="bg-[#e8602e] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                            NOW PLAYING
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 truncate mt-0.5">
                        {track.artist} {track.album && `• ${track.album}`}
                      </p>
                    </div>

                  </div>

                  {/* Right side: Duration & Play Button */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs font-mono text-zinc-400 hidden sm:inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      {Math.floor((track.duration || 180) / 60)}:
                      {((track.duration || 180) % 60 < 10 ? "0" : "") +
                        ((track.duration || 180) % 60)}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlaySong(track);
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${
                        isCurrentPlaying
                          ? "bg-[#e8602e] text-white shadow-[0_0_15px_rgba(232,96,46,0.5)] scale-105"
                          : "bg-white/10 hover:bg-[#e8602e] text-white hover:scale-105"
                      }`}
                      aria-label={`Play ${track.title}`}
                    >
                      {isCurrentPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </main>

      {/* Footer Signature */}
      <footer className="relative z-10 py-6 border-t border-white/10 text-center text-xs text-zinc-500 font-medium">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 PHA Salon & Spa. All rights reserved.</p>
          <div className="flex items-center gap-2 text-zinc-400">
            <Radio className="w-3.5 h-3.5 text-[#e8602e]" />
            <span>Nostalgia Salon Radio & Soundtrack Experience</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
