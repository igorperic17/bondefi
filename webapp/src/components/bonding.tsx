import { MagicCard } from '@/components/magicui/magic-card';
import { BorderBeam } from "@/components/magicui/border-beam";
import Image from 'next/image';
import featuresImage from '../../public/features.png'; // Make sure to add this image to your project
import SparklesText from './magicui/sparkles-text';

export default function BondingSection() {
    return (
        <div className="flex justify-between items-center my-40">
            <div className="w-1/2 pr-12">
                <MagicCard className="relative w-full h-[500px] shadow-lg rounded-xl overflow-hidden">
                    <BorderBeam size={250} duration={4} delay={9} />
                    <Image
                        src={featuresImage}
                        alt="Features Screenshot"
                        layout="fill"
                        objectFit="cover"
                    />
                </MagicCard>
            </div>
            <div className="w-1/2 pl-12">
                <SparklesText text="Bonding Curves" />
                <h2 className="text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">The Future of DeFi</h2>
                <p className="text-lg mb-4">
                    Bonding curves are revolutionizing DeFi by creating a dynamic pricing mechanism for tokens. As more tokens are minted, the price changes along a predetermined curve, incentivizing early adoption and investment.
                </p>

                <p className="text-lg bm-4">
                    Incorporate different variables and conditions into the price model and create
                    dynamic pricing based on factors like sale speed and demand.
                    Builders of the future can leverage these customizable curves to design innovative
                    tokenomics and funding strategies for a wide range of use cases.
                </p>

            </div>
        </div>
    );
}
