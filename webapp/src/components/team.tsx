import Image from 'next/image';
import { cn } from '@/lib/utils';

const teamMembers = [
    {
        name: "Bruno ",
        lastName: "Doe",
        position: "CEO & Founder",
        image: "/team/john-doe.jpg"
    },
    {
        name: "Jane",
        lastName: "Smith",
        position: "CTO",
        image: "/team/jane-smith.jpg"
    },
    {
        name: "Mike",
        lastName: "Johnson",
        position: "Lead Developer",
        image: "/team/mike-johnson.jpg"
    },
    {
        name: "Sarah",
        lastName: "Williams",
        position: "Marketing Director",
        image: "/team/sarah-williams.jpg"
    }
];

export default function TeamSection() {
    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-semibold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-600">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {teamMembers.map((member, index) => (
                        <div key={index} className="bg-gradient-to-br from-gray-700 to-black-800 border border-black-700 rounded-lg shadow-lg overflow-hidden">
                            <div className="relative h-64 w-full">
                                <Image
                                    src={member.image}
                                    alt={`${member.name} ${member.lastName}`}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="p-4 text-center">
                                <h3 className="text-xl font-semibold text-white">{member.name} {member.lastName}</h3>
                                <p className={cn(
                                    "text-gray-400",
                                    "inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent"
                                )}>{member.position}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
