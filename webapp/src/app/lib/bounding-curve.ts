export interface BoundingCurve {
  id: number
  name: string
  parameters: string[]
  exampleValues: number[]
  compute: (x: number, params: number[]) => number
}

const constantCurve: BoundingCurve = {
  id: 0,
  name: 'Constant',
  parameters: ['Scalar'],
  exampleValues: [2],
  compute: (x: number, params: number[]) => {
    return x * params[0]
  },
}

const linearCurve: BoundingCurve = {
  id: 1,
  name: 'Linear',
  parameters: ['A', 'B'],
  exampleValues: [1.5, 1],
  compute: (x: number, params: number[]) => {
    const [a, b] = params
    return x * a + b
  },
}

const bancorCurve: BoundingCurve = {
  id: 2,
  name: 'Bancor',
  parameters: ['Connector', 'Weight'],
  exampleValues: [10000, 0.4],
  compute: (x: number, params: number[]) => {
    const [connector, weight] = params

    return connector * Math.pow(x / connector, 1 / weight)
  },
}

export const BOUNDING_CURVES = [constantCurve, linearCurve, bancorCurve]
