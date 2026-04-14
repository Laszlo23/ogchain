#!/usr/bin/env python3
"""Emit web/.env.local lines from deployments/testnet.json (copy from testnet.example.json first)."""
import json
import sys
from pathlib import Path

def main() -> None:
    if len(sys.argv) < 2:
        print("Usage: sync_web_env.py deployments/testnet.json", file=sys.stderr)
        sys.exit(1)
    path = Path(sys.argv[1])
    data = json.loads(path.read_text())
    rpc = data.get("rpcUrl", "https://evmrpc-testnet.0g.ai")
    c = data["contracts"]
    comp = c.get("ComplianceRegistry", "0x0000000000000000000000000000000000000000")
    proof = c.get("PropertyShareProof", "0x0000000000000000000000000000000000000000")
    staking = c.get("OgStaking", "0x0000000000000000000000000000000000000000")
    lines = [
        f"NEXT_PUBLIC_OG_RPC={rpc}",
        f"NEXT_PUBLIC_REGISTRY={c['PropertyRegistry']}",
        f"NEXT_PUBLIC_SHARE_FACTORY={c['PropertyShareFactory']}",
        f"NEXT_PUBLIC_COMPLIANCE_REGISTRY={comp}",
        f"NEXT_PUBLIC_WETH={c['WETH9']}",
        f"NEXT_PUBLIC_ROUTER={c['OgRouter']}",
        f"NEXT_PUBLIC_LENDING_POOL=0x0000000000000000000000000000000000000000",
        f"NEXT_PUBLIC_PREDICTION_MARKET={c['BinaryPredictionMarket']}",
        f"NEXT_PUBLIC_PROOF_NFT={proof}",
        f"NEXT_PUBLIC_STAKING={staking}",
        f"NEXT_PUBLIC_EXPLORER={data.get('explorer', 'https://chainscan-galileo.0g.ai')}",
    ]
    print("\n".join(lines))

if __name__ == "__main__":
    main()
