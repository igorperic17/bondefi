export const RESERVE_TOKENS = [
  {
    name: "Thether USD (testnet)",
    symbol: "USDT",
    address: "0x32240a4a86772949214183D422F475b389d93966",
  },
];
export const getReserveTokenByAddress = (address: string) =>
  RESERVE_TOKENS.find((token) => token.address === address);

export const EVM_LAUNCHPAD_ADDRESS =
  "0xB39405E00654D1c24b3b703a2e12bff2Eb926ba2";

export const BANCOR_FORMULA_ADDRESS =
  "0x37a1E0c9CC8f333cfe827659442bEee320aD5771";

export const BANCOR_RESERVE_RATIO_PRECISION = 1000000;
