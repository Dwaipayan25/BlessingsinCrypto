const hre = require("hardhat");

async function getBalances(address){
  const balanceBigInt=await hre.ethers.provider.getBalance(address);
  return hre.ethers.utils.formatEther(balanceBigInt)
}

async function consoleBalances(addresses){
  for(const address of addresses){
    console.log(`Balance of ${address}: ${await getBalances(address)}`);
  }
}

async function consoleMemos(memos){
  for(const memo of memos){
    const timestamp=memo.timestamp;
    const name=memo.name;
    const from=memo.from;
    const message=memo.message;
    const value=memo.value;

    console.log(`At: ${timestamp} name: ${name} address: ${from} msg:${message} value:${value}`);
  }
}

async function main() {

  const [owner,from1,from2,from3]= await hre.ethers.getSigners();
  const chai=await hre.ethers.getContractFactory("chai");
  const contract=await chai.deploy(); //instance of contract

  await contract.deployed();
  console.log("Contract deployed to:", contract.address);

  const addresses=[owner.address,from1.address,from2.address,from3.address];
  console.log("Balances before transactions");
  await consoleBalances(addresses);

  const tx1=await contract.connect(from1).buyChai("from1","hello world", {value:hre.ethers.utils.parseEther("1")});
  await tx1.wait();
  const tx2=await contract.connect(from2).buyChai("from2","hello world", {value:hre.ethers.utils.parseEther("2")});
  await tx2.wait();
  const tx3=await contract.connect(from3).buyChai("from3","hello world", {value:hre.ethers.utils.parseEther("3")});
  await tx3.wait();

  console.log("Balances after transactions");
  await consoleBalances(addresses);

  const memos=await contract.getMemos();
  console.log("Memos");
  await consoleMemos(memos);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
