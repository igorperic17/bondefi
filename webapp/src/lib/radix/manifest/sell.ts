import { string } from '../utils'

export interface BuyParams {
    accountId: string
    tokenAddress: string
    amount: string
}

export const sellManifest = (componentId: string, props: BuyParams) => `
    CALL_METHOD
        Address(${string(props.accountId)})
        "withdraw"
        Address(${string(props.tokenAddress)})
        Decimal(${string(props.amount)})
    ;

    TAKE_ALL_FROM_WORKTOP
        Address(${string(props.tokenAddress)})
        Bucket("bucket")
    ;

    CALL_METHOD
        Address(${string(componentId)})
        "sell"
        Bucket("bucket")
    ;

    CALL_METHOD
        Address(${string(props.accountId)})
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
`
