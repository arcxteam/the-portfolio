import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}'s portfolio website. Learn how we handle your data, cookies, and third-party services.`,
  robots: { index: true, follow: true },
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  const lastUpdated = "May 3, 2026";

  return (
    <main className="min-h-screen relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
        {/* Back navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-purple-500 transition-colors font-medium mb-8"
        >
          ← Back to Portfolio
        </Link>

        {/* Header */}
        <div className="glass-card p-6 sm:p-10 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Last updated: {lastUpdated}
          </p>
          <div className="section-divider mt-6 w-24" />
        </div>

        {/* Content */}
        <article className="glass-card p-6 sm:p-10 prose-portfolio">
          <p>
            Welcome to <strong>{siteConfig.name}</strong>&apos;s portfolio website
            (&quot;Site&quot;). Your privacy is important to us. This Privacy Policy
            explains how we collect, use, and protect your information when you
            visit <strong>{siteConfig.url}</strong>.
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            This Site is primarily a static portfolio website. We collect minimal
            data to ensure a smooth browsing experience:
          </p>
          <ul>
            <li>
              <strong>Contact Form Data</strong> — If you use the contact form,
              we collect your name, email address, and message content. This
              information is used solely to respond to your inquiry.
            </li>
            <li>
              <strong>Analytics Data</strong> — We use{" "}
              <strong>Vercel Analytics</strong> to collect anonymized usage data
              such as page views, browser type, device type, and approximate
              geographic location. This data does not personally identify you.
            </li>
            <li>
              <strong>Cookies &amp; Local Storage</strong> — We use local
              storage to remember your theme preference (light/dark mode) and
              language selection. No tracking cookies are used.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>The information collected is used for the following purposes:</p>
          <ul>
            <li>To respond to inquiries submitted through the contact form</li>
            <li>To analyze site traffic and improve user experience</li>
            <li>To maintain your display preferences across visits</li>
          </ul>

          <h2>3. Third-Party Services</h2>
          <p>This Site uses the following third-party services:</p>
          <ul>
            <li>
              <strong>Vercel</strong> — Hosting and analytics. Vercel&apos;s
              privacy policy can be found at{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                vercel.com/legal/privacy-policy
              </a>
            </li>
            <li>
              <strong>Google Fonts</strong> — Web fonts are loaded from
              Google&apos;s servers. Google&apos;s privacy policy applies to
              font loading requests.
            </li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We take reasonable measures to protect the information provided to
            us. However, no method of transmission over the Internet is 100%
            secure. While we strive to protect your personal information, we
            cannot guarantee its absolute security.
          </p>

          <h2>5. External Links</h2>
          <p>
            This Site contains links to external websites (GitHub, LinkedIn,
            social media, etc.). We are not responsible for the privacy practices
            or content of these external sites. We encourage you to review the
            privacy policies of any third-party sites you visit.
          </p>

          <h2>6. Children&apos;s Privacy</h2>
          <p>
            This Site is not directed at individuals under the age of 13. We do
            not knowingly collect personal information from children. If you
            believe we have inadvertently collected such information, please
            contact us immediately.
          </p>

          <h2>7. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date. Your
            continued use of the Site after changes constitutes acceptance of the
            updated policy.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </li>
            <li>Location: {siteConfig.location}</li>
          </ul>
        </article>
      </div>
    </main>
  );
}
