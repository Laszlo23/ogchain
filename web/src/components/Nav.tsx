"use client";

import type { ReactNode } from "react";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { zeroAddress } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { WalletConnectControls } from "@/components/WalletConnectControls";
import { accessControlAbi, addresses } from "@/lib/contracts";
import { useHydrated } from "@/lib/use-hydrated";
import { COMPLIANCE_ADMIN_ROLE, REGISTRAR_ROLE } from "@/lib/roles";

function navLinkClass(active: boolean) {
  return `group relative inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[13px] transition-colors duration-200 md:px-2.5 ${
    active
      ? "bg-eco/15 text-eco-light"
      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
  }`;
}

const NavIcon = {
  building: (cls: string) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-4h6v4M9 11h.01M12 11h.01M15 11h.01" strokeLinecap="round" />
    </svg>
  ),
  trade: (cls: string) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M7 16V4m0 0L3 8m4-4 4 4M17 8v12m0 0 4-4m-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  invest: (cls: string) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" />
    </svg>
  ),
  stake: (cls: string) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinejoin="round" />
    </svg>
  ),
  portfolio: (cls: string) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <rect x="3" y="3" width="7" height="18" rx="1" />
      <rect x="14" y="9" width="7" height="12" rx="1" />
    </svg>
  ),
  community: (cls: string) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

const links: { href: string; label: string; hint: string; icon: (cls: string) => ReactNode }[] = [
  { href: "/properties", label: "Properties", hint: "Browse listings", icon: NavIcon.building },
  { href: "/trade", label: "Trade", hint: "Swap & marketplace", icon: NavIcon.trade },
  { href: "/invest", label: "Invest", hint: "Investor hub", icon: NavIcon.invest },
  { href: "/stake", label: "Stake", hint: "Stake OG for rewards", icon: NavIcon.stake },
  { href: "/portfolio", label: "Portfolio", hint: "Your holdings", icon: NavIcon.portfolio },
  { href: "/community", label: "Community", hint: "Updates, tasks, referrals", icon: NavIcon.community },
];

function useAdminNavAllowed() {
  const hydrated = useHydrated();
  const { address } = useAccount();
  const preview = process.env.NEXT_PUBLIC_ADMIN_PREVIEW === "1";

  const roleReads =
    address && addresses.registry !== zeroAddress && addresses.compliance !== zeroAddress
      ? [
          {
            address: addresses.registry,
            abi: accessControlAbi,
            functionName: "hasRole" as const,
            args: [REGISTRAR_ROLE, address],
          },
          {
            address: addresses.compliance,
            abi: accessControlAbi,
            functionName: "hasRole" as const,
            args: [COMPLIANCE_ADMIN_ROLE, address],
          },
        ]
      : [];

  const { data: roleData } = useReadContracts({
    contracts: roleReads,
    query: { enabled: roleReads.length === 2 },
  });

  const isRegistrar =
    roleData?.[0]?.status === "success" ? (roleData[0].result as boolean) : false;
  const isComplianceAdmin =
    roleData?.[1]?.status === "success" ? (roleData[1].result as boolean) : false;

  const allowed = preview || isRegistrar || isComplianceAdmin;
  return { hydrated, allowed };
}

function AdminNavLink() {
  const pathname = usePathname();
  const { hydrated, allowed } = useAdminNavAllowed();

  if (!hydrated || !allowed) return null;

  const active = pathname === "/admin" || pathname.startsWith("/admin/");
  return (
    <Link href="/admin" className={navLinkClass(active)}>
      <svg
        className="h-3.5 w-3.5 shrink-0 opacity-80"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        aria-hidden
      >
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 20v-1a7 7 0 0 1 14 0v1" strokeLinecap="round" />
      </svg>
      <span>Admin</span>
    </Link>
  );
}

function MobileNavDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  const iconCls = "h-5 w-5 shrink-0 opacity-90";
  const { hydrated, allowed } = useAdminNavAllowed();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      id="mobile-nav-drawer"
      className="fixed inset-0 z-[90] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Main menu"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        aria-label="Close menu"
        onClick={onClose}
      />
      <div className="absolute right-0 top-0 flex h-full w-[min(100%,20rem)] flex-col border-l border-white/[0.08] bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
          <span className="text-sm font-semibold text-white">Menu</span>
          <button
            type="button"
            className="rounded-lg p-2 text-zinc-400 hover:bg-white/[0.06] hover:text-white"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4" aria-label="Main">
          <ul className="space-y-1">
            {links.map((l) => {
              const active =
                l.href === "/"
                  ? pathname === "/"
                  : pathname === l.href || pathname.startsWith(`${l.href}/`);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={onClose}
                    className={`flex items-start gap-3 rounded-xl px-3 py-3 text-left transition ${
                      active ? "bg-white/[0.08] text-eco-light" : "text-zinc-300 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span className="mt-0.5 text-current">{l.icon(iconCls)}</span>
                    <span>
                      <span className="block font-medium">{l.label}</span>
                      <span className="block text-xs font-normal text-zinc-500">{l.hint}</span>
                    </span>
                  </Link>
                </li>
              );
            })}
            {hydrated && allowed && (
              <li>
                <Link
                  href="/admin"
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left transition ${
                    pathname === "/admin" || pathname.startsWith("/admin/")
                      ? "bg-white/[0.08] text-eco-light"
                      : "text-zinc-300 hover:bg-white/[0.05]"
                  }`}
                >
                  <svg
                    className="h-5 w-5 shrink-0 opacity-80"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    aria-hidden
                  >
                    <circle cx="12" cy="8" r="3.5" />
                    <path d="M5 20v-1a7 7 0 0 1 14 0v1" strokeLinecap="round" />
                  </svg>
                  <span>
                    <span className="block font-medium">Admin</span>
                    <span className="block text-xs text-zinc-500">Issuer & registry tools</span>
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export function Nav() {
  const pathname = usePathname();
  const iconCls = "h-3.5 w-3.5 shrink-0 opacity-90";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-eco/10 bg-surface/95 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-3 sm:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-zinc-300 hover:bg-white/[0.06] hover:text-white md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label="Open menu"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <Link href="/" className="group flex min-w-0 items-baseline gap-1">
            <span className="bg-gradient-to-r from-canvas to-eco-light bg-clip-text text-base font-semibold tracking-tight text-transparent sm:text-lg">
              Building Culture
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:inline">
              0G
            </span>
          </Link>
        </div>

        <nav
          className="hidden items-center gap-x-0.5 md:flex md:gap-x-1"
          aria-label="Main"
        >
          {links.map((l) => {
            const active =
              l.href === "/"
                ? pathname === "/"
                : pathname === l.href || pathname.startsWith(`${l.href}/`);
            return (
              <Link key={l.href} href={l.href} className={navLinkClass(active)} title={l.label}>
                <span className="text-current">{l.icon(iconCls)}</span>
                <span>{l.label}</span>
              </Link>
            );
          })}
          <AdminNavLink />
        </nav>

        <div className="shrink-0 rounded-full p-[2px] shadow-[0_0_20px_-4px_rgba(255,122,24,0.25)] ring-1 ring-eco/30">
          <WalletConnectControls />
        </div>
      </div>

      {mounted ? createPortal(<MobileNavDrawer open={mobileOpen} onClose={closeMobile} />, document.body) : null}
    </header>
  );
}
