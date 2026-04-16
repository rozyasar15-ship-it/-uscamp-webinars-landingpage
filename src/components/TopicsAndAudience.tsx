"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronRight } from "lucide-react";
import { speakers, type SpeakerId } from "@/data/speakers";
import SpeakerAvatar from "@/components/ui/SpeakerAvatar";

type WebinarEntry = {
  number: string;
  title: string;
  date: string;
  day: string;
  speakerIds: SpeakerId[];
  /** Konuşmacı başına title override — verilmezse speakers.ts'deki varsayılan kullanılır. */
  speakerTitleOverrides?: Partial<Record<SpeakerId, string>>;
  /** Çok kişili (>2) webinarlarda kart üstünde tek satırlık özet başlık. */
  groupLabel?: string;
  topics: string[];
};

const webinarSeries: WebinarEntry[] = [
  {
    number: "01",
    title: "ABD'de Doktorluk: Gerçekler, Mitler ve Yol Haritası",
    date: "9 Mayıs 2026",
    day: "Cumartesi",
    speakerIds: ["furkan"],
    speakerTitleOverrides: { furkan: "USCAMP Kurucu" },
    topics: [
      "ABD'de doktorluk süreci hakkında yaygın mitler ve gerçekler",
      "USMLE, ECFMG ve MATCH sürecinin genel yol haritası",
      "Türk hekimler için en uygun stratejiler",
    ],
  },
  {
    number: "02",
    title: "Klinik Deneyim (USCE) ve Güçlü CV Oluşturma",
    date: "16 Mayıs 2026",
    day: "Cumartesi",
    speakerIds: ["furkan", "sena"],
    speakerTitleOverrides: { furkan: "USCAMP Kurucu & USCAMP Mentor" },
    topics: [
      "Observership ve hands-on staj farkları",
      "ABD'de staj başvuru süreci ve zamanlama",
      "MATCH için güçlü bir CV nasıl oluşturulur",
    ],
  },
  {
    number: "03",
    title: "USMLE Çalışma Stratejileri",
    date: "23 Mayıs 2026",
    day: "Cumartesi",
    speakerIds: ["melih"],
    topics: [
      "Step 1 ve Step 2 CK için verimli çalışma planı",
      "Kaynak seçimi ve soru bankası stratejileri",
      "Sık yapılan hatalar ve çözüm önerileri",
    ],
  },
  {
    number: "04",
    title: "Başarı Hikayeleri & Soru-Cevap",
    date: "2 Haziran 2026",
    day: "Salı",
    speakerIds: ["alperen", "miray", "kutay", "ebubekir"],
    groupLabel: "USCAMP Mentorları",
    topics: [
      "ABD'de MATCH'e kabul olan doktorların hikayeleri",
      "Süreçte karşılaşılan zorluklar ve çözümleri",
      "Katılımcılardan gelen sorulara canlı yanıtlar",
    ],
  },
];

/**
 * Seçili webinarın konuşmacı bloğu: 1 kişi tek avatar, 2 kişi yan yana,
 * 3+ kişi (webinar 06) stacked overlapping avatar grubu + grup başlığı.
 */
