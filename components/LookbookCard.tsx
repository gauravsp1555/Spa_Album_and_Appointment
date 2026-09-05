import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

interface LookbookCardProps {
  title: string;
  icon?: string;
  imageSrc?: string;
  bgColor?: string;
  subtitle?: string;
  tags?: string[];
  linkType?: string;
}

export default function LookbookCard({
  title,
  icon,
  imageSrc,
  bgColor = "bg-[#14151c]",
  subtitle = "Explore trending hairstyle lookbook & specs",
  tags = ["Fade", "Beard Blend", "Textured"],
  linkType,
}: LookbookCardProps) {
  const categoryType = linkType || title.toLowerCase();

  return (
    <Link
      href={`/album?type=${encodeURIComponent(categoryType)}`}
      className="group relative block rounded-3xl overflow-hidden bg-[#14151c] border border-white/15 hover:border-[#e8602e]/80 shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_0_40px_rgba(232,96,46,0.3)] hover:-translate-y-2 transition-all duration-300 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Category Image Banner - Increased Size */}
        {imageSrc ? (
          <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={`${title} hairstyle`}
              width={600}
              height={400}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 brightness-95 group-hover:brightness-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14151c] via-[#14151c]/50 to-transparent" />
            <div className="absolute top-5 left-5">
              <span className="inline-flex items-center gap-2 bg-[#0b0c10]/95 backdrop-blur-md text-[#e8602e] text-xs sm:text-sm font-black px-4 py-1.5 rounded-full border border-[#e8602e]/50 shadow-lg">
                <Sparkles className="w-4 h-4 text-[#e8602e]" />
                <span>FEATURED CATEGORY</span>
              </span>
            </div>
            <div className="absolute bottom-5 left-6 right-6">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white group-hover:text-[#e8602e] transition-colors drop-shadow-lg tracking-tight leading-tight">
                {title}
              </h3>
            </div>
          </div>
        ) : (
          <div className={`p-8 text-7xl ${bgColor}`}>{icon}</div>
        )}

        <div className="p-6 space-y-4">
          {subtitle && (
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-medium">
              {subtitle}
            </p>
          )}

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 font-mono">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-[#1a1c26] text-zinc-200 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-xl border border-white/10 group-hover:border-[#e8602e]/40 group-hover:text-[#e8602e] transition-colors"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <div className="w-full bg-[#1e202c] group-hover:bg-gradient-to-r group-hover:from-[#e8602e] group-hover:to-[#ff7a45] text-white font-extrabold py-4 px-5 rounded-2xl text-center text-sm sm:text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 border border-white/10 group-hover:border-transparent">
          <span>Explore {title} Lookbook</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}