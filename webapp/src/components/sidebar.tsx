import React from 'react';
import Link from 'next/link';

const Sidebar: React.FC = () => {
    return (
        <aside className="w-64 h-full bg-black bg-opacity-80 backdrop-blur-sm text-white overflow-y-auto">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <ul className="py-4 space-y-2">
                    <li>
                        <Link href="/" className="block py-2 px-4 hover:bg-gray-700 rounded text-xl font-bold">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/token" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            All tokens
                        </Link>
                    </li>
                    <li>
                        <Link href="/your" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            Your tokens
                        </Link>
                    </li>
                    <li>
                        <Link href="/launch" className="block py-2 px-4 hover:bg-gray-700 rounded">
                            Launch New Token
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
