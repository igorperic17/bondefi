import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

import { BOUNDING_CURVES } from '@/lib/bounding-curve'
import { CreateTokenProps } from '@/lib/radix/manifest/create-token'
import { Chart } from './chart'

interface BoundingCurveProps {
	params: CreateTokenProps
	onSet: (params: CreateTokenProps) => void
}

export function BoundingCurve({ params, onSet }: BoundingCurveProps) {
	const curve = BOUNDING_CURVES[params.bondingCurveType]
	const set = (change: Partial<CreateTokenProps>) => {
		onSet({ ...params, ...change })
	}

	const onSetType = (type: string) => {
		const id = parseInt(type)
		set({
			bondingCurveType: id,
			bondingCurveParameters: BOUNDING_CURVES[id].exampleValues,
		})
	}

	return (
		<div className="">
			<div className="mb-4 w-full space-y-2">
				<Label>Bounding Curve</Label>
				<Select
					value={params.bondingCurveType.toString()}
					onValueChange={onSetType}
				>
					<SelectTrigger>
						<SelectValue>{curve.name}</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{BOUNDING_CURVES.map((t) => (
							<SelectItem key={t.id} value={t.id.toString()}>
								{t.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			{curve.parameters.map((param, i) => (
				<div className="mb-4 w-full space-y-2" key={param}>
					<Label>{param}</Label>
					<Input
						type="number"
						value={params.bondingCurveParameters[i]}
						placeholder={param}
						onChange={(e) => {
							const newParams = [...params.bondingCurveParameters]
							newParams[i] = parseFloat(e.target.value)
							onSet({ ...params, bondingCurveParameters: newParams })
						}}
					/>
				</div>
			))}

			{/*  CHART */}
			<div className="bg-black pa-4 rounded-lg border mb-5 overflow-hidden">
				<Chart curve={curve} params={params.bondingCurveParameters} />
			</div>
		</div>
	)
}
