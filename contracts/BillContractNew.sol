pragma solidity ^0.4.8;

contract BillContractNew {

    address owner;
    string billerCode;
    uint amount; // Amount is in wei (convert it from ether or bitcoin to wei while creating bill)

    address customer;
    bool paid;
    bool witdrawAmount;

    // Functions with this modifier can only be executed by the owner
    modifier onlyOwner {
        if (msg.sender != owner) {
            throw;
        } else {
            _;
        }
    }

    // Delete / kill the contract... only the owner has rights to do this
    function kill() onlyOwner {
        suicide(owner);
    }

    function BillContractNew(string _billerCode, uint _amount) {
        owner = msg.sender;
        billerCode = _billerCode;
        amount = _amount;
        paid = false;
        witdrawAmount = false;
    }

    function () payable {
        if (msg.value >= amount) {
          customer = msg.sender;
          paid = true;
        } else {
          throw;
        }
    }

    function witdrawFunds() onlyOwner {
        if (paid) {
          if (owner.send(this.balance)){
            witdrawAmount = true;
          } else {
            witdrawAmount = false;
          }
        }
    }

    function checkBalance() onlyOwner constant returns(uint){
        return this.balance;
    }

    function isBillPaid() constant returns(bool) {
        return paid;
    }

    function getBillDetail() constant returns (string, bool) {
        return (billerCode, witdrawAmount);
    }
}
