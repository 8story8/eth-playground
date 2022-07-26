import { ethers } from "hardhat";
import config from "./config/config";

async function main() {

  const ownerList = await ethers.getSigners();
  const ownerWallet = ownerList[0];
  const ownerCall = await ethers.getContractAt('Artemis', config.deployedAddress, ownerWallet);

  const vipWallet = new ethers.Wallet(config.vipPrivateKey, ethers.provider);
  const vipAddress = await vipWallet.getAddress();
  
  const ownerResult = await ownerCall.mintSpecial(vipAddress);
  console.log(JSON.stringify(ownerResult, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});