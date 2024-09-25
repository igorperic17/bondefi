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

					console.log('manifest', manifest)

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
						'resource_tdx_2_1thgnpjn3mewvs6k72y75waans8p90gkl59syjea8wvydddnuwr4sv8'

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
		</div>
	)
}
