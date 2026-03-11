// ============================================================
// PORTFOLIO CONTENT DATA — Edit this file to update everything
// ============================================================
// This file controls ALL portfolio content. Edit from admin panel
// or directly here. After saving, refresh the portfolio to see changes.
//
//   STRUCTURE:
//   roles          → Typewriter roles in Hero section
//   siteConfig     → Name, title, avatar, socials, contact info, quote
//   statsConfig    → Manual stats (Years Experience, Languages)
//   aboutData      → Bio, intro, skills, education, hobbies, other, stats
//   experienceData → Work history (add/remove as needed)
//   projectsData   → Side-B + Works projects (add/remove as needed)
//   coursesData    → Certifications & courses (add/remove as needed)
//   navTabs        → Navigation menu items & order
//   footerData     → Donate links (PayPal, ETH, BTC) & footer links
//
//   TIPS:
//   - You can add as many items to experienceData, projectsData,
//     and coursesData as you want — the UI will adapt automatically.
//   - For project images, place files in /public/projects/ folder.
//   - providerIcon accepts any emoji: 📊🤖🎓☁️📘🐳🔒🧠💡 etc.
//   - Tags/skills should be short (1-3 words) for clean display.
//   - The admin panel edits THIS file — save won't break the layout
//     as long as the TypeScript structure is maintained.
// ============================================================

export const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Cloud Architect",
  "Open Source Contributor",
  "UI/UX Enthusiast",
];

export const siteConfig = {
  // --- Basic Info ---
  name: "ALEX CHEN",
  title: "Software Engineer | Full-Stack Developer | Cloud Architect | Open Source Contributor",
  description: "Built for those who create, not just those who code.",
  heroDescription: "Full-stack engineer crafting scalable web applications and cloud-native solutions. Passionate about open source, developer experience, and building tools that make a difference.",
  url: "https://alexchen.dev",      // Your domain
  email: "hello@alexchen.dev",
  location: "San Francisco, CA",
  campus: "M.Sc. Computer Science",  // optional
  avatar: "/avatar.png",             // Place your photo in /public/avatar.jpg/png/jpeg

  // --- Project Button Labels ---
  projectLinkLabel: "Preview",

  // --- Quote (shown in contact section) ---
  quote: "Let's build something amazing together. I'm always open to exciting collaborations and new challenges.",
  quoteAuthor: "alexchen",

  // --- Social Links ---
  // Add or remove socials additional socials can be added here.
  // Example: tiktok: "https://www.tiktok.com/@yourusername",
  socials: {
    github: "https://github.com/alexchen",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://twitter.com/alexchendev",
    email: "mailto:hello@alexchen.dev",
    instagram: "https://instagram.com/alexchen.dev/",
    youtube: "https://youtube.com/@alexchendev",
    telegram: "https://t.me/alexchendev",
    discord: "https://discord.gg/your-invite",
    medium: "https://medium.com/@alexchen",
    huggingface: "https://huggingface.co/alexchen/",
    tiktok: "https://www.tiktok.com/@yourusername",
    whatsapp: "https://wa.me/country-code+your-number",
    line: "https://line.me/ti/p/your-id",
    reddit: "https://www.reddit.com/user/yourusername",
    facebook: "https://www.facebook.com/yourusername",
    bluesky: "https://bsky.app/profile/yourusername",
    // dribbble: "https://dribbble.com/yourusername",
    // behance: "https://www.behance.net/yourusername",
    // spotify: "https://open.spotify.com/user/yourusername",
    // signal: "https://signal.group/#yourusername",
    // twitch: "https://www.twitch.tv/yourusername",
  },
};

// ============================================================
// STATS CONFIG
// ============================================================
// "Years Experience" and "Languages" are set manually here.
// All other stats (Projects, Certifications, Skills, Hobbies) are auto-counted.
// ============================================================
const statsConfig = {
  yearsExperience: "11+",   // set manually
  languages: "3+",         // set manually (spoken languages)
};

