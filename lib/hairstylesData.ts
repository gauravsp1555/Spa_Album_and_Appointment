export interface HairstyleAngleSet {
  front: string;
  frontRight: string;
  right: string;
  backRight: string;
  back: string;
  backLeft: string;
  left: string;
  frontLeft: string;
}

export interface BarberSpecs {
  sidesGuard: string;
  topLength: string;
  taperStyle: string;
  lineupType: string;
  hairTexture: string;
  beardBlend?: string;
  stylingProduct: string;
  recommendedFaceShape: string[];
}

export interface Hairstyle {
  id: string;
  name: string;
  category: "men" | "gen z" | "women" | "children" | "seniors";
  subtitle: string;
  description: string;
  popular?: boolean;
  tags: string[];
  specs: BarberSpecs;
  angles: HairstyleAngleSet;
}

export const HAIRSTYLES_DATA: Hairstyle[] = [
  {
    id: "textured-low-fade",
    name: "Textured Crop with Low Skin Fade",
    category: "gen z",
    subtitle: "Modern, low-maintenance urban look with defined fringe texturing",
    description: "Features a drop low skin fade seamlessly blending into a heavy textured crop top with a forward blunt fringe.",
    popular: true,
    tags: ["Fade", "Textured Crop", "Skin Fade", "Modern", "Low Maintenance"],
    specs: {
      sidesGuard: "#0 to #1.5 Low Skin Drop Fade",
      topLength: "2.5 inches (Razor textured & point cut)",
      taperStyle: "Low Drop Taper at nape",
      lineupType: "Natural textured front lineup",
      hairTexture: "Straight to Wavy (Thick)",
      beardBlend: "Clean fade into stubble (#1 blend)",
      stylingProduct: "Matte Clay / Sea Salt Spray",
      recommendedFaceShape: ["Oval", "Square", "Heart"],
    },
    angles: {
      front: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
      frontRight: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",
      backRight: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1618018352910-72bda6c3e9a8?auto=format&fit=crop&w=800&q=80",
      backLeft: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      frontLeft: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "classic-gentleman-taper",
    name: "Classic Side-Part Taper",
    category: "men",
    subtitle: "Timeless executive style with clean taper sides and defined hard part option",
    description: "A refined haircut featuring mid-tapered sides, scissor-cut top, and clean nape line suitable for professional and casual settings.",
    popular: true,
    tags: ["Side Part", "Classic", "Taper", "Professional", "Scissor Cut"],
    specs: {
      sidesGuard: "#2 to #4 Taper (Scissor over comb blend)",
      topLength: "3.5 to 4 inches (Combed diagonally)",
      taperStyle: "Classic Nape & Temple Taper",
      lineupType: "Crisp natural temple lineup",
      hairTexture: "Straight or Fine Wavy",
      beardBlend: "Full beard trimmed to #3 guard with defined cheek line",
      stylingProduct: "Medium Shine Pomade or Styling Cream",
      recommendedFaceShape: ["Oval", "Round", "Diamond"],
    },
    angles: {
      front: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      frontRight: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      backRight: "https://images.unsplash.com/photo-1618018352910-72bda6c3e9a8?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",
      backLeft: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
      frontLeft: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "curly-top-temp-taper",
    name: "Curly High-Top Temp Taper",
    category: "gen z",
    subtitle: "High contrast style celebrating natural curl volume with clean temple edges",
    description: "Elevates natural curls with tight temple and neck tapers, leaving maximum volume and definition on top.",
    popular: true,
    tags: ["Curly", "Temp Taper", "High Top", "Volume", "Natural Curls"],
    specs: {
      sidesGuard: "#0.5 Temple Taper & Nape Taper",
      topLength: "3 inches natural curl volume",
      taperStyle: "Sharp Temp Taper",
      lineupType: "Straight razor lineup across forehead",
      hairTexture: "Curly / Coily (Type 3A - 4C)",
      beardBlend: "Sharp beard line with zero blend",
      stylingProduct: "Curl Defining Cream & Leave-in Conditioner",
      recommendedFaceShape: ["Round", "Oval", "Square"],
    },
    angles: {
      front: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
      frontRight: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1517832606299-7ae9b620a186?auto=format&fit=crop&w=800&q=80",
      backRight: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1523307730650-594bc63f9d67?auto=format&fit=crop&w=800&q=80",
      backLeft: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
      frontLeft: "https://images.unsplash.com/photo-1517832606299-7ae9b620a186?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "modern-layered-bob",
    name: "Modern Layered Lob & Fringe",
    category: "women",
    subtitle: "Chic collarbone-length layered cut with face-framing curtain bangs",
    description: "Versatile medium length haircut with soft internal layering that adds movement, volume, and effortless styling.",
    popular: true,
    tags: ["Layers", "Curtain Bangs", "Bob", "Chic", "Volume"],
    specs: {
      sidesGuard: "Scissor cut internal perimeter layering",
      topLength: "8-10 inches with curtain fringe framing cheekbones",
      taperStyle: "Feathered soft ends",
      lineupType: "Curtain bangs parted down center",
      hairTexture: "Fine to Medium Wavy/Straight",
      stylingProduct: "Volumizing Mousse & Heat Protectant Spray",
      recommendedFaceShape: ["Oval", "Heart", "Square"],
    },
    angles: {
      front: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=800&q=80",
      frontRight: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=800&q=80",
      backRight: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=800&q=80",
      backLeft: "https://images.unsplash.com/photo-1542596594-649edbc13630?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=800&q=80",
      frontLeft: "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "kids-crew-buzz-fade",
    name: "Junior Crew Cut with Mid Fade",
    category: "children",
    subtitle: "Durable, stylish, low-maintenance cut designed for active kids",
    description: "Keeps kids cool and tidy with short sides and an easy-to-style textured top that stays neat all day.",
    popular: true,
    tags: ["Kids", "Crew Cut", "Low Maintenance", "Clean", "Quick Cut"],
    specs: {
      sidesGuard: "#2 to #3 Mid Fade",
      topLength: "1 inch scissor textured top",
      taperStyle: "Clean square neck taper",
      lineupType: "Soft natural hairline",
      hairTexture: "Any Hair Type",
      stylingProduct: "Light Water-based Styling Paste",
      recommendedFaceShape: ["All Face Shapes"],
    },
    angles: {
      front: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
      frontRight: "https://images.unsplash.com/photo-1627054233735-a6e033d59e37?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
      backRight: "https://images.unsplash.com/photo-1519238304262-e64e9a0378b8?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1544281679-4d64f0b6e118?auto=format&fit=crop&w=800&q=80",
      backLeft: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1627054233735-a6e033d59e37?auto=format&fit=crop&w=800&q=80",
      frontLeft: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "distinguished-silver-taper",
    name: "Executive Silver Ivy League Taper",
    category: "seniors",
    subtitle: "Dignified, low-profile taper tailored for silver and gray hair textures",
    description: "Classic scissor-over-comb tapered cut crafted specifically to complement thinning or graying hair with elegance.",
    popular: true,
    tags: ["Seniors", "Ivy League", "Gray Hair", "Classic", "Refined"],
    specs: {
      sidesGuard: "#3 to #4 Tapered smoothly into crown",
      topLength: "1.5 inches parted cleanly",
      taperStyle: "Soft rounded natural neck taper",
      lineupType: "Gentle natural temples",
      hairTexture: "Fine / Silver / Gray Hair",
      beardBlend: "Clean-shaven or trimmed short beard (#2 guard)",
      stylingProduct: "Lightweight Matte Cream",
      recommendedFaceShape: ["Oval", "Square", "Diamond"],
    },
    angles: {
      front: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      frontRight: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1501646549886-f1eb9bb6fbc0?auto=format&fit=crop&w=800&q=80",
      backRight: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1455274111113-575d080ce8cd?auto=format&fit=crop&w=800&q=80",
      backLeft: "https://images.unsplash.com/photo-1566616213894-2d4e1baee5d8?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1501646549886-f1eb9bb6fbc0?auto=format&fit=crop&w=800&q=80",
      frontLeft: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "burst-fade-mullet",
    name: "Modern Burst Fade Mullet",
    category: "gen z",
    subtitle: "High energy edgy cut featuring burst fade around ears and textured crown-to-nape length",
    description: "Blends retro mullet flow with futuristic burst skin fade around the ears and messy textured top.",
    popular: false,
    tags: ["Mullet", "Burst Fade", "Edgy", "Gen Z", "Flow"],
    specs: {
      sidesGuard: "#0 to #1 Burst Skin Fade around ear",
      topLength: "3 inches heavy texturing",
      taperStyle: "Nape length left long (3-4 inches flow)",
      lineupType: "Textured micro fringe line",
      hairTexture: "Wavy or Straight",
      stylingProduct: "Texturizing Powder & Sea Salt Spray",
      recommendedFaceShape: ["Oval", "Heart", "Diamond"],
    },
    angles: {
      front: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
      frontRight: "https://images.unsplash.com/photo-1517832606299-7ae9b620a186?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
      backRight: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1523307730650-594bc63f9d67?auto=format&fit=crop&w=800&q=80",
      backLeft: "https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=800&q=80",
      frontLeft: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&w=800&q=80",
    },
  },
  {
    id: "pompadour-mid-fade",
    name: "Textured Pompadour Mid Skin Fade",
    category: "men",
    subtitle: "High volume slick front with sharp mid skin fade contrast",
    description: "Sleek yet voluminous front quiff combed up and back with immaculate mid skin fade blending down to the skin.",
    popular: false,
    tags: ["Pompadour", "Mid Fade", "Volume", "Sharp", "Fade"],
    specs: {
      sidesGuard: "#0 Skin to #2 Mid Fade",
      topLength: "4 inches blended shorter towards crown",
      taperStyle: "Clean high skin taper",
      lineupType: "Razor sharp C-cup lineup",
      hairTexture: "Thick Straight or Blow-dried Wavy",
      beardBlend: "Seamless beard blend starting from #0 skin at sideburns",
      stylingProduct: "High Hold Low Shine Pomade",
      recommendedFaceShape: ["Round", "Oval", "Square"],
    },
    angles: {
      front: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      frontRight: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=800&q=80",
      backRight: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
      back: "https://images.unsplash.com/photo-1618018352910-72bda6c3e9a8?auto=format&fit=crop&w=800&q=80",
      backLeft: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
      left: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
      frontLeft: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    },
  }
];

export function getHairstyleById(id: string): Hairstyle | undefined {
  return HAIRSTYLES_DATA.find((item) => item.id === id);
}

export function getHairstylesByCategory(category: string): Hairstyle[] {
  const cat = category.toLowerCase().trim();
  if (cat === "all") return HAIRSTYLES_DATA;
  return HAIRSTYLES_DATA.filter((item) => item.category === cat);
}
