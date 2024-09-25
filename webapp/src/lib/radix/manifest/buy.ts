import { string } from '../utils'

export interface BuyParams {
  accountId: string
  collateralAddress: string
  amount: string
}

export const buyManifest = (componentId: string, props: BuyParams) => `
    CALL_METHOD
        Address(${string(props.accountId)})
        "withdraw"
        Address(${string(props.collateralAddress)})
        Decimal(${string(props.amount)})
    ;

    TAKE_ALL_FROM_WORKTOP
        Address(${string(props.collateralAddress)})
        Bucket("bucket")
    ;

    CALL_METHOD
        Address(${string(componentId)})
        "buy"
        Bucket("bucket")
    ;

    CALL_METHOD
        Address(${string(props.accountId)})
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
`
