"use client";

import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { siteConfig, roles, aboutData } from "@/data/content";
import { SocialIcon, getSocialLabel } from "@/components/SocialIcon";
import { useI18n } from "@/i18n";
import { BarChart3, Sparkles, TrendingUp, Award } from "lucide-react";

// Clay marquee colors — bright pastel pills
const marqueeColors = [
  '#c4b5fd', // violet-300
  '#a5f3fc', // cyan-200
  '#86efac', // mint
  '#fed7aa', // peach
  '#e8e0ff', // lavender
  '#fecaca', // rose-200
  '#bfdbfe', // blue-200
  '#fde68a', // amber-200
];

function TypingName({ name }: { name: string }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(name.slice(0, i + 1));
      i++;
      if (i >= name.length) {
        clearInterval(interval);
      }
    }, 140);
    return () => clearInterval(interval);
  }, [name]);

  return (
    <span className="inline-flex items-baseline">
      {displayed.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ y: 30, opacity: 0, scale: 0.5 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 12,
            delay: idx * 0.12,
          }}
          className="inline-block gradient-text"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function TypewriterRole() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting) {
      if (text.length < current.length) {
        timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 55);
      } else {
        timeout = setTimeout(() => setDeleting(true), 2200);
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => setText(text.slice(0, -1)), 30);
      } else {
        setDeleting(false);
        setRoleIdx((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <span className="text-[var(--text-secondary)] font-light">
      {text}
      <span className="text-emerald-400 animate-pulse">|</span>
    </span>
  );
}

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numMatch = value.match(/(\d+)/);
    if (!numMatch) { setDisplay(value); return; }
    const target = parseInt(numMatch[1]);
    const prefix = value.slice(0, value.indexOf(numMatch[1]));
    const suffix = value.slice(value.indexOf(numMatch[1]) + numMatch[1].length);
    const duration = 1200;
    const steps = 30;
    const stepTime = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      if (step >= steps) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(`${prefix}${current}${suffix}`);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{display}</span>;
}

