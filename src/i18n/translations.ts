// ============================================================
// INTERNATIONALIZATION (i18n) SYSTEM
// Supports: EN, JP, ZH, ID, AR, RU, DE, FR
// ============================================================

export const locales = ["en", "ja", "zh", "id", "ar", "ru", "de", "fr"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  ja: "日本語",
  zh: "中文",
  id: "Indonesia",
  ar: "العربية",
  ru: "Русский",
  de: "Deutsch",
  fr: "Français",
};

export const localeFlags: Record<Locale, string> = {
  en: "en",
  ja: "🇯🇵",
  zh: "🇨🇳",
  id: "🇮🇩",
  ar: "🇸🇦",
  ru: "🇷🇺",
  de: "🇩🇪",
  fr: "🇫🇷",
};

export type TranslationKeys = {
  nav: {
    home: string;
    about: string;
    experience: string;
    projects: string;
    courses: string;
    contact: string;
  };
  hero: {
    greeting: string;
    iam: string;
    subtitle: string;
    description: string;
    viewWork: string;
    getInTouch: string;
    scrollDown: string;
    careerDashboard: string;
    professionalOverview: string;
    experienceProgress: string;
    explorePortfolio: string;
    years: string;
  };
  about: {
    title: string;
    headline: string;
    skills: string;
    education: string;
    hobbies: string;
    other: string;
    stats: {
      years: string;
      projects: string;
      certs: string;
      tech: string;
    };
  };
  experience: {
    title: string;
    subtitle: string;
    present: string;
  };
  projects: {
    title: string;
    subtitle: string;
    all: string;
    featured: string;
    works: string;
    sideB: string;
    sideBDesc: string;
    liveDemo: string;
    sourceCode: string;
  };
  courses: {
    title: string;
    subtitle: string;
    all: string;
    viewCert: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    location: string;
    emailLabel: string;
    social: string;
  };
  footer: {
    builtWith: string;
    rights: string;
    buyMeCoffee: string;
  };
};

