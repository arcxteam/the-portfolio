"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Award, ExternalLink, Calendar, Clock, Users } from "lucide-react";
import { coursesData } from "@/data/content";
import { useI18n } from "@/i18n";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const courseColors = [
  { iconBg: "bg-purple-100 dark:bg-purple-500/15", iconText: "text-purple-600 dark:text-purple-400", hover: "group-hover:text-purple-500 dark:group-hover:text-purple-400", rating: "text-emerald-500 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10" },
  { iconBg: "bg-emerald-100 dark:bg-emerald-500/15", iconText: "text-emerald-600 dark:text-emerald-400", hover: "group-hover:text-emerald-500 dark:group-hover:text-emerald-400", rating: "text-emerald-500 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10" },
  { iconBg: "bg-teal-100 dark:bg-teal-500/15", iconText: "text-teal-600 dark:text-teal-400", hover: "group-hover:text-teal-500 dark:group-hover:text-teal-400", rating: "text-emerald-500 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10" },
  { iconBg: "bg-sky-100 dark:bg-sky-500/15", iconText: "text-sky-600 dark:text-sky-400", hover: "group-hover:text-sky-500 dark:group-hover:text-sky-400", rating: "text-emerald-500 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10" },
  { iconBg: "bg-rose-100 dark:bg-rose-500/15", iconText: "text-rose-600 dark:text-rose-400", hover: "group-hover:text-rose-500 dark:group-hover:text-rose-400", rating: "text-emerald-500 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10" },
  { iconBg: "bg-amber-100 dark:bg-amber-500/15", iconText: "text-amber-600 dark:text-amber-400", hover: "group-hover:text-amber-500 dark:group-hover:text-amber-400", rating: "text-emerald-500 border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10" },
];

export default function CoursesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { t } = useI18n();

  // Parallax for decorative blobs
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  const providers = [t.courses.all, ...Array.from(new Set(coursesData.map((c) => c.provider)))];
  const [activeProvider, setActiveProvider] = useState(t.courses.all);

  const filtered = activeProvider === t.courses.all
    ? coursesData
    : coursesData.filter((c) => c.provider === activeProvider);

  return (
    <section id="courses" className="relative py-24 sm:py-32 bg-[var(--section-alt)] overflow-hidden" ref={sectionRef}>
      {/* Blurred retina background — with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-purple-600/[0.05] rounded-full blur-[150px]" style={{ y: blobY1 }} />
        <motion.div className="absolute bottom-[15%] left-[10%] w-[350px] h-[350px] bg-emerald-500/[0.04] rounded-full blur-[130px]" style={{ y: blobY2 }} />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10" ref={ref}>
        {/* Section header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={0}
          className="text-center mb-12"
        >
          <span className="badge badge-purple mb-3 !bg-purple-800 !text-white">{t.courses.title}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t.courses.subtitle.includes("Continuous learning") ? (
              <>
                Continuous{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-purple-800 bg-clip-text text-transparent">
                  learning
                </span>
                {" and professional "}
                <span className="bg-gradient-to-r from-purple-800 to-emerald-500 bg-clip-text text-transparent">
                  development
                </span>
              </>
            ) : (
              t.courses.subtitle
            )}
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </motion.div>

        {/* Provider filter */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={1}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {providers.map((provider) => (
            <button
              key={provider}
              onClick={() => setActiveProvider(provider)}
              className={`px-4 py-1 rounded-lg text-sm font-bold transition-all border-[2px] ${
                activeProvider === provider
                  ? "tab-active"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--glass-bg)]"
              }`}
            >
              {provider}
            </button>
          ))}
        </motion.div>

        {/* Courses grid — reference-style clean cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
          {filtered.map((course, i) => {
            const color = courseColors[i % courseColors.length];
            return (
              <motion.div
                key={course.id}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                custom={i + 2}
                layout
                className="glass-card glass-card-glow p-5 group flex items-start gap-4"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${color.iconBg} flex items-center justify-center text-2xl shrink-0 border-[2px] border-[var(--clay-border)]`}>
                  {course.providerIcon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`text-base font-semibold text-[var(--text-primary)] leading-snug ${color.hover} transition-colors`}>
                        {course.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-sm font-semibold ${color.iconText}`}>{course.provider}</span>
                        <span className="text-[var(--text-muted)]">·</span>
                        <span className="text-xs text-[var(--text-muted)] flex items-center gap-1 font-medium">
                          <Calendar size={11} />
                          {course.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {course.description && (
                    <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed text-justify">
                      {course.description}
                    </p>
                  )}

                  {/* Skills as tiny tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3 mb-3">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-[11px] px-2 py-0.5 rounded-lg font-semibold text-[var(--text-primary)] border-[2px] border-purple-400/30 dark:border-purple-500/40"
                        style={{ background: 'rgba(147,51,234,0.12)' }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Credential link */}
                  <a
                    href={course.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-purple-800 dark:text-white hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors font-medium"
                  >
                    <Award size={14} />
                    {t.courses.viewCert}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
