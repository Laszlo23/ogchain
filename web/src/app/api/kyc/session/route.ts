import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

/**
 * Returns data for a hosted KYC SDK session (e.g. Sumsub WebSDK).
 * Wire SUMSUB_APP_TOKEN / SUMSUB_SECRET_KEY in production; demo mode returns placeholders.
 */
export async function POST() {
  const appToken = process.env.SUMSUB_APP_TOKEN;
  if (appToken) {
    return Response.json({
      accessToken: appToken,
      applicantId: randomBytes(8).toString("hex"),
    });
  }
  return Response.json({
    accessToken: null,
    applicantId: randomBytes(8).toString("hex"),
    message: "Set SUMSUB_APP_TOKEN to enable provider-backed sessions; webhook can still approve via /api/webhooks/kyc",
  });
}
