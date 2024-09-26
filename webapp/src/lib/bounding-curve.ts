export interface BoundingCurve {
	id: number
	name: string
	parameters: string[]
	exampleValues: number[]
	compute: (x: number, params: number[]) => number
}

const bancorCurve: BoundingCurve = {
	id: 0,
	name: 'Bancor',
	parameters: ['Reserve Ratio'],
	exampleValues: [0.4],
	compute: (x: number, params: number[]) => {
		const [reserveRatio] = params
		const startingPrice = 0.01

		return (
			(startingPrice / 1 ** (1 / reserveRatio - 1)) *
			x ** (1 / reserveRatio - 1)
		)
	},
}

export const BOUNDING_CURVES = [bancorCurve]
