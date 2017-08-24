// Import the page's CSS. Webpack will know what to do with it.
import "../stylesheets/app.css";

// Import libraries we need.
import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
var accounts;
var account;

var BillContract;

var billContractABI = [{"constant":true,"inputs":[],"name":"isBillPaid","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"checkBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"witdrawFunds","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getBillDetail","outputs":[{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"string"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"_owner","type":"address"},{"name":"_billerCode","type":"string"},{"name":"_refNumber","type":"string"},{"name":"_paidCurrency","type":"string"},{"name":"_amount","type":"uint256"},{"name":"_amountInDollor","type":"uint256"},{"name":"_payType","type":"uint256"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"}];

var billContractBytecode = "0x60606040526040805190810160405280600381526020017f302e3100000000000000000000000000000000000000000000000000000000008152506007908051906020019061004f92919061018e565b50341561005b57600080fd5b604051610b6a380380610b6a833981016040528080519060200190919080518201919060200180518201919060200180518201919060200180519060200190919080519060200190919080519060200190919050505b866000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550856001908051906020019061010792919061018e565b50846002908051906020019061011e92919061018e565b5082600381905550836004908051906020019061013c92919061018e565b5081600581905550806006819055506000600860146101000a81548160ff0219169083151502179055506000600860156101000a81548160ff0219169083151502179055505b50505050505050610233565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106101cf57805160ff19168380011785556101fd565b828001600101855582156101fd579182015b828111156101fc5782518255916020019190600101906101e1565b5b50905061020a919061020e565b5090565b61023091905b8082111561022c576000816000905550600101610214565b5090565b90565b610928806102426000396000f30060606040523615610076576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806330b7d0e0146100eb57806341c0e1b51461011857806354fd4d501461012d578063c71daccb146101bc578063d49c5edf146101e5578063e8efc718146101fa575b5b600354341015156100e35733600860006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506001600860146101000a81548160ff0219169083151502179055506100e8565b600080fd5b5b005b34156100f657600080fd5b6100fe6103af565b604051808215151515815260200191505060405180910390f35b341561012357600080fd5b61012b6103c7565b005b341561013857600080fd5b610140610460565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101815780820151818401525b602081019050610165565b50505050905090810190601f1680156101ae5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101c757600080fd5b6101cf6104fe565b6040518082815260200191505060405180910390f35b34156101f057600080fd5b6101f861057b565b005b341561020557600080fd5b61020d61069f565b604051808060200180602001806020018881526020018781526020018673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018515151515815260200184810384528b818151815260200191508051906020019080838360005b8381101561029e5780820151818401525b602081019050610282565b50505050905090810190601f1680156102cb5780820380516001836020036101000a031916815260200191505b5084810383528a818151815260200191508051906020019080838360005b838110156103055780820151818401525b6020810190506102e9565b50505050905090810190601f1680156103325780820380516001836020036101000a031916815260200191505b50848103825289818151815260200191508051906020019080838360005b8381101561036c5780820151818401525b602081019050610350565b50505050905090810190601f1680156103995780820380516001836020036101000a031916815260200191505b509a505050505050505050505060405180910390f35b6000600860149054906101000a900460ff1690505b90565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561042257600080fd5b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5b565b60078054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104f65780601f106104cb576101008083540402835291602001916104f6565b820191906000526020600020905b8154815290600101906020018083116104d957829003601f168201915b505050505081565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614151561055b57600080fd5b3073ffffffffffffffffffffffffffffffffffffffff163190505b5b5b90565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415156105d657600080fd5b600860149054906101000a900460ff161561069a576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc3073ffffffffffffffffffffffffffffffffffffffff16319081150290604051600060405180830381858888f193505050501561067d576001600860156101000a81548160ff021916908315150217905550610699565b6000600860156101000a81548160ff0219169083151502179055505b5b5b5b5b565b6106a76108e8565b6106af6108e8565b6106b76108e8565b600080600080600160026004600654600554600860009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600860159054906101000a900460ff16868054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156107915780601f1061076657610100808354040283529160200191610791565b820191906000526020600020905b81548152906001019060200180831161077457829003601f168201915b50505050509650858054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561082d5780601f106108025761010080835404028352916020019161082d565b820191906000526020600020905b81548152906001019060200180831161081057829003601f168201915b50505050509550848054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156108c95780601f1061089e576101008083540402835291602001916108c9565b820191906000526020600020905b8154815290600101906020018083116108ac57829003601f168201915b5050505050945096509650965096509650965096505b90919293949596565b6020604051908101604052806000815250905600a165627a7a72305820032bd3cbd934e47aafb7d13a6261bc61d9ed14b250ac103299a7a158acd234d40029";

var billCollectionContractABI = [{"constant":true,"inputs":[],"name":"getBillCount","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"version","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_billContract","type":"address"}],"name":"addBill","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_index","type":"uint256"}],"name":"getBill","outputs":[{"name":"","type":"uint256"},{"name":"","type":"address"},{"name":"","type":"uint256"},{"name":"","type":"uint256"},{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_index","type":"uint256"}],"name":"paidToBiller","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"}];

var billCollectionContractAddress = "0xee1170136a5ecCF4EA2Bd42Aa07632EE8493b8e8";

var BillCollectionContract;

window.App = {
  start: function() {
    var self = this;

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function(err, accs) {
      if (err != null) {
        $('#currentUserName').html("YOU ARE OFFLINE");
        return;
      }

      if (accs.length == 0) {
        $('#currentUserName').html("YOU ARE OFFLINE");
        return;
      }

      accounts = accs;
      account = accounts[0];
      $('#currentUserName').html("Your Account: " + account);

      //self.refreshBalance();
    });
  },

  setStatus: function(message) {
    var status = document.getElementById("status");
    status.innerHTML = message;
  },

  newBill: function() {

    var self = this;

    var billerCode = $('#billerCode').val();
    var refNumber = $('#refNumber').val();
    var amountBox = parseInt($('#amountBox').val());
    var coinRate = $('#selected_coin_rate').text();
    var selectedCoin = $('#selected_coin').text();

    if (billerCode == "") {
      alert ("Biller Code is empty!");
      return;
    } else if (refNumber == "") {
      alert ("Reference Number is empty!");
      return;
    } else if (isNaN(amountBox) || amountBox < 1) {
      alert ("Amount is empty!");
      return;
    }

    var amount = 0;

    if (selectedCoin == "ETH") {
      amount = coinRate * 1000000000000000000;
    } else if (selectedCoin == "BTC") {
      var coinUrl="https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=ETH";
      $.ajax({
          url : coinUrl,
          type : "get",
          async: false,
          success : function(data) {
               amount = data.ETH * coinRate * 1000000000000000000;
          },
          error: function() {

          }
       });
    } else if (selectedCoin == "DASH") {
      var coinUrl="https://min-api.cryptocompare.com/data/price?fsym=DASH&tsyms=ETH";
      $.ajax({
          url : coinUrl,
          type : "get",
          async: false,
          success : function(data) {
               amount = data.ETH * coinRate * 1000000000000000000;
          },
          error: function() {

          }
       });
    }
    $('#submitBillButton').val("Genarating...");
    $('#submitBillButton').attr("disabled", true);
    var billContract = web3.eth.contract(billContractABI);
    var owner = "0x003394d30ad6aef7a21c33c6509975e9e705f320";
    billContract.new(owner, billerCode, refNumber, selectedCoin, amount, amountBox, 1, {from: account, data: billContractBytecode, gasPrice: 20000000000}, function(err, result) {
      if(err) {
        console.log(err);
      } else {
        if(result != null) {
          if(result.address != undefined) {
            localStorage.setItem('createdBill', result.address);
            localStorage.setItem('billerCode', billerCode);
            localStorage.setItem('amountInDollor', amountBox);
            localStorage.setItem('refNumber', refNumber);
            localStorage.setItem('payAmount', selectedCoin + " " + coinRate);
            $('#billerCode').val('');
            $('#refNumber').val('');
            $('#amountBox').val('');
            $('#selected_coin_rate').text('');
            $('#selected_coin').text('');
            $('#submitBillButton').val("Submit");
            $("#submitBillButton").removeAttr("disabled");
            window.location.href = "listing.html";
          }
        }
      }
    });
  },
  clearTable: function(){
     var table = document.getElementById("reviewStatusTable");
     var rowCount = table.rows.length;
     for (var i = 1; i < rowCount; i++) {
        table.deleteRow(1);
     }
  },
  clearHistoryTable: function(){
     var table = document.getElementById("exchangeclaims");
     var rowCount = table.rows.length;
     for (var i = 1; i < rowCount; i++) {
        table.deleteRow(1);
     }
  },
  showDate : function() {
    var m_names = new Array("Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul", "Aug", "Sep",
    "Oct", "Nov", "Dec");

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var curr_year = d.getFullYear();
    return m_names[curr_month] + " " + curr_date;
  },
  loadModelWindow : function() {
    $("#qrDialog").modal({backdrop: 'static', keyboard: false});
  },
  formatDate: function(date) {
    var monthNames = [
      "Jan", "Feb", "Mar",
      "Apr", "May", "Jun", "Jul",
      "Aug", "Sep", "Oct",
      "Nov", "Dec"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    return day + '-' + monthNames[monthIndex] + '-' + year;
  },
  showBillHistory: function(totalCount, currentIndex, rowIndex) {
    var self = this;
    BillCollectionContract = window.web3.eth.contract(billCollectionContractABI).at(billCollectionContractAddress);
    BillCollectionContract.getBill.call(currentIndex, {from: account}, function(err, detail) {
      if(err) {
        console.log(err);
      }
      if (detail) {
          if (detail.length>2) {
            BillContract = window.web3.eth.contract(billContractABI).at(detail[1]);
            BillContract.getBillDetail.call({from: account}, function(err, data){
              if(err) {
                console.log(err);
              }
              if (data) {
                var table = document.getElementById("exchangeclaims");
                var row = table.insertRow(rowIndex);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.innerHTML = self.formatDate(new Date(parseInt(detail[2])));
                cell2.innerHTML = data[0];
                cell3.innerHTML = data[2];
                cell4.innerHTML = "$" + data[4];
                currentIndex--;
                if (currentIndex >= 0) {
                  rowIndex++;
                  self.showBillHistory(totalCount, currentIndex, rowIndex);
                }
              }
            });
          }
      }
    });
  },
  loadBillHistory: function() {
    var self = this;
    BillCollectionContract = window.web3.eth.contract(billCollectionContractABI).at(billCollectionContractAddress);
    BillCollectionContract.getBillCount.call({from: account}, function(err, count) {
      if(err) {
        console.log(err);
      }
      if (count) {
        self.clearHistoryTable();
        if (count > 0) {
          self.showBillHistory(count, count-1, 1);
          $('#totalBills').html("Total: " + count);
        }
      }
    });
  },
  loadPaymentModel : function() {
    var self = this;
    self.clearTable();
    var billAddress = localStorage.getItem('createdBill');
    if (billAddress != undefined || billAddress != null) {
      $('#selected_biller').text(localStorage.getItem('billerCode'));
      $('#pay_amount').text(localStorage.getItem('payAmount'));
      $("#contract_address").text(billAddress);
      $("#qrCode").attr("src","https://api.qrserver.com/v1/create-qr-code/?data="+billAddress+"&amp;size=100x100");
      self.loadModelWindow();

      var table = document.getElementById("reviewStatusTable");
      var row = table.insertRow(1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      var cell7 = row.insertCell(6);

      cell1.innerHTML = '<input type="button" value="Pay Now" class="btn btn-primary" style="width:100px" onclick="App.loadModelWindow()" >';
      cell2.innerHTML = self.showDate();
      cell3.innerHTML = localStorage.getItem('billerCode');
      cell4.innerHTML = localStorage.getItem('refNumber');
      cell5.innerHTML = "$" + localStorage.getItem('amountInDollor');
      cell6.innerHTML = 'Awiaiting for payment <i class="fa fa-refresh fa-spin" aria-hidden="true"></i>';
      cell7.innerHTML = '<input type="button" value="Cancel Payment" class="btn btn-danger" style="width:130px" onclick="App.cancelPayment()" >';;
      self.checkBillPaid();
    } else {
      $('#noBills').show();
    }

    self.loadBillHistory();
  },
  cancelPayment : function() {
    var self = this;
    localStorage.removeItem('createdBill');
    localStorage.removeItem('billerCode');
    localStorage.removeItem('refNumber');
    localStorage.removeItem('payAmount');
    $("#qrDialog").modal('hide');
    self.loadPaymentModel();
  },
  checkBillPaid: function() {
    var self = this;
    var billAddress = localStorage.getItem('createdBill');
    if (billAddress != undefined || billAddress != null) {
        BillContract = window.web3.eth.contract(billContractABI).at(billAddress);
        BillContract.isBillPaid.call({from: account}, function(err, status) {
          if(err) {
            console.log(err);
          }
          if (status) {
            BillCollectionContract.addBill.sendTransaction(billAddress, {from: account}, function(err, status) {
              if(err) {
                console.log(err);
              }
              if (status) {
                this.loadBillHistory();
              }
            });
            //alert ("Bill Paided");
            self.cancelPayment();
          } else {
            //alert ("Waiting...");
            setTimeout(function(){ self.checkBillPaid(); }, 5000);
          }
        });
    }
  }
};

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  // if (typeof web3 !== 'undefined') {
  //   console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
  //   // Use Mist/MetaMask's provider
  //   window.web3 = new Web3(web3.currentProvider);
  // } else {
  //   console.warn("No web3 detected. Falling back to http://10.0.0.20:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
  //   // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  //   window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.0.0.20:8545"));
  // }

  window.web3 = new Web3(new Web3.providers.HttpProvider("http://10.0.0.20:8545"));

  App.start();
});
