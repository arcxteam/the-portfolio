"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Briefcase, MapPin, ExternalLink, ChevronDown, ContactRound } from "lucide-react";
import { experienceData } from "@/data/content";
import { useI18n } from "@/i18n";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const cardAccents = [
  { dot: "bg-purple-500", icon: "bg-purple-500/10 text-purple-500 dark:text-purple-400", tag: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15", line: "from-purple-500" },
  { dot: "bg-purple-600", icon: "bg-purple-600/10 text-purple-600 dark:text-purple-400", tag: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15", line: "from-purple-600" },
  { dot: "bg-purple-700", icon: "bg-purple-700/10 text-purple-700 dark:text-purple-400", tag: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/15", line: "from-purple-700" },
];

export default function ExperienceSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedId, setExpandedId] = useState<string | null>(experienceData[0]?.id || null);
  const { t } = useI18n();

  return (
    <section id="experience" className="relative py-24 sm:py-32 bg-[var(--section-alt)] overflow-hidden">
      {/* Blurred retina background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[30%] left-[5%] w-[400px] h-[400px] bg-purple-600/[0.05] rounded-full blur-[150px]" />
        <div className="absolute bottom-[10%] right-[15%] w-[350px] h-[350px] bg-emerald-700/[0.04] rounded-full blur-[120px]" />
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
            <span className="badge badge-purple mb-3 !bg-purple-800 !text-white">{t.experience.title}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t.experience.subtitle.includes("journey and career") ? (
              <>
              My PRO{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-purple-800 bg-clip-text text-transparent">
                journey
              </span>{" "}
              and{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-purple-800 bg-clip-text text-transparent">
                career
              </span>{" "}
              highlights
              </>
            ) : (
              t.experience.subtitle
            )}
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </motion.div> 

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-[3px] bg-gradient-to-b from-purple-500/50 via-purple-400/30 to-transparent hidden sm:block rounded-full" />

          <div className="space-y-6">
            {experienceData.map((exp, i) => {
              const accent = cardAccents[i % cardAccents.length];
              return (
                <motion.div
                  key={exp.id}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  variants={fadeInUp}
                  custom={i + 1}
                >
                  <div
                    className={`relative sm:pl-14 glass-card p-6 cursor-pointer ${
                      expandedId === exp.id ? "!border-purple-500/35 !shadow-[4px_4px_0_rgba(139,92,246,0.2)]" : ""
                    }`}
                    onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[15px] top-8 w-[19px] h-[19px] rounded-md border-[2px] border-[var(--clay-border)] bg-[var(--background)] hidden sm:block" style={{ boxShadow: '2px 2px 0 var(--accent-glow)' }}>
                      <div className={`absolute inset-[3px] rounded-full ${accent.dot} transition-opacity ${expandedId === exp.id ? "opacity-100" : "opacity-30"}`} />
                    </div>

                    {/* Header */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <div className={`p-1.5 rounded-lg ${accent.icon}`}>
                            <Briefcase size={16} className="shrink-0" />
                          </div>
                          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                            {exp.role}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3 mt-1.5 flex-wrap text-sm">
                          <a
                            href={exp.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-600 dark:text-purple-400 hover:underline font-medium flex items-center gap-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {exp.company}
                            <ExternalLink size={12} />
                          </a>
                            <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-1">
                            <ContactRound size={12} />
                            {exp.jobs}
                            </span>
                            <span className="text-[var(--text-muted)] flex items-center gap-1">
                            <MapPin size={12} />
                            {exp.location}
                            </span>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] mt-1 font-medium">{exp.period}</p>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[var(--text-muted)] mt-1"
                      >
                        <ChevronDown size={20} />
                      </motion.div>
                    </div>

                    {/* Expanded content */}
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedId === exp.id ? "auto" : 0,
                        opacity: expandedId === exp.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 border-t border-[var(--card-border)] mt-4">
                        <p className="text-[var(--text-secondary)] mb-4 text-justify">
                          {exp.description}
                        </p>
                        <ul className="space-y-2 mb-4">
                          {exp.highlights.map((h, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-muted)] text-justify">
                              <span className={`w-2 h-2 rounded-full ${accent.dot} mt-1.5 shrink-0 opacity-70`} />
                              {h}
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] px-2.5 py-0.5 rounded-lg font-semibold text-purple-700 dark:text-purple-300 border-[2px] border-purple-400/30 dark:border-purple-500/40"
                              style={{ background: 'rgba(147,51,234,0.12)' }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
