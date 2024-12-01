import { LaunchStruct } from "@/typechain-types/contracts/launchpad/Launchpad";
import { resolveAddress } from "ethers";
import useERC20 from "../use-erc20";

export enum FundingState {
  NotStarted = 0,
  FundingInProgress = 1,
  FullyFunded = 2,
  NotFunded = 3,
}

export interface TokenDetails {
  id: string;
  name: string;
  symbol: string;
  description: string;
  iconUrl: string;
  infoUrl: string;

  dateCreated: Date;
  fundraisingTarget: number;
  raised: number;
  collateralAddress: string;

  presaleTokenId: string;
  presaleStart: Date;
  presaleEnd: Date;
  presaleGoal: string;
  presaleSuccess: boolean;
}

export const extractEVMTokenDetails = (launchProxy: LaunchStruct) => {
  return {
    id: launchProxy.id.toString(),
    name: launchProxy.details.name,
    symbol: launchProxy.details.symbol,
    description: launchProxy.details.description || "No description available",
    iconUrl: launchProxy.details.iconUrl,
    infoUrl: `/project/${launchProxy.id.toString()}`,
    dateCreated: new Date(Number(launchProxy.saleStart) * 1000),
    fundraisingTarget: Number(launchProxy.targetRaise),
    raised: Number(launchProxy.raised),
    collateralAddress: launchProxy.purchaseToken,
    presaleTokenId: launchProxy.purchaseNftAddress,
    presaleStart: new Date(Number(launchProxy.saleStart) * 1000),
    presaleEnd: new Date(Number(launchProxy.saleEnd) * 1000),
    presaleGoal: launchProxy.targetRaise.toString(),
    presaleSuccess:
      Number(launchProxy.raised) >= Number(launchProxy.targetRaise),
  } as TokenDetails;
};
