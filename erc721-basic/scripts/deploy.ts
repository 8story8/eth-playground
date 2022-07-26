import { ethers } from "hardhat";
import config from "./config/config";

async function main() {
  const Artemis = await ethers.getContractFactory("Artemis");
  const name = "Artemis";
  const symbol = "ART";

  const ownerList = await ethers.getSigners();
  const ownerAddress = await ownerList[0].getAddress();
  const artemis = await Artemis.deploy(name, symbol, config.baseUri, ownerAddress, 1);

  const result = await artemis.deployed();
  console.log(JSON.stringify(result, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
