import { string } from '../utils'

export interface CreateTokenProps {
  collateralAddress: string
  name: string
  symbol: string
  description: string
  tagList: string[]
  iconUrl: string
  tokenDetailsUrl: string

  bondingCurveType: number
  bondingCurveParameters: number[]
}

export const EXAMPLE_CREATE_TOKEN_PROPS = {
  collateralAddress:
    'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc', // RDX on Stokenet
  name: 'BonDeFi',
  symbol: 'BDFI',
  description: 'BonDeFi Token',
  tagList: ['BonDeFi', 'DeFi', 'BonFi'],
  iconUrl: 'https://bondefi.com/icon.png',
  tokenDetailsUrl: 'https://bondefi.com',
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
            Array<String>(${props.tagList.map(string).join(', ')})
            ${string(props.iconUrl)}
            ${string(props.tokenDetailsUrl)}
        ;

        CALL_METHOD
            Address(${string(accountId)})
            "deposit_batch"
            Expression("ENTIRE_WORKTOP")
        ;
    `
}
