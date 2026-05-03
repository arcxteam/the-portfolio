"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, Coffee, Copy, Check, X } from "lucide-react";
import { siteConfig, footerData } from "@/data/content";
import { useI18n } from "@/i18n";
import { SocialIcon } from "@/components/SocialIcon";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="shrink-0 p-0.5 rounded hover:bg-[var(--glass-bg)] transition-colors"
      title="Copy address"
    >
      {copied ? (
        <Check size={10} className="text-emerald-400" />
      ) : (
        <Copy size={10} className="text-[var(--text-muted)] opacity-60 hover:opacity-100" />
      )}
    </button>
  );
}

function QrModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative bg-white rounded-xl p-4 shadow-2xl max-w-[320px]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-3 -right-3 bg-gray-800 text-white rounded-full p-1 hover:bg-gray-700 transition-colors shadow-lg"
          >
            <X size={16} />
          </button>
          <Image
            src={src}
            alt={alt}
            width={480}
            height={480}
            className="w-full h-auto"
            unoptimized
          />
          <p className="text-center text-xs text-gray-500 mt-2 font-medium">{alt}</p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Footer() {
  const { t } = useI18n();
  const [qrModal, setQrModal] = useState<{ src: string; alt: string } | null>(null);

  const hasDonate =
    footerData?.donate &&
    (footerData.donate.paypal || footerData.donate.eth || footerData.donate.btc);

  const hasLinks = footerData?.links && footerData.links.length > 0;

  return (
    <>
      <footer className="relative border-t-[3px] border-[var(--clay-border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          {/* Main footer content */}
          <div className="py-10 flex flex-col sm:flex-row justify-center gap-8 sm:gap-12">
            {/* Brand */}
            <div className="space-y-3 text-center sm:text-left shrink-0">
              <h3 className="text-lg font-bold text-[var(--text-primary)]">
                {siteConfig.name}
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed max-w-[240px] mx-auto sm:mx-0">
                {siteConfig.description}
              </p>
              {hasLinks && (
                <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-1.5 pt-2">
                  {footerData.links.map((link) =>
                    link.url.endsWith(".xml") ? (
                      <a
                        key={link.label}
                        href={link.url}
                        className="text-xs text-[var(--text-muted)] hover:text-purple-500 dark:hover:text-purple-400 transition-colors font-medium"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.label}
                        href={link.url}
                        className="text-xs text-[var(--text-muted)] hover:text-purple-500 dark:hover:text-purple-400 transition-colors font-medium"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Donate / Buy me a coffee */}
            {hasDonate && (
              <div className="space-y-3 text-center sm:text-left">
                <h4 className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                  <Coffee size={14} className="text-purple-500" />
                  {t.footer.buyMeCoffee}
                </h4>

                <div className="space-y-2.5">
                  {/* PayPal */}
                  {footerData.donate.paypal && (
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="shrink-0 text-blue-600"><SocialIcon name="paypal" size={14} /></span>
                      <a
                        href={footerData.donate.paypal}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-[var(--text-muted)] hover:text-purple-500 dark:hover:text-purple-400 transition-colors font-medium truncate"
                      >
                        PayPal
                      </a>
                      <CopyButton text={footerData.donate.paypal} />
                    </div>
                  )}

                  {/* ETH ERC-20 */}
                  {footerData.donate.eth && (
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="shrink-0 text-[#627EEA]"><SocialIcon name="ethereum" size={14} /></span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-70 truncate max-w-[180px] select-all">
                        {footerData.donate.eth}
                      </span>
                      <CopyButton text={footerData.donate.eth} />
                    </div>
                  )}

                  {/* BTC */}
                  {footerData.donate.btc && (
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <span className="shrink-0 text-[#F7931A]"><SocialIcon name="bitcoin" size={14} /></span>
                      <span className="text-[10px] font-mono text-[var(--text-muted)] opacity-70 truncate max-w-[180px] select-all">
                        {footerData.donate.btc}
                      </span>
                      <CopyButton text={footerData.donate.btc} />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* QR Codes */}
            {hasDonate && (footerData.donate.paypalQr || footerData.donate.ethQr || footerData.donate.btcQr) && (
              <div className="flex flex-row items-start justify-center gap-3 shrink-0">
                {footerData.donate.paypalQr && (
                  <button
                    onClick={() => setQrModal({ src: footerData.donate.paypalQr!, alt: "Scan to support via PayPal" })}
                    className="group cursor-pointer"
                    title="Click to enlarge PayPal QR"
                  >
                    <Image
                      src={footerData.donate.paypalQr}
                      alt="PayPal QR Code"
                      width={90}
                      height={90}
                      className="border-[3px] border-[var(--clay-border)] bg-white group-hover:shadow-[3px_3px_0_var(--accent-glow)] transition-shadow rounded-xl"
                      unoptimized
                    />
                    <p className="text-[9px] text-[var(--text-muted)] mt-1 font-bold">PAYPAL</p>
                  </button>
                )}
                {footerData.donate.ethQr && (
                  <button
                    onClick={() => setQrModal({ src: footerData.donate.ethQr!, alt: "Scan to support ETH or USDT/USDC (EVM)" })}
                    className="group cursor-pointer"
                    title="Click to enlarge ETH QR"
                  >
                    <Image
                      src={footerData.donate.ethQr}
                      alt="ETH QR Code"
                      width={90}
                      height={90}
                      className="border-[3px] border-[var(--clay-border)] bg-white group-hover:shadow-[3px_3px_0_var(--accent-glow)] transition-shadow rounded-xl"
                      unoptimized
                    />
                    <p className="text-[9px] text-[var(--text-muted)] mt-1 font-bold">ETH-USDT/USDC</p>
                  </button>
                )}
                {footerData.donate.btcQr && (
                  <button
                    onClick={() => setQrModal({ src: footerData.donate.btcQr!, alt: "Scan to support BTC (Native Segwit)" })}
                    className="group cursor-pointer"
                    title="Click to enlarge BTC QR"
                  >
                    <Image
                      src={footerData.donate.btcQr}
                      alt="BTC QR Code"
                      width={90}
                      height={90}
                      className="border-[3px] border-[var(--clay-border)] bg-white group-hover:shadow-[3px_3px_0_var(--accent-glow)] transition-shadow rounded-xl"
                      unoptimized
                    />
                    <p className="text-[9px] text-[var(--text-muted)] mt-1 font-bold">BITCOIN</p>
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Bottom bar */}
          <div className="border-t-[3px] border-[var(--clay-border)] py-5 flex items-center justify-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-medium"
            >
              © {new Date().getFullYear()} {siteConfig.name}
              <Heart size={10} className="text-emerald-400 fill-emerald-400" />
              Greyscope&Co. {t.footer.rights}
            </motion.p>
          </div>
        </div>
      </footer>

      {/* QR Code Popup Modal */}
      {qrModal && (
        <QrModal src={qrModal.src} alt={qrModal.alt} onClose={() => setQrModal(null)} />
      )}
    </>
  );
}
