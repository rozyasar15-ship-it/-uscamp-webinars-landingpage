/**
 * USCAMP konuşmacı kaydı — isim, ünvan, biyografi ve görsel URL'i.
 * Görsel yoksa (image: null) tüketen komponent jenerik User ikonu gösterir.
 * Yeni kişi eklenirken tip kontrolü için `speakerIds` union tipine de ekle.
 */

export type Speaker = {
  name: string;
  title: string;
  bio?: string;
  image: string | null;
};

const speakersRaw = {
  furkan: {
    name: "Dr. Furkan Hamamcı",
    title: "USCAMP Kurucu",
    bio: "CAMP Group kurucu ortağı olan ve ABD'de doktorluk kariyerine adım atmak isteyen yüzlerce Türk hekime mentorluk yapmış bir mentor.",
    image: "https://uscamp.com.tr/wp-content/uploads/2025/08/Furkan-Hamamci-2-scaled.jpg",
  },
  sena: {
    name: "Seher Sena Elagöz, MD",
    title: "USCAMP Eğitmen & Mentor",
    bio: "USMLE ve MATCH süreçlerini başarıyla tamamlamış, öğrencilere staj deneyimi, CV güçlendirme ve mülakat aşamalarında rehberlik sağlayan deneyimli bir mentor.",
    image: "https://uscamp.com.tr/wp-content/uploads/2025/09/seher-scaled.jpg",
  },
  berk: {
    name: "Berk Kaan Aktaş, MD",
    title: "USCAMP Mentor",
    image: "https://uscamp.com.tr/wp-content/uploads/2025/10/Berk-Kaan-Aktas-scaled.jpg",
  },
  alperen: {
    name: "Alperen Öztürk, MD",
    title: "USCAMP Mentor",
    bio: "USMLE ve MATCH süreçlerini başarıyla tamamlayarak ABD'de psikiyatri alanında PGY-1 Resident olarak görev yapan, Mayo Clinic ve Johns Hopkins'te araştırma deneyimi kazanmış deneyimli bir mentor.",
    image:
      "https://uscamp.com.tr/wp-content/uploads/2025/09/Alperen-Ozturk-MD-Danisman-Mentor-jpg.jpg",
  },
  miray: {
    name: "Miray Kurtça, MD",
    title: "USCAMP Mentor",
    bio: "USMLE ve MATCH süreçlerini başarıyla tamamlamış, Baylor College of Medicine'da postdoktoral araştırmacı olarak görev yapan bir USCAMP mentoru.",
    image: "https://uscamp.com.tr/wp-content/uploads/2025/09/Miray-Kurtca-2.jpg",
  },
  busra: {
    name: "Büşra Cangüt",
    title: "USCAMP Mentor",
    image: "https://uscamp.com.tr/wp-content/uploads/2025/09/Busra-Cangut-1.jpg",
  },
  melih: {
    name: "Melih Tarık Özdemir",
    title: "USCAMP Mentor",
    bio: "USMLE sürecinde öğrencilere mentörlük sağlayan, sınav stratejisi ve çalışma planlaması konularında rehberlik eden bir USCAMP mentoru.",
    image: "/melih-tarik-ozdemir.jpg",
  },
  kutay: {
    name: "Kutay Çelik, MD",
    title: "USCAMP Öğrencisi",
    bio: "2026 MATCH döneminde Bridgeport Hospital – Yale New Haven Health'te Preliminary Internal Medicine programına kabul alan bir USCAMP öğrencisi.",
    image: "/kutay-celik.jpg",
  },
  ebubekir: {
    name: "Ebu Bekir Uçar, MD",
    title: "USCAMP Mentor",
    bio: "USMLE ve MATCH süreçlerini başarıyla tamamlayarak şu anda New York'ta Northwell Health'te patoloji asistanı olan bir USCAMP mentoru.",
    image: "/ebubekir-ucar.jpg",
  },
} satisfies Record<string, Speaker>;

export type SpeakerId = keyof typeof speakersRaw;

/** Uygulama genelinde Speaker tipi üzerinden erişim — opsiyonel alanlar (bio) tutarlı kalır. */
export const speakers: Record<SpeakerId, Speaker> = speakersRaw;

export function getSpeaker(id: SpeakerId): Speaker {
  return speakers[id];
}
