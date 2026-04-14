export const dynamic = "force-dynamic";

// TODO: restore relay + DB idempotency when KYC webhooks are re-enabled.

/** Provider webhook — disabled during testing. */
export async function POST() {
  return Response.json(
    {
      error: "KYC webhook paused for testing.",
      hint: "Use ComplianceRegistry kycBypass or admin setWalletStatus on testnet.",
    },
    { status: 503 }
  );
}