const translations: Record<Locale, TranslationKeys> = {
  en: {
    nav: { home: "Home", about: "About", experience: "Experience", projects: "Projects", courses: "Certified", contact: "Contact" },
    hero: { greeting: "Hello, I'm", iam: "I am", subtitle: "Full-Stack Developer & Creative Technologist", description: "Building elegant digital experiences with modern web technologies. Passionate about clean code, beautiful design, and innovative solutions.", viewWork: "View My Work", getInTouch: "Get In Touch", scrollDown: "Scroll Down", careerDashboard: "Career Dashboard", professionalOverview: "Professional Overview", experienceProgress: "Experience Progress", explorePortfolio: "Explore Portfolio", years: "Years" },
    about: { title: "About Me", headline: "Crafting Digital Experiences", skills: "Skills & Technologies", education: "Education", hobbies: "Hobbies", other: "Other", stats: { years: "Years Experience", projects: "Projects Completed", certs: "Certifications", tech: "Technologies" } },
    experience: { title: "Experience", subtitle: "My professional journey and career highlights", present: "Present" },
    projects: { title: "Projects", subtitle: "Selected work and side projects", all: "All", featured: "Featured", works: "Works", sideB: "Side-B", sideBDesc: "side-B projects", liveDemo: "Live Demo", sourceCode: "Source Code" },
    courses: { title: "Courses & Certificates", subtitle: "Continuous learning and professional development", all: "All", viewCert: "Credential Certificate" },
    contact: { title: "Get In Touch", subtitle: "Have a project in mind? Let's work together.", name: "Your Name", email: "Your Email", message: "Your Message", send: "Send Message", sending: "Sending...", success: "Message sent successfully!", location: "Location", emailLabel: "Email", social: "Social" },
    footer: { builtWith: "Built with", rights: "All rights reserved.", buyMeCoffee: "Buy Me a Coffee" },
  },
  ja: {
    nav: { home: "ホーム", about: "概要", experience: "経歴", projects: "プロジェクト", courses: "資格", contact: "連絡先" },
    hero: { greeting: "こんにちは、", iam: "私は", subtitle: "フルスタック開発者 & クリエイティブテクノロジスト", description: "モダンなウェブ技術でエレガントなデジタル体験を構築しています。クリーンなコード、美しいデザイン、革新的なソリューションに情熱を注いでいます。", viewWork: "作品を見る", getInTouch: "連絡する", scrollDown: "スクロール", careerDashboard: "キャリアダッシュボード", professionalOverview: "プロフェッショナル概要", experienceProgress: "経験の進捗", explorePortfolio: "ポートフォリオを見る", years: "年" },
    about: { title: "自己紹介", headline: "デジタル体験の創造", skills: "スキル & テクノロジー", education: "学歴", hobbies: "趣味", other: "その他", stats: { years: "年の経験", projects: "完成プロジェクト", certs: "認定資格", tech: "テクノロジー" } },
    experience: { title: "経歴", subtitle: "プロフェッショナルとしての歩み", present: "現在" },
    projects: { title: "プロジェクト", subtitle: "選りすぐりの作品とサイドプロジェクト", all: "すべて", featured: "おすすめ", works: "実績", sideB: "サイドB", sideBDesc: "サイドプロジェクト", liveDemo: "デモ", sourceCode: "ソースコード" },
    courses: { title: "コース & 認定", subtitle: "継続的な学習と専門能力の開発", all: "すべて", viewCert: "Credential Certificate" },
    contact: { title: "お問い合わせ", subtitle: "プロジェクトをお考えですか？一緒に働きましょう。", name: "お名前", email: "メールアドレス", message: "メッセージ", send: "送信", sending: "送信中...", success: "メッセージが送信されました！", location: "場所", emailLabel: "メール", social: "ソーシャル" },
    footer: { builtWith: "使用技術", rights: "全著作権所有", buyMeCoffee: "コーヒーをおごる" },
  },
  zh: {
    nav: { home: "首页", about: "关于", experience: "经历", projects: "项目", courses: "证书", contact: "联系" },
    hero: { greeting: "你好，我是", iam: "我是", subtitle: "全栈开发者 & 创意技术专家", description: "用现代网络技术构建优雅的数字体验。热衷于简洁代码、美丽设计和创新解决方案。", viewWork: "查看作品", getInTouch: "联系我", scrollDown: "向下滚动", careerDashboard: "职业仪表盘", professionalOverview: "专业概览", experienceProgress: "经验进度", explorePortfolio: "探索作品集", years: "年" },
    about: { title: "关于我", headline: "打造数字体验", skills: "技能 & 技术", education: "教育", hobbies: "爱好", other: "其他", stats: { years: "年经验", projects: "完成项目", certs: "认证证书", tech: "掌握技术" } },
    experience: { title: "工作经历", subtitle: "我的职业历程和亮点", present: "至今" },
    projects: { title: "项目作品", subtitle: "精选作品和个人项目", all: "全部", featured: "精选", works: "作品", sideB: "副项目", sideBDesc: "副项目", liveDemo: "在线演示", sourceCode: "源代码" },
    courses: { title: "课程 & 证书", subtitle: "持续学习和专业发展", all: "全部", viewCert: "Credential Certificate" },
    contact: { title: "联系我", subtitle: "有项目想法？让我们一起合作。", name: "姓名", email: "邮箱", message: "留言", send: "发送", sending: "发送中...", success: "消息发送成功！", location: "位置", emailLabel: "邮箱", social: "社交" },
    footer: { builtWith: "技术栈", rights: "版权所有", buyMeCoffee: "请我喝咖啡" },
  },
  id: {
    nav: { home: "Beranda", about: "Tentang", experience: "Pengalaman", projects: "Proyek", courses: "Sertifikat", contact: "Kontak" },
    hero: { greeting: "Halo, saya", iam: "Saya adalah", subtitle: "Full-Stack Developer & Creative Technologist", description: "Membangun pengalaman digital yang elegan dengan teknologi web modern. Bersemangat tentang kode bersih, desain yang indah, dan solusi inovatif.", viewWork: "Lihat Karya", getInTouch: "Hubungi Saya", scrollDown: "Gulir ke Bawah", careerDashboard: "Dasbor Karir", professionalOverview: "Ikhtisar Profesional", experienceProgress: "Progres Pengalaman", explorePortfolio: "Jelajahi Portofolio", years: "Tahun" },
    about: { title: "Tentang Saya", headline: "Menciptakan Pengalaman Digital", skills: "Keahlian & Teknologi", education: "Pendidikan", hobbies: "Hobi", other: "Lainnya", stats: { years: "Tahun Pengalaman", projects: "Proyek Selesai", certs: "Sertifikasi", tech: "Teknologi" } },
    experience: { title: "Pengalaman", subtitle: "Perjalanan profesional dan pencapaian karir", present: "Sekarang" },
    projects: { title: "Proyek", subtitle: "Karya pilihan dan proyek sampingan", all: "Semua", featured: "Unggulan", works: "Karya", sideB: "Side-B", sideBDesc: "proyek sampingan", liveDemo: "Demo Langsung", sourceCode: "Kode Sumber" },
    courses: { title: "Kursus & Sertifikat", subtitle: "Pembelajaran berkelanjutan dan pengembangan profesional", all: "Semua", viewCert: "Credential Certificate" },
    contact: { title: "Hubungi Saya", subtitle: "Punya proyek? Mari bekerja sama.", name: "Nama Anda", email: "Email Anda", message: "Pesan Anda", send: "Kirim Pesan", sending: "Mengirim...", success: "Pesan berhasil dikirim!", location: "Lokasi", emailLabel: "Email", social: "Sosial" },
    footer: { builtWith: "Dibuat dengan", rights: "Hak cipta dilindungi.", buyMeCoffee: "Traktir Kopi" },
  },
  ar: {
    nav: { home: "الرئيسية", about: "عني", experience: "الخبرة", projects: "المشاريع", courses: "الشهادات", contact: "اتصل" },
    hero: { greeting: "مرحباً، أنا", iam: "أنا", subtitle: "مطور متكامل ومبتكر تقني", description: "بناء تجارب رقمية أنيقة بتقنيات الويب الحديثة. شغوف بالكود النظيف والتصميم الجميل والحلول المبتكرة.", viewWork: "شاهد أعمالي", getInTouch: "تواصل معي", scrollDown: "مرر للأسفل", careerDashboard: "لوحة المهنة", professionalOverview: "نظرة مهنية", experienceProgress: "تقدم الخبرة", explorePortfolio: "استكشف المحفظة", years: "سنوات" },
    about: { title: "عني", headline: "إبداع التجارب الرقمية", skills: "المهارات والتقنيات", education: "التعليم", hobbies: "الهوايات", other: "أخرى", stats: { years: "سنوات الخبرة", projects: "مشاريع مكتملة", certs: "شهادات", tech: "تقنيات" } },
    experience: { title: "الخبرة", subtitle: "مسيرتي المهنية وأبرز الإنجازات", present: "الحاضر" },
    projects: { title: "المشاريع", subtitle: "أعمال مختارة ومشاريع جانبية", all: "الكل", featured: "مميز", works: "أعمال", sideB: "جانبي", sideBDesc: "مشاريع جانبية", liveDemo: "عرض مباشر", sourceCode: "الكود المصدري" },
    courses: { title: "الدورات والشهادات", subtitle: "التعلم المستمر والتطوير المهني", all: "الكل", viewCert: "Credential Certificate" },
    contact: { title: "تواصل معي", subtitle: "لديك مشروع؟ دعنا نعمل معاً.", name: "اسمك", email: "بريدك الإلكتروني", message: "رسالتك", send: "إرسال", sending: "جاري الإرسال...", success: "تم إرسال الرسالة بنجاح!", location: "الموقع", emailLabel: "البريد", social: "التواصل" },
    footer: { builtWith: "بُني بواسطة", rights: "جميع الحقوق محفوظة.", buyMeCoffee: "اشترِ لي قهوة" },
  },
  ru: {
    nav: { home: "Главная", about: "Обо мне", experience: "Опыт", projects: "Проекты", courses: "Курсы", contact: "Контакты" },
    hero: { greeting: "Привет, я", iam: "Я", subtitle: "Full-Stack разработчик и креативный технолог", description: "Создаю элегантные цифровые продукты с помощью современных веб-технологий. Увлечён чистым кодом, красивым дизайном и инновационными решениями.", viewWork: "Смотреть работы", getInTouch: "Связаться", scrollDown: "Прокрутить вниз", careerDashboard: "Карьерная панель", professionalOverview: "Профессиональный обзор", experienceProgress: "Прогресс опыта", explorePortfolio: "Изучить портфолио", years: "лет" },
    about: { title: "Обо мне", headline: "Создание цифровых впечатлений", skills: "Навыки и технологии", education: "Образование", hobbies: "Хобби", other: "Другое", stats: { years: "Лет опыта", projects: "Завершённых проектов", certs: "Сертификатов", tech: "Технологий" } },
    experience: { title: "Опыт работы", subtitle: "Мой профессиональный путь и достижения", present: "Настоящее" },
    projects: { title: "Проекты", subtitle: "Избранные работы и пет-проекты", all: "Все", featured: "Избранное", works: "Работы", sideB: "Побочные", sideBDesc: "побочные проекты", liveDemo: "Демо", sourceCode: "Исходный код" },
    courses: { title: "Курсы и сертификаты", subtitle: "Непрерывное обучение и профессиональное развитие", all: "Все", viewCert: "Credential Certificate" },
    contact: { title: "Связаться со мной", subtitle: "Есть проект? Давайте работать вместе.", name: "Ваше имя", email: "Ваш email", message: "Сообщение", send: "Отправить", sending: "Отправка...", success: "Сообщение отправлено!", location: "Местоположение", emailLabel: "Почта", social: "Соцсети" },
    footer: { builtWith: "Сделано с", rights: "Все права защищены.", buyMeCoffee: "Угостить кофе" },
  },
  de: {
    nav: { home: "Startseite", about: "Über mich", experience: "Erfahrung", projects: "Projekte", courses: "Zertifikate", contact: "Kontakt" },
    hero: { greeting: "Hallo, ich bin", iam: "Ich bin", subtitle: "Full-Stack-Entwickler & Kreativtechnologe", description: "Elegante digitale Erlebnisse mit modernen Webtechnologien gestalten. Leidenschaft für sauberen Code, schönes Design und innovative Lösungen.", viewWork: "Arbeit ansehen", getInTouch: "Kontakt aufnehmen", scrollDown: "Nach unten scrollen", careerDashboard: "Karriere-Dashboard", professionalOverview: "Professionelle Übersicht", experienceProgress: "Erfahrungsfortschritt", explorePortfolio: "Portfolio erkunden", years: "Jahre" },
    about: { title: "Über mich", headline: "Digitale Erlebnisse gestalten", skills: "Fähigkeiten & Technologien", education: "Bildung", hobbies: "Hobbys", other: "Sonstiges", stats: { years: "Jahre Erfahrung", projects: "Abgeschlossene Projekte", certs: "Zertifizierungen", tech: "Technologien" } },
    experience: { title: "Erfahrung", subtitle: "Mein beruflicher Werdegang und Karrierehighlights", present: "Gegenwart" },
    projects: { title: "Projekte", subtitle: "Ausgewählte Arbeiten und Nebenprojekte", all: "Alle", featured: "Empfohlen", works: "Arbeiten", sideB: "Nebenprojekte", sideBDesc: "Nebenprojekte", liveDemo: "Live-Demo", sourceCode: "Quellcode" },
    courses: { title: "Kurse & Zertifikate", subtitle: "Kontinuierliches Lernen und berufliche Entwicklung", all: "Alle", viewCert: "Credential Certificate" },
    contact: { title: "Kontakt", subtitle: "Ein Projekt im Sinn? Lassen Sie uns zusammenarbeiten.", name: "Ihr Name", email: "Ihre E-Mail", message: "Ihre Nachricht", send: "Nachricht senden", sending: "Wird gesendet...", success: "Nachricht wurde gesendet!", location: "Standort", emailLabel: "E-Mail", social: "Soziale Medien" },
    footer: { builtWith: "Erstellt mit", rights: "Alle Rechte vorbehalten.", buyMeCoffee: "Kaffee spendieren" },
  },
  fr: {
    nav: { home: "Accueil", about: "À propos", experience: "Expérience", projects: "Projets", courses: "Certificats", contact: "Contact" },
    hero: { greeting: "Bonjour, je suis", iam: "Je suis", subtitle: "Développeur Full-Stack & Technologue Créatif", description: "Création d'expériences numériques élégantes avec les technologies web modernes. Passionné par le code propre, le beau design et les solutions innovantes.", viewWork: "Voir mes travaux", getInTouch: "Me contacter", scrollDown: "Défiler vers le bas", careerDashboard: "Tableau de bord carrière", professionalOverview: "Aperçu professionnel", experienceProgress: "Progression de l'expérience", explorePortfolio: "Explorer le portfolio", years: "ans" },
    about: { title: "À propos", headline: "Créer des expériences numériques", skills: "Compétences & Technologies", education: "Formation", hobbies: "Loisirs", other: "Autre", stats: { years: "Années d'expérience", projects: "Projets terminés", certs: "Certifications", tech: "Technologies" } },
    experience: { title: "Expérience", subtitle: "Mon parcours professionnel et mes réalisations", present: "Présent" },
    projects: { title: "Projets", subtitle: "Travaux sélectionnés et projets personnels", all: "Tous", featured: "En vedette", works: "Travaux", sideB: "Side-B", sideBDesc: "projets personnels", liveDemo: "Démo", sourceCode: "Code source" },
    courses: { title: "Cours & Certificats", subtitle: "Apprentissage continu et développement professionnel", all: "Tous", viewCert: "Credential Certificate" },
    contact: { title: "Me contacter", subtitle: "Un projet en tête ? Travaillons ensemble.", name: "Votre nom", email: "Votre email", message: "Votre message", send: "Envoyer", sending: "Envoi en cours...", success: "Message envoyé avec succès !", location: "Localisation", emailLabel: "Email", social: "Réseaux sociaux" },
    footer: { builtWith: "Créé avec", rights: "Tous droits réservés.", buyMeCoffee: "Offrir un café" },
  },
};

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations.en;
}

export const defaultLocale: Locale = "en";
