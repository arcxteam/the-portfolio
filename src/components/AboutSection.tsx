"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { aboutData, siteConfig } from "@/data/content";
import { MapPinHouse, University, GraduationCap } from "lucide-react";
import { useI18n } from "@/i18n";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

// Clay accent colors matching pattern
const clayAccents = [
  { color: '#af98f5', darkColor: 'rgba(175,152,245,0.25)' },  // lavender (accentPurple)
  { color: '#a5f3fc', darkColor: 'rgba(165,243,252,0.25)' },  // cyan (secondary)
  { color: '#86efac', darkColor: 'rgba(134,239,172,0.25)' },  // mint (accentMint)
  { color: '#fed7aa', darkColor: 'rgba(254,215,170,0.25)' },  // peach (accentPeach)
  { color: '#f38bae', darkColor: 'rgba(243,139,174,0.25)' },  // violet
];

const skillColors = [
  { bg: "bg-purple-500/40", border: "border-purple-500/20", text: "text-purple-600 dark:text-purple-400", icon: "bg-purple-600", badge: "bg-purple-100 dark:bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/25" },
  { bg: "bg-emerald-500/40", border: "border-emerald-500/20", text: "text-emerald-600 dark:text-emerald-400", icon: "bg-emerald-600", badge: "bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/25" },
  { bg: "bg-teal-500/40", border: "border-teal-500/20", text: "text-teal-600 dark:text-teal-400", icon: "bg-teal-500", badge: "bg-teal-100 dark:bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-500/25" },
  { bg: "bg-sky-500/40", border: "border-sky-500/20", text: "text-sky-600 dark:text-sky-400", icon: "bg-sky-500", badge: "bg-sky-100 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-500/25" },
];

