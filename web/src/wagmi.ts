import { createConfig, http } from "wagmi";
import { base } from "viem/chains";
import { injected, walletConnect } from "wagmi/connectors";
import { ogGalileo } from "./lib/chain";

const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

const baseRpc =
  process.env.NEXT_PUBLIC_BASE_RPC?.trim() || "https://mainnet.base.org";

const connectors = [
  injected(),
  ...(wcProjectId
    ? [
        walletConnect({
          projectId: wcProjectId,
          showQrModal: true,
        }),
      ]
    : []),
];

export const wagmiConfig = createConfig({
  chains: [base, ogGalileo],
  connectors,
  ssr: true,
  transports: {
    [ogGalileo.id]: http(ogGalileo.rpcUrls.default.http[0]),
    [base.id]: http(baseRpc),
  },
});
