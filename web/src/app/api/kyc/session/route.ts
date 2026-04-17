import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

/** Same shape as Veriff JS SDK 1.5 `createSession` (XHR) body. */
function buildVerificationBody(vendorData: string) {
  return {
    verification: {
      person: {
        firstName: " ",
        lastName: " ",
      },
      vendorData,
      timestamp: new Date().toISOString(),
    },
  };
}

function getVeriffEnv() {
  const apiKey =
    process.env.VERIFF_API_KEY?.trim() ||
    process.env.NEXT_PUBLIC_VERIFF_API_KEY?.trim() ||
    "";
  const base =
    process.env.VERIFF_API_BASE?.replace(/\/$/, "").trim() ||
    process.env.NEXT_PUBLIC_VERIFF_HOST?.replace(/\/$/, "").trim() ||
    "https://api.veriff.me";
  return { apiKey, base };
}

/**
 * Creates a Veriff session server-side (POST /v1/sessions).
 * Use the **Base URL** shown in Veriff Customer Portal for this integration (All Integrations → your integration → API keys).
 * A 401 from Veriff almost always means the API key and Base URL are not from the same integration or the key was rotated.
 */
export async function POST(req: NextRequest) {
  const { apiKey, base } = getVeriffEnv();
  if (!apiKey) {
    return Response.json(
      { error: "Missing API key", hint: "Set VERIFF_API_KEY or NEXT_PUBLIC_VERIFF_API_KEY" },
      { status: 503 }
    );
  }

  let body: { vendorData?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const vendorData = typeof body.vendorData === "string" ? body.vendorData.trim() : "";
  if (!vendorData) {
    return Response.json({ error: "vendorData is required" }, { status: 400 });
  }

  const payload = buildVerificationBody(vendorData);
  const sessionUrl = `${base}/v1/sessions`;

  const res = await fetch(sessionUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-auth-client": apiKey,
    },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let data: unknown;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { raw: text };
  }

  if (!res.ok) {
    return Response.json(
      {
        error: "Veriff rejected the session request",
        httpStatus: res.status,
        httpStatusText: res.statusText,
        veriff: data,
        hint:
          res.status === 401
            ? "401 Unauthorized: use the API key and Base URL from the same integration in Veriff Customer Portal (All Integrations → integration → API keys). Set VERIFF_API_BASE to that Base URL if it differs from https://api.veriff.me (e.g. https://stationapi.veriff.com)."
            : undefined,
      },
      { status: res.status >= 400 && res.status < 600 ? res.status : 502 }
    );
  }

  const parsed = data as { verification?: { url?: string } };
  const url = parsed?.verification?.url;
  if (!url) {
    return Response.json(
      { error: "Veriff response missing verification.url", veriff: data },
      { status: 502 }
    );
  }

  return Response.json({ url, verification: parsed.verification });
}
