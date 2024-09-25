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
  } satisfies TokenDetails)
