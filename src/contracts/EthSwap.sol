pragma solidity ^0.5.0;

import "./Token.sol";

contract EthSwap {
    string public name ="EthSwap Instant Exchanges";
    Token public token;
    uint public rate=100;

    event TokensPurchased(
        address account,
        address token,
        uint amount,
        uint rate
    );

     event TokensSold(
        address account,
        address token,
        uint amount,
        uint rate
    );

    constructor(Token _token) public {
        token=_token;
    }

    function buyTokens() public payable {
        // Redemption rate = # of tokens they receive for 1 ether
        // About of Ethereum * Redemption rate 
        uint tokenAmount = msg.value * rate;

        // Require that EthSwap has enough tokens
        require(token.balanceOf(address(this))>= tokenAmount);

        token.transfer(msg.sender, tokenAmount);

        // Emit an event 
        emit TokensPurchased(msg.sender, address(token),tokenAmount,rate);
    }

    function sellTokens(uint _amount) public {

        // User can't sell tokens more than what they have
        require(token.balanceOf(msg.sender)>= _amount);

        // Calculate the amount of Ether to redeem  
        uint ethAmount = _amount / rate;

        // Require that EthSwap has enough Ether
        require(address(this).balance>=ethAmount);

        // Transfer Saleh Token from the seller address to the swap address
        token.transferFrom(msg.sender,address(this), _amount);

        // Transfer ethereum token to the seller address
        msg.sender.transfer(ethAmount);

        // Emit an event 
        emit TokensPurchased(msg.sender, address(token),_amount,rate);
    }
}