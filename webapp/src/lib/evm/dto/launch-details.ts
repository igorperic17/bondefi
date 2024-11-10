import { extractProperty } from "@/lib/utils";
import type { StateEntityMetadataPageResponse } from "@radixdlt/babylon-gateway-api-sdk";

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

  bondingCurve: string[];
  factoryComponentId: string;
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

export const extractEVMTokenDetails = (launchProxy: any) => {
  return {
    id: launchProxy.id.toString(),
    name: launchProxy.name, // Assuming name is not available in the current token structure
    symbol: launchProxy.symbol, // Assuming symbol is not available in the current token structure
    description: launchProxy.description ? launchProxy.description : "No description available", // Assuming description is not available in the current token structure
    iconUrl: "", // Assuming iconUrl is not available in the current token structure
    infoUrl: `/project/${launchProxy.id.toString()}`,
    bondingCurve: [], // Assuming bondingCurve is not available in the current token structure
    factoryComponentId: "N/A", // Assuming factoryComponentId is not available in the current token structure
    dateCreated: new Date(Number(launchProxy.saleStart) * 1000),
    fundraisingTarget: Number(launchProxy.targetRaise),
    raised: Number(launchProxy.raised),
    collateralAddress: launchProxy.purchaseToken, // Using purchaseToken as collateralAddress
    presaleTokenId: launchProxy.purchaseNftAddress, // Using purchaseNftAddress as presaleTokenId
    presaleStart: new Date(Number(launchProxy.saleStart) * 1000),
    presaleEnd: new Date(Number(launchProxy.saleEnd) * 1000),
    presaleGoal: launchProxy.targetRaise.toString(), // Using targetRaise as presaleGoal
    presaleSuccess: Number(launchProxy.raised) >= Number(launchProxy.targetRaise),
  } as TokenDetails;
}

const computeFundingState = (
  token: TokenDetails,
  currentFunding: number,
): FundingState => {
  const currentDate = new Date();

  if (currentDate < token.presaleStart) {
    return FundingState.NotStarted;
  }
  if (currentDate >= token.presaleStart && currentDate <= token.presaleEnd) {
    return FundingState.FundingInProgress;
  }
  if (currentFunding >= Number.parseFloat(token.presaleGoal)) {
    return FundingState.FullyFunded;
  }

  return FundingState.NotFunded;
};

export const createMockToken = (id: string): TokenDetails => {
  const currentDate = new Date();
  const presaleStart = new Date(
    currentDate.getTime() - 7 * 24 * 60 * 60 * 1000,
  );
  const presaleEnd = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const fundraisingTarget = 100000;
  const currentFunding = 50000;

  const token: TokenDetails = {
    id: id,
    name: `Token ${id}`,
    symbol: "TKN",
    description: "This is a sample token description.",
    iconUrl: `https://picsum.photos/200/300?random=${id}`,
    infoUrl: "https://example.com",
    bondingCurve: ["linear", "1", "0"],
    factoryComponentId:
      "component_sim1q0a7ecesc8jvwd9xvsncz9q8ra4gmhc2m8e9z8ys5crg3r9nz",
    dateCreated: new Date(Date.now() - Math.random() * 10000000000),
    fundraisingTarget,
    presaleGoal: fundraisingTarget.toString(),
    collateralAddress:
      "resource_sim1q0a7ecesc8jvwd9xvsncz9q8ra4gmhc2m8e9z8ys5crg3r9nz", // RDX
    presaleTokenId:
      "resource_sim1q0a7ecesc8jvwd9xvsncz9q8ra4gmhc2m8e9z8ys5crg3r9nz",
    presaleStart,
    presaleEnd,
    presaleSuccess: false,
  };

  return token;
};
