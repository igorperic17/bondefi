import type { StateEntityMetadataPageResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { extractProperty } from '../utils'

export enum FundingState {
	NotStarted = 0,
	FundingInProgress = 1,
	FullyFunded = 2,
	NotFunded = 3,
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
	fundraisingTarget: number
	collateralAddress: string

	presaleStart: Date
	presaleEnd: Date
	presaleGoal: string
	presaleSuccess: boolean
}

export const extractTokenDetails = (state: StateEntityMetadataPageResponse) =>
	({
		id: state.address,
		name: extractProperty(state, 'name', 'Unnamed Token'),
		symbol: extractProperty(state, 'symbol', ''),
		description: extractProperty(state, 'description', ''),
		iconUrl: extractProperty(state, 'icon_url', ''),
		infoUrl: extractProperty(state, 'info_url', ''),

		bondingCurve: extractProperty(state, 'bonding_curve', '').split(':'),
		factoryComponentId: extractProperty(state, 'factory_component', ''),

		dateCreated: new Date(state.ledger_state.proposer_round_timestamp),
		fundraisingTarget: Number(
			extractProperty(state, 'fundraising_target', '0'),
		),
		collateralAddress: extractProperty(state, 'collateral', ''),
		presaleStart: new Date(extractProperty(state, 'presale_start', '')),
		presaleEnd: new Date(extractProperty(state, 'presale_end', '')),
		presaleGoal: extractProperty(state, 'presale_goal', '0'),
		presaleSuccess: extractProperty(state, 'presale_success', false),
	}) satisfies TokenDetails

const computeFundingState = (
	token: TokenDetails,
	currentFunding: number,
): FundingState => {
	const currentDate = new Date()

	if (currentDate < token.presaleStart) {
		return FundingState.NotStarted
	}
	if (currentDate >= token.presaleStart && currentDate <= token.presaleEnd) {
		return FundingState.FundingInProgress
	}
	if (currentFunding >= Number.parseFloat(token.presaleGoal)) {
		return FundingState.FullyFunded
	}

	return FundingState.NotFunded
}

export const createMockToken = (id: string): TokenDetails => {
	const currentDate = new Date()
	const presaleStart = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000)
	const presaleEnd = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000)
	const fundraisingTarget = 100000
	const currentFunding = 50000

	const token: TokenDetails = {
		id: id,
		name: `Token ${id}`,
		symbol: 'TKN',
		description: 'This is a sample token description.',
		iconUrl: `https://picsum.photos/200/300?random=${id}`,
		infoUrl: 'https://example.com',
		bondingCurve: ['linear', '1', '0'],
		factoryComponentId:
			'component_sim1q0a7ecesc8jvwd9xvsncz9q8ra4gmhc2m8e9z8ys5crg3r9nz',
		dateCreated: new Date(Date.now() - Math.random() * 10000000000),
		fundraisingTarget,
		presaleGoal: fundraisingTarget.toString(),
		collateralAddress:
			'resource_sim1q0a7ecesc8jvwd9xvsncz9q8ra4gmhc2m8e9z8ys5crg3r9nz', // RDX
		presaleStart,
		presaleEnd,
		presaleSuccess: false,
	}

	return token
}
