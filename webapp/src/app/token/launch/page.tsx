'use client'

import React, { useState, ChangeEvent } from 'react'
import { Button } from '@/components/ui/button'
import { CreateTokenProps } from '@/lib/radix/manifest/create-token'
import { TokenForm } from './form'
import { BoundingCurve } from './bounding-curve'
import { radix } from '@/lib/radix'

export default function LaunchToken() {
  const [loading, setLoading] = useState(false)

  const [params, setParams] = useState<CreateTokenProps>({
    collateralAddress: '',
    name: '',
    description: '',
    iconUrl: '',
    symbol: '',
    tagList: [],
    tokenDetailsUrl: '',
    bondingCurveType: 0,
    bondingCurveParameters: [1],
  })

  const launchToken = async () => {
    setLoading(true)
    radix.creteToken(params).finally(() => setLoading(false))
  }

  return (
    <div className="p-4 w-full">
      <h1 className="text-3xl font-bold mb-6 text-white">Launch New Token</h1>
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