// ============================================================
// ABOUT SECTION
// ============================================================
// headline   → Main heading text
// intro      → Bold opening paragraph
// bio        → Detailed paragraph (supports \n for line breaks)
// skills     → Array of { category, items[] } — add categories freely
// stats      → Array of { label, value } — exactly 4 recommended for grid
// ============================================================
export const aboutData = {
  headline: "Crafted Personal Experience",
  skillsHeading: "Skills",
  intro: `Full-stack software engineer with 8+ years of experience designing and shipping 
  production-grade web applications, microservices, and cloud-native platforms. I specialize in 
  building scalable, maintainable systems using modern JavaScript/TypeScript stacks, with a strong 
  focus on developer experience, CI/CD automation, and infrastructure as code. Trusted by startups 
  and enterprises alike to deliver high-quality software on time.`,

  bio: `Beyond my core engineering work, I actively contribute to open-source projects and 
  participate in the developer community through conference talks, technical writing, and mentoring. 
  My interests span distributed systems, edge computing, and the intersection of AI with software 
  development tooling. I believe in shipping pragmatic solutions that solve real problems while 
  maintaining clean, testable code.`,

  // Add/remove skill categories and items freely
  skills: [
    { category: "Frontend Development", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js", "Svelte", "Framer Motion", "Storybook"] },
    { category: "Backend & APIs", items: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "GraphQL", "REST APIs"] },
    { category: "Cloud & DevOps", items: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Vercel"] },
    { category: "Tools & Workflow", items: ["Git", "VS Code", "Figma", "Jira", "Notion", "Linear"] },
    // { category: "Mobile", items: ["React Native", "Flutter", "Swift"] },  // ← example
  ],

  // Add/remove hobbies categories and items freely
  hobbies: [
    { category: "Sports", items: ["Rock Climbing", "Trail Running", "Surfing", "Basketball"] },
    { category: "Creative", items: ["Digital Art", "Podcasting", "Film Photography", "Piano"] },
    { category: "Tech", items: ["Homelab", "3D Printing", "Mechanical Keyboards", "Retro Gaming"] },
    // { category: "Gaming", items: ["Strategy", "RPG", "Simulation"] }, // ← example
  ],

  // Add/remove other activity categories freely (optional)
  other: [
    { category: "Leadership & Mentoring", items: ["Tech Lead", "Code Reviews", "1-on-1 Mentoring", "Interview Coaching", "Architecture Reviews"] },
    { category: "Speaking & Writing", items: ["Conference Talks", "Technical Blog", "Open Source Docs", "Workshop Facilitation"] },
    { category: "Community", items: ["Local Meetups", "Hackathon Judging", "OSS Maintainer", "Dev Advocacy"] },
    // { category: "Lifestyle", items: ["Cooking", "Traveling", "Gardening"] }, // ← example
  ],

  // Add/remove Education history categories and items freely
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Stanford University",
      year: "2015 – 2017",
      description: "Focus on distributed systems and machine learning.",
    },
    {
      degree: "Bachelor of Computer Engineering",
      institution: "UC Berkeley",
      year: "2011 – 2015",
      description: "Dean's list, focus on algorithms and systems programming.",
    },
    // {
    //   degree: "Master of Science",
    //   institution: "University Name",
    //   year: "2014 – 2016",
    //   description: "Research focus on AI and robotics.",
    // },
  ],

  // Stats — auto-computed after all data arrays are defined (see bottom of file)
  // Only "Years Experience" and "Languages" are set manually in statsConfig above.
  stats: [] as { label: string; value: string }[],
};

