import { string } from "@/lib/utils";

export interface BuyParams {
  accountId: string;
  nftTokenAddress: string;
  tokenId: string;
}

export const claimManifest = (componentId: string, props: BuyParams) => `
    CALL_METHOD
        Address(${string(props.accountId)})
        "withdraw_non_fungibles"
        Address(${string(props.nftTokenAddress)})
        Array<NonFungibleLocalId>(NonFungibleLocalId("${props.tokenId}"))
    ;

    TAKE_ALL_FROM_WORKTOP
        Address(${string(props.nftTokenAddress)})
        Bucket("bucket")
    ;

    CALL_METHOD
        Address(${string(componentId)})
        "presale_nft_redeem"
        Bucket("bucket")
    ;

    CALL_METHOD
        Address(${string(props.accountId)})
        "deposit_batch"
        Expression("ENTIRE_WORKTOP")
    ;
`;
