# TokenV1 Docs

### Overview
The TokenV1 contract is an ERC20 token contract that is backed by fiat reserves. It is inherited from four other contracts: `AbstractTokenV1`, `Ownable`, `Pausable`, and `Blacklistable`. These contracts provide additional functionality for the TokenV1 contract, such as the ability to pause and blacklist certain addresses from transferring or receiving tokens.

### State Variables
The TokenV1 contract has several state variables:

-   `_name`: used to define the name of the token.
-   `_symbol`: used to define the symbol of the token.
-   `_decimals`: used to define the number of decimals used for the token.
-   `currency`: specifies the fiat currency that the token is backed by.
-   `masterMinter`: an address that controls the list of minters and how much each minter is allowed to mint.
-   `_totalSupply`: stores the total supply of the token.

### Mappings
The TokenV1 contract has several mappings that keep track of balances, allowances, and approved addresses:

-   `balances`: keeps track of the balance of each address.
-   `allowed`: keeps track of the allowance of each address to spend tokens on behalf of another address.
-   `approvedAddresses`: keeps track of the addresses that are approved by each address to spend their tokens.

### Events
The TokenV1 contract also has several events that are emitted when certain functions are called:

-   `Mint`
-   `Burn`
-   `MinterConfigured`
-   `MinterRemoved`
-   `MasterMinterChanged`

### Functions
The TokenV1 contract has several functions that allow for the transfer, approval, and minting/burning of tokens:

-   `transfer`: transfers tokens between addresses.
-   `transferFrom`: transfers tokens on behalf of another address.
-   `approve`: approves an address to spend tokens on behalf of another address.
-   `mint`: mints new tokens.
-   `burn`: burns existing tokens.

The TokenV1 contract also has functions that allow for the configuration and removal of minters, as well as the updating of the masterMinter address:

-   `configureMinter`: adds or updates a new minter and their minting allowance.
-   `removeMinter`: removes a minter.
-   `updateMasterMinter`: updates the masterMinter address.
