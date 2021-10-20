App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
       const ethEnabled = () => {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
           return true;
        }
        return false;
      }
      if (!ethEnabled()) {
        alert("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!");
      }
      web3 = window.web3;
      App.web3Provider = web3.currentProvider;
    } else {
       App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Credential.json", function(credential) {
 	   App.contracts.Credential = TruffleContract(credential);
       App.contracts.Credential.setProvider(App.web3Provider);
       App.listenForEvents();
      return App.render();
    });
  },

   listenForEvents: function() {
    App.contracts.Credential.deployed().then(function(instance) {
 
      instance.addedEvent({}, {
        fromBlock: 'latest',
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
         App.render();
      });
    });
  },

  render: function() {
    var credInstance;
    var loader = $("#loader");
    var content = $("#content");

     loader.show();
     content.hide();

     web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

 
    App.contracts.Credential.deployed().then(function(instance) {
      credInstance = instance;
      return credInstance.count();
    }).then(function(count) {
      var credResults = $("#credentries");
      credResults.empty();
		console.log("Count : "+count);
		var k = 1 ; 
      for (var i = 1; i <= count; i++) {
        credInstance.savedEntries(i).then(function(entryData) {
          var id = entryData[0];
		  var address = entryData[1];
          var website = entryData[2];
          var username = entryData[3];
          var password = entryData[4];
		  
		  console.log("IDs : "+id);
		  console.log("address : "+address);
		  
		 if(App.account == address)
		 {			 
          var credTemplate = "<tr><th style=\"display:none;\" >" + id + "</th><th>" + k + "</th><td>" + website + "</td><td>" + username + "</td><td class=\"hidetext\">" + password + "</td><td>" + address + "</td><td><input type=\"button\" class=\"btn btn-primary\" value=\"Delete\" onclick=\"deleteRow(this)\"></td></tr>"
          credResults.append(credTemplate);
		  k++;
		 }		  
        });
      }
	  loader.hide();
      content.show();
      return credInstance.users(App.account);
    }).catch(function(error) {
      console.warn(error);
	 loader.show();
     content.hide();
    });
	
	
  },

  addNewEntry: function() {
 
	  var website = $('#websiteentry').val();
	  var username = $('#usernameentry').val();
	  var password = $('#passwordentry').val();
	  console.log(username);

	  App.contracts.Credential.deployed().then(function(instance) {
      credInstance = instance;
      return credInstance.addCredMapEntry(App.account, website, username, password, { from: App.account });
    }).then(function(result) {
       $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.log(err);
    });
  },

  deleteEntry: function() {
	  var hiddenid = document.getElementById("hiddenid").value;
      App.contracts.Credential.deployed().then(function(instance) {
      credInstance = instance;
      return credInstance.deleteCredMapEntry(App.account, hiddenid, { from: App.account });
    }).then(function(count) {
      return credInstance.users(App.account);
    }).catch(function(error) {
      console.warn(error);
      $("#content").hide();
      $("#loader").show();
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
