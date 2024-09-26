import { dateToUnixTimestamp, string } from '../utils'

export interface CreateTokenProps {
	collateralAddress: string
	name: string
	symbol: string
	description: string
	iconUrl: string
	projectUrl: string
	tagList: []

	saleStart: Date
	saleEnd: Date
	presaleGoal: string

	bondingCurveType: number
	bondingCurveParameters: number[]
}

export const createTokenManifest = (
	accountId: string,
	componentId: string,
	props: CreateTokenProps,
) => {
	const curveParams = props.bondingCurveParameters
		.map((t) => `Decimal(${string(t.toString())})`)
		.join(', ')

	const tags = props.tagList.map(string).join(', ')

	return `
        CALL_METHOD
            Address("${componentId}")
            "create_token"
            Address(${string(props.collateralAddress)})
            Enum<${props.bondingCurveType}u8>(${curveParams})
            ${dateToUnixTimestamp(props.saleStart)}i64 
            ${dateToUnixTimestamp(props.saleEnd)}i64
            Decimal(${string(props.presaleGoal)})
            9999999999i64
            Decimal("0")
            ${string(props.name)}
            ${string(props.symbol)}
            ${string(props.description)}
            Array<String>(${tags})
            ${string(props.iconUrl)}
            ${string(props.projectUrl)}
        ;

        CALL_METHOD
            Address(${string(accountId)})
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
    `
}
