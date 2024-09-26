'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
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
import { InvestmentDialog, ActionType } from './investment-dialog'
import { get, result } from 'lodash'
import { presaleNFTMintManifest } from '@/lib/radix/manifest/buy'
import { sellManifest } from '@/lib/radix/manifest/sell'
import { NonFungibleResourcesCollectionItemVaultAggregated, StateEntityDetailsVaultResponseItem } from '@radixdlt/babylon-gateway-api-sdk'

export default function TokenPage() {
    const { id } = useParams()
    const router = useRouter()
    const [token, setToken] = useState<TokenDetails | null>(null)
    const [tokens, setTokens] = useState<[StateEntityDetailsVaultResponseItem]>()
    const [nfts, setNfts] = useState<[NonFungibleResourcesCollectionItemVaultAggregated]>()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [investmentAmount, setInvestmentAmount] = useState('')
    const [tokenAmount, setTokenAmount] = useState(0)
    const [dialogAction, setDialogAction] = useState<ActionType>(ActionType.Buy)
    const [currentFunding, setCurrentFunding] = useState<number>(0)
    const fetchTokenDetails = useCallback(async () => {
        if (id) {
            try {
                const result = await radix.getTokenDetails(id as string)
                if (result) {
                    console.log("SETTING TOKEN", result);
                    setToken(result)
                    return result;  // Return the result for further use
                }
            } catch (error) {
                console.error('Error fetching token details:', error)
            }

            // If not found in radix or if there was an error, check featured projects
            const featuredProject = featuredProjects.find(project => project.id === id)
            if (featuredProject) {
                const launchDate = new Date(featuredProject.dateCreated);
                const tokenDetails = {
                    id: featuredProject.id,
                    name: featuredProject.name,
                    symbol: featuredProject.symbol,
                    description: featuredProject.description,
                    iconUrl: featuredProject.iconUrl,
                    dateCreated: launchDate,
                    bondingCurve: featuredProject.bondingCurve,
                    fundraisingTarget: featuredProject.fundraisingTarget,
                    factoryComponentId: featuredProject.factoryComponentId,
                    presaleStart: new Date(featuredProject.presaleStart),
                    presaleEnd: new Date(featuredProject.presaleEnd),
                    infoUrl: featuredProject.infoUrl,
                    collateralAddress: featuredProject.collateralAddress,
                    presaleGoal: featuredProject.presaleGoal,
                    presaleSuccess: featuredProject.presaleSuccess,
                    presaleTokenId: featuredProject.presaleTokenId
                }
                setToken(tokenDetails)
                return tokenDetails;
            } else {
                console.error('Token not found')
                return null;
            }
        }
    }, [id])

    const fetchCurrentFunding = useCallback(async (tokenDetails: TokenDetails | null) => {
        if (!tokenDetails) return;
        try {
            const ac = await radix.getCurrentAccount()
            console.log('ac', ac)
            const result = await radix.gateway.state.getEntityDetailsVaultAggregated(ac)
            const adequateResourceVault = get(result, 'vaults', []).find(vault => get(vault, 'resourceAddress') === tokenDetails.factoryComponentId)
            if (adequateResourceVault && typeof adequateResourceVault === 'object') {
                const amount = get(adequateResourceVault, 'amount')
                if (amount !== undefined) {
                    setCurrentFunding(Number(amount))
                }
            }
        } catch (error) {
            console.error('Error fetching current funding:', error)
        }
    }, [])

    const fetchNFTs = useCallback(async (tokenDetails: TokenDetails | null) => {
        if (!tokenDetails) return;
        try {
            const ac = await radix.getCurrentAccount()
            console.log('ac', ac)
            const result = await radix.gateway.state.getEntityDetailsVaultAggregated(ac)
            console.log(result);
            console.log("token: ", tokenDetails);
            const nftResources = get(result, 'non_fungible_resources.items', []);
            const matchingNFTs = nftResources.filter(resource =>
                resource.resource_address === tokenDetails.presaleTokenId
            );

            if (matchingNFTs.length > 0) {
                const nftCount = matchingNFTs.reduce((total, resource) =>
                    total + resource.vaults.items.reduce((vaultTotal, vault) =>
                        vaultTotal + vault.total_count, 0), 0);

                setNfts(matchingNFTs as [NonFungibleResourcesCollectionItemVaultAggregated]);
                console.log(`Found ${nftCount} NFTs for the token`);
            } else {
                console.log("No matching NFTs found");
                setNfts(undefined);
            }
        } catch (error) {
            console.error('Error fetching NFTs:', error)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const tokenDetails = await fetchTokenDetails();
            if (tokenDetails) {
                await Promise.all([
                    fetchCurrentFunding(tokenDetails),
                    fetchNFTs(tokenDetails)
                ]);
            }
        };
        fetchData();
    }, [id, fetchTokenDetails, fetchCurrentFunding, fetchNFTs])

    const isNewToken = token ? (new Date().getTime() - new Date(token.dateCreated).getTime()) < 30 * 24 * 60 * 60 * 1000 : false;
    const isTrending = false; // You might want to implement a trending logic
    const isFundingReached = token?.presaleSuccess;

    const curve = useMemo(() => {
        // if (token && token.bondingCurve.length > 0) {
        //     const curveType = token.bondingCurve[0].toLowerCase();
        //     console.log(curveType);
        //     console.log(BOUNDING_CURVES);
        //     return BOUNDING_CURVES.find(c => c.name.toLowerCase() === curveType) || BOUNDING_CURVES[0];
        // }
        return BOUNDING_CURVES[2];
    }, [token]);

    const params = useMemo(() => {
        if (token && token.bondingCurve.length > 1) {
            return token.bondingCurve.slice(1).map(Number);
        }
        return [1];
    }, [token]);

    const calculateTokenAmount = (investment: number) => {
        const tokenAmount = BOUNDING_CURVES[0].compute(investment, [parseFloat(token!.bondingCurve[1])])
        console.log(tokenAmount);
        return tokenAmount;
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

    const handleConfirmInvestment = async () => {
        if (!token) return;

        try {
            const accountId = await radix.getCurrentAccount();

            let manifest = undefined;
            if (dialogAction === ActionType.Buy) {
                manifest = presaleNFTMintManifest(token.factoryComponentId, {
                    accountId,
                    collateralAddress: token.collateralAddress,
                    amount: investmentAmount,
                });
            } else if (dialogAction === ActionType.Sell) {
                manifest = sellManifest(token.factoryComponentId, {
                    accountId,
                    tokenAddress: token.id,
                    amount: investmentAmount,
                });
            }
            // TODO: add for refund
            const result = await radix.toolkit.walletApi.sendTransaction({
                transactionManifest: manifest!,
            })
            const transactionId = result.unwrapOr(undefined)?.transactionIntentHash
            if (!transactionId) throw new Error(`Transaction failed: ${result}`)
            const _committedDetails = radix.gateway.transaction.getCommittedDetails(transactionId)

            console.log(`${dialogAction} confirmed:`, investmentAmount);
            setIsDialogOpen(false);
            // You might want to refresh the token details or user shares here
        } catch (error) {
            console.error(`Error during ${dialogAction}:`, error);
            // Handle the error (e.g., show an error message to the user)
        }
    }

    const openDialog = (action: ActionType) => {
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
                                <div className="relative w-80 h-80 rounded-tl-xl overflow-hidden">
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
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-400 mb-1 flex items-center">
                                            <DollarSignIcon className="w-4 h-4 mr-2" />
                                            Funding: ${currentFunding.toLocaleString()} / ${token.fundraisingTarget.toLocaleString()}
                                        </p>
                                        <Progress
                                            value={(currentFunding / token.fundraisingTarget) * 100}
                                            className="w-full h-2"
                                        />
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4 flex items-center">
                                        <InfoIcon className="w-4 h-4 mr-2" />
                                        Factory Component: <a href={`https://stokenet-dashboard.radixdlt.com/component/${token.factoryComponentId}/summary`} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline ml-2">{token.factoryComponentId}</a>
                                    </p>
                                    {token.presaleStart && token.presaleEnd && (
                                        <div className="w-full mb-4">
                                            <p className="text-sm text-gray-400 mb-1">Sale Timeline</p>
                                            <Progress value={getSaleProgress(new Date(token.presaleStart), new Date(token.presaleEnd))} className="w-full" />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>{new Date(token.presaleStart).toLocaleDateString()}</span>
                                                <span>{getSaleStatus(new Date(token.presaleStart), new Date(token.presaleEnd))}</span>
                                                <span>{new Date(token.presaleEnd).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {/* <div className="p-4 flex flex-col justify-between bg-gray-900 rounded-xl">
                                    <h2 className="text-2xl font-bold mb-4 text-white">Bonding Curve</h2>
                                    <Chart curve={curve} params={params} />
                                </div> */}
                                <div className="p-4 flex flex-col justify-between bg-gray-900 rounded-xl ml-4 w-6/12">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">You own</h3>
                                        <p className="text-6xl font-bold text-white mb-4">
                                            {tokens ? tokens.length : 0} {token.symbol}
                                        </p>
                                        <p className="text-6xl font-bold text-white mb-4">
                                            {nfts ? nfts.length : 0} NFTs
                                        </p>
                                    </div>
                                    <div className="flex flex-col space-y-2 ">
                                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" onClick={() => openDialog(ActionType.Buy)}>Buy</Button>
                                        {/* <Button className="w-full bg-red-500 hover:bg-red-600 text-white" onClick={() => openDialog(ActionType.Sell)}>Claim</Button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-gray-900 rounded-xl p-4">
                            <h3 className="text-2xl font-bold text-white mb-4">Your NFTs</h3>
                            {nfts && nfts.length > 0 ? (
                                <div className="space-y-4">
                                    {nfts.map((nft, index) => (
                                        <div key={index} className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
                                            <div>
                                                <p className="text-white font-semibold">{nft.resource_address}</p>
                                                {/* <p className="text-sm text-gray-400">Purchased: {new Date(nft.last_updated_at).toLocaleDateString()}</p>
                                                <p className="text-sm text-gray-400">Value: ${nft.vaults.items[0].total_amount}</p> */}
                                                <p className="text-sm text-gray-400">Purchased: Today</p>
                                                <p className="text-sm text-gray-400">Value: 100 USD</p>
                                            </div>
                                            <Button className="bg-green-500 hover:bg-green-600 text-white">Claim</Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">You don't own any NFTs for this token yet.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
            {isDialogOpen && (
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
            )}
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
