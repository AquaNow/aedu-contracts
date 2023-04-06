// // SPDX-License-Identifier: MIT
 

// pragma solidity ^0.8.9;

// import { Ownable } from "./Ownable.sol";
// import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
// import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
// import { PermissionAdmin } from "./PermissionAdmin.sol";

// contract Rescuable is PermissionAdmin {
//     using SafeERC20 for IERC20;

//     address private _rescuer;

//     event RescuerChanged(address indexed newRescuer);

//     /**
//      * @notice Returns current rescuer
//      * @return Rescuer's address
//      */
//     function rescuer() external view returns (address) {
//         return _rescuer;
//     }

//     /**
//      * @notice Revert if called by any account other than the rescuer.
//      */
//     modifier onlyRescuer() {
//         require(msg.sender == _rescuer, "caller not rescuer");
//         _;
//     }

//     /**
//      * @notice Rescue ERC20 tokens locked up in this contract.
//      * @param tokenContract ERC20 token contract address
//      * @param to        Recipient address
//      * @param amount    Amount to withdraw
//      */
//     function rescueERC20(
//         IERC20 tokenContract,
//         address to,
//         uint256 amount
//     ) external onlyRescuer {
//         tokenContract.safeTransfer(to, amount);
//     }

//     /**
//      * @notice Assign the rescuer role to a given address.
//      * @param newRescuer New rescuer's address
//      */
//     function updateRescuer(address newRescuer) external onlyPermissionAdmin {
//         require(
//             newRescuer != address(0),
//             "No zero addr"
//         );
//         _rescuer = newRescuer;
//         emit RescuerChanged(newRescuer);
//     }
// }