// ============================================================
// EXPERIENCE SECTION
// ============================================================
// Add new experiences by copying an existing object and changing values.
// Each item needs: id, role, company, companyUrl, location, jobs, period,
// description, highlights[], skills[]
// ============================================================
export const experienceData = [
  {
    id: "exp-1",
    role: "Senior Software Engineer",
    company: "Stripe",
    companyUrl: "https://stripe.com",
    jobs: "(Full-Time)",
    location: "San Francisco, CA",
    period: "Jan 2022 — Present",
    description: `Leading frontend architecture for the developer dashboard team. Responsible for designing scalable component systems, improving developer experience, and shipping high-impact features used by millions of businesses worldwide.`,
    highlights: [
      "Architected and shipped a new React-based dashboard that reduced page load times by 40% and improved developer satisfaction scores by 25%.",
      "Led migration from legacy jQuery codebase to modern React/TypeScript stack across 50+ pages, establishing patterns adopted by 8 other teams.",
      "Built a real-time webhook debugger with WebSocket streaming, enabling developers to diagnose integration issues 3x faster.",
      "Mentored 4 junior engineers through structured 1-on-1s and code review sessions, with 2 promoted within 18 months.",
    ],
    skills: ["React", "TypeScript", "GraphQL", "Ruby", "WebSockets", "Design Systems"],
  },
  {
    id: "exp-2",
    role: "Full-Stack Engineer",
    company: "Vercel",
    companyUrl: "https://vercel.com",
    jobs: "(Full-Time)",
    location: "Remote",
    period: "Mar 2019 — Dec 2021",
    description: `Core contributor to Next.js framework and Vercel platform. Worked on server-side rendering, edge functions, and deployment infrastructure serving billions of requests monthly.`,
    highlights: [
      "Contributed to Next.js core, implementing ISR (Incremental Static Regeneration) features that became one of the most-used framework capabilities.",
      "Built the initial version of Edge Functions runtime, enabling serverless compute at 30+ global locations with sub-10ms cold starts.",
      "Designed and implemented the project analytics dashboard processing 500M+ data points daily with real-time visualization.",
      "Authored official documentation and tutorials that became the primary learning resource for 100K+ developers.",
    ],
    skills: ["Next.js", "Node.js", "Edge Computing", "Go", "PostgreSQL", "Redis"],
  },
  {
    id: "exp-3",
    role: "Software Engineer",
    company: "GitHub",
    companyUrl: "https://github.com",
    jobs: "(Full-Time)",
    location: "San Francisco, CA",
    period: "Jun 2017 — Feb 2019",
    description: `Worked on the Pull Requests and Code Review team, building features that improved collaboration for 80M+ developers. Focused on performance optimization and accessibility improvements.`,
    highlights: [
      "Shipped the redesigned Pull Request review experience with inline commenting, reducing review cycle time by 35% based on user studies.",
      "Optimized diff rendering performance for large PRs (10K+ lines), achieving 60% reduction in initial render time through virtualization.",
      "Implemented keyboard navigation and screen reader support across the code review interface, meeting WCAG 2.1 AA standards.",
      "Led the adoption of React Testing Library across the team, increasing test coverage from 45% to 85%.",
    ],
    skills: ["React", "Ruby on Rails", "Accessibility", "Performance", "Testing", "Git"],
  },
  {
    id: "exp-4",
    role: "Junior Developer",
    company: "Shopify",
    companyUrl: "https://shopify.com",
    jobs: "(Full-Time)",
    location: "Ottawa, Canada",
    period: "Aug 2015 — May 2017",
    description: `Worked on the storefront rendering engine team, optimizing Liquid template compilation and implementing responsive design patterns for merchant themes.`,
    highlights: [
      "Improved Liquid template rendering performance by 30% through caching optimizations and lazy evaluation techniques.",
      "Built a responsive preview tool allowing merchants to test their storefront across devices directly in the admin dashboard.",
      "Contributed to the Polaris design system, creating 12 reusable React components adopted across 5 internal teams.",
    ],
    skills: ["Ruby", "React", "Liquid", "Performance", "Design Systems", "REST APIs"],
  },
  // --- ADD MORE EXPERIENCE ---
  // Copy the object above and edit the fields:
  // {
  //   id: "exp-5",
  //   role: "Intern Developer",
  //   company: "Another Company",
  //   companyUrl: "https://example.com",
  //   jobs: "(Full-Time)",
  //   location: "City, Country",
  //   period: "Jan 2020 — Dec 2020",
  //   description: "Your description here...",
  //   highlights: ["Point 1", "Point 2"],
  //   skills: ["Tech1", "Tech2"],
  // },
];

