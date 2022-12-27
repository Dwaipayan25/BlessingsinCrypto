//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
contract chai{
    struct Memo{
        string name;
        string message;
        uint timestamp;
        uint value;
        address from;
    }
    
    Memo[] memos;
    address payable owner;
    constructor(){
        owner=payable(msg.sender);
    }

    function buyChai(string memory _name,string memory _message)payable public{
        require(msg.value>=0.001 ether,"Send atleast 0.001 Ether");
        owner.transfer(msg.value);
        memos.push(Memo(_name,_message,block.timestamp,msg.value,msg.sender));
    }

    function getMemos()public view returns(Memo[] memory){
        return memos;
    }
}


// 0x46436DCB1B298111400BB61F54758420Ef1104EB