'use client'

import { Chart } from '@/app/project/launch/bounding-curve/chart'
import { BorderBeam } from '@/components/magicui/border-beam'
import { MagicCard } from '@/components/magicui/magic-card'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { BOUNDING_CURVES, BoundingCurve } from '@/lib/bounding-curve'
import { radix } from '@/lib/radix'
import {
	type TokenDetails,
	extractTokenDetails,
} from '@/lib/radix/dto/tokenDetails'
import { cn } from '@/lib/utils'
import {
	ArrowLeft,
	CalendarIcon,
	ChartLineIcon,
	DollarSignIcon,
	ImageIcon,
	InfoIcon,
	StarIcon,
	TrendingUpIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useState, useEffect, useMemo } from 'react'

export default function TokenPage() {
	const { id } = useParams()
	const router = useRouter()
	const [token, setToken] = useState<TokenDetails | null>(null)

	useEffect(() => {
		const fetchTokenDetails = async () => {
			if (id) {
				try {
					const result = await radix.getTokenDetails(id as string)
					setToken(result)
				} catch (error) {
					console.error('Error fetching token details:', error)
				}
			}
		}

		fetchTokenDetails()
	}, [id])

	const isNewToken = token
		? new Date().getTime() - new Date(token.dateCreated).getTime() <
			30 * 24 * 60 * 60 * 1000
		: false
	const isTrending = false // You might want to implement a trending logic
	const isFundingReached = token ? 0 >= token.fundraisingTarget : false

	const curve = useMemo(() => {
		console.log(token?.bondingCurve)
		if (token && token.bondingCurve.length > 0) {
			const curveType = token.bondingCurve[0].toLowerCase()
			return (
				BOUNDING_CURVES.find((c) => c.name.toLowerCase() === curveType) ||
				BOUNDING_CURVES[0]
			)
		}
		return BOUNDING_CURVES[0]
	}, [token])

	const params = useMemo(() => {
		if (token && token.bondingCurve.length > 1) {
			return token.bondingCurve.slice(1).map(Number)
		}
		return [1]
	}, [token])

	return (
		<div>
			<Button
				onClick={() => router.push('/project')}
				className="mb-4 flex items-center"
				variant="outline"
			>
				<ArrowLeft className="mr-2 h-4 w-4" /> Back to Project List
			</Button>
			<div className="p-4 w-full">
				{token && (
					<>
						<h1 className="text-3xl font-bold mb-6 text-white">
							{token.name} Overview
						</h1>
						<div className="mb-6 overflow-hidden shadow-lg rounded-xl transform flex flex-col relative border-0 shadow-gray-800 whitespace-nowrap">
							<div className="flex">
								<div className="relative w-80 h-92 rounded-tl-xl overflow-hidden">
									{token.iconUrl ? (
										<Image
											src={token.iconUrl}
											alt={`${token.name} token`}
											layout="fill"
											objectFit="cover"
											className="transition duration-500 ease-in-out transform hover:scale-105"
										/>
									) : (
										<div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
											<div className="text-white text-center">
												<ImageIcon className="w-12 h-12 mx-auto mb-2" />
												<p className="text-sm">No image available</p>
											</div>
										</div>
									)}
								</div>
								<div className="p-4 flex flex-col flex-grow">
									<div className="flex justify-between items-start mb-2">
										<h2 className="text-2xl font-bold text-white">
											{token.name} ({token.symbol})
										</h2>
										<div className="flex flex-col space-y-1 items-end">
											{(isNewToken || isTrending || isFundingReached) && (
												<div className="bg-black bg-opacity-50 p-1 rounded-2xl space-y-1">
													{isNewToken && (
														<span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
															<StarIcon className="w-4 h-4 mr-1" />
															New
														</span>
													)}
													{isTrending && (
														<span className="bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
															<TrendingUpIcon className="w-4 h-4 mr-1" />
															Trending
														</span>
													)}
													{isFundingReached && (
														<span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
															<DollarSignIcon className="w-4 h-4 mr-1" />
															Funded
														</span>
													)}
												</div>
											)}
										</div>
									</div>
									<p className="text-sm text-gray-400 mb-1 flex items-center">
										<CalendarIcon className="w-4 h-4 mr-2" />
										Launched: {new Date(token.dateCreated).toLocaleDateString()}
									</p>
									<p className="text-sm text-gray-400 mb-1 flex items-center">
										<InfoIcon className="w-4 h-4 mr-2" />
										{token.description}
									</p>
									<p className="text-sm text-gray-400 mb-1 flex items-center">
										<ChartLineIcon className="w-4 h-4 mr-2" />
										Bonding Curve:{' '}
										{token.bondingCurve.join(', ') || 'Not specified'}
									</p>
									<p className="text-sm text-gray-400 mb-1 flex items-center">
										<DollarSignIcon className="w-4 h-4 mr-2" />
										Funding: ${0} / ${token.presaleGoal}
									</p>
									<p className="text-sm text-gray-400 mb-4 flex items-center">
										<InfoIcon className="w-4 h-4 mr-2" />
										Factory Component:{' '}
										<a
											href={`https://stokenet-dashboard.radixdlt.com/component/${token.factoryComponentId}/summary`}
											target="_blank"
											rel="noopener noreferrer"
											className="text-blue-400 hover:underline ml-2"
										>
											{token.factoryComponentId}
										</a>
									</p>
									{token.presaleStart && token.presaleEnd && (
										<div className="w-full mb-4">
											<p className="text-sm text-gray-400 mb-1">
												Sale Timeline
											</p>
											<Progress
												value={getSaleProgress(
													token.presaleStart,
													token.presaleEnd,
												)}
												className="w-full"
											/>
											<div className="flex justify-between text-xs text-gray-400 mt-1">
												<span>{token.presaleStart.toLocaleDateString()}</span>
												<span>
													{getSaleStatus(token.presaleStart, token.presaleEnd)}
												</span>
												<span>{token.presaleEnd.toLocaleDateString()}</span>
											</div>
										</div>
									)}
								</div>
							</div>
						</div>
						<div className="mb-6">
							<h2 className="text-2xl font-bold mb-4 text-white">
								Bonding Curve
							</h2>
							<Chart curve={curve} params={params} />
						</div>
					</>
				)}
			</div>
		</div>
	)
}

function getSaleStatus(startDate: Date, endDate: Date) {
	const now = new Date()
	if (now < startDate) return 'Not Started'
	if (now > endDate) return 'Finished'
	return 'In Progress'
}

function getSaleProgress(startDate: Date, endDate: Date) {
	const now = new Date()
	const total = endDate.getTime() - startDate.getTime()
	const progress = now.getTime() - startDate.getTime()
	return Math.min(100, Math.max(0, (progress / total) * 100))
}
