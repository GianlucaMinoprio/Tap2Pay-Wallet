// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./interfaces/IERC20.sol";

contract MintApeCoin {
    address public immutable i_apecoin;
    address public immutable i_receiver_1;
    address public immutable i_receiver_2;
    address public constant APECOIN_GOERLI = 0xA68AbBb4e36b18A16732CF6d42E826AAA27F52Fc;
    address public constant RECEIVER_1 = 0x461cB679D33DB911cB50A338860747E353D5E653;
    address public constant RECEIVER_2 = 0x068Ab8466b047CD05c0DBb1A3a99768edF271b5F;
    constructor() {
        i_apecoin = APECOIN_GOERLI;
        i_receiver_1 = RECEIVER_1;
        i_receiver_2 = RECEIVER_2;
    }
    
    function transferApeCoin() public {
        IERC20(i_apecoin).transfer(i_receiver_1, 1 ether);
        IERC20(i_apecoin).transfer(i_receiver_2, 1 ether);
    }
}
