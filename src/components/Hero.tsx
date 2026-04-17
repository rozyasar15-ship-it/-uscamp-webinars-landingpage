"use client";

import Image from "next/image";
import { webinarData } from "@/data/webinar-data";
import { heroDefault, type HeroVariant } from "@/data/hero-variants";
import type { Speaker } from "@/data/speakers";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { User, ChevronRight } from "lucide-react";
import Logo from "@/components/ui/Logo";

const Countdown = dynamic(() => import("react-countdown"), { ssr: false });

interface CountdownRendererProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}

function CountdownRenderer({ days, hours, minutes, seconds, completed }: CountdownRendererProps) {
  if (completed) {
    return <p className="text-lg font-semibold text-[#e31e26]">Webinar başladı!</p>;
  }
  const boxes = [
    { value: days, label: "Gün" },
    { value: hours, label: "Saat" },
    { value: minutes, label: "Dakika" },
    { value: seconds, label: "Saniye" },
  ];
  return (
    <div className="flex gap-2 sm:gap-3">
      {boxes.map((box) => (
        <div key={box.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl w-16 h-16 sm:w-18 sm:h-18 flex flex-col items-center justify-center">
          <span className="block text-xl sm:text-2xl font-bold text-white">{String(box.value).padStart(2, "0")}</span>
          <span className="block text-[10px] text-white/70 mt-0.5">{box.label}</span>
        </div>
      ))}
    </div>
  );
}

/**
 * Hero'daki konuşmacı kartı — portreyi gösterir veya görsel yoksa jenerik
 * User ikonu fallback'i. Mobilde slider içinde, desktop'ta sabit grid'de.
 */
function HeroSpeakerCard({
  speaker,
  priority,
  className = "",
}: {
  speaker: Speaker;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative group flex flex-col ${className}`}>
      <div className="text-center mb-4 z-10">
        <h3 className="text-white font-bold text-base sm:text-lg leading-tight">
          {speaker.name}
        </h3>
        <p className="text-[#e31e26] text-sm font-medium mt-1">{speaker.title}</p>
      </div>
      <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 group-hover:border-[#e31e26]/40 transition-all duration-500 aspect-[3/4] bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-sm">
        {speaker.image ? (
          <Image
            src={speaker.image}
            alt={speaker.name}
            fill
            sizes="(max-width: 1024px) 60vw, 220px"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <div className="absolute inset-0 flex items-end justify-center">
            <div className="w-full h-[85%] bg-gradient-to-t from-[#06539f]/40 via-transparent to-transparent flex items-end justify-center pb-0">
              <User className="w-32 h-32 sm:w-40 sm:h-40 text-white/20" strokeWidth={0.8} />
            </div>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 bg-[#e31e26]/0 group-hover:bg-[#e31e26]/5 transition-all duration-500" />
      </div>
      <div className="h-1 bg-gradient-to-r from-[#e31e26] to-[#06539f] rounded-full mt-3 opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}

/**
 * Başlık içindeki `highlight` öbeğini kırmızıya boyar. Tam eşleşen ilk
 * oluşumu sarar; eşleşme yoksa düz metin döner. Türkçe "İ/ı" kaynaklı
 * unicode off-by-one sorunlarını önlemek için case-sensitive arama yapılır —
 * highlight değeri varyant verisinden birebir geldiği için problem yok.
 */
function renderHighlightedHeadline(text: string, highlight: string) {
  const idx = text.indexOf(highlight);
  if (idx === -1) return <span className="text-white">{text}</span>;
  const before = text.slice(0, idx);
  const after = text.slice(idx + highlight.length);
  return (
    <>
      {before && <span className="text-white">{before}</span>}
      <span className="text-[#e31e26]">{highlight}</span>
      {after && <span className="text-white">{after}</span>}
    </>
  );
}

function HeroHeadline({ variant }: { variant: HeroVariant | null }) {
  if (!variant) {
    return (
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
        <span className="text-[#e31e26]">{heroDefault.lineTop}</span>
        <br />
        <span className="text-white">{heroDefault.lineBottom}</span>
      </h1>
    );
  }
  return (
    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-3">
      {renderHighlightedHeadline(variant.headline, variant.highlight)}
    </h1>
  );
}

export default function Hero({ variant }: { variant: HeroVariant | null }) {
  const subtitle = variant?.sub ?? webinarData.subtitle;
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden min-h-screen">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 hidden md:block">
        <source src="/hero-bg-small.mp4" type="video/mp4" />
      </video>
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-60 md:hidden">
        <source src="/hero-bg-fast.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(6,83,159,0.6) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.45) 70%, rgba(227,30,38,0.6) 100%)" }} />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#e31e26]/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#06539f]/15 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        <Logo className="h-7 sm:h-9 w-auto [&_path[fill='#06539F']]:fill-white [&_path[fill='#05549E']]:fill-white/70" />
        <span className="text-white/50 text-sm hidden sm:block">Yurt Dışında Doktorluğun Tek Adresi</span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-20 flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-8 min-h-[calc(100vh-80px)]">
        <motion.div
          className="lg:w-[55%] flex flex-col items-center lg:items-start text-center lg:text-left"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="inline-block bg-[#e31e26]/15 text-white text-sm font-semibold px-5 py-2 rounded-full mb-6 border border-[#e31e26]/40">
            {webinarData.badge}
          </span>

          <HeroHeadline variant={variant} />

          <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl">
            {subtitle}
          </p>

          <div className="w-16 h-1 bg-[#e31e26] mb-6 lg:mx-0 mx-auto" />
          <div className="flex items-center gap-4 mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-5 py-4 max-w-xl">
            <div className="w-12 h-12 rounded-lg bg-[#e31e26] flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-lg">01</span>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-base leading-tight">ABD&apos;de Doktorluk: Gerçekler, Mitler ve Yol Haritası</p>
              <p className="text-gray-400 text-sm mt-1">Dr. Furkan Hamamcı • 9 Mayıs 2026</p>
            </div>
            <ChevronRight className="w-5 h-5 text-[#e31e26] shrink-0" />
          </div>

          <div className="flex items-center gap-6 text-gray-400 mb-8 text-sm sm:text-base">
            <span className="flex items-center gap-2">📅 {webinarData.date}</span>
            <span className="w-px h-5 bg-white/20" />
            <span className="flex items-center gap-2">🕘 {webinarData.time}</span>
          </div>

          <div className="mb-8">
            <Countdown date={new Date(webinarData.targetDate)} renderer={CountdownRenderer} />
          </div>

          <button
            onClick={scrollToForm}
            className="bg-[#e31e26] hover:bg-[#c41920] text-white font-bold px-10 py-4 rounded-full text-lg transition-all cursor-pointer shadow-lg shadow-[#e31e26]/30 hover:shadow-[#e31e26]/50 hover:scale-105 duration-300"
          >
            Hemen Kayıt Ol
          </button>
        </motion.div>

        <motion.div
          className="w-full lg:w-[45%] lg:pt-16"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {/* Mobil: tüm konuşmacılar yatay snap-scroll slider — 1 kart + sonraki %80 peek */}
          <div className="lg:hidden -mx-6 px-6 overflow-x-auto snap-x snap-mandatory flex gap-4 pb-4 scrollbar-hide">
            {webinarData.speakers.map((speaker, index) => (
              <HeroSpeakerCard
                key={speaker.name}
                speaker={speaker}
                priority={index < 2}
                className="snap-start shrink-0 w-[62%]"
              />
            ))}
          </div>

          {/* Desktop: yalnızca Furkan + Sena (ilk 2), sabit yan yana */}
          <div className="hidden lg:flex gap-4 justify-end">
            {webinarData.speakers.slice(0, 2).map((speaker, index) => (
              <HeroSpeakerCard
                key={speaker.name}
                speaker={speaker}
                priority={index === 0}
                className="w-[220px]"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
