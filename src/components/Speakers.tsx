import { webinarData } from "@/data/webinar-data";
import SpeakerAvatar from "@/components/ui/SpeakerAvatar";

export default function Speakers() {
  return (
    <section className="py-20 px-4" style={{ background: "#0a0a0a" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Konuşmacılar</h2>
          <div className="w-16 h-1 bg-[#e31e26] mx-auto" />
          <p className="text-gray-400 text-sm mt-4 max-w-xl mx-auto">
            4 haftalık webinar serimizde ABD&apos;de doktorluk yolculuğunu
            bizzat yaşamış uzman mentörler eşlik edecek.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {webinarData.speakers.slice(0, 4).map((s, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center hover:border-[#e31e26]/40 transition-colors"
            >
              <div className="mb-4">
                <SpeakerAvatar speaker={s} size="lg" />
              </div>
              <h3 className="text-white text-base sm:text-lg font-bold leading-tight">
                {s.name}
              </h3>
              <p className="text-[#e31e26] text-xs sm:text-sm font-medium mt-1">
                {s.title}
              </p>
              {s.bio && (
                <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  {s.bio}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
          {webinarData.speakers.slice(4).map((s, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 flex flex-col items-center text-center hover:border-[#e31e26]/40 transition-colors w-[calc(50%-8px)] md:w-[calc(33.333%-11px)] lg:w-[calc(25%-12px)]"
            >
              <div className="mb-4">
                <SpeakerAvatar speaker={s} size="lg" />
              </div>
              <h3 className="text-white text-base sm:text-lg font-bold leading-tight">
                {s.name}
              </h3>
              <p className="text-[#e31e26] text-xs sm:text-sm font-medium mt-1">
                {s.title}
              </p>
              {s.bio && (
                <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                  {s.bio}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
