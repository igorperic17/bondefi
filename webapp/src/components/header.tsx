'use client'

import React from 'react';
import { RadixDappToolkit } from '@radixdlt/radix-dapp-toolkit';
import { cn } from '@/lib/utils'; // Assuming you have a utility function for class merging
import { useRouter } from 'next/navigation';
import { CoinsIcon, HomeIcon, LayoutDashboardIcon, RocketIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { RadixConnectButton } from '@/lib/radix';

interface HeaderProps {
    className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
    const router = useRouter();

    return (
        <div className={cn("fixed top-0 left-0 right-0 w-full z-10 bg-black bg-opacity-50 backdrop-blur-md", className)}>
            <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <h1 className="text-xl font-bold text-white">bondefi.xyz</h1>
                    </div>
                    <div className="flex items-center">
                        <div className="flex space-x-4">
                            <motion.div
                                onClick={() => router.push('/')}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                title="Home"
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <HomeIcon />
                                <span className="text-xs text-white">Home</span>
                            </motion.div>
                            <motion.div
                                onClick={() => router.push('/project')}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                title="Projects"
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <CoinsIcon />
                                <span className="text-xs text-white">Projects</span>
                            </motion.div>
                            <motion.div
                                onClick={() => router.push('/#')}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                title="Dashboard"
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <LayoutDashboardIcon />
                                <span className="text-xs text-white">Dashboard</span>
                            </motion.div>
                            <motion.div
                                onClick={() => router.push('/token/launch')}
                                whileHover={{ scale: 1.1 }}
                                transition={{ type: "spring", stiffness: 300 }}
                                title="Launch Token"
                                className="flex flex-col items-center cursor-pointer"
                            >
                                <RocketIcon />
                                <span className="text-xs text-white">Launch</span>
                            </motion.div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <RadixConnectButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
