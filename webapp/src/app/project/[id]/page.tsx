'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import { BONDING_CURVES } from '@/lib/bonding-curve'
import { radix } from '@/lib/radix'
import { presaleNFTMintManifest } from '@/lib/radix/manifest/buy'
import { claimManifest } from '@/lib/radix/manifest/claim'
import { get } from 'lodash'
import {
    ArrowLeft,
    CalendarIcon,
    ChartLineIcon,
    DollarSignIcon,
    ImageIcon,
    InfoIcon,
    Loader,
    StarIcon,
    TrendingUpIcon,
} from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import type React from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ActionType, InvestmentDialog } from './investment-dialog'
import useEvmLaunchpad from '@/lib/evm/use-evm-launchpad'
import { useWallets } from '@particle-network/connectkit'
import { extractEVMTokenDetails, TokenDetails } from '@/lib/evm/dto/launch-details'
import useERC20 from '@/lib/evm/use-erc20'
import { ethers } from 'ethers'
import { Launchpad } from '@/typechain-types/contracts/launchpad/Launchpad'

type ExtractedNFT = {
    resourceAddress: string;
    tokenId: string;
    vaultAddress: string;
};

export default function TokenPage() {
    const { id } = useParams()
    const router = useRouter()
    const [token, setToken] = useState<TokenDetails | null>(null)
    const [tokens, setTokens] = useState<number>() // user's holdings
    const [nfts, setNfts] =
        useState<[ExtractedNFT]>()
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [investmentAmount, setInvestmentAmount] = useState('')
    const [tokenAmount, setTokenAmount] = useState(0) // for investment dialog
    const [dialogAction, setDialogAction] = useState<ActionType>(ActionType.Buy)
    const [currentFunding, setCurrentFunding] = useState<number>(0)
    const [claimingNFT, setClaimingNFT] = useState<string | null>(null)
    const { toast } = useToast()

    const [primaryWallet] = useWallets(); 
    const { launchpad } = useEvmLaunchpad(primaryWallet?.connector);
    const [collateralToken] = useERC20(primaryWallet?.connector, token?.collateralAddress ?? '');
    const [collateralTokenSymbol, setCollateralTokenSymbol] = useState<string | null>(null);
    const [userStats, setUserStats] = useState<Launchpad.UserStatsStructOutput | null>(null);

    // Fetch user investment stats from the launchpad contract
    const fetchUserStats = useCallback(async () => {
        if (!primaryWallet?.connector || !id || !launchpad) return;
        
        try {
            const address = await primaryWallet.getWalletClient().account!.address;
            if (!address) return;

            const stats = await launchpad.getUserStats(address, BigInt(id as string));
            console.log('stats', stats)
            setUserStats(stats);
        } catch (error) {
            console.error('Error fetching user stats:', error);
        }
    }, [primaryWallet?.connector, id, launchpad]);

    useEffect(() => {
        fetchUserStats();
    }, [fetchUserStats]);

    useEffect(() => {
        console.log('userStats', userStats)

        if (userStats) {
            setTokens(Number(userStats.tokenAmount))
            setNfts(Array(Number(userStats.nftBalance)).fill({
                resourceAddress: "dummy-address",
                tokenId: "dummy-id", 
                vaultAddress: "dummy-vault"
            }) as [ExtractedNFT])
        }
    }, [userStats])


    // store collateral symbol once token is loded
    useEffect(() => {
        const fetchCollateralSymbol = async () => {
            if (collateralToken) {
                try {
                    const symbol = await collateralToken.symbol();
                    setCollateralTokenSymbol(symbol);
                } catch (error) {
                    console.error('Error fetching collateral token symbol:', error);
                }
            }
        };
        fetchCollateralSymbol();
    }, [collateralToken]);

    const fetchTokenDetails = useCallback(async () => {
        console.log('fetching token details', id)
        if (id) {
            try {
                const result = await launchpad?.getLaunch(Number(id))
                if (result) {
                    console.log('SETTING TOKEN', result)
                    const tokenDetails = extractEVMTokenDetails(result)
                    setToken(tokenDetails)
                    return tokenDetails // Return the result for further use
                }
            } catch (error) {
                console.error('Error fetching token details:', error)
                return null
            }
        }
        return null
    }, [id, launchpad])

    // not needed for evm, funding is tracked on the launchpad contract
    // const fetchCurrentFunding = useCallback(
    //     async (tokenDetails: TokenDetails | null) => {
    //         if (!tokenDetails) return
    //         try {
    //             const result = await radix.gateway.state.getEntityDetailsVaultAggregated("")
    //             console.log("FUNGIBLE: ", result)
    //             const amount = get(result, 'fungible_resources.items[1].vaults.items[0].amount', '0')
    //             setCurrentFunding(Number(amount))
    //         } catch (error) {
    //             console.error('Error fetching current funding:', error)
    //         }
    //     },
    //     [],
    // )

    const fetchUserTokenSupply = useCallback(
        async (tokenDetails: TokenDetails | null) => {
            if (!tokenDetails) return
            try {
                const account = await radix.getCurrentAccount()
                const result = await radix.gateway.state.getEntityDetailsVaultAggregated(account)
                const userTokenVault = get(result, 'fungible_resources.items', []).find(
                    (resource) => resource.resource_address === tokenDetails.id
                )
                if (userTokenVault) {
                    const amount = get(userTokenVault, 'vaults.items[0].amount', '0')
                    setTokens(Number(amount))
                } else {
                    setTokens(0)
                }
            } catch (error) {
                console.error('Error fetching current token supply in user wallet:', error)
                setTokens(0)
            }
        },
        [],
    )

    const fetchNFTs = useCallback(async (tokenDetails: TokenDetails | null) => {
        if (!tokenDetails) return
        try {
            const ac = await radix.getCurrentAccount()
            console.log('ac', ac)
            const result =
                await radix.gateway.state.getEntityDetailsVaultAggregated(ac)
            console.log(result)
            console.log('token: ', tokenDetails)
            const nftResources = get(result, 'non_fungible_resources.items', [])
            const matchingNFTs = nftResources.filter(
                (resource) => resource.resource_address === tokenDetails.presaleTokenId,
            )

            if (matchingNFTs.length > 0) {
                const nftCount = matchingNFTs.reduce(
                    (total, resource) =>
                        total +
                        resource.vaults.items.reduce(
                            (vaultTotal, vault) => vaultTotal + vault.total_count,
                            0,
                        ),
                    0,
                )
                console.log(matchingNFTs);

                const extractedNFTs = matchingNFTs.flatMap(nft =>
                    nft.vaults.items?.flatMap(vault =>
                        vault.items?.map(item => ({
                            resourceAddress: nft.resource_address,
                            tokenId: item,
                            vaultAddress: vault.vault_address
                        })) ?? []
                    ) ?? []
                );
                console.log(extractedNFTs);
                setNfts(extractedNFTs as [ExtractedNFT]);
                console.log(`Found ${nftCount} NFTs for the token`)
            } else {
                console.log('No matching NFTs found')
                setNfts(undefined)
            }
        } catch (error) {
            console.error('Error fetching NFTs:', error)
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const tokenDetails: TokenDetails | null = await fetchTokenDetails()
            if (tokenDetails) {
                await Promise.all([
                    // fetchCurrentFunding(tokenDetails),
                    fetchNFTs(tokenDetails),
                    fetchUserTokenSupply(tokenDetails)
                ])
            }
        }
        fetchData()
    }, [id, fetchTokenDetails, fetchNFTs])

    const isNewToken = token
        ? new Date().getTime() - new Date(token.dateCreated).getTime() <
        30 * 24 * 60 * 60 * 1000
        : false
    const isTrending = false // You might want to implement a trending logic
    const isFundingReached = token?.presaleSuccess
    const isNotFunded = token && !token.presaleSuccess && new Date() > new Date(token.presaleEnd)

    // const curve = useMemo(() => {
    //     return BONDING_CURVES[2]
    // }, [token])

    // const params = useMemo(() => {
    //     if (token && token.bondingCurve.length > 1) {
    //         return token.bondingCurve.slice(1).map(Number)
    //     }
    //     return [1]
    // }, [token])

    // const calculateTokenAmount = (investment: number) => {
    //     console.log(investment);
    //     const tokenAmount = BONDING_CURVES[0].compute(investment,
    //         currentFunding,
    //         [parseFloat(token!.bondingCurve[1])]
    //     )
    //     console.log(tokenAmount)
    //     return tokenAmount
    // }

    const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setInvestmentAmount(value)
        const investment = parseFloat(value)
        if (!isNaN(investment)) {
            // const tokens = calculateTokenAmount(investment)
            // setTokenAmount(tokens[0])
            setTokenAmount(0) //TOOD: implement calculateTokenAmount
        } else {
            setTokenAmount(0)
        }
    }
    const handleConfirmInvestment = useCallback(async () => {
        console.log('handleConfirmInvestment', investmentAmount)
        if (!token || !primaryWallet?.connector) return

        try {
            if (!launchpad || !collateralToken) {
                throw new Error("Launchpad or collateral token not initialized");
            }
            const amount = ethers.parseUnits(investmentAmount, await collateralToken.decimals())
            console.log('amount', amount)
            
            // Check allowance and approve if needed
            const allowance = await collateralToken.allowance(
                await primaryWallet.getWalletClient().account!.address,
                await launchpad.getAddress()
            );

            if (allowance < amount) {
                const approveTx = await collateralToken.approve(
                    await launchpad.getAddress(),
                    amount
                );
                console.log('approveTx', approveTx)
                await approveTx.wait();
            }
            console.log('allowance seems to be good')

            if (dialogAction === ActionType.Buy) {
                const tx = await launchpad.buyTokens(
                    BigInt(token.id),
                    amount,
                    {
                        gasLimit: 10000000
                    }
                );
                console.log('tx', tx)

                await tx.wait();
            }

            console.log(`${dialogAction} confirmed:`, investmentAmount);
            setIsDialogOpen(false);

            // Refresh token details
            await Promise.all([
                fetchTokenDetails(),
                // fetchCurrentFunding(token),
                fetchNFTs(token),
                fetchUserTokenSupply(token)
            ]);

        } catch (error) {
            console.error(`Error during ${dialogAction}:`, error);
            // Handle the error (e.g., show an error message to the user)
        }
    }, [token, primaryWallet?.connector, launchpad, collateralToken, dialogAction, investmentAmount, fetchTokenDetails, fetchNFTs, fetchUserTokenSupply]);

    const openDialog = (action: ActionType) => {
        setDialogAction(action)
        setIsDialogOpen(true)
    }

    const handleClaimNFT = async (nft: ExtractedNFT) => {
        if (!token) return;
        setClaimingNFT(nft.tokenId);
        try {
            const accountId = await radix.getCurrentAccount();
            const manifest = claimManifest(
                "",
                {
                    accountId,
                    nftTokenAddress: token.presaleTokenId,
                    tokenId: nft.tokenId,
                },
            );

            const result = await radix.toolkit.walletApi.sendTransaction({
                transactionManifest: manifest,
            });

            const transactionId = result.unwrapOr(undefined)?.transactionIntentHash;
            if (!transactionId) throw new Error(`Transaction failed: ${result}`);

            toast({
                title: "Claim Successful",
                description: "Your NFT has been successfully claimed.",
            });

            // Refresh the NFTs
            // await fetchNFTs(token);
            // await fetchUserTokenSupply(token);
        } catch (error) {
            console.error('Error claiming NFT:', error);
            toast({
                title: "Claim Failed",
                description: "There was an error claiming your NFT. Please try again.",
                variant: "destructive",
            });
        } finally {
            setClaimingNFT(null);
        }
    };

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
                                        <h2 className="text-2xl font-bold text-white">
                                            {token.name} ({token.symbol})
                                        </h2>
                                        <div className="flex flex-col space-y-1 items-end">
                                            {(isNewToken || isTrending || isFundingReached || isNotFunded) && (
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
                                                    {isNotFunded && (
                                                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                                            <DollarSignIcon className="w-4 h-4 mr-1" />
                                                            Not funded
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
                                    <p className="text-sm text-gray-400 mb-1 flex items-center group relative">
                                        <DollarSignIcon className="w-4 h-4 mr-2" />
                                        Collateral Token: {collateralTokenSymbol || 'Loading...'}
                                        <span className="invisible group-hover:visible absolute left-0 -bottom-12 bg-gray-800 text-white text-xs p-2 rounded shadow-lg">
                                            This is the token you'll use to invest in this project.
                                            Contract: {token.collateralAddress}
                                        </span>
                                    </p>
                                    <div className="mb-2">
                                        <p className="text-sm text-gray-400 mb-1 flex items-center">
                                            <DollarSignIcon className="w-4 h-4 mr-2" />
                                            Funding: ${currentFunding.toLocaleString()} / $
                                            {token.presaleGoal.toLocaleString()}
                                        </p>
                                        <Progress
                                            value={(currentFunding / Number(token.presaleGoal)) * 100}
                                            className="w-full h-2"
                                        />
                                    </div>
                                    {token.presaleStart && token.presaleEnd && (
                                        <div className="w-full mb-4">
                                            <p className="text-sm text-gray-400 mb-1">
                                                Sale Timeline
                                            </p>
                                            <Progress
                                                value={getSaleProgress(
                                                    new Date(token.presaleStart),
                                                    new Date(token.presaleEnd),
                                                )}
                                                className="w-full"
                                            />
                                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                <span>
                                                    {new Date(token.presaleStart).toLocaleDateString()}
                                                </span>
                                                <span>
                                                    {getSaleStatus(
                                                        new Date(token.presaleStart),
                                                        new Date(token.presaleEnd),
                                                    )}
                                                </span>
                                                <span>
                                                    {new Date(token.presaleEnd).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="p-4 flex flex-col justify-between bg-gray-900 rounded-xl ml-4 w-6/12">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            You own
                                        </h3>
                                        <p className="text-6xl font-bold text-white mb-4">
                                            {userStats ? ethers.parseUnits(userStats.tokenAmount.toString(), userStats.tokenDecimals) : 0} {token.symbol}
                                        </p>
                                        <p className="text-6xl font-bold text-white mb-4">
                                            {userStats?.nftBalance ?? 0} NFTs
                                        </p>
                                    </div>
                                    <div className="flex flex-col space-y-2 ">
                                        <Button
                                            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                                            onClick={() => openDialog(ActionType.Buy)}
                                            disabled={isFundingReached || (token.presaleEnd && new Date() > new Date(token.presaleEnd))}
                                            title={
                                                isFundingReached
                                                    ? "The project funding has ended."
                                                    : (token.presaleEnd && new Date() > new Date(token.presaleEnd))
                                                        ? "The sale period has ended."
                                                        : undefined
                                            }
                                        >
                                            {isFundingReached ? "Funding ended" : (token.presaleEnd && new Date() > new Date(token.presaleEnd)) ? "Sale ended" : "Buy"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-gray-900 rounded-xl p-4">
                            <h3 className="text-2xl font-bold text-white mb-4">Your NFTs</h3>
                            {nfts && nfts.length > 0 ? (
                                <div className="space-y-4">
                                    {nfts.map((nft, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
                                        >
                                            <div>
                                                <p className="text-white font-semibold">
                                                    {nft.resourceAddress}
                                                </p>
                                                <p className="text-sm text-gray-400">
                                                    Purchased: Today
                                                </p>
                                                <p className="text-sm text-gray-400">Value: 100 USD</p>
                                            </div>
                                            <div className="flex items-center">

                                                {token.presaleEnd && new Date() <= new Date(token.presaleEnd) && (
                                                    <span className="ml-2 text-sm text-gray-400 mr-4">
                                                        Claiming tokens not possible during the sale
                                                    </span>
                                                )}
                                                <Button
                                                    className="bg-green-500 hover:bg-green-600 text-white"
                                                    onClick={() => handleClaimNFT(nft)}
                                                    disabled={claimingNFT === nft.tokenId || (token.presaleEnd && new Date() <= new Date(token.presaleEnd))}
                                                >
                                                    {claimingNFT === nft.tokenId ? (
                                                        <>
                                                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                                                            Claiming...
                                                        </>
                                                    ) : (
                                                        'Claim'
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-400">
                                    You don't own any NFTs for this token yet.
                                </p>
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
