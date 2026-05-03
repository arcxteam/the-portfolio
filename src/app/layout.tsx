import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Providers } from "./providers";
import { siteConfig } from "@/data/content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.heroDescription,
  keywords: [
    "portfolio website",
    "developer portfolio",
    "personal website",
    "full-stack developer",
    "creative technologist",
    "projects showcase",
    "professional resume",
    "web developer portfolio",
    "modern portfolio template",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.heroDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.title}`,
    description: siteConfig.heroDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // ============================================================
  // GOOGLE SEARCH CONSOLE VERIFICATION
  // ============================================================
  verification: {
    google: "oDFlh7WDYSPDRGwKyqw8lhzn8Wy7J_dL_EWutUkQkyg",
  },
};

// JSON-LD Structured Data — Person schema for rich snippets
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  jobTitle: "Full-Stack Developer & Creative Technologist",
  description: siteConfig.heroDescription,
  sameAs: Object.values(siteConfig.socials).filter(
    (url) => typeof url === "string" && url.startsWith("http")
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${jetbrains.variable} antialiased noise-overlay`}
      >
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
