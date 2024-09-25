import { CalendarIcon, FileTextIcon } from "@radix-ui/react-icons";
import { BellIcon, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import Marquee from "@/components/magicui/marquee";
import AnimatedListDemo from "@/components/example/animated-list-demo";
import { AnimatedBeamDemo } from "./animated-beam-demo";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const files = [
    {
        name: "ABC",
        body: "ABC is a decentralized finance project aiming to revolutionize the lending and borrowing market.",
    },
    {
        name: "XYZ",
        body: "XYZ is a blockchain platform designed to facilitate secure and transparent supply chain management.",
    },
    {
        name: "LMN",
        body: "LMN is a token focused on providing liquidity solutions for decentralized exchanges.",
    },
    {
        name: "PQR",
        body: "PQR is a project dedicated to creating a decentralized social media platform with enhanced privacy features.",
    },
    {
        name: "DEF",
        body: "DEF is a token that supports a decentralized marketplace for digital art and NFTs.",
    },
];

const features = [
    {
        Icon: FileTextIcon,
        name: "List your token",
        description: "A single, intuitive dashboard to manage your funding rounds.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-1",
        background: (
            <Marquee
                pauseOnHover
                className="absolute top-10 [--duration:20s] [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] "
            >
                {files.map((f, idx) => (
                    <figure
                        key={idx}
                        className={cn(
                            "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
                            "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                            "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
                            "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none",
                        )}
                    >
                        <div className="flex flex-row items-center gap-2">
                            <div className="flex flex-col">
                                <figcaption className="text-sm font-medium dark:text-white ">
                                    {f.name}
                                </figcaption>
                            </div>
                        </div>
                        <blockquote className="mt-2 text-xs">{f.body}</blockquote>
                    </figure>
                ))}
            </Marquee>
        ),
    },
    {
        Icon: BellIcon,
        name: "Notifications",
        description: "Never miss an investment opportunity.",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-2",
        background: (
            <AnimatedListDemo className="absolute right-2 top-4 h-[300px] w-full border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    {
        Icon: Share2Icon,
        name: "Global micro-funding network",
        description: "Start your global micro-funding round easier than ever - no VCs!",
        href: "#",
        cta: "Learn more",
        className: "col-span-3 lg:col-span-3",
        background: (
            <AnimatedBeamDemo className="absolute right-2 top-4 h-[300px] border-none transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] group-hover:scale-105" />
        ),
    },
    // {
    //     Icon: CalendarIcon,
    //     name: "Calendar",
    //     description: "Use the calendar to filter your files by date.",
    //     className: "col-span-3 lg:col-span-1",
    //     href: "#",
    //     cta: "Learn more",
    //     background: (
    //         <Calendar
    //             mode="single"
    //             selected={new Date(2022, 4, 11, 0, 0, 0)}
    //             className="absolute right-0 top-10 origin-top rounded-md border transition-all duration-300 ease-out [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)] group-hover:scale-105"
    //         />
    //     ),
    // },
];

export default function Features() {
    return (
        <div className="flex justify-between items-center my-40">
            <div className="w-5/12 pr-12">
                <h2 className="text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">Revolutionizing Crowdfunding</h2>
                <p className="text-lg">
                    Our platform offers a unique approach to decentralized crowdfunding,
                    leveraging blockchain technology to create a transparent, efficient,
                    and globally accessible funding ecosystem. We're changing
                    the game for both builders and investors.
                </p>
                <Tabs defaultValue="builders" className="w-full mt-6">
                    <TabsList className="grid w-full grid-cols-2 bg-gradient-to-r from-green-400 to-blue-600 p-1 rounded-lg">
                        <TabsTrigger
                            value="builders"
                            className="py-1 text-white transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md rounded-md"
                        >
                            Builders
                        </TabsTrigger>
                        <TabsTrigger
                            value="investors"
                            className="py-1 text-white transition-all duration-300 ease-in-out data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-md rounded-md"
                        >
                            Investors
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="builders">
                        <div className="p-6 bg-gradient-to-br from-gray-700 to-black-800 border border-black-700 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-white">For builders, bonding curves offer:</h3>
                            <ol className="list-decimal pl-6 space-y-3 text-gray-200">
                                <li>Transparent and predictable token pricing</li>
                                <li>Automatic liquidity provision</li>
                                <li>Potential for early project growth</li>
                            </ol>
                        </div>
                    </TabsContent>
                    <TabsContent value="investors">
                        <div className="p-6 bg-gradient-to-br from-gray-700 to-black-800 border border-black-700 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-white">Investors benefit from:</h3>
                            <ol className="list-decimal pl-6 space-y-3 text-gray-200">
                                <li>Continuous trading opportunities</li>
                                <li>Regulatory compliance by design</li>
                                <li>Alignment of interests between project and token holders</li>
                            </ol>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <BentoGrid className="w-3/5">
                {features.map((feature, idx) => (
                    <BentoCard key={idx} {...feature} />
                ))}
            </BentoGrid>
        </div>
    );
}
