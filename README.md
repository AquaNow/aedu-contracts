# AEDU Stablecoin
Hardhat Configuration of the AEDU Smart Contracts.

## Introduction

This repository contains the codebase for the fiat-backed stablecoin based on the United Arab Emirates dirhams. View our [whitepaper](https://github.com/AquaNow/aedu-contracts/blob/main/whitepaper.pdf) for more information.

## Setup

Requirements:
- Node >= 16

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

Run specific test:

```
$ npm run test ./test/<file name>
```

Run tests and generate test coverage:

```
$ npm run coverage
```

## Deployment

There are two contracts to be deployed: `TokenV1` and `MasterMinter`. First, supply variable values found in the `hardhat.config.js`. For the Goerli network, we used Alchemy for node access. Fill in the values for `ALCHEMY_API_KEY` and `GOERLI_PRIVATE_KEY`.

To deploy Token Contract:

```
$ npx hardhat run scripts/deploy.js --network <network-name>
```

## Contracts

This implementation uses 3 separate contracts: 1) a proxy contract (`AbstractTokenV1.sol`), 2) a token contract (`TokenV1.sol`), and 3) a minter management contract (`MasterMinter.sol`). By allowing for the deployment of a new implementation contract and updating the Proxy to reference it, the contract can be upgraded.

### TokenV1
`TokenV1` offers a number of capabilities, which briefly are described below.

### ERC20 compatible
`TokenV1` implements the ERC20 interface.

### Pausable
If a critical bug is detected or a significant key compromise occurs, the entire contract can be frozen. While the contract is paused, transfers are not permitted. The ability to pause the contract is governed by the pauser address.

### Upgradable
The proxy contract can direct calls to a new implementation contract that has been deployed. The proxyOwner address regulates access to the upgrade feature. The proxyOwner address is the only entity authorized to modify the proxyOwner address.

### Blacklist
The contract can designate specific addresses to be blacklisted, thereby prohibiting them from receiving or transferring tokens. The ability to manage the blacklist feature is governed by the blacklister address.

### Minting/Burning
Tokens can be minted or burned as required. The contract has the ability to accommodate multiple minters at the same time. The masterMinter address manages the list of minters and their respective minting capacities. The mint allowance is similar to the ERC20 allowance, which decreases as each minter creates new tokens. When the allowance runs too low, the masterMinter must increase it again.

### Ownable
The contract includes an Owner who has the authority to modify the owner, pauser, blacklister, or masterMinter addresses. However, the proxyOwner address cannot be altered by the owner.
