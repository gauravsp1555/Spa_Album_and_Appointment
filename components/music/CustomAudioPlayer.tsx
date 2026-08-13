import React, { useState, useRef } from "react";
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaVolumeUp } from "react-icons/fa";

export default function CustomAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Playback error: ", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    // Main Glassmorphism Container
    <div style={styles.playerContainer}>
      
      {/* Hidden Audio Tag */}
      <audio ref={audioRef} src="/audio/your-song.mp3" />

      {/* 1. Song Image and Title */}
      <div style={styles.songInfo}>
        <img 
          src="https://via.placeholder.com/40" 
          alt="Song Cover" 
          style={styles.coverImage} 
        />
        <div style={styles.textGroup}>
          <h4 style={styles.title}>Lyrical: Tu Meri Zindagi</h4>
          <p style={styles.subtitle}>T-Series Bollywood Classics</p>
        </div>
      </div>

      {/* 2. Player Controls (Prev, Play/Pause, Next) */}
      <div style={styles.controls}>
        <FaStepBackward style={styles.iconElement} />
        
        <button onClick={togglePlayPause} style={styles.playButton}>
          {isPlaying ? (
            <FaPause size={14} color="black" />
          ) : (
            <FaPlay size={14} color="black" style={{ marginLeft: "3px" }} />
          )}
        </button>
        
        <FaStepForward style={styles.iconElement} />
      </div>

      {/* 3. Progress Bar */}
      <div style={styles.progressContainer}>
        <span style={styles.timeText}>1:22</span>
        <input type="range" style={styles.progressBar} defaultValue="30" />
        <span style={styles.timeText}>4:48</span>
      </div>

      {/* 4. Volume Control */}
      <div style={styles.volumeContainer}>
        <FaVolumeUp style={styles.iconElement} />
        <input type="range" style={styles.volumeBar} defaultValue="80" />
      </div>
      
    </div>
  );
}

// --- CSS STYLES ---
const styles: Record<string, React.CSSProperties> = {
  playerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(30, 30, 30, 0.7)", // Dark transparent glass look
    backdropFilter: "blur(10px)",             // Blurs the background behind it
    borderRadius: "50px",                     // Rounded edges like the image
    padding: "10px 25px",
    width: "100%",
    maxWidth: "800px",
    color: "white",
    margin: "0 auto",
    fontFamily: "sans-serif",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
  },
  songInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    width: "250px",
  },
  coverImage: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  textGroup: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    margin: 0,
    fontSize: "14px",
    fontWeight: "bold",
  },
  subtitle: {
    margin: 0,
    fontSize: "12px",
    color: "#b3b3b3",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
  playButton: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "white",
    border: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  iconElement: {
    cursor: "pointer",
    color: "#b3b3b3",
    fontSize: "16px",
  },
  progressContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flex: 1,
    padding: "0 20px",
  },
  timeText: {
    fontSize: "12px",
    color: "#b3b3b3",
  },
  progressBar: {
    width: "100%",
    cursor: "pointer",
    accentColor: "white", // Makes the slider white
  },
  volumeContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  volumeBar: {
    width: "80px",
    cursor: "pointer",
    accentColor: "white",
  },
};
