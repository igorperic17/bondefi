'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Chart } from '@/app/project/launch/bounding-curve/chart'
import { cn } from '@/lib/utils'
import { BOUNDING_CURVES, BoundingCurve } from '@/lib/bounding-curve'
import { ArrowLeft, TrendingUpIcon, DollarSignIcon, CalendarIcon, StarIcon, InfoIcon, ChartLineIcon } from 'lucide-react'
import { TokenDetails, extractTokenDetails } from '@/lib/radix/dto/tokenDetails'
import { MagicCard } from '@/components/magicui/magic-card'
import { BorderBeam } from "@/components/magicui/border-beam"
import { Progress } from "@/components/ui/progress"
import { radix } from '@/lib/radix'

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

    const isNewToken = token ? (new Date().getTime() - new Date(token.dateCreated).getTime()) < 30 * 24 * 60 * 60 * 1000 : false;

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
                        <h1 className="text-3xl font-bold mb-6 text-white">{token.name} Overview</h1>
                        <MagicCard className="mb-6 overflow-hidden shadow-lg rounded-xl transform transition duration-500 hover:scale-105 cursor-pointer flex flex-col relative border-0 shadow-gray-800 whitespace-nowrap">
                            <BorderBeam size={250} duration={12} delay={9} />
                            <div className="relative h-48 w-full rounded-t-xl overflow-hidden">
                                <Image
                                    src={token.iconUrl || '/placeholder.png'}
                                    alt={`${token.name} token`}
                                    layout="fill"
                                    objectFit="cover"
                                    className="transition duration-500 ease-in-out transform hover:scale-105"
                                />
                                {isNewToken && (
                                    <div className="absolute top-2 right-2 flex flex-col space-y-1 items-end">
                                        <div className="bg-black bg-opacity-50 p-1 rounded-2xl space-y-1">
                                            <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                                <StarIcon className="w-4 h-4 mr-1" />
                                                New
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex flex-col items-center w-full">
                                <h2 className="text-2xl font-bold mb-2 text-white">{token.name} ({token.symbol})</h2>
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
                                    Bonding Curve: {token.bondingCurve.join(', ') || 'Not specified'}
                                </p>
                                <p className="text-sm text-gray-400 mb-1 flex items-center">
                                    <DollarSignIcon className="w-4 h-4 mr-2" />
                                    Funding: ${token.currentFunding.toLocaleString()} / ${token.fundraisingTarget.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-400 mb-4 flex items-center">
                                    <InfoIcon className="w-4 h-4 mr-2" />
                                    Factory Component: {token.factoryComponentId}
                                </p>
                                {token.saleStartDate && token.saleEndDate && (
                                    <div className="w-full mb-4">
                                        <p className="text-sm text-gray-400 mb-1">Sale Timeline</p>
                                        <Progress value={getSaleProgress(new Date(token.saleStartDate), new Date(token.saleEndDate))} className="w-full" />
                                        <div className="flex justify-between text-xs text-gray-400 mt-1">
                                            <span>{new Date(token.saleStartDate).toLocaleDateString()}</span>
                                            <span>{getSaleStatus(new Date(token.saleStartDate), new Date(token.saleEndDate))}</span>
                                            <span>{new Date(token.saleEndDate).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                )}
                                <a href={token.infoUrl} className="text-blue-400 hover:underline">More Info</a>
                            </div>
                        </MagicCard>
                    </>
                )}
            </div>
        </div>
    )
}

function getSaleStatus(startDate: Date, endDate: Date) {
    const now = new Date();
    if (now < startDate) return "Not Started";
    if (now > endDate) return "Finished";
    return "In Progress";
}

function getSaleProgress(startDate: Date, endDate: Date) {
    const now = new Date();
    const total = endDate.getTime() - startDate.getTime();
    const progress = now.getTime() - startDate.getTime();
    return Math.min(100, Math.max(0, (progress / total) * 100));
}
