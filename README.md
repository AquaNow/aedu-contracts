# AEDU Stablecoin: UAE Dirham-Backed Smart Contracts
This repository holds the codebase for the AEDU Stablecoin, a fiat-backed stablecoin pegged to the United Arab Emirates dirham (AED). For more information, refer to our [whitepaper](https://github.com/AquaNow/aedu-contracts/blob/main/whitepaper.pdf).

## Table of Contents
- [Setup](#setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contracts](#contracts)

## Setup

**Requirements**:
- Node >= 16

To get started, follow these steps:


```
$ git clone git@github.com:AquaNow/aedu-smart-contracts.git
$ cd aedu-smart-contracts
$ npm i
```
## Testing

Run all tests:

```
$ npm run test
```

Run a specific test:

```
$ npm run test ./test/<file name>
```

Run tests and generate test coverage:

```
$ npm run coverage
```

## Deployment

There are two contracts to be deployed: `TokenV1` and `MasterMinter`. First, supply variable values found in the `hardhat.config.js`. For the Goerli network, we used Alchemy for node access. Fill in the values for `ALCHEMY_API_KEY` and `GOERLI_PRIVATE_KEY`.

To deploy the Token Contract:

```
$ npx hardhat run scripts/deploy.js --network <network-name>
```

## Contracts

This implementation uses 3 separate contracts: 1) a proxy contract (`AbstractTokenV1.sol`), 2) a token contract (`TokenV1.sol`), and 3) a minter management contract (`MasterMinter.sol`). By allowing for the deployment of a new implementation contract and updating the Proxy to reference it, the contract can be upgraded.

### TokenV1
`TokenV1` provides several features, outlined below:

### ERC20 compatible
`TokenV1` adheres to the ERC20 interface.

### Pausable
In the event of a critical bug or significant key compromise, the entire contract can be paused. Transfers are not allowed while the contract is paused. The pauser address controls the pause functionality.

### Upgradable
The proxy contract can redirect calls to a new, deployed implementation contract. The proxyOwner address governs access to the upgrade feature and is the only entity authorized to modify the proxyOwner address.

### Blacklist
The contract can blacklist specific addresses, preventing them from receiving or transferring tokens. The blacklister address manages the blacklist feature.

### Minting/Burning
Tokens can be minted or burned as needed. The contract supports multiple minters simultaneously. The masterMinter address oversees the list of minters and their respective minting capacities. Mint allowances function similarly to ERC20 allowances, decreasing as minters create new tokens. The masterMinter must increase the allowance if it runs too low.

### Ownable
The contract includes an Owner with the authority to modify the owner, pauser, blacklister, or masterMinter addresses. However, the owner cannot alter the proxyOwner address.
