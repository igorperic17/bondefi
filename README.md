# bondefi

We solve two main problems here:

1. Guaranteed liquidity: proportional to the amount of tokens sold by design, ensuring that the tokens sold are always liquid and valuable thanks to the price floor created by locking LP tokens and avoiding rugs
2. "Real-Yield staking": trading fees from listing are used to distribute rewards to stakers, ensuring a yield for the stakers proportional to the amount of tokens they hold and avoiding large sell pressure on the token listing

# How it works

1. Token creators can define the amount the want to reach for TGE to happen and the collateral they'll raise, as well as many other parameters related to the launch, such as the price at TGE, the amount of LP tokens that will be locked, etc...
2. Buyers can participate in the presale by providing the collateral asset, and they'll receive and NFT representing their position in the presale (total collateral deposited and amount of tokens to be received)
3. If the presale is successful (collateral target reached before presale ends), the token is launched in Ociswap (currently using a forked version of the Ociswap precision pool contract) and the LP tokens are locked as parametrized during the launch.
4. Once the presale is over, buyers can redeem their NFTs to get their tokens (or get a full refund in case that the presale goal was not reached).
5. As soon as the token lists, a staking contract is enabled so the trading fees paid in the pool are used to distribute rewards to stakers, with a proportional distribution based on the amount of tokens held.

# How to run

1. Install Rust and add it to your path: https://www.rust-lang.org/tools/install
2. Install the Scrypto CLI: https://github.com/radixdlt/scrypto
3. Clone the repository: git clone https://github.com/bondefi-labs/bondefi
4. Run the tests: scrypto test

# EVM support

Head over to [evm](./evm/)

Supported chains:

- Polygon Amoy
- Ethereum Sepolia
- Avalanche Fuji (C-Chain)
- BSC Testnet