// ============================================================
// PROJECTS SECTION
// ============================================================
// Each project: id, title, description, image, tags[], liveUrl, githubUrl, featured, repoVisibility
//
//    Set featured: true for highlighted projects (shown in "Featured" filter).
//    Set repoVisibility: "public" or "private" to show repo badge.
//    Projects auto-get different color accents (purple, orange, green, blue...).
//    For images: place in /public/projects/ and set image: "/projects/myimg.jpg"
// ============================================================
export const projectsData = [
  {
    id: "proj-1",
    title: "Hackathon - Autonomous Construction Robotics Platform",
    description: "Empower facilities to perform autonomous material transport, optimize workflows, and enhance productivity with our intelligent robot fleet management system—delivering measurable results from planning to execution.",
    image: ["/projects/robotic1.png", "/projects/robotic2.png", "/projects/robotic3.png"],
    tags: ["Hackathon", "ROS/Gazebo", "Robotics", "Google AI", "3D/Fleet-Simulation"],
    liveUrl: "https://arcspatial.portaltestnet.com",
    githubUrl: "https://github.com/arcxteam/agent-robotics",
    repoVisibility: "public" as const,
    featured: true,
  },
  {
    id: "proj-2",
    title: "Hackathon - Agentic AI for Data Indexing Platform",
    description: "Arcanum orchestrates intelligent CCTP data‑indexing (USDC-EURC) decisions across 13+ blockchain networks, providing fast access to onchain events and state‑data monitoring",
    image: ["/projects/arcanum1.png", "/projects/arcanum2.png", "/projects/arcanum3.png"],
    tags: ["Hackathon", "Blockchain", "Indexing", "Workflow Analysis", "SmartContract"],
    liveUrl: "https://agent-index.vercel.app/", // https://arcanum.portaltestnet.com
    githubUrl: "https://github.com/arcxteam/agent-index",
    repoVisibility: "public" as const,
    featured: true,
  },
  {
    id: "proj-3",
    title: "Crafted Personal Experience Portfolio",
    description: "Personal portfolio built to showcase projects, skills, and professional background. Features responsive design, project filtering, and dedicated sections for portfolio, about, and contact information.",
    image: ["/projects/homepage1.png", "/projects/homepage2.png", "/projects/homepage3.png"],
    tags: ["My Portfolio", "My Homepage", "About Me", "My Showcase"],
    liveUrl: "https://the-portfolio.vercel.app/",
    githubUrl: "https://github.com/arcxteam/the-portfolio",
    repoVisibility: "public" as const,
    featured: false,
  },
  {
    id: "proj-4",
    title: "Private Generator for Two-Factor Authentication",
    description: "Secure and private 2FA code generator. Generate Two-Factor Authentication codes instantly in your browser with no server storage and no tracking for complete privacy. A self-hosted solution for maximum security—just pure cryptographic protection for your accounts.",
    image: "/projects/draft-image-1200x600.jpg",
    tags: ["2FA", "Cryptography", "Self-Hosted", "Time-based OTP Generator"],
    liveUrl: "https://2fa.studio",
    githubUrl: "https://github.com/arcxteam/the-2fa",
    repoVisibility: "private" as const,
    featured: false,
  },
  {
    id: "proj-5",
    title: "Private Generator for Short URL Links",
    description: "Personalize private short url links. Make it easy to share. Manage dashboard analytics. Add your retargeting custom shorted from multiple platforms.",
    image: ["/projects/shorturl1.png", "/projects/shorturl2.png", "/projects/shorturl3.png"],
    tags: ["Generate Short URL", "URL Shortening", "Custom URLs", "Personalized Links"],
    liveUrl: "https://shortlink.app",
    githubUrl: "https://github.com/arcxteam/the-shorturl",
    repoVisibility: "public" as const,
    featured: true,
  },
  {
    id: "proj-6",
    title: "Private Object Storage with Cloudflare R2",
    description: "Craft your personalized cloud storage buckets, forging a realm of effortless file management and securely by Cloudflare R2 & compatibility with Amazon S3.",
    image: ["/projects/storage1.png", "/projects/storage2.png", "/projects/storage3.png"],
    tags: ["Cloud Storage", "R2", "AWS S3", "Storage Management", "Database"],
    liveUrl: "https://arcxteam.github.io/cloudflare-storage/frontend/",
    githubUrl: "https://github.com/arcxteam/cloudflare-storage",
    repoVisibility: "public" as const,
    featured: true,
  },

  // --- WORKS — Professional Projects ---
  // type: "works" → shown in Works filter tab
  // images: array of photos for auto-slide carousel
  // location: project site location
  {
    id: "work-1",
    title: "Enterprise Payment Gateway Redesign",
    description: "Led the complete frontend redesign of a payment gateway processing $2B+ annually. Modernized the merchant dashboard with real-time analytics, improved checkout conversion by 18%.",
    images: ["/projects/work1.png", "/projects/work2.png"],
    location: "Stripe — San Francisco, CA",
    type: "works" as const,
    featured: true,
  },
  {
    id: "work-2",
    title: "Edge Runtime Infrastructure",
    description: "Designed and built the runtime infrastructure for deploying serverless functions at the edge across 30+ global locations, achieving sub-10ms cold start times.",
    images: ["/projects/work3.png", "/projects/work4.png"],
    location: "Vercel — Fulltime",
    type: "works" as const,
    featured: true,
  },

  // --- ADD MORE PROJECTS ---
  // Side-B (tech) project:
  // {
  //   id: "proj-7",
  //   title: "Your Project Name",
  //   description: "Short description...",
  //   image: "/projects/project7.jpg",
  //   tags: ["Tag1", "Tag2"],
  //   liveUrl: "https://your-project.com",
  //   githubUrl: "https://github.com/you/project",
  //   repoVisibility: "public" as const,
  //   featured: true,
  // },
  // Works (Professional) project:
  // {
  //   id: "work-3",
  //   title: "Your Professional Project",
  //   description: "Short description...",
  //   images: ["/projects/img1.jpg", "/projects/img2.jpg", "/projects/img3.jpg"],
  //   location: "City, Country",
  //   type: "works" as const,
  //   featured: false,
  // },
];

