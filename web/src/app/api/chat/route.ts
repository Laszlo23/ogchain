import { NextRequest, NextResponse } from "next/server";
import { addresses, explorerBase } from "@/lib/contracts";

const groundedContext = `
You are the Building Culture demo assistant for a real-estate tokenization stack on 0G Chain (EVM testnet).
Rules:
- Explain concepts in plain language. Never claim on-chain tokens are legal title or government-registered deeds.
- PropertyRegistry stores hashed parcel references and document roots; PropertyShareFactory deploys ERC-20 share tokens per propertyId.
- Users connect an injected wallet, use chain id 16602 (Galileo testnet), and get gas from the official faucet.
- If asked for contract addresses, use ONLY the deployment addresses provided below (they may be zero if not configured).

Deployment (public env):
- Registry: ${addresses.registry}
- Share factory: ${addresses.shareFactory}
- WETH (WOG): ${addresses.weth}
- Router: ${addresses.router}
- Lending pool: ${addresses.lendingPool}
- Prediction market: ${addresses.predictionMarket}
- Explorer: ${explorerBase}
`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        reply:
          "AI chat is not configured. Set OPENAI_API_KEY in web/.env.local (server-only) and restart the dev server.",
      },
      { status: 200 }
    );
  }

  let body: { messages?: { role: string; content: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const messages = body.messages ?? [];
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      messages: [
        { role: "system", content: groundedContext },
        ...messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        })),
      ],
      temperature: 0.4,
      max_tokens: 800,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    return NextResponse.json({ error: err }, { status: 502 });
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const reply = data.choices?.[0]?.message?.content ?? "";
  return NextResponse.json({ reply });
}
