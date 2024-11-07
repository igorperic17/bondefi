import Image from 'next/image';
import radixLogo from '../../public/particle.png';

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
                                    alt="Particle Network Logo"
                                    // layout="fill"
                                    objectFit="contain"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-4xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">
                            Powered by Particle Network
                        </h2>
                        <p className="text-gray-300 mb-4">
                            Our platform harnesses the capabilities of Particle Network, a cutting-edge solution for chain abstraction and interoperability. Particle Network provides several key advantages:
                        </p>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>Seamless cross-chain interactions and asset transfers</li>
                            <li>Unified interface for multiple blockchain ecosystems</li>
                            <li>High efficiency and reduced transaction costs</li>
                            <li>Robust security with advanced cryptographic protocols</li>
                            <li>Accelerated development with pre-built modules and tools</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RadixSection;
