import { defineChain } from "viem";

const rpc =
  typeof process !== "undefined" && process.env.NEXT_PUBLIC_OG_RPC
    ? process.env.NEXT_PUBLIC_OG_RPC
    : "https://evmrpc-testnet.0g.ai";

export const ogGalileo = defineChain({
  id: 16602,
  name: "0G Galileo Testnet",
  nativeCurrency: { decimals: 18, name: "OG", symbol: "OG" },
  rpcUrls: {
    default: { http: [rpc] },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://chainscan-galileo.0g.ai" },
  },
});
