import Image from 'next/image';
import radixLogo from '../../public/radixdlt-logo.jpeg';

const RadixSection = () => {
    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between p-8 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-lg border border-gray-700">
                    <div className="md:w-1/2 mb-8 md:mb-20 flex justify-center items-center">
                        <div className="relative w-80 h-120 perspective-1000">
                            <div className="absolute w-full h-full transform-style-3d transition-transform duration-300 ease-out shadow-xl rounded-lg"
                                style={{ transform: 'rotateX(0deg) rotateY(0deg)' }}
                                onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = (e.clientX - rect.left) / rect.width;
                                    const y = (e.clientY - rect.top) / rect.height;
                                    e.currentTarget.style.transform = `rotateX(${(y - 0.5) * 20}deg) rotateY(${(x - 0.5) * 20}deg)`;
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'rotateX(0deg) rotateY(0deg)';
                                }}>
                                <Image
                                    src={radixLogo}
                                    alt="RadixDLT Logo"
                                    // layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
                            Powered by Radix DLT
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Our platform leverages the power of Radix DLT, a next-generation blockchain designed for decentralized finance and smart contracts. RadixDLT offers several key benefits:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Unparalleled scalability with atomic composability</li>
                            <li>Developer-friendly smart contract language (Scrypto)</li>
                            <li>High throughput and low latency</li>
                            <li>Enhanced security through asset-oriented programming</li>
                            <li>Built-in DeFi primitives for rapid development</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RadixSection;
