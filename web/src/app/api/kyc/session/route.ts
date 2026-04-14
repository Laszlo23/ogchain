export const dynamic = "force-dynamic";

// TODO: restore Sumsub / provider session flow when moving beyond testing phase.

/** KYC session bootstrap — disabled during testing (use on-chain `setKycBypass` or `setWalletStatus` instead). */
export async function POST() {
  return Response.json(
    {
      error: "KYC session API paused for testing.",
      hint: "Use ComplianceRegistry kycBypass or admin setWalletStatus on testnet.",
    },
    { status: 503 }
  );
}
