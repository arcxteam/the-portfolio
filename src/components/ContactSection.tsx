"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, MapPin, Send, CheckCircle, Globe } from "lucide-react";
import { siteConfig } from "@/data/content";

import { useI18n } from "@/i18n";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const { t } = useI18n();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setFormData({ name: "", email: "", message: "" });
  };

  const contactCards = [
    {
      icon: Mail,
      label: t.contact.emailLabel,
      value: siteConfig.email,
      href: `mailto:${siteConfig.email}`,
      iconBg: "bg-purple-100 dark:bg-purple-500/15",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: MapPin,
      label: t.contact.location,
      value: siteConfig.location,
      href: null,
      iconBg: "bg-emerald-100 dark:bg-emerald-500/15",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      icon: Globe,
      label: t.contact.social,
      value: siteConfig.url.replace("https://", ""),
      href: siteConfig.url,
      iconBg: "bg-red-100 dark:bg-red-500/15",
      iconColor: "text-red-600 dark:text-red-400",
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Blurred retina background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[25%] right-[15%] w-[400px] h-[400px] bg-purple-600/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-[15%] left-[20%] w-[350px] h-[350px] bg-emerald-700/[0.04] rounded-full blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={0}
          className="text-center mb-16"
        >
          <span className="badge badge-purple mb-3 !bg-cyan-700 !text-white">{t.contact.title}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-500 to-purple-800 bg-clip-text text-transparent mb-4">
            {t.contact.subtitle}
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Info cards — each with unique color */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            custom={1}
            className="md:col-span-2 space-y-4"
          >
            {contactCards.map((card, i) => (
              <div key={i} className="glass-card p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center ${card.iconColor} border-[2px] border-[var(--clay-border)]`}>
                  <card.icon size={18} />
                </div>
                <div>
                  <div className="text-xs text-[var(--text-muted)] font-medium">{card.label}</div>
                  {card.href ? (
                    <a href={card.href} target={card.href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" className="text-sm text-[var(--text-primary)] hover:text-purple-500 dark:hover:text-purple-400 transition-colors font-semibold">
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-sm text-[var(--text-primary)] font-semibold">{card.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Decorative quote */}
            {siteConfig.quote && (
            <div className="glass-card p-5 bg-gradient-to-br from-purple-500/5 to-emerald-400/5">
              <p className="text-sm text-[var(--text-muted)] italic leading-relaxed">
                &quot;{siteConfig.quote}&quot;
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-2 font-semibold">— {siteConfig.quoteAuthor || siteConfig.name}</p>
            </div>
            )}
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            custom={2}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">{t.contact.name}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--input-bg)] border-[3px] border-[var(--clay-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-all text-sm shadow-[3px_3px_0_var(--accent-glow)]"
                  placeholder={t.contact.name}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">{t.contact.email}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--input-bg)] border-[3px] border-[var(--clay-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-all text-sm shadow-[3px_3px_0_var(--accent-glow)]"
                  placeholder={t.contact.email}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text-secondary)] mb-2">{t.contact.message}</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-[var(--input-bg)] border-[3px] border-[var(--clay-border)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-purple-500/50 transition-all text-sm resize-none shadow-[3px_3px_0_var(--accent-glow)]"
                  placeholder={t.contact.message}
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors border-[3px] border-[var(--clay-border)] ${
                  sent
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white shadow-[4px_4px_0_rgba(16,185,129,0.25)]"
                    : "btn-primary"
                }`}
              >
                {sent ? (
                  <>
                    <CheckCircle size={18} />
                    {t.contact.success}
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    {t.contact.send}
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
