"use client";

import {
  siGithub,
  siX,
  siInstagram,
  siYoutube,
  siTelegram,
  siDiscord,
  siMedium,
  siReddit,
  siFacebook,
  siTiktok,
  siThreads,
  siBluesky,
  siMastodon,
  siWhatsapp,
  siLine,
  siGmail,
  siSignal,
  siStackoverflow,
  siTwitch,
  siSpotify,
  siDribbble,
  siBehance,
  siHashnode,
  siDevdotto,
  siKaggle,
  siHuggingface,
  siPaypal,
  siEthereum,
  siBitcoin,
} from "simple-icons";

// LinkedIn SVG (not in simple-icons v16+)
const linkedinPath =
  "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z";

// Mail SVG path
const mailPath =
  "M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z";

type SimpleIcon = { title: string; slug: string; hex: string; svg: string; path: string };

const iconMap: Record<string, SimpleIcon | { path: string; title: string }> = {
  github: siGithub,
  linkedin: { path: linkedinPath, title: "LinkedIn" },
  twitter: siX,
  x: siX,
  instagram: siInstagram,
  youtube: siYoutube,
  telegram: siTelegram,
  discord: siDiscord,
  medium: siMedium,
  reddit: siReddit,
  facebook: siFacebook,
  tiktok: siTiktok,
  threads: siThreads,
  bluesky: siBluesky,
  mastodon: siMastodon,
  whatsapp: siWhatsapp,
  line: siLine,
  gmail: siGmail,
  email: { path: mailPath, title: "Email" },
  signal: siSignal,
  stackoverflow: siStackoverflow,
  twitch: siTwitch,
  spotify: siSpotify,
  dribbble: siDribbble,
  behance: siBehance,
  hashnode: siHashnode,
  devto: siDevdotto,
  kaggle: siKaggle,
  huggingface: siHuggingface,
  paypal: siPaypal,
  ethereum: siEthereum,
  eth: siEthereum,
  bitcoin: siBitcoin,
  btc: siBitcoin,
};

export function SocialIcon({ name, size = 20 }: { name: string; size?: number }) {
  const icon = iconMap[name.toLowerCase()];
  if (!icon) {
    // Fallback: first letter circle
    return (
      <span
        className="inline-flex items-center justify-center font-bold text-current uppercase"
        style={{ width: size, height: size, fontSize: size * 0.6 }}
      >
        {name[0]}
      </span>
    );
  }

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={size}
      height={size}
      aria-label={icon.title}
    >
      <path d={icon.path} />
    </svg>
  );
}

export function getSocialLabel(key: string): string {
  const labels: Record<string, string> = {
    github: "GitHub",
    linkedin: "LinkedIn",
    twitter: "X (Twitter)",
    x: "X",
    instagram: "Instagram",
    youtube: "YouTube",
    telegram: "Telegram",
    discord: "Discord",
    medium: "Medium",
    reddit: "Reddit",
    facebook: "Facebook",
    tiktok: "TikTok",
    threads: "Threads",
    bluesky: "Bluesky",
    mastodon: "Mastodon",
    whatsapp: "WhatsApp",
    line: "LINE",
    email: "Email",
    gmail: "Gmail",
    signal: "Signal",
    stackoverflow: "Stack Overflow",
    twitch: "Twitch",
    spotify: "Spotify",
    dribbble: "Dribbble",
    behance: "Behance",
    hashnode: "Hashnode",
    devto: "DEV.to",
    kaggle: "Kaggle",
    huggingface: "Hugging Face",
  };
  return labels[key.toLowerCase()] || key.charAt(0).toUpperCase() + key.slice(1);
}
