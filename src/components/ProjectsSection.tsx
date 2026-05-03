"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Globe, Github, Star, Lock, Unlock, MapPinHouse } from "lucide-react";
import Image from "next/image";
import { projectsData, siteConfig } from "@/data/content";
import { useI18n } from "@/i18n";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const projectColors = [
  { gradient: "from-purple-600/20 to-violet-500/10", accent: "text-purple-600 dark:text-purple-400", initial: "text-purple-500/15 group-hover:text-purple-500/25" },
  { gradient: "from-emerald-500/20 to-teal-400/10", accent: "text-emerald-600 dark:text-emerald-400", initial: "text-emerald-500/15 group-hover:text-emerald-500/25" },
  { gradient: "from-teal-500/20 to-cyan-400/10", accent: "text-teal-600 dark:text-teal-400", initial: "text-teal-500/15 group-hover:text-teal-500/25" },
  { gradient: "from-sky-500/20 to-blue-400/10", accent: "text-sky-600 dark:text-sky-400", initial: "text-sky-500/15 group-hover:text-sky-500/25" },
];

// Auto-sliding image carousel for Works projects (bounces: 0→1→2→1→0…)
function WorksSlider({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const seq: number[] = [];
    for (let i = 0; i < images.length; i++) seq.push(i);
    for (let i = images.length - 2; i > 0; i--) seq.push(i);
    let idx = 0;
    const timer = setInterval(() => {
      idx = (idx + 1) % seq.length;
      setCurrent(seq[idx]);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={`${src}-${i}`}
          src={src}
          alt={`Slide ${i + 1}`}
          fill
          className={`object-cover transition-opacity duration-700 ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ))}
    </>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [filter, setFilter] = useState<"all" | "featured" | "works" | "side-b">("all");
  const { t } = useI18n();

  // Parallax for decorative blobs
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  const isWorksProject = (p: (typeof projectsData)[number]) =>
    "type" in p && (p as Record<string, unknown>).type === "works";

  const filtered = (() => {
    let items = [...projectsData];
    if (filter === "featured") items = items.filter((p) => p.featured);
    else if (filter === "works") items = items.filter(isWorksProject);
    else if (filter === "side-b") items = items.filter((p) => !isWorksProject(p));
    // In "all" mode, featured items first
    if (filter === "all") {
      items.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    return items;
  })();

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden" ref={sectionRef}>
      {/* Blurred retina background — with parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div className="absolute top-[15%] left-[15%] w-[450px] h-[450px] bg-violet-600/[0.05] rounded-full blur-[160px]" style={{ y: blobY1 }} />
        <motion.div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-emerald-700/[0.04] rounded-full blur-[140px]" style={{ y: blobY2 }} />
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
          <span className="badge badge-purple mb-3 !bg-purple-800 !text-white">{t.projects.title}</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
            {t.projects.subtitle.includes("side projects") ? (
              <>
                Selected work and{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-purple-800 bg-clip-text text-transparent">
                  {t.projects.sideBDesc}
                </span>
              </>
            ) : (
              t.projects.subtitle
            )}
          </h2>
          <div className="section-divider w-24 mx-auto" />
        </motion.div>

        {/* Filter */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          custom={1}
          className="flex justify-center gap-3 mb-12"
        >
          {([
            { key: "all" as const, label: t.projects.all },
            { key: "featured" as const, label: t.projects.featured },
            { key: "works" as const, label: t.projects.works },
            { key: "side-b" as const, label: t.projects.sideB },
          ]).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1 rounded-lg text-sm font-bold transition-all border-[2px] ${
                filter === f.key
                  ? "tab-active"
                  : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-[var(--section-alt)]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filtered.map((project, i) => {
            const color = projectColors[i % projectColors.length];
            const isWorks = isWorksProject(project);
            const worksImages = "images" in project ? (project as Record<string, unknown>).images as string[] : [];
            const worksLocation = "location" in project ? (project as Record<string, unknown>).location as string : "";
            return (
              <motion.div
                key={project.id}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeInUp}
                custom={i + 2}
                layout
                className="glass-card glass-card-glow overflow-hidden group"
              >
                {/* Thumbnail */}
                <div className={`relative aspect-[2/1] bg-gradient-to-br ${color.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent z-10" />
                  {(() => {
                    // Collect all images: works use `images`, side-b may have array or string `image`
                    const allImages = isWorks
                      ? worksImages
                      : Array.isArray(project.image)
                        ? (project.image as string[]).filter(Boolean)
                        : project.image ? [project.image as string] : [];

                    if (allImages.length > 1) {
                      return <WorksSlider images={allImages} />;
                    } else if (allImages.length === 1) {
                      return (
                        <Image
                          src={allImages[0]}
                          alt={project.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling as HTMLElement;
                            if (fallback) fallback.style.display = 'flex';
                          }}
                        />
                      );
                    }
                    return null;
                  })()}
                  <div className={`absolute inset-0 ${(() => {
                    const allImages = isWorks
                      ? worksImages
                      : Array.isArray(project.image)
                        ? (project.image as string[]).filter(Boolean)
                        : project.image ? [project.image as string] : [];
                    return allImages.length > 0 ? 'hidden' : 'flex';
                  })()} items-center justify-center`}>
                    <div className={`text-6xl font-bold ${color.initial} transition-colors`}>
                      {project.title.split(" ").map((w) => w[0]).join("")}
                    </div>
                  </div>
                  {project.featured && (
                    <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-600 text-white text-xs font-bold border border-purple-400/50 shadow-[2px_2px_0_rgba(107,33,168,0.3)]">
                      <Star size={10} className="fill-current" />
                      <span>{t.projects.featured}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-semibold text-[var(--text-primary)] mb-2 group-hover:${color.accent} transition-colors`}>
                    {project.title}
                  </h3>
                  {isWorks ? (
                    /* Works — show description + location */
                    <>
                      {project.description && (
                        <p className="text-sm text-[var(--text-muted)] mb-3 line-clamp-2">
                          {project.description}
                        </p>
                      )}
                      {worksLocation && (
                        <a
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          className="btn-primary px-3 py-1.5 text-xs inline-flex items-center gap-1 mt-2 cursor-default"
                        >
                          <MapPinHouse size={12} />
                          {worksLocation}
                        </a>
                      )}
                    </>
                  ) : (
                    /* Side-B — full details */
                    <>
                      <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Tags */}
                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] px-2.5 py-1 rounded-lg font-semibold text-[var(--text-primary)] border-[2px] border-[var(--clay-border)]"
                              style={{ background: 'rgba(134,239,172,0.15)' }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Links */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary px-3 py-1.5 text-xs flex items-center gap-1"
                          >
                            <Globe size={12} />
                            {siteConfig.projectLinkLabel || t.projects.liveDemo}
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-cyan px-3 py-1.5 text-xs flex items-center gap-1"
                          >
                            <Github size={12} />
                            {t.projects.sourceCode}
                          </a>
                        )}
                        {("repoVisibility" in project) && (
                          <span
                            className={`px-2.5 py-1.5 text-xs flex items-center gap-1 rounded-lg font-semibold ${
                              project.repoVisibility === "private"
                                ? "bg-red-800 text-white shadow-[0_4px_20px_rgba(153,27,27,0.3)]"
                                : "btn-emerald"
                            }`}
                          >
                            {project.repoVisibility === "private" ? <Lock size={12} /> : <Unlock size={12} />}
                            {project.repoVisibility === "private" ? "Private" : "Public"}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
