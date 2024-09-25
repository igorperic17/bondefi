'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Token {
    id: string;
    image: string;
    name: string;
    totalSupply: string;
    launchDate: string;
    projectUrl: string;
}

interface Transaction {
    id: string;
    date: string;
    amount: string;
    type: string;
}

const TokenPage: React.FC = () => {
    const { id } = useParams();
    const [token, setToken] = useState<Token | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        console.log(id);
        if (id) {
            // Mock API call to fetch token details
            const fetchedToken: Token = {
                id: id as string,
                image: `https://picsum.photos/200/300?random=${id}`,
                name: `Token ${id}`,
                totalSupply: `${Math.floor(Math.random() * 1000000)} tokens`,
                launchDate: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString(),
                projectUrl: 'https://example.com',
            };
            setToken(fetchedToken);

            // Mock API call to fetch transactions
            const newTransactions: Transaction[] = Array.from({ length: 10 }, (_, i) => ({
                id: `transaction-${page}-${i}`,
                date: new Date(Date.now() - Math.random() * 100000000).toLocaleDateString(),
                amount: `${Math.floor(Math.random() * 1000)} tokens`,
                type: Math.random() > 0.5 ? 'buy' : 'sell',
            }));
            setTransactions(prevTransactions => [...prevTransactions, ...newTransactions]);
        }
    }, [id, page]);

    const loadMoreTransactions = () => {
        setPage(prevPage => prevPage + 1);
    };

    const chartData = {
        labels: transactions.map(tx => tx.date),
        datasets: [
            {
                label: 'Transaction Amount',
                data: transactions.map(tx => parseInt(tx.amount)),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    return (
        <div className="p-4">
            {token && (
                <>
                    <h1 className="text-3xl font-bold mb-6">{token.name} Overview</h1>
                    <div className="mb-6">
                        <Line data={chartData} />
                    </div>
                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Token Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col sm:flex-row">
                                <div className="relative h-48 w-48 mb-4 sm:mb-0 sm:mr-4">
                                    <Image
                                        src={token.image || '/placeholder.png'}
                                        alt={`${token.name} token`}
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600 mb-1">Total Supply: {token.totalSupply}</p>
                                    <p className="text-sm text-gray-600 mb-1">Launched: {token.launchDate}</p>
                                    <p className="text-sm text-gray-600 mb-1">Project URL: <a href={token.projectUrl} className="text-blue-500">{token.projectUrl}</a></p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold mb-4">Transactions</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {transactions.map(transaction => (
                                <Card key={transaction.id}>
                                    <CardContent>
                                        <p className="text-sm text-gray-600 mb-1">Date: {transaction.date}</p>
                                        <p className="text-sm text-gray-600 mb-1">Amount: {transaction.amount}</p>
                                        <p className="text-sm text-gray-600 mb-1">Type: {transaction.type}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <Button onClick={loadMoreTransactions} className="mt-4">Load More</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TokenPage;
