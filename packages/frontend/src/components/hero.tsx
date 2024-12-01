import React from 'react';
import { MagicCard } from '@/components/magicui/magic-card';
import { BorderBeam } from "@/components/magicui/border-beam";
import AnimatedGradientText from "@/components/magicui/animated-gradient-text";
import Image from 'next/image';
import heroScreenshot from '../../public/hero.png';
import { cn } from '@/lib/utils';
import { ChevronRight, Rocket } from 'lucide-react';
import { RainbowButton } from "@/components/magicui/rainbow-button";

const Hero: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <div className="text-center">
                <AnimatedGradientText className='mb-8'>
                    <a href="https://www.encode.club/chain-abstraction-hackathon" target="_blank" rel="noopener noreferrer" className="group flex items-center">
                        🎉 <hr className="mx-2 h-4 w-[1px] shrink-0 bg-gray-300" />{" "}
                        <span
                            className={cn(
                                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`,
                            )}
                        >
                            We're hacking at Encode Chain Abstraction Hackathon!
                        </span>
                        <ChevronRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                    </a>
                </AnimatedGradientText>
                <h2 className="text-8xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">Radically Different</h2>
                <h2 className="text-8xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">Decentralized Crowdfunding</h2>
                <p className="text-lg text-gray-400 mb-8 w-3/5 mx-auto">Emit your token on a bonding curve and collect equity for your project in a fair, safe and transparent way! Enjoy guaranteed liquidity and avoid the bad reputation problem of ICOs.</p>
                <div className="flex justify-center space-x-6">
                    <div className="mt-4">
                        <RainbowButton
                            onClick={() => window.location.href = '/project/launch'}
                        // className="group"
                        >
                            <Rocket className="mr-2 h-4 w-4" />
                            Launch your project
                            <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5" />
                        </RainbowButton>
                    </div>
                    <button
                        onClick={() => window.location.href = '/project'}
                        className="pl-6 p-6 py-3 m-3 bg-transparent text-white font-bold rounded-lg shadow-lg border border-plate hover:bg-slate-700  transition duration-300 relative group"
                    >
                        Explore projects
                    </button>
                </div>
            </div>
            <div className="mt-12 w-full max-w-6xl">
                <MagicCard className="relative w-full m-10 h-140 shadow-lg rounded-xl overflow-hidden">
                    <BorderBeam size={250} duration={4} delay={9} />
                    <Image
                        src={heroScreenshot}
                        alt="Platform Screenshot"
                        style={{ objectFit: 'cover' }}
                    />
                </MagicCard>
            </div >
        </div >
    );
};

export default Hero;
