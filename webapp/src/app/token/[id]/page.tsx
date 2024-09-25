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

interface Transaction {
    id: string
    date: string
    amount: string
    type: string
}

export default function TokenPage() {
    const { id } = useParams()
    const router = useRouter()
    const [token, setToken] = useState<TokenDetails | null>(null)
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [page, setPage] = useState(1)

    useEffect(() => {
        console.log(id)
        if (id) {
            // Mock API call to fetch token details
            const fetchedToken: TokenDetails = {
                id: id as string,
                name: `Token ${id}`,
                symbol: 'TKN',
                description: 'This is a sample token description.',
                iconUrl: `https://picsum.photos/200/300?random=${id}`,
                infoUrl: 'https://example.com',
                bondingCurve: ['linear', '1', '0'],
                factoryComponentId: 'component_sim1q0a7ecesc8jvwd9xvsncz9q8ra4gmhc2m8e9z8ys5crg3r9nz',
                dateCreated: new Date(Date.now() - Math.random() * 10000000000),
                fundraisingTarget: 100000,
                currentFunding: 50000,
                saleStartDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
                saleEndDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            }
            setToken(fetchedToken)

            // Mock API call to fetch transactions
            const newTransactions: Transaction[] = Array.from({ length: 10 }, (_, i) => ({
                id: `transaction-${page}-${i}`,
                date: new Date(Date.now() - Math.random() * 100000000).toLocaleDateString(),
                amount: `${Math.floor(Math.random() * 1000)} tokens`,
                type: Math.random() > 0.5 ? 'buy' : 'sell',
            }))
            setTransactions(prevTransactions => [...prevTransactions, ...newTransactions])
        }
    }, [id, page])

    const loadMoreTransactions = () => {
        setPage(prevPage => prevPage + 1)
    }

    const curve = useMemo(() => BOUNDING_CURVES[0], [])
    const params = useMemo(() => [1], [])

    const isNewToken = token ? (new Date().getTime() - token.dateCreated.getTime()) < 30 * 24 * 60 * 60 * 1000 : false;

    const getSaleStatus = (startDate: Date, endDate: Date) => {
        const now = new Date();
        if (now < startDate) return "Not Started";
        if (now > endDate) return "Finished";
        return "In Progress";
    }

    const getSaleProgress = (startDate: Date, endDate: Date) => {
        const now = new Date();
        const total = endDate.getTime() - startDate.getTime();
        const progress = now.getTime() - startDate.getTime();
        return Math.min(100, Math.max(0, (progress / total) * 100));
    }

    return (
        <div>
            <Button
                onClick={() => router.push('/project')}
                className="mb-4 flex items-center"
                variant="outline"
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Token List
            </Button>
            <div className="p-4 w-full">
                {token && (
                    <>
                        <h1 className="text-3xl font-bold mb-6 text-white">{token.name} Overview</h1>
                        <div className="mb-6 overflow-hidden shadow-lg rounded-xl transform transition duration-500 hover:scale-105 cursor-pointer flex flex-col relative border-0 shadow-gray-800 whitespace-nowrap">

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
                                    Launched: {token.dateCreated.toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-400 mb-1 flex items-center">
                                    <InfoIcon className="w-4 h-4 mr-2" />
                                    {token.description}
                                </p>
                                <p className="text-sm text-gray-400 mb-1 flex items-center">
                                    <ChartLineIcon className="w-4 h-4 mr-2" />
                                    Bonding Curve: {token.bondingCurve.join(', ')}
                                </p>
                                <p className="text-sm text-gray-400 mb-1 flex items-center">
                                    <DollarSignIcon className="w-4 h-4 mr-2" />
                                    Funding: ${token.currentFunding.toLocaleString()} / ${token.fundraisingTarget.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-400 mb-4 flex items-center">
                                    <InfoIcon className="w-4 h-4 mr-2" />
                                    Factory Component: <a href={`https://dashboard.radixdlt.com/component/${token.factoryComponentId}`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-1">{token.factoryComponentId}</a>
                                </p>
                                <div className="w-full mb-4">
                                    <p className="text-sm text-gray-400 mb-1">Sale Timeline</p>
                                    <Progress value={getSaleProgress(token.saleStartDate, token.saleEndDate)} className="w-full" />
                                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                                        <span>{token.saleStartDate.toLocaleDateString()}</span>
                                        <span>{getSaleStatus(token.saleStartDate, token.saleEndDate)}</span>
                                        <span>{token.saleEndDate.toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <a href={token.infoUrl} className="text-blue-400 hover:underline">More Info</a>
                            </div>
                        </div>
                        <div className="mb-6">
                            <Chart curve={curve} params={params} />
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold mb-4 text-white">Transactions</h2>
                            <div className="grid grid-cols-1 gap-4">
                                {transactions.map(transaction => (
                                    <Card key={transaction.id} className="bg-gradient-to-br from-gray-700 to-black-800 border border-black-700">
                                        <CardContent>
                                            <p className="text-sm text-gray-300 mb-1">Date: {transaction.date}</p>
                                            <p className="text-sm text-gray-300 mb-1">Amount: {transaction.amount}</p>
                                            <p className={cn(
                                                "text-sm mb-1",
                                                "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent"
                                            )}>Type: {transaction.type}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <Button onClick={loadMoreTransactions} className="mt-4">Load More</Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
