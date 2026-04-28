// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TrustVault {
    enum TradeStatus { PENDING, LOCKED, SHIPPED, DELIVERED, COMPLETED, DISPUTED }

    struct Trade {
        address buyer;
        address seller;
        uint256 amount;
        uint256 insurance;
        TradeStatus status;
    }

    mapping(string => Trade) public trades;

    function lockFunds(string memory _tradeId) public payable {
        require(msg.value > 0, "Must send funds");
        trades[_tradeId] = Trade(msg.sender, address(0), msg.value, 0, TradeStatus.LOCKED);
    }

    function releaseFunds(string memory _tradeId) public {
        Trade storage trade = trades[_tradeId];
        require(trade.status == TradeStatus.DELIVERED, "Not ready");
        payable(trade.seller).transfer(trade.amount);
        trade.status = TradeStatus.COMPLETED;
    }
}