// ============================================================
// COURSES & CERTIFICATES SECTION
// ============================================================
// Each course: id, title, provider, providerIcon (emoji), date,
// credentialUrl, description, skills[]
//
//    Icons: use any emoji 📊 🤖 🎓 ☁️ 📘 🐳 🔒 🧠 💡 🌐 🎯
//    Add unlimited certificates — the grid adapts automatically.
//    Each card gets a unique color accent.
// ============================================================
export const coursesData = [
  {
    id: "cert-1",
    title: "AWS Solutions Architect — Professional",
    provider: "Amazon Web Services",
    providerIcon: "☁️",
    date: "2025",
    credentialUrl: "https://aws.amazon.com/certification/verify",
    description: "Demonstrated advanced knowledge of designing distributed systems on AWS, including multi-account strategies, cost optimization, and high-availability architectures.",
    skills: ["AWS", "Cloud Architecture", "Infrastructure", "Networking"],
  },
  {
    id: "cert-2",
    title: "Certified Kubernetes Administrator (CKA)",
    provider: "Cloud Native Computing Foundation",
    providerIcon: "🐳",
    date: "2024",
    credentialUrl: "https://training.linuxfoundation.org/certification/verify",
    description: "Validated expertise in Kubernetes cluster administration, including installation, networking, storage, security, and troubleshooting in production environments.",
    skills: ["Kubernetes", "Container Orchestration", "Networking", "Security"],
  },
  {
    id: "cert-3",
    title: "Google Cloud Professional Data Engineer",
    provider: "Google Cloud",
    providerIcon: "📊",
    date: "2024",
    credentialUrl: "https://cloud.google.com/certification/verify",
    description: "Certified in designing and building data processing systems on Google Cloud, including BigQuery, Dataflow, and Pub/Sub for real-time analytics pipelines.",
    skills: ["BigQuery", "Dataflow", "Data Pipelines", "ML Engineering"],
  },
  {
    id: "cert-4",
    title: "Meta Front-End Developer Professional Certificate",
    provider: "Meta (via Coursera)",
    providerIcon: "🎓",
    date: "2023",
    credentialUrl: "https://coursera.org/verify/professional-cert",
    description: "Completed comprehensive training in modern frontend development including React, responsive design, version control, and UX/UI principles.",
    skills: ["React", "JavaScript", "CSS", "UX/UI", "Version Control"],
  },
  {
    id: "cert-5",
    title: "HashiCorp Terraform Associate",
    provider: "HashiCorp",
    providerIcon: "🔒",
    date: "2023",
    credentialUrl: "https://hashicorp.com/certification/verify",
    description: "Demonstrated proficiency in Infrastructure as Code principles using Terraform, including state management, modules, providers, and multi-cloud deployments.",
    skills: ["Terraform", "IaC", "Multi-Cloud", "State Management"],
  },
  {
    id: "cert-6",
    title: "GitHub Actions & Advanced CI/CD",
    provider: "GitHub",
    providerIcon: "🤖",
    date: "2023",
    credentialUrl: "https://github.com/certification/verify",
    description: "Certified in building advanced CI/CD pipelines with GitHub Actions, including matrix builds, reusable workflows, container deployment, and security scanning.",
    skills: ["GitHub Actions", "CI/CD", "Docker", "Security Scanning"],
  },
  // --- ADD MORE COURSES/CERTS ---
  // {
  //   id: "cert-7",
  //   title: "Your Certificate Name",
  //   provider: "Platform Name",
  //   providerIcon: "🎯",
  //   date: "2026",
  //   credentialUrl: "https://example.com/cert",
  //   description: "Brief description...",
  //   skills: ["Skill1", "Skill2", "Skill3"],
  // },
];

