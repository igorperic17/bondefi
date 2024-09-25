'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Chart } from '@/app/project/launch/bounding-curve/chart'
import { cn } from '@/lib/utils'
import { BOUNDING_CURVES, BoundingCurve } from '@/lib/bounding-curve'
import { ArrowLeft, TrendingUpIcon, DollarSignIcon, CalendarIcon, StarIcon, InfoIcon, ChartLineIcon, ImageIcon } from 'lucide-react'
import { TokenDetails, extractTokenDetails } from '@/lib/radix/dto/tokenDetails'
import { MagicCard } from '@/components/magicui/magic-card'
import { BorderBeam } from "@/components/magicui/border-beam"
import { Progress } from "@/components/ui/progress"
import { radix } from '@/lib/radix'
import { featuredProjects } from '../featured-projects-mock'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

export default function TokenPage() {
    const { id } = useParams()
    const router = useRouter()
    const [token, setToken] = useState<TokenDetails | null>(null)
    const [userHoldings, setUserHoldings] = useState(0)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [purchaseAmount, setPurchaseAmount] = useState('')
    const [estimatedTokens, setEstimatedTokens] = useState(0)

    useEffect(() => {
        const fetchTokenDetails = async () => {
            if (id) {
                try {
                    const result = await radix.getTokenDetails(id as string)
                    if (result) {
                        setToken(result)
                        // Fetch user holdings here
                        const holdings = await radix.getUserHoldings(id as string)
                        // setUserHoldings(holdings)
                    }
                } catch (error) {
                    console.error('Error fetching token details:', error)
                }

                // If not found in radix or if there was an error, check featured projects
                if (!token) {
                    const featuredProject = featuredProjects.find(project => project.id === id)
                    if (featuredProject) {
                        const launchDate = new Date(featuredProject.launchDate);
                        setToken({
                            id: featuredProject.id,
                            name: featuredProject.name,
                            symbol: featuredProject.name.split(' ')[0].toUpperCase(),
                            description: 'Featured project description',
                            iconUrl: featuredProject.image,
                            dateCreated: launchDate,
                            bondingCurve: ['Linear'],
                            currentFunding: featuredProject.currentFunding,
                            fundraisingTarget: featuredProject.fundraisingTarget,
                            factoryComponentId: 'featured-component-id',
                            saleStartDate: launchDate,
                            saleEndDate: new Date(launchDate.getTime() + 30 * 24 * 60 * 60 * 1000),
                            infoUrl: featuredProject.projectUrl || '',
                        })
                    } else {
                        console.error('Token not found')
                    }
                }
            }
        }

        fetchTokenDetails()
    }, [id])

    const isNewToken = token ? (new Date().getTime() - new Date(token.dateCreated).getTime()) < 30 * 24 * 60 * 60 * 1000 : false;
    const isTrending = false; // You might want to implement a trending logic
    const isFundingReached = token ? token.currentFunding >= token.fundraisingTarget : false;

    const curve = useMemo(() => {
        if (token && token.bondingCurve.length > 0) {
            const curveType = token.bondingCurve[0].toLowerCase();
            return BOUNDING_CURVES.find(c => c.name.toLowerCase() === curveType) || BOUNDING_CURVES[0];
        }
        return BOUNDING_CURVES[0];
    }, [token]);

    const params = useMemo(() => {
        if (token && token.bondingCurve.length > 1) {
            return token.bondingCurve.slice(1).map(Number);
        }
        return [1];
    }, [token]);

    const handleBuy = () => {
        setIsDialogOpen(true)
    }

    const handlePurchaseConfirm = async () => {
        if (token) {
            try {
                // await radix.buyToken(token.id, Number(purchaseAmount))
                // Update user holdings after purchase
                const newHoldings = await radix.getUserHoldings(token.id)
                // setUserHoldings(newHoldings)
                setIsDialogOpen(false)
            } catch (error) {
                console.error('Error purchasing token:', error)
            }
        }
    }

    const handlePurchaseAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPurchaseAmount(e.target.value)
        // Calculate estimated tokens based on bonding curve
        if (token) {
            const estimated = calculateEstimatedTokens(Number(e.target.value), token.bondingCurve)
            setEstimatedTokens(estimated)
        }
    }

    const calculateEstimatedTokens = (amount: number, bondingCurve: string[]) => {
        // Implement the calculation based on the bonding curve
        // This is a placeholder implementation
        return amount * 100
    }

    const renderUserPanel = () => {
        if (!token) return null

        const now = new Date()
        const saleStartDate = new Date(token.saleStartDate)
        const saleEndDate = new Date(token.saleEndDate)

        if (now < saleStartDate) {
            return (
                <Card className="mb-4">
                    <CardContent>
                        <p>Sale has not started yet</p>
                        <p>Starts on: {saleStartDate.toLocaleDateString()}</p>
                    </CardContent>
                </Card>
            )
        }

        if (now > saleEndDate || isFundingReached) {
            if (userHoldings > 0) {
                return (
                    <Card className="mb-4">
                        <CardContent>
                            <p>Your holdings: {userHoldings} tokens</p>
                            <Button onClick={() => radix.claimTokens(token.id)}>Claim Tokens</Button>
                        </CardContent>
                    </Card>
                )
            } else {
                return (
                    <Card className="mb-4">
                        <CardContent>
                            <p>Sale has ended</p>
                        </CardContent>
                    </Card>
                )
            }
        }

        return (
            <Card className="mb-4">
                <CardContent>
                    <p>Your holdings: {userHoldings} tokens</p>
                    <Button onClick={handleBuy}>Buy Tokens</Button>
                </CardContent>
            </Card>
        )
    }

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
                                        <h2 className="text-2xl font-bold text-white">{token.name} ({token.symbol})</h2>
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
                                        Bonding Curve: {token.bondingCurve.join(', ') || 'Not specified'}
                                    </p>
                                    <p className="text-sm text-gray-400 mb-1 flex items-center">
                                        <DollarSignIcon className="w-4 h-4 mr-2" />
                                        Funding: ${token.currentFunding.toLocaleString()} / ${token.fundraisingTarget.toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-400 mb-4 flex items-center">
                                        <InfoIcon className="w-4 h-4 mr-2" />
                                        Factory Component: <a href={`https://stokenet-dashboard.radixdlt.com/component/${token.factoryComponentId}/summary`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">{token.factoryComponentId}</a>
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
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-white">Bonding Curve</h2>
                            <Chart curve={curve} params={params} />
                        </div>
                        {renderUserPanel()}
                    </>
                )}
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Buy Tokens</DialogTitle>
                        <DialogDescription>
                            Enter the amount you want to invest
                        </DialogDescription>
                    </DialogHeader>
                    <Input
                        type="number"
                        value={purchaseAmount}
                        onChange={handlePurchaseAmountChange}
                        placeholder="Enter amount"
                    />
                    <p>Estimated tokens: {estimatedTokens}</p>
                    <Button onClick={handlePurchaseConfirm}>Confirm Purchase</Button>
                </DialogContent>
            </Dialog>
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
