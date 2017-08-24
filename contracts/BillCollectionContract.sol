pragma solidity ^0.4.8;

contract BillCollectionContract {

    address owner;

    string public version = "0.1";

    struct Bill {
      uint index;
      address billContract;
      uint paidByCustomerDate;
      uint paidToBillerDate;
      bool status;
    }

    Bill[] bills;

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

    function BillCollectionContract() {
      owner = msg.sender;
    }

    function addBill(address _billContract) {
      uint currentIndex = bills.length;
      uint nowTime = now * 1000;
      bills.push(Bill({
        index : currentIndex,
        billContract : _billContract,
        paidByCustomerDate : nowTime,
        paidToBillerDate : 0,
        status : false
        }));
    }

    function paidToBiller(uint _index) {
      uint nowTime = now * 1000;
      bills[_index].paidToBillerDate = nowTime;
      bills[_index].status = true;
    }

    function getBillCount() constant returns (uint) {
      return bills.length;
    }

    function getBill(uint _index) constant returns (uint, address, uint, uint, bool) {
      return (bills[_index].index, bills[_index].billContract, bills[_index].paidByCustomerDate, bills[_index].paidToBillerDate, bills[_index].status);
    }

    function isBillAvailable(address _billContract) constant returns (bool) {
      bool avilable = false;
      for (uint i = 0; i < bills.length; i++) {
        if (bills[i].billContract == _billContract) {
          avilable = true;
        }
      }
      return avilable;
    }
}