// ============================================================
// NAVIGATION TABS
// ============================================================
// These map to section IDs. You can reorder them here to change
// the navigation order. Adding a new section requires creating
// the corresponding component and section with matching id.
// ============================================================
export const navTabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "courses", label: "Courses" },
  { id: "contact", label: "Contact" },
];

// ============================================================
// FOOTER DATA
// ============================================================
// Support / Donate links — shown in footer "Buy Me a Coffee" section
// Fill in your wallet addresses or payment URLs
// ============================================================

export const footerData = {
  // --- Support / Donate ---
  donate: {
    paypal: "https://paypal.me/alexchen",
    paypalQr: "/projects/paypal-address.png",        // PayPal QR code image path
    eth: "0x1234567890abcdef1234567890abcdef12345678",
    ethQr: "/projects/eth-address.png",               // QR code image path
    btc: "bc1qexampleaddress1234567890abcdefghijk", // Bitcoin native segwit (bc1qxxx)
    btcQr: "/projects/btc-address.png",               // QR code image path
  },
  // --- Footer Links ---
  links: [
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Terms of Use", url: "/terms" },
    { label: "Sitemap", url: "/sitemap.xml" },
  ],
};

// ============================================================
// STATS ASSIGNMENT — auto-computed (do not edit here, edit statsConfig above)
// ============================================================
const totalSkills = aboutData.skills.reduce((sum, g) => sum + g.items.length, 0);
const totalHobbies = (aboutData.hobbies || []).reduce((sum, g) => sum + g.items.length, 0);

aboutData.stats = [
  { label: "Years Experience", value: statsConfig.yearsExperience },
  { label: "Project Showcase", value: `${projectsData.length}+` },
  { label: "Certifications", value: `${coursesData.length}+` },
  { label: "Skills", value: `${totalSkills}+` },
  { label: "Languages", value: statsConfig.languages },
  { label: "Hobbies", value: `${totalHobbies}+` },
];
