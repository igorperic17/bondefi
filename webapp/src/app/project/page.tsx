'use client'

import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import TokenCard from '@/components/token-card'
import { RainbowButton } from "@/components/magicui/rainbow-button"
import { ChevronRight, Rocket } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import HyperText from "@/components/magicui/hyper-text"
import { radix } from '@/lib/radix'
import { TokenDetails } from '@/lib/radix/dto/tokenDetails'
import { featuredProjects } from './featured-projects-mock'

const TokenList: React.FC = () => {
  const [tokens, setTokens] = useState<TokenDetails[]>([])
  const [cursor, setCursor] = useState<string | undefined>(undefined)
  const [hasMore, setHasMore] = useState(true)
  const [ref, inView] = useInView()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const fetchTokens = async () => {
    if (!hasMore) return

    setIsLoading(true)
    try {
      const result = await radix.loadAllTokens(cursor)
      const newTokens = result.items.map(item => item.token)

      setTokens((prevTokens) => [...prevTokens, ...newTokens])
      setCursor(result.nextCursor ?? undefined)
      setHasMore(!!result.nextCursor)
    } catch (error) {
      console.error('Error fetching tokens:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (inView && !isLoading) {
      fetchTokens()
    }
  }, [inView])

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">All Projects</h1>
        <RainbowButton
          onClick={() => router.push('/project/launch')}
        >
          <Rocket className="mr-2 h-4 w-4" />
          Launch your project
          <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
        </RainbowButton>
      </div>
      <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-8">
        {featuredProjects.map((project) => (
          <TokenCard
            key={project.id}
            image={project.image}
            name={project.name}
            totalSupply={project.totalSupply}
            launchDate={project.launchDate}
            projectUrl={project.projectUrl}
            isTrending={project.isTrending}
            isFundingReached={project.isFundingReached}
          />
        ))}
      </div>
      <h2 className="text-2xl font-bold mb-4">All Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 bor">
        {tokens.map((token) => (
          <TokenCard
            key={token.id}
            image={token.iconUrl}
            name={token.name}
            totalSupply="N/A" // This property is not available in the new token structure
            launchDate={new Date(token.dateCreated).toLocaleDateString()}
            projectUrl={`/project/${token.id}`}
            isTrending={false} // You might want to implement a trending logic
            isFundingReached={token.currentFunding >= token.fundraisingTarget}
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
      {hasMore && <div ref={ref} className="h-10 mt-4" />}
    </div>
  )
}

export default TokenList
