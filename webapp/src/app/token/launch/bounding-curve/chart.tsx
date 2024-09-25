import React, { useEffect, useMemo, useRef } from 'react'

import {
  ChartOptions,
  createChart,
  CrosshairMode,
  DeepPartial,
  IChartApi,
} from 'lightweight-charts'

import { BoundingCurve } from '@/lib/bounding-curve'

const chartStyle: DeepPartial<ChartOptions> = {
  height: 400,
  autoSize: true,
  // handleScale: false,
  // handleScroll: false,
  grid: { horzLines: { color: '#111' }, vertLines: { color: '#111' } },
  crosshair: { mode: CrosshairMode.Magnet },
  rightPriceScale: {},
  localization: {
    timeFormatter: (time: number) => time.toString(),
  },
  timeScale: {
    tickMarkFormatter: (time: number) => time.toString(),
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
}

interface ChartProps {
  curve: BoundingCurve
  params: number[]
}

export function Chart({ curve, params }: ChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  let chart: IChartApi | undefined

  const generateData = (max: number) => {
    const step = max / 1000
    const array = Array<{ time: number; value: number }>(1000)

    for (let i = 0; i < 1000; i++) {
      const x = i * step
      const y = curve.compute(x, params)
      array[i] = { time: x, value: y }
    }

    return array
  }

  const data = useMemo(() => generateData(1000), [curve, params])

  useEffect(() => {
    if (!chartRef.current) return
    chart = createChart(chartRef.current, chartStyle)

    const series = chart.addAreaSeries({
      topColor: 'rgba( 38, 166, 154, 0.38)',
      bottomColor: 'rgba( 38, 166, 154, 0.06)',
      lineColor: 'rgba( 38, 166, 154, 1)',
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    })

    series.setData(data as never)
    chart.timeScale().setVisibleRange({ from: 0, to: 1000 } as never)

    return () => {
      chart?.remove()
    }
  }, [data])

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }}></div>
}
