pragma solidity ^0.4.8;

contract BillContract {

    address owner;
    string billerCode;
    string billerName;
    string refNumber;
    uint amount; // Amount is in wei (convert it from ether or bitcoin to wei while creating bill)

    string paidCurrency;
    uint amountInDollor;

    uint payType; // BPAY - 1, Bank - 2

    string public version = "0.1";

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

    function BillContract(string _billerCode, string _billerName, string _refNumber, string _paidCurrency, uint _amount, uint _amountInDollor, uint _payType) {
        owner = msg.sender;
        billerCode = _billerCode;
        billerName = _billerName;
        refNumber = _refNumber;
        amount = _amount;
        paidCurrency = _paidCurrency;
        amountInDollor = _amountInDollor;
        payType = _payType;
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

    function getBillDetail() constant returns (string, string, string, uint, uint, string, bool) {
        return (billerCode, refNumber, paidCurrency, payType, amountInDollor, billerName, witdrawAmount);
    }
}
