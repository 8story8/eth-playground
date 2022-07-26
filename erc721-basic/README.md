# erc721-basic

## 개발 환경

- node: v12.x.x
- npm: 6.x.x


## 설치
```
$ git clone git@github.com:8story8/eth-playground.git
$ cd erc721-basic
$ npm install
```

## 이더리움 네트워크 설정
- hardhat.config.ts에서 해당 부분 설정
- networks.goerli.url : Goerli Infura URL
- networks.goerli.accounts : ERC721 컨트랙트 배포자 개인키
- etherscan.apiKey.goerli : Goerli Etherscan API Key 
```
 networks: {
    goerli:{
      url:"${INFURA_URL}",
      accounts:["${OWNER_PRIVATE_KEY}"]
    }
  },
  etherscan: {
    apiKey: {
      goerli: "${ETHERSCAN_API_KEY}"
    }
  }
```

## ERC721 NFT 이미지 업로드
- ipfs/resource/image 폴더 생성
```
mkdir ipfs/resource/image
```
- NFT 이미지를 생성하여 ipfs/resource/image에 저장
- 1, 2, 3, ... 처럼 확장자를 제외하고 저장
- https://app.pinata.cloud/pinmanager에 ipfs/resource/image 폴더를 업로드하여 Image CID 확인
- scripts/config/config.ts에서 해당 부분 설정
```
const imageCid = "${IMAGE_CID}";
```

## ERC721 NFT 메타데이터 설정
- ipfs/resource/metadata 폴더 생성
```
mkdir ipfs/resource/metadata
```
- NFT 메타데이터를 생성하여 ipfs/resource/metadata에 저장
- 1, 2, 3, ... 처럼 확장자를 제외하고 저장
```
npm run ts scripts/createMetadata.ts
```
- https://app.pinata.cloud/pinmanager에 ipfs/resource/metadata 폴더를 업로드하여 CID 확인


## ERC721 컨트랙트 설정
- scripts/config/config.ts에서 해당 부분 설정
```
const baseUri = "ipfs://${CID}/";
```

## ERC721 컨트랙트 배포
```
$ npx hardhat run scripts/deploy.ts
```

## ERC721 컨트랙트 Etherscan에 검증
- scripts/argument.js 생성
```
module.exports = [
    "Artemis",
    "ART",
    "${BASE_URI}",
    "${OWNER_ADDRESS}",
    1
];
```
- ERC721 컨트랙트 검증
```
npx hardhat verify --constructor-args scripts/argument.js ${ERC721_CONTRACT_ADDRESS}
```

## ERC721 컨트랙트 실행 설정
- scripts/config/config.ts에서 해당 부분 설정
```
// 배포된 ERC721 컨트랙트 주소
const deployedAddress = "";

// 3. mintGeneral.ts
// 일반 구매자
const buyerPrivateKey = "";
const buyerAmount = ;

// 4. mintSpecial.ts
// 5. approve.ts
// VIP는 Approver에게 Transfer 대행 권한을 준다.
const vipPrivateKey = "";
const approverPrivateKey = "";
const tokenId = ;

// 6. transfer.ts
// 구매자 또는 Approver는 NFT를 전송한다.
// From 주소 : 구매자 또는 Approver 개인키
const fromPrivateKey = "";
// To 주소
const toAddress = "";
// 전송할 NFT
const transferTokenId = ;
```


## ERC721 컨트랙트 메서드
| 순서 | 메서드명 | 설명 |
|----|----|----|
| 1 | mintGeneral | 일반 구매자가 이더를 지불하여 NFT를 구매
| 2 | mintSpecial | 관리자(Owner)가 VIP에게 NFT를 증정
| 3 | approve | VIP가 Apporver에게 NFT 권한 부여
| 4 | transfer | 일반 구매자/VIP/Approver가 다른 주소로 NFT 전송 
| 5 | setTokenUri | 관리자가 Token URI 변경
```
npx hardhat run ${METHOD_NAME}.ts
```
