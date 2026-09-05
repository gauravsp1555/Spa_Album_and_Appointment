"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SALON_PLAYLIST, getSongsByCategory, Track } from "@/lib/musicData";
import {
  Play,
  Pause,
  Radio,
  Sparkles,
  Disc,
  Clock,
  Flame,
  SkipForward,
  SkipBack,
  Users,
} from "lucide-react";

import { FaPlay, FaPause } from "react-icons/fa";

export default function SoundtrackPage() {
  const [activeCategory, setActiveCategory] = useState<"90s" | "gen-z" | "trending" | null>(null);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [liveVisitors, setLiveVisitors] = useState<number>(() => Math.floor(Math.random() * 15) + 12);

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
        const savedIsPlaying = localStorage.getItem("pha_music_is_playing");
        setIsPlaying(savedIsPlaying === "true");
      } catch { }
    };

    checkState();
    const interval = setInterval(checkState, 1000);

    const handlePlayingChanged = (e: Event) => {
      const customEvt = e as CustomEvent<{ isPlaying: boolean }>;
      if (customEvt.detail) {
        setIsPlaying(customEvt.detail.isPlaying);
      }
    };
    window.addEventListener("pha_music_is_playing_changed", handlePlayingChanged);

    return () => {
      clearInterval(interval);
      window.removeEventListener("pha_music_is_playing_changed", handlePlayingChanged);
    };
  }, []);

  // Simulated Live Visitor Count
  useEffect(() => {
    const visitorInterval = setInterval(() => {
      setLiveVisitors((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        let newCount = prev + (Math.random() > 0.8 ? change * 2 : change); // Occasional jump
        if (newCount < 5) newCount = 5 + Math.floor(Math.random() * 3);
        if (newCount > 40) newCount = 40 - Math.floor(Math.random() * 3);
        return newCount;
      });
    }, 3500);

    return () => clearInterval(visitorInterval);
  }, []);

  const activeSongs: Track[] = activeCategory ? getSongsByCategory(activeCategory) : [];

  const handlePlaySong = (track: Track) => {
    setPlayingTrackId(track.id);

    // Dispatch custom event to SalonMusicPlayer
    window.dispatchEvent(
      new CustomEvent("pha_play_track", {
        detail: { trackId: track.id },
      })
    );
  };

  const handleTogglePlay = () => {
    window.dispatchEvent(new CustomEvent("pha_toggle_play"));
  };

  const handleNextTrack = () => {
    window.dispatchEvent(new CustomEvent("pha_next_track"));
  };

  const handlePrevTrack = () => {
    window.dispatchEvent(new CustomEvent("pha_prev_track"));
  };

  const ninetySongsCount = getSongsByCategory("90s").length;
  const genZSongsCount = getSongsByCategory("gen-z").length;
  const trendingSongsCount = getSongsByCategory("trending").length;

  const currentPlayingTrack = SALON_PLAYLIST.find((t) => t.id === playingTrackId) || SALON_PLAYLIST[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-[#f3f4f6] relative overflow-hidden selection:bg-[#e8602e] selection:text-white">

      {/* ========================================================================= */}
      {/* SPECIAL ROUTE-SPECIFIC BACKGROUND IMAGE (APPEARS ONLY ON /soundtrack PAGE) */}
      {/* ========================================================================= */}
      <div
        className={`fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-all duration-700 ${activeCategory ? "opacity-20 scale-105 blur-sm" : "opacity-75 scale-100 blur-0"
          }`}
        style={{ backgroundImage: "url('/images/soundtrack_bg.png')" }}
      />
      {/* Dark Ambient Radial Gradient & Glass Overlay */}
      <div className={`fixed inset-0 z-0 pointer-events-none transition-all duration-700 bg-gradient-to-b ${activeCategory
        ? "from-[#0b0c10]/80 via-[#0b0c10]/95 to-[#0b0c10]"
        : "from-[#0b0c10]/40 via-[#0b0c10]/60 to-[#0b0c10]/90"
        }`} />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#e8602e]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Global Header */}
      <Header />

      {/* Main Soundtrack Container */}
      <main className="flex-1 relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-between">

        {/* Page Hero Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 space-y-4 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14151c]/90 border border-[#e8602e]/40 shadow-[0_0_20px_rgba(232,96,46,0.25)] text-xs font-extrabold uppercase tracking-widest text-amber-400">
              <Radio className="w-4 h-4 text-[#e8602e] animate-pulse" />
              <span>PHA SALON AUDIO SUITE</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold tracking-wide text-zinc-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              <Users className="w-3.5 h-3.5 text-zinc-400" />
              <span>{liveVisitors > 0 ? liveVisitors : "..."} Active Visitors On Site</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight font-cinzel text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
            PHA <span className="bg-gradient-to-r from-[#ff5e00] via-amber-300 to-[#ff9900] bg-clip-text text-transparent">SOUNDTRACK</span>
          </h1>


        </div>

        {/* ========================================================================= */}
        {/* SONG LIST GRID / CONTAINER (Toggled on click) */}
        {/* ========================================================================= */}
        <div className={`transition-all duration-500 ease-in-out my-6 ${activeCategory
          ? "opacity-100 transform translate-y-0 scale-100 max-h-[800px] pointer-events-auto"
          : "opacity-0 transform translate-y-10 scale-95 max-h-0 overflow-hidden pointer-events-none"
          }`}>
          {activeCategory && (
            <div className="bg-[#14151c]/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">

              {/* Header info inside list */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 mb-6 border-b border-white/10 gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                    {activeCategory === "90s" ? (
                      <>
                        <span className="text-[#e8602e]">🎵 90s Classics</span> & Retro Nostalgic Vibes
                      </>
                    ) : activeCategory === "gen-z" ? (
                      <>
                        <span className="text-amber-400">🎵 Gen-Z Urban</span> Hits & Lo-Fi Beats
                      </>
                    ) : (
                      <>
                        <span className="text-red-500">🔥 Trending Hits</span> & Hot Salon Tracks
                      </>
                    )}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    {activeCategory === "90s"
                      ? "Golden era acoustic melodies, vintage Bollywood tunes, and relaxed salon rhythms."
                      : activeCategory === "gen-z"
                        ? "Modern urban cuts, ambient lo-fi beat drops, and trending acoustic sessions."
                        : "The hottest chartbusters, viral reels soundtracks, and highly requested grooming beats."}
                  </p>
                </div>

                {/* Close and Play Category Actions */}
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  {activeSongs.length > 0 && (
                    <button
                      onClick={() => handlePlaySong(activeSongs[0])}
                      className="bg-[#e8602e] hover:bg-[#ff7a45] text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,96,46,0.3)] cursor-pointer hover:scale-105 active:scale-95 flex-shrink-0"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>Play All</span>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
                  >
                    Hide List
                  </button>
                </div>
              </div>

              {/* Songs Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                {activeSongs.map((track, index) => {
                  const isCurrentPlaying = playingTrackId === track.id;

                  return (
                    <div
                      key={track.id}
                      onClick={() => handlePlaySong(track)}
                      className={`group relative p-4 rounded-2xl border transition-all duration-300 flex items-center justify-between gap-4 cursor-pointer overflow-hidden ${isCurrentPlaying
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
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-md ${isCurrentPlaying
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
          )}
        </div>

        {/* ========================================================================= */}
        {/* SEPARATED CATEGORY SELECTOR BUTTONS (Landscape & Small size) */}
        {/* ========================================================================= */}
        <div className="flex flex-row justify-center items-center gap-3 mt-auto py-4 z-20 max-w-full overflow-x-auto">

          {/* Button 1: 90s Songs */}
          <button
            onClick={() => setActiveCategory(activeCategory === "90s" ? null : "90s")}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border whitespace-nowrap ${activeCategory === "90s"
              ? "bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white border-transparent shadow-[0_0_20px_rgba(232,96,46,0.5)] scale-105"
              : "bg-[#14151c]/90 text-zinc-300 border-white/10 hover:border-white/30 hover:bg-white/5 hover:text-white"
              }`}
            aria-label="Toggle 90s Songs"
          >
            <Disc className={`w-4 h-4 ${activeCategory === "90s" ? "animate-spin text-white" : "text-amber-400"}`} />
            <span>🎵 90s Nostalgia</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${activeCategory === "90s" ? "bg-black/30 text-white" : "bg-white/10 text-zinc-400"
              }`}>
              {ninetySongsCount}
            </span>
          </button>

          {/* Button 2: Gen-Z Songs */}
          <button
            onClick={() => setActiveCategory(activeCategory === "gen-z" ? null : "gen-z")}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border whitespace-nowrap ${activeCategory === "gen-z"
              ? "bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white border-transparent shadow-[0_0_20px_rgba(232,96,46,0.5)] scale-105"
              : "bg-[#14151c]/90 text-zinc-300 border-white/10 hover:border-white/30 hover:bg-white/5 hover:text-white"
              }`}
            aria-label="Toggle Gen-Z Songs"
          >
            <Flame className={`w-4 h-4 ${activeCategory === "gen-z" ? "animate-bounce text-white" : "text-[#e8602e]"}`} />
            <span>🎵 Gen-Z Beats</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${activeCategory === "gen-z" ? "bg-black/30 text-white" : "bg-white/10 text-zinc-400"
              }`}>
              {genZSongsCount}
            </span>
          </button>

          {/* Button 3: Trending Songs */}
          <button
            onClick={() => setActiveCategory(activeCategory === "trending" ? null : "trending")}
            className={`px-4 py-2 rounded-xl font-bold text-xs tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer border whitespace-nowrap ${activeCategory === "trending"
              ? "bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white border-transparent shadow-[0_0_20px_rgba(232,96,46,0.5)] scale-105"
              : "bg-[#14151c]/90 text-zinc-300 border-white/10 hover:border-white/30 hover:bg-white/5 hover:text-white"
              }`}
            aria-label="Toggle Trending Songs"
          >
            <Sparkles className={`w-4 h-4 ${activeCategory === "trending" ? "animate-pulse text-white" : "text-amber-400"}`} />
            <span>🔥 Trending Hits</span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-mono font-bold ${activeCategory === "trending" ? "bg-black/30 text-white" : "bg-white/10 text-zinc-400"
              }`}>
              {trendingSongsCount}
            </span>
          </button>

        </div>

        {/* Spotify Playlist Embed Box - Compact Landscape Shape (Placed at bottom below 90s buttons) */}
        {!activeCategory && (
          <div className="max-w-2xl w-full mx-auto py-2 animate-scaleUp z-20 px-4 mb-4">
            <div className="w-full bg-[#14151c]/90 backdrop-blur-2xl border border-white/15 p-3 rounded-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex flex-row items-center justify-between gap-3">

              {/* Spotify Player iframe in landscape mode */}
              <div className="flex-1 min-w-0">
                <iframe
                  data-testid="embed-iframe"
                  style={{ borderRadius: "12px" }}
                  src="https://open.spotify.com/embed/playlist/5zPbU6adiwruSrZDPu1TqS?utm_source=generator&theme=0"
                  width="100%"
                  height="80"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              </div>

              {/* Flexbox container with centered 40px 50% Border-Radius Round Play/Pause Button */}
              {/* Player Controls Container */}
              <div className="flex-shrink-0 flex items-center justify-center gap-2 pl-1 pr-2">
                <button
                  onClick={handlePrevTrack}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Previous track"
                  title="Previous track"
                >
                  <SkipBack className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={handleTogglePlay}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="bg-[#1DB954] hover:bg-[#1ed760] text-black shadow-[0_0_15px_rgba(29,185,84,0.5)] transition-all cursor-pointer hover:scale-105 active:scale-95 border-0"
                  aria-label={isPlaying ? "Pause music" : "Play music"}
                >
                  {isPlaying ? (
                    <FaPause style={{ width: "14px", height: "14px" }} className="text-black" />
                  ) : (
                    <FaPlay style={{ width: "14px", height: "14px", marginLeft: "2px" }} className="text-black" />
                  )}
                </button>

                <button
                  onClick={handleNextTrack}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Next track"
                  title="Next track"
                >
                  <SkipForward className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Currently Playing Track Label */}
            <div className="text-center pt-2">
              <span className="text-[11px] font-mono text-zinc-400">
                Lounge Track: <strong className="text-amber-400">{currentPlayingTrack.title}</strong> — {currentPlayingTrack.artist}
              </span>
            </div>
          </div>
        )}

      </main>

      <Footer />

    </div>
  );
}
