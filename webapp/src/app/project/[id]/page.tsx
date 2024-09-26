'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { Chart } from '@/app/project/launch/bounding-curve/chart'
import { BOUNDING_CURVES } from '@/lib/bounding-curve'
import { ArrowLeft, TrendingUpIcon, DollarSignIcon, CalendarIcon, StarIcon, InfoIcon, ChartLineIcon, ImageIcon } from 'lucide-react'
import { TokenDetails } from '@/lib/radix/dto/tokenDetails'
import { Progress } from "@/components/ui/progress"
import { radix } from '@/lib/radix'
import { featuredProjects } from '../featured-projects-mock'
import { InvestmentDialog } from './investment-dialog'

export default function TokenPage() {
    const { id } = useParams()
    const router = useRouter()
    const [token, setToken] = useState<TokenDetails | null>(null)
    const [userShares, setUserShares] = useState<number>(0)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [investmentAmount, setInvestmentAmount] = useState('')
    const [tokenAmount, setTokenAmount] = useState(0)
    const [dialogAction, setDialogAction] = useState<'buy' | 'sell' | 'refund'>('buy')

    useEffect(() => {
        const fetchTokenDetails = async () => {
            if (id) {
                try {
                    const result = await radix.getTokenDetails(id as string)
                    if (result) {
                        setToken(result)
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
        // Fetch user shares (this is a placeholder, replace with actual API call)
        setUserShares(100)
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

    const calculateTokenAmount = (investment: number) => {
        // This is a simplified Bancor formula. You should replace this with the actual
        // formula based on the specific bonding curve and parameters of the token.
        const connectorWeight = 0.5; // This should come from the token's parameters
        const supply = token ? token.currentFunding : 0;
        const price = supply / (1 - connectorWeight);
        return investment / price;
    }

    const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInvestmentAmount(value);
        const investment = parseFloat(value);
        if (!isNaN(investment)) {
            const tokens = calculateTokenAmount(investment);
            setTokenAmount(tokens);
        } else {
            setTokenAmount(0);
        }
    }

    const handleConfirmInvestment = () => {
        // Implement the logic to confirm the investment
        console.log('Investment confirmed:', investmentAmount);
        setIsDialogOpen(false);
    }

    const openDialog = (action: 'buy' | 'sell' | 'refund') => {
        setDialogAction(action);
        setIsDialogOpen(true);
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
                                <div className="p-4 flex w-3/12 flex-col justify-between bg-gray-900 rounded-xl">
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2">You own</h3>
                                        <p className="text-3xl font-bold text-white mb-4">
                                            {userShares} {token.symbol}
                                        </p>
                                    </div>
                                    <div className="flex flex-col space-y-2 ">
                                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={() => openDialog('buy')}>Buy</Button>
                                        <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={() => openDialog('sell')}>Sell</Button>
                                        <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" onClick={() => openDialog('refund')}>Refund</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-white">Bonding Curve</h2>
                            <Chart curve={curve} params={params} />
                        </div>
                    </>
                )}
            </div>
            <InvestmentDialog
                isOpen={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                tokenName={token?.name || ''}
                tokenSymbol={token?.symbol || ''}
                amount={investmentAmount}
                resultAmount={tokenAmount}
                onAmountChange={handleInvestmentChange}
                onConfirm={handleConfirmInvestment}
                actionType={dialogAction}
            />
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
