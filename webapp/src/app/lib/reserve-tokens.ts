export const RESERVE_TOKENS = [
  {
    name: 'Radix',
    symbol: 'XRD',
    address:
      'resource_tdx_2_1tknxxxxxxxxxradxrdxxxxxxxxx009923554798xxxxxxxxxtfd2jc',
  },
  {
    name: 'OciSwap',
    symbol: 'OCI',
    address:
      'resource_tdx_2_1t5v4wd7yuzugmpldtu7s6nvtstpt8c4lzkjxhuc9sdq532g4np929p',
  },
]

export const getReserveTokenByAddress = (address: string) =>
  RESERVE_TOKENS.find((token) => token.address === address)
