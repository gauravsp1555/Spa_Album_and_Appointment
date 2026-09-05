"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Music,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ChevronDown,
  ListMusic,
  Disc,
  Radio,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { SALON_PLAYLIST, Track } from "@/lib/musicData";

export default function SalonMusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // State definitions
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.8);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [loopPlaylist] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const currentTrack: Track = SALON_PLAYLIST[currentIndex] || SALON_PLAYLIST[0];

  // Hydration & SSR safe localStorage restoration
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
    try {
      const savedVolume = localStorage.getItem("pha_music_volume");
      const savedMute = localStorage.getItem("pha_music_muted");
      const savedIndex = localStorage.getItem("pha_music_track_index");

      if (savedVolume !== null) {
        const parsedVol = parseFloat(savedVolume);
        if (!isNaN(parsedVol)) setVolume(parsedVol);
      }
      if (savedMute !== null) {
        setIsMuted(savedMute === "true");
      }
      if (savedIndex !== null) {
        const parsedIdx = parseInt(savedIndex, 10);
        if (!isNaN(parsedIdx) && parsedIdx >= 0 && parsedIdx < SALON_PLAYLIST.length) {
          setCurrentIndex(parsedIdx);
        }
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Sync isPlaying state to localStorage and window
  useEffect(() => {
    try {
      localStorage.setItem("pha_music_is_playing", isPlaying ? "true" : "false");
      window.dispatchEvent(new CustomEvent("pha_music_is_playing_changed", { detail: { isPlaying } }));
    } catch {}
  }, [isPlaying]);

  // Update audio element properties on track/volume/mute change
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  // Play a specific track
  const selectTrack = useCallback((index: number) => {
    setCurrentIndex(index);
    setHasError(false);
    try {
      localStorage.setItem("pha_music_track_index", index.toString());
    } catch {}

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setIsPlaying(false);
        });
      }
    }, 50);
  }, []);

  // Skip to next track
  const handleNextTrack = useCallback(() => {
    setCurrentIndex((prevIdx) => {
      let nextIdx = prevIdx + 1;
      if (nextIdx >= SALON_PLAYLIST.length) {
        if (loopPlaylist) {
          nextIdx = 0;
        } else {
          setIsPlaying(false);
          return prevIdx;
        }
      }
      selectTrack(nextIdx);
      return nextIdx;
    });
  }, [loopPlaylist, selectTrack]);

  // Skip to previous track
  const handlePrevTrack = useCallback(() => {
    setCurrentIndex((prevIdx) => {
      let prevIdxNew = prevIdx - 1;
      if (prevIdxNew < 0) {
        prevIdxNew = SALON_PLAYLIST.length - 1;
      }
      selectTrack(prevIdxNew);
      return prevIdxNew;
    });
  }, [selectTrack]);

  // Toggle Play / Pause
  const togglePlay = useCallback(async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        setHasError(false);
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        console.warn("Autoplay or playback blocked by browser:", err);
        setHasError(true);
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  // Audio Event Listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || currentTrack.duration || 0);
      setHasError(false);
    };

    const handleEnded = () => {
      handleNextTrack();
    };

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    const handleCustomPlayTrack = (e: Event) => {
      const customEvt = e as CustomEvent<{ trackId?: string; index?: number }>;
      if (customEvt.detail) {
        let targetIdx = -1;
        if (customEvt.detail.trackId) {
          targetIdx = SALON_PLAYLIST.findIndex((t) => t.id === customEvt.detail.trackId);
        } else if (typeof customEvt.detail.index === "number") {
          targetIdx = customEvt.detail.index;
        }

        if (targetIdx >= 0 && targetIdx < SALON_PLAYLIST.length) {
          selectTrack(targetIdx);
          setIsExpanded(true);
        }
      }
    };

    const handleCustomTogglePlay = () => {
      togglePlay();
    };

    const handleCustomNextTrack = () => {
      handleNextTrack();
    };

    const handleCustomPrevTrack = () => {
      handlePrevTrack();
    };

    window.addEventListener("pha_play_track", handleCustomPlayTrack);
    window.addEventListener("pha_toggle_play", handleCustomTogglePlay);
    window.addEventListener("pha_next_track", handleCustomNextTrack);
    window.addEventListener("pha_prev_track", handleCustomPrevTrack);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      window.removeEventListener("pha_play_track", handleCustomPlayTrack);
      window.removeEventListener("pha_toggle_play", handleCustomTogglePlay);
      window.removeEventListener("pha_next_track", handleCustomNextTrack);
      window.removeEventListener("pha_prev_track", handleCustomPrevTrack);
    };
  }, [currentIndex, currentTrack.duration, handleNextTrack, handlePrevTrack, selectTrack, togglePlay]);

  // Handle Seeking
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const seekTime = parseFloat(e.target.value);
    setCurrentTime(seekTime);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
    }
  };

  // Handle Volume Change
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
    try {
      localStorage.setItem("pha_music_volume", val.toString());
    } catch {}
  };

  // Toggle Mute
  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    try {
      localStorage.setItem("pha_music_muted", nextMute.toString());
    } catch {}
  };

  // Time formatter helpers (seconds -> mm:ss)
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00";
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="metadata"
      />

      {/* Floating Widget Container */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto selection:bg-none">
        
        {/* EXPANDED PLAYER CARD */}
        {isExpanded && (
          <div className="mb-4 w-[92vw] sm:w-[360px] md:w-[380px] bg-[#14151c]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-5 text-white animate-scaleUp overflow-hidden relative border-t-[#e8602e]/60">
            
            {/* Background Glow Effect */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#e8602e]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header / Title Bar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#e8602e] animate-pulse" />
                <span className="text-[11px] font-black tracking-widest uppercase bg-gradient-to-r from-[#ff5e00] to-amber-300 bg-clip-text text-transparent flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-[#e8602e]" />
                  PHA SALON RADIO
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    showPlaylist
                      ? "bg-[#e8602e] text-white"
                      : "text-zinc-400 hover:text-white hover:bg-white/10"
                  }`}
                  title="Playlist Tracks"
                  aria-label="Toggle playlist"
                >
                  <ListMusic className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                  title="Collapse Player"
                  aria-label="Collapse music player"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* PLAYLIST DRAWER (if toggled) */}
            {showPlaylist ? (
              <div className="py-2 space-y-1.5 max-h-56 overflow-y-auto pr-1">
                <div className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider mb-2 px-1 flex items-center justify-between">
                  <span>Curated Salon Playlist</span>
                  <span>{SALON_PLAYLIST.length} Tracks</span>
                </div>
                {SALON_PLAYLIST.map((track, idx) => {
                  const isSelected = idx === currentIndex;
                  return (
                    <button
                      key={track.id}
                      onClick={() => selectTrack(idx)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between gap-3 text-xs cursor-pointer ${
                        isSelected
                          ? "bg-[#e8602e]/20 border border-[#e8602e]/40 text-white font-bold"
                          : "bg-white/5 hover:bg-white/10 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <span className="text-[10px] font-mono text-zinc-400 w-4 text-center">
                          {isSelected && isPlaying ? (
                            <Disc className="w-3.5 h-3.5 text-[#e8602e] animate-spin" />
                          ) : (
                            `0${idx + 1}`
                          )}
                        </span>
                        <div className="truncate">
                          <p className="truncate font-semibold">{track.title}</p>
                          <p className="text-[10px] text-zinc-400 truncate">{track.artist}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400">
                        {formatTime(track.duration || 180)}
                      </span>
                    </button>
                  );
                })}
              </div>
            ) : (
              /* MAIN PLAYER VIEW */
              <div className="space-y-4 relative z-10">
                
                {/* Track Details & Rotating Vinyl Section */}
                <div className="flex items-center gap-4">
                  
                  {/* ROTATING VINYL RECORD DISC */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex-shrink-0 bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-950 p-1 border border-white/20 shadow-lg group">
                    <div
                      className="w-full h-full rounded-full bg-stone-900 flex items-center justify-center relative overflow-hidden border border-white/10"
                      style={{
                        animation: "vinyl-rotate 10s linear infinite",
                        animationPlayState: isPlaying ? "running" : "paused",
                      }}
                    >
                      {/* Vinyl Grooves Texture */}
                      <div className="absolute inset-0 rounded-full border border-white/5 m-1 pointer-events-none" />
                      <div className="absolute inset-0 rounded-full border border-white/5 m-2.5 pointer-events-none" />
                      <div className="absolute inset-0 rounded-full border border-white/5 m-4 pointer-events-none" />
                      
                      {/* Center Label Art */}
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-[#e8602e] to-amber-500 flex items-center justify-center p-0.5 shadow-md">
                        <Disc className="w-3.5 h-3.5 text-white" />
                      </div>
                    </div>

                    {/* Active Equalizer Overlay when playing */}
                    {isPlaying && (
                      <div className="absolute -bottom-1 -right-1 bg-[#e8602e] text-white p-1 rounded-full shadow-md">
                        <Sparkles className="w-3 h-3 animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Track Meta & Subtle Visualizer */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-extrabold text-sm text-white truncate tracking-tight">
                        {currentTrack.title}
                      </h4>
                    </div>
                    <p className="text-xs text-zinc-400 truncate mb-2">
                      {currentTrack.artist}
                    </p>

                    {/* Subtle Dynamic Audio Equalizer Bars */}
                    <div className="flex items-end gap-1 h-3">
                      <div className={`w-1 rounded-full bg-[#e8602e] ${isPlaying ? "animate-eq-1" : "h-1 bg-zinc-600"}`} />
                      <div className={`w-1 rounded-full bg-amber-400 ${isPlaying ? "animate-eq-2" : "h-1 bg-zinc-600"}`} />
                      <div className={`w-1 rounded-full bg-[#e8602e] ${isPlaying ? "animate-eq-3" : "h-1 bg-zinc-600"}`} />
                      <div className={`w-1 rounded-full bg-amber-400 ${isPlaying ? "animate-eq-4" : "h-1 bg-zinc-600"}`} />
                      <div className={`w-1 rounded-full bg-[#e8602e] ${isPlaying ? "animate-eq-5" : "h-1 bg-zinc-600"}`} />
                      <span className="text-[9px] font-mono text-zinc-400 ml-1.5">
                        {isPlaying ? "PLAYING" : "PAUSED"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Error Banner if audio fails */}
                {hasError && (
                  <div className="bg-red-500/20 border border-red-500/40 rounded-xl p-2 flex items-center gap-2 text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Track stream unavailable. Skipping...</span>
                  </div>
                )}

                {/* TIMELINE SEEK BAR & TIME COUNTER */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    step={0.1}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-[#e8602e]"
                    aria-label="Track progress slider"
                  />
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* CONTROLS & VOLUME SECTION */}
                <div className="flex items-center justify-between pt-1">
                  
                  {/* Playback Control Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevTrack}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95"
                      aria-label="Previous song"
                      title="Previous Track"
                    >
                      <SkipBack className="w-4 h-4" />
                    </button>

                    <button
                      onClick={togglePlay}
                      className="p-3 rounded-full bg-gradient-to-r from-[#e8602e] to-[#ff7a45] text-white hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(232,96,46,0.5)] transition-all cursor-pointer flex items-center justify-center"
                      aria-label={isPlaying ? "Pause music" : "Play music"}
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      onClick={handleNextTrack}
                      className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-zinc-300 hover:text-white transition-all cursor-pointer active:scale-95"
                      aria-label="Next song"
                      title="Next Track"
                    >
                      <SkipForward className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Volume Control Slider */}
                  <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5">
                    <button
                      onClick={toggleMute}
                      className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      aria-label={isMuted ? "Unmute music" : "Mute music"}
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-3.5 h-3.5 text-red-400" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-zinc-300" />
                      )}
                    </button>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-16 h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-[#e8602e]"
                      aria-label="Volume slider"
                    />
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

        {/* COLLAPSED FLOATING CIRCULAR BUTTON */}
        {!isExpanded && (
          <div className="relative group">
            
            {/* Subtle Pulsing Outer Glow Ring when Playing */}
            {isPlaying && (
              <div className="absolute -inset-2 rounded-full bg-[#e8602e]/30 blur-md animate-pulse pointer-events-none" />
            )}

            <button
              onClick={() => setIsExpanded(true)}
              className={`relative flex items-center justify-center p-3.5 rounded-full backdrop-blur-2xl transition-all duration-300 cursor-pointer shadow-[0_8px_30px_rgba(0,0,0,0.5)] border ${
                isPlaying
                  ? "bg-[#14151c]/90 border-[#e8602e] text-white scale-105 shadow-[0_0_25px_rgba(232,96,46,0.4)]"
                  : "bg-[#14151c]/85 hover:bg-[#14151c] border-white/20 text-zinc-200 hover:text-white hover:border-[#e8602e]/60"
              }`}
              aria-label="Salon Music Player"
            >
              {/* Icon Animation */}
              {isPlaying ? (
                <div className="relative flex items-center justify-center">
                  <Disc className="w-6 h-6 text-[#e8602e] animate-spin" />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                  </span>
                </div>
              ) : (
                <Music className="w-6 h-6 text-zinc-300 group-hover:text-[#e8602e] transition-colors" />
              )}
            </button>

            {/* Hover Tooltip */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 rounded-xl bg-[#14151c]/90 backdrop-blur-md border border-white/10 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-xl flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-[#e8602e]" />
              <span>Salon Music</span>
              {isPlaying && (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-1" />
              )}
            </div>
          </div>
        )}

      </div>
    </>
  );
}
