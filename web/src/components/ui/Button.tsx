import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:pointer-events-none disabled:opacity-45";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-[#0A0A0A] shadow-[0_0_24px_-4px_rgba(201,162,74,0.45)] hover:bg-brand-light hover:shadow-[0_0_28px_-2px_rgba(201,162,74,0.55)]",
  secondary:
    "border border-white/20 bg-transparent text-white hover:border-brand/50 hover:bg-white/[0.04]",
  ghost: "text-zinc-300 hover:bg-white/[0.06] hover:text-white",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button type="button" className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
