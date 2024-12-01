import { MagicCard } from '@/components/magicui/magic-card';
import { BorderBeam } from "@/components/magicui/border-beam";
import Image from 'next/image';
import bondingImage from '../../public/bonding-curve.png'; // Make sure to add this image to your project
import SparklesText from './magicui/sparkles-text';

export default function BondingSection() {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-center my-10 sm:my-20 lg:my-40 px-4 lg:px-0">
            <div className="w-full lg:w-1/2 lg:pr-6 xl:pr-12 mb-10 lg:mb-0">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 opacity-50 blur-xl"></div>
                    <Image
                        className="relative shadow-lg rounded-xl overflow-hidden w-full h-1/2 sm:h-1/2 z-10"
                        src={bondingImage}
                        alt="Features Screenshot"
                    />
                </div>
            </div>
            <div className="w-full lg:w-1/2 lg:pl-6 xl:pl-12">
                <SparklesText text="Bonding Curves" />
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">The Future of DeFi</h2>
                <p className="text-sm sm:text-base lg:text-lg mb-4">
                    Bonding curves are revolutionizing DeFi by creating a dynamic pricing mechanism for tokens. As more tokens are minted, the price changes along a predetermined curve, incentivizing early adoption and investment.
                </p>
                <p className="text-sm sm:text-base lg:text-lg mb-4">
                    Incorporate different variables and conditions into the price model and create
                    dynamic pricing based on factors like sale speed and demand.
                    Builders of the future can leverage these customizable curves to design innovative
                    tokenomics and funding strategies for a wide range of use cases.
                </p>
            </div>
        </div>
    );
}
