"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { zeroAddress } from "viem";
import { useAccount, useReadContracts } from "wagmi";
import { WalletConnectControls } from "@/components/WalletConnectControls";
import { accessControlAbi, addresses } from "@/lib/contracts";
import { COMPLIANCE_ADMIN_ROLE, REGISTRAR_ROLE } from "@/lib/roles";

function navLinkClass(active: boolean) {
  return `relative inline-block py-0.5 transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-px after:rounded-full after:bg-gold-400/85 after:transition-[width] after:duration-300 ${
    active ? "text-gold-400 after:w-full" : "text-zinc-400 after:w-0 hover:text-white hover:after:w-1/2"
  }`;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/guide", label: "Guide" },
  { href: "/properties", label: "Properties" },
  { href: "/invest", label: "Invest" },
  { href: "/stake", label: "Stake" },
  { href: "/market", label: "Market" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/pool", label: "Pool" },
  { href: "/lend", label: "Lend" },
  { href: "/issuer", label: "Issuer" },
  { href: "/legal", label: "Legal" },
];

function AdminNavLink() {
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

  if (!preview && !isRegistrar && !isComplianceAdmin) return null;

  const active = pathname === "/admin" || pathname.startsWith("/admin/");
  return (
    <Link href="/admin" className={navLinkClass(active)}>
      Admin
    </Link>
  );
}

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#030303]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="group flex items-baseline gap-1">
          <span className="bg-gradient-to-r from-white to-gold-400/90 bg-clip-text text-lg font-semibold tracking-tight text-transparent">
            OGChain
          </span>
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500 sm:inline">
            0G
          </span>
        </Link>
        <nav className="order-3 flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px] md:order-none md:w-auto md:justify-end">
          {links.map((l) => {
            const active = pathname === l.href || (l.href !== "/" && pathname.startsWith(l.href));
            return (
              <Link key={l.href} href={l.href} className={navLinkClass(active)}>
                {l.label}
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
