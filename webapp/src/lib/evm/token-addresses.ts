export const RESERVE_TOKENS = [
  {
    name: "Thether USD (testnet)",
    symbol: "USDT",
    address: "0x3127F8c9e414fF3EF3A7717491A3D66E842a2ee6",
  },
];
export const getReserveTokenByAddress = (address: string) =>
  RESERVE_TOKENS.find((token) => token.address === address);

export const EVM_LAUNCHPAD_ADDRESS =
  "0x773C801c8eDD394444eBD654967F2A16CCAD9D46";

export const BANCOR_FORMULA_ADDRESS =
  "0xC0277a10d52A8b42e83cB5b7806abe7db027Fc11";

export const BANCOR_RESERVE_RATIO_PRECISION = 1000000;
