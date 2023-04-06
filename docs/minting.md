# Minting/Burning Docs


## Controller.sol

### Overview

`Controller` implements the owner-controller-worker model. It allows for a single owner to manage multiple controllers, where each controller manages a single worker. 
The workers can be reused across different controllers. This contract extends the `ControllerAdmin` contract.

### State Variables
-   `mapping(address => address[]) public controllers`: This mapping is used to track the workers managed by each controller. The key is the controller's address, and the value is an array of worker addresses.
-   `mapping(address => address) public minterController`: This mapping is used to track the controller that manages each minter. The key is the minter's address, and the value is the controller's address.
-   `mapping(address => bool) public isController`: This mapping is used to track whether an address is a controller or not.
-   `mapping(address => bool) public isMinter`: This mapping is used to track whether an address is a minter or not.

### Events
-   `event ControllerConfigured(address indexed _controller, address indexed _minter)`: This event is emitted when a new controller is configured. It includes the controller's address and the minter's address.
-   `event ControllerRemoved(address indexed _controller)`: This event is emitted when a controller is removed. It includes the controller's address.
-   `event SignerModified(address indexed _signer)`: This event is not currently used in the contract.

### Modifiers
-   `modifier onlyController()`: This modifier ensures that the caller is a controller of a non-zero worker address.

### Functions
-   `function configureController(address _controller, address _minter) external onlyControllerAdmin`: This function is used to configure a new controller. 
-   It takes two parameters, `_controller` and `_minter`, which are the addresses of the controller and the minter, respectively. 
-   The function first checks that the addresses are not equal to zero. If the minter does not already have a controller, the function sets the minter's controller to the new controller. 
-   Then, it adds the minter to the list of workers managed by the controller, sets the `isMinter` and `isController` mappings to true, and emits the `ControllerConfigured` event.
-   `function getMinters(address _controller) external view returns (address[] memory)`: This function is used to get the list of minters managed by a specific controller. 
-   It takes one parameter, `_controller`, which is the address of the controller to query. 
-   The function first checks that the controller has at least one minter associated with it, and that the caller is a controller. It then returns an array of minter addresses.
-   `function removeController(address _controller) external onlyControllerAdmin`: This function is used to remove a controller. It takes one parameter, `_controller`, which is the address of the controller to remove. 
-   The function first checks that the address is not equal to zero and that the controller has at least one minter associated with it. 
-   It then sets the `isController` mapping for the controller to false, deletes the list of minters managed by the controller, and emits the `ControllerRemoved` event.


## ControllerAdmin.sol

### Overview
`ControllerAdmin` lets the contract owner set a controller admin who can add or remove controllers. The only person who can modify the admin is the contract owner.

### State Variables
-   `_controllerAdmin`: address of the controller admin.
-   `_maxNumOfMinters`: uint256 representing the maximum number of minters allowed.

### Events
-   `controllerAdminChanged`: triggered when the controller admin is changed.

### Modifiers
-   `onlyControllerAdmin`: ensures that only the controller admin can access certain functions.

### Functions
-   `getControllerAdmin()`: external function that returns the current controller admin's address.
-   `setControllerAdmin(address _newAdmin)`: external function that sets the new controller admin address. Only the contract owner can call this function.
-   `setMaxNumberOfMinters(uint256 _newMax)`: external function that sets the maximum number of minters allowed. Only the controller admin can call this function.
-  `_setMaxNumberOfMinters(uint256 _newMax)`: internal function that sets the maximum number of minters allowed.
-  `getMaxMinters()`: external function that returns the maximum number of minters allowed.


## MasterMinter.sol

### Overview
`MasterMinter` manages minters for a contract implementing the `MinterManagerInterface`, and it does so by utilizing multiple controllers. It is inherited from the MintController contract, which contains all of the functionality related to minting.

### State Variables
The MasterMinter contract does not have any state variables of its own, but it inherits the following state variables from the MintController contract:

-   `mapping(address => bool) public isMinter`;
-   `address[] public minters`;
-   `uint256 public numMinters`;

### Modifiers
The MasterMinter contract does not have any modifiers of its own, but it inherits the following modifier from the MintController contract:

