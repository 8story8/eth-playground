import { ethers } from "hardhat";
import config from "./config/config";

async function main() {

  // VIP가 NFT를 보유
  const vipPrivateKey = config.vipPrivateKey;
  const vipWallet = new ethers.Wallet(vipPrivateKey, ethers.provider);
  const vipAddress = await vipWallet.getAddress();

  // Approver가 VIP 대신 전송
  const fromPrivateKey = config.fromPrivateKey;
  const fromWallet = new ethers.Wallet(fromPrivateKey, ethers.provider);
  const fromCall = await ethers.getContractAt('Artemis', config.deployedAddress, fromWallet);

  const transferResult = await fromCall["safeTransferFrom(address,address,uint256)"](vipAddress, config.toAddress, config.transferTokenId);
  console.log(JSON.stringify(transferResult, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