function SkillsMarquee() {
  const badges = useMemo(() => {
    const items: string[] = [];
    // Skills categories
    aboutData.skills.forEach(g => items.push(g.category));
    // Hobbies categories
    (aboutData.hobbies || []).forEach(g => items.push(g.category));
    // Other categories
    (aboutData.other || []).forEach(g => items.push(g.category));
    // Education degrees
    (aboutData.education || []).forEach(e => items.push(e.degree));
    return items;
  }, []);

  // Split into 2 rows
  const mid = Math.ceil(badges.length / 2);
  const row1 = badges.slice(0, mid);
  const row2 = badges.slice(mid);

  return (
    <div className="relative overflow-hidden py-4" style={{ background: 'var(--section-alt)' }}>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--section-alt), transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-32 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, var(--section-alt), transparent)' }} />

      {/* Row 1 — moves left */}
      <motion.div
        className="flex gap-3 whitespace-nowrap mb-3"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      >
        {[...row1, ...row1, ...row1, ...row1].map((badge, i) => (
          <span
            key={`r1-${i}`}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold border-[2px] border-[var(--clay-border)]"
            style={{ background: marqueeColors[i % marqueeColors.length], color: '#1e1b4b' }}
          >
            <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: '#1e1b4b' }} />
            {badge}
          </span>
        ))}
      </motion.div>

      {/* Row 2 — moves right */}
      <motion.div
        className="flex gap-3 whitespace-nowrap"
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {[...row2, ...row2, ...row2, ...row2].map((badge, i) => (
          <span
            key={`r2-${i}`}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold border-[2px] border-[var(--clay-border)]"
            style={{ background: marqueeColors[(i + 3) % marqueeColors.length], color: '#1e1b4b' }}
          >
            <span className="w-1.5 h-1.5 rounded-full mr-2" style={{ background: '#1e1b4b' }} />
            {badge}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function HeroSection() {
  const { t } = useI18n();

  const dashboardStats = [
    { label: t.about.stats.years, value: aboutData.stats[0]?.value || "10+", bg: "rgba(140, 110, 231, 0.57)" },
    { label: t.projects.title, value: aboutData.stats[1]?.value || "10+", bg: "rgba(42, 209, 228, 0.58)" },
    { label: t.about.stats.certs, value: aboutData.stats[2]?.value || "6+", bg: "rgba(134, 239, 173, 0.79)" },
    { label: t.about.skills, value: aboutData.stats[3]?.value || "27+", bg: "rgb(248, 207, 161)" },
  ];
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [0, 800], [1.5, -1.5]);
  const rotateY = useTransform(mouseX, [0, 1200], [-1.5, 1.5]);

  const handleMouse = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="home">
    <section
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg"
      onMouseMove={handleMouse}
    >
      {/* Blurred retina background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-purple-800/[0.12] rounded-full blur-[100px] animate-float-slow" />
        <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] bg-emerald-700/[0.08] rounded-full blur-[80px] animate-float-slow-reverse" />
        <div className="absolute top-[40%] left-[40%] w-[700px] h-[700px] bg-violet-600/[0.06] rounded-full blur-[100px]" />
        <div className="absolute top-[60%] left-[15%] w-[350px] h-[350px] bg-fuchsia-500/[0.05] rounded-full blur-[80px] animate-float-slow" />
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-indigo-600/[0.05] rounded-full blur-[80px] animate-float-slow-reverse" />
      </div>

      <motion.div
        style={{ rotateX, rotateY, perspective: 1200 }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center py-24 sm:py-32">
          {/* Left — text content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-5"
            >
              <span className="block text-[var(--text-primary)] mb-2">
                {t.hero.greeting}
              </span>
              <span className="text-5xl sm:text-6xl md:text-8xl">
                <TypingName name={siteConfig.name} />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl sm:text-2xl md:text-3xl mb-8 h-10"
            >
              <TypewriterRole />
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex items-center justify-center lg:justify-start gap-3 flex-wrap"
            >
              {Object.entries(siteConfig.socials).map(([key, href]) => {
                const label = getSocialLabel(key);
                return (
                  <motion.a
                    key={key}
                    href={href}
                    target={key !== "email" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -4, transition: { type: "tween", duration: 0.15 } }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3.5 rounded-xl bg-purple-800 border-[2px] border-purple-500/30 text-purple-200 hover:bg-emerald-700 hover:border-emerald-500/50 hover:text-white transition-colors duration-150"
                    style={{ boxShadow: '3px 3px 0 rgba(139, 92, 246, 0.2)' }}
                    aria-label={label}
                  >
                    <SocialIcon name={key} size={20} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Right — Career Dashboard Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative"
          >
            <div className="border-gradient-animated p-5 sm:p-6 relative z-10" style={{ background: 'var(--card-bg)' }}>
              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border-[2px] border-[var(--clay-border)]"
                  style={{ background: 'rgba(175,152,245,0.25)' }}
                >
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <div className="font-bold text-sm text-[var(--text-primary)]">{t.hero.careerDashboard}</div>
                  <div className="text-xs text-[var(--text-muted)]">{t.hero.professionalOverview}</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-5">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[var(--text-muted)] font-medium">{t.hero.experienceProgress}</span>
                  <span className="font-bold text-emerald-500">{aboutData.stats[0]?.value || '10+'} {t.hero.years}</span>
                </div>
                <div
                  className="h-3 rounded-full overflow-hidden border-[2px] border-[var(--clay-border)]"
                  style={{ background: 'var(--glass-bg)' }}
                >
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-emerald-400"
                    initial={{ width: 0 }}
                    animate={{ width: '95%' }}
                    transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {dashboardStats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                    className="p-3 rounded-xl"
                    style={{ background: stat.bg, border: '2px solid var(--clay-border)' }}
                  >
                    <div className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wide">
                      {stat.label}
                    </div>
                    <div className="text-xl font-bold text-[var(--text-primary)] mt-0.5">
                      <AnimatedCounter value={stat.value} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Explore button */}
              <button
                onClick={() => scrollTo('about')}
                className="btn-primary w-full text-sm shimmer-effect"
              >
                {t.hero.explorePortfolio} →
              </button>
            </div>

            {/* Floating decorative elements — desktop only */}
            <div
              className="hidden lg:flex absolute -top-3 -right-3 z-20 w-12 h-12 rounded-xl items-center justify-center border-[2px] border-[var(--clay-border)]"
              style={{ background: 'rgba(175,152,245,0.3)', boxShadow: '2px 2px 0 var(--accent-glow)' }}
            >
              <Sparkles className="w-5 h-5 text-purple-500" />
            </div>
            <div
              className="hidden lg:flex absolute -bottom-3 -left-3 z-20 w-11 h-11 rounded-xl items-center justify-center border-[2px] border-[var(--clay-border)]"
              style={{ background: 'rgba(134,239,172,0.3)', boxShadow: '2px 2px 0 var(--accent-glow)' }}
            >
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </div>
            <div
              className="hidden lg:flex absolute top-1/2 -right-5 z-20 w-10 h-10 rounded-full items-center justify-center border-[2px] border-[var(--clay-border)]"
              style={{ background: 'rgba(254, 215, 170, 0.45)', boxShadow: '2px 2px 0 var(--accent-glow)' }}
            >
              <Award className="w-4 h-4 text-amber-500" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>

    {/* Skills & Categories Marquee — outside section, below hero */}
    <SkillsMarquee />
    </div>
  );
}
