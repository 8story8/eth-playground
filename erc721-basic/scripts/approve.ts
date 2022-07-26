import { ethers } from "hardhat";
import config from "./config/config";

async function main() {
  const vipWallet = new ethers.Wallet(config.vipPrivateKey, ethers.provider);
  const vipCall = await ethers.getContractAt('Artemis', config.deployedAddress, vipWallet);

  const tokenId = config.approveTokenId;
  const approverWallet = new ethers.Wallet(config.approverPrivateKey, ethers.provider);
  const approverAddress = await approverWallet.getAddress();
  const ownerResult = await vipCall.approve(approverAddress, tokenId);
  console.log(JSON.stringify(ownerResult, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});