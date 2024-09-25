'use client'

import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import TokenCard from '@/components/token-card'

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

  const fetchTokens = async () => {
    // Mock API call
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
  }

  useEffect(() => {
    if (inView) {
      fetchTokens()
    }
  }, [inView])

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">All Tokens</h1>
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
      <div ref={ref} className="h-10 mt-4" />
    </div>
  )
}

export default TokenList
