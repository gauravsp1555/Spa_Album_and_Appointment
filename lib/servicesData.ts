export interface SubService {
  name: string;
  description: string;
  startingPrice: string;
  duration: string;
  popular?: boolean;
  tags?: string[];
}

export interface ServiceCategory {
  id: string;
  title: string;
  tagline: string;
  iconName: string; // Lucide icon identifier
  emoji: string;
  bannerGradient: string;
  accentBg: string;
  badgeText: string;
  subServices: SubService[];
  quickTags: string[];
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "hair-care",
    title: "Hair Care & Cutting",
    tagline: "Precision cuts, bespoke coloring & restorative treatments for all ages.",
    iconName: "Scissors",
    emoji: "",
    bannerGradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    accentBg: "bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800",
    badgeText: "Most Popular",
    quickTags: [
      "Haircuts & Styling (Men, Women, Kids)",
      "Hair Coloring & Highlights",
    ],
    subServices: [
      {
        name: "Haircuts & Styling (Men, Women, Kids)",
        description: "Customized precision haircutting, blow-dry styling, split-end trimming, and kids' friendly cuts.",
        startingPrice: "₹150",
        duration: "30-50 mins",
        popular: true,
        tags: ["Men's Cut", "Women's Layering", "Kids' Cut", "Blowout"],
      },
      {
        name: "Hair Coloring & Highlights",
        description: "Balayage, ombre, full root touch-up, global color, fashion highlights, and color correction.",
        startingPrice: "₹200",
        duration: "60-120 mins",
        tags: ["Balayage", "Root Touch-up", "Highlights", "Global Color"],
      },
    ],
  },
  {
    id: "skin-facials",
    title: "Skin & Facials",
    tagline: "Rejuvenating dermal care, targeted anti-aging & deep skin hydration.",
    iconName: "Sparkles",
    emoji: "",
    bannerGradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    accentBg: "bg-rose-500/10 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800",
    badgeText: "Glow Specialist",
    quickTags: [
      "Eyebrow & Threading",
      "Fruit & Gold Facials",
    ],
    subServices: [
      {
        name: "Eyebrow & Facial Threading Services",
        description: "Precision eyebrow shaping, upper lip, chin, and full facial threading.",
        startingPrice: "₹100",
        duration: "15-25 mins",
        popular: true,
        tags: ["Brow Shaping", "Facial Threading", "Sensitive Skin"],
      },
      {
        name: "Fruit & Gold Luxury Facials",
        description: "Organic fruit extract boost & 24K gold foil radiance facial for luminous, dewy skin.",
        startingPrice: "₹999",
        duration: "50 mins",
        popular: true,
        tags: ["24K Gold Glow", "Organic Fruit", "Brightening"],
      },
    ],
  },
  {
    id: "mens-grooming",
    title: "Men's Grooming",
    tagline: "Executive beard craftsmanship, luxury hot towel shaves & refreshing detan.",
    iconName: "UserCheck",
    emoji: "",
    bannerGradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    accentBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
    badgeText: "Executive Care",
    quickTags: [
      "Beard Styling & Trimming",
      "Hot Towel Straight-Razor Shave",
    ],
    subServices: [
      {
        name: "Beard Styling & Sculpting Trim",
        description: "Razor sharp lineup, length fading, beard oil conditioning, and hot balm finish.",
        startingPrice: "₹120",
        duration: "30 mins",
        popular: true,
        tags: ["Beard Sculpt", "Lineup", "Hot Oil Balm"],
      },
      {
        name: "Hot Towel Straight-Razor Shave",
        description: "Essential oil pre-shave steam, lather massage, feather-blade shave & cooling aftershave.",
        startingPrice: "₹199",
        duration: "35 mins",
        popular: true,
        tags: ["Straight Razor", "Hot Towel Steam", "Aftershave Balm"],
      },
    ],
  },
  {
    id: "body-spa",
    title: "Body Spa & Massage",
    tagline: "Deep holistic body massage, tension release & skin polishing scrubs.",
    iconName: "HeartHandshake",
    emoji: "",
    bannerGradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    accentBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
    badgeText: "Wellness & Relief",
    quickTags: [
      "Head, Neck & Shoulder Relief",
    ],
    subServices: [
      {
        name: "Head, Neck & Shoulder Express Massage",
        description: "Targeted acupressure therapy to instantly release upper body tension & headache stiffness.",
        startingPrice: "₹299",
        duration: "30 mins",
        popular: true,
        tags: ["Tension Relief", "Acupressure", "Express 30m"],
      },
    ],
  },
];
