import { speakers } from "./speakers";

export const webinarData = {
  title: "4 Haftalık Ücretsiz Webinar Serimizde Amerika'da Doktorluk Yolculuğunu Öğren",
  titleHighlight: "",
  subtitle:
    "Bu yolculuğu tamamlamış uzman mentörler anlatacak, aynı hayali paylaşan yüzlerce doktorla birlikte keşfedeceksin!",
  date: "9 Mayıs 2026",
  time: "20:00 (Türkiye Saati)",
  targetDate: "2026-05-09T17:00:00Z",
  badge: "Ücretsiz Webinar • Sınırlı Kontenjan",
  topics: [
    { title: "USMLE Step 1 & Step 2 CK", desc: "Sınavlara nasıl verimli hazırlanılır?", icon: "BookOpen", bullets: ["Kaynak seçimi ve çalışma planı oluşturma", "Sık yapılan hatalar ve çözüm önerileri"] },
    { title: "ABD'de Klinik Staj", desc: "Doğru programı nasıl seçersiniz?", icon: "Building2", bullets: ["Observership vs. hands-on deneyim farkları", "Başvuru süreci ve zamanlama"] },
    { title: "Letter of Recommendation", desc: "Güçlü LOR nasıl alınır?", icon: "FileText", bullets: ["Doğru kişileri seçme stratejileri", "Zamanlama ve takip süreci"] },
  ],
  audience: [
    { title: "Tıp Fakültesi Öğrencileri", desc: "ABD'de doktorluk hayalini erken dönemde planlamak isteyen 3-6. sınıf öğrencileri", icon: "🎓" },
    { title: "Pratisyen Hekimler", desc: "USMLE sürecine başlamayı düşünen veya hazırlık aşamasındaki hekimler", icon: "🩺" },
    { title: "Uzman Doktorlar", desc: "Uzmanlıklarını ABD'ye taşımak isteyen deneyimli hekimler", icon: "🌍" },
  ],
  speakers: [
    speakers.furkan,
    speakers.sena,
    speakers.melih,
    speakers.alperen,
    speakers.miray,
    speakers.busra,
    speakers.ebubekir,
  ],
  socialProof: {
    attendeeCount: "2,500+",
    attendeeLabel: "doktor ve doktor adayı USCAMP ailesinde",
    testimonials: [
      { name: "Nazlı Şairoğlu", role: "Tıp Fakültesi Öğrencisi", text: "USCAMP'ın kişiye özel programı sayesinde çok daha verimli çalışıyorum." },
      { name: "Mert Can Özkır", role: "Tıp Fakültesi Öğrencisi", text: "Düzenli takip ve birebir koçluk desteği motivasyonumu yüksek tutuyor." },
    ],
  },
  faq: [
    { q: "Webinar ücretsiz mi?", a: "Evet, webinarımız tamamen ücretsiz. Kayıt yaptırmanız yeterli." },
    { q: "Kayıt yaptırıp katılamazsam ne olur?", a: "Endişelenmeyin, kayıt yaptıran herkese webinar kaydı e-posta ile gönderilecektir." },
    { q: "Webinar hangi platformda yapılacak?", a: "Webinar Zoom üzerinden gerçekleştirilecektir. Kayıt sonrası katılım linki e-posta adresinize gönderilecektir." },
    { q: "Soru sorabilecek miyim?", a: "Evet, webinar sırasında canlı soru-cevap bölümü olacaktır." },
  ],
};
