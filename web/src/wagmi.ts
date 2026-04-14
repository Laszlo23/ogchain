import { createConfig, http } from "wagmi";
import { injected, walletConnect } from "wagmi/connectors";
import { ogGalileo } from "./lib/chain";

const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;

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
  chains: [ogGalileo],
  connectors,
  transports: {
    [ogGalileo.id]: http(ogGalileo.rpcUrls.default.http[0]),
  },
});
