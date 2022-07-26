import { ethers } from "hardhat";
import config from "./config/config";

async function main() {

  const buyerWallet = new ethers.Wallet(config.buyerPrivateKey, ethers.provider);
  const buyerCall = await ethers.getContractAt('Artemis', config.deployedAddress, buyerWallet);
  const nftCnt = config.buyerAmount;
  const nftPrice = 1000000000000000;
  const buyerResult = await buyerCall.mintGeneral(nftCnt, {value:nftCnt*nftPrice});

  console.log(JSON.stringify(buyerResult, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});