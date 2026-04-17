"use client";

import { motion } from "framer-motion";
import { MapPin, Clock } from "lucide-react";

const upcomingWebinars = [
  {
    title: "ABD'de Doktorluk: Gerçekler, Mitler ve Yol Haritası",
    speaker: "Dr. Furkan Hamamcı",
    date: new Date("2026-05-09T17:00:00Z"),
    time: "20:00",
    location: "Zoom (Online)",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=250&fit=crop",
  },
  {
    title: "Klinik Deneyim (USCE) ve Güçlü CV Oluşturma",
    speaker: "Dr. Furkan Hamamcı & Seher Sena Elagöz, MD",
    date: new Date("2026-05-16T17:00:00Z"),
    time: "20:00",
    location: "Zoom (Online)",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400&h=250&fit=crop",
  },
  {
    title: "USMLE Çalışma Stratejileri",
    speaker: "Dr. Melih Tarık Özdemir",
    date: new Date("2026-05-23T17:00:00Z"),
    time: "20:00",
    location: "Zoom (Online)",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop",
  },
  {
    title: "Başarı Hikayeleri & Soru-Cevap",
    speaker: "USCAMP Mentorları",
    date: new Date("2026-06-02T17:00:00Z"),
    time: "20:00",
    location: "Zoom (Online)",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?w=400&h=250&fit=crop",
  },
];

export default function SocialProof() {
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">USCAMP Webinar Takvimimizi İnceleyebilirsiniz</h2>
          <div className="w-16 h-1 bg-[#e31e26] mx-auto mb-4" />
          <p className="text-gray-500 max-w-2xl mx-auto">
            ABD'de doktorluk yolculuğunuzun her adımını kapsayan ücretsiz webinar serisi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {upcomingWebinars.map((webinar, index) => {
            const dayOfWeek = webinar.date.toLocaleDateString("tr-TR", { weekday: "long" }).toUpperCase();
            const month = webinar.date.toLocaleDateString("tr-TR", { month: "short" });
            const day = webinar.date.getDate();

            return (
              <motion.div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#e31e26]/30 transition-all duration-300 cursor-pointer flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={scrollToForm}
              >
                {/* Üst: Başlık + Tarih */}
                <div className="p-5 pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-base font-bold text-gray-900 leading-tight flex-1">
                      {webinar.title}
                    </h3>
                    <div className="text-right shrink-0">
                      <p className="text-[9px] font-semibold tracking-widest text-[#e31e26]">{dayOfWeek}</p>
                      <p className="text-2xl font-bold text-gray-900 leading-none">
                        <span className="text-xs mr-0.5">{month}</span>{day}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">{webinar.speaker}</p>
                </div>

                {/* Resim */}
                <div className="px-5">
                  <div className="aspect-video w-full overflow-hidden rounded-lg">
                    <img
                      src={webinar.image}
                      alt={webinar.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Alt: Detaylar */}
                <div className="p-5 pt-3 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-gray-400 mt-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{webinar.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{webinar.time}</span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-center mt-4">
                    <span className="text-sm font-medium text-[#e31e26]">
                      Kayıt Ol →
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          className="text-center text-gray-400 text-sm mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Tüm webinarlar ücretsizdir • Her Pazar 20:00 (Türkiye Saati) • Zoom üzerinden
        </motion.p>
      </div>
    </section>
  );
}
