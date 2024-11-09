import type { Metadata } from 'next'
import './globals.css'
import AnimatedGridPattern from '@/components/magicui/animated-grid-pattern'
import { cn } from '@/lib/utils'
import Header from '@components/header'
import { ParticleConnectkit } from './connectkit'

export const metadata: Metadata = {
	title: 'bondefi.xyz',
	description: 'Radically different decentralized crowdfunding',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
    <html lang="en" className="dark">
      <body>
        <ParticleConnectkit>
          <AnimatedGridPattern
            numSquares={50}
            maxOpacity={0.4}
            duration={1}
            repeatDelay={1}
            className={cn(
              "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]",
              "fixed inset-0 z-0 opacity-80 inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
            )}
          />
          <div className="flex flex-col min-h-screen relative z-10">
            <Header className="w-full max-w-screen" />
            <div className="flex flex-1 pt-16">
              <main className="flex-1 p-32">{children}</main>
            </div>
          </div>
        </ParticleConnectkit>
      </body>
    </html>
  );
}
