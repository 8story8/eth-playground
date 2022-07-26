import { ethers } from "hardhat";
import config from "./config/config";

async function main() {

  const fromPrivateKey = config.fromPrivateKey;
  const fromWallet = new ethers.Wallet(fromPrivateKey, ethers.provider);
  const fromAddress = await fromWallet.getAddress();
  const fromCall = await ethers.getContractAt('Artemis', config.deployedAddress, fromWallet);

  const transferResult = await fromCall["safeTransferFrom(address,address,uint256)"](fromAddress, config.toAddress, config.transferTokenId);
  console.log(JSON.stringify(transferResult, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

