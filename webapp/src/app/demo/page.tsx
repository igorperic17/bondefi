'use client'

import { Button } from '@/components/ui/button'
import { radix } from '@/lib/radix'
import { presaleNFTMintManifest } from '@/lib/radix/manifest/buy'
import {
	randCurrencyCode,
	randFood,
	randProductDescription,
} from '@ngneat/falso'
import { get } from 'lodash'

export default function Demo() {
	return (
		<div className="flex flex-col gap-5 max-w-60">
			To Demo
			<Button
				onClick={async () => {
					// comp: component_tdx_2_1czr6zhzdj8nwqyt52eagmx5582cje8vk33vledd9gvs6c2t79uffx8
					// res: resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc

					const manifest = presaleNFTMintManifest(
						'component_tdx_2_1czr6zhzdj8nwqyt52eagmx5582cje8vk33vledd9gvs6c2t79uffx8',
						{
							accountId: radix.getCurrentAccount(),
							amount: '10',
							collateralAddress:
								'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
						},
					)

					radix.toolkit.walletApi.sendTransaction({
						transactionManifest: manifest,
					})
				}}
			>
				Create Random Token
			</Button>
			<Button
				onClick={async () => {
					const id =
						'resource_tdx_2_1tkv70vqy4ngajk7vuchkcp6settaqrzt23ca0mv3wvad7dmcuxv8jf'

					const result = await radix.getTokenDetails(id)

					console.log('result', result)
				}}
			>
				Get Details
			</Button>
			<Button
				onClick={async () => {
					const result = await radix.loadAllTokens()

					console.log('result', result)
				}}
			>
				Load Tokens
			</Button>
			<Button
				onClick={async () => {
					const ac = await radix.getCurrentAccount()
					console.log('ac', ac)
					const result =
						await radix.gateway.state.getEntityDetailsVaultAggregated(ac)

					console.log('result', result)
				}}
			>
				Load Tokens
			</Button>
		</div>
	)
}
