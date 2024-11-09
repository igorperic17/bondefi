"use client";

import { Button } from "@/components/ui/button";
import { BONDING_CURVES } from "@/lib/bonding-curve";
import type { CreateTokenProps } from "@/lib/evm/dto/create-token";
import { findLogs } from "@/lib/evm/evm-utils";
import { BANCOR_RESERVE_RATIO_PRECISION, RESERVE_TOKENS } from "@/lib/evm/token-addresses";
import useERC20 from "@/lib/evm/use-erc20";
import useEvmLaunchpad from "@/lib/evm/use-evm-launchpad";
import { dateToUnixTimestamp } from "@/lib/utils";
import {
  ConnectButton,
  useAccount,
  useWallets,
} from "@particle-network/connectkit";
import { add } from "date-fns";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BondingCurve } from "./bonding-curve";
import { TokenForm } from "./form";

export default function LaunchToken() {
  const [primaryWallet] = useWallets();
  const { isConnected } = useAccount();
  const { launchpad } = useEvmLaunchpad(primaryWallet?.connector);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [params, setParams] = useState<CreateTokenProps>({
    name: "",
    symbol: "",
    targetRaise: "10000",
    purchaseToken: RESERVE_TOKENS[0]?.address,
    purchaseFormula: BONDING_CURVES[0]?.address,
    reserveRatio: 0.5,
    saleStart: new Date(),
    saleEnd: add(new Date(), { days: 3 }),
  });

  const [collateralToken] = useERC20(
    primaryWallet?.connector,
    params.purchaseToken,
  );

  const launchToken = async () => {
    setLoading(true);

    const userCap = 0; //no cap

    if (!launchpad) {
      console.error("Fatal error: launchpad is not available");
      setLoading(false);
    } else {
      console.log("Calling launchpad with params", [
        `IDO ${params.name}`,
        `IDO-${params.symbol}`,
        params.purchaseToken,
        ethers.parseUnits(
          params.targetRaise,
          await collateralToken?.decimals(),
        ),
        userCap,
        dateToUnixTimestamp(params.saleStart),
        dateToUnixTimestamp(params.saleEnd),
        params.purchaseFormula,
        params.reserveRatio * BANCOR_RESERVE_RATIO_PRECISION,
      ]);
      
      const tx = launchpad.createLaunch(
        `IDO ${params.name}`,
        `IDO-${params.symbol}`,
        params.purchaseToken,
        ethers.parseUnits(
          params.targetRaise,
          await collateralToken?.decimals(),
        ),
        userCap,
        dateToUnixTimestamp(params.saleStart),
        dateToUnixTimestamp(params.saleEnd),
        params.purchaseFormula,
        params.reserveRatio * BANCOR_RESERVE_RATIO_PRECISION,
      );

      tx.then(async (_) => {
        const logs = await findLogs(
          tx,
          launchpad,
          launchpad.getEvent("LaunchCreated"),
        );
        if (logs.length !== 1) {
          console.error("Unexpected log count", logs);
        } else {
          const id = logs[0].args.launchId;
          router.push(`/project/${id}`);
        }
      }).finally(() => {
        setLoading(false);
      });
    }
  };

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold mb-6 text-white">Launch New Project</h1>

      {(isConnected && (
        <div className="flex gap-10">
          <div className="flex-[0.6]">
            <TokenForm params={params} onSet={setParams} />

            <Button onClick={launchToken}>Launch Token</Button>
          </div>

          <div className="flex-1">
            <BondingCurve params={params} onSet={setParams} />
          </div>
        </div>
      )) || (
        <div>
          <h2>Please connect your wallet</h2>
          <ConnectButton />
        </div>
      )}
    </div>
  );
}
