import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use for ${siteConfig.name}'s portfolio website. Understand the conditions for using this site, intellectual property rights, and disclaimers.`,
  robots: { index: true, follow: true },
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
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
            Terms of Use
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
            (&quot;Site&quot;). By accessing and using this Site at{" "}
            <strong>{siteConfig.url}</strong>, you agree to comply with and be
            bound by the following Terms of Use. If you do not agree with these
            terms, please do not use this Site.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing this Site, you acknowledge that you have read,
            understood, and agree to be bound by these Terms of Use and our{" "}
            <Link href="/privacy" className="text-purple-500 hover:text-purple-400">
              Privacy Policy
            </Link>
            . These terms apply to all visitors, users, and others who access
            the Site.
          </p>

          <h2>2. Intellectual Property Rights</h2>
          <p>
            Unless otherwise stated, all content on this Site — including but
            not limited to text, graphics, logos, images, code snippets, and
            design elements — is the intellectual property of{" "}
            <strong>{siteConfig.name}</strong> and is protected by applicable
            copyright and intellectual property laws.
          </p>
          <ul>
            <li>
              <strong>Portfolio Content</strong> — Project descriptions,
              screenshots, and case studies are provided for informational and
              demonstration purposes. You may reference them with proper
              attribution.
            </li>
            <li>
              <strong>Open Source Code</strong> — Any code explicitly marked as
              open source on GitHub repositories follows the respective license
              terms stated in each repository.
            </li>
            <li>
              <strong>Third-Party Content</strong> — Certifications, badges,
              and logos of third-party organizations (IBM, Google, etc.) remain
              the property of their respective owners and are displayed here
              for credential verification purposes only.
            </li>
          </ul>

          <h2>3. Permitted Use</h2>
          <p>You are permitted to:</p>
          <ul>
            <li>Browse and view the Site for personal, non-commercial purposes</li>
            <li>Share links to the Site or specific sections</li>
            <li>Contact the site owner through the provided contact form</li>
            <li>Reference publicly available portfolio information with attribution</li>
          </ul>

          <h2>4. Prohibited Use</h2>
          <p>You may not:</p>
          <ul>
            <li>
              Reproduce, duplicate, or copy the Site design, layout, or content
              for commercial purposes without prior written consent
            </li>
            <li>
              Use any automated systems (bots, scrapers) to access or collect
              data from the Site
            </li>
            <li>
              Attempt to interfere with, compromise, or disrupt the Site&apos;s
              security or infrastructure
            </li>
            <li>
              Impersonate the site owner or misrepresent any affiliation with
              the site owner
            </li>
          </ul>

          <h2>5. Disclaimer of Warranties</h2>
          <p>
            This Site is provided on an &quot;as is&quot; and &quot;as
            available&quot; basis without any warranties, express or implied.
            The site owner does not warrant that:
          </p>
          <ul>
            <li>The Site will be uninterrupted, secure, or error-free</li>
            <li>All information on the Site is accurate, complete, or current</li>
            <li>
              Any defects or errors will be corrected in a timely manner
            </li>
          </ul>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law,{" "}
            <strong>{siteConfig.name}</strong> shall not be liable for any
            indirect, incidental, special, consequential, or punitive damages
            arising out of or related to your use of, or inability to use, this
            Site. This includes, without limitation, damages for loss of
            profits, goodwill, data, or other intangible losses.
          </p>

          <h2>7. External Links</h2>
          <p>
            This Site may contain links to third-party websites or services
            that are not owned or controlled by the site owner. We have no
            control over, and assume no responsibility for, the content,
            privacy policies, or practices of any third-party websites or
            services. You access third-party sites at your own risk.
          </p>

          <h2>8. Modifications to Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms of Use at any
            time. Changes will be effective immediately upon posting on this
            page. Your continued use of the Site following the posting of
            revised terms constitutes your acceptance of the changes.
          </p>

          <h2>9. Governing Law</h2>
          <p>
            These Terms of Use shall be governed by and construed in accordance
            with the laws of Indonesia, without regard to its conflict of law
            provisions. Any disputes arising from these terms shall be resolved
            in the courts of Jakarta, Indonesia.
          </p>

          <h2>10. Contact Us</h2>
          <p>
            If you have any questions about these Terms of Use, please contact
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
