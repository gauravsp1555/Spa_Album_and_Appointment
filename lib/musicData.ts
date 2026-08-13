export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  cover?: string;
  audioUrl: string;
  duration?: number; // duration in seconds
  category: "90s" | "gen-z" | "trending";
}

export const SALON_PLAYLIST: Track[] = [
  // ================= 90s SONGS CATEGORY =================
  {
    id: "1",
    title: "Pal Pal Dil Ke Paas (Chill Acoustic)",
    artist: "Nostalgia Strings Ensemble",
    album: "Classic Retro Sessions 1990s",
    cover: "/images/categories/men.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-abstract-intention-12099.mp3",
    duration: 210,
    category: "90s",
  },
  {
    id: "2",
    title: "Pehla Nasha (Vintage Lounge Mix)",
    artist: "Kishore & Retro Salon Beats",
    album: "Bollywood Golden Era",
    cover: "/images/categories/seniors.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    duration: 185,
    category: "90s",
  },
  {
    id: "3",
    title: "Ek Ladki Ko Dekha (Velvet Sunset)",
    artist: "Royal Raga Quartet",
    album: "PHA 1990s Nostalgia",
    cover: "/images/categories/children.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_84976722d3.mp3?filename=ambient-piano-amp-strings-10711.mp3",
    duration: 195,
    category: "90s",
  },
  {
    id: "4",
    title: "Chura Ke Dil Mera (Raga Grooves)",
    artist: "Classic Barber Quartet",
    album: "Vintage Salon Radio",
    cover: "/images/pha-logo.png",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792e7.mp3?filename=smooth-jazz-126233.mp3",
    duration: 165,
    category: "90s",
  },
  {
    id: "5",
    title: "Tujhe Dekha To (Acoustic Retreat)",
    artist: "Heritage Strings & Sitar",
    album: "90s Acoustic Classics",
    cover: "/images/categories/genz.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-notice-14194.mp3",
    duration: 178,
    category: "90s",
  },

  // ================= GEN-Z SONGS CATEGORY =================
  {
    id: "6",
    title: "Apna Bana Le (Lo-Fi Chillout)",
    artist: "Gen-Z Urban Beats",
    album: "Modern Fade & Chill",
    cover: "/images/categories/genz.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
    duration: 160,
    category: "gen-z",
  },
  {
    id: "7",
    title: "Kesariya (Acoustic Salon Mix)",
    artist: "Modern Quiff Vibes",
    album: "PHA Gen-Z Collection",
    cover: "/images/categories/men.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-abstract-intention-12099.mp3",
    duration: 190,
    category: "gen-z",
  },
  {
    id: "8",
    title: "Taambdi Chaambdi (Urban Beat Fusion)",
    artist: "Street Fade Lounge",
    album: "Trendy Urban Cuts",
    cover: "/images/categories/genz.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792e7.mp3?filename=smooth-jazz-126233.mp3",
    duration: 145,
    category: "gen-z",
  },
  {
    id: "9",
    title: "Pasoori (Salon Electro Chill)",
    artist: "Trendsetter Rhythms",
    album: "Gen-Z Grooming Beats",
    cover: "/images/pha-logo.png",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-notice-14194.mp3",
    duration: 205,
    category: "gen-z",
  },
  {
    id: "10",
    title: "Husn (Midnight Acoustic Session)",
    artist: "Velvet Lo-Fi Project",
    album: "Modern Acoustic Nights",
    cover: "/images/categories/seniors.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2021/09/06/audio_84976722d3.mp3?filename=ambient-piano-amp-strings-10711.mp3",
    duration: 172,
  },
  // ================= TRENDING SONGS CATEGORY =================
  {
    id: "11",
    title: "Badass (Urban Trap Fusion)",
    artist: "Trending Beats Studio",
    album: "Gaurav Trending Hits",
    cover: "/images/categories/men.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/10/14/audio_9939f792e7.mp3?filename=smooth-jazz-126233.mp3",
    duration: 155,
    category: "trending",
  },
  {
    id: "12",
    title: "Sajni (Chill Lofi Sitar Mix)",
    artist: "Acoustic Trendsetters",
    album: "Retro Trending Cuts",
    cover: "/images/categories/genz.jpg",
    audioUrl: "https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-abstract-intention-12099.mp3",
    duration: 182,
    category: "trending",
  },
];

export const getSongsByCategory = (category: "90s" | "gen-z" | "trending"): Track[] => {
  return SALON_PLAYLIST.filter((track) => track.category === category);
};
