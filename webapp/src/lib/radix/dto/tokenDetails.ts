import type { StateEntityMetadataPageResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { extractProperty } from '../utils'

export enum FundingState {
  NotStarted,
  FundingInProgress,
  FullyFunded,
  NotFunded
}

export interface TokenDetails {
  id: string
  name: string
  symbol: string
  description: string
  iconUrl: string
  infoUrl: string

  bondingCurve: string[]
  factoryComponentId: string
  dateCreated: Date
  saleStartDate: Date
  saleEndDate: Date
  fundraisingTarget: number
  currentFunding: number
}

export interface TokenDetailsWithFundingState extends TokenDetails {
  fundingState: FundingState
}

const computeFundingState = (token: TokenDetails): FundingState => {
  const currentDate = new Date()
  if (currentDate < token.saleStartDate) {
    return FundingState.NotStarted
  } else if (currentDate >= token.saleStartDate && currentDate <= token.saleEndDate) {
    return FundingState.FundingInProgress
  } else if (token.currentFunding >= token.fundraisingTarget) {
    return FundingState.FullyFunded
  } else {
    return FundingState.NotFunded
  }
}

export const createMockToken = (id: string): TokenDetailsWithFundingState => {
  const currentDate = new Date();
  const saleStartDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
  const saleEndDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const fundraisingTarget = 100000;
  const currentFunding = 50000;

  const token: TokenDetails = {
    id: id,
    name: `Token ${id}`,
    symbol: 'TKN',
    description: 'This is a sample token description.',
    iconUrl: `https://picsum.photos/200/300?random=${id}`,
    infoUrl: 'https://example.com',
    bondingCurve: ['linear', '1', '0'],
    factoryComponentId: 'component_sim1q0a7ecesc8jvwd9xvsncz9q8ra4gmhc2m8e9z8ys5crg3r9nz',
    dateCreated: new Date(Date.now() - Math.random() * 10000000000),
    fundraisingTarget,
    currentFunding,
    saleStartDate,
    saleEndDate,
  };

  return {
    ...token,
    fundingState: computeFundingState(token)
  };
};

export const extractTokenDetails = (state: StateEntityMetadataPageResponse): TokenDetailsWithFundingState => {
  const token: TokenDetails = {
    id: state.address,
    name: extractProperty(state, 'name', 'Unnamed Token'),
    symbol: extractProperty(state, 'symbol', ''),
    description: extractProperty(state, 'description', ''),
    iconUrl: extractProperty(state, 'icon_url', ''),
    infoUrl: extractProperty(state, 'info_url', ''),
    bondingCurve: extractProperty(state, 'bonding_curve', '').split(':'),
    factoryComponentId: extractProperty(state, 'factory_component', ''),
    dateCreated: new Date(state.ledger_state.proposer_round_timestamp),
    saleStartDate: new Date(extractProperty(state, 'sale_start_date', '')),
    saleEndDate: new Date(extractProperty(state, 'sale_end_date', '')),
    fundraisingTarget: Number(extractProperty(state, 'fundraising_target', '0')),
    currentFunding: Number(extractProperty(state, 'current_funding', '0')),
  };

  return {
    ...token,
    fundingState: computeFundingState(token)
  };
}
