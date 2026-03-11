"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  LogOut,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
  FileText,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [originalContent, setOriginalContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check auth
  useEffect(() => {
    fetch("/api/auth/check")
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        setAuthenticated(true);
      })
      .catch(() => router.push("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  // Load content
  const loadContent = useCallback(async () => {
    try {
      const res = await fetch("/api/content");
      const data = await res.json();
      setContent(data.content);
      setOriginalContent(data.content);
    } catch {
      setMessage({ type: "error", text: "Failed to load content" });
    }
  }, []);

  useEffect(() => {
    if (authenticated) loadContent();
  }, [authenticated, loadContent]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.ok) {
        setOriginalContent(content);
        setMessage({ type: "success", text: "Content saved! Run: npm run build && pm2 restart portfolio — to apply changes in production." });
      } else {
        const data = await res.json();
        setMessage({ type: "error", text: data.error || "Failed to save" });
      }
    } catch {
      setMessage({ type: "error", text: "Connection error" });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const hasChanges = content !== originalContent;

  if (loading) {
    return (
      <div className="min-h-screen mesh-gradient flex items-center justify-center">
        <div className="text-[var(--text-muted)] animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div className="min-h-screen mesh-gradient">
      {/* Top bar */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--nav-bg)] border-b border-[var(--card-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-2 rounded-lg hover:bg-[var(--section-alt)] text-[var(--text-muted)] hover:text-purple-400 transition-colors"
            >
              <ArrowLeft size={18} />
            </Link>
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-purple-400" />
              <h1 className="text-lg font-bold text-[var(--text-primary)]">Content Editor</h1>
            </div>
            {hasChanges && (
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                Unsaved changes
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={loadContent}
              className="p-2.5 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)] hover:text-purple-400 transition-colors"
              title="Reload content"
            >
              <RefreshCw size={16} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSave}
              disabled={saving || !hasChanges}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-800 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-purple-900/25 hover:shadow-purple-800/40 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save size={16} />
              {saving ? "Saving..." : "Save"}
            </motion.button>
            <button
              onClick={handleLogout}
              className="p-2.5 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)] hover:text-red-400 hover:border-red-500/30 transition-colors"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Message */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto px-4 sm:px-6 mt-4"
        >
          <div
            className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
              message.type === "success"
                ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
                : "bg-red-500/10 border border-red-500/20 text-red-400"
            }`}
          >
            {message.type === "success" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {message.text}
          </div>
        </motion.div>
      )}

      {/* Editor */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="glass-card overflow-hidden">
          {/* Editor header with help */}
          <div className="px-5 py-3 border-b border-[var(--card-border)] flex items-center justify-between">
            <span className="text-sm text-[var(--text-muted)]">
              src/data/content.ts — Edit your portfolio content below
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              TypeScript / JSON format
            </span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full min-h-[calc(100vh-220px)] p-5 bg-transparent text-[var(--text-primary)] font-mono text-sm leading-relaxed resize-none focus:outline-none placeholder-[var(--text-muted)]"
            placeholder="Loading content..."
            spellCheck={false}
          />
        </div>

        {/* Quick help — comprehensive guide */}
        <div className="mt-4 glass-card p-5">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Quick Guide — Editable Sections</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs text-[var(--text-muted)]">
            <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
              <span className="font-semibold text-purple-400">siteConfig</span>
              <p className="mt-1">Name, title, description, URL, email, location, avatar, all social links (GitHub, LinkedIn, Twitter, etc.)</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <span className="font-semibold text-emerald-400">aboutData</span>
              <p className="mt-1">Headline, intro paragraph, bio, skill categories & items, stats (years, projects, certs, tech count)</p>
            </div>
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
              <span className="font-semibold text-emerald-400">experienceData</span>
              <p className="mt-1">Job history — role, company, URL, location, period, description, highlight bullets, skills. Add unlimited entries.</p>
            </div>
            <div className="p-3 rounded-lg bg-sky-500/5 border border-sky-500/10">
              <span className="font-semibold text-sky-400">projectsData</span>
              <p className="mt-1">Portfolio projects — title, description, image path, tags, live URL, GitHub URL, featured flag. Add unlimited.</p>
            </div>
            <div className="p-3 rounded-lg bg-rose-500/5 border border-rose-500/10">
              <span className="font-semibold text-rose-400">coursesData</span>
              <p className="mt-1">Certificates — title, provider, emoji icon, date, credential URL, description, skill tags. Add unlimited.</p>
            </div>
            <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/10">
              <span className="font-semibold text-amber-400">navTabs</span>
              <p className="mt-1">Navigation menu items. Reorder to change nav order. Each id maps to a page section.</p>
            </div>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-3 leading-relaxed">
            💡 <strong className="text-[var(--text-secondary)]">Safe editing:</strong> Add/remove items in any array (experiences, projects, courses) freely — the UI auto-adapts with consistent colors and layout. Just maintain the TypeScript object structure. See inline comments for examples.
          </p>
        </div>
      </div>
    </div>
  );
}
