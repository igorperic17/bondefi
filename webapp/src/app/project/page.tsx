'use client'

import HyperText from "@/components/magicui/hyper-text"
import { RainbowButton } from "@/components/magicui/rainbow-button"
import TokenCard from '@/components/token-card'
import { NetworkSelector } from '@/components/ui/network-selector'
import { ChevronRight, Rocket } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import useEvmLaunchpad from "@/lib/evm/use-evm-launchpad"
import { useWallets } from "@particle-network/connectkit"
import { TokenDetails } from "@/lib/radix/dto/tokenDetails"

const TokenList: React.FC = () => {
  const [primaryWallet] = useWallets()
  const { launchpad } = useEvmLaunchpad(primaryWallet?.connector)
  const [tokens, setTokens] = useState<TokenDetails[]>([])
  const [ref, inView] = useInView()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const fetchTokens = useCallback(async () => {
    console.log("fetching tokens");
    if (!launchpad) return;
    console.log("launchpad is available");

    setIsLoading(true);
    try {
      const totalLaunches = await launchpad.totalLaunches();
      const launches: TokenDetails[] = [];
      for (let i = 0; i < totalLaunches; i++) {
        const launchProxy = await launchpad.launches(i);
        const launch: TokenDetails = {
          id: launchProxy.id.toString(),
          name: "N/A", // Assuming name is not available in the current token structure
          symbol: "N/A", // Assuming symbol is not available in the current token structure
          description: "N/A", // Assuming description is not available in the current token structure
          iconUrl: "", // Assuming iconUrl is not available in the current token structure
          infoUrl: `/project/${launchProxy.id.toString()}`,
          bondingCurve: [], // Assuming bondingCurve is not available in the current token structure
          factoryComponentId: "N/A", // Assuming factoryComponentId is not available in the current token structure
          dateCreated: new Date(Number(launchProxy.saleStart) * 1000),
          fundraisingTarget: Number(launchProxy.targetRaise),
          collateralAddress: launchProxy.purchaseToken, // Using purchaseToken as collateralAddress
          presaleTokenId: launchProxy.purchaseNftAddress, // Using purchaseNftAddress as presaleTokenId
          presaleStart: new Date(Number(launchProxy.saleStart) * 1000),
          presaleEnd: new Date(Number(launchProxy.saleEnd) * 1000),
          presaleGoal: launchProxy.targetRaise.toString(), // Using targetRaise as presaleGoal
          presaleSuccess: Number(launchProxy.raised) >= Number(launchProxy.targetRaise),
        };
        launches.push(launch);
      }
      console.log(launches);
      setTokens(launches);
    } catch (error) {
      console.error('Error fetching tokens:', error);
    } finally {
      setIsLoading(false);
    }
  }, [launchpad]);

  useEffect(() => {
    if (launchpad) {
      fetchTokens();
    }
  }, [launchpad, primaryWallet, fetchTokens]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <div style={{minWidth: "25%"}}>
          <NetworkSelector />
        </div>
        <RainbowButton onClick={() => router.push("/project/launch")}>
          <Rocket className="mr-2 h-4 w-4" />
          Launch your project
          <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
        </RainbowButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 bor">
        {tokens.map((token, index) => (
          <TokenCard
            key={index}
            id={token.id}
            name={token.name}
            symbol={token.symbol}
            description={token.description}
            iconUrl={token.iconUrl}
            infoUrl={token.infoUrl}
            bondingCurve={token.bondingCurve}
            factoryComponentId={token.factoryComponentId}
            dateCreated={token.dateCreated}
            fundraisingTarget={token.fundraisingTarget}
            collateralAddress={token.collateralAddress}
            presaleTokenId={token.presaleTokenId}
            presaleStart={token.presaleStart}
            presaleEnd={token.presaleEnd}
            presaleGoal={token.presaleGoal}
            presaleSuccess={token.presaleSuccess}
            isTrending={false} // You might want to implement a trending logic
            isFundingReached={token.presaleSuccess}
          />
        ))}
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-center">
            <HyperText
              className="text-xl font-bold"
              text="Loading projects..."
            ></HyperText>
          </div>
        </div>
      )}
      {tokens.length === 0 && <div ref={ref} className="h-10 mt-4" />}
    </div>
  );
}

export default TokenList
