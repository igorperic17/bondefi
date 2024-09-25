import { string } from '../utils'

export interface CreateTokenProps {
  collateralAddress: string
  name: string
  symbol: string
  description: string
  iconUrl: string
  projectUrl: string
  launchDate: string
  tagList: [],
  saleEndDate: string
  fundingTarget: number

  bondingCurveType: number
  bondingCurveParameters: number[]
}

export const EXAMPLE_CREATE_TOKEN_PROPS = {
  collateralAddress:
    'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc', // RDX on Stokenet
  name: 'BonDeFi',
  symbol: 'BDFI',
  description: 'BonDeFi Token',
  iconUrl: 'https://bondefi.com/icon.png',
  launchDate: '2023-07-01',
  saleEndDate: '2023-08-01',
  fundingTarget: 100000,
}

export const createTokenManifest = (
  accountId: string,
  componentId: string,
  props: CreateTokenProps
) => {
  const curveParams = props.bondingCurveParameters
    .map((t) => `Decimal(${string(t.toString())})`)
    .join(', ')

  return `
        CALL_METHOD
            Address("${componentId}")
            "create_token"
            Address(${string(props.collateralAddress)})
            Enum<${props.bondingCurveType}u8>(${curveParams})
            ${string(props.name)}
            ${string(props.symbol)}
            ${string(props.description)}
            ${string(props.iconUrl)}
            ${string(props.launchDate)}
            ${string(props.saleEndDate)}
            Decimal("${props.fundingTarget}")
        ;

        CALL_METHOD
            Address(${string(accountId)})
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
    `
}