const statColors = [
  "from-purple-600 to-violet-500",
  "from-emerald-500 to-teal-400",
  "from-teal-500 to-cyan-400",
  "from-sky-500 to-blue-400",
  "from-rose-500 to-pink-400",
  "from-amber-500 to-orange-400",
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState<"skills" | "education" | "hobbies" | "other">("skills");

  const tabData = activeTab === "skills"
    ? aboutData.skills
    : activeTab === "hobbies"
      ? (aboutData.hobbies || [])
      : activeTab === "other"
        ? (aboutData.other || [])
        : []; // education uses its own render

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Blurred retina background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-purple-600/[0.06] rounded-full blur-[150px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[350px] h-[350px] bg-emerald-700/[0.05] rounded-full blur-[130px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={0}
          className="text-center mb-16"
        >
          <span className="badge badge-purple mb-3 !bg-purple-800 !text-white">{t.about.title}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {aboutData.headline}
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left — Avatar + Stats */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            custom={1}
            className="lg:col-span-2 flex flex-col items-center lg:items-start gap-8"
          >
            {/* Avatar */}
            <div className="relative group">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-[2px] border-[var(--clay-border)] shadow-[4px_4px_0_var(--accent-glow)]">
                <img
                  src={siteConfig.avatar}
                  alt={siteConfig.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="w-full h-full bg-gradient-to-br from-purple-700 via-violet-600 to-emerald-400 items-center justify-center text-6xl font-bold text-white/90 hidden">
                  {siteConfig.name.split(" ").map((n) => n[0]).join("")}
                </div>
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-2 rounded-2xl border border-[var(--clay-border)] -z-10 opacity-40" />
            </div>

            {/* Info below avatar */}
            <div className="text-center lg:text-left space-y-1.5 w-full max-w-xs">
              <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[var(--text-muted)]">
                <MapPinHouse size={14} className="text-purple-500 shrink-0" />
                <span className="text-sm font-medium">{siteConfig.location}</span>
              </div>
              {siteConfig.campus && (
                <div className="flex items-center justify-center lg:justify-start gap-1.5 text-[var(--text-muted)]">
                  <University size={14} className="text-purple-500 shrink-0" />
                  <span className="text-xs font-medium">{siteConfig.campus}</span>
                </div>
              )}
              <p className="text-sm font-semibold text-[var(--text-secondary)] leading-snug">
                {siteConfig.title}
              </p>
              <p className="text-xs text-[var(--text-muted)] italic leading-relaxed">
                {siteConfig.description}
              </p>
            </div>

            {/* Stats grid */}
            <div className="flex flex-wrap gap-3 w-full max-w-xs justify-center lg:justify-start">
              {aboutData.stats.map((stat, i) => (
                <motion.div
                  key={`stat-${i}`}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  custom={i + 2}
                  className="glass-card p-3 text-center group"
                  style={{ width: "calc(50% - 0.375rem)" }}
                >
                  <div className={`text-2xl font-bold bg-gradient-to-r ${statColors[i % statColors.length]} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Bio + Skills */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={2}
              className="glass-card p-6"
            >
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed mb-4 text-justify">
                {aboutData.intro}
              </p>
              <p className="text-[var(--text-muted)] leading-relaxed text-justify">
                {aboutData.bio}
              </p>
            </motion.div>

            {/* Skills / Hobbies — tabbed */}
            <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              custom={3}
              className="space-y-5"
            >
              {/* Toggle tabs */}
              <div className="flex items-center gap-2 flex-wrap">
                {([
                  { key: "skills" as const, label: aboutData.skillsHeading || "Skills" },
                  ...((aboutData.education && aboutData.education.length > 0) ? [{ key: "education" as const, label: t.about.education }] : []),
                  ...((aboutData.hobbies && aboutData.hobbies.length > 0) ? [{ key: "hobbies" as const, label: t.about.hobbies }] : []),
                  ...((aboutData.other && aboutData.other.length > 0) ? [{ key: "other" as const, label: t.about.other }] : []),
                ]).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-1 rounded-lg text-sm font-bold transition-all border-[2px] ${
                      activeTab === tab.key
                        ? "tab-active"
                        : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--section-alt)]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Education tab content — clay card style */}
              {activeTab === "education" && aboutData.education && (
                <div className="space-y-4">
                  {aboutData.education.map((edu, i) => {
                    const accent = clayAccents[i % clayAccents.length];
                    return (
                      <motion.div
                        key={`edu-${i}`}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.12 }}
                        className="glass-card p-4"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: accent.color, border: '2px solid var(--clay-border)' }}
                          >
                            <GraduationCap size={16} className="text-[var(--text-primary)] opacity-70" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-[var(--text-primary)]">{edu.degree}</h4>
                            <p className="text-xs text-[var(--text-muted)] font-medium">{edu.year}</p>
                          </div>
                        </div>
                        <div className="ml-11 space-y-1">
                          <p className="text-sm font-semibold text-[var(--text-secondary)]">{edu.institution}</p>
                          {edu.description && (
                            <p className="text-xs text-[var(--text-muted)] leading-relaxed">{edu.description}</p>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Skills / Hobbies / Other tab content — clay style */}
              {activeTab !== "education" && (
                <div className="space-y-4">
                  {tabData.map((group, gi) => {
                    const accent = clayAccents[gi % clayAccents.length];
                    return (
                      <motion.div
                        key={group.category}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + gi * 0.12 }}
                        className="glass-card p-4"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div
                            className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                            style={{ background: accent.color, border: '2px solid var(--clay-border)' }}
                          >
                            <span className="w-2 h-2 rounded-full bg-[var(--text-primary)] opacity-70" />
                          </div>
                          <span className="text-sm font-bold text-[var(--text-primary)]">{group.category}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 ml-10">
                          {group.items.map((item) => (
                            <motion.span
                              key={item}
                              whileHover={{ scale: 1.05, y: -2 }}
                              className="text-xs px-3 py-1 rounded-lg font-semibold cursor-default text-[var(--text-primary)]"
                              style={{ background: accent.darkColor, border: '2px solid var(--clay-border)' }}
                            >
                              {item}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
