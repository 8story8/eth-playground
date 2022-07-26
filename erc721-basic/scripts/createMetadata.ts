import * as fs from "fs";
import * as path from "path";
import config from "./config/config";

const imageCid = config.imageCid;
const imgDirPath = path.dirname(__dirname) + "/ipfs/resource/image";
const metadataDirPath = path.dirname(__dirname) + "/ipfs/resource/metadata";
const imgFilePathList = fs.readdirSync(imgDirPath);
for(const imgFilePath of imgFilePathList){
  const metadata = {
    "name":"Artemis",
    "description":"Artemis NFT",
    "image":"ipfs://"+imageCid+"/"+imgFilePath
  }
  fs.writeFileSync(metadataDirPath+"/"+imgFilePath, JSON.stringify(metadata));
}