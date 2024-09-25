import React from 'react';
import Image from 'next/image';
import { MagicCard } from '@/components/magicui/magic-card';
import { BorderBeam } from "@/components/magicui/border-beam";
import { TrendingUpIcon, DollarSignIcon, CalendarIcon, StarIcon, ImageIcon } from 'lucide-react';

interface TokenCardProps {
    image: string | undefined;
    name: string;
    totalSupply: string;
    launchDate: string;
    projectUrl: string;
    isTrending: boolean;
    isFundingReached: boolean;
}

const TokenCard: React.FC<TokenCardProps> = ({ image, name, totalSupply, launchDate, projectUrl, isTrending, isFundingReached }) => {
    const isNewToken = new Date(launchDate) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // Token is new if launched within the last 30 days

    const handleClick = () => {
        console.log(projectUrl);
        window.location.href = projectUrl;
    };

    return (
        <MagicCard
            className={`w-full overflow-hidden shadow-lg rounded-t-xl rounded-b-none transform transition duration-500 hover:scale-105 cursor-pointer flex flex-col relative border-0 shadow-gray-800 whitespace-nowrap`}
            onClick={handleClick}
        >
            <div className="relative h-48 w-full rounded-t-xl overflow-hidden" onClick={handleClick}>
                {image ? (
                    <Image
                        src={image}
                        alt={`${name} token`}
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
                {(isTrending || isFundingReached || isNewToken) && (
                    <div className="absolute top-2 right-2 flex flex-col space-y-1 items-end">
                        <div className="bg-black bg-opacity-50 p-1 rounded-2xl space-y-1">
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
                            {isNewToken && (
                                <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
                                    <StarIcon className="w-4 h-4 mr-1" />
                                    New
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col items-center w-full" onClick={handleClick}>
                {(isTrending) && <BorderBeam size={250} duration={12} delay={9} />}
                <h2 className="text-2xl font-bold mb-2 text-white">{name}</h2>
                <p className="text-sm text-gray-400 mb-1 flex items-center">
                    <DollarSignIcon className="w-4 h-4 mr-2" />
                    Total Supply: {totalSupply}
                </p>
                <p className="text-sm text-gray-400 mb-4 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Launched: {launchDate}
                </p>
            </div>
        </MagicCard>
    );
};

export default TokenCard;
