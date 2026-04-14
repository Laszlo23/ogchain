"use client";

import type { ReactNode } from "react";
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
      ? "bg-white/[0.07] text-gold-400"
      : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
  }`;
}

const NavIcon = {
  home: (cls: string) => (
    <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V9.5z" strokeLinejoin="round" />
    </svg>
  ),
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
};

const links: { href: string; label: string; icon: (cls: string) => ReactNode }[] = [
  { href: "/", label: "Home", icon: NavIcon.home },
  { href: "/properties", label: "Properties", icon: NavIcon.building },
  { href: "/trade", label: "Trade", icon: NavIcon.trade },
  { href: "/invest", label: "Invest", icon: NavIcon.invest },
  { href: "/stake", label: "Stake", icon: NavIcon.stake },
  { href: "/portfolio", label: "Portfolio", icon: NavIcon.portfolio },
];

function AdminNavLink() {
  const hydrated = useHydrated();
  const pathname = usePathname();
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

  if (!hydrated) return null;
  if (!preview && !isRegistrar && !isComplianceAdmin) return null;

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

export function Nav() {
  const pathname = usePathname();
  const iconCls = "h-3.5 w-3.5 shrink-0 opacity-90";

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#030303]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group flex items-baseline gap-1">
          <span className="bg-gradient-to-r from-white to-gold-400/90 bg-clip-text text-base font-semibold tracking-tight text-transparent sm:text-lg">
            Building Culture
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:inline">
            0G
          </span>
        </Link>
        <nav
          className="order-3 flex w-full flex-wrap items-center justify-center gap-x-0.5 gap-y-1 text-[13px] sm:gap-x-1 md:order-none md:w-auto md:justify-end"
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
                <span className="hidden sm:inline">{l.label}</span>
              </Link>
            );
          })}
          <AdminNavLink />
        </nav>
        <WalletConnectControls />
      </div>
    </header>
  );
}
