import { createPublicClient, http } from "viem";
import { parseSiweMessage, verifySiweMessage } from "viem/siwe";
import { ogGalileo } from "@/lib/chain";
import { getPool } from "@/lib/db";
import { takeNonce } from "@/lib/siwe-store";

export const dynamic = "force-dynamic";

const publicClient = createPublicClient({
  chain: ogGalileo,
  transport: http(ogGalileo.rpcUrls.default.http[0]),
});

export async function POST(req: Request) {
  let body: { message?: string; signature?: `0x${string}` };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "invalid json" }, { status: 400 });
  }
  const { message, signature } = body;
  if (!message || !signature) {
    return Response.json({ error: "message and signature required" }, { status: 400 });
  }

  const okSig = await verifySiweMessage(publicClient, { message, signature });
  if (!okSig) {
    return Response.json({ error: "invalid signature" }, { status: 401 });
  }

  const parsed = parseSiweMessage(message);
  if (!parsed.address || !parsed.nonce) {
    return Response.json({ error: "invalid message" }, { status: 400 });
  }

  const nonceOk = await takeNonce(parsed.address, parsed.nonce);
  if (!nonceOk) {
    return Response.json({ error: "nonce mismatch or expired" }, { status: 401 });
  }

  const pool = getPool();
  if (pool) {
    const existing = await pool.query<{ user_id: number }>(
      `SELECT user_id FROM wallet_bindings WHERE address = $1`,
      [parsed.address.toLowerCase()]
    );
    if (existing.rows.length === 0) {
      const userRes = await pool.query<{ id: number }>(`INSERT INTO users DEFAULT VALUES RETURNING id`);
      const userId = userRes.rows[0].id;
      await pool.query(`INSERT INTO wallet_bindings (user_id, address) VALUES ($1, $2)`, [
        userId,
        parsed.address.toLowerCase(),
      ]);
    }
  }

  return Response.json({ ok: true, address: parsed.address });
}
