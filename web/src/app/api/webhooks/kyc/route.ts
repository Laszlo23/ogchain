import { createHmac, timingSafeEqual } from "crypto";
import { isAddress } from "viem";
import { relaySetVerified } from "@/lib/compliance-relay";
import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

type KycPayload = {
  idempotencyKey: string;
  wallet: `0x${string}`;
  status: "approved" | "rejected";
  applicantExternalId?: string;
};

function verifySignature(rawBody: string, signatureHeader: string | null, secret: string): boolean {
  const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(signatureHeader ?? "", "utf8"));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const rawBody = await req.text();
  const secret = process.env.KYC_WEBHOOK_SECRET;

  if (secret) {
    const sig = req.headers.get("x-kyc-signature");
    if (!verifySignature(rawBody, sig, secret)) {
      return Response.json({ error: "invalid signature" }, { status: 401 });
    }
  }

  let payload: KycPayload;
  try {
    payload = JSON.parse(rawBody) as KycPayload;
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }

  if (!payload.idempotencyKey || !payload.wallet || !payload.status) {
    return Response.json({ error: "idempotencyKey, wallet, status required" }, { status: 400 });
  }
  if (!isAddress(payload.wallet)) {
    return Response.json({ error: "invalid wallet" }, { status: 400 });
  }

  const pool = getPool();
  if (pool) {
    const dup = await pool.query(`SELECT 1 FROM webhook_events WHERE idempotency_key = $1`, [
      payload.idempotencyKey,
    ]);
    if (dup.rowCount && dup.rowCount > 0) {
      return Response.json({ ok: true, duplicate: true });
    }
  }

  if (payload.status === "approved") {
    const txHash = await relaySetVerified(payload.wallet);
    if (pool) {
      await pool.query(
        `INSERT INTO webhook_events (idempotency_key, provider, payload) VALUES ($1, $2, $3::jsonb)`,
        [payload.idempotencyKey, "generic", rawBody]
      );
      await pool.query(
        `INSERT INTO kyc_applications (applicant_external_id, wallet_address, status)
         VALUES ($1, $2, $3)`,
        [payload.applicantExternalId ?? null, payload.wallet.toLowerCase(), "approved"]
      );
    }
    return Response.json({ ok: true, txHash });
  }

  if (pool) {
    await pool.query(
      `INSERT INTO webhook_events (idempotency_key, provider, payload) VALUES ($1, $2, $3::jsonb)`,
      [payload.idempotencyKey, "generic", rawBody]
    );
  }
  return Response.json({ ok: true, txHash: null });
}