function SpeakerBlock({ entry }: { entry: WebinarEntry }) {
  const people = entry.speakerIds.map((id) => ({
    ...speakers[id],
    title: entry.speakerTitleOverrides?.[id] ?? speakers[id].title,
  }));

  if (people.length === 1) {
    const p = people[0];
    return (
      <div className="flex items-center gap-4 mb-6">
        <SpeakerAvatar speaker={p} size="md" />
        <div>
          <h4 className="text-lg font-bold text-gray-900">{p.name}</h4>
          <p className="text-sm text-[#e31e26]">{p.title}</p>
        </div>
      </div>
    );
  }

  if (people.length === 2) {
    return (
      <div className="flex items-center gap-4 mb-6">
        <div className="flex -space-x-3">
          {people.map((p) => (
            <div key={p.name} className="ring-2 ring-white rounded-full">
              <SpeakerAvatar speaker={p} size="md" />
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-900 leading-tight">
            {people.map((p) => p.name).join(" & ")}
          </h4>
          <p className="text-sm text-[#e31e26]">{people[0].title}</p>
        </div>
      </div>
    );
  }

  // 3+ kişi — stacked avatar grubu
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="flex -space-x-3">
        {people.map((p) => (
          <div key={p.name} className="ring-2 ring-white rounded-full">
            <SpeakerAvatar speaker={p} size="sm" />
          </div>
        ))}
      </div>
      <div>
        <h4 className="text-lg font-bold text-gray-900 leading-tight">
          {entry.groupLabel ?? "USCAMP Mentorları"}
        </h4>
        <p className="text-xs text-gray-500 mt-0.5 leading-snug">
          {people.map((p) => p.name.split(",")[0]).join(", ")}
        </p>
      </div>
    </div>
  );
}

/**
 * Seçili webinarın detay kartı — konuşmacı bloğu, başlık, konu listesi ve
 * kayıt ol CTA. Mobilde liste içinde inline, desktop'ta sağdaki sabit
 * kolonda render edilir.
 */
function WebinarDetail({ entry }: { entry: WebinarEntry }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 h-full">
      <SpeakerBlock entry={entry} />
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
        {entry.title}
      </h3>
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-4 h-4 text-[#e31e26]" />
        <span className="text-sm text-gray-500">
          {entry.date} • {entry.day} • 20:00 (Türkiye Saati)
        </span>
      </div>
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">
          Bu webinarda ele alınacak konular
        </p>
        <div className="space-y-3">
          {entry.topics.map((topic, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-[#e31e26]/10 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-xs font-bold text-[#e31e26]">{i + 1}</span>
              </div>
              <p className="text-gray-600 text-sm">{topic}</p>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={() =>
          document
            .getElementById("registration-form")
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="w-full bg-[#e31e26] hover:bg-[#c41920] text-white font-bold py-3 rounded-lg transition-colors cursor-pointer text-sm"
      >
        Bu Webinara Kayıt Ol
      </button>
    </div>
  );
}

export default function TopicsAndAudience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = webinarSeries[activeIndex];

  return (
    <section className="py-20 px-4" style={{ background: "linear-gradient(160deg, #f9fafb 0%, #f1f3f5 30%, #e8eaed 60%, #dfe2e6 100%)", boxShadow: "inset 0 2px 20px rgba(0,0,0,0.04)" }}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            <span className="text-[#e31e26]">Amerika&apos;da Doktorluk Webinar Serisi:</span>
            <br />
            <span className="text-gray-900">Süreci Baştan Sona Uzman Mentörlerden Öğren</span>
          </h2>
          <div className="w-16 h-1 bg-[#e31e26] mb-4" />
          <p className="text-gray-600">Süreç hakkında bilgin olmasa da, nereden başlayacağını bilmesen de — bu ücretsiz 4 webinarlık serimizde tüm süreci uzmanlardan öğreneceksin.</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sol: Webinar Listesi */}
          <motion.div
            className="lg:w-[45%]"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col">
              {webinarSeries.map((webinar, index) => {
                const isActive = activeIndex === index;
                return (
                  <div key={index} className="mb-2 lg:mb-0">
                    <div
                      onClick={() => setActiveIndex(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setActiveIndex(index);
                        }
                      }}
                      className={
                        // Ortak temel — mobil affordance: her item kart gibi (border + bg)
                        "flex gap-4 py-4 px-4 rounded-xl cursor-pointer transition-all duration-300 border border-l-4 " +
                        (isActive
                          ? // MOBİL aktif: belirgin beyaz kart + kırmızı sol çubuk
                            // DESKTOP aktif: shadow + sol kırmızı çubuk (border-y/r görünmez)
                            "bg-white shadow-md border-[#e31e26]/30 border-l-[#e31e26] " +
                            "lg:border-y-transparent lg:border-r-transparent"
                          : // MOBİL inactive: yarı saydam beyaz + gri kenarlık → "tıklanabilir kart" hissi
                            // DESKTOP inactive: tam transparan, hover ile sol gri çubuk
                            "bg-white/60 border-gray-200 border-l-transparent hover:bg-white/80 " +
                            "lg:bg-transparent lg:border-transparent lg:hover:bg-white/60 lg:hover:border-l-gray-300")
                      }
                    >
                      <span className={`text-2xl font-bold min-w-[40px] ${isActive ? "text-[#e31e26]" : "text-gray-400 lg:text-gray-300"}`}>
                        {webinar.number}
                      </span>
                      <div className="flex-1">
                        <h3 className={`font-semibold text-sm leading-tight ${isActive ? "text-[#06539f]" : "text-gray-900"}`}>
                          {webinar.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#e31e26]" />
                          <span className="text-xs text-gray-500">{webinar.date}</span>
                        </div>
                      </div>
                      {/* Mobil: ChevronDown (aktifken yukarı bakar). Desktop: ChevronRight (split layout). */}
                      <ChevronDown
                        className={`w-5 h-5 mt-1 shrink-0 transition-all duration-300 lg:hidden ${
                          isActive ? "text-[#e31e26] rotate-180" : "text-gray-500"
                        }`}
                      />
                      <ChevronRight
                        className={`w-5 h-5 mt-1 shrink-0 transition-colors hidden lg:block ${
                          isActive ? "text-[#e31e26]" : "text-gray-300"
                        }`}
                      />
                    </div>

                    {/* Mobilde inline accordion detayı — desktop'ta gizli */}
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          key="mobile-detail"
                          className="lg:hidden overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          <div className="pt-3 pb-2 px-2">
                            <WebinarDetail entry={webinar} />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Sağ: Seçili Webinar Detay — sadece desktop'ta, mobilde inline accordion */}
          <motion.div
            className="hidden lg:block lg:w-[55%]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <WebinarDetail entry={active} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
