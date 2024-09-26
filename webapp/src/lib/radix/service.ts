import {
	DataRequestBuilder,
	RadixDappToolkit,
	RadixNetwork,
} from '@radixdlt/radix-dapp-toolkit'

import {
	GatewayApiClient,
	StateNonFungibleDetailsResponseItem,
} from '@radixdlt/babylon-gateway-api-sdk'
import { get } from 'lodash'
import { radix } from '.'
import { extractTokenDetails } from './dto/tokenDetails'
import {
	type CreateTokenProps,
	createTokenManifest,
} from './manifest/create-token'

export interface RadixConfiguration {
	networkId: number
	applicationVersion: string
	applicationName: string
	applicationDappDefinitionAddress: string
}

export const DEFAULT_CONFIG = {
	networkId: RadixNetwork.Stokenet,
	applicationName: process.env.NEXT_PUBLIC_RADIX_APP_NAME || '',
	applicationVersion: process.env.NEXT_PUBLIC_RADIX_APP_VERSION || '',
	applicationDappDefinitionAddress:
		process.env.NEXT_PUBLIC_RADIX_DAPP_DEFINITION || '',
} satisfies RadixConfiguration

export class RadixService {
	public readonly managerComponentId: string
	public readonly managerResourceNFT: string
	public toolkit: RadixDappToolkit
	public gateway: GatewayApiClient

	constructor(
		managerComponentId?: string,
		config: RadixConfiguration = DEFAULT_CONFIG,
	) {
		// Disable NEXT prerender on server as Radix references window
		if (typeof window === 'undefined') {
			this.toolkit = {} as RadixDappToolkit
			this.gateway = {} as GatewayApiClient
			this.managerComponentId = ''
			this.managerResourceNFT = ''
			return
		}

		this.toolkit = RadixDappToolkit(config)
		this.gateway = GatewayApiClient.initialize(config)

		this.managerComponentId =
			managerComponentId || process.env.NEXT_PUBLIC_MANAGER_COMPONENT_ID || ''

		this.managerResourceNFT = process.env.NEXT_PUBLIC_MANAGER_TOKEN_ID || ''

		this.toolkit.walletApi.setRequestData(
			DataRequestBuilder.accounts().exactly(1),
		)

		this.toolkit.buttonApi.setMode('dark')
		// this.toolkit.buttonApi.setTheme('')
	}

	public getCurrentAccount = () => {
		const address = this.toolkit.walletApi
			.getWalletData()
			?.accounts.at(0)?.address
		if (!address) throw new Error('No address found')

		return address
	}

	public async creteToken(props: CreateTokenProps) {
		const accountId = this.getCurrentAccount()
		const transactionManifest = createTokenManifest(
			accountId,
			this.managerComponentId,
			props,
		)

		const result = await this.toolkit.walletApi.sendTransaction({
			transactionManifest,
		})

		const transactionId = result.unwrapOr(undefined)?.transactionIntentHash

		if (!transactionId) throw new Error(`Transaction failed: ${result}`)

		return this.gateway.transaction.getCommittedDetails(transactionId)
	}

	async getTokenDetails(id: string) {
		const meta = await this.gateway.state.getEntityMetadata(id)
		console.log('meta', meta)
		return extractTokenDetails(meta)
	}

	async loadAllTokens(cursor?: string) {
		const response = await this.gateway.state.getNonFungibleIds(
			this.managerResourceNFT,
			undefined,
			cursor,
		)

		const data = await this.gateway.state.getNonFungibleData(
			this.managerResourceNFT,
			response.items,
		)

		const items = data.map((t) => ({
			name: get(t, 'data.programmatic_json.fields[0].value') as string,
			componentId: get(t, 'data.programmatic_json.fields[1].value') as string,
			resourceId: get(t, 'data.programmatic_json.fields[2].value') as string,
		}))

		// load details
		const promises = items.map(async (t) => ({
			...t,
			token: await this.getTokenDetails(t.resourceId),
		}))

		return {
			nextCursor: response.next_cursor,
			totalCount: response.total_count,
			items: await Promise.all(promises),
		}
	}

	async claimTokens(tokenId: string) {}

	async getUserHoldings(tokenId: string) {}
}
