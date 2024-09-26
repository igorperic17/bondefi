import React, { useEffect, useMemo, useRef } from 'react'

import {
	ChartOptions,
	CrosshairMode,
	DeepPartial,
	IChartApi,
	createChart,
} from 'lightweight-charts'

import { BoundingCurve } from '@/lib/bounding-curve'

const formatCash = (n: number) => {
	if (n < 1e3) return n.toFixed(0)
	if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + 'K'
	if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + 'M'
	if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + 'B'
	if (n >= 1e12) return +(n / 1e12).toFixed(1) + 'T'
}

const chartStyle: (unit: string) => DeepPartial<ChartOptions> = (unit) => ({
	height: 400,
	autoSize: true,
	// handleScale: false,
	// handleScroll: false,
	grid: { horzLines: { color: '#111' }, vertLines: { color: '#111' } },
	crosshair: { mode: CrosshairMode.Magnet },
	rightPriceScale: {},
	localization: {
		priceFormatter: (price: number) => price.toFixed(2),
		timeFormatter: (time: number) => time.toFixed(0),
	},
	timeScale: {
		tickMarkFormatter: (time: number) => `${formatCash(time)} ${unit}`,
		rightOffset: 0,
		fixLeftEdge: true,
	},
	layout: {
		attributionLogo: false,
		background: {
			color: '#000000',
		},
		textColor: '#eee',
	},
})

interface ChartProps {
	curve: BoundingCurve
	params: number[]
	target: number
	symbol?: string
}

const simulateTokenPurchase = (
	amountPaid: number,
	collateral_reserves: number,
	tokenSupply: number,
	reserveRatio: number,
) => {
	const STARTING_PRICE = 0.0001
	return (
		(tokenSupply + 1) *
		((1 + amountPaid / (collateral_reserves + STARTING_PRICE * reserveRatio)) **
			reserveRatio -
			1)
	)
}

export function Chart({ curve, params, target, symbol }: ChartProps) {
	const chartRef = useRef<HTMLDivElement>(null)
	let chart: IChartApi | undefined

	const generateData = (max: number) => {
		const step = max / 1000
		const array = Array<{ time: number; value: number }>(1000)

		let accY = 0

		for (let i = 0; i < 1000; i++) {
			const x = i * step
			const pruchaseCount = simulateTokenPurchase(step, x, accY, params[0])
			// const [tokensBought, y] = curve.compute(x, accY, params)
			// accY += tokensBought
			const price = x / ((accY + pruchaseCount) * params[0])

			accY += pruchaseCount
			array[i] = { time: x, value: price }
		}

		return array
	}

	const data = useMemo(
		() => generateData(target + 1),
		[curve, params, target, symbol],
	)

	useEffect(() => {
		if (!chartRef.current) return
		chart = createChart(chartRef.current, chartStyle(symbol || ''))

		const series = chart.addAreaSeries({
			topColor: 'rgba( 38, 166, 154, 0.38)',
			bottomColor: 'rgba( 38, 166, 154, 0.06)',
			lineColor: 'rgba( 38, 166, 154, 1)',
			lineWidth: 2,
			priceLineVisible: false,
			lastValueVisible: false,
		})

		series.setData(data as never)
		chart
			.timeScale()
			.setVisibleRange({ from: 0, to: parseFloat(target) } as never)

		return () => {
			chart?.remove()
		}
	}, [data])

	return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
}
