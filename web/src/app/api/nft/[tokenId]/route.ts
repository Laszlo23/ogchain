import { createPublicClient, http } from "viem";
import { ogGalileo } from "@/lib/chain";
/** Proof NFT metadata is resolved on 0G via NEXT_PUBLIC_PROOF_NFT; a separate Base deployment would need its own metadata route or host. */
import { addresses, proofNftAbi } from "@/lib/contracts";
import { DEMO_PROPERTY_DETAILS } from "@/lib/demo-properties";

export const dynamic = "force-dynamic";

const zero = "0x0000000000000000000000000000000000000000" as const;

export async function GET(_req: Request, { params }: { params: Promise<{ tokenId: string }> }) {
  const { tokenId } = await params;
  const nft = addresses.proofNft;
  if (nft === zero) {
    return Response.json({ error: "NEXT_PUBLIC_PROOF_NFT not set" }, { status: 503 });
  }

  let id: bigint;
  try {
    id = BigInt(tokenId);
  } catch {
    return Response.json({ error: "invalid token id" }, { status: 400 });
  }

  const client = createPublicClient({
    chain: ogGalileo,
    transport: http(ogGalileo.rpcUrls.default.http[0]),
  });

  let propertyId: bigint;
  try {
    propertyId = await client.readContract({
      address: nft,
      abi: proofNftAbi,
      functionName: "propertyOf",
      args: [id],
    });
  } catch {
    return Response.json({ error: "token not found" }, { status: 404 });
  }

  const pid = Number(propertyId);
  const demo = DEMO_PROPERTY_DETAILS[pid];
  const name = demo ? `${demo.headline} — certificate` : `Property #${pid} — certificate`;
  const image = demo?.imageSrc ?? "";
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return Response.json({
    name,
    description:
      demo?.thesis ??
      "Soulbound certificate for an Og property share position. Illustrative demo — not legal title.",
    image,
    external_url: base ? `${base}/properties` : undefined,
  });
}
