import React from 'react';
import Marquee from '@/components/magicui/marquee';
import { cn } from "@/lib/utils";

interface Token {
    image: string;
    name: string;
    totalSupply: string;
    launchDate: string;
    projectUrl: string;
    isTrending: boolean;
    isFundingReached: boolean;
}

interface TokenSliderProps {
    tokens: Token[];
}

const ReviewCard = (token: Token) => {
    return (
        <figure
            className={cn(
                "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-gray-50/[.2] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <img className="rounded-full" width="32" height="32" alt="" src={token.image} />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium dark:text-white">
                        {token.name}
                    </figcaption>
                    <p className="text-xs font-medium dark:text-white/40">{token.projectUrl}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm">Total supply: {token.totalSupply}</blockquote>
        </figure>
    );
};

interface TokenSliderProps {
    tokens: Token[];
}

const TokenSlider: React.FC<TokenSliderProps> = ({ tokens }) => {
    const firstRow = tokens.slice(0, tokens.length / 2);
    const secondRow = tokens.slice(tokens.length / 2);

    return (
        <div className="relative flex h-[400px] w-full flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl">
            <Marquee pauseOnHover className="[--duration:20s]">
                {firstRow.map((token) => (
                    <ReviewCard key={token.projectUrl} {...token} />
                ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
                {secondRow.map((token) => (
                    <ReviewCard key={token.projectUrl} {...token} />
                ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
        </div>
    );
}


export default TokenSlider;
