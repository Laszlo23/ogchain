"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getPublicOrigin } from "@/lib/site-url";

type PropertyShareButtonProps = {
  propertyId: string;
  /** Short title for share text (e.g. property headline) */
  title: string;
  variant?: "default" | "compact";
};

function encodeParams(params: Record<string, string>): string {
  return new URLSearchParams(params).toString();
}

export function PropertyShareButton({ propertyId, title, variant = "default" }: PropertyShareButtonProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(getPublicOrigin());
  }, []);

  const url = useMemo(() => {
    if (!origin) return "";
    return `${origin}/properties/${propertyId}`;
  }, [origin, propertyId]);

  const body = useMemo(
    () => `Invest in fractional real estate: ${title}. Not investment advice — testnet demo.`,
    [title],
  );

  const shareNative = useCallback(async () => {
    if (!url) return;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, text: body, url });
        setOpen(false);
      } catch {
        /* user cancelled or share failed */
      }
    }
  }, [body, title, url]);

  const copyLink = useCallback(async () => {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }, [url]);

  const social = useMemo(() => {
    if (!url) return null;
    return {
      x: `https://twitter.com/intent/tweet?${encodeParams({ text: body, url })}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?${encodeParams({ url })}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?${encodeParams({ u: url })}`,
    };
  }, [body, url]);

  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={
          variant === "compact"
            ? "inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-brand/40 hover:text-white"
            : "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 text-xs font-semibold text-zinc-100 transition hover:border-brand/40 hover:bg-white/[0.08]"
        }
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <ShareIcon className="h-3.5 w-3.5 text-brand" aria-hidden />
        Share
      </button>

      {open && (
        <>
          <button type="button" className="fixed inset-0 z-40 cursor-default bg-black/40" aria-label="Close" onClick={() => setOpen(false)} />
          <div
            role="menu"
            className="absolute right-0 z-50 mt-2 min-w-[200px] rounded-xl border border-white/10 bg-zinc-950/95 py-2 shadow-xl backdrop-blur-md"
          >
            {canNativeShare && (
              <button
                type="button"
                role="menuitem"
                onClick={() => void shareNative()}
                className="flex w-full px-4 py-2.5 text-left text-sm text-zinc-200 hover:bg-white/[0.06]"
              >
                Share via…
              </button>
            )}
            <button
              type="button"
              role="menuitem"
              onClick={() => void copyLink()}
              className="flex w-full px-4 py-2.5 text-left text-sm text-zinc-200 hover:bg-white/[0.06]"
            >
              {copied ? "Copied link" : "Copy link"}
            </button>
            {social && (
              <>
                <a
                  role="menuitem"
                  href={social.x}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex w-full px-4 py-2.5 text-sm text-zinc-200 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  Post on X
                </a>
                <a
                  role="menuitem"
                  href={social.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex w-full px-4 py-2.5 text-sm text-zinc-200 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  Share on LinkedIn
                </a>
                <a
                  role="menuitem"
                  href={social.facebook}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex w-full px-4 py-2.5 text-sm text-zinc-200 hover:bg-white/[0.06]"
                  onClick={() => setOpen(false)}
                >
                  Share on Facebook
                </a>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function ShareIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" strokeLinecap="round" />
      <path d="M16 6l-4-4-4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 2v13" strokeLinecap="round" />
    </svg>
  );
}
