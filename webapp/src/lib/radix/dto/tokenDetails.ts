import type { StateEntityMetadataPageResponse } from '@radixdlt/babylon-gateway-api-sdk'
import { extractProperty } from '../utils'

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
