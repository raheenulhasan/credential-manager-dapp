pragma solidity 0.4.20;

contract Credential {
     struct CredMap {
        uint id;
		address accountAdress;
		string website;
        string username;
        string password;
    }

        mapping(address => bool) public users;
        mapping(uint => CredMap) public savedEntries;
        //mapping(address => CredMap[]) public savedEntries;
        uint public count;

     event addedEvent (
        uint indexed _userId
    );

    function Credential () public {
        //addEntry(0x640a0990dd1B28142D3D20A96794BC43F2e2FD33,"Website 1", "Username 1", "Password 1");
        //addEntry(0x640a0990dd1B28142D3D20A96794BC43F2e2FD33,"Website 2", "Username 2", "Password 2");
    }

    function addEntry (address _address, string _website,string _username,string _password) public {
        count ++;
        savedEntries[count] = CredMap(count, _address, _website, _username, _password);
    }

    function addCredMapEntry (address _address, string _website, string _username,string _password) public {
		 addEntry(_address,_website, _username, _password);
    }
	
	function deleteCredMapEntry (address _address, uint _id) public {
      	delete savedEntries[_id];
    }
}
