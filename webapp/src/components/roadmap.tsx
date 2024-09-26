import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const roadmapData = [
    {
        phase: 'Phase 1: MVP Development',
        deadline: 'Q4 2024',
        progress: 80,
        features: [
            { name: 'Smart contract development', completed: true },
            { name: 'Website launch', completed: true },
            { name: 'DEX integration (Ociswap)', completed: true },
            { name: 'Cross-chain integration', completed: false },
            { name: 'Radix DLT developer grant application', completed: false },
        ],
    },
    {
        phase: 'Phase 2: Launch',
        deadline: 'Q1 2025',
        progress: 0,
        features: [
            { name: 'Winning the Radix DLT development grant', completed: false },
            { name: 'Governance implementation (DAO for founders)', completed: false },
            { name: 'Smart contract audit', completed: false },
            { name: 'BDF Token launch', completed: false },
            { name: 'Partnerships', completed: false },
        ],
    },
    {
        phase: 'Phase 3: Expansion',
        deadline: 'Q2 2025',
        progress: 0,
        features: [
            { name: 'Community building', completed: false },
            { name: 'Global marketing campaign', completed: false },
            { name: 'Support for other distributed ecosystems (EVM, Near, Cosmos)', completed: false },
        ],
    },
];

const RoadmapSection = () => {
    return (
        <section className="py-16 content-center">
            <div className="container mx-auto px-4  w-8/12">
                <h2 className="text-4xl font-semibold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">Our Roadmap</h2>
                <div className="relative">
                    {roadmapData.map((phase, index) => (
                        <div key={index} className="mb-12 flex">
                            <div className="flex flex-col items-center mr-4">
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center",
                                    phase.progress > 0 ? 'bg-gradient-to-r from-green-400 to-blue-600' : 'bg-gray-700'
                                )}>
                                    {phase.progress === 100 ? (
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-white" />
                                    )}
                                </div>
                                {index < roadmapData.length - 1 && (
                                    <div className="w-1 h-full bg-gray-700 my-2"></div>
                                )}
                            </div>
                            <div className="flex-grow">
                                <h3 className="text-xl font-semibold mb-2 text-white">{phase.phase}</h3>
                                <p className="text-gray-400 mb-2">Deadline: {phase.deadline}</p>
                                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-4">
                                    <div className="bg-gradient-to-r from-green-400 to-blue-600 h-2.5 rounded-full" style={{ width: `${phase.progress}%` }}></div>
                                </div>
                                <ul className="list-disc list-inside">
                                    {phase.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className={cn(
                                            feature.completed ? 'text-green-400' : 'text-gray-400'
                                        )}>
                                            {feature.name} {feature.completed && '✓'}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RoadmapSection;
