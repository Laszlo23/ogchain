import { createWalletClient, http, parseAbi } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { ogGalileo } from "./chain";

const complianceAbi = parseAbi([
  "function setWalletStatus(address wallet, uint8 status) external",
]);

/** IComplianceRegistry.Status: Verified = 2 */
const STATUS_VERIFIED = 2;

export async function relaySetVerified(wallet: `0x${string}`): Promise<`0x${string}` | null> {
  const pk = process.env.RELAYER_PRIVATE_KEY;
  const registry = process.env.COMPLIANCE_REGISTRY_ADDRESS as `0x${string}` | undefined;
  if (!pk || !registry || !pk.startsWith("0x")) {
    console.warn("[compliance-relay] missing RELAYER_PRIVATE_KEY or COMPLIANCE_REGISTRY_ADDRESS");
    return null;
  }

  const account = privateKeyToAccount(pk as `0x${string}`);
  const client = createWalletClient({
    account,
    chain: ogGalileo,
    transport: http(ogGalileo.rpcUrls.default.http[0]),
  });

  const hash = await client.writeContract({
    address: registry,
    abi: complianceAbi,
    functionName: "setWalletStatus",
    args: [wallet, STATUS_VERIFIED],
  });
  return hash;
}
