'use client'

import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import TokenCard from '@/components/token-card'
import { RainbowButton } from "@/components/magicui/rainbow-button"
import { Rocket } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import HyperText from "@/components/magicui/hyper-text"

interface Token {
  id: string
  image: string
  name: string
  totalSupply: string
  launchDate: string
  projectUrl: string
  isTrending: boolean
  isFundingReached: boolean
}

const TokenList: React.FC = () => {
  const [tokens, setTokens] = useState<Token[]>([])
  const [page, setPage] = useState(1)
  const [ref, inView] = useInView()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const fetchTokens = async () => {
    setIsLoading(true)
    // Mock API call with a delay to simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000))

    const newTokens: Token[] = Array.from({ length: 10 }, (_, i) => ({
      id: `token-${page}-${i}`,
      image: `https://picsum.photos/500/500?random=${page * 10 + i}`,
      name: `Token ${page * 10 + i}`,
      totalSupply: `${Math.floor(Math.random() * 1000000)} tokens`,
      launchDate: new Date(
        Date.now() - Math.random() * 10000000000
      ).toLocaleDateString(),
      projectUrl: `/token/${page * 10 + i}`,
      isTrending: Math.random() > 0.5,
      isFundingReached: Math.random() > 0.5,
    }))

    setTokens((prevTokens) => [...prevTokens, ...newTokens])
    setPage((prevPage) => prevPage + 1)
    setIsLoading(false)
  }

  useEffect(() => {
    if (inView) {
      fetchTokens()
    }
  }, [inView])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <RainbowButton
          onClick={() => router.push('/token/launch')}
        >
          <Rocket className="mr-2 h-4 w-4" />
          Launch your project
        </RainbowButton>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 bor">
        {tokens.map((token) => (
          <TokenCard
            key={token.projectUrl}
            image={token.image}
            name={token.name}
            totalSupply={token.totalSupply}
            launchDate={token.launchDate}
            projectUrl={token.projectUrl}
            isTrending={token.isTrending}
            isFundingReached={token.isFundingReached}
          />
        ))}
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="text-center">
            <HyperText className="text-xl font-bold" text='Loading projects...'></HyperText>
          </div>
        </div>
      )}
      <div ref={ref} className="h-10 mt-4" />
    </div>
  )
}

export default TokenList
