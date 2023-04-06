//SPDX-License-Identifier: MIT

pragma solidity ^0.8.9;

import "./MintController.sol";

/**
 * @title MasterMinter
 * @notice MasterMinter uses multiple controllers to manage minters for a
 * contract that implements the MinterManagerInterface.
 * @dev MasterMinter inherits all its functionality from MintController.
 */
contract MasterMinter is MintController {
}