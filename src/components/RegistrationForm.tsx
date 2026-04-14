"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", university: "", status: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const nameParts = form.name.trim().split(/\s+/);
    if (nameParts.length < 2) {
      setError("Lütfen adınızı ve soyadınızı giriniz.");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);

    fetch("/__forms.html", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Form gönderilemedi");
        window.location.href = "https://uscamp.com.tr/webinar-kaydi-tamamlandi/";
      })
      .catch(() => {
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        setLoading(false);
      });
  };

  const inputClass =
    "w-full bg-white/10 border border-white/20 text-white placeholder-gray-500 rounded-lg px-4 py-3 focus:border-[#e31e26] focus:ring-1 focus:ring-[#e31e26] focus:outline-none transition-colors";

  return (
    <section id="registration-form" className="bg-black py-20 px-4">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-8 max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white mb-3">Ücretsiz Kayıt Ol</h2>
          <div className="w-16 h-1 bg-[#e31e26] mx-auto" />
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="text-green-400 text-xl font-semibold mb-2">Kaydınız alındı!</div>
            <p className="text-gray-400">Detaylar e-posta adresinize gönderilecektir.</p>
          </div>
        ) : (
          <form
            name="registration"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="form-name" value="registration" />
            <p hidden>
              <label>
                <input name="bot-field" />
              </label>
            </p>
            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Ad Soyad</label>
              <input
                type="text"
                name="name"
                required
                disabled={loading}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
                placeholder="Adınız Soyadınız"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1 block">E-posta</label>
              <input
                type="email"
                name="email"
                required
                disabled={loading}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
                placeholder="ornek@email.com"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Telefon</label>
              <input
                type="tel"
                name="phone"
                required
                disabled={loading}
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={inputClass}
                placeholder="05XX XXX XX XX"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Üniversite</label>
              <input
                type="text"
                name="university"
                required
                disabled={loading}
                value={form.university}
                onChange={(e) => setForm({ ...form, university: e.target.value })}
                className={inputClass}
                placeholder="Örn: Cerrahpaşa Tıp Fakültesi"
              />
            </div>
            <div>
              <label className="text-gray-300 text-sm mb-1 block">Şu anki durumunuz nedir?</label>
              <select
                name="status"
                required
                disabled={loading}
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className={inputClass}
              >
                <option value="" disabled>Seçiniz</option>
                <option value="1. Dönem">1. Dönem</option>
                <option value="2. Dönem">2. Dönem</option>
                <option value="3. Dönem">3. Dönem</option>
                <option value="4. Dönem">4. Dönem</option>
                <option value="5. Dönem">5. Dönem</option>
                <option value="6. Dönem">6. Dönem</option>
                <option value="Pratisyen Hekim">Pratisyen Hekim</option>
                <option value="Asistan">Asistan</option>
                <option value="Uzman Hekim">Uzman Hekim</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#e31e26] hover:bg-[#c41920] disabled:opacity-60 disabled:cursor-not-allowed text-white w-full py-3 rounded-lg font-bold transition-colors cursor-pointer mt-2"
            >
              {loading ? "Gönderiliyor..." : "Hemen Kayıt Ol"}
            </button>
            <p className="text-gray-500 text-xs text-center">
              Bilgileriniz gizli tutulacaktır.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
