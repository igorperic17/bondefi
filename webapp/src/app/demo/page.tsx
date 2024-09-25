'use client'

import { Button } from '@/components/ui/button'
// import { radix } from '@/lib/radix'
import { get } from 'lodash'
import {
    randFood,
    randCurrencyCode,
    randProductDescription,
} from '@ngneat/falso'

export default function Demo() {
    return (
        <div className="flex flex-col gap-5 max-w-60">
            To Demo
            <Button
                onClick={async () => {
                    // const result = await radix.creteToken({
                    //     collateralAddress:
                    //         'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
                    //     description: randProductDescription(),
                    //     iconUrl: `https://picsum.photos/seed/${Math.random()}/500/500`,
                    //     name: randFood(),
                    //     symbol: randCurrencyCode(),
                    //     tagList: [],
                    //     tokenDetailsUrl: 'https://www.radixdlt.com',
                    // })
                    // 
                    // const componentId = get(
                    //     result,
                    //     'transaction.receipt.state_updates.new_global_entities[1].entity_address'
                    // )

                    // console.log('componentId', componentId)
                }}
            >
                Create Random Token
            </Button>
            <Button
                onClick={async () => {
                    const id =
                        'resource_tdx_2_1thgnpjn3mewvs6k72y75waans8p90gkl59syjea8wvydddnuwr4sv8'

                    // const result = await radix.getTokenDetails(id)

                    // console.log('result', result)
                }}
            >
                Get Details
            </Button>
            <Button
                onClick={async () => {
                    // const result = await radix.loadAllTokens()

                    // console.log('result', result)
                }}
            >
                Load Tokens
            </Button>
        </div>
    )
}
