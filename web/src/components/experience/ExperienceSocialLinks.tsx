"use client";

const xUrl = process.env.NEXT_PUBLIC_SOCIAL_X ?? "#";
const linkedInUrl = process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN ?? "#";
const facebookUrl = process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? "#";
const tiktokUrl = process.env.NEXT_PUBLIC_SOCIAL_TIKTOK ?? "#";

const sizes = {
  default:
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/85 backdrop-blur-sm transition hover:border-white/35 hover:bg-white/10 hover:text-white",
  compact:
    "flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/90 backdrop-blur-md transition active:scale-95 hover:border-white/40 hover:bg-white/10 hover:text-white",
} as const;

const iconSizes = {
  default: "h-4 w-4",
  compact: "h-3.5 w-3.5",
} as const;

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconTikTok({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.47 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

type Size = "default" | "compact";

export function ExperienceSocialLinks({ size = "default" }: { size?: Size }) {
  const items = [
    { href: xUrl, label: "X (Twitter)", Icon: IconX },
    { href: linkedInUrl, label: "LinkedIn", Icon: IconLinkedIn },
    { href: facebookUrl, label: "Facebook", Icon: IconFacebook },
    { href: tiktokUrl, label: "TikTok", Icon: IconTikTok },
  ] as const;
  const linkClass = sizes[size];
  const iconClass = iconSizes[size];

  return (
    <nav
      className={`flex flex-wrap items-center justify-end ${size === "compact" ? "gap-1" : "gap-1.5 sm:gap-2"}`}
      aria-label="Social media"
    >
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
          aria-label={label}
        >
          <Icon className={iconClass} />
        </a>
      ))}
    </nav>
  );
}
