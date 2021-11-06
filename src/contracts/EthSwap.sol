pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name ="EthSwap Instant Exchanges";
    Token public token;
    uint public rate=100;

    event TokenPurchased(
        address account,
        address token,
        uint amout,
        uint rate
    );

    constructor(Token _token) public {
        token=_token;
    }

    function buyTokens() public payable {
        // Redemption rate = # of tokens they receive for 1 ether
        // About of Ethereum * Redemption rate 
        uint tokenAmount = msg.value * rate;
        token.transfer(msg.sender, tokenAmount);

        // Emit an event 
        emit TokenPurchased(msg.sender, address(token),tokenAmount,rate);
    }
}