"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Globe, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n";
import { locales, localeFlags, localeNames, type Locale } from "@/i18n/translations";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { t, locale, setLocale } = useI18n();
  const langRef = useRef<HTMLDivElement>(null);

  const navTabs = [
    { id: "home", label: t.nav.home },
    { id: "about", label: t.nav.about },
    { id: "experience", label: t.nav.experience },
    { id: "projects", label: t.nav.projects },
    { id: "courses", label: t.nav.courses },
    { id: "contact", label: t.nav.contact },
  ];

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navTabs.map((tab) => tab.id);
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-2"
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-3 flex items-center justify-center gap-2">
        {/* Nav tabs — clay pill container */}
        <div className="flex items-center gap-0 px-0.5 py-px rounded bg-[var(--glass-bg)] border-[var(--clay-border)] backdrop-blur-xl shadow-[2px_2px_0_var(--accent-glow)]" style={{ borderWidth: '2px' }}>
          {navTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => scrollTo(tab.id)}
              className={`relative px-1 sm:px-1.5 py-px rounded transition-all duration-200 ${
                activeSection === tab.id
                  ? "text-[var(--text-primary)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-secondary)]"
              }`}
            >
              {activeSection === tab.id && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded tab-active"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 text-[9px] sm:text-[11px] font-bold whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Right controls — language + theme */}
        <div className="flex items-center gap-1">
          {/* Language */}
          <div className="relative" ref={langRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--glass-bg)] border-[var(--clay-border)] backdrop-blur-xl text-[11px] font-bold text-[var(--text-secondary)] hover:border-purple-400/40 transition-all shadow-[2px_2px_0_var(--accent-glow)]" style={{ borderWidth: '2px' }}
            >
              <Globe size={11} />
              <span>{locale}</span>
              <ChevronDown size={9} className={`transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </motion.button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-40 max-h-64 overflow-y-auto rounded-xl bg-[var(--glass-bg)] border-[var(--clay-border)] backdrop-blur-2xl shadow-[3px_3px_0_var(--accent-glow)] p-1.5 z-50" style={{ borderWidth: '2px' }}
                >
                  {locales.map((loc) => (
                    <button
                      key={loc}
                      onClick={() => { setLocale(loc as Locale); setLangOpen(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        locale === loc
                          ? "bg-purple-500/10 text-purple-500 dark:text-purple-400"
                          : "text-[var(--text-muted)] hover:bg-[var(--section-alt)] hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span className="text-sm">{localeFlags[loc]}</span>
                      <span>{localeNames[loc]}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          {mounted && (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-1 rounded bg-[var(--glass-bg)] border-[var(--clay-border)] backdrop-blur-xl text-[var(--text-secondary)] hover:text-purple-500 hover:border-purple-400/40 transition-all shadow-[2px_2px_0_var(--accent-glow)]" style={{ borderWidth: '2px' }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Sun size={13} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Moon size={13} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
