/**
 * Hero başlık varyantları — URL'deki `?utm_content=angleX_hookY` parametresi
 * ile eşleşen kancayı (hook) Hero'da render eder. Tanımsızsa default dönülür.
 */

export type HeroVariant = {
  /** Tam başlık metni. `highlight` içindeki öbek kırmızıya boyanır. */
  headline: string;
  /** Headline içinde kırmızıya boyanacak alt dize (tam eşleşme). */
  highlight: string;
  /** Başlık altındaki açıklama metni. */
  sub: string;
};

export const heroVariants: Record<string, HeroVariant> = {
  angle1_hook1: {
    headline:
      "Amerika'da Doktorluk Kariyerine Adım Atan Her İki Doktordan Biri Başarıyor — Sen de O %56'nın İçinde Olabilirsin",
    highlight: "Her İki Doktordan Biri Başarıyor",
    sub: "4 haftalık ücretsiz webinar serimizde o başarılı doktorların neyi farklı yaptığını baştan sona anlatıyoruz.",
  },
  angle1_hook2: {
    headline:
      "Binlerce Türk Doktor Amerika'da Doktorluk Hayalini Gerçeğe Dönüştürdü — Sıra Sende",
    highlight: "Sıra Sende",
    sub: "Bu yolculuğu bizzat yaşamış uzmanlar ve aynı hayali paylaşan yüzlerce doktorla birlikte 4 haftada tüm süreci öğren.",
  },
  angle2_hook1: {
    headline:
      "ABD'de Doktorluk Süreci Karmaşık Değil — Sadece Henüz Doğru Yol Haritasını Bilmiyorsun",
    highlight: "Karmaşık Değil",
    sub: "4 haftalık ücretsiz webinar serimizde nereden başlayacağından MATCH'e kadar her adımı adım adım anlatıyoruz.",
  },
  angle2_hook2: {
    headline: "Bu Yolculukta Zor Olan Sürecin Kendisi Değil — Yalnız Yürütmek",
    highlight: "Yalnız Yürütmek",
    sub: "Süreci yaşamış uzmanlar ve aynı hayali paylaşan yüzlerce doktorla birlikte 4 haftada tüm süreci öğren. Artık yalnız değilsin.",
  },
  angle3_hook1: {
    headline:
      "Şu An Senin Gibi Düşünen Yüzlerce Doktor Var — Fark, Bugün Harekete Geçip Geçmemek",
    highlight: "Bugün Harekete Geçip Geçmemek",
    sub: "9 Mayıs'ta başlayan ücretsiz webinar serimizde ABD'de doktorluk sürecinin her adımını uzmanlardan öğren.",
  },
  angle3_hook2: {
    headline:
      "ABD'de Doktorluk Yolculuğunda En Büyük Risk Para Değil — Yanlış Sırayla İlerleyerek Yıl Kaybetmek",
    highlight: "Yıl Kaybetmek",
    sub: "4 haftalık ücretsiz webinar serimizde doğru yol haritasını öğren, gereksiz zaman kaybını önle.",
  },
};

/** URL parametresi yoksa veya geçersizse kullanılacak orijinal iki-satırlı yapı. */
export const heroDefault = {
  lineTop: "4 Haftalık Ücretsiz Webinar Serimizde",
  lineBottom: "Amerika'da Doktorluk Yolculuğunun Her Adımını Öğren",
};

/**
 * URL parametresinden varyantı çözümler. Case-insensitive, trim'li.
 * Bilinmeyen değerler null döner (çağıran tarafta default'a düşer).
 */
export function resolveHeroVariant(raw: string | null | undefined): HeroVariant | null {
  if (!raw) return null;
  const key = raw.trim().toLowerCase();
  return heroVariants[key] ?? null;
}
