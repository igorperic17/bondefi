"use client";

import React from "react";

import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
import type { Chain } from "@particle-network/connectkit/chains";
import { EntryPosition, wallet } from "@particle-network/connectkit/wallet";

import {
  arbitrumSepolia,
  avalancheFuji,
  bscTestnet,
  localhost,
  polygonAmoy,
} from "@particle-network/connectkit/chains";
import { evmWalletConnectors } from "@particle-network/connectkit/evm";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const clientKey = process.env.NEXT_PUBLIC_CLIENT_KEY as string;
const appId = process.env.NEXT_PUBLIC_APP_ID as string;
const walletConnectProjectId = process.env
  .NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string;

if (!projectId || !clientKey || !appId) {
  throw new Error("Please configure the Particle project in .env first!");
}

const supportChains: Chain[] = [];
supportChains.push(polygonAmoy, bscTestnet, arbitrumSepolia, avalancheFuji);

if (process.env.NODE_ENV === "development") {
  supportChains.push(localhost);
}

const config = createConfig({
  projectId,
  clientKey,
  appId,
  appearance: {
    recommendedWallets: [
      { walletId: "metaMask", label: "Recommended" },
      { walletId: "trustWallet", label: "Popular" },
    ],
    language: "en-US",
  },
  walletConnectors: [
    authWalletConnectors(),
    evmWalletConnectors({
      metadata: {
        name: "BondeFi Connect",
        icon:
          typeof window !== "undefined"
            ? `${window.location.origin}/favicon.ico`
            : "",
        description: "BondeFi Connection",
        url: typeof window !== "undefined" ? window.location.origin : "",
      },
      walletConnectProjectId: walletConnectProjectId,
    }),
  ],
  plugins: [
    wallet({
      visible: true,
      entryPosition: EntryPosition.BR,
    }),
  ],
  chains: supportChains as unknown as readonly [Chain, ...Chain[]],
});

export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
  return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};
