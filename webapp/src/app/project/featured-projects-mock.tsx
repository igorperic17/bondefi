import { TokenDetails } from "@/lib/radix/dto/tokenDetails";
import { BONDING_CURVES as BONDING_CURVES } from "@/lib/bonding-curve";

const bancorCurve = BONDING_CURVES.find(curve => curve.name === 'Bancor');

export const featuredProjects: TokenDetails[] = [
    {
        id: 'featured1',
        name: 'Alpha Project',
        symbol: 'ALPHA',
        description: 'Alpha Project is a pioneering blockchain initiative.',
        iconUrl: 'https://picsum.photos/200/300?random=1',
        dateCreated: new Date('2023-06-01'),
        bondingCurve: ['Bancor', '0.4'],
        fundraisingTarget: 500000,
        factoryComponentId: 'component_sim1q0a7ecjy9d3x0zef3ek56m93nfjj8nzpqe7hpqgzv3gzgvxj',
        presaleStart: new Date('2023-06-01'),
        presaleEnd: new Date('2023-07-01'),
        infoUrl: '/project/featured1',
        collateralAddress: 'resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag',
        presaleGoal: '500000',
        presaleSuccess: true,
        presaleTokenId: 'resource_sim1qzj5ufnuawjqgvpgvj9g7gj0hhcg4q0e5r7zqm3s2pgqvqxj'
    },
    {
        id: 'featured2',
        name: 'Beta Token',
        symbol: 'BETA',
        description: 'Beta Token is revolutionizing decentralized finance.',
        iconUrl: 'https://picsum.photos/200/300?random=2',
        dateCreated: new Date('2023-07-15'),
        bondingCurve: ['Bancor', '0.5'],
        fundraisingTarget: 1000000,
        factoryComponentId: 'component_sim1q0cjdvq9dfx3x5zef3ek56m93nfjj8nzpqe7hpqgzv3gzg4kj',
        presaleStart: new Date('2023-07-15'),
        presaleEnd: new Date('2023-08-15'),
        infoUrl: '/project/featured2',
        collateralAddress: 'resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag',
        presaleGoal: '1000000',
        presaleSuccess: false,
        presaleTokenId: 'resource_sim1qzj5ufnuawjqgvpgvj9g7gj0hhcg4q0e5r7zqm3s2pgqvqxj'
    },
    {
        id: 'featured3',
        name: 'Gamma Coin',
        symbol: 'GAMMA',
        description: 'Gamma Coin aims to create a sustainable cryptocurrency ecosystem.',
        iconUrl: 'https://picsum.photos/200/300?random=3',
        dateCreated: new Date('2023-08-01'),
        bondingCurve: ['Bancor', '0.3'],
        fundraisingTarget: 2000000,
        factoryComponentId: 'component_sim1q0e7ecjy9d3x0zef3ek56m93nfjj8nzpqe7hpqgzv3gzg5lj',
        presaleStart: new Date('2023-08-01'),
        presaleEnd: new Date('2023-09-01'),
        infoUrl: '/project/featured3',
        collateralAddress: 'resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag',
        presaleGoal: '2000000',
        presaleSuccess: false,
        presaleTokenId: 'resource_sim1qzj5ufnuawjqgvpgvj9g7gj0hhcg4q0e5r7zqm3s2pgqvqxj'
    },
    {
        id: 'featured4',
        name: 'Delta Finance',
        symbol: 'DELTA',
        description: 'Delta Finance is building the future of decentralized lending.',
        iconUrl: 'https://picsum.photos/200/300?random=4',
        dateCreated: new Date('2023-09-01'),
        bondingCurve: ['Bancor', '0.6'],
        fundraisingTarget: 750000,
        factoryComponentId: 'component_sim1q0g7ecjy9d3x0zef3ek56m93nfjj8nzpqe7hpqgzv3gzg6mj',
        presaleStart: new Date('2023-09-01'),
        presaleEnd: new Date('2023-10-01'),
        infoUrl: '/project/featured4',
        collateralAddress: 'resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag',
        presaleGoal: '750000',
        presaleSuccess: true,
        presaleTokenId: 'resource_sim1qzj5ufnuawjqgvpgvj9g7gj0hhcg4q0e5r7zqm3s2pgqvqxj'
    },
    {
        id: 'featured5',
        name: 'Epsilon Network',
        symbol: 'EPSILON',
        description: 'Epsilon Network is creating a next-generation blockchain platform.',
        iconUrl: 'https://picsum.photos/200/300?random=5',
        dateCreated: new Date('2023-10-01'),
        bondingCurve: ['Bancor', '0.7'],
        fundraisingTarget: 5000000,
        factoryComponentId: 'component_sim1q0i7ecjy9d3x0zef3ek56m93nfjj8nzpqe7hpqgzv3gzg7nj',
        presaleStart: new Date('2023-10-01'),
        presaleEnd: new Date('2023-11-01'),
        infoUrl: '/project/featured5',
        collateralAddress: 'resource_sim1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqu57yag',
        presaleGoal: '5000000',
        presaleSuccess: false,
        presaleTokenId: 'resource_sim1qzj5ufnuawjqgvpgvj9g7gj0hhcg4q0e5r7zqm3s2pgqvqxj'
    }
];