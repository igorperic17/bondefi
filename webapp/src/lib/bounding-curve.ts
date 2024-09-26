export interface BoundingCurve {
	id: number
	name: string
	parameters: string[]
	exampleValues: number[]
	compute: (x: number, accY: number, params: number[]) => [number, number]
}

/**
 * Simulate a token purchase
 * @param amountPaid 
 * @param collateral_reserves 
 * @param tokenSupply 
 * @param reserveRatio 
 * @returns amount of tokens bought using the collateral
 */
const simulateTokenPurchase = (amountPaid: number, collateral_reserves: number, tokenSupply: number, reserveRatio: number) => {
	const STARTING_PRICE = 0.0001;
	return (tokenSupply + 1) * ((1 + amountPaid / (collateral_reserves + (STARTING_PRICE * reserveRatio))) ** (reserveRatio) - 1)
}

const bancorCurve: BoundingCurve = {
	id: 0,
	name: 'Bancor',
	parameters: ['Reserve Ratio'],
	exampleValues: [0.4],
	//x: 1000s of tokens in circulation
	//y: token price
	//accY: accumulated token supply
	compute: (x: number, accY: number, params: number[]) => {
		const [reserveRatio] = params;

		const tokensBought = simulateTokenPurchase(1000, x*1000, accY, reserveRatio);

		return [tokensBought, (x*1000) / ((accY + tokensBought) * reserveRatio)];
	},
}

export const BOUNDING_CURVES = [bancorCurve]