-   `onlyMinter`: ensures that the caller is a minter.

### Functions
The MasterMinter contract does not have any functions of its own, but it inherits the following functions from the MintController contract:

-   `addMinter(address minter)`: adds a minter to the list of minters.
-   `removeMinter(address minter)`: removes a minter from the list of minters.
-   `isMinter(address account)`: checks if an address is a minter.
-   `getMinters()`: returns an array of minters.
-   `mint(address recipient, uint256 amount)`: mints a specified amount of tokens to the specified recipient. This function can only be called by a minter.


## MintController.sol

### Overview
`MintController` manages minters for a token contract. It  inherits from a "Controller" contract and uses the `MinterManagementInterface` contract for executing and recording minter management tasks. MintController allows for configuring minters, setting their allowances, incrementing/decrementing their allowances, and removing minters. It also has events to indicate changes to minters.

### State Variables
-   `MinterManagementInterface internal minterManager`: A variable to hold the address of the minterManager contract.
-   `mapping(address => uint256) internal minterAllowance`: A mapping to store the allowance of each minter.
-   `mapping(address => uint256) internal minterCap`: A mapping to store the cap of each minter.

### Events
-   `MinterManagerSet(address indexed _oldMinterManager, address indexed _newMinterManager)`: An event to indicate when the minter manager is set.
-    `MinterConfigured(address indexed _msgSender, address indexed _minter, uint256 _allowance)`: An event to indicate when a minter is configured with an allowance.
-    `MinterRemoved(address indexed _msgSender, address indexed _minter)`: An event to indicate when a minter is removed.
-    `MinterAllowanceIncremented(address indexed _msgSender, address indexed _minter, uint256 _increment, uint256 _newAllowance)`: An event to indicate when a minter's allowance is incremented.
-    `MinterAllowanceDecremented(address indexed msgSender, address indexed minter, uint256 decrement, uint256 newAllowance)`: An event to indicate when a minter's allowance is decremented.

### Modifiers
-   `onlyOwner`: A modifier to ensure that only the owner of the contract can perform a certain action.
-   `onlyController`: A modifier to ensure that only the controller can perform a certain action.

### Functions
-   `initializeMintController(address _minterManager, uint256 _initMaxNumOfMinters) public initializer`: A function to initialize the minter manager and maximum number of minters.
-   `getMinterManager() external view returns (MinterManagementInterface)`: A function to get the minter manager.
-    `setMinterManager(address _newMinterManager) external onlyOwner`: A function to set the minter manager.
-    `removeMinter(address _minter) external onlyController returns (bool)`: A function to remove a minter.
-    `configureMinter(address _minter, uint256 _newAllowance) external onlyController returns (bool)`: A function to configure a minter and set its allowance.
-    `incrementMinterAllowance(uint256 _allowanceIncrement, address _minter) external onlyController returns (bool)`: A function to increment a minter's allowance.
-    `decrementMinterAllowance(uint256 _allowanceDecrement, address _minter) external onlyController returns (bool)`: A function to decrement a minter's allowance.
-    `_setMinterAllowance(address _minter, uint256 _newAllowance) internal returns (bool)`: An internal function to set a minter's allowance using the minter manager.


## MinterManagerInterface.sol

### Overview
`MinterManagerInterface` is an interface contract that defines the external functions for adding and removing minters and modifying their allowances. It's designed to be implemented by other contracts that need to manage minters, such as the FiatTokenV1 contract that implements USDC.

### State Variables
This interface contract does not have any state variables.

### Modifiers 
This interface contract does not have any modifiers.

### Functions
-   `isMinter(address _account)`: External function that takes an address as an input parameter and returns a boolean value indicating whether the account is a minter or not.
-   `getMinterAllowance(address _minter)`: External function that takes an address as an input parameter and returns the allowance of the minter.
-   `configureMinter(address _minter, uint256 _minterAllowedAmount)`: External function that takes two parameters - an address representing the minter to configure and a uint256 value representing the new allowance for the minter. This function is used to configure a minter with a new allowance.
-   `removeMinter(address _minter)`: External function that takes an address as an input parameter and removes the minter from the system.
