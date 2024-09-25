import React from 'react';
import Link from 'next/link';
import { Twitter, Github, MessageCircle } from 'lucide-react';

const FooterSection: React.FC = () => {
    return (
        <footer className="bg-gradient-to-br from-gray-900/80 to-black/80 text-white py-12 rounded-lg border border-gray-700">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-4xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">BonDeFi</h3>
                        <p className="text-gray-300">
                            Revolutionizing decentralized crowdfunding with bonding curves and RadixDLT.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/token/launch" className="text-gray-300 hover:text-white transition duration-300">Launch Token</Link></li>
                            <li><Link href="/token" className="text-gray-300 hover:text-white transition duration-300">Explore Projects</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition duration-300">About Us</Link></li>
                            <li><Link href="#" className="text-gray-300 hover:text-white transition duration-300">FAQ</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">Connect</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300"><Twitter size={24} /></a>
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300"><Github size={24} /></a>
                            <a href="#" className="text-gray-300 hover:text-white transition duration-300"><MessageCircle size={24} /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
                    <p>&copy; 2024 BonDeFi. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;
