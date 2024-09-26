'use client'

import { Button } from '@/components/ui/button'
import { radix } from '@/lib/radix'
import type { CreateTokenProps } from '@/lib/radix/manifest/create-token'
import { add } from 'date-fns'
import { get } from 'lodash'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { BoundingCurve } from './bounding-curve'
import { TokenForm } from './form'

export default function LaunchToken() {
	const [loading, setLoading] = useState(false)
	const router = useRouter()

	const [params, setParams] = useState<CreateTokenProps>({
		collateralAddress: '',
		name: '',
		description: '',
		iconUrl: '',
		symbol: '',
		tagList: [],
		projectUrl: '',
		bondingCurveType: 0,
		bondingCurveParameters: [0.4],
		presaleGoal: '100',
		saleStart: new Date(),
		saleEnd: add(new Date(), { days: 30 }),
	})

	const launchToken = async () => {
		setLoading(true)
		const newPrams = {
			...params,
			iconUrl: params.iconUrl || 'https://picsum.photos/600/600',
		}
		const result = await radix.creteToken(newPrams).finally(() => {
			setLoading(false)
		})

		const id = get(result, 'transaction.affected_global_entities[2]', '')
		router.push(`/project/${id}`)
	}

	return (
		<div className="p-4 w-full">
			<h1 className="text-3xl font-bold mb-6 text-white">Launch New Project</h1>
			<div className="flex gap-10">
				<div className="flex-[0.6]">
					<TokenForm params={params} onSet={setParams} />

					<Button onClick={launchToken}>Launch Token</Button>
				</div>

				<div className="flex-1">
					<BoundingCurve params={params} onSet={setParams} />
				</div>
			</div>
		</div>
	)
}
